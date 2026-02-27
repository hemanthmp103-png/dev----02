import React, { useState, useEffect } from 'react';
import { findNearbyClinics } from '../services/gemini';
import { MapPin, Phone, ExternalLink, Loader2, Search, Navigation } from 'lucide-react';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';

export const ClinicFinder = () => {
  const [loading, setLoading] = useState(false);
  const [clinics, setClinics] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getClinics = async (lat: number, lng: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await findNearbyClinics(lat, lng);
      setClinics(response.text || "No clinics found nearby.");
    } catch (e) {
      setError("Failed to fetch clinics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Default to a central location if GPS fails or for demo
    getClinics(12.9716, 77.5946); // Bangalore coords
  };

  const handleGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ lat: latitude, lng: longitude });
          getClinics(latitude, longitude);
        },
        () => setError("Could not access your location. Please search manually.")
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold text-slate-900">Find Nearby Pet Clinics</h1>
        <p className="text-slate-500 max-w-xl mx-auto">Quickly locate veterinary hospitals and clinics in your area for immediate medical attention.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={handleGPS}
            className="flex-1 bg-emerald-500 text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100"
          >
            <Navigation className="w-5 h-5" />
            Use Current Location
          </button>
          <div className="flex-[2] relative">
            <form onSubmit={handleManualSearch} className="h-full">
              <input 
                placeholder="Enter your city or area..."
                className="w-full h-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold">Search</button>
            </form>
          </div>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <div className="mt-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-emerald-500" />
              <p className="text-slate-500 font-medium animate-pulse">Searching for nearby clinics...</p>
            </div>
          ) : clinics ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="prose prose-slate max-w-none"
            >
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <Markdown>{clinics}</Markdown>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-3xl">
              <MapPin className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-medium">Search to see clinics in your area</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
