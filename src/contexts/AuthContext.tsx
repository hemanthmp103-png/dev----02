import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { io, Socket } from 'socket.io-client';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  socket: Socket | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (user) {
      const newSocket = io();
      newSocket.emit('join', user.id);
      setSocket(newSocket);
      return () => {
        newSocket.close();
      };
    }
  }, [user]);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, socket }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
