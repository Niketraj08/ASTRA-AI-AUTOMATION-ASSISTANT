import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  Clock,
  RefreshCw,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Monitor,
  Smartphone,
  Cpu,
  Globe,
  AlertTriangle,
  Terminal,
  ShieldAlert,
  Sparkles,
  Layers,
  ArrowRight,
  Sliders,
  Check,
  X,
  Copy,
} from 'lucide-react';
import { VoiceCommandExecutionPlan, ExecutionStep } from '../../types';

interface LiveExecutionTimelineProps {
  plan: VoiceCommandExecutionPlan;
  isExecuting: boolean;
  onRunPlan: () => void;
  onPausePlan?: () => void;
  onResetPlan?: () => void;
  onAddStep?: () => void;
  onRemoveStep?: (stepId: string) => void;
  onUpdateStepStatus?: (stepId: string, status: ExecutionStep['status'], result?: string) => void;
}

export const LiveExecutionTimeline: React.FC<LiveExecutionTimelineProps> = ({
  plan,
  isExecuting,
  onRunPlan,
  onPausePlan,
  onResetPlan,
  onAddStep,
  onRemoveStep,
  onUpdateStepStatus,
}) => {
  const [expandedStepId, setExpandedStepId] = useState<string | null>(null);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const [logFilter, setLogFilter] = useState<'all' | 'terminal' | 'devices'>('all');
  const [copiedStepId, setCopiedStepId] = useState<string | null>(null);

  // Timer calculation
  useEffect(() => {
    let interval: any = null;
    if (isExecuting && !isPaused) {
      interval = setInterval(() => {
        setElapsedMs((prev) => prev + 100);
      }, 100 / speedMultiplier);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isExecuting, isPaused, speedMultiplier]);

  // Total steps statistics
  const totalSteps = plan.steps.length;
  const completedSteps = plan.steps.filter((s) => s.status === 'Completed').length;
  const inProgressSteps = plan.steps.filter((s) => s.status === 'In Progress').length;
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  const getDeviceIcon = (targetDevice: string) => {
    switch (targetDevice) {
      case 'Desktop':
        return <Monitor className="w-4 h-4 text-purple-400" />;
      case 'Mobile (Android)':
        return <Smartphone className="w-4 h-4 text-cyan-400" />;
      case 'Cloud AI Engine':
        return <Cpu className="w-4 h-4 text-emerald-400" />;
      case 'Web Browser':
        return <Globe className="w-4 h-4 text-blue-400" />;
      default:
        return <Zap className="w-4 h-4 text-amber-400" />;
    }
  };

  const copyStepLog = (step: ExecutionStep) => {
    const text = `Step: ${step.title}\nTarget: ${step.targetDevice}\nStatus: ${step.status}\nDetails: ${step.details}\nResult: ${step.resultOutput || 'N/A'}`;
    navigator.clipboard.writeText(text);
    setCopiedStepId(step.id);
    setTimeout(() => setCopiedStepId(null), 2000);
  };

  return (
    <div id="live-execution-timeline-container" className="p-6 rounded-3xl bg-slate-900/90 border border-purple-500/30 backdrop-blur-md space-y-6 shadow-2xl relative overflow-hidden">
      {/* Dynamic Background Ambient Light */}
      <div
        className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isExecuting
            ? 'bg-cyan-500/15'
            : progressPercent === 100
            ? 'bg-emerald-500/15'
            : 'bg-purple-600/10'
        }`}
      />

      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
              LIVE EXECUTION TIMELINE
            </span>

            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                progressPercent === 100
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : isExecuting
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 animate-pulse'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}
            >
              {progressPercent === 100 ? 'COMPLETED (100%)' : isExecuting ? 'EXECUTING LIVE' : 'READY FOR EXECUTION'}
            </span>
          </div>

          <h3 className="text-base font-extrabold text-white mt-1.5 flex items-center gap-2">
            <span>{plan.commandText}</span>
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Category: <span className="text-purple-300">{plan.intentCategory}</span> · Confidence Score:{' '}
            <span className="text-emerald-400 font-bold">{plan.confidenceScore.toFixed(1)}%</span>
          </p>
        </div>

        {/* Speed & Execution Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-1 text-[11px] font-mono">
            <Sliders className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            {[1, 2, 5].map((speed) => (
              <button
                key={speed}
                onClick={() => setSpeedMultiplier(speed)}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  speedMultiplier === speed
                    ? 'bg-purple-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Reset button */}
          {onResetPlan && (
            <button
              onClick={() => {
                setElapsedMs(0);
                setIsPaused(false);
                onResetPlan();
              }}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all text-xs flex items-center gap-1.5"
              title="Reset Execution Timeline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Execute / Pause Main Button */}
          <button
            onClick={onRunPlan}
            disabled={isExecuting && !isPaused}
            className={`px-5 py-2.5 rounded-2xl font-extrabold text-xs transition-all flex items-center gap-2 shadow-lg ${
              isExecuting
                ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/30'
                : progressPercent === 100
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-purple-600/30'
            }`}
          >
            {isExecuting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running ({progressPercent}%)</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>{progressPercent === 100 ? 'Re-Run Timeline' : 'Execute Timeline'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress & Live Telemetry Bar */}
      <div className="space-y-2 relative z-10">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3 text-slate-300">
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Progress: <strong className="text-white">{completedSteps} / {totalSteps} Steps</strong></span>
            </span>
            <span>·</span>
            <span className="text-slate-400">
              Timer: <strong className="text-purple-300">{(elapsedMs / 1000).toFixed(1)}s</strong>
            </span>
          </div>

          <div className="text-[11px] text-slate-400 font-mono">
            {progressPercent}% Complete
          </div>
        </div>

        {/* Animated Progress Bar using Framer Motion */}
        <div className="w-full h-3 bg-slate-950 rounded-full border border-slate-800 overflow-hidden relative p-0.5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-purple-600 via-cyan-500 to-emerald-400 relative"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          >
            {/* Shimmer effect inside progress bar */}
            {isExecuting && (
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* Animated Vertical/Horizontal Step Flow Timeline */}
      <div className="space-y-4 pt-2 relative z-10">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-2 font-mono">
            <Terminal className="w-4 h-4 text-purple-400" />
            <span>Interactive Workflow Execution Steps</span>
          </h4>

          {onAddStep && (
            <button
              onClick={onAddStep}
              className="px-2.5 py-1 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono font-semibold flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Step</span>
            </button>
          )}
        </div>

        {/* Animated Framer Motion Steps Stack */}
        <div className="relative space-y-4">
          {/* Vertical Connecting Guide Line */}
          <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-slate-800 pointer-events-none" />

          {/* Dynamic Motion Progress Line */}
          <motion.div
            className="absolute left-[27px] top-6 w-0.5 bg-gradient-to-b from-purple-500 via-cyan-400 to-emerald-400 pointer-events-none"
            initial={{ height: 0 }}
            animate={{
              height: totalSteps > 1 ? `${(completedSteps / (totalSteps - 1)) * 88}%` : '0%',
            }}
            transition={{ duration: 0.5 }}
          />

          <AnimatePresence mode="popLayout">
            {plan.steps.map((step, idx) => {
              const isExpanded = expandedStepId === step.id;
              const isCurrent = step.status === 'In Progress';
              const isDone = step.status === 'Completed';

              return (
                <motion.div
                  key={step.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`relative pl-14 p-4 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-slate-950/90 border-cyan-500/60 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                      : isDone
                      ? 'bg-slate-950/70 border-slate-800/90'
                      : 'bg-slate-950/40 border-slate-800/60 opacity-80'
                  }`}
                >
                  {/* Step Node Indicator Circle with Pulse Animations */}
                  <div className="absolute left-3 top-4 flex items-center justify-center">
                    {isCurrent && (
                      <motion.div
                        className="absolute w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/40"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0.6] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      />
                    )}

                    <div
                      className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shadow-lg transition-all relative z-10 ${
                        isDone
                          ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
                          : isCurrent
                          ? 'bg-cyan-500 text-slate-950 shadow-cyan-500/30 animate-pulse'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {isDone ? (
                        <Check className="w-5 h-5 stroke-[3]" />
                      ) : isCurrent ? (
                        <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>
                  </div>

                  {/* Main Step Header Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-extrabold text-sm text-white">{step.title}</span>

                        {/* Target Device Tag */}
                        <span className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 flex items-center gap-1.5">
                          {getDeviceIcon(step.targetDevice)}
                          <span>{step.targetDevice}</span>
                        </span>

                        {step.actionType && (
                          <span className="px-2 py-0.5 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-mono">
                            {step.actionType}
                          </span>
                        )}

                        {step.requiresUserConfirm && (
                          <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-mono font-bold flex items-center gap-1">
                            <ShieldAlert className="w-3 h-3 text-amber-400" />
                            CONFIRM REQ
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-400">{step.details}</p>
                    </div>

                    {/* Step Controls */}
                    <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                      <span
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold border ${
                          isDone
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : isCurrent
                            ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 animate-pulse'
                            : 'bg-slate-900 text-slate-500 border-slate-800'
                        }`}
                      >
                        {step.status}
                      </span>

                      <button
                        onClick={() => copyStepLog(step)}
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs"
                        title="Copy Step Log"
                      >
                        {copiedStepId === step.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        onClick={() => setExpandedStepId(isExpanded ? null : step.id)}
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {onRemoveStep && (
                        <button
                          onClick={() => onRemoveStep(step.id)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 hover:text-red-400"
                          title="Delete Step"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Execution Result Banner */}
                  {step.resultOutput && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="flex-1">{step.resultOutput}</span>
                    </motion.div>
                  )}

                  {/* Expanded Step Details & Payload Log Drawer */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 pt-3 border-t border-slate-800/80 space-y-3"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                            <div className="text-[10px] text-slate-500 uppercase">Target Device Connector</div>
                            <div className="text-white font-bold">{step.targetDevice} API Driver</div>
                            <div className="text-[10px] text-cyan-400">Status: Authenticated & Active</div>
                          </div>

                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                            <div className="text-[10px] text-slate-500 uppercase">Action Protocol</div>
                            <div className="text-purple-300 font-bold">{step.actionType || 'Standard Script'}</div>
                            <div className="text-[10px] text-slate-400">Timeout: 30000ms</div>
                          </div>
                        </div>

                        {/* Raw JSON Payload / Console Stream Simulator */}
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1 overflow-x-auto">
                          <div className="text-[10px] text-slate-500 uppercase flex items-center justify-between">
                            <span>Astra Terminal Stream Logs</span>
                            <span className="text-emerald-400">LIVE BRIDGE</span>
                          </div>
                          <pre className="text-purple-300 leading-relaxed">
{`{
  "step_id": "${step.id}",
  "title": "${step.title}",
  "target": "${step.targetDevice}",
  "action": "${step.actionType || 'Script'}",
  "status": "${step.status}",
  "timestamp": "${new Date().toISOString()}"
}`}
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
