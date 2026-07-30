import React from 'react';
import { PhoneCall, Zap, Clock, TrendingUp, Users, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { VoiceCall, AutomationWorkflow } from '../../types';

interface OverviewViewProps {
  calls: VoiceCall[];
  automations: AutomationWorkflow[];
  onNavigateTab: (tab: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ calls, automations, onNavigateTab }) => {
  return (
    <div className="space-y-8">
      
      {/* Executive KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400 uppercase">Active Calls Today</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <PhoneCall className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-white font-mono">148</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-400 font-mono">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+24.8% vs last week</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400 uppercase">Hours Saved This Month</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-cyan-300 font-mono">428 hrs</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-400 font-mono">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Equivalent to 2.6 Full-Time Employees</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400 uppercase">Tasks Automated</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-white font-mono">12,490</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>99.8% Success Rate</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400 uppercase">Platform ROI</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">14.2x</div>
            <div className="text-xs text-slate-400 font-mono mt-1">$48,200 Net Savings</div>
          </div>
        </div>

      </div>

      {/* Main Grid: Live Voice Calls Table & Active Workflows */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Live Calls */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-purple-400" />
                <h3 className="font-bold text-sm text-white">Live & Recent Voice Calls</h3>
              </div>
              <button
                onClick={() => onNavigateTab('voice-calls')}
                className="text-xs font-mono text-purple-400 hover:underline flex items-center gap-1"
              >
                <span>View Call Center</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {calls.slice(0, 4).map((c) => (
                <div key={c.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{c.customerName} <span className="text-slate-500 font-normal">({c.customerPhone})</span></div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{c.summary}</div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      c.sentiment === 'Positive' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {c.sentiment}
                    </span>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">{c.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Automations List */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-sm text-white">Active Autonomous Workflows</h3>
              </div>
              <button
                onClick={() => onNavigateTab('automation')}
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Workflow Builder</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {automations.map((a) => (
                <div key={a.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{a.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{a.category} · {a.triggerCount} runs</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono font-semibold">
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
