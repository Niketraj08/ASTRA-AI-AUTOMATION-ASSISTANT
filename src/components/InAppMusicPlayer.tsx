import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  X,
  Music,
  Disc,
  Search,
  SkipForward,
  SkipBack,
  Radio,
  Flame,
  Heart,
  Tv,
  Headphones,
  RadioTower,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  genre: string;
  language: 'Hindi' | 'Bhojpuri' | 'Punjabi' | 'English' | 'Global';
  coverGradient: string;
  album: string;
  durationSec: number;
  isLive?: boolean;
  searchQuery?: string;
  category?: 'Bhojpuri' | 'Old Hindi' | 'Modern Hindi' | 'Gaming Live' | 'Lofi Stream' | 'VDMA History' | 'Punjabi' | 'English' | 'Global';
}

export const POPULAR_HINDI_SONGS: SongTrack[] = [
  {
    id: 'h1',
    title: 'Kesariya',
    artist: 'Arijit Singh & Pritam',
    album: 'Brahmastra',
    youtubeId: 'BddP6PYo2gs',
    genre: 'Bollywood Romantic',
    language: 'Hindi',
    category: 'Modern Hindi',
    coverGradient: 'from-amber-500 via-orange-600 to-red-600',
    durationSec: 268,
  },
  {
    id: 'h2',
    title: 'Apna Bana Le',
    artist: 'Arijit Singh & Sachin-Jigar',
    album: 'Bhediya',
    youtubeId: 'u2NAuswnTKs',
    genre: 'Melodious Soul',
    language: 'Hindi',
    category: 'Modern Hindi',
    coverGradient: 'from-rose-500 via-pink-600 to-purple-800',
    durationSec: 261,
  },
  {
    id: 'h3',
    title: 'Tum Hi Ho',
    artist: 'Arijit Singh & Mithoon',
    album: 'Aashiqui 2',
    youtubeId: 'UN3uL3r6K0s',
    genre: 'Romantic Anthem',
    language: 'Hindi',
    category: 'Modern Hindi',
    coverGradient: 'from-blue-600 via-indigo-700 to-purple-900',
    durationSec: 262,
  },
  {
    id: 'h4',
    title: 'Chaleya',
    artist: 'Arijit Singh & Shilpa Rao',
    album: 'Jawan',
    youtubeId: 'VAdGW7QDJiU',
    genre: 'Bollywood Pop',
    language: 'Hindi',
    category: 'Modern Hindi',
    coverGradient: 'from-cyan-500 via-blue-600 to-slate-900',
    durationSec: 200,
  },
];

export const OLD_HINDI_SONGS: SongTrack[] = [
  {
    id: 'oh1',
    title: 'Kishore Kumar Golden Hits 90s & 80s',
    artist: 'Kishore Kumar',
    album: 'Evergreen Golden Melodies',
    youtubeId: 'UN3uL3r6K0s',
    genre: 'Old Classic Hindi',
    language: 'Hindi',
    category: 'Old Hindi',
    coverGradient: 'from-amber-600 via-yellow-600 to-amber-900',
    durationSec: 360,
  },
  {
    id: 'oh2',
    title: 'Lata Mangeshkar Top Classic Songs',
    artist: 'Lata Mangeshkar & R.D. Burman',
    album: 'Retro Bollywood Melodies',
    youtubeId: 'y1vC1tWdYf8',
    genre: 'Classic Soul',
    language: 'Hindi',
    category: 'Old Hindi',
    coverGradient: 'from-yellow-600 via-amber-700 to-red-900',
    durationSec: 320,
  },
  {
    id: 'oh3',
    title: '90s Evergreen Bollywood Romantics',
    artist: 'Kumar Sanu & Alka Yagnik',
    album: '90s Superhit Nostalgia',
    youtubeId: 'u2NAuswnTKs',
    genre: '90s Romantic',
    language: 'Hindi',
    category: 'Old Hindi',
    coverGradient: 'from-orange-500 via-rose-600 to-purple-900',
    durationSec: 300,
  },
];

