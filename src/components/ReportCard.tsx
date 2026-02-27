import React from 'react';
import { Report } from '../types';
import { MapPin, Calendar, User, ArrowRight, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface ReportCardProps {
  report: Report;
  onAction?: (report: Report) => void;
  actionLabel?: string;
  showAdoption?: boolean;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report, onAction, actionLabel, showAdoption }) => {
  const statusColors = {
    pending: 'bg-amber-100 text-amber-700',
    rescued: 'bg-emerald-100 text-emerald-700',
    'in-treatment': 'bg-blue-100 text-blue-700',
    adopted: 'bg-purple-100 text-purple-700',
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all group"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={report.image_url || `https://picsum.photos/seed/${report.id}/800/600`} 
          alt={report.animal_type}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <motion.span 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${statusColors[report.status]}`}
          >
            {report.status}
          </motion.span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{report.animal_type}</h3>
            <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
              <MapPin className="w-3 h-3" />
              {report.city}, {report.state}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-slate-400 text-[10px] uppercase font-semibold">
              <Calendar className="w-3 h-3" />
              {new Date(report.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>

        <p className="text-slate-600 text-sm line-clamp-2 mb-4">
          {report.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <User className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-[10px]">
              <p className="text-slate-400 uppercase font-semibold">Reported by</p>
              <p className="text-slate-900 font-bold">{report.reporter_name}</p>
            </div>
          </div>

          {onAction && (
            <button 
              onClick={() => onAction(report)}
              className="flex items-center gap-2 text-emerald-600 font-bold text-sm hover:gap-3 transition-all"
            >
              {actionLabel || 'View Details'}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {showAdoption && report.status === 'rescued' && (
            <button 
              onClick={() => onAction?.(report)}
              className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-emerald-100 transition-all"
            >
              <Heart className="w-4 h-4" />
              Adopt Me
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
