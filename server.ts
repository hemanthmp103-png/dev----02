import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("rescue.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    name TEXT,
    role TEXT CHECK(role IN ('user', 'ngo')),
    city TEXT,
    state TEXT
  );

  CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reporter_id INTEGER,
    animal_type TEXT,
    description TEXT,
    image_url TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    latitude REAL,
    longitude REAL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(reporter_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    message TEXT,
    is_read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS adoptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    report_id INTEGER,
    user_id INTEGER,
    status TEXT DEFAULT 'interested',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(report_id) REFERENCES reports(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  app.use(express.json({ limit: '10mb' }));

  // Auth Routes
  app.post("/api/auth/signup", (req, res) => {
    const { email, password, name, role, city, state } = req.body;
    try {
      const info = db.prepare("INSERT INTO users (email, password, name, role, city, state) VALUES (?, ?, ?, ?, ?, ?)").run(email, password, name, role, city, state);
      res.json({ id: info.lastInsertRowid, email, name, role, city, state });
    } catch (e) {
      res.status(400).json({ error: "Email already exists" });
    }
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password);
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Report Routes
  app.get("/api/reports", (req, res) => {
    const { city, state } = req.query;
    let query = "SELECT reports.*, users.name as reporter_name FROM reports JOIN users ON reports.reporter_id = users.id";
    const params = [];
    if (city || state) {
      query += " WHERE";
      if (city) {
        query += " reports.city = ?";
        params.push(city);
      }
      if (city && state) query += " AND";
      if (state) {
        query += " reports.state = ?";
        params.push(state);
      }
    }
    query += " ORDER BY created_at DESC";
    const reports = db.prepare(query).all(...params);
    res.json(reports);
  });

  app.post("/api/reports", (req, res) => {
    const { reporter_id, animal_type, description, image_url, address, city, state, latitude, longitude } = req.body;
    const info = db.prepare(`
      INSERT INTO reports (reporter_id, animal_type, description, image_url, address, city, state, latitude, longitude)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(reporter_id, animal_type, description, image_url, address, city, state, latitude, longitude);
    
    const reportId = info.lastInsertRowid;
    
    // Notify NGOs in the same city/state
    const ngos = db.prepare("SELECT id FROM users WHERE role = 'ngo' AND (city = ? OR state = ?)").all(city, state);
    ngos.forEach(ngo => {
      db.prepare("INSERT INTO notifications (user_id, message) VALUES (?, ?)").run(ngo.id, `New rescue request: ${animal_type} in ${city}`);
      io.to(`user_${ngo.id}`).emit("notification", { message: `New rescue request: ${animal_type} in ${city}` });
    });

    res.json({ id: reportId });
  });

  app.patch("/api/reports/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.prepare("UPDATE reports SET status = ? WHERE id = ?").run(status, id);
    
    // Notify reporter
    const report = db.prepare("SELECT * FROM reports WHERE id = ?").get(id);
    if (report) {
      const message = `Your report for ${report.animal_type} is now ${status}`;
      db.prepare("INSERT INTO notifications (user_id, message) VALUES (?, ?)").run(report.reporter_id, message);
      io.to(`user_${report.reporter_id}`).emit("notification", { message });
    }
    
    res.json({ success: true });
  });

  // Notification Routes
  app.get("/api/notifications/:userId", (req, res) => {
    const notifications = db.prepare("SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 20").all(req.params.userId);
    res.json(notifications);
  });

  // Adoption Routes
  app.post("/api/adoptions", (req, res) => {
    const { report_id, user_id } = req.body;
    db.prepare("INSERT INTO adoptions (report_id, user_id) VALUES (?, ?)").run(report_id, user_id);
    
    // Notify NGO/Reporter
    const report = db.prepare("SELECT reporter_id, animal_type FROM reports WHERE id = ?").get(report_id);
    if (report) {
      const message = `Someone is interested in adopting the ${report.animal_type} you reported!`;
      db.prepare("INSERT INTO notifications (user_id, message) VALUES (?, ?)").run(report.reporter_id, message);
      io.to(`user_${report.reporter_id}`).emit("notification", { message });
    }
    
    res.json({ success: true });
  });

  // Socket.io connection handling
  io.on("connection", (socket) => {
    socket.on("join", (userId) => {
      socket.join(`user_${userId}`);
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = 3000;
  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
