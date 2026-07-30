import React, { useState } from 'react';
import {
  LayoutDashboard, PhoneCall, Zap, BookOpen, Bot, BarChart3,
  Database, Calendar, Settings, ArrowLeft, LogOut, Shield, ChevronRight, User, Mic
} from 'lucide-react';
import { UserProfile, VoiceCall, AutomationWorkflow, KnowledgeDocument, AgentConfig, LeadRecord, Appointment } from '../types';
import { AstraCognixLogo } from './AstraCognixLogo';

import { VoiceAutomationWorkspace } from './dashboard/VoiceAutomationWorkspace';
import { OverviewView } from './dashboard/OverviewView';
import { VoiceCallsView } from './dashboard/VoiceCallsView';
import { AutomationView } from './dashboard/AutomationView';
import { KnowledgeBaseView } from './dashboard/KnowledgeBaseView';
import { AgentsView } from './dashboard/AgentsView';
import { AnalyticsView } from './dashboard/AnalyticsView';
import { CrmView } from './dashboard/CrmView';
import { AppointmentsView } from './dashboard/AppointmentsView';
import { SettingsView } from './dashboard/SettingsView';

interface DashboardLayoutProps {
  user: UserProfile;
  onReturnToLanding: () => void;
  onLogout: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  user,
  onReturnToLanding,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<string>('voice-workspace');

  // Initial Mock State Data for the Dashboard
  const mockCalls: VoiceCall[] = [
    {
      id: 'call_901',
      customerName: 'Marcus Vance',
      customerPhone: '+1 (555) 492-0192',
      agentName: 'Astra AI (Kore)',
      duration: '04:18',
      timestamp: '10:42 AM',
      status: 'Completed',
      sentiment: 'Positive',
      summary: 'Inquired about enterprise pricing for 50 seats. Astra qualified budget ($25k+) and auto-emailed PDF contract.',
      transcript: [],
      leadScore: 92,
    },
    {
      id: 'call_902',
      customerName: 'Samantha Ray',
      customerPhone: '+1 (555) 882-9011',
      agentName: 'Astra AI (Zephyr)',
      duration: '02:45',
      timestamp: '09:15 AM',
      status: 'Completed',
      sentiment: 'Positive',
      summary: 'Asked for technical documentation on Salesforce CRM integration. Meeting scheduled for Thursday.',
      transcript: [],
      leadScore: 88,
    },
    {
      id: 'call_903',
      customerName: 'Arthur Pendelton',
      customerPhone: '+1 (555) 301-4412',
      agentName: 'Astra AI (Puck)',
      duration: '01:12',
      timestamp: '08:30 AM',
      status: 'Completed',
      sentiment: 'Neutral',
      summary: 'Support ticket follow-up regarding invoice #8901. Status marked resolved.',
      transcript: [],
      leadScore: 65,
    },
  ];

  const mockWorkflows: AutomationWorkflow[] = [
    {
      id: 'wf_1',
      title: 'Inbound Call -> Salesforce Lead & Calendar Invite',
      category: 'Calling',
      description: 'Extracts call intent, creates lead in Salesforce, and dispatches Google Meet link.',
      status: 'Active',
      successRate: 99.8,
      triggerCount: 1420,
      lastRun: '10 mins ago',
      steps: [
        { id: '1', title: 'Answer Phone Call', action: 'Kore Voice Persona', status: 'Completed' },
        { id: '2', title: 'Sync to Salesforce CRM', action: 'Create Lead Object', status: 'Completed' },
        { id: '3', title: 'Book Calendar Slot', action: 'Google Calendar API', status: 'Completed' },
      ],
    },
    {
      id: 'wf_2',
      title: 'Desktop QuickBooks Invoice PDF Extraction',
      category: 'Desktop',
      description: 'Visually locates app, extracts total amount, and dispatches WhatsApp alert.',
      status: 'Active',
      successRate: 98.5,
      triggerCount: 890,
      lastRun: '1 hour ago',
      steps: [
        { id: '1', title: 'Open QuickBooks Window', action: 'Screen Vision OCR', status: 'Completed' },
        { id: '2', title: 'Extract Invoice PDF', action: 'Vision AI Reader', status: 'Completed' },
        { id: '3', title: 'Send WhatsApp Alert', action: 'WhatsApp Business API', status: 'Completed' },
      ],
    },
  ];

  const mockDocs: KnowledgeDocument[] = [
    {
      id: 'doc_1',
      fileName: 'Astra_Enterprise_SLA_Guidelines_2026.pdf',
      fileSize: '3.1 MB',
      fileType: 'PDF',
      uploadedAt: '2026-07-28',
      vectorChunks: 42,
      status: 'Indexed',
      category: 'SLA',
    },
    {
      id: 'doc_2',
      fileName: 'Company_Product_FAQ_&_Pricing.pdf',
      fileSize: '1.8 MB',
      fileType: 'PDF',
      uploadedAt: '2026-07-25',
      vectorChunks: 24,
      status: 'Indexed',
      category: 'FAQ',
    },
  ];

