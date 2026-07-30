import React, { useState } from 'react';
import { Bot, Plus, Volume2, Mic, Settings2, CheckCircle2, Shield } from 'lucide-react';
import { AgentConfig } from '../../types';

interface AgentsViewProps {
  agents: AgentConfig[];
}

export const AgentsView: React.FC<AgentsViewProps> = ({ agents: initialAgents }) => {
  const [agents, setAgents] = useState<AgentConfig[]>(initialAgents);
  const [newAgentName, setNewAgentName] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<'Kore' | 'Zephyr' | 'Puck' | 'Fenrir'>('Zephyr');

  const handleCreateAgent = () => {
    if (!newAgentName) return;
    const newAg: AgentConfig = {
      id: `ag_${Date.now()}`,
      name: newAgentName,
      voicePersona: selectedVoice,
      roleTitle: 'Custom Operational Agent',
      systemPrompt: 'You are an autonomous operations agent for Astra AI.',
      language: 'English (US)',
      activeWorkflows: 3,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'Online',
    };
    setAgents([...agents, newAg]);
    setNewAgentName('');
  };

  return (
    <div className="space-y-8">
      
      {/* Header & Quick Create */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold text-white">Custom AI Voice Agents</h2>
          <p className="text-xs text-slate-400 mt-1">Configure persona voice profiles, system prompts, and tool permissions for each agent.</p>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={newAgentName}
            onChange={(e) => setNewAgentName(e.target.value)}
            placeholder="New Agent Name..."
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={handleCreateAgent}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xs flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create Agent</span>
          </button>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((ag) => (
          <div key={ag.id} className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-0.5">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                      <Bot className="w-5 h-5 text-cyan-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{ag.name}</h3>
                    <span className="text-[10px] font-mono text-purple-400">{ag.roleTitle}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                  {ag.status}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300 mb-4">
                <div className="flex justify-between font-mono text-[10px]">
                  <span className="text-slate-400">VOICE PERSONA:</span>
                  <span className="text-cyan-400 font-bold">{ag.voicePersona} (24kHz HD)</span>
                </div>
                <div className="flex justify-between font-mono text-[10px]">
                  <span className="text-slate-400">ACTIVE WORKFLOWS:</span>
                  <span className="text-white">{ag.activeWorkflows} Workflows</span>
                </div>
              </div>
            </div>

            <button className="w-full py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500/40 transition-all text-xs font-semibold flex items-center justify-center gap-2">
              <Settings2 className="w-4 h-4" />
              <span>Configure System Prompt</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