export const BHOJPURI_SONGS: SongTrack[] = [
  {
    id: 'b1',
    title: 'Pawan Singh Superhit Bhojpuri Songs',
    artist: 'Pawan Singh',
    album: 'Bhojpuri Dhamaka Hits',
    youtubeId: 'EGqL-16_014',
    genre: 'Bhojpuri Folk & DJ Party',
    language: 'Bhojpuri',
    category: 'Bhojpuri',
    coverGradient: 'from-orange-600 via-red-600 to-amber-600',
    durationSec: 280,
  },
  {
    id: 'b2',
    title: 'Khesari Lal Yadav DJ Remix Hits',
    artist: 'Khesari Lal Yadav & Shilpi Raj',
    album: 'Bhojpuri Chartbusters',
    youtubeId: '5Eqb_-j3FDA',
    genre: 'Bhojpuri Dance Remix',
    language: 'Bhojpuri',
    category: 'Bhojpuri',
    coverGradient: 'from-red-600 via-amber-600 to-yellow-500',
    durationSec: 250,
  },
];

export const LIVE_STREAMS: SongTrack[] = [
  {
    id: 'live1',
    title: 'Jonathan Gaming Live - BGMI Gameplay',
    artist: 'Jonathan Gaming (Live)',
    album: 'BGMI eSports Live Stream',
    youtubeId: 'b9R4JkXw0jE',
    genre: 'Gaming Live Stream',
    language: 'Hindi',
    category: 'Gaming Live',
    coverGradient: 'from-amber-600 via-red-600 to-slate-900',
    durationSec: 7200,
    isLive: true,
  },
  {
    id: 'live2',
    title: 'Lofi Girl 24/7 Chill Beats Stream',
    artist: 'Lofi Girl Live Radio',
    album: '24/7 Lofi Study & Relax',
    youtubeId: 'jfKfPfyJRdk',
    genre: 'Ambient Lofi Stream',
    language: 'Global',
    category: 'Lofi Stream',
    coverGradient: 'from-indigo-600 via-purple-700 to-slate-900',
    durationSec: 10800,
    isLive: true,
  },
  {
    id: 'live3',
    title: 'VDMA History & Civilizations Stream',
    artist: 'VDMA History Channel',
    album: 'Archival Documentaries Stream',
    youtubeId: 'Kz1J6PkWs5s',
    genre: 'History & Education',
    language: 'Hindi',
    category: 'VDMA History',
    coverGradient: 'from-yellow-600 via-amber-800 to-slate-950',
    durationSec: 5400,
    isLive: true,
  },
];

export const PUNJABI_SONGS: SongTrack[] = [
  {
    id: 'p1',
    title: 'Lover & GOAT - Top Diljit Hits',
    artist: 'Diljit Dosanjh',
    album: 'MoonChild Era',
    youtubeId: '5Eqb_-j3FDA',
    genre: 'Punjabi Pop',
    language: 'Punjabi',
    category: 'Punjabi',
    coverGradient: 'from-rose-600 via-purple-700 to-slate-900',
    durationSec: 240,
  },
  {
    id: 'p2',
    title: 'Excuses & Brown Munde',
    artist: 'AP Dhillon & Gurinder Gill',
    album: 'Hidden Gems',
    youtubeId: 'EGqL-16_014',
    genre: 'Urban Punjabi',
    language: 'Punjabi',
    category: 'Punjabi',
    coverGradient: 'from-amber-500 via-rose-600 to-slate-900',
    durationSec: 210,
  },
];

