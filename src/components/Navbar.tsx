import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PawPrint, LogOut, User, LayoutDashboard, MapPin } from 'lucide-react';
import { NotificationBell } from './NotificationBell';
import { motion } from 'motion/react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="bg-emerald-500 p-2 rounded-lg shadow-lg shadow-emerald-100"
            >
              <PawPrint className="w-6 h-6 text-white" />
            </motion.div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">PawRescue</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {[
              { to: "/reports", label: "Rescue Reports" },
              { to: "/clinics", label: "Find Clinics" },
              { href: "/#about", label: "About" },
              { href: "/#adoption", label: "Adoption" },
              { href: "/#donate", label: "Donate" },
              { href: "/#contact", label: "Contact" },
              ...(user ? [{ to: "/dashboard", label: "Dashboard" }] : [])
            ].map((link, i) => (
              link.to ? (
                <Link 
                  key={i}
                  to={link.to} 
                  className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors relative group"
                >
                  {link.label}
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full"
                  />
                </Link>
              ) : (
                <a 
                  key={i}
                  href={link.href} 
                  className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors relative group"
                >
                  {link.label}
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full"
                  />
                </a>
              )
            ))}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <NotificationBell />
                <div className="h-8 w-[1px] bg-slate-200 mx-2" />
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-semibold text-slate-900">{user.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">{user.role}</p>
                  </div>
                  <button 
                    onClick={() => { logout(); navigate('/'); }}
                    className="p-2 rounded-full hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2">Login</Link>
                <Link to="/signup" className="text-sm font-medium bg-emerald-500 text-white px-5 py-2 rounded-full hover:bg-emerald-600 transition-all shadow-sm">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
