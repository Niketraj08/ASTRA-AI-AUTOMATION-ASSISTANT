import React, { useEffect, useRef, useState } from 'react';

interface AsciiGlitchRippleProps {
  className?: string;
  audioLevel?: number; // 0.0 to 1.0 for voice-reactive pulsing
  interactive?: boolean;
  overlayText?: string;
  density?: 'compact' | 'standard' | 'spacious';
}

const CHAR_SETS = {
  matrix: ['0', '1', '░', '▒', '▓', '█', '+', '*', '#', '@', '!', '$', '%', '&', ':', '.'],
  astra: ['A', 'S', 'T', 'R', 'A', 'A', 'I', '0', '1', '▓', '▒', '░', '+', '⚡', '✦', '▲'],
  glitch: ['X', 'Y', 'Z', '<', '>', '/', '\\', '|', '{', '}', '[', ']', '?', '#', '!', '~'],
};

export const AsciiGlitchRipple: React.FC<AsciiGlitchRippleProps> = ({
  className = '',
  audioLevel = 0,
  interactive = true,
  overlayText = 'ASTRA AI',
  density = 'standard',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean; radius: number }>({
    x: -1000,
    y: -1000,
    active: false,
    radius: 120,
  });
  const ripplesRef = useRef<{ x: number; y: number; age: number; maxAge: number; speed: number }[]>([]);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0, active: false });

  // Add automated ambient ripple periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (canvasRef.current && Math.random() > 0.4) {
        const rect = canvasRef.current.getBoundingClientRect();
        ripplesRef.current.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          age: 0,
          maxAge: 40 + Math.random() * 30,
          speed: 2 + Math.random() * 3,
        });
      }
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Trigger ripple when audioLevel spikes
  useEffect(() => {
    if (audioLevel > 0.3 && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      ripplesRef.current.push({
        x: rect.width / 2 + (Math.random() - 0.5) * 100,
        y: rect.height / 2 + (Math.random() - 0.5) * 100,
        age: 0,
        maxAge: 30 + audioLevel * 40,
        speed: 4 + audioLevel * 5,
      });
    }
  }, [audioLevel]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const fontSize = density === 'compact' ? 12 : density === 'spacious' ? 20 : 16;
    const charWidth = fontSize * 0.65;
    const charHeight = fontSize * 1.1;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const width = parent.clientWidth;
      const height = parent.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      time += 0.04;
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / charWidth);
      const rows = Math.ceil(height / charHeight);

      // Update ripples
      ripplesRef.current = ripplesRef.current
        .map((r) => ({ ...r, age: r.age + 1 }))
        .filter((r) => r.age < r.maxAge);

      ctx.font = `600 ${fontSize}px "JetBrains Mono", "Courier New", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const mouse = mouseRef.current;
      const allChars = [...CHAR_SETS.matrix, ...CHAR_SETS.astra, ...CHAR_SETS.glitch];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const posX = c * charWidth + charWidth / 2;
          const posY = r * charHeight + charHeight / 2;

          // Distance to mouse
          const dx = posX - mouse.x;
          const dy = posY - mouse.y;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);

          // Calculate ripple wave factor
          let rippleIntensity = 0;
          for (const ripple of ripplesRef.current) {
            const rDx = posX - ripple.x;
            const rDy = posY - ripple.y;
            const rDist = Math.sqrt(rDx * rDx + rDy * rDy);
            const currentRadius = ripple.age * ripple.speed;
            const distFromWave = Math.abs(rDist - currentRadius);

            if (distFromWave < 35) {
              const wave = Math.cos((distFromWave / 35) * Math.PI);
              const fade = 1 - ripple.age / ripple.maxAge;
              rippleIntensity += Math.max(0, wave * fade);
            }
          }

          // Voice audio level influence
          const voiceBoost = audioLevel * 0.8 * Math.sin(time * 3 + (c + r) * 0.2);

          // Combined distortion intensity
          let intensity = 0;
          if (mouse.active && distToMouse < mouse.radius) {
            intensity += (1 - distToMouse / mouse.radius) * 1.2;
          }
          intensity += rippleIntensity * 0.8;
          intensity += Math.max(0, voiceBoost);

          // Ambient subtle wave
          const ambient = Math.sin(time + c * 0.15 + r * 0.2) * 0.15;
          intensity += ambient;

          // Select character
          let charIndex = Math.floor((Math.sin(time * 2 + c * 0.3 + r * 0.4) + 1) * 7);
          if (intensity > 0.4) {
            charIndex = Math.floor((time * 10 + c * 3 + r * 5) % allChars.length);
          }
          const char = allChars[Math.abs(charIndex) % allChars.length];

          // Colors based on intensity
          if (intensity > 0.8) {
            // Hot glitch cyan / violet glowing accent
            ctx.fillStyle = `rgba(168, 85, 247, ${Math.min(1, intensity)})`; // Purple/violet
            ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
            ctx.shadowBlur = 8;
          } else if (intensity > 0.4) {
            // Bright neon blue
            ctx.fillStyle = `rgba(59, 130, 246, ${Math.min(0.9, intensity + 0.2)})`; // Blue
            ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
            ctx.shadowBlur = 4;
          } else if (intensity > 0.1) {
            // Medium translucent indigo/slate
            ctx.fillStyle = `rgba(99, 102, 241, ${Math.max(0.15, intensity + 0.1)})`;
            ctx.shadowBlur = 0;
          } else {
            // Dark background matrix character
            ctx.fillStyle = `rgba(148, 163, 184, 0.12)`;
            ctx.shadowBlur = 0;
          }

          ctx.fillText(char, posX, posY);
        }
      }

      // Draw overlay glitch title if provided
      if (overlayText) {
        ctx.shadowColor = 'rgba(129, 140, 248, 0.8)';
        ctx.shadowBlur = 12;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [audioLevel, density, overlayText]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current.x = x;
    mouseRef.current.y = y;
    mouseRef.current.active = true;

    setHoverPos({ x, y, active: true });

    // Spawn micro ripple on drag
    if (Math.random() > 0.7) {
      ripplesRef.current.push({
        x,
        y,
        age: 0,
        maxAge: 25,
        speed: 3,
      });
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
    setHoverPos((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      
      {/* Interactive Ripple Cursor Ring Overlay */}
      {interactive && hoverPos.active && (
        <div
          className="pointer-events-none absolute w-32 h-32 rounded-full border border-purple-500/40 bg-purple-500/10 blur-sm transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out z-10"
          style={{ left: hoverPos.x, top: hoverPos.y }}
        />
      )}

      {/* Decorative Matrix Watermark Tag */}
      <div className="absolute bottom-2 right-3 font-mono text-[10px] tracking-widest text-cyan-400/40 pointer-events-none z-10">
        [ASCII_RIPPLE_V2 // ASTRA_ENGINE]
      </div>
    </div>
  );
};
