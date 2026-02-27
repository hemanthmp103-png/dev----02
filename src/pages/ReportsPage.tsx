import React, { useState, useEffect } from 'react';
import { Report } from '../types';
import { ReportCard } from '../components/ReportCard';
import { Search, Filter, MapPin, Loader2, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

export const ReportsPage = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reports?city=${city}&state=${state}`);
      const data = await res.json();
      setReports(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAdopt = async (report: Report) => {
    if (!user) {
      alert("Please login to express interest in adoption.");
      return;
    }
    try {
      const res = await fetch('/api/adoptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ report_id: report.id, user_id: user.id })
      });
      if (res.ok) {
        alert("Interest expressed! The reporter/NGO will contact you.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-slate-900">Rescue Reports</h1>
          <p className="text-slate-500">View and support animal rescue efforts across different cities.</p>
        </div>

        <div className="flex flex-wrap gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl bg-slate-50 border-none text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-32"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl bg-slate-50 border-none text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-32"
            />
          </div>
          <button 
            onClick={fetchReports}
            className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all"
          >
            Filter
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-40">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-500" />
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-40 bg-white rounded-3xl border border-slate-200">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-slate-200" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No reports found</h3>
          <p className="text-slate-500">Try adjusting your filters or search for a different city.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map(report => (
            <ReportCard 
              key={report.id} 
              report={report} 
              showAdoption={true}
              onAction={handleAdopt}
            />
          ))}
        </div>
      )}
    </div>
  );
};
