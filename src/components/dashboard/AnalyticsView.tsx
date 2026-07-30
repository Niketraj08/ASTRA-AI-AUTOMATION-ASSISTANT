import React from 'react';
import { BarChart3, TrendingUp, Clock, Zap, PhoneCall } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-8">
      
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800">
          <span className="font-mono text-xs text-slate-400 uppercase">Avg Voice Response Latency</span>
          <div className="text-3xl font-extrabold text-cyan-400 font-mono mt-2">142 ms</div>
          <span className="text-[10px] text-emerald-400 font-mono mt-1 block">✓ Under 200ms Target SLA</span>
        </div>
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800">
          <span className="font-mono text-xs text-slate-400 uppercase">First Contact Resolution</span>
          <div className="text-3xl font-extrabold text-purple-400 font-mono mt-2">94.8%</div>
          <span className="text-[10px] text-emerald-400 font-mono mt-1 block">+3.2% vs last month</span>
        </div>
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800">
          <span className="font-mono text-xs text-slate-400 uppercase">Estimated Dollar Savings</span>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-2">$48,200</div>
          <span className="text-[10px] text-slate-400 font-mono mt-1 block">Based on $38/hr employee baseline</span>
        </div>
      </div>

      {/* Interactive Bar Chart Visualization */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-sm text-white">Monthly Voice Call Volume & Automation Resolution Rate</h3>
            <p className="text-xs text-slate-400">Real-time call volume distribution across Astra AI Voice Employees.</p>
          </div>
          <span className="font-mono text-xs text-purple-400">JULY 2026</span>
        </div>

        {/* SVG Simulated Chart */}
        <div className="h-64 flex items-end justify-between gap-3 pt-6 px-4">
          {[
            { day: 'Mon', calls: 60, auto: 55 },
            { day: 'Tue', calls: 85, auto: 82 },
            { day: 'Wed', calls: 95, auto: 91 },
            { day: 'Thu', calls: 110, auto: 104 },
            { day: 'Fri', calls: 120, auto: 115 },
            { day: 'Sat', calls: 45, auto: 42 },
            { day: 'Sun', calls: 30, auto: 29 },
          ].map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div className="w-full flex justify-center gap-1 items-end h-full">
                <div
                  className="w-4 bg-purple-500/80 rounded-t transition-all hover:bg-purple-400"
                  style={{ height: `${bar.calls}%` }}
                  title={`Calls: ${bar.calls}`}
                />
                <div
                  className="w-4 bg-cyan-400/80 rounded-t transition-all hover:bg-cyan-300"
                  style={{ height: `${bar.auto}%` }}
                  title={`Automated: ${bar.auto}`}
                />
              </div>
              <span className="font-mono text-[10px] text-slate-400">{bar.day}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-800 font-mono text-xs">
          <div className="flex items-center gap-2 text-purple-400">
            <span className="w-3 h-3 rounded bg-purple-500" />
            <span>Total Inbound/Outbound Calls</span>
          </div>
          <div className="flex items-center gap-2 text-cyan-400">
            <span className="w-3 h-3 rounded bg-cyan-400" />
            <span>Fully Automated End-to-End</span>
          </div>
        </div>
      </div>

    </div>
  );
};
