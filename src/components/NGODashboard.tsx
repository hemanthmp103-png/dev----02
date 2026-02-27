import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Report } from '../types';
import { ReportCard } from '../components/ReportCard';
import { LayoutDashboard, ClipboardList, CheckCircle2, Heart, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export const NGODashboard = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'pending' | 'rescued' | 'in-treatment' | 'all'>('all');

  useEffect(() => {
    fetchReports();
  }, [user]);

  const fetchReports = async () => {
    try {
      const res = await fetch(`/api/reports?city=${user?.city}&state=${user?.state}`);
      const data = await res.json();
      setReports(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (reportId: number, status: string) => {
    try {
      await fetch(`/api/reports/${reportId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchReports();
    } catch (e) {
      console.error(e);
    }
  };

  const filteredReports = reports.filter(r => filter === 'all' || r.status === filter);

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'pending').length,
    rescued: reports.filter(r => r.status === 'rescued').length,
    treatment: reports.filter(r => r.status === 'in-treatment').length,
  };

  return (
    <div className="space-y-8">
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
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <StatCard icon={<ClipboardList className="text-amber-500" />} label="Pending" value={stats.pending} />
        <StatCard icon={<Loader2 className="text-blue-500" />} label="In Treatment" value={stats.treatment} />
        <StatCard icon={<CheckCircle2 className="text-emerald-500" />} label="Rescued" value={stats.rescued} />
        <StatCard icon={<Heart className="text-purple-500" />} label="Total Reports" value={stats.total} />
      </motion.div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-bold text-slate-900">Rescue Requests in {user?.city}</h2>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {(['all', 'pending', 'in-treatment', 'rescued'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              No reports found matching this filter.
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
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {filteredReports.map(report => (
                <motion.div 
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 }
                  }}
                  key={report.id} 
                  className="relative"
                >
                  <ReportCard report={report} />
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    {report.status === 'pending' && (
                      <button 
                        onClick={() => updateStatus(report.id, 'in-treatment')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-200"
                      >
                        Start Rescue
                      </button>
                    )}
                    {report.status === 'in-treatment' && (
                      <button 
                        onClick={() => updateStatus(report.id, 'rescued')}
                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200"
                      >
                        Mark as Rescued
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) => (
  <motion.div 
    variants={{
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 }
    }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm hover:shadow-md transition-all"
  >
    <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-display font-bold text-slate-900">{value}</p>
    </div>
  </motion.div>
);
