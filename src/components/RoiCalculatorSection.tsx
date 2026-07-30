import React, { useState } from 'react';
import { DollarSign, Clock, TrendingUp, Users, ArrowRight } from 'lucide-react';

export const RoiCalculatorSection: React.FC = () => {
  const [teamSize, setTeamSize] = useState(15);
  const [callsPerMonth, setCallsPerMonth] = useState(1200);
  const [avgTaskHours, setAvgTaskHours] = useState(4); // per employee per day

  // Formulas
  const totalCalls = callsPerMonth;
  const hoursSavedPerMonth = Math.round(teamSize * avgTaskHours * 22 * 0.75 + totalCalls * 0.15);
  const hourlyRate = 38; // Average hourly cost per team member
  const dollarsSavedPerYear = Math.round(hoursSavedPerMonth * hourlyRate * 12);
  const roiMultiplier = Math.round((dollarsSavedPerYear / 18000) * 10) / 10;

  return (
    <section id="roi-calculator" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>INTERACTIVE ROI CALCULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Calculate Your Business <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Cost & Time Savings</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base">
            See how much your organization saves every month by deploying Astra AI employees.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/90 border border-slate-800 p-8 shadow-2xl backdrop-blur-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Sliders Input */}
          <div className="md:col-span-7 space-y-6">
            
            {/* Slider 1: Team Size */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  Team Size (Employees)
                </label>
                <span className="font-bold text-base text-purple-300 font-mono">{teamSize} Members</span>
              </div>
              <input
                type="range"
                min="2"
                max="100"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            {/* Slider 2: Monthly Calls */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  Monthly Inbound/Outbound Calls
                </label>
                <span className="font-bold text-base text-cyan-300 font-mono">{callsPerMonth.toLocaleString()} Calls</span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={callsPerMonth}
                onChange={(e) => setCallsPerMonth(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            {/* Slider 3: Daily Admin Task Hours */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Daily Manual Admin Hours / Employee
                </label>
                <span className="font-bold text-base text-emerald-300 font-mono">{avgTaskHours} Hours / Day</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={avgTaskHours}
                onChange={(e) => setAvgTaskHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

          </div>

          {/* Results Box */}
          <div className="md:col-span-5 bg-gradient-to-br from-purple-950/60 via-slate-950 to-slate-900 rounded-2xl p-6 border border-purple-500/30 flex flex-col justify-between space-y-6">
            <div>
              <span className="font-mono text-xs text-purple-400 uppercase tracking-widest block mb-4">
                [PROJECTED ROI RESULTS]
              </span>

              <div className="space-y-4">
                <div>
                  <span className="text-xs text-slate-400 block font-mono">Hours Saved Every Month</span>
                  <div className="text-3xl font-extrabold text-cyan-300 font-mono">
                    {hoursSavedPerMonth.toLocaleString()} <span className="text-sm text-slate-400 font-normal">hrs</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <span className="text-xs text-slate-400 block font-mono">Est. Annual Cost Reduction</span>
                  <div className="text-4xl font-black text-emerald-400 font-mono">
                    ${dollarsSavedPerYear.toLocaleString()}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-mono">Estimated Platform ROI</span>
                  <span className="text-lg font-bold text-purple-300 font-mono">{roiMultiplier}x ROI</span>
                </div>
              </div>
            </div>

            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2">
              <span>Claim Your Savings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
