import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveVoicePlayground } from './components/InteractiveVoicePlayground';
import { FeaturesSection } from './components/FeaturesSection';
import { AutomationShowcase } from './components/AutomationShowcase';
import { IntegrationsSection } from './components/IntegrationsSection';
import { RoiCalculatorSection } from './components/RoiCalculatorSection';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactAndFooter } from './components/ContactAndFooter';
import { AuthModal } from './components/AuthModal';
import { DashboardLayout } from './components/DashboardLayout';
import { ThemeMode, UserProfile } from './types';
import { CheckCircle2, Play, X, Calendar } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'dashboard'>('landing');
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  // Modals
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [checkoutPlanModal, setCheckoutPlanModal] = useState<{ name: string; price: string } | null>(null);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Authenticated User State
  const [user, setUser] = useState<UserProfile>({
    id: 'usr_892011',
    name: 'Enterprise Admin',
    email: 'admin@astra.ai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Super Admin',
    plan: 'Professional',
    company: 'Astra Enterprise',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (viewMode === 'dashboard') {
      setViewMode('landing');
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = (profile: UserProfile) => {
    setUser(profile);
    setAuthModalOpen(false);
    setViewMode('dashboard');
    showToast(`Welcome back, ${profile.name}! Logged in as ${profile.role}.`);
  };

  const handleSelectPlan = (planName: string, price: string) => {
    setCheckoutPlanModal({ name: planName, price });
  };

  if (viewMode === 'dashboard') {
    return (
      <DashboardLayout
        user={user}
        onReturnToLanding={() => setViewMode('landing')}
        onLogout={() => {
          setViewMode('landing');
          showToast('Signed out of Astra workspace.');
        }}
      />
    );
  }

  return (
    <div className={`min-h-screen font-sans bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white transition-colors duration-300 ${
      theme === 'cyber-matrix' ? 'ring-1 ring-cyan-500/20' : ''
    }`}>
      
      {/* Top Fixed Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onLaunchDashboard={() => setViewMode('dashboard')}
        onOpenAuth={() => setAuthModalOpen(true)}
        theme={theme}
        onToggleTheme={setTheme}
      />

      {/* Main Landing Page Sections */}
      <main>
        <HeroSection
          onStartTrial={() => handleNavigate('pricing')}
          onBookDemo={() => setBookingModalOpen(true)}
          onWatchVideo={() => setVideoModalOpen(true)}
          onTryVoice={() => handleNavigate('voice-playground')}
        />

        <InteractiveVoicePlayground />

        <FeaturesSection />

        <AutomationShowcase />

        <IntegrationsSection />

        <RoiCalculatorSection />

        <PricingSection onSelectPlan={handleSelectPlan} />

        <TestimonialsSection />

        <FaqSection />

        <ContactAndFooter
          onOpenPrivacy={() => setPrivacyModalOpen(true)}
          onOpenTerms={() => setTermsModalOpen(true)}
          onOpenDocs={() => showToast('Redirecting to Astra API Developer Docs...')}
        />
      </main>

      {/* Auth Login Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Video Demo Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-3xl w-full relative shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Astra AI Realtime Voice Demo</h3>
            <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-6 text-center">
              <Play className="w-12 h-12 text-purple-400 fill-purple-400 mb-2 animate-bounce" />
              <p className="text-sm font-bold text-white">Watch Astra Inbound Call & Desktop Automation Live</p>
              <p className="text-xs text-slate-400 mt-1">24kHz Neural Audio Speech Synthesis & Screen Vision OCR</p>
            </div>
          </div>
        </div>
      )}

      {/* Book Demo Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full relative shadow-2xl space-y-4">
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs">
              <Calendar className="w-4 h-4" />
              <span>LIVE DEMO SCHEDULER</span>
            </div>
            <h3 className="text-xl font-bold text-white">Book a Demo with Astra Solutions Architect</h3>
            <p className="text-xs text-slate-400">Select a 30-minute slot for a personalized workflow demonstration.</p>
            
            <input
              type="text"
              placeholder="Your Full Name"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
            />
            <input
              type="email"
              placeholder="Work Email"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
            />
            <button
              onClick={() => {
                setBookingModalOpen(false);
                showToast('Demo meeting scheduled! Invitation sent to your calendar.');
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xs"
            >
              Confirm 30-Min Demo Session
            </button>
          </div>
        </div>
      )}

      {/* Checkout Plan Modal */}
      {checkoutPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full relative shadow-2xl space-y-4">
            <button
              onClick={() => setCheckoutPlanModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-bold text-white">Subscribe to {checkoutPlanModal.name} Plan</h3>
            <p className="text-xs text-slate-400">Selected Plan: <strong className="text-purple-300">{checkoutPlanModal.name} ({checkoutPlanModal.price})</strong></p>
            
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
              <div>✓ Includes 14-Day Free Trial Period</div>
              <div>✓ Instant Access to Dashboard & API Keys</div>
            </div>

            <button
              onClick={() => {
                setCheckoutPlanModal(null);
                setViewMode('dashboard');
                showToast(`Successfully subscribed to ${checkoutPlanModal.name}! Welcome to Astra AI.`);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs uppercase"
            >
              Activate Subscription & Open Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full relative shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setPrivacyModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-bold text-white">Privacy Policy & Data Security</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Astra AI encrypts all voice call transcripts and document vectors using AES-256 and TLS 1.3 standards. No customer voice data is used to train public LLM models.
            </p>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {termsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full relative shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setTermsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-bold text-white">Terms of Service</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Astra AI Automation Assistant is provided under enterprise SLA terms. Operational uptime guarantee is 99.99%.
            </p>
          </div>
        </div>
      )}

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-purple-950 border border-purple-500/80 text-white px-4 py-3 rounded-2xl shadow-2xl text-xs font-mono flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