  const mockAgents: AgentConfig[] = [
    {
      id: 'ag_1',
      name: 'Astra Sales Qualification Agent',
      voicePersona: 'Kore',
      roleTitle: 'Inbound Sales Lead',
      systemPrompt: 'You qualify incoming sales calls and book discovery demos.',
      language: 'English (US)',
      activeWorkflows: 4,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'Online',
    },
    {
      id: 'ag_2',
      name: 'Astra Desktop ERP Agent',
      voicePersona: 'Zephyr',
      roleTitle: 'Accounting & Invoicing',
      systemPrompt: 'You parse invoices and fill ERP forms.',
      language: 'English (US)',
      activeWorkflows: 6,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      status: 'Online',
    },
  ];

  const mockLeads: LeadRecord[] = [
    {
      id: 'ld_1',
      name: 'Marcus Vance',
      company: 'Acme Enterprises',
      email: 'marcus@acme.com',
      phone: '+1 (555) 492-0192',
      qualificationScore: 92,
      status: 'Qualified',
      assignedAgent: 'Astra Sales Agent',
      source: 'AI Voice Call',
      createdAt: '2026-07-30',
    },
    {
      id: 'ld_2',
      name: 'Samantha Ray',
      company: 'FinTech Labs',
      email: 'samantha@fintechlabs.io',
      phone: '+1 (555) 882-9011',
      qualificationScore: 88,
      status: 'Demo Scheduled',
      assignedAgent: 'Astra Executive Agent',
      source: 'Website Chatbot',
      createdAt: '2026-07-29',
    },
  ];

  const mockAppointments: Appointment[] = [
    {
      id: 'apt_1',
      clientName: 'Samantha Ray',
      company: 'FinTech Labs',
      date: '2026-07-31',
      time: '10:00 AM',
      type: 'Demo Call',
      status: 'Confirmed',
      assignedAgent: 'Astra Executive Agent',
    },
    {
      id: 'apt_2',
      clientName: 'Marcus Vance',
      company: 'Acme Enterprises',
      date: '2026-08-01',
      time: '02:00 PM',
      type: 'Technical Review',
      status: 'Confirmed',
      assignedAgent: 'Astra Sales Agent',
    },
  ];

  const menuItems = [
    { id: 'voice-workspace', label: 'Voice Automation', icon: Mic },
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'voice-calls', label: 'Voice Calls', icon: PhoneCall },
    { id: 'automation', label: 'Automations', icon: Zap },
    { id: 'knowledge-base', label: 'Knowledge Base', icon: BookOpen },
    { id: 'agents', label: 'AI Agents', icon: Bot },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'crm', label: 'CRM & Leads', icon: Database },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900/90 border-r border-slate-800 p-4 flex flex-col justify-between shrink-0">
        <div>
          {/* AstraCognix Solutions Logo */}
          <div className="flex flex-col px-2 py-4 border-b border-slate-800 mb-6 gap-1 cursor-pointer" onClick={onReturnToLanding}>
            <AstraCognixLogo size="sm" variant="full" theme="dark" />
            <span className="text-[9px] font-mono text-purple-400 pl-0.5 tracking-wider uppercase">
              Admin Workspace
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const IconComp = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-3 ${
                    active
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <button
            onClick={onReturnToLanding}
            className="w-full py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Landing Page</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Body */}
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
        
        {/* Workspace Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white capitalize">{activeTab.replace('-', ' ')}</h1>
              <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-[10px]">
                {user.role} Access
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Astra AI Automation Assistant Platform v2.5</p>
          </div>

          {/* User Badge */}
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl">
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-purple-500/40" />
            <div>
              <div className="font-bold text-xs text-white">{user.name}</div>
              <div className="text-[10px] text-slate-400 font-mono">{user.email}</div>
            </div>
            <button onClick={onLogout} title="Sign Out" className="p-1 text-slate-500 hover:text-red-400 ml-2">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Router Content */}
        {activeTab === 'voice-workspace' && <VoiceAutomationWorkspace />}
        {activeTab === 'overview' && <OverviewView calls={mockCalls} automations={mockWorkflows} onNavigateTab={setActiveTab} />}
        {activeTab === 'voice-calls' && <VoiceCallsView calls={mockCalls} />}
        {activeTab === 'automation' && <AutomationView workflows={mockWorkflows} />}
        {activeTab === 'knowledge-base' && <KnowledgeBaseView documents={mockDocs} />}
        {activeTab === 'agents' && <AgentsView agents={mockAgents} />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'crm' && <CrmView leads={mockLeads} />}
        {activeTab === 'appointments' && <AppointmentsView appointments={mockAppointments} />}
        {activeTab === 'settings' && <SettingsView user={user} />}

      </main>

    </div>
  );
};
