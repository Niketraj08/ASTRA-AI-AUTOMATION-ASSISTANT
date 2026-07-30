import React, { useState } from 'react';
import { Key, ShieldCheck, CreditCard, Bell, Users, CheckCircle2 } from 'lucide-react';
import { Role, UserProfile } from '../../types';

interface SettingsViewProps {
  user: UserProfile;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'api' | 'roles' | 'billing'>('api');

  return (
    <div className="space-y-8 max-w-5xl">
      
      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('api')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'api' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          API Keys & Secrets
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'roles' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Role-Based Access (RBAC)
        </button>
        <button
          onClick={() => setActiveTab('billing')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'billing' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Stripe Billing & Plans
        </button>
      </div>

      {activeTab === 'api' && (
        <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-400" />
            <span>AI Studio Secrets & Gemini API Status</span>
          </h3>
          <p className="text-xs text-slate-400">
            API Keys are injected automatically from the AI Studio Secrets environment panel.
          </p>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
            <div className="flex justify-between items-center text-emerald-400">
              <span>GEMINI_API_KEY</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-[10px] font-bold">CONNECTED & ACTIVE</span>
            </div>
            <div className="text-slate-500">Model Provider: Google Gemini 3.6 Flash & 3.1 Live TTS</div>
          </div>
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            <span>Role-Based Access Control Permissions Matrix</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono text-slate-300">
              <thead className="bg-slate-950 text-slate-400">
                <tr>
                  <th className="p-3">Role</th>
                  <th className="p-3">Voice Calls</th>
                  <th className="p-3">Desktop Automations</th>
                  <th className="p-3">Settings & Keys</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="p-3 font-bold text-white">Super Admin</td>
                  <td className="p-3 text-emerald-400">Full Control</td>
                  <td className="p-3 text-emerald-400">Full Control</td>
                  <td className="p-3 text-emerald-400">Full Control</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Manager</td>
                  <td className="p-3 text-emerald-400">View & Call</td>
                  <td className="p-3 text-cyan-400">Run Only</td>
                  <td className="p-3 text-red-400">Denied</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Agent</td>
                  <td className="p-3 text-cyan-400">Listen Only</td>
                  <td className="p-3 text-red-400">Denied</td>
                  <td className="p-3 text-red-400">Denied</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>Stripe Enterprise Subscription</span>
          </h3>

          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">Professional Plan ($149/mo)</div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">2,500 Voice Call Minutes · 10 Custom AI Agents</div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">ACTIVE</span>
          </div>
        </div>
      )}

    </div>
  );
};
