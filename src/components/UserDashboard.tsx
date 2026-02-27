import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Report } from '../types';
import { ReportCard } from '../components/ReportCard';
import { ReportForm } from '../components/ReportForm';
import { Plus, LayoutDashboard, History, Heart, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const UserDashboard = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMyReports();
  }, [user]);

  const fetchMyReports = async () => {
    try {
      const res = await fetch(`/api/reports?city=${user?.city}`);
      const data = await res.json();
      // Filter for reports by this user for "My Reports" section
      setReports(data.filter((r: Report) => r.reporter_id === user?.id));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Welcome, {user?.name}</h1>
          <p className="text-slate-500">Track your rescue reports and help animals in {user?.city}.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200"
        >
          {showForm ? 'View My Reports' : <><Plus className="w-5 h-5" /> Report New Animal</>}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {showForm ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Report an Animal in Distress</h2>
            <ReportForm onSuccess={() => { fetchMyReports(); setTimeout(() => setShowForm(false), 2000); }} />
          </motion.div>
        ) : (
          <motion.div 
            key="reports"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center gap-2">
                <History className="w-5 h-5 text-emerald-500" />
                <h2 className="text-xl font-bold text-slate-900">My Rescue Reports</h2>
              </div>
              <div className="p-6">
                {loading ? (
                  <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
                  </div>
                ) : reports.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-slate-400">You haven't reported any animals yet.</p>
                    <button 
                      onClick={() => setShowForm(true)}
                      className="mt-4 text-emerald-600 font-bold hover:underline"
                    >
                      Report your first rescue
                    </button>
                  </div>
                ) : (
                  <motion.div 
                    variants={{
                      animate: {
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                    initial="initial"
                    animate="animate"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {reports.map(report => (
                      <ReportCard key={report.id} report={report} />
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
