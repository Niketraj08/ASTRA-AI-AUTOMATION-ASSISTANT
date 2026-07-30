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
  Music,
  Disc,
  Headphones,
} from 'lucide-react';
import {
  VoiceCommandExecutionPlan,
  ExecutionStep,
  MobileDevicePermissions,
  VoiceCommandHistoryItem,
} from '../../types';
import { LiveExecutionTimeline } from './LiveExecutionTimeline';
import { InAppMusicPlayer, SongTrack, POPULAR_HINDI_SONGS, ALL_SONGS } from '../InAppMusicPlayer';

export const VoiceAutomationWorkspace: React.FC = () => {
  // Speech Recognition & Listening State
  const [isListening, setIsListening] = useState<boolean>(false);
  const [wakeWordActive, setWakeWordActive] = useState<boolean>(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English (US)');
  const [selectedPersona, setSelectedPersona] = useState<string>('Adam (Executive)');
  const [voicePromptText, setVoicePromptText] = useState<string>('');
  const [speechTranscriptBuffer, setSpeechTranscriptBuffer] = useState<string>('');

  // Music Player State
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState<boolean>(false);
  const [activeMusicTrack, setActiveMusicTrack] = useState<SongTrack | null>(POPULAR_HINDI_SONGS[0]);

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
    commandText: 'Summarize Q2_Report.pdf on my desktop, email Marcus Vance, and set a reminder on my Galaxy S24 at 3 PM',
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
      questionText: 'Two email addresses found for Marcus Vance. Which one would you like to use?',
      options: ['marcus@acme.com (Work)', 'marcus.vance@personal.me (Personal)'],
      selectedOption: 'marcus@acme.com (Work)',
    },
    steps: [
      {
        id: 'step_1',
        title: 'Locate PDF & Extract Text via Gemini Vision OCR',
        targetDevice: 'Desktop',
        actionType: 'Vision OCR',
        details: 'Scan "Q2_Report.pdf" on Desktop and extract executive financial figures.',
        status: 'Completed',
        resultOutput: '14 pages extracted successfully. Revenue +22%, CAC -14%.',
      },
      {
        id: 'step_2',
        title: 'Generate Executive Key Summary Bullets',
        targetDevice: 'Cloud AI Engine',
        actionType: 'Custom Script',
        details: 'Compiled 3-bullet executive overview.',
        status: 'Completed',
        resultOutput: 'Executive summary ready for email attachment.',
      },
      {
        id: 'step_3',
        title: 'Draft & Send Email to Marcus Vance',
        targetDevice: 'Desktop',
        actionType: 'Send Email/SMS',
        details: 'Open Gmail client, populate recipient marcus@acme.com.',
        status: 'Pending',
        requiresUserConfirm: true,
      },
      {
        id: 'step_4',
        title: 'Sync Alarm & Calendar Reminder on Mobile Phone',
        targetDevice: 'Mobile (Android)',
        actionType: 'Calendar/Reminder',
        details: 'Set 3:00 PM reminder on Galaxy S24 Ultra.',
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
      recognition.lang = selectedLanguage.includes('Hindi') || selectedLanguage.includes('hi')
        ? 'hi-IN'
        : selectedLanguage === 'Spanish (ES)'
        ? 'es-ES'
        : selectedLanguage === 'German (DE)'
        ? 'de-DE'
        : 'en-US';

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
    const isHindi = selectedLanguage.includes('Hindi') || selectedLanguage.includes('hi') || /[\u0900-\u097F]/.test(promptText);

    // 🎵 Music Playback Intent Check (Play pure song audio within system)
    const isMusicCommand =
      promptLower.includes('play') ||
      promptLower.includes('song') ||
      promptLower.includes('music') ||
      promptLower.includes('gaana') ||
      promptLower.includes('suno') ||
      promptLower.includes('listen');

    if (isMusicCommand) {
      // Check if user specifically requested a Hindi song or generic song request
      const isExplicitHindi =
        promptLower.includes('hindi') ||
        promptLower.includes('gaana') ||
        promptLower.includes('kesariya') ||
        promptLower.includes('arijit') ||
        promptLower.includes('suno') ||
        promptLower.includes('tum hi ho');

      // Extract song name/query
      let songQuery = promptText
        .replace(/play\s+(a\s+)?(hindi\s+)?(song|music|video)?/gi, '')
        .replace(/suno|gaana|bajaao|baja/gi, '')
        .trim();

      if (!songQuery || songQuery.length < 2) {
        songQuery = isExplicitHindi ? 'Kesariya Arijit Singh' : 'Kesariya';
      }

      // Find match in ALL_SONGS
      const matched = ALL_SONGS.find(
        (s) =>
          s.title.toLowerCase().includes(songQuery.toLowerCase()) ||
          songQuery.toLowerCase().includes(s.title.toLowerCase()) ||
          s.artist.toLowerCase().includes(songQuery.toLowerCase())
      );

      const selectedTrack: SongTrack = matched || {
        id: `track_${Date.now()}`,
        title: songQuery.includes('by') ? songQuery.split('by')[0]?.trim() : songQuery,
        artist: songQuery.includes('by') ? songQuery.split('by')[1]?.trim() : (isExplicitHindi ? 'Top Hindi Artist' : 'Retrieved Audio Track'),
        album: 'Bollywood Hits',
        youtubeId: '',
        genre: isExplicitHindi ? 'Bollywood Soul' : 'In-System Audio Stream',
        language: isExplicitHindi ? 'Hindi' : 'Global',
        coverGradient: 'from-amber-500 via-rose-600 to-purple-900',
        durationSec: 240,
      };

      setActiveMusicTrack(selectedTrack);
      setIsMusicPlayerOpen(true);

      const musicSteps: ExecutionStep[] = [
        {
          id: 'ms1',
          title: `Search & Retrieve Top Hindi Song "${selectedTrack.title}"`,
          targetDevice: 'Cloud AI Engine',
          actionType: 'Launch App',
          details: `Query resolved: "${selectedTrack.title}" by ${selectedTrack.artist} (${selectedTrack.genre})`,
          status: 'Completed',
          resultOutput: `Song "${selectedTrack.title}" retrieved successfully from search engine.`,
        },
        {
          id: 'ms2',
          title: 'Route Audio Stream Directly to In-System Player',
          targetDevice: 'Desktop',
          actionType: 'Custom Script',
          details: 'Pure Audio Stream routed (No video player iframe rendered)',
          status: 'Completed',
          resultOutput: 'System pure audio stream active with spinning disc & equalizer.',
        },
        {
          id: 'ms3',
          title: 'Equalizer & Background Audio Active',
          targetDevice: 'Desktop',
          actionType: 'Custom Script',
          details: 'Playing within AstraCognix workspace audio deck',
          status: 'Completed',
          resultOutput: 'In-app audio playing smoothly.',
        },
      ];

      const musicPlan: VoiceCommandExecutionPlan = {
        id: `plan_${Date.now()}`,
        commandText: promptText,
        intentCategory: 'Desktop App',
        timestamp: 'Just now',
        language: selectedLanguage,
        confidenceScore: 99.6,
        status: 'Completed',
        contextUsed: ['Active Window: Astra Workspace', 'Audio Player Mode: Pure Song (No Video)'],
        steps: musicSteps,
      };

      setActiveExecutionPlan(musicPlan);
      setExecutionLogMessage(`Astra AI playing pure song audio "${selectedTrack.title}" in system player (No video player).`);
      return;
    }

    let category: VoiceCommandExecutionPlan['intentCategory'] = 'Multi-Step Workflow';
    let steps: ExecutionStep[] = [];

    if (isHindi) {
      if (promptLower.includes('pdf') || promptLower.includes('व्याख्या') || promptLower.includes('रिपोर्ट') || promptLower.includes('सारांश')) {
        category = 'OCR & Vision';
        steps = [
          { id: 's1', title: 'PDF फ़ाइल खोजें और पढ़ें', targetDevice: 'Desktop', actionType: 'File Operation', details: `डेस्कटॉप निर्देशिका में "${promptText}" खोजें`, status: 'Pending' },
          { id: 's2', title: 'जेमिनी विज़न ओसीआर (Vision OCR) स्कैन करें', targetDevice: 'Cloud AI Engine', actionType: 'Vision OCR', details: 'टेक्स्ट, टेबल और वित्तीय आंकड़े निकालें', status: 'Pending' },
          { id: 's3', title: 'मुख्य सारांश और बुलेट पॉइंट तैयार करें', targetDevice: 'Cloud AI Engine', actionType: 'Custom Script', details: '3-बुलेट पॉइंट ईमेल ड्राफ्ट तैयार करें', status: 'Pending' },
          { id: 's4', title: 'ईमेल या संदेश भेजें', targetDevice: 'Desktop', actionType: 'Send Email/SMS', details: 'ड्राफ्ट तैयार करके उपयोगकर्ता की पुष्टि का इंतजार करें', status: 'Pending', requiresUserConfirm: true },
        ];
      } else if (promptLower.includes('फ़ोन') || promptLower.includes('sms') || promptLower.includes('मैसेज') || promptLower.includes('कॉल') || promptLower.includes('व्हाट्सएप')) {
        category = 'Mobile Action';
        steps = [
          { id: 's1', title: 'Galaxy S24 Ultra से कनेक्ट करें', targetDevice: 'Mobile (Android)', actionType: 'Send Email/SMS', details: 'सुरक्षित एनक्रिप्टेड मोबाइल ब्रिज सिंक करें', status: 'Pending' },
          { id: 's2', title: 'मोबाइल वॉइस कमांड निष्पादित करें', targetDevice: 'Mobile (Android)', actionType: 'Send Email/SMS', details: `निष्पादन: ${promptText}`, status: 'Pending' },
        ];
      } else if (promptLower.includes('खोजें') || promptLower.includes('गूगल') || promptLower.includes('वेबसाइट') || promptLower.includes('search')) {
        category = 'Web Search';
        steps = [
          { id: 's1', title: 'वेब ब्राउज़र टैब खोलें', targetDevice: 'Web Browser', actionType: 'Launch App', details: 'क्रोम (Chrome) विंडो फ़ोकस करें', status: 'Pending' },
          { id: 's2', title: 'गूगल वेब सर्च निष्पादित करें', targetDevice: 'Web Browser', actionType: 'Web Search', details: `खोज क्वेरी: "${promptText}"`, status: 'Pending' },
        ];
      } else {
        category = 'Desktop App';
        steps = [
          { id: 's1', title: 'वॉइस कमांड का विश्लेषण करें', targetDevice: 'Desktop', actionType: 'Launch App', details: `इंटेंट विश्लेषण: "${promptText}"`, status: 'Pending' },
          { id: 's2', title: 'ऑटोमेशन स्क्रिप्ट निष्पादित करें', targetDevice: 'Desktop', actionType: 'Custom Script', details: 'OS UI ऑटोमेशन पेलोड भेजें', status: 'Pending' },
        ];
      }
    } else {
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
      } else {
        category = 'Desktop App';
        steps = [
          { id: 's1', title: 'Analyze System Command Intent', targetDevice: 'Desktop', actionType: 'Launch App', details: `Parse intent for "${promptText}"`, status: 'Pending' },
          { id: 's2', title: 'Execute Application Automation', targetDevice: 'Desktop', actionType: 'Custom Script', details: 'Dispatch OS UI Automation payload', status: 'Pending' },
        ];
      }
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
    setExecutionLogMessage(isHindi ? `अस्त्रा एआई वॉइस कमांड: "${promptText}". कार्यप्रणाली तैयार है।` : `Astra AI parsed voice command: "${promptText}". Execution plan ready.`);
  };

  const handleRunExecutionPlan = async () => {
    if (!activeExecutionPlan) return;

    const isHindi = selectedLanguage.includes('Hindi') || selectedLanguage.includes('hi') || /[\u0900-\u097F]/.test(activeExecutionPlan.commandText);

    setIsExecuting(true);
    setExecutionLogMessage(isHindi ? 'अस्त्रा एआई ऑटोमेशन प्रक्रिया चला रहा है...' : 'Astra AI running execution plan step-by-step...');

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
        resultOutput: isHindi ? `${updatedSteps[i].targetDevice} पर सफलतापूर्वक निष्पादित हुआ।` : `Executed successfully on ${updatedSteps[i].targetDevice}.`,
      };
      setActiveExecutionPlan((prev) => (prev ? { ...prev, steps: [...updatedSteps] } : null));
    }

    // Complete plan
    setActiveExecutionPlan((prev) => (prev ? { ...prev, status: 'Completed' } : null));
    setIsExecuting(false);
    setExecutionLogMessage(isHindi ? 'ऑटोमेशन प्रक्रिया सफलतापूर्वक पूरी हो गई!' : 'Execution plan completed successfully!');

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

    // Speak completion response in Hindi if Hindi language selected
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const speakText = isHindi
        ? `वॉइस कमांड ${activeExecutionPlan.commandText} के लिए कार्यप्रणाली सफलतापूर्वक पूरी हो गई है।`
        : `Execution plan completed for ${activeExecutionPlan.commandText}. All ${updatedSteps.length} steps executed successfully.`;
      const utterance = new SpeechSynthesisUtterance(speakText);
      utterance.lang = isHindi ? 'hi-IN' : 'en-US';
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

  const handleResetExecutionPlan = () => {
    if (!activeExecutionPlan) return;
    const resetSteps = activeExecutionPlan.steps.map((s) => ({
      ...s,
      status: 'Pending' as const,
      resultOutput: undefined,
    }));
    setActiveExecutionPlan({
      ...activeExecutionPlan,
      status: 'Awaiting Review',
      steps: resetSteps,
    });
    setExecutionLogMessage('Execution timeline reset to initial pending state.');
  };

  const presetCommands = [
    { text: 'play Believer by Imagine Dragons', category: 'Music & Audio', icon: Music },
    { text: 'play Kesariya song', category: 'Music & Audio', icon: Music },
    { text: 'play Shape of You by Ed Sheeran', category: 'Music & Audio', icon: Music },
    { text: 'play Lofi Chill Beats', category: 'Music & Audio', icon: Music },
    { text: 'play Blinding Lights by The Weeknd', category: 'Music & Audio', icon: Music },
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
                <option value="Hindi (हिन्दी - hi-IN)" className="bg-slate-900">Hindi (हिन्दी - India)</option>
                <option value="Spanish (ES)" className="bg-slate-900">Spanish (ES)</option>
                <option value="German (DE)" className="bg-slate-900">German (DE)</option>
                <option value="French (FR)" className="bg-slate-900">French (FR)</option>
                <option value="Japanese (JP)" className="bg-slate-900">Japanese (JP)</option>
                <option value="Mandarin (ZH)" className="bg-slate-900">Mandarin (ZH)</option>
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
                placeholder="Type a command or song request (e.g. 'play Believer' or 'Summarize Q2_Report.pdf')..."
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

          {/* 🎵 Music Command Format Banner & Quick Song Selector */}
          <div className="mt-5 max-w-2xl w-full p-4 rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-slate-900/80 border border-purple-500/30 text-left space-y-2.5 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-purple-400 animate-bounce" />
                <span className="text-xs font-extrabold text-white">Music Command Format:</span>
                <code className="text-[11px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-200 border border-purple-500/30 font-mono">
                  play &lt;song name&gt;
                </code>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                AUTOPLAYS WITHIN APP (NO YOUTUBE REDIRECT)
              </span>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">
              Give commands like <strong className="text-purple-300 font-mono">"play Believer by Imagine Dragons"</strong> or <strong className="text-purple-300 font-mono">"play a song"</strong>. The system will retrieve the track and play it <strong>directly inside this app</strong> via the embedded player without redirecting away to YouTube.
            </p>

            {/* Quick 1-Click Song Triggers */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-mono text-slate-400 mr-1">QUICK TEST:</span>
              {[
                'play Believer by Imagine Dragons',
                'play Kesariya song',
                'play Shape of You by Ed Sheeran',
                'play Lofi Chill Beats',
                'play Blinding Lights by The Weeknd',
              ].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => {
                    setVoicePromptText(cmd);
                    handleGenerateExecutionPlan(cmd);
                  }}
                  className="px-2.5 py-1 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 text-purple-200 border border-purple-500/30 text-[10px] font-mono font-bold transition-all flex items-center gap-1 shadow-sm hover:scale-105"
                >
                  <Disc className="w-3 h-3 text-purple-400 animate-spin-slow" />
                  <span>{cmd}</span>
                </button>
              ))}
            </div>
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
            <LiveExecutionTimeline
              plan={activeExecutionPlan}
              isExecuting={isExecuting}
              onRunPlan={handleRunExecutionPlan}
              onResetPlan={handleResetExecutionPlan}
              onAddStep={handleAddStepToPlan}
              onRemoveStep={handleRemoveStep}
            />
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
              {['All', 'Music & Audio', 'OCR & Vision', 'Desktop Apps', 'Mobile Phone', 'Web & Search', 'Files & Folders'].map((cat) => (
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

      {/* In-System Media & Song Player Widget */}
      <InAppMusicPlayer
        isOpen={isMusicPlayerOpen}
        onClose={() => setIsMusicPlayerOpen(false)}
        activeTrack={activeMusicTrack}
        onSelectTrack={(track) => {
          setActiveMusicTrack(track);
          setIsMusicPlayerOpen(true);
        }}
      />
    </div>
  );
};
