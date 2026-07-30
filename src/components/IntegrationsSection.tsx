import React, { useState } from 'react';
import { CheckCircle2, Plus, Zap, RefreshCw, Search } from 'lucide-react';

export const IntegrationsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [connectedApps, setConnectedApps] = useState<string[]>([
    'Google Workspace', 'Salesforce', 'Slack', 'HubSpot', 'Zapier'
  ]);

  const integrations = [
    { name: 'Google Workspace', category: 'Productivity', desc: 'Gmail, Google Calendar, Sheets, Drive, Meet sync.', icon: '🌐' },
    { name: 'Microsoft Office', category: 'Productivity', desc: 'Outlook, Teams, Excel, Word automation.', icon: '📊' },
    { name: 'Slack', category: 'Communication', desc: 'Channel bots, instant notifications & voice notes.', icon: '💬' },
    { name: 'Discord', category: 'Communication', desc: 'Community bot integration & automated moderation.', icon: '🎮' },
    { name: 'WhatsApp', category: 'Communication', desc: 'WhatsApp Business API messaging & auto-reply.', icon: '📱' },
    { name: 'Telegram', category: 'Communication', desc: 'Telegram Bot API support & command dispatcher.', icon: '✈️' },
    { name: 'HubSpot', category: 'CRM', desc: 'Lead tracking, pipeline updates & call logging.', icon: '💼' },
    { name: 'Salesforce', category: 'CRM', desc: 'Enterprise CRM data sync, opportunity updates.', icon: '☁️' },
    { name: 'Notion', category: 'Knowledge', desc: 'Database sync, page creation & wiki searches.', icon: '📝' },
    { name: 'Zapier', category: 'Automation', desc: 'Trigger 5,000+ app webhooks & Zap workflows.', icon: '⚡' },
    { name: 'Calendly', category: 'Scheduling', desc: 'Automated calendar booking & availability checks.', icon: '📅' },
    { name: 'Stripe', category: 'Payments', desc: 'Payment link dispatch & subscription tracking.', icon: '💳' },
    { name: 'Zoom', category: 'Meetings', desc: 'Auto-join meetings, transcribe audio & log notes.', icon: '📹' },
    { name: 'Microsoft Teams', category: 'Productivity', desc: 'In-call assistant & chat channel dispatch.', icon: '👥' },
  ];

  const filtered = integrations.filter(
    (i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleConnection = (appName: string) => {
    if (connectedApps.includes(appName)) {
      setConnectedApps(connectedApps.filter((a) => a !== appName));
    } else {
      setConnectedApps([...connectedApps, appName]);
    }
  };

  return (
    <section id="integrations" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-4">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span>NATIVE ENTERPRISE CONNECTORS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Connect Astra with <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Every Tool You Use</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base">
            Seamless 1-click native integrations with your existing tech stack.
          </p>

          {/* Search Field */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search integrations (Slack, Salesforce, Gmail)..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item) => {
            const isConnected = connectedApps.includes(item.name);
            return (
              <div
                key={item.name}
                className={`p-5 rounded-2xl border transition-all ${
                  isConnected
                    ? 'bg-slate-900/90 border-purple-500/40 shadow-lg'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="font-bold text-sm text-white">{item.name}</h3>
                      <span className="text-[10px] font-mono text-slate-500">{item.category}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-4 h-10 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>

                <button
                  onClick={() => toggleConnection(item.name)}
                  className={`w-full py-2 rounded-xl text-xs font-semibold font-mono transition-all flex items-center justify-center gap-1.5 ${
                    isConnected
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {isConnected ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>CONNECTED</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>CONNECT APP</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