export const GLOBAL_SONGS: SongTrack[] = [
  {
    id: 'g1',
    title: 'Believer',
    artist: 'Imagine Dragons',
    album: 'Evolve',
    youtubeId: '7wtfhZwyrYY',
    genre: 'Rock / Alternative',
    language: 'English',
    category: 'English',
    coverGradient: 'from-amber-500 to-red-600',
    durationSec: 204,
  },
  {
    id: 'g2',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    youtubeId: 'JGwWNGJdvx8',
    genre: 'Pop',
    language: 'English',
    category: 'English',
    coverGradient: 'from-cyan-500 to-blue-600',
    durationSec: 233,
  },
];

export const ALL_SONGS: SongTrack[] = [
  ...POPULAR_HINDI_SONGS,
  ...OLD_HINDI_SONGS,
  ...BHOJPURI_SONGS,
  ...LIVE_STREAMS,
  ...PUNJABI_SONGS,
  ...GLOBAL_SONGS,
];

interface InAppMusicPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTrack: SongTrack | null;
  onSelectTrack: (track: SongTrack) => void;
}

export const InAppMusicPlayer: React.FC<InAppMusicPlayerProps> = ({
  isOpen,
  onClose,
  activeTrack,
  onSelectTrack,
}) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showVideoDisplay, setShowVideoDisplay] = useState<boolean>(true); // Default to true so YouTube embed is always visible
  const [isCompactVideo, setIsCompactVideo] = useState<boolean>(true); // Smaller compact video frame
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSearchingYt, setIsSearchingYt] = useState<boolean>(false);
  const [userInteractedSound, setUserInteractedSound] = useState<boolean>(false);

  const currentTrack = activeTrack || POPULAR_HINDI_SONGS[0];

  // Derive valid YouTube ID
  const effectiveYtId = currentTrack.youtubeId || (
    currentTrack.category === 'Bhojpuri' || currentTrack.language === 'Bhojpuri'
      ? 'EGqL-16_014'
      : currentTrack.category === 'Old Hindi'
      ? 'UN3uL3r6K0s'
      : currentTrack.isLive
      ? 'jfKfPfyJRdk'
      : 'BddP6PYo2gs'
  );

  // Play audio chime via Web Audio API to ensure browser audio context is unlocked
  const playAudioChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      console.log('Audio Context chime:', e);
    }
  };

  useEffect(() => {
    if (activeTrack) {
      setIsPlaying(true);
      setIsMinimized(false);
      setCurrentTimeSec(0);
      playAudioChime();
    }
  }, [activeTrack]);

  // Simulated progress timer
  useEffect(() => {
    let timer: any;
    if (isPlaying && !currentTrack.isLive) {
      timer = setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= currentTrack.durationSec) return 0;
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentTrack.durationSec, currentTrack.isLive]);

  if (!isOpen) return null;

  const handleCustomSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearchingYt(true);
    const query = searchQuery.trim();

    try {
      const res = await fetch('/api/youtube/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.bestMatch) {
          onSelectTrack(data.bestMatch);
          setIsSearchingYt(false);
          setSearchQuery('');
          return;
        }
      }
    } catch (err) {
      console.warn('Backend YT search fallback:', err);
    }

    // Client-side fallback matcher
    const queryLower = query.toLowerCase();
    const found = ALL_SONGS.find(
      (s) =>
        s.title.toLowerCase().includes(queryLower) ||
        s.artist.toLowerCase().includes(queryLower) ||
        (s.category && s.category.toLowerCase().includes(queryLower))
    );

    if (found) {
      onSelectTrack(found);
    } else {
      const isBhojpuri = queryLower.includes('bhojpuri') || queryLower.includes('pawan') || queryLower.includes('khesari');
      const isOldHindi = queryLower.includes('old') || queryLower.includes('purane') || queryLower.includes('90s') || queryLower.includes('kishore');
      const isGamingLive = queryLower.includes('jonathan') || queryLower.includes('gaming') || queryLower.includes('bgmi');

      const customTrack: SongTrack = {
        id: `custom_${Date.now()}`,
        title: query,
        artist: isBhojpuri ? 'Pawan Singh & Khesari Lal' : isOldHindi ? 'Kishore Kumar 90s' : isGamingLive ? 'Jonathan Gaming' : 'YouTube Top Result',
        album: isGamingLive ? 'YouTube Live Stream' : 'Astra Music Search',
        youtubeId: isBhojpuri ? 'EGqL-16_014' : isOldHindi ? 'UN3uL3r6K0s' : isGamingLive ? 'b9R4JkXw0jE' : 'BddP6PYo2gs',
        genre: isGamingLive ? 'Live Gaming Stream' : isBhojpuri ? 'Bhojpuri Music' : isOldHindi ? 'Old Hindi Classic' : 'YouTube Stream',
        language: isBhojpuri ? 'Bhojpuri' : isOldHindi ? 'Hindi' : 'Global',
        coverGradient: isBhojpuri
          ? 'from-orange-600 via-red-600 to-amber-600'
          : isOldHindi
          ? 'from-amber-600 via-yellow-600 to-amber-900'
          : 'from-purple-600 via-indigo-600 to-cyan-500',
        durationSec: isGamingLive ? 3600 : 240,
        isLive: isGamingLive,
        searchQuery: query,
      };
      onSelectTrack(customTrack);
    }

    setIsSearchingYt(false);
    setSearchQuery('');
  };

  const filteredSongs =
    activeCategory === 'All'
      ? ALL_SONGS
      : ALL_SONGS.filter(
          (s) =>
            s.category === activeCategory ||
            s.language === activeCategory ||
            (activeCategory === 'Modern Hindi' && s.language === 'Hindi')
        );

  const handleNextTrack = () => {
    const currentIndex = ALL_SONGS.findIndex((s) => s.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % ALL_SONGS.length;
    onSelectTrack(ALL_SONGS[nextIndex]);
  };

  const handlePrevTrack = () => {
    const currentIndex = ALL_SONGS.findIndex((s) => s.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + ALL_SONGS.length) % ALL_SONGS.length;
    onSelectTrack(ALL_SONGS[prevIndex]);
  };

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainderSec = Math.floor(sec % 60);
    return `${mins}:${remainderSec < 10 ? '0' : ''}${remainderSec}`;
  };

  // Embed URL built for reliable, unblocked YouTube playback
  const embedUrl = `https://www.youtube.com/embed/${effectiveYtId}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1`;
  const directYoutubeUrl = `https://www.youtube.com/watch?v=${effectiveYtId}`;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isMinimized
          ? 'bottom-6 right-6 w-80 sm:w-96 rounded-2xl bg-slate-900/95 border border-purple-500/50 shadow-2xl p-3 backdrop-blur-xl'
          : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] max-w-md rounded-3xl bg-slate-950/95 border border-purple-500/40 shadow-2xl p-4 backdrop-blur-2xl'
      }`}
    >
      {/* Minimized View Bar */}
      {isMinimized ? (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentTrack.coverGradient} flex items-center justify-center shrink-0 shadow-lg ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
            >
              <Disc className="w-5 h-5 text-white" />
            </div>
            <div className="truncate text-xs">
              <div className="font-extrabold text-white truncate">{currentTrack.title}</div>
              <div className="text-[10px] text-purple-300 truncate">{currentTrack.artist}</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                setIsPlaying(!isPlaying);
                playAudioChime();
              }}
              className="p-2 rounded-xl bg-purple-600/30 text-purple-300 hover:bg-purple-600/50 transition-all"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button
              onClick={() => setIsMinimized(false)}
              className="px-2.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all flex items-center gap-1"
              title="Expand Player"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Expand</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400 transition-all"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Expanded Universal Media Player Interface */
        <div className="space-y-3">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <Music className="w-3.5 h-3.5 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-xs text-white tracking-tight">Voice Video Automation Player</h4>
                  {currentTrack.isLive && (
                    <span className="px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[9px] font-mono font-bold flex items-center gap-1 animate-pulse">
                      <RadioTower className="w-2.5 h-2.5" />
                      LIVE
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Toggle Video Display (Audio-Only / Show Video) */}
              <button
                onClick={() => setShowVideoDisplay(!showVideoDisplay)}
                className={`px-2 py-1 rounded-xl text-[10px] font-mono font-bold border transition-all flex items-center gap-1 ${
                  showVideoDisplay
                    ? 'bg-purple-600/30 text-purple-300 border-purple-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
                title={showVideoDisplay ? 'Hide Video (Audio Only Mode)' : 'Show Generated Video'}
              >
                <Tv className="w-3 h-3" />
                <span>{showVideoDisplay ? 'Hide Video' : 'Show Video'}</span>
              </button>

              {/* Minimize Player Button */}
              <button
                onClick={() => setIsMinimized(true)}
                className="px-2.5 py-1 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 text-[10px] font-mono font-bold transition-all flex items-center gap-1"
                title="Minimize to Floating Dock"
              >
                <Minimize2 className="w-3 h-3" />
                <span>Minimize</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-red-400 border border-slate-800 transition-all"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 📺 ACTIVE YOUTUBE MEDIA PLAYER WINDOW */}
          {showVideoDisplay ? (
            <div className="relative rounded-2xl p-2.5 bg-slate-900 border border-purple-500/40 shadow-2xl overflow-hidden space-y-2.5">
              <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden bg-black border border-slate-800 shadow-2xl group">
                {isPlaying ? (
                  <iframe
                    src={embedUrl}
                    title={currentTrack.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 space-y-2 bg-slate-950/80">
                    <Play className="w-10 h-10 text-purple-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-white">Playback Paused</span>
                    <button
                      onClick={() => {
                        setIsPlaying(true);
                        playAudioChime();
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition-all shadow-lg"
                    >
                      Resume Playback
                    </button>
                  </div>
                )}

                {/* Unmute / Tap to Enable Audio Floating Banner */}
                {!userInteractedSound && (
                  <div className="absolute top-2 left-2 right-2 z-20 bg-purple-950/90 border border-purple-400/50 p-2 rounded-xl backdrop-blur-md flex items-center justify-between shadow-xl">
                    <div className="flex items-center gap-2 text-[10px] text-purple-100 font-medium">
                      <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                      <span>Tap to enable audio stream!</span>
                    </div>
                    <button
                      onClick={() => {
                        setUserInteractedSound(true);
                        playAudioChime();
                      }}
                      className="px-2 py-0.5 rounded-lg bg-emerald-500 text-slate-950 font-extrabold text-[9px] hover:bg-emerald-400 transition-all shrink-0"
                    >
                      Enable Sound
                    </button>
                  </div>
                )}
              </div>

            {/* Song Meta & Controls Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <div className="w-full truncate">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono font-bold">
                    {currentTrack.category || currentTrack.language}
                  </span>
                  <span className="text-[10px] text-purple-300 font-medium">{currentTrack.genre}</span>
                </div>
                <h3 className="text-sm font-extrabold text-white line-clamp-1 mt-0.5">
                  {currentTrack.title}
                </h3>
                <p className="text-xs text-purple-200">
                  {currentTrack.artist}
                </p>
              </div>

              {/* Media Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handlePrevTrack}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
                  title="Previous Track"
                >
                  <SkipBack className="w-4 h-4 fill-current" />
                </button>

                <button
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                    playAudioChime();
                  }}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:scale-105 transition-all"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button
                  onClick={handleNextTrack}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
                  title="Next Track"
                >
                  <SkipForward className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>

            {/* Live Audio Visualizer Equalizer */}
            {isPlaying && (
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-purple-300">YouTube Audio Stream Active</span>
                </div>
                <div className="flex items-end gap-1 h-4">
                  <span className="w-1 bg-cyan-400 rounded-full animate-[bounce_0.8s_infinite]" style={{ height: '70%' }} />
                  <span className="w-1 bg-purple-400 rounded-full animate-[bounce_1.2s_infinite]" style={{ height: '100%' }} />
                  <span className="w-1 bg-pink-400 rounded-full animate-[bounce_0.6s_infinite]" style={{ height: '40%' }} />
                  <span className="w-1 bg-amber-400 rounded-full animate-[bounce_0.9s_infinite]" style={{ height: '90%' }} />
                  <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_1.1s_infinite]" style={{ height: '50%' }} />
                  <span className="w-1 bg-indigo-400 rounded-full animate-[bounce_0.7s_infinite]" style={{ height: '80%' }} />
                </div>
              </div>
            )}
          </div>
          ) : (
            /* Audio-Only Compact Card when Video is Hidden */
            <div className="relative rounded-2xl p-3 bg-slate-900 border border-purple-500/40 shadow-xl space-y-3">
              {/* Invisible iframe to maintain audio background playback */}
              {isPlaying && (
                <iframe
                  src={embedUrl}
                  title={currentTrack.title}
                  allow="autoplay"
                  className="hidden w-0 h-0"
                />
              )}
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentTrack.coverGradient} flex items-center justify-center shrink-0 shadow-lg ${
                    isPlaying ? 'animate-spin-slow' : ''
                  }`}
                >
                  <Disc className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 truncate">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold">
                    {currentTrack.category || currentTrack.language} (Audio Mode)
                  </span>
                  <h3 className="text-xs font-extrabold text-white truncate mt-0.5">{currentTrack.title}</h3>
                  <p className="text-[11px] text-purple-200 truncate">{currentTrack.artist}</p>
                </div>
                <button
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                    playAudioChime();
                  }}
                  className="p-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-500 transition-all shadow-md shrink-0"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
              </div>
            </div>
          )}

          {/* Search Query Input & Category Selector */}
          <div className="space-y-2.5">
            <form onSubmit={handleCustomSearch} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ANY YouTube song, Jonathan live, Old Hindi, Bhojpuri..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 pr-8"
                />
                <Search className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5" />
              </div>
              <button
                type="submit"
                disabled={isSearchingYt}
                className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all flex items-center gap-1 shrink-0 disabled:opacity-50 shadow-md"
              >
                {isSearchingYt ? <Sparkles className="w-3.5 h-3.5 animate-spin" /> : <span>Search & Play</span>}
              </button>
            </form>

            {/* Category Filter Tabs */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 overflow-x-auto pb-1">
                <span className="flex items-center gap-1 shrink-0 mr-2">
                  <Flame className="w-3 h-3 text-amber-400" />
                  CATEGORIES:
                </span>

                <div className="flex items-center gap-1 shrink-0 overflow-x-auto">
                  {[
                    'All',
                    'Bhojpuri',
                    'Old Hindi',
                    'Modern Hindi',
                    'Gaming Live',
                    'Lofi Stream',
                    'VDMA History',
                    'Punjabi',
                    'English',
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-2 py-0.5 rounded-lg border text-[10px] transition-all whitespace-nowrap ${
                        activeCategory === cat
                          ? 'bg-purple-600 text-white border-purple-400 font-bold'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable Song & Live Stream Chips */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 text-[10px] font-mono scrollbar-none">
                {filteredSongs.map((song) => (
                  <button
                    key={song.id}
                    onClick={() => {
                      onSelectTrack(song);
                      playAudioChime();
                    }}
                    className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                      currentTrack.id === song.id
                        ? 'bg-purple-600/30 text-purple-200 border-purple-500 font-bold ring-1 ring-purple-500/40'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {song.isLive ? (
                      <RadioTower className="w-3 h-3 text-red-400 animate-pulse" />
                    ) : (
                      <Play className="w-2.5 h-2.5 fill-current text-purple-400" />
                    )}
                    <span>{song.title}</span>
                    <span className="text-[9px] text-slate-500">({song.category || song.language})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
