import React, { useState, useRef } from 'react';
import { Mic, MicOff, Send, Volume2, Sparkles, Bot, PhoneCall, RefreshCw, CheckCircle, Zap } from 'lucide-react';
import { VoicePulseVisualizer } from './VoicePulseVisualizer';

export const InteractiveVoicePlayground: React.FC = () => {
  const [persona, setPersona] = useState<'Kore' | 'Zephyr' | 'Puck' | 'Fenrir'>('Kore');
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [transcriptHistory, setTranscriptHistory] = useState<{
    speaker: 'User' | 'Astra AI';
    text: string;
    timestamp: string;
    action?: string;
  }>([
    {
      speaker: 'Astra AI',
      text: "Hello! I'm Astra, your AI Automation Assistant. You can speak or type to me. Try asking: 'Schedule a call with Sarah tomorrow and update HubSpot' or 'Extract data from invoice #402'.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [audioLevel, setAudioLevel] = useState(0.5);
  const [isRecording, setIsRecording] = useState(false);
  const [executingAction, setExecutingAction] = useState<string | null>(null);

  const personaDetails = {
    Kore: { label: 'Kore', tone: 'Warm & Friendly Female', desc: 'Ideal for Customer Service & Qualification' },
    Zephyr: { label: 'Zephyr', tone: 'Executive Male', desc: 'Ideal for Enterprise Operations & CRM' },
    Puck: { label: 'Puck', tone: 'Energetic Tech Specialist', desc: 'Ideal for IT & Browser Automation' },
    Fenrir: { label: 'Fenrir', tone: 'Direct Command Lead', desc: 'Ideal for Executive Scheduling & Calls' },
  };

  const handleSendMessage = async (customMessage?: string) => {
    const textToSend = customMessage || inputText;
    if (!textToSend.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add User Message
    setTranscriptHistory((prev) => [
      ...prev,
      { speaker: 'User', text: textToSend, timestamp: time },
    ]);
    setInputText('');
    setStatus('thinking');
    setAudioLevel(0.8);

    try {
      // Call Express Gemini Chat API
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, persona }),
      });

      const data = await res.json();
      const aiReply = data.text || "I've processed your request and updated your workflows.";

      // Determine simulated automation action
      let actionTaken = 'Task Executed';
      if (textToSend.toLowerCase().includes('schedule') || textToSend.toLowerCase().includes('call')) {
        actionTaken = '📅 Appointment Scheduled in Calendar & Google Meet Link Generated';
      } else if (textToSend.toLowerCase().includes('crm') || textToSend.toLowerCase().includes('hubspot')) {
        actionTaken = '💼 CRM Record Synchronized in Salesforce/HubSpot';
      } else if (textToSend.toLowerCase().includes('invoice') || textToSend.toLowerCase().includes('pdf')) {
        actionTaken = '📄 Document Extracted & Emailed to Accounting';
      }

      setExecutingAction(actionTaken);
      setStatus('speaking');

      // Add AI Response
      setTranscriptHistory((prev) => [
        ...prev,
        {
          speaker: 'Astra AI',
          text: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: actionTaken,
        },
      ]);

      // Web Speech Synth for Browser Audio Playback
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(aiReply);
        utterance.rate = 1.05;
        utterance.pitch = persona === 'Kore' ? 1.2 : 0.9;
        utterance.onend = () => {
          setStatus('idle');
          setAudioLevel(0.2);
        };
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => {
          setStatus('idle');
          setAudioLevel(0.2);
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  const handleMicToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      setStatus('idle');
    } else {
      setIsRecording(true);
      setStatus('listening');

      // Native Speech Recognition API if available
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event: any) => {
          const spokenText = event.results[0][0].transcript;
          setIsRecording(false);
          handleSendMessage(spokenText);
        };

        recognition.onerror = () => {
          setIsRecording(false);
          setStatus('idle');
        };

        recognition.start();
      } else {
        // Simulated speech capture
        setTimeout(() => {
          setIsRecording(false);
          handleSendMessage("Schedule a demo call with John for tomorrow at 2 PM");
        }, 2500);
      }
    }
  };

  return (
    <section id="voice-playground" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <Mic className="w-3.5 h-3.5 text-cyan-400" />
            <span>INTERACTIVE REALTIME VOICE AI</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Test Astra's AI Voice Assistant <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Live Right Now</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base">
            Select a voice persona, hit the microphone or type a command, and watch Astra process voice intent, generate human speech, and trigger automations instantly.
          </p>
        </div>

        {/* Main Voice Playground Interface */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
          
          {/* Top Persona Selection Tabs */}
          <div className="mb-8">
            <label className="block font-mono text-xs text-slate-400 uppercase tracking-wider mb-3">
              Select Voice Persona
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(Object.keys(personaDetails) as Array<keyof typeof personaDetails>).map((key) => {
                const p = personaDetails[key];
                const active = persona === key;
                return (
                  <button
                    key={key}
                    onClick={() => setPersona(key)}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      active
                        ? 'bg-purple-950/60 border-purple-500/80 text-white ring-2 ring-purple-500/30 shadow-lg'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{p.label}</span>
                      <Volume2 className={`w-4 h-4 ${active ? 'text-purple-400' : 'text-slate-600'}`} />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{p.tone}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Voice Wave Visualizer Block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Visualizer Column */}
            <div className="md:col-span-5 bg-slate-950/80 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center">
              <VoicePulseVisualizer status={status} audioLevel={audioLevel} />
              
              {/* Quick Preset Command Chips */}
              <div className="mt-4 w-full">
                <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest text-center mb-2">
                  Try Sample Prompts
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleSendMessage("Schedule a discovery call with Acme Corp tomorrow at 3 PM")}
                    className="text-xs text-left p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 text-slate-300 hover:text-white transition-all truncate"
                  >
                    "Schedule a discovery call with Acme Corp..."
                  </button>
                  <button
                    onClick={() => handleSendMessage("Check inbound leads in Salesforce CRM and generate a summary")}
                    className="text-xs text-left p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 text-slate-300 hover:text-white transition-all truncate"
                  >
                    "Check inbound leads in Salesforce CRM..."
                  </button>
                  <button
                    onClick={() => handleSendMessage("Answer incoming support call regarding invoice #9012")}
                    className="text-xs text-left p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 text-slate-300 hover:text-white transition-all truncate"
                  >
                    "Answer incoming support call regarding invoice..."
                  </button>
                </div>
              </div>
            </div>

            {/* Transcript & Automation Action Stream Column */}
            <div className="md:col-span-7 bg-slate-950/80 rounded-2xl p-6 border border-slate-800 flex flex-col h-[400px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="font-mono text-xs text-slate-400 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-400" />
                  <span>LIVE TRANSCRIPT & AUTOMATION LOG</span>
                </span>
                <span className="text-[10px] font-mono text-cyan-400">PERSONA: {persona.toUpperCase()}</span>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {transcriptHistory.map((item, index) => (
                  <div
                    key={index}
                    className={`p-3.5 rounded-2xl text-xs space-y-1 ${
                      item.speaker === 'User'
                        ? 'bg-purple-950/40 border border-purple-800/40 text-purple-100 ml-6'
                        : 'bg-slate-900/90 border border-slate-800 text-slate-200 mr-6'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                      <span className="font-semibold text-cyan-300">{item.speaker}</span>
                      <span>{item.timestamp}</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed">{item.text}</p>
                    
                    {/* Execution Badge if Action was triggered */}
                    {item.action && (
                      <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{item.action}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Input Area */}
              <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                {/* Mic Button */}
                <button
                  onClick={handleMicToggle}
                  className={`p-3 rounded-xl border transition-all ${
                    isRecording
                      ? 'bg-red-600 text-white border-red-500 animate-pulse'
                      : 'bg-purple-600/20 text-purple-300 border-purple-500/40 hover:bg-purple-600/40'
                  }`}
                  title={isRecording ? 'Stop Recording' : 'Start Voice Recording'}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                {/* Text Field */}
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Speak or type a command for Astra AI..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
                />

                {/* Send Button */}
                <button
                  onClick={() => handleSendMessage()}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:scale-105 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
