import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Notification } from '../types';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NotificationBell = () => {
  const { user, socket } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetch(`/api/notifications/${user.id}`)
        .then(res => res.json())
        .then(data => {
          setNotifications(data);
          setUnreadCount(data.filter((n: Notification) => !n.is_read).length);
        });
    }
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on('notification', (notif) => {
        setNotifications(prev => [notif, ...prev]);
        setUnreadCount(prev => prev + 1);
      });
    }
  }, [socket]);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-slate-100 transition-colors relative"
      >
        <Bell className="w-6 h-6 text-slate-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden"
          >
            <div className="p-4 border-bottom border-slate-100 bg-slate-50 font-semibold">
              Notifications
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm">
                  No notifications yet
                </div>
              ) : (
                notifications.map((n, i) => (
                  <div key={i} className="p-4 border-bottom border-slate-50 hover:bg-slate-50 transition-colors text-sm">
                    {n.message}
                    <div className="text-[10px] text-slate-400 mt-1">
                      {new Date(n.created_at).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
