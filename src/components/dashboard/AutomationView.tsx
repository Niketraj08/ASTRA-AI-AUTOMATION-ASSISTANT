import React, { useState } from 'react';
import { Zap, Play, Plus, CheckCircle2, RotateCw, Terminal, Layers } from 'lucide-react';
import { AutomationWorkflow } from '../../types';

interface AutomationViewProps {
  workflows: AutomationWorkflow[];
}

export const AutomationView: React.FC<AutomationViewProps> = ({ workflows }) => {
  const [activeWorkflow, setActiveWorkflow] = useState<AutomationWorkflow>(workflows[0]);
  const [logs, setLogs] = useState<string[]>([]);
  const [executing, setExecuting] = useState(false);

  const handleRunWorkflow = async () => {
    setExecuting(true);
    setLogs(['[SYS]: Connecting to Astra Desktop Agent Engine...']);

    try {
      const res = await fetch('/api/automations/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflowTitle: activeWorkflow.title,
          steps: activeWorkflow.steps,
        }),
      });

      const data = await res.json();
      setLogs((prev) => [...prev, ...data.logs]);
    } catch (err) {
      console.error(err);
    } finally {
      setExecuting(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Desktop & Cross-Platform Automation Workflows</h2>
          <p className="text-xs text-slate-400">Manage autonomous tasks running across browser, desktop applications, email, and WhatsApp.</p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xs flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Create Custom Workflow</span>
        </button>
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Workflows Selection */}
        <div className="lg:col-span-5 space-y-3">
          {workflows.map((wf) => {
            const selected = wf.id === activeWorkflow.id;
            return (
              <div
                key={wf.id}
                onClick={() => setActiveWorkflow(wf)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selected
                    ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{wf.title}</span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono">
                    {wf.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{wf.description}</p>
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Triggers: {wf.triggerCount}</span>
                  <span>Success: {wf.successRate}%</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Steps Visualizer & Live Runner Log */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Workflow Steps: {activeWorkflow.title}</span>
              </h3>
              <button
                onClick={handleRunWorkflow}
                disabled={executing}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-1.5"
              >
                {executing ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-slate-950" />}
                <span>Execute Workflow</span>
              </button>
            </div>

            {/* Steps List */}
            <div className="space-y-3 mb-6">
              {activeWorkflow.steps.map((st, i) => (
                <div key={st.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-mono font-bold text-xs">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white">{st.title}</div>
                    <div className="text-[10px] font-mono text-slate-400">{st.action}</div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              ))}
            </div>

            {/* Execution Log Terminal */}
            {logs.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 space-y-1 max-h-40 overflow-y-auto">
                <div className="text-slate-500 uppercase text-[10px] pb-1 border-b border-slate-900">Execution Output</div>
                {logs.map((lg, idx) => (
                  <p key={idx}>{lg}</p>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
