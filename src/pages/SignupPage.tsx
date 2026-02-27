import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, Mail, Lock, User, MapPin, Building2, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(['user', 'ngo']),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export const SignupPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: 'user' }
  });

  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        login(result);
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl"
      >
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-100 mb-4">
              <UserPlus className="w-7 h-7 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-display font-bold text-slate-900">Join PawRescue</h1>
            <p className="text-slate-500">Create an account to start rescuing animals</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name / NGO Name</label>
                  <div className="relative">
                    <input {...register('name')} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="John Doe" />
                    <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <input {...register('email')} type="email" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="name@example.com" />
                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <input {...register('password')} type="password" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="••••••••" />
                    <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">I am a...</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="cursor-pointer">
                      <input type="radio" {...register('role')} value="user" className="hidden peer" />
                      <div className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 peer-checked:bg-emerald-50 peer-checked:border-emerald-500 peer-checked:text-emerald-700 transition-all">
                        <User className="w-4 h-4" />
                        <span className="text-sm font-bold">User</span>
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input type="radio" {...register('role')} value="ngo" className="hidden peer" />
                      <div className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 peer-checked:bg-emerald-50 peer-checked:border-emerald-500 peer-checked:text-emerald-700 transition-all">
                        <Building2 className="w-4 h-4" />
                        <span className="text-sm font-bold">NGO</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">City</label>
                  <div className="relative">
                    <input {...register('city')} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. Bangalore" />
                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                  </div>
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">State</label>
                  <div className="relative">
                    <input {...register('state')} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. Karnataka" />
                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                  </div>
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Create Account"}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-slate-500">
            Already have an account? <Link to="/login" className="text-emerald-600 font-bold hover:underline">Log In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
