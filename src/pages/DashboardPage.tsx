import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserDashboard } from '../components/UserDashboard';
import { NGODashboard } from '../components/NGODashboard';
import { Navigate } from 'react-router-dom';
import { motion } from 'motion/react';

export const DashboardPage = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {user.role === 'ngo' ? <NGODashboard /> : <UserDashboard />}
    </motion.div>
  );
};
