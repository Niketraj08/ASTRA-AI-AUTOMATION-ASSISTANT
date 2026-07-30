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
    sm: { height: 28, iconSize: 28, textClass: 'text-xs' },
    md: { height: 38, iconSize: 38, textClass: 'text-sm' },
    lg: { height: 48, iconSize: 48, textClass: 'text-base' },
    xl: { height: 64, iconSize: 64, textClass: 'text-xl' },
  };

  const currentSize = sizeMap[size];

  // Dynamic textColor based on theme
  const titleColor = theme === 'light' ? 'text-[#02568f]' : 'text-white';
  const subtitleColor = theme === 'light' ? 'text-[#0a6cae]' : 'text-slate-300';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Crisp High-Fidelity Vector Ribbon Logo (ACS) */}
      <svg
        width={currentSize.iconSize * (variant === 'icon' ? 1.6 : 1.35)}
        height={currentSize.iconSize}
        viewBox="0 0 160 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* Magenta / Purple Gradient for 'A' */}
          <linearGradient id="acs-gradient-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A154B" />
            <stop offset="40%" stopColor="#80216B" />
            <stop offset="80%" stopColor="#BE3282" />
            <stop offset="100%" stopColor="#E0529A" />
          </linearGradient>

          {/* Gold / Amber Gradient for 'C' */}
          <linearGradient id="acs-gradient-c" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B37C18" />
            <stop offset="50%" stopColor="#E6A817" />
            <stop offset="100%" stopColor="#C98B10" />
          </linearGradient>

          {/* Teal / Cyan Gradient for 'S' */}
          <linearGradient id="acs-gradient-s" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#302050" />
            <stop offset="40%" stopColor="#206B70" />
            <stop offset="80%" stopColor="#3FA49F" />
            <stop offset="100%" stopColor="#5BC3BA" />
          </linearGradient>

          {/* Subtle drop shadow */}
          <filter id="acs-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
          </filter>
        </defs>

        <g filter="url(#acs-shadow)">
          {/* 'A' Ribbon Loop */}
          <path
            d="M 42 85 C 28 85 12 75 12 55 C 12 30 32 15 50 15 C 62 15 72 26 62 48 C 54 65 38 85 28 85 C 18 85 26 65 38 52 C 48 42 58 35 62 35 C 66 35 60 55 52 70 C 46 81 40 85 36 85"
            fill="url(#acs-gradient-a)"
            stroke="url(#acs-gradient-a)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 'C' Gold Curved Ribbon */}
          <path
            d="M 98 32 C 85 22 62 20 60 42 C 58 64 78 88 102 85 C 114 83 120 72 118 62"
            fill="none"
            stroke="url(#acs-gradient-c)"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 'S' Teal Ribbon Flow */}
          <path
            d="M 122 28 C 138 20 152 28 142 42 C 132 56 108 50 115 68 C 122 86 148 88 152 70"
            fill="none"
            stroke="url(#acs-gradient-s)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>

      {/* Typography side */}
      {variant !== 'icon' && (
        <div className="flex flex-col leading-tight">
          <span className={`font-extrabold tracking-tight ${titleColor} ${currentSize.textClass}`}>
            AstraCognix
          </span>
          <span className={`font-semibold tracking-normal text-[0.8em] ${subtitleColor}`}>
            Solutions
          </span>
          {variant === 'full' && (
            <span className={`font-medium tracking-normal text-[0.68em] text-slate-400 opacity-90`}>
              Pvt. Ltd.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
