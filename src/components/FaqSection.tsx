import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Zap } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How realistic is Astra’s voice conversation latency?',
      a: 'Astra powered by Gemini 3.1 Live Speech and 24kHz HD neural synthesis delivers latency under 180ms. It supports multi-speaker voices, natural interruptions, emotional inflection, and turn-taking, making calls sound completely human.',
    },
    {
      q: 'Is desktop and browser automation safe for enterprise environments?',
      a: 'Yes. Astra operates inside an encrypted sandbox environment with fine-grained RBAC permissions. All desktop interactions require explicit policy authorization, and all stored tokens/credentials are encrypted with AES-256.',
    },
    {
      q: 'How does Astra integrate with our existing CRM (Salesforce, HubSpot)?',
      a: 'Astra features 1-click native connectors for major CRMs, Google Workspace, Slack, and WhatsApp. You can also connect custom webhooks or trigger 5,000+ apps via Zapier and REST APIs.',
    },
    {
      q: 'Can we upload custom PDF contracts and company knowledge bases?',
      a: 'Absolutely. Astra’s vector RAG knowledge base indexes PDFs, Word documents, website URLs, and internal wikis instantly. Astra references these exact documents during voice calls and support chats.',
    },
    {
      q: 'What phone numbers or PSTN systems does Astra support?',
      a: 'Astra can assign dedicated local or toll-free phone numbers in over 100 countries, or connect to your existing Twilio, Plivo, or SIP trunk provider.',
    },
    {
      q: 'What is included in the 14-day free trial?',
      a: 'The free trial includes full access to the Professional Plan: 500 voice call minutes, 5 custom AI agents, desktop automation triggers, and CRM sync. No credit card is required to begin.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Everything You Need <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">To Know</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border bg-slate-900/60 border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left font-bold text-sm sm:text-base text-white flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-purple-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
