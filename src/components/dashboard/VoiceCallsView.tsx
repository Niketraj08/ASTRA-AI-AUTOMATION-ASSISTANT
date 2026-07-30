import React, { useState } from 'react';
import { PhoneCall, PhoneOff, Mic, Play, Pause, Volume2, Sparkles, User, FileText, CheckCircle2 } from 'lucide-react';
import { VoiceCall } from '../../types';
import { VoicePulseVisualizer } from '../VoicePulseVisualizer';

interface VoiceCallsViewProps {
  calls: VoiceCall[];
}

export const VoiceCallsView: React.FC<VoiceCallsViewProps> = ({ calls }) => {
  const [selectedCall, setSelectedCall] = useState<VoiceCall>(calls[0]);
  const [inActiveCall, setInActiveCall] = useState(false);
  const [dialerNumber, setDialerNumber] = useState('+1 (555) 234-8901');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleStartSimulatedCall = () => {
    setInActiveCall(true);
  };

  const handleEndSimulatedCall = () => {
    setInActiveCall(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Live Call Control & Visualizer Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Active Call Center Dialing & Waveform */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-purple-400" />
                <h3 className="font-bold text-sm text-white">Live Voice Call Center & Dialer</h3>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                inActiveCall ? 'bg-red-500/20 text-red-300 animate-pulse' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {inActiveCall ? 'CALL IN PROGRESS' : 'LINE READY'}
              </span>
            </div>

            {inActiveCall ? (
              <div className="bg-slate-950 rounded-2xl p-6 border border-purple-500/40 flex flex-col items-center justify-center">
                <VoicePulseVisualizer status="speaking" audioLevel={0.9} />
                <p className="text-xs font-mono text-purple-300 mt-2">Connected to: {dialerNumber}</p>
                <button
                  onClick={handleEndSimulatedCall}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-red-500 transition-all flex items-center gap-2"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>Hang Up Call</span>
                </button>
              </div>
            ) : (
              <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-1 w-full space-y-3">
                  <label className="text-xs font-mono text-slate-400 uppercase">Target Phone Number</label>
                  <input
                    type="text"
                    value={dialerNumber}
                    onChange={(e) => setDialerNumber(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={handleStartSimulatedCall}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Place Outbound AI Voice Call</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Audio Recording Player & Transcript Inspector */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between h-[340px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <span className="font-bold text-sm text-white flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>Call Inspector: {selectedCall.customerName}</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">{selectedCall.timestamp}</span>
            </div>

            {/* Audio Wave Player Simulator */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 mb-4 flex items-center gap-3">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="p-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-500 transition-all"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <div className="flex-1">
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r from-cyan-400 to-purple-500 ${isPlayingAudio ? 'w-3/4 animate-pulse' : 'w-1/4'}`} />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>01:14</span>
                  <span>{selectedCall.duration}</span>
                </div>
              </div>
            </div>

            {/* AI Summary */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-mono text-[10px] text-purple-400 font-bold block">AI CALL SUMMARY</span>
              <p className="text-slate-300 leading-relaxed">{selectedCall.summary}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Calls History Table */}
      <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800">
        <h3 className="font-bold text-sm text-white mb-4">Historical Call Logs & Sentiment Analysis</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
              <tr>
                <th className="p-3">Customer</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Status</th>
                <th className="p-3">Sentiment</th>
                <th className="p-3">Lead Score</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {calls.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCall(c)}
                  className={`hover:bg-slate-800/50 cursor-pointer transition-all ${
                    selectedCall.id === c.id ? 'bg-purple-950/30' : ''
                  }`}
                >
                  <td className="p-3 font-bold text-white">{c.customerName}</td>
                  <td className="p-3 text-slate-400">{c.customerPhone}</td>
                  <td className="p-3 text-slate-300">{c.duration}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px]">
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.sentiment === 'Positive' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {c.sentiment}
                    </span>
                  </td>
                  <td className="p-3 text-emerald-400 font-bold">{c.leadScore}/100</td>
                  <td className="p-3">
                    <button className="text-purple-400 hover:underline">Inspect Call</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
