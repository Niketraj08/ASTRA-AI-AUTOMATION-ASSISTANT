import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, RotateCw, PauseCircle, HelpCircle } from 'lucide-react';
import { AutomationWorkflow } from '../../types';

interface WorkflowStatusBadgeProps {
  status: AutomationWorkflow['status'] | string;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export const WorkflowStatusBadge: React.FC<WorkflowStatusBadgeProps> = ({
  status,
  size = 'md',
  showLabel = true,
}) => {
  const normStatus = (status || '').toLowerCase();

  if (normStatus === 'active') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono font-extrabold shadow-sm ${
          size === 'sm' ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[10px]'
        }`}
        title="Workflow is Active and executing scheduled triggers"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <CheckCircle2 className={`${size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-emerald-400 shrink-0`} />
        {showLabel && <span>Active</span>}
      </span>
    );
  }

  if (normStatus === 'pending' || normStatus === 'in progress') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono font-extrabold shadow-sm ${
          size === 'sm' ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[10px]'
        }`}
        title="Workflow execution is Pending queued trigger or awaiting approval"
      >
        <Clock className={`${size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-amber-400 animate-spin-slow shrink-0`} />
        {showLabel && <span>Pending</span>}
      </span>
    );
  }

  if (normStatus === 'failed') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono font-extrabold shadow-sm ${
          size === 'sm' ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[10px]'
        }`}
        title="Workflow run encountered a Failed execution step"
      >
        <AlertTriangle className={`${size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-rose-400 shrink-0`} />
        {showLabel && <span>Failed</span>}
      </span>
    );
  }

  if (normStatus === 'executing') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-mono font-extrabold shadow-sm ${
          size === 'sm' ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[10px]'
        }`}
        title="Workflow is currently Executing actions"
      >
        <RotateCw className={`${size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-cyan-400 animate-spin shrink-0`} />
        {showLabel && <span>Executing</span>}
      </span>
    );
  }

  if (normStatus === 'paused' || normStatus === 'draft') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono font-bold shadow-sm ${
          size === 'sm' ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[10px]'
        }`}
      >
        <PauseCircle className={`${size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-slate-400 shrink-0`} />
        {showLabel && <span className="capitalize">{status}</span>}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 font-mono font-bold shadow-sm ${
        size === 'sm' ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[10px]'
      }`}
    >
      <HelpCircle className={`${size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-purple-400 shrink-0`} />
      {showLabel && <span>{status}</span>}
    </span>
  );
};
