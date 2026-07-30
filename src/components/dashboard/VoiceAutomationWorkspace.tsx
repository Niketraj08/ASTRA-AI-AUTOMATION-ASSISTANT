import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Radio,
  Play,
  Square,
  Sparkles,
  Zap,
  Smartphone,
  Monitor,
  Globe,
  FileText,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Check,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Shield,
  ShieldCheck,
  Volume2,
  VolumeX,
  RefreshCw,
  Search,
  MessageSquare,
  HelpCircle,
  Sliders,
  X,
  Copy,
  ChevronDown,
  Layers,
  Cpu,
  Eye,
  Calendar,
  Send,
  PhoneCall,
} from 'lucide-react';
import {
  VoiceCommandExecutionPlan,
  ExecutionStep,
  MobileDevicePermissions,
  VoiceCommandHistoryItem,
} from '../../types';

export const VoiceAutomationWorkspace: React.FC = () => {
  // Speech Recognition & Listening State
  const [isListening, setIsListening] = useState<boolean>(false);
  const [wakeWordActive, setWakeWordActive] = useState<boolean>(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English (US)');
  const [selectedPersona, setSelectedPersona] = useState<string>('Adam (Executive)');
  const [voicePromptText, setVoicePromptText] = useState<string>('');
  const [speechTranscriptBuffer, setSpeechTranscriptBuffer] = useState<string>('');

  // Mobile Device Permission State
  const [mobileSyncEnabled, setMobileSyncEnabled] = useState<boolean>(true);
  const [mobileModalOpen, setMobileModalOpen] = useState<boolean>(false);
  const [mobilePermissions, setMobilePermissions] = useState<MobileDevicePermissions>({
    connected: true,
    deviceName: 'Samsung Galaxy S24 Ultra',
    batteryLevel: 94,
    smsAccessGranted: true,
    callLogsGranted: true,
    notificationSyncGranted: true,
    fileTransferGranted: true,
    contactReadGranted: true,
  });

  // Current Active Execution Plan
  const [activeExecutionPlan, setActiveExecutionPlan] = useState<VoiceCommandExecutionPlan | null>({
    id: 'plan_initial',
    commandText: 'Summarize Q2_Report.pdf on my desktop, draft email to Marcus, and set 3 PM reminder on my Galaxy S24',
    intentCategory: 'Multi-Step Workflow',
    timestamp: 'Just now',
    language: 'English (US)',
    confidenceScore: 98.6,
    status: 'Awaiting Review',
    contextUsed: [
      'Desktop File: /Desktop/Q2_Report.pdf',
      'Contact: Marcus Vance (marcus@acme.com)',
      'Mobile Sync: Galaxy S24 Ultra',
    ],
    followUpQuestion: {
      questionText: 'Marcus Vance has two email addresses on file. Which one should I use to send the summary?',
      options: ['marcus@acme.com (Work)', 'marcus.vance@personal.me (Personal)'],
      selectedOption: 'marcus@acme.com (Work)',
    },
    steps: [
      {
        id: 'step_1',
        title: 'Locate & Parse PDF with Vision OCR',
        targetDevice: 'Desktop',
        actionType: 'Vision OCR',
        details: 'Scans Desktop directory for "Q2_Report.pdf", extracts text and financial tables using Gemini OCR.',
        status: 'Completed',
        resultOutput: 'Successfully extracted 14 pages. Key metrics: Revenue +22%, CAC -14%.',
      },
      {
        id: 'step_2',
        title: 'Generate Executive Summary & Bullet Points',
        targetDevice: 'Cloud AI Engine',
        actionType: 'Custom Script',
        details: 'Synthesizes key takeaways into a concise 3-bullet email digest.',
        status: 'Completed',
        resultOutput: 'Summary generated (3 key points ready for review).',
      },
      {
        id: 'step_3',
        title: 'Draft Email to Marcus Vance',
        targetDevice: 'Desktop',
        actionType: 'Send Email/SMS',
        details: 'Opens Gmail client, fills recipient marcus@acme.com, subject "Q2 Financial Highlights Summary".',
        status: 'Pending',
        requiresUserConfirm: true,
      },
      {
        id: 'step_4',
        title: 'Create Alarm & Calendar Reminder on Mobile',
        targetDevice: 'Mobile (Android)',
        actionType: 'Calendar/Reminder',
        details: 'Dispatches intent to connected Galaxy S24 Ultra to set alarm for 3:00 PM with note "Review Q2 Report with Marcus".',
        status: 'Pending',
      },
    ],
  });

  // Execution Progress State
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionLogMessage, setExecutionLogMessage] = useState<string | null>(null);

  // Command History
  const [history, setHistory] = useState<VoiceCommandHistoryItem[]>([
    {
      id: 'hist_1',
      voicePrompt: 'Open QuickBooks and scan recent invoices for totals',
      timestamp: '10 mins ago',
      durationMs: 1420,
      status: 'Success',
      executionPlan: {
        id: 'plan_hist_1',
        commandText: 'Open QuickBooks and scan recent invoices for totals',
        intentCategory: 'OCR & Vision',
        timestamp: '10 mins ago',
        language: 'English (US)',
        confidenceScore: 99.1,
        status: 'Completed',
        steps: [
          { id: 'h1', title: 'Launch QuickBooks Desktop App', targetDevice: 'Desktop', actionType: 'Launch App', details: 'Focused application window', status: 'Completed' },
          { id: 'h2', title: 'Screen Vision OCR Invoice Scan', targetDevice: 'Desktop', actionType: 'Vision OCR', details: 'Extracted Total: $14,280.00', status: 'Completed' },
        ],
      },
    },
    {
      id: 'hist_2',
      voicePrompt: 'Check phone notifications and read unread SMS from Marcus',
      timestamp: '1 hour ago',
      durationMs: 980,
      status: 'Success',
      executionPlan: {
        id: 'plan_hist_2',
        commandText: 'Check phone notifications and read unread SMS from Marcus',
        intentCategory: 'Mobile Action',
        timestamp: '1 hour ago',
        language: 'English (US)',
        confidenceScore: 97.4,
        status: 'Completed',
        steps: [
          { id: 'h3', title: 'Sync Android Notification Queue', targetDevice: 'Mobile (Android)', actionType: 'Send Email/SMS', details: 'SMS read: "Can we review the contract today?"', status: 'Completed' },
        ],
      },
    },
  ]);

  // Quick Action Preset Category Filter
  const [activePresetTab, setActivePresetTab] = useState<string>('All');

  // Speech Recognition API setup
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLanguage === 'Spanish (ES)' ? 'es-ES' : selectedLanguage === 'German (DE)' ? 'de-DE' : 'en-US';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setSpeechTranscriptBuffer(transcript);
        setVoicePromptText(transcript);
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
      };

      recognitionRef.current = recognition;
    }
  }, [selectedLanguage]);

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      if (voicePromptText.trim()) {
        handleGenerateExecutionPlan(voicePromptText);
      }
    } else {
      setSpeechTranscriptBuffer('');
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          // Ignore restart error
        }
      }
      setIsListening(true);
    }
  };

  const handleGenerateExecutionPlan = (promptText: string) => {
    if (!promptText.trim()) return;

    // Simulate AI Intent Recognition & Execution Plan Generation
    const promptLower = promptText.toLowerCase();

    let category: VoiceCommandExecutionPlan['intentCategory'] = 'Multi-Step Workflow';
    let steps: ExecutionStep[] = [];

    if (promptLower.includes('pdf') || promptLower.includes('summarize')) {
      category = 'OCR & Vision';
      steps = [
        { id: 's1', title: 'Locate & Read PDF File', targetDevice: 'Desktop', actionType: 'File Operation', details: `Search local storage for document referenced in "${promptText}"`, status: 'Pending' },
        { id: 's2', title: 'Perform Gemini Vision OCR', targetDevice: 'Cloud AI Engine', actionType: 'Vision OCR', details: 'Extract headers, tables, and numerical metrics', status: 'Pending' },
        { id: 's3', title: 'Generate Executive Bulleted Summary', targetDevice: 'Cloud AI Engine', actionType: 'Custom Script', details: 'Draft key takeaway points', status: 'Pending' },
      ];
    } else if (promptLower.includes('phone') || promptLower.includes('sms') || promptLower.includes('call')) {
      category = 'Mobile Action';
      steps = [
        { id: 's1', title: 'Connect to Galaxy S24 Ultra', targetDevice: 'Mobile (Android)', actionType: 'Send Email/SMS', details: 'Sync Bluetooth/Wi-Fi encrypted mobile bridge', status: 'Pending' },
        { id: 's2', title: 'Execute Mobile Command', targetDevice: 'Mobile (Android)', actionType: 'Send Email/SMS', details: `Execute: ${promptText}`, status: 'Pending' },
      ];
    } else if (promptLower.includes('chrome') || promptLower.includes('search') || promptLower.includes('website')) {
      category = 'Web Search';
      steps = [
        { id: 's1', title: 'Launch Web Browser Tab', targetDevice: 'Web Browser', actionType: 'Launch App', details: 'Focus Chrome / Edge window', status: 'Pending' },
        { id: 's2', title: 'Perform Google Web Search', targetDevice: 'Web Browser', actionType: 'Web Search', details: `Query query parameters for "${promptText}"`, status: 'Pending' },
      ];
    } else if (promptLower.includes('file') || promptLower.includes('folder') || promptLower.includes('organize')) {
      category = 'File Management';
      steps = [
        { id: 's1', title: 'Index Desktop & Downloads Directory', targetDevice: 'Desktop', actionType: 'File Operation', details: 'Scan filesystem structure', status: 'Pending' },
        { id: 's2', title: 'Execute File Organization Rule', targetDevice: 'Desktop', actionType: 'File Operation', details: 'Group files into structured subfolders by extension', status: 'Pending', requiresUserConfirm: true },
      ];
    } else {
      category = 'Desktop App';
      steps = [
        { id: 's1', title: 'Analyze System Command Intent', targetDevice: 'Desktop', actionType: 'Launch App', details: `Parse intent for "${promptText}"`, status: 'Pending' },
        { id: 's2', title: 'Execute Application Automation', targetDevice: 'Desktop', actionType: 'Custom Script', details: 'Dispatch OS UI Automation payload', status: 'Pending' },
      ];
    }

    const newPlan: VoiceCommandExecutionPlan = {
      id: `plan_${Date.now()}`,
      commandText: promptText,
      intentCategory: category,
      timestamp: 'Just now',
      language: selectedLanguage,
      confidenceScore: Math.floor(Math.random() * 5 + 95) + Math.random(),
      status: 'Awaiting Review',
      contextUsed: ['Active Window: Astra Workspace', 'Desktop Accessibility: Enabled'],
      steps,
    };

    setActiveExecutionPlan(newPlan);
    setExecutionLogMessage(`Astra AI parsed voice command: "${promptText}". Execution plan ready.`);
  };

  const handleRunExecutionPlan = async () => {
    if (!activeExecutionPlan) return;

    setIsExecuting(true);
    setExecutionLogMessage('Astra AI running execution plan step-by-step...');

    // Update plan status
    setActiveExecutionPlan((prev) => (prev ? { ...prev, status: 'Executing' } : null));

    const updatedSteps = [...activeExecutionPlan.steps];

    for (let i = 0; i < updatedSteps.length; i++) {
      // Set step to in progress
      updatedSteps[i] = { ...updatedSteps[i], status: 'In Progress' };
      setActiveExecutionPlan((prev) => (prev ? { ...prev, steps: [...updatedSteps] } : null));

      // Simulate step delay
      await new Promise((res) => setTimeout(res, 1200));

      // Set step to completed
      updatedSteps[i] = {
        ...updatedSteps[i],
        status: 'Completed',
        resultOutput: `Executed successfully on ${updatedSteps[i].targetDevice}.`,
      };
      setActiveExecutionPlan((prev) => (prev ? { ...prev, steps: [...updatedSteps] } : null));
    }

    // Complete plan
    setActiveExecutionPlan((prev) => (prev ? { ...prev, status: 'Completed' } : null));
    setIsExecuting(false);
    setExecutionLogMessage('Execution plan completed successfully!');

    // Add to history
    const historyItem: VoiceCommandHistoryItem = {
      id: `hist_${Date.now()}`,
      voicePrompt: activeExecutionPlan.commandText,
      executionPlan: { ...activeExecutionPlan, status: 'Completed', steps: updatedSteps },
      timestamp: 'Just now',
      durationMs: updatedSteps.length * 1200,
      status: 'Success',
    };

    setHistory((prev) => [historyItem, ...prev]);

    // Speak completion response if Speech Synthesis available
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `Execution plan completed for ${activeExecutionPlan.commandText}. All ${updatedSteps.length} steps executed successfully.`
      );
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAddStepToPlan = () => {
    if (!activeExecutionPlan) return;
    const newStep: ExecutionStep = {
      id: `step_${Date.now()}`,
      title: 'New Custom Action Step',
      targetDevice: 'Desktop',
      actionType: 'Custom Script',
      details: 'User-defined secondary task action.',
      status: 'Pending',
    };
    setActiveExecutionPlan({
      ...activeExecutionPlan,
      steps: [...activeExecutionPlan.steps, newStep],
    });
  };

  const handleRemoveStep = (stepId: string) => {
    if (!activeExecutionPlan) return;
    setActiveExecutionPlan({
      ...activeExecutionPlan,
      steps: activeExecutionPlan.steps.filter((s) => s.id !== stepId),
    });
  };

  const presetCommands = [
    { text: 'Summarize Q2_Report.pdf on my desktop and email to Marcus', category: 'OCR & Vision', icon: FileText },
    { text: 'Open QuickBooks and scan recent invoices for totals', category: 'Desktop Apps', icon: Monitor },
    { text: 'Check my Galaxy S24 unread SMS & read Marcus message', category: 'Mobile Phone', icon: Smartphone },
    { text: 'Search Google for latest AI automation trends and summarize', category: 'Web & Search', icon: Globe },
    { text: 'Clean Downloads folder and group files by extension', category: 'Files & Folders', icon: Layers },
    { text: 'Set system brightness to 60% and volume to 80%', category: 'System & Settings', icon: Sliders },
    { text: 'Take screenshot, extract invoice table, and save to Excel', category: 'OCR & Vision', icon: Eye },
    { text: 'Send WhatsApp reminder to Samantha about tomorrow demo', category: 'Mobile Phone', icon: Send },
  ];

  const filteredPresets = activePresetTab === 'All'
    ? presetCommands
    : presetCommands.filter((p) => p.category === activePresetTab);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header Control & Telemetry Bar */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md shadow-2xl space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-600/30">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-white tracking-tight">Voice Automation Center</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  REAL-TIME VOICE ENGINE
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Speak naturally to control your Desktop applications, local files, web browser, and connected Android phone.
              </p>
            </div>
          </div>

          {/* Quick Config Toggles */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Wake Word Toggle */}
            <button
              onClick={() => setWakeWordActive(!wakeWordActive)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                wakeWordActive
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-lg shadow-purple-500/10'
                  : 'bg-slate-950 text-slate-500 border-slate-800'
              }`}
            >
              <Mic className="w-3.5 h-3.5 text-purple-400" />
              <span>Wake Word: "Hey Astra" ({wakeWordActive ? 'ON' : 'OFF'})</span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 font-mono">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                <option value="English (US)" className="bg-slate-900">English (US)</option>
                <option value="Spanish (ES)" className="bg-slate-900">Spanish (ES)</option>
                <option value="German (DE)" className="bg-slate-900">German (DE)</option>
                <option value="French (FR)" className="bg-slate-900">French (FR)</option>
                <option value="Japanese (JP)" className="bg-slate-900">Japanese (JP)</option>
                <option value="Mandarin (ZH)" className="bg-slate-900">Mandarin (ZH)</option>
                <option value="Hindi (HI)" className="bg-slate-900">Hindi (HI)</option>
              </select>
            </div>

            {/* ElevenLabs Voice Persona */}
            <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 font-mono">
              <Volume2 className="w-3.5 h-3.5 text-purple-400" />
              <select
                value={selectedPersona}
                onChange={(e) => setSelectedPersona(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                <option value="Adam (Executive)" className="bg-slate-900">Adam (Executive)</option>
                <option value="Rachel (Customer Support)" className="bg-slate-900">Rachel (Support)</option>
                <option value="Domi (Sales)" className="bg-slate-900">Domi (Sales & Leads)</option>
                <option value="Antoni (Technical)" className="bg-slate-900">Antoni (Technical)</option>
              </select>
            </div>

            {/* Android Device Sync Status */}
            <button
              onClick={() => setMobileModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold flex items-center gap-2 transition-all"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Galaxy S24 Ultra ({mobilePermissions.batteryLevel}%)</span>
            </button>
          </div>
        </div>

        {/* Device Integration Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
            <Monitor className="w-4 h-4 text-purple-400 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">Desktop Control</div>
              <div className="text-[10px] text-emerald-400 font-mono">Active (Apps, Files, System)</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
            <Eye className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">Screen Vision OCR</div>
              <div className="text-[10px] text-emerald-400 font-mono">Ready (Gemini 3.6 Vision)</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
            <Smartphone className="w-4 h-4 text-blue-400 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">Android Bridge</div>
              <div className="text-[10px] text-emerald-400 font-mono">Connected (SMS, Calls, Files)</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">Security Guard</div>
              <div className="text-[10px] text-slate-400 font-mono">Explicit Confirmation On</div>
            </div>
          </div>
        </div>
      </div>

      {/* Flagship Animated Microphone & Waveform Section */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-md text-center relative overflow-hidden space-y-6 shadow-2xl">
        {/* Glow ambient circle background */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Central Glowing Mic Trigger */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="relative mb-6">
            {/* Animated Radial Waves */}
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping scale-150" />
                <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-pulse scale-125" />
              </>
            )}

            <button
              onClick={toggleListening}
              className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 shadow-2xl ${
                isListening
                  ? 'bg-gradient-to-tr from-red-600 to-purple-600 text-white scale-105 shadow-red-500/40'
                  : 'bg-gradient-to-tr from-purple-600 via-blue-600 to-cyan-500 text-white hover:scale-105 shadow-purple-600/40'
              }`}
            >
              {isListening ? (
                <Square className="w-10 h-10 fill-white animate-pulse" />
              ) : (
                <Mic className="w-12 h-12 text-white" />
              )}
            </button>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              {isListening ? 'Listening... Speak Your Command' : 'Tap Microphone or Say "Hey Astra"'}
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              {isListening
                ? 'Capture speech real-time · Multi-step execution planning in progress...'
                : 'Example: "Open QuickBooks, summarize invoice PDF, and send WhatsApp alert to Samantha"'}
            </p>
          </div>

          {/* Real-time Speech Transcript Display */}
          {speechTranscriptBuffer && (
            <div className="mt-4 max-w-xl w-full p-4 rounded-2xl bg-slate-950/90 border border-purple-500/40 text-xs font-mono text-purple-300 animate-in fade-in duration-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0 animate-spin" />
              <span className="italic">"{speechTranscriptBuffer}"</span>
            </div>
          )}

          {/* Manual Input Bar */}
          <div className="mt-6 max-w-2xl w-full flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={voicePromptText}
                onChange={(e) => setVoicePromptText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleGenerateExecutionPlan(voicePromptText);
                }}
                placeholder="Or type a voice command here (e.g. 'Summarize Q2_Report.pdf and email Marcus')..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 pr-10 shadow-inner"
              />
              <Sparkles className="w-4 h-4 text-slate-500 absolute right-3 top-3.5" />
            </div>

            <button
              onClick={() => handleGenerateExecutionPlan(voicePromptText)}
              className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-purple-600/20 shrink-0"
            >
              <Zap className="w-4 h-4" />
              <span>Generate Plan</span>
            </button>
          </div>
        </div>

        {/* Live Context Memory Strip */}
        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono gap-2 text-left">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-white font-bold">Astra Context Memory:</span>
            <span>Desktop Focus: Chrome & QuickBooks</span>
            <span>·</span>
            <span>Android Sync: Active</span>
          </div>
          <div className="text-[10px] text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
            Memory Tokens: 428 / 32,000
          </div>
        </div>
      </div>

      {/* Main Grid: Execution Plan Generator & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Multi-Step Execution Plan (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {activeExecutionPlan ? (
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-purple-500/40 backdrop-blur-md space-y-5 shadow-2xl">
              {/* Execution Plan Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold">
                      {activeExecutionPlan.intentCategory}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Confidence: <strong className="text-emerald-400">{activeExecutionPlan.confidenceScore.toFixed(1)}%</strong>
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-white mt-1">
                    Voice Command Execution Plan
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-xl font-mono text-xs font-bold ${
                      activeExecutionPlan.status === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : activeExecutionPlan.status === 'Executing'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {activeExecutionPlan.status}
                  </span>
                </div>
              </div>

              {/* Parsed Command Prompt display */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Voice Prompt Parsed</div>
                <div className="text-xs font-bold text-white italic">"{activeExecutionPlan.commandText}"</div>
              </div>

              {/* Follow-up Question prompt if applicable */}
              {activeExecutionPlan.followUpQuestion && (
                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                    <HelpCircle className="w-4 h-4" />
                    <span>Follow-Up Confirmation Required</span>
                  </div>
                  <p className="text-xs text-slate-200">{activeExecutionPlan.followUpQuestion.questionText}</p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeExecutionPlan.followUpQuestion.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() =>
                          setActiveExecutionPlan((prev) =>
                            prev && prev.followUpQuestion
                              ? {
                                  ...prev,
                                  followUpQuestion: { ...prev.followUpQuestion, selectedOption: opt },
                                }
                              : prev
                          )
                        }
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                          activeExecutionPlan.followUpQuestion?.selectedOption === opt
                            ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Steps List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Multi-Step Execution Sequence ({activeExecutionPlan.steps.length} Steps)</span>
                  </h4>

                  <button
                    onClick={handleAddStepToPlan}
                    className="text-xs text-purple-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Action Step</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {activeExecutionPlan.steps.map((step, idx) => (
                    <div
                      key={step.id}
                      className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 transition-all hover:border-slate-700"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-white">{step.title}</span>
                              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                                {step.targetDevice}
                              </span>
                              {step.requiresUserConfirm && (
                                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono">
                                  REQUIRES CONFIRM
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">{step.details}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {step.status === 'Completed' && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          )}
                          {step.status === 'In Progress' && (
                            <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
                          )}
                          {step.status === 'Pending' && (
                            <Clock className="w-4 h-4 text-slate-500" />
                          )}

                          <button
                            onClick={() => handleRemoveStep(step.id)}
                            className="p-1 text-slate-600 hover:text-red-400"
                            title="Remove Step"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {step.resultOutput && (
                        <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-[11px] font-mono text-emerald-300 flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{step.resultOutput}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Execution Plan Action Buttons */}
              <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setActiveExecutionPlan(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 text-xs font-semibold"
                >
                  Clear Plan
                </button>

                <button
                  onClick={handleRunExecutionPlan}
                  disabled={isExecuting}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 disabled:opacity-50"
                >
                  {isExecuting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Executing Plan on Devices...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Execute Plan ({activeExecutionPlan.steps.length} Steps)</span>
                    </>
                  )}
                </button>
              </div>

              {executionLogMessage && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-purple-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400 shrink-0 animate-spin" />
                  <span>{executionLogMessage}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-3">
              <Mic className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Execution Plan Active</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Speak a command or click one of the quick presets on the right to generate a multi-step execution plan.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Quick Action Presets & History (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Action Presets */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Quick Voice Presets</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-500">Tap to Load Plan</span>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px] font-mono">
              {['All', 'OCR & Vision', 'Desktop Apps', 'Mobile Phone', 'Web & Search', 'Files & Folders'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActivePresetTab(cat)}
                  className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                    activePresetTab === cat
                      ? 'bg-purple-600 text-white font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Presets List */}
            <div className="space-y-2">
              {filteredPresets.map((preset, idx) => {
                const IconComp = preset.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setVoicePromptText(preset.text);
                      handleGenerateExecutionPlan(preset.text);
                    }}
                    className="w-full text-left p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-purple-500/40 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-xs text-slate-200 group-hover:text-white font-medium line-clamp-1">
                        {preset.text}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Automation History */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Recent Automation History</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-500">{history.length} Runs</span>
            </div>

            <div className="space-y-3">
              {history.map((item) => (
                <div key={item.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white line-clamp-1">{item.voicePrompt}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                    <span>{item.timestamp}</span>
                    <span>Duration: {item.durationMs}ms</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Permissions Modal */}
      {mobileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full relative shadow-2xl space-y-5 animate-in fade-in duration-200">
            <button
              onClick={() => setMobileModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Connected Android Device Settings</h3>
                <p className="text-xs text-slate-400 font-mono">
                  {mobilePermissions.deviceName} · Battery {mobilePermissions.batteryLevel}%
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: 'SMS Read & Reply Access', key: 'smsAccessGranted', desc: 'Allows Astra to parse unread messages & dispatch SMS' },
                { label: 'Call Logs & Phone Calls', key: 'callLogsGranted', desc: 'Enables voice call dialing & inbound call summary' },
                { label: 'Notification Mirroring', key: 'notificationSyncGranted', desc: 'Displays mobile push alerts on Desktop' },
                { label: 'File Transfer Bridge', key: 'fileTransferGranted', desc: 'Allows seamless file transfer between PC & Phone' },
                { label: 'Contacts Directory', key: 'contactReadGranted', desc: 'Resolves phone numbers to names automatically' },
              ].map((perm) => {
                const isEnabled = (mobilePermissions as any)[perm.key];
                return (
                  <div key={perm.key} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{perm.label}</div>
                      <div className="text-[10px] text-slate-400">{perm.desc}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setMobilePermissions((prev) => ({
                          ...prev,
                          [perm.key]: !(prev as any)[perm.key],
                        }))
                      }
                      className={`w-11 h-6 rounded-full transition-all relative p-0.5 ${
                        isEnabled ? 'bg-cyan-600' : 'bg-slate-800'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-all transform ${
                          isEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setMobileModalOpen(false)}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-lg shadow-purple-600/20"
            >
              Save Mobile Permissions
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
