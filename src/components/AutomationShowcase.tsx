import React, { useState } from 'react';
import { Play, CheckCircle2, RotateCw, Sparkles, Terminal, FileCheck, Send, Calendar, PhoneCall, Database } from 'lucide-react';

export const AutomationShowcase: React.FC = () => {
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const workflows = [
    {
      title: 'Inbound Customer Call & CRM Lead Qualification',
      icon: PhoneCall,
      steps: [
        { label: 'Answer PSTN Phone Call', detail: 'Astra AI answers inbound call in <180ms using Kore voice persona.' },
        { label: 'Perform Speech Understanding & Intent Classification', detail: 'Identified request: Product pricing inquiry for 50-person enterprise.' },
        { label: 'Read Screen & Query CRM Database', detail: 'Looks up customer record in Salesforce & checks stock availability.' },
        { label: 'Generate PDF Proposal & Send via Email', detail: 'Auto-generates custom contract PDF and emails to customer inbox.' },
        { label: 'Schedule Follow-up in Google Calendar', detail: 'Books meeting for Thursday 10:00 AM with Account Executive.' },
      ],
    },
    {
      title: 'Desktop Application Control & Invoice Extraction',
      icon: FileCheck,
      steps: [
        { label: 'Open Desktop QuickBooks / ERP App', detail: 'Visually locates app window on desktop screen.' },
        { label: 'Extract PDF Invoice Data via OCR Vision', detail: 'Parses vendor name, total amount ($4,850.00), and due date.' },
        { label: 'Fill Accounting Form & Submit Entry', detail: 'Simulates keystrokes and mouse clicks to file expense.' },
        { label: 'Dispatch WhatsApp Confirmation', detail: 'Notifies CFO on WhatsApp Business API.' },
      ],
    },
    {
      title: 'Browser Automation & Support Ticket Resolution',
      icon: Terminal,
      steps: [
        { label: 'Log into Zendesk / Jira Portal', detail: 'Authenticates securely using stored encrypted token.' },
        { label: 'Read Unresolved Support Tickets', detail: 'Analyzes customer complaint sentiment and technical logs.' },
        { label: 'Generate AI Solution & Reply', detail: 'Drafts exact resolution steps using knowledge base docs.' },
        { label: 'Mark Ticket Resolved & Update Metrics', detail: 'Closes ticket and logs 99.4% CSAT score in analytics.' },
      ],
    },
  ];

  const handleRunWorkflow = () => {
    setIsRunning(true);
    setCurrentStep(0);

    const stepsCount = workflows[activeWorkflowIndex].steps.length;
    let step = 0;

    const interval = setInterval(() => {
      step += 1;
      if (step < stepsCount) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 1200);
  };

  const activeWf = workflows[activeWorkflowIndex];

  return (
    <section id="automations" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>AUTONOMOUS EXECUTION ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            See Astra Execute Complex Workflows <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">In Real Time</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base">
            Watch Astra interact with desktop software, web portals, phone systems, and CRMs autonomously.
          </p>
        </div>

        {/* Interactive Runner Box */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
          
          {/* Workflow Selector Tabs */}
          <div className="flex flex-wrap gap-3 mb-8">
            {workflows.map((wf, idx) => {
              const IconComp = wf.icon;
              const active = idx === activeWorkflowIndex;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveWorkflowIndex(idx);
                    setCurrentStep(0);
                    setIsRunning(false);
                  }}
                  className={`flex-1 min-w-[240px] p-4 rounded-2xl border text-left transition-all ${
                    active
                      ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-purple-500 text-white shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${active ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-xs leading-tight">{wf.title}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Workflow Steps Preview Container */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Steps List */}
            <div className="md:col-span-7 space-y-3">
              {activeWf.steps.map((s, stepIdx) => {
                const isCompleted = stepIdx < currentStep || (!isRunning && currentStep === activeWf.steps.length - 1);
                const isCurrent = isRunning && stepIdx === currentStep;

                return (
                  <div
                    key={stepIdx}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-purple-950/60 border-purple-500 text-white shadow-md ring-2 ring-purple-500/30'
                        : isCompleted
                        ? 'bg-slate-950/90 border-emerald-500/40 text-slate-200'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-500'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                            isCompleted
                              ? 'bg-emerald-500 text-slate-950'
                              : isCurrent
                              ? 'bg-purple-500 text-white animate-pulse'
                              : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {isCompleted ? '✓' : stepIdx + 1}
                        </div>
                        <span className="font-semibold text-xs text-white">{s.label}</span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-500">STEP 0{stepIdx + 1}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2 pl-9">{s.detail}</p>
                  </div>
                );
              })}
            </div>

            {/* Right Interactive Execution Control & Log Terminal */}
            <div className="md:col-span-5 bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between h-[360px]">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <span className="font-mono text-xs text-slate-400 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span>ASTRA ENGINE LOGS</span>
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>

                <div className="font-mono text-[11px] space-y-2 text-slate-300">
                  <p className="text-slate-500">[SYSTEM]: Workflow Engine Initialized.</p>
                  <p className="text-cyan-400">[VISION]: Screen resolution calibrated 3840x2160.</p>
                  <p className="text-purple-400">[EXEC]: Target step {currentStep + 1} / {activeWf.steps.length}</p>
                  <p className="text-emerald-400">
                    {isRunning ? '[STATUS]: Executing actions...' : '[STATUS]: Ready for execution.'}
                  </p>
                </div>
              </div>

              {/* Action Run Button */}
              <button
                onClick={handleRunWorkflow}
                disabled={isRunning}
                className={`w-full py-3.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                  isRunning
                    ? 'bg-purple-900 text-purple-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-500/20 hover:scale-[1.02]'
                }`}
              >
                {isRunning ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Executing Workflow Steps...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Trigger Live Workflow Test</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
