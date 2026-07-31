import React, { useState } from 'react';
import { Zap, Play, Plus, CheckCircle2, RotateCw, Terminal, Layers, Clock, AlertTriangle, Filter } from 'lucide-react';
import { AutomationWorkflow } from '../../types';
import { WorkflowStatusBadge } from './WorkflowStatusBadge';

interface AutomationViewProps {
  workflows: AutomationWorkflow[];
}

export const AutomationView: React.FC<AutomationViewProps> = ({ workflows }) => {
  const [activeWorkflow, setActiveWorkflow] = useState<AutomationWorkflow>(workflows[0] || {});
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Pending' | 'Failed'>('All');
  const [logs, setLogs] = useState<string[]>([]);
  const [executing, setExecuting] = useState(false);

  const filteredWorkflows = workflows.filter((wf) => {
    if (statusFilter === 'All') return true;
    return wf.status.toLowerCase() === statusFilter.toLowerCase();
  });

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
      setLogs((prev) => [...prev, `[LOG]: Execution finished for workflow "${activeWorkflow.title}" with status: ${activeWorkflow.status}`]);
    } finally {
      setExecuting(false);
    }
  };

  const getStepStatusBadge = (stepStatus: string) => {
    switch (stepStatus) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Completed</span>
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold">
            <RotateCw className="w-3 h-3 text-cyan-400 animate-spin" />
            <span>In Progress</span>
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>Pending</span>
          </span>
        );
      case 'Failed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[10px] font-mono font-bold">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            <span>Failed</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Desktop & Cross-Platform Automation Workflows</span>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30">
              {workflows.length} Configured
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            Manage autonomous tasks running across browser, desktop applications, email, and WhatsApp with live status tracking.
          </p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xs flex items-center gap-2 hover:opacity-90 transition-all shadow-lg">
          <Plus className="w-4 h-4" />
          <span>Create Custom Workflow</span>
        </button>
      </div>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Workflows Selection */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Status Filter Bar */}
          <div className="p-2 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-1 overflow-x-auto text-xs font-mono">
            <div className="px-2 text-slate-500 flex items-center gap-1 shrink-0 text-[10px]">
              <Filter className="w-3 h-3 text-purple-400" />
              <span>STATUS:</span>
            </div>
            {(['All', 'Active', 'Pending', 'Failed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-xl text-[11px] font-extrabold transition-all shrink-0 ${
                  statusFilter === st
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Workflow Cards */}
          <div className="space-y-3">
            {filteredWorkflows.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-500">
                No automation workflows matching state filter "{statusFilter}".
              </div>
            ) : (
              filteredWorkflows.map((wf) => {
                const selected = wf.id === activeWorkflow.id;
                return (
                  <div
                    key={wf.id}
                    onClick={() => setActiveWorkflow(wf)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selected
                        ? 'bg-purple-950/60 border-purple-500 text-white shadow-lg ring-1 ring-purple-500/50'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-sm text-white block truncate">{wf.title}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono">
                          {wf.category}
                        </span>
                        <WorkflowStatusBadge status={wf.status} size="sm" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{wf.description}</p>
                    <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>Triggers: {wf.triggerCount}</span>
                      <span>Success: {wf.successRate}%</span>
                      <span className="text-slate-400">{wf.lastRun}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Steps Visualizer & Live Runner Log */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-bold text-sm text-white">Workflow Steps: {activeWorkflow.title}</h3>
                </div>
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-[11px] text-slate-400 font-mono">Category: {activeWorkflow.category}</span>
                  <span className="text-slate-600">·</span>
                  <WorkflowStatusBadge status={activeWorkflow.status} size="sm" />
                </div>
              </div>
              <button
                onClick={handleRunWorkflow}
                disabled={executing}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
              >
                {executing ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-slate-950" />}
                <span>Execute Workflow</span>
              </button>
            </div>

            {/* Steps List */}
            <div className="space-y-3 mb-6">
              {activeWorkflow.steps?.map((st, i) => (
                <div key={st.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-bold text-white">{st.title}</div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">{st.action}</div>
                    </div>
                  </div>
                  <div className="shrink-0">
                    {getStepStatusBadge(st.status)}
                  </div>
                </div>
              ))}
            </div>

            {/* Execution Log Terminal */}
            {logs.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 space-y-1 max-h-40 overflow-y-auto">
                <div className="text-slate-500 uppercase text-[10px] pb-1 border-b border-slate-900 flex items-center justify-between">
                  <span>Execution Output</span>
                  <span className="text-purple-400">{activeWorkflow.status}</span>
                </div>
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
