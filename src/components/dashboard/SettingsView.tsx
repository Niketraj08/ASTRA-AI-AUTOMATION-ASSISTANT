import React, { useState } from 'react';
import { Key, ShieldCheck, CreditCard, Bell, Users, CheckCircle2, Volume2, Mic } from 'lucide-react';
import { Role, UserProfile } from '../../types';
import { VoiceProfilesSection } from './VoiceProfilesSection';

interface SettingsViewProps {
  user: UserProfile;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'voice' | 'api' | 'roles' | 'billing'>('voice');

  return (
    <div className="space-y-8 max-w-6xl">
      
      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('voice')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'voice' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Voice Personas (ElevenLabs)</span>
        </button>
        <button
          onClick={() => setActiveTab('api')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'api' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>API Keys & Secrets</span>
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'roles' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Role-Based Access (RBAC)</span>
        </button>
        <button
          onClick={() => setActiveTab('billing')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'billing' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-slate-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Stripe Billing & Plans</span>
        </button>
      </div>

      {activeTab === 'voice' && <VoiceProfilesSection />}

      {activeTab === 'api' && (
        <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-400" />
            <span>AI Studio Secrets & Voice API Engine Status</span>
          </h3>
          <p className="text-xs text-slate-400">
            API Keys are injected automatically from the AI Studio Secrets environment panel or runtime variables.
          </p>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
              <div className="flex justify-between items-center text-emerald-400">
                <span>GEMINI_API_KEY</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-[10px] font-bold">CONNECTED & ACTIVE</span>
              </div>
              <div className="text-slate-500">Model Provider: Google Gemini 3.6 Flash & 3.1 Live TTS</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
              <div className="flex justify-between items-center text-purple-300">
                <span>ELEVENLABS_API_KEY</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-[10px] font-bold">CONFIGURED / READY</span>
              </div>
              <div className="text-slate-500">Speech Engine: ElevenLabs Neural Voice API (v1 Turbo & Multilingual)</div>
            </div>
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
                  <th className="p-3">ElevenLabs Personas</th>
                  <th className="p-3">Desktop Automations</th>
                  <th className="p-3">Settings & Keys</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="p-3 font-bold text-white">Super Admin</td>
                  <td className="p-3 text-emerald-400">Full Control</td>
                  <td className="p-3 text-emerald-400">Manage & Add Clones</td>
                  <td className="p-3 text-emerald-400">Full Control</td>
                  <td className="p-3 text-emerald-400">Full Control</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Manager</td>
                  <td className="p-3 text-emerald-400">View & Call</td>
                  <td className="p-3 text-cyan-400">Toggle Active Persona</td>
                  <td className="p-3 text-cyan-400">Run Only</td>
                  <td className="p-3 text-red-400">Denied</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Agent</td>
                  <td className="p-3 text-cyan-400">Listen Only</td>
                  <td className="p-3 text-slate-500">Read Only</td>
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
              <div className="text-xs text-slate-400 font-mono mt-0.5">2,500 Voice Call Minutes · 10 Custom AI Agents · ElevenLabs API Enabled</div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">ACTIVE</span>
          </div>
        </div>
      )}

    </div>
  );
};

