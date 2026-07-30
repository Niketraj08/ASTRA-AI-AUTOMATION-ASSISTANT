import React, { useEffect, useState } from 'react';

interface VoicePulseVisualizerProps {
  status: 'idle' | 'listening' | 'thinking' | 'speaking';
  audioLevel?: number;
  interactive?: boolean;
  className?: string;
}

export const VoicePulseVisualizer: React.FC<VoicePulseVisualizerProps> = ({
  status = 'idle',
  audioLevel = 0.5,
  interactive = true,
  className = '',
}) => {
  const [barHeights, setBarHeights] = useState<number[]>([15, 30, 45, 60, 40, 75, 50, 30, 20]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status === 'speaking' || status === 'listening') {
      interval = setInterval(() => {
        setBarHeights(
          Array.from({ length: 12 }, () => {
            const base = status === 'speaking' ? 30 : 20;
            const boost = (audioLevel || Math.random()) * 60;
            return Math.min(95, Math.max(10, base + boost * Math.random()));
          })
        );
      }, 80);
    } else if (status === 'thinking') {
      interval = setInterval(() => {
        setBarHeights((prev) => prev.map((_, i) => 25 + Math.sin(Date.now() / 150 + i) * 20));
      }, 50);
    } else {
      setBarHeights([15, 20, 25, 30, 25, 20, 15, 10, 15, 20, 15, 10]);
    }

    return () => clearInterval(interval);
  }, [status, audioLevel]);

  return (
    <div className={`relative flex flex-col items-center justify-center p-6 ${className}`}>
      {/* Outer Glow Ring */}
      <div
        className={`absolute w-44 h-44 rounded-full transition-all duration-500 blur-2xl ${
          status === 'speaking'
            ? 'bg-gradient-to-r from-purple-600/50 via-pink-500/40 to-blue-600/50 scale-125 animate-pulse'
            : status === 'listening'
            ? 'bg-cyan-500/30 scale-110'
            : status === 'thinking'
            ? 'bg-purple-600/40 scale-100 animate-spin'
            : 'bg-blue-600/20 scale-90'
        }`}
      />

      {/* Central Interactive Voice Orb */}
      <div
        className={`relative z-10 w-28 h-28 rounded-full flex items-center justify-center border transition-all duration-300 shadow-2xl backdrop-blur-xl ${
          status === 'speaking'
            ? 'border-purple-400 bg-purple-950/80 shadow-purple-500/50 ring-4 ring-purple-500/30'
            : status === 'listening'
            ? 'border-cyan-400 bg-cyan-950/80 shadow-cyan-500/50 ring-4 ring-cyan-500/30 animate-pulse'
            : status === 'thinking'
            ? 'border-indigo-400 bg-indigo-950/80 shadow-indigo-500/50'
            : 'border-slate-700 bg-slate-900/80 shadow-slate-900/50 hover:border-slate-500'
        }`}
      >
        {/* Core Orb Graphic */}
        <div className="flex items-center justify-center gap-1.5 h-12">
          {barHeights.slice(0, 7).map((height, idx) => (
            <div
              key={idx}
              className={`w-1.5 rounded-full transition-all duration-75 ${
                status === 'speaking'
                  ? 'bg-gradient-to-t from-purple-500 to-pink-400'
                  : status === 'listening'
                  ? 'bg-gradient-to-t from-cyan-400 to-blue-500'
                  : status === 'thinking'
                  ? 'bg-gradient-to-t from-indigo-400 to-purple-400'
                  : 'bg-slate-500'
              }`}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      {/* Status Label & Wave Indicator */}
      <div className="relative z-10 mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono">
        <span
          className={`w-2 h-2 rounded-full ${
            status === 'speaking'
              ? 'bg-pink-500 animate-ping'
              : status === 'listening'
              ? 'bg-cyan-400 animate-pulse'
              : status === 'thinking'
              ? 'bg-purple-500 animate-bounce'
              : 'bg-slate-500'
          }`}
        />
        <span className="text-slate-300 uppercase tracking-wider">
          {status === 'speaking'
            ? 'ASTRA SPEAKING...'
            : status === 'listening'
            ? 'LISTENING TO VOICE...'
            : status === 'thinking'
            ? 'AI THINKING...'
            : 'VOICE STANDBY'}
        </span>
      </div>
    </div>
  );
};
