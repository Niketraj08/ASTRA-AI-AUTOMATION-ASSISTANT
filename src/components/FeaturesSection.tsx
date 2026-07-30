import React, { useState } from 'react';
import {
  Mic, Volume2, Monitor, Laptop, Globe, Mail, MessageSquare, PhoneCall,
  Database, Calendar, Target, BookOpen, Languages, Image, FileText,
  FileCode, Bot, Brain, BarChart3, Code2, Users, Sparkles, Check, ArrowRight
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Voice' | 'Automation' | 'Business' | 'Knowledge'>('All');
  const [selectedFeatureModal, setSelectedFeatureModal] = useState<any | null>(null);

  const features = [
    {
      id: 'voice-conv',
      category: 'Voice',
      title: 'Voice Conversation',
      description: 'Human-like conversational intelligence with low latency (<180ms) and natural turn-taking capability.',
      icon: Mic,
      gradient: 'from-blue-500 to-indigo-600',
      badge: 'Realtime Voice',
    },
    {
      id: 'natural-voice',
      category: 'Voice',
      title: 'Natural AI Voice',
      description: 'HD neural speech synthesis in multi-speaker voices (Kore, Zephyr, Puck, Fenrir) with emotional inflection.',
      icon: Volume2,
      gradient: 'from-purple-500 to-pink-600',
      badge: '24kHz HD Audio',
    },
    {
      id: 'screen-understanding',
      category: 'Automation',
      title: 'Screen Understanding',
      description: 'Multimodal vision models analyze desktop UI elements, buttons, inputs, and forms visually in real time.',
      icon: Monitor,
      gradient: 'from-cyan-500 to-blue-600',
      badge: 'Vision AI',
    },
    {
      id: 'desktop-auto',
      category: 'Automation',
      title: 'Desktop Automation',
      description: 'Controls native Windows/Mac applications, executes hotkeys, extracts file attachments, and runs background tasks.',
      icon: Laptop,
      gradient: 'from-emerald-500 to-teal-600',
      badge: 'Native Agent',
    },
    {
      id: 'browser-auto',
      category: 'Automation',
      title: 'Browser Automation',
      description: 'Autonomous web navigation, headless form filling, web scraping, and multi-step portal workflows.',
      icon: Globe,
      gradient: 'from-amber-500 to-orange-600',
      badge: 'Web Agent',
    },
    {
      id: 'email-auto',
      category: 'Automation',
      title: 'Email Automation',
      description: 'Parses incoming Gmail/Outlook threads, drafts context-aware responses, and extracts attachment data.',
      icon: Mail,
      gradient: 'from-pink-500 to-rose-600',
      badge: 'Inbox Sync',
    },
    {
      id: 'whatsapp-auto',
      category: 'Automation',
      title: 'WhatsApp Automation',
      description: 'Automated WhatsApp Business messaging, instant customer follow-ups, broadcast updates, and order tracking.',
      icon: MessageSquare,
      gradient: 'from-green-500 to-emerald-600',
      badge: 'Messaging API',
    },
    {
      id: 'call-assistant',
      category: 'Voice',
      title: 'Call Assistant',
      description: 'Answers inbound customer calls, places outbound sales calls, records transcripts, and tags sentiment.',
      icon: PhoneCall,
      gradient: 'from-indigo-500 to-purple-600',
      badge: 'PSTN & SIP',
    },
    {
      id: 'crm-integration',
      category: 'Business',
      title: 'CRM Integration',
      description: 'Bi-directional synchronization with Salesforce, HubSpot, Zoho, and Notion databases without coding.',
      icon: Database,
      gradient: 'from-blue-600 to-cyan-500',
      badge: 'Real-time Sync',
    },
    {
      id: 'appointment-booking',
      category: 'Business',
      title: 'Appointment Booking',
      description: 'Intelligent scheduling synced with Google Calendar & Outlook. Checks availability and sends invites.',
      icon: Calendar,
      gradient: 'from-violet-500 to-purple-600',
      badge: 'Smart Calendar',
    },
    {
      id: 'lead-qualification',
      category: 'Business',
      title: 'Lead Qualification',
      description: 'Ranks incoming sales leads based on conversation depth, budget criteria, and intent signals.',
      icon: Target,
      gradient: 'from-rose-500 to-red-600',
      badge: 'AI Scoring',
    },
    {
      id: 'knowledge-base',
      category: 'Knowledge',
      title: 'Knowledge Base',
      description: 'Custom RAG vector search across your company documentation, FAQs, policies, and internal guides.',
      icon: BookOpen,
      gradient: 'from-fuchsia-500 to-pink-500',
      badge: 'Vector RAG',
    },
    {
      id: 'multi-lang',
      category: 'Voice',
      title: 'Multi-Language Support',
      description: 'Fluently communicates in 50+ international languages with real-time live translation capabilities.',
      icon: Languages,
      gradient: 'from-sky-500 to-blue-600',
      badge: '50+ Languages',
    },
    {
      id: 'pdf-chat',
      category: 'Knowledge',
      title: 'PDF & Document Reading',
      description: 'Upload PDF invoices, contracts, or spreadsheets to extract structured tables and answer queries.',
      icon: FileText,
      gradient: 'from-teal-500 to-emerald-600',
      badge: 'OCR & PDF',
    },
    {
      id: 'ai-employee',
      category: 'Business',
      title: '24/7 AI Employee',
      description: 'Operates continuously around the clock without fatigue, ensuring zero missed calls or delayed leads.',
      icon: Bot,
      gradient: 'from-purple-600 to-blue-600',
      badge: '24/7 Uptime',
    },
    {
      id: 'memory-context',
      category: 'Knowledge',
      title: 'Memory & Context',
      description: 'Long-term customer memory preserves preferences, conversation history, and interaction context.',
      icon: Brain,
      gradient: 'from-indigo-600 to-violet-600',
      badge: 'Persistent Context',
    },
    {
      id: 'analytics',
      category: 'Business',
      title: 'Analytics & BI',
      description: 'Detailed metrics dashboards tracking resolution time, cost savings, customer sentiment, and ROI.',
      icon: BarChart3,
      gradient: 'from-blue-500 to-cyan-500',
      badge: 'Metrics Suite',
    },
    {
      id: 'custom-agent',
      category: 'Business',
      title: 'Custom AI Agent Creator',
      description: 'Build custom AI agents tailored to specific departments (Sales, Support, HR, Operations) in minutes.',
      icon: Code2,
      gradient: 'from-amber-500 to-rose-500',
      badge: 'No-Code Builder',
    },
  ];

  const categories = [
    { id: 'All', label: 'All Capabilities' },
    { id: 'Voice', label: 'Voice & Calls' },
    { id: 'Automation', label: 'Desktop & Web Automation' },
    { id: 'Business', label: 'Business & CRM' },
    { id: 'Knowledge', label: 'Knowledge & PDF' },
  ];

  const filteredFeatures = activeCategory === 'All'
    ? features
    : features.filter((f) => f.category === activeCategory);

  return (
    <section id="features" className="py-24 bg-slate-950 relative overflow-hidden">
      
      {/* Background accents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>FULL CAPABILITY MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            An Entire AI Workforce <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">In One Platform</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base">
            Astra combines high-fidelity AI voice conversation with visual screen understanding and cross-platform automation to replace manual business overhead.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                onClick={() => setSelectedFeatureModal(feature)}
                className="group relative rounded-3xl p-6 bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg text-white`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-mono font-semibold text-slate-300">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-purple-400 group-hover:text-purple-300">
                  <span>Explore Workflow</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Feature Detail Modal */}
      {selectedFeatureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${selectedFeatureModal.gradient} text-white`}>
                <selectedFeatureModal.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedFeatureModal.title}</h3>
                <span className="text-xs font-mono text-purple-400">{selectedFeatureModal.badge}</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedFeatureModal.description}
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
              <div className="text-cyan-400 font-semibold">[ACTIVATION PARAMETERS]</div>
              <div className="text-slate-400">✓ Trigger Latency: &lt;150ms</div>
              <div className="text-slate-400">✓ Encryption: AES-256 + TLS 1.3</div>
              <div className="text-slate-400">✓ Native SDK: Python, Node.js, REST API</div>
            </div>

            <button
              onClick={() => setSelectedFeatureModal(null)}
              className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold text-xs hover:bg-purple-500 transition-all"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
