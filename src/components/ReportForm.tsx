import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../contexts/AuthContext';
import { Camera, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const reportSchema = z.object({
  animal_type: z.string().min(1, "Animal type is required"),
  description: z.string().min(10, "Please provide more details"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
});

type ReportFormValues = z.infer<typeof reportSchema>;

export const ReportForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { user } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema)
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
  };

  const onSubmit = async (data: ReportFormValues) => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          reporter_id: user.id,
          image_url: image,
          latitude: location?.lat,
          longitude: location?.lng
        }),
      });
      if (response.ok) {
        setSubmitted(true);
        onSuccess?.();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Report Submitted!</h3>
        <p className="text-slate-500 mb-6">Thank you for helping an animal in need. NGOs in your area have been notified.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-emerald-600 font-semibold hover:underline"
        >
          Submit another report
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Animal Type</label>
            <input 
              {...register('animal_type')}
              placeholder="e.g. Dog, Cat, Bird"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
            />
            {errors.animal_type && <p className="text-red-500 text-xs mt-1">{errors.animal_type.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
            <textarea 
              {...register('description')}
              rows={4}
              placeholder="Describe the animal's condition and exact location details..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none resize-none"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative aspect-video bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center overflow-hidden group">
            {image ? (
              <>
                <img src={image} className="w-full h-full object-cover" alt="Preview" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer bg-white px-4 py-2 rounded-lg text-sm font-semibold">Change Image</label>
                </div>
              </>
            ) : (
              <div className="text-center p-6">
                <Camera className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-500">Upload a clear photo of the animal</p>
                <label className="mt-4 inline-block cursor-pointer bg-white px-4 py-2 rounded-lg text-sm font-semibold border border-slate-200 shadow-sm hover:bg-slate-50">
                  Select Photo
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>
            )}
            <input type="file" accept="image/*" className="hidden" id="image-upload" onChange={handleImageChange} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">City</label>
              <input 
                {...register('city')}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">State</label>
              <input 
                {...register('state')}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Address</label>
            <div className="relative">
              <input 
                {...register('address')}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <button 
            type="button"
            onClick={getCurrentLocation}
            className="text-xs text-emerald-600 font-medium flex items-center gap-1 hover:underline"
          >
            <MapPin className="w-3 h-3" />
            {location ? "Location Captured" : "Use current GPS location"}
          </button>
        </div>
      </div>

      <button 
        disabled={loading}
        className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Rescue Report"}
      </button>
    </form>
  );
};
