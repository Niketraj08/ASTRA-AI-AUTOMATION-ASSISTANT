import React, { useState } from 'react';
import { Check, Sparkles, Zap, ShieldCheck, HelpCircle } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (planName: string, price: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [annualBilling, setAnnualBilling] = useState(true);

  const plans = [
    {
      name: 'Starter',
      priceMonthly: 49,
      priceAnnual: 39,
      description: 'Ideal for small teams automating voice calls & basic CRM tasks.',
      badge: null,
      features: [
        '500 Voice Call Minutes / Month',
        '2 Custom AI Voice Agents',
        'Basic Screen & Browser Automation',
        'Google Workspace & Slack Sync',
        'Standard RAG Knowledge Base (10 Docs)',
        'Standard Email Support',
      ],
    },
    {
      name: 'Professional',
      priceMonthly: 149,
      priceAnnual: 119,
      description: 'Perfect for growing businesses requiring autonomous workflows.',
      badge: 'MOST POPULAR',
      features: [
        '2,500 Voice Call Minutes / Month',
        '10 Custom AI Voice Agents',
        'Full Desktop & Vision Automation',
        'Salesforce & HubSpot CRM Sync',
        'Advanced PDF & Document Chat (100 Docs)',
        'Multi-Language Voice (50 Languages)',
        'Priority 24/7 SLA Support',
      ],
    },
    {
      name: 'Business',
      priceMonthly: 399,
      priceAnnual: 319,
      description: 'Designed for enterprise teams needing massive automation scale.',
      badge: 'HIGH CAPACITY',
      features: [
        '10,000 Voice Call Minutes / Month',
        'Unlimited AI Voice Agents',
        'Realtime Webhook & API Access',
        'WhatsApp & PSTN Phone System Integration',
        'Unlimited Knowledge Base Vectoring',
        'Dedicated Customer Success Manager',
        'Custom Role-Based Access Controls',
      ],
    },
    {
      name: 'Enterprise',
      priceMonthly: 'Custom',
      priceAnnual: 'Custom',
      description: 'Custom AI models, air-gapped on-premise, and bespoke integrations.',
      badge: 'CUSTOM AGENT',
      features: [
        'Custom Voice Call Capacity',
        'Dedicated On-Premise / Cloud Container',
        'Custom LLM Fine-Tuning (Gemini / Claude)',
        'HIPAA, SOC2 & GDPR Compliance',
        'Dedicated Solutions Architect',
        'Custom SLA & 99.99% Uptime Guarantee',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>TRANSPARENT ENTERPRISE PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Flexible Plans For <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Teams of Any Size</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base">
            Start with a 14-day free trial. No credit card required. Upgrade or cancel anytime.
          </p>

          {/* Monthly / Annual Billing Switch */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-slate-900 border border-slate-800">
            <button
              onClick={() => setAnnualBilling(false)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                !annualBilling ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnualBilling(true)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                annualBilling ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px]">SAVE 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const isPopular = plan.badge === 'MOST POPULAR';
            const priceDisplay = typeof plan.priceMonthly === 'number'
              ? `$${annualBilling ? plan.priceAnnual : plan.priceMonthly}`
              : plan.priceMonthly;

            return (
              <div
                key={plan.name}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  isPopular
                    ? 'bg-gradient-to-b from-purple-950/80 via-slate-900 to-slate-950 border-2 border-purple-500 shadow-2xl shadow-purple-500/20 scale-105 z-10'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-mono font-bold tracking-widest uppercase shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-2 h-10 leading-relaxed">{plan.description}</p>

                  <div className="my-6">
                    <span className="text-4xl font-black text-white font-mono">{priceDisplay}</span>
                    {typeof plan.priceMonthly === 'number' && (
                      <span className="text-xs text-slate-400 font-mono"> / month</span>
                    )}
                  </div>

                  <ul className="space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectPlan(plan.name, priceDisplay)}
                  className={`w-full mt-8 py-3.5 rounded-xl font-semibold text-xs transition-all uppercase tracking-wider ${
                    isPopular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/30 hover:scale-[1.02]'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
