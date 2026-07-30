import React, { useState } from 'react';
import { Bot, Sparkles, Phone, LayoutDashboard, User, Moon, Sun, Monitor, Menu, X, ChevronRight, Zap } from 'lucide-react';
import { ThemeMode } from '../types';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onLaunchDashboard: () => void;
  onOpenAuth: () => void;
  theme: ThemeMode;
  onToggleTheme: (theme: ThemeMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onLaunchDashboard,
  onOpenAuth,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Overview' },
    { id: 'voice-playground', label: 'Live Voice AI' },
    { id: 'features', label: 'Features' },
    { id: 'automations', label: 'Automations' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'roi-calculator', label: 'ROI Calculator' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo with Glowing Orb */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate('hero')}
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                ASTRA<span className="text-purple-400">.AI</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded">
                ENTERPRISE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase hidden sm:block">
              Automation Assistant
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeSection === link.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* Theme Mode Selector */}
          <button
            onClick={() => {
              const modes: ThemeMode[] = ['dark', 'cyber-matrix', 'high-contrast-dark'];
              const nextIndex = (modes.indexOf(theme) + 1) % modes.length;
              onToggleTheme(modes[nextIndex]);
            }}
            title={`Current theme: ${theme}. Click to toggle.`}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all text-xs flex items-center gap-1.5"
          >
            {theme === 'dark' && <Moon className="w-4 h-4 text-purple-400" />}
            {theme === 'cyber-matrix' && <Sparkles className="w-4 h-4 text-cyan-400" />}
            {theme === 'high-contrast-dark' && <Sun className="w-4 h-4 text-amber-400" />}
            <span className="hidden xl:inline text-[11px] capitalize font-mono">{theme}</span>
          </button>

          {/* Sign In Button */}
          <button
            onClick={onOpenAuth}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 transition-all flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>

          {/* Launch Dashboard Button */}
          <button
            onClick={onLaunchDashboard}
            className="relative group overflow-hidden px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Launch Dashboard</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeSection === link.id
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-400 hover:bg-slate-900'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onLaunchDashboard();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Launch Admin App</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
