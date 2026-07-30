import React, { useState } from 'react';
import { Send, CheckCircle2, Bot, ShieldCheck, FileText, Globe, Heart, ArrowUpRight } from 'lucide-react';

interface ContactAndFooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenDocs: () => void;
}

export const ContactAndFooter: React.FC<ContactAndFooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onOpenDocs,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSent, setContactSent] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.email && contactForm.message) {
      setContactSent(true);
      setTimeout(() => setContactSent(false), 4000);
      setContactForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <footer id="contact" className="bg-slate-950 border-t border-slate-900 pt-20 pb-12 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Contact Form & Newsletter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          
          {/* Left: Contact Sales & Support */}
          <div className="lg:col-span-7 bg-slate-900/60 p-8 rounded-3xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-2">Speak with an Automation Specialist</h3>
            <p className="text-xs text-slate-400 mb-6">
              Have questions about custom model deployment, on-premise security, or enterprise SLAs? Drop us a line.
            </p>

            {contactSent ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Message received! An Astra Solutions Architect will reply within 2 hours.</span>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Your Full Name"
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="Work Email Address"
                    className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <textarea
                  rows={3}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Describe your enterprise automation requirements or call volume..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xs hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Astra Team</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Newsletter & System Status */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">Subscribe to AI Automation Updates</h3>
              <p className="text-xs text-slate-400 mb-4">
                Get monthly research on voice synthesis latency, model optimization, and workflow templates.
              </p>

              {subscribed ? (
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
                  ✓ Subscribed successfully!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="enter your email..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-xs hover:bg-purple-500 transition-all"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* System Status Banner */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>ALL SYSTEMS OPERATIONAL</span>
              </div>
              <span className="text-slate-400 text-[10px]">99.99% UPTIME</span>
            </div>
          </div>

        </div>

        {/* Links Footer Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-5 gap-8 text-xs text-slate-400">
          
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" />
              <span className="font-extrabold text-base text-white tracking-tight">ASTRA AI</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              The premier AI Voice Assistant & Autonomous Employee Platform powering voice calls, desktop software control, and operations for modern enterprises.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-white text-xs uppercase font-bold mb-3">Product</h4>
            <ul className="space-y-2">
              <li><a href="#voice-playground" className="hover:text-white">Voice AI Assistant</a></li>
              <li><a href="#automations" className="hover:text-white">Desktop & Web Runner</a></li>
              <li><a href="#integrations" className="hover:text-white">Integrations Matrix</a></li>
              <li><a href="#roi-calculator" className="hover:text-white">ROI Calculator</a></li>
              <li><a href="#pricing" className="hover:text-white">Enterprise Plans</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-white text-xs uppercase font-bold mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><button onClick={onOpenDocs} className="hover:text-white text-left">API Documentation</button></li>
              <li><a href="#faq" className="hover:text-white">Security & Compliance</a></li>
              <li><button onClick={onOpenDocs} className="hover:text-white text-left">SDK Reference</button></li>
              <li><a href="#faq" className="hover:text-white">Status Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-white text-xs uppercase font-bold mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><button onClick={onOpenPrivacy} className="hover:text-white text-left">Privacy Policy</button></li>
              <li><button onClick={onOpenTerms} className="hover:text-white text-left">Terms of Service</button></li>
              <li><button onClick={onOpenPrivacy} className="hover:text-white text-left">SOC2 Compliance</button></li>
              <li><button onClick={onOpenTerms} className="hover:text-white text-left">GDPR Standards</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono">
          <p>© 2026 Astra AI Automation Assistant Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span>Built with React 19 & Gemini AI</span>
            <span>·</span>
            <span>Version 2.5.0</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
