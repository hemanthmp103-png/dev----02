import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ReportsPage } from './pages/ReportsPage';
import { DashboardPage } from './pages/DashboardPage';
import { ClinicFinder } from './components/ClinicFinder';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/clinics" element={<div className="py-8"><ClinicFinder /></div>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <footer className="bg-white border-t border-slate-200 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-slate-500 text-sm">© 2026 PawRescue. Built with compassion for street animals.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}
