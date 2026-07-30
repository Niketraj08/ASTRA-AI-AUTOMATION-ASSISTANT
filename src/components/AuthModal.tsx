import React, { useState } from 'react';
import { X, Mail, Shield, CheckCircle2, Lock, ArrowRight, UserCheck } from 'lucide-react';
import { Role, UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [authMethod, setAuthMethod] = useState<'google' | 'github' | 'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>('Super Admin');

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate user profile login
    const profile: UserProfile = {
      id: 'usr_892011',
      name: email.split('@')[0] || 'Enterprise Admin',
      email: email || 'admin@company.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: selectedRole,
      plan: 'Professional',
      company: 'Astra Enterprise Suite',
    };
    onLoginSuccess(profile);
  };

  const handleSocialLogin = (provider: 'Google' | 'GitHub') => {
    const profile: UserProfile = {
      id: `usr_${Math.floor(Math.random() * 899999 + 100000)}`,
      name: `${provider} Certified User`,
      email: `user.${provider.toLowerCase()}@enterprise.io`,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: selectedRole,
      plan: 'Professional',
      company: 'Astra Enterprise Suite',
    };
    onLoginSuccess(profile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl space-y-6">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-2">
            <Lock className="w-3.5 h-3.5 text-purple-400" />
            <span>SECURE ENTERPRISE AUTHENTICATION</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white">Sign In to Astra AI</h3>
          <p className="text-xs text-slate-400 mt-1">
            Access your AI Voice Call Center, Desktop Workflows, and Agents workspace.
          </p>
        </div>

        {/* Role Selector */}
        <div>
          <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
            Select Initial Role Access
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['Super Admin', 'Manager', 'Agent', 'Customer'] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                  selectedRole === r
                    ? 'bg-purple-950/60 border-purple-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold">{r}</div>
                <div className="text-[10px] text-slate-500">
                  {r === 'Super Admin' ? 'Full Platform Control' : `${r} Level Policy`}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Social Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => handleSocialLogin('Google')}
            className="w-full py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold hover:border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <span className="font-bold text-blue-400">G</span>
            <span>Continue with Google Workspace</span>
          </button>
          <button
            onClick={() => handleSocialLogin('GitHub')}
            className="w-full py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold hover:border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <span>🐱</span>
            <span>Continue with GitHub SSO</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-slate-900 px-3 text-[10px] font-mono text-slate-500 uppercase">Or Email OTP</span>
        </div>

        {/* Email OTP Login Form */}
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xs hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Send 6-Digit One-Time OTP</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
              OTP code sent to {email}. (Enter 123456 to test)
            </div>

            <div className="flex gap-2 justify-center">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={otpCode[i] || ''}
                  onChange={(e) => {
                    const newOtp = [...otpCode];
                    newOtp[i] = e.target.value;
                    setOtpCode(newOtp);
                  }}
                  className="w-10 h-12 bg-slate-950 border border-slate-800 rounded-xl text-center text-lg font-mono text-white focus:outline-none focus:border-purple-500"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Verify OTP & Launch Workspace</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
