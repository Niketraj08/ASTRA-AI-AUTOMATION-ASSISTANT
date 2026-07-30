import React from 'react';

interface AstraCognixLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'compact' | 'icon';
  theme?: 'dark' | 'light' | 'auto';
}

export const AstraCognixLogo: React.FC<AstraCognixLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  theme = 'dark',
}) => {
  // Height and scale mappings
  const sizeMap = {
    sm: { iconSize: 32, textClass: 'text-xs', subtitleClass: 'text-[9px]' },
    md: { iconSize: 42, textClass: 'text-sm', subtitleClass: 'text-[10px]' },
    lg: { iconSize: 52, textClass: 'text-base', subtitleClass: 'text-[11px]' },
    xl: { iconSize: 68, textClass: 'text-xl', subtitleClass: 'text-[13px]' },
  };

  const currentSize = sizeMap[size];

  // Dynamic textColor based on theme
  const titleColor = theme === 'light' ? 'text-slate-900' : 'text-white';
  const subtitleColor = theme === 'light' ? 'text-purple-700' : 'text-purple-300';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Sleek Custom AstraCognix AI Emblem SVG */}
      <svg
        width={currentSize.iconSize}
        height={currentSize.iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-all duration-300 hover:scale-105 filter drop-shadow-[0_4px_12px_rgba(168,85,247,0.35)]"
      >
        <defs>
          <linearGradient id="astracognix-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" /> {/* Electric Cyan */}
            <stop offset="50%" stopColor="#818CF8" /> {/* Indigo */}
            <stop offset="100%" stopColor="#C084FC" /> {/* Bright Purple */}
          </linearGradient>

          <linearGradient id="astracognix-grad-secondary" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" /> {/* Pink */}
            <stop offset="50%" stopColor="#A855F7" /> {/* Deep Violet */}
            <stop offset="100%" stopColor="#06B6D4" /> {/* Cyan */}
          </linearGradient>

          <linearGradient id="astracognix-core" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hexagonal Tech Frame */}
        <path
          d="M 50 8 L 86 28 L 86 72 L 50 92 L 14 72 L 14 28 Z"
          fill="none"
          stroke="url(#astracognix-grad-primary)"
          strokeWidth="4"
          strokeLinejoin="round"
          opacity="0.9"
        />

        {/* Inner Dynamic Stylized 'A' & 'C' Neural Swoosh */}
        <path
          d="M 50 18 L 74 68 L 62 68 L 50 42 L 38 68 L 26 68 Z"
          fill="url(#astracognix-grad-primary)"
        />

        {/* Interlocking Cognix Orbit Wave */}
        <path
          d="M 22 52 C 30 36, 70 36, 78 52 C 86 68, 46 84, 30 72"
          fill="none"
          stroke="url(#astracognix-grad-secondary)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Glowing Center Core Pulse */}
        <circle
          cx="50"
          cy="42"
          r="6"
          fill="url(#astracognix-core)"
          filter="url(#glow)"
        />

        {/* Satellite Nodes */}
        <circle cx="28" cy="28" r="3" fill="#38BDF8" />
        <circle cx="72" cy="28" r="3" fill="#C084FC" />
        <circle cx="50" cy="84" r="3.5" fill="#F472B6" />
      </svg>

      {/* Typography side */}
      {variant !== 'icon' && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1">
            <span className={`font-black tracking-tight ${titleColor} ${currentSize.textClass}`}>
              ASTRA<span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">COGNIX</span>
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <span className={`font-bold tracking-wider uppercase ${subtitleColor} ${currentSize.subtitleClass}`}>
              SOLUTIONS
            </span>
            {variant === 'full' && (
              <span className="text-[0.65em] font-mono text-slate-400 opacity-80">
                PVT. LTD.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

