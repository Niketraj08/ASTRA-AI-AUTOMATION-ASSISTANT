import React, { useState } from 'react';
import { Play, Sparkles, PhoneCall, Calendar, Zap, ArrowRight, ShieldCheck, Cpu, Mic, CheckCircle2 } from 'lucide-react';
import { AsciiGlitchRipple } from './AsciiGlitchRipple';

interface HeroSectionProps {
  onStartTrial: () => void;
  onBookDemo: () => void;
  onWatchVideo: () => void;
  onTryVoice: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartTrial,
  onBookDemo,
  onWatchVideo,
  onTryVoice,
}) => {
  const [glitchActive, setGlitchActive] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-20 flex flex-col justify-center overflow-hidden bg-slate-950">
      
      {/* Background ASCII Glitch Ripple Canvas */}
      <div className="absolute inset-0 z-0 opacity-40">
        <AsciiGlitchRipple density="standard" interactive={true} overlayText="ASTRA" />
      </div>

      {/* Radiant Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 via-purple-600/30 to-pink-500/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Floating Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/30 text-purple-300 text-xs font-mono backdrop-blur-md shadow-lg shadow-purple-500/10 hover:border-purple-500/60 transition-all cursor-pointer">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ASTRA 2.5 REALTIME VOICE & DESKTOP AUTOMATION</span>
            <span className="text-slate-500">|</span>
            <span className="text-cyan-400 hover:underline flex items-center gap-1">
              Test Voice Live <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Main Hero Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Meet <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Astra AI</span> Automation Assistant
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            Your Intelligent AI Employee that can <span className="text-cyan-300 font-medium">talk</span>, automate tasks, control applications, answer calls, manage business operations and save hundreds of hours every month.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {/* Start Free Trial */}
            <button
              onClick={onStartTrial}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-base shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Zap className="w-5 h-5 fill-white" />
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            {/* Book Demo */}
            <button
              onClick={onBookDemo}
              className="px-8 py-4 rounded-2xl bg-slate-900/90 border border-slate-700 text-slate-100 font-semibold text-base hover:bg-slate-800 hover:border-slate-600 transition-all flex items-center gap-2"
            >
              <Calendar className="w-5 h-5 text-indigo-400" />
              <span>Book Demo</span>
            </button>

            {/* Watch Video */}
            <button
              onClick={onWatchVideo}
              className="px-6 py-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-slate-300 font-medium text-sm hover:text-white hover:border-purple-500/40 transition-all flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Play className="w-3.5 h-3.5 text-purple-300 fill-purple-300 ml-0.5" />
              </div>
              <span>Watch Video</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>14-Day Unlimited Free Trial</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>SOC2 & GDPR Compliant</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Preview Card */}
        <div className="mt-14 max-w-5xl mx-auto rounded-3xl p-1 bg-gradient-to-b from-slate-700/50 via-slate-800/20 to-slate-900/80 shadow-2xl backdrop-blur-2xl">
          <div className="bg-slate-950/90 rounded-[22px] p-6 sm:p-8 border border-slate-800/80 relative overflow-hidden">
            
            {/* Header bar */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-xs text-slate-400">astra-voice-core.sys // active-session</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-800/40">
                <Cpu className="w-3.5 h-3.5 animate-pulse" />
                <span>LATENCY: 140ms</span>
              </div>
            </div>

            {/* Content Split: Live Voice Assistant Card & Instant Automation Stream */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              
              {/* Left Column: Live Call Simulation */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                        <PhoneCall className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-sm text-white">Live Inbound Call Handler</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                      CONNECTING
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 mb-4">
                    <span className="text-purple-400">Astra AI:</span> "Hello! Thank you for calling TechCorp. I can check your account status, schedule a meeting, or process an invoice right now. How can I help?"
                  </p>
                </div>

                <button
                  onClick={onTryVoice}
                  className="w-full py-3 rounded-xl bg-purple-600/30 border border-purple-500/50 hover:bg-purple-600/50 text-purple-200 text-xs font-semibold tracking-wide uppercase transition-all flex items-center justify-center gap-2"
                >
                  <Mic className="w-4 h-4 text-cyan-400" />
                  <span>Test Voice AI Interactive Playground</span>
                </button>
              </div>

              {/* Right Column: Desktop Automation Execution Stream */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                        <Zap className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-sm text-white">Autonomous Desktop Agent</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono">
                      AUTO-RUN
                    </span>
                  </div>

                  <div className="space-y-2 text-[11px] font-mono">
                    <div className="p-2 rounded bg-slate-950 text-emerald-400 flex items-center justify-between">
                      <span>✓ Extracting PDF Invoice #8920...</span>
                      <span className="text-slate-500">0.2s</span>
                    </div>
                    <div className="p-2 rounded bg-slate-950 text-cyan-400 flex items-center justify-between">
                      <span>✓ Auto-filling Salesforce CRM Lead...</span>
                      <span className="text-slate-500">0.4s</span>
                    </div>
                    <div className="p-2 rounded bg-slate-950 text-purple-400 flex items-center justify-between">
                      <span>⚡ Dispatching WhatsApp Confirmation...</span>
                      <span className="text-slate-500">0.1s</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-xs text-slate-400">
                  <span>Tasks Completed Today: <strong className="text-white">12,490</strong></span>
                  <span className="text-emerald-400 font-semibold">+340% ROI</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
