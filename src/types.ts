/**
 * Astra AI Automation Assistant - Types & Interfaces
 */

export type Role = 'Super Admin' | 'Manager' | 'Agent' | 'Customer';

export type ThemeMode = 'dark' | 'cyber-matrix' | 'high-contrast-dark' | 'light-glass';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  plan: 'Starter' | 'Professional' | 'Business' | 'Enterprise';
  company: string;
}

export interface VoiceCall {
  id: string;
  customerName: string;
  customerPhone: string;
  agentName: string;
  duration: string; // e.g., "04:12"
  timestamp: string;
  status: 'In Progress' | 'Completed' | 'Missed' | 'Transferred' | 'Scheduled';
  sentiment: 'Positive' | 'Neutral' | 'Urgent' | 'Escalated';
  summary: string;
  transcript: {
    speaker: 'Astra AI' | 'Customer';
    text: string;
    timestamp: string;
  }[];
  audioUrl?: string;
  leadScore: number;
}

export interface AutomationWorkflow {
  id: string;
  title: string;
  category: 'Desktop' | 'Browser' | 'Email' | 'WhatsApp' | 'CRM' | 'Calling';
  description: string;
  status: 'Active' | 'Pending' | 'Failed' | 'Paused' | 'Draft' | 'Executing';
  successRate: number;
  triggerCount: number;
  lastRun: string;
  steps: {
    id: string;
    title: string;
    action: string;
    status: 'Pending' | 'In Progress' | 'Completed' | 'Failed';
  }[];
}

export interface KnowledgeDocument {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: 'PDF' | 'DOCX' | 'TXT' | 'Website' | 'FAQ';
  uploadedAt: string;
  vectorChunks: number;
  status: 'Indexed' | 'Processing' | 'Failed';
  category: string;
}

export interface AgentConfig {
  id: string;
  name: string;
  voicePersona: 'Kore' | 'Zephyr' | 'Puck' | 'Fenrir';
  roleTitle: string;
  systemPrompt: string;
  language: string;
  activeWorkflows: number;
  avatarUrl: string;
  status: 'Online' | 'Busy' | 'Offline';
}

export interface LeadRecord {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  qualificationScore: number; // 0 - 100
  status: 'New' | 'Qualified' | 'Demo Scheduled' | 'Closed Won' | 'Unqualified';
  assignedAgent: string;
  source: 'AI Voice Call' | 'Website Chatbot' | 'WhatsApp' | 'Inbound Email';
  createdAt: string;
}

export interface Appointment {
  id: string;
  clientName: string;
  company: string;
  date: string;
  time: string;
  type: 'Demo Call' | 'Technical Review' | 'Onboarding' | 'Support';
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  assignedAgent: string;
}

export interface ExecutionStep {
  id: string;
  title: string;
  targetDevice: 'Desktop' | 'Mobile (Android)' | 'Web Browser' | 'Cloud AI Engine' | 'System Settings';
  actionType: 'Launch App' | 'File Operation' | 'Vision OCR' | 'Web Search' | 'Send Email/SMS' | 'System Control' | 'Calendar/Reminder' | 'Custom Script';
  details: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Failed';
  resultOutput?: string;
  requiresUserConfirm?: boolean;
}

export interface VoiceCommandExecutionPlan {
  id: string;
  commandText: string;
  intentCategory: 'Desktop App' | 'File Management' | 'Web Search' | 'OCR & Vision' | 'Mobile Action' | 'Email & Messaging' | 'System Control' | 'Multi-Step Workflow';
  timestamp: string;
  language: string;
  confidenceScore: number;
  status: 'Awaiting Review' | 'Needs Clarification' | 'Executing' | 'Completed' | 'Cancelled';
  steps: ExecutionStep[];
  followUpQuestion?: {
    questionText: string;
    options: string[];
    selectedOption?: string;
  };
  contextUsed?: string[];
}

export interface MobileDevicePermissions {
  connected: boolean;
  deviceName: string;
  batteryLevel: number;
  smsAccessGranted: boolean;
  callLogsGranted: boolean;
  notificationSyncGranted: boolean;
  fileTransferGranted: boolean;
  contactReadGranted: boolean;
}

export interface VoiceCommandHistoryItem {
  id: string;
  voicePrompt: string;
  executionPlan: VoiceCommandExecutionPlan;
  timestamp: string;
  durationMs: number;
  status: 'Success' | 'Incomplete' | 'User Cancelled';
}
