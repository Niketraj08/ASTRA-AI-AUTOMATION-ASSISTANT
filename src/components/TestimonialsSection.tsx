import React from 'react';
import { Star, Quote, Building2, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Elena Rostova',
      role: 'VP of Customer Experience',
      company: 'FinTech Global',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      quote: 'Astra AI handles over 14,000 inbound customer support calls every month for us. The voice quality is so indistinguishable from humans that our CSAT score jumped from 82% to 98% in 30 days.',
      stat: 'Saved $420,000 / Year',
    },
    {
      name: 'David Chen',
      role: 'Head of Growth & Operations',
      company: 'LogiTech Solutions',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      quote: 'The desktop and screen automation feature is sheer wizardry. Astra opens our legacy ERP software, extracts invoice PDFs, fills forms, and sends WhatsApp updates without a single human touch point.',
      stat: '420 Hours Saved Monthly',
    },
    {
      name: 'Sarah Jenkins',
      role: 'Chief Revenue Officer',
      company: 'SaaSVentures',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      rating: 5,
      quote: 'Inbound sales lead response time dropped from 4 hours to 8 seconds. Astra calls prospects instantly, qualifies them over voice, and books meetings on Calendly automatically.',
      stat: '3.4x Lead Conversion',
    },
  ];

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <Quote className="w-3.5 h-3.5 text-cyan-400" />
            <span>ENTERPRISE CASE STUDIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Trusted by Leaders <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Worldwide</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base">
            See how top companies automate their business operations with Astra AI.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-purple-500/30"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-white">{t.name}</h3>
                    <p className="text-[10px] text-slate-400">{t.role} · <span className="text-purple-400 font-semibold">{t.company}</span></p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-[10px] font-mono text-purple-300 font-bold">
                  {t.stat}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
