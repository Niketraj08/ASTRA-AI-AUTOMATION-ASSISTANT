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
  Sparkles,
  Disc,
  Search,
  SkipForward,
  SkipBack,
  Radio,
  Sliders,
  Flame,
  Heart
} from 'lucide-react';

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  genre: string;
  language: 'Hindi' | 'English' | 'Global';
  coverGradient: string;
  album: string;
  durationSec: number;
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
    coverGradient: 'from-blue-600 via-indigo-700 to-purple-900',
    durationSec: 262,
  },
  {
    id: 'h4',
    title: 'Chaleya',
    artist: 'Arijit Singh & Shilpa Rao',
    album: 'Jawan',
    youtubeId: 'VAdGW7QDJiU',
    genre: 'Bollywood Pop / Dance',
    language: 'Hindi',
    coverGradient: 'from-cyan-500 via-blue-600 to-slate-900',
    durationSec: 200,
  },
  {
    id: 'h5',
    title: 'Raataan Lambiyan',
    artist: 'Jubin Nautiyal & Asees Kaur',
    album: 'Shershaah',
    youtubeId: 'gvyUuxdRdR4',
    genre: 'Romantic Melodic',
    language: 'Hindi',
    coverGradient: 'from-emerald-500 via-teal-700 to-slate-900',
    durationSec: 230,
  },
  {
    id: 'h6',
    title: 'Tere Vaaste',
    artist: 'Varun Jain & Sachin-Jigar',
    album: 'Zara Hatke Zara Bachke',
    youtubeId: 'EGqL-16_014',
    genre: 'Upbeat Folk Pop',
    language: 'Hindi',
    coverGradient: 'from-yellow-500 via-amber-600 to-red-700',
    durationSec: 189,
  },
  {
    id: 'h7',
    title: 'Heeriye',
    artist: 'Jasleen Royal & Arijit Singh',
    album: 'Heeriye Single',
    youtubeId: 'RLzC55ai0eo',
    genre: 'Indie Pop',
    language: 'Hindi',
    coverGradient: 'from-pink-500 via-rose-600 to-purple-800',
    durationSec: 194,
  },
  {
    id: 'h8',
    title: 'Pasoori',
    artist: 'Ali Sethi & Shae Gill',
    album: 'Coke Studio 14',
    youtubeId: '5Eqb_-j3FDA',
    genre: 'Folk Fusion',
    language: 'Hindi',
    coverGradient: 'from-orange-600 via-red-600 to-purple-900',
    durationSec: 224,
  },
];

export const POPULAR_GLOBAL_SONGS: SongTrack[] = [
  {
    id: 'g1',
    title: 'Believer',
    artist: 'Imagine Dragons',
    album: 'Evolve',
    youtubeId: '7wtfhZwyrYY',
    genre: 'Rock / Alternative',
    language: 'English',
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
    coverGradient: 'from-cyan-500 to-blue-600',
    durationSec: 233,
  },
  {
    id: 'g3',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    youtubeId: '4NRXx6U8ABQ',
    genre: 'Synthwave / Pop',
    language: 'English',
    coverGradient: 'from-purple-600 to-pink-600',
    durationSec: 200,
  },
  {
    id: 'g4',
    title: 'Lofi Chill Beats',
    artist: 'Lofi Girl Ambient',
    album: 'Lofi Records',
    youtubeId: 'jfKfPfyJRdk',
    genre: 'Lofi Ambient',
    language: 'Global',
    coverGradient: 'from-indigo-600 to-purple-800',
    durationSec: 360,
  },
];

export const ALL_SONGS: SongTrack[] = [...POPULAR_HINDI_SONGS, ...POPULAR_GLOBAL_SONGS];

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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<'Hindi' | 'All' | 'Global'>('Hindi');
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(18);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const currentTrack = activeTrack || POPULAR_HINDI_SONGS[0];

  // Simulated progress scrubber increment
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= currentTrack.durationSec) return 0;
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentTrack.durationSec]);

  useEffect(() => {
    if (activeTrack) {
      setIsPlaying(true);
      setIsMinimized(false);
      setCurrentTimeSec(0);
    }
  }, [activeTrack]);

  if (!isOpen) return null;

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase().trim();
    const found = ALL_SONGS.find(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.artist.toLowerCase().includes(query) ||
        s.album.toLowerCase().includes(query)
    );

    if (found) {
      onSelectTrack(found);
    } else {
      // Dynamic Hindi/Global song track
      const isHindiQuery = /kesariya|tum hi ho|gaana|hindi|arijit|dil|pyar|suno|song|bhediya/i.test(query);
      const customTrack: SongTrack = {
        id: `custom_${Date.now()}`,
        title: searchQuery.trim(),
        artist: isHindiQuery ? 'Top Hindi Artist' : 'Retrieved Audio Track',
        album: 'Astra AI Audio Stream',
        youtubeId: '', // YouTube search query stream
        genre: isHindiQuery ? 'Bollywood Soul' : 'System Audio Stream',
        language: isHindiQuery ? 'Hindi' : 'Global',
        coverGradient: isHindiQuery
          ? 'from-amber-600 via-rose-600 to-purple-900'
          : 'from-purple-600 via-indigo-600 to-cyan-500',
        durationSec: 240,
      };
      onSelectTrack(customTrack);
    }
    setSearchQuery('');
  };

  const filteredSongs =
    activeCategory === 'All'
      ? ALL_SONGS
      : ALL_SONGS.filter((s) => s.language === activeCategory || (activeCategory === 'Hindi' && s.language === 'Hindi'));

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

  // Build audio embed URL without rendering a video player frame on screen
  const audioEmbedSrc = currentTrack.youtubeId
    ? `https://www.youtube-nocookie.com/embed/${currentTrack.youtubeId}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1&controls=0`
    : `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(currentTrack.title + ' ' + currentTrack.artist + ' audio')}&autoplay=1&controls=0`;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isMinimized
          ? 'bottom-6 right-6 w-80 sm:w-96 rounded-2xl bg-slate-900/95 border border-purple-500/50 shadow-2xl p-3 backdrop-blur-xl'
          : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] max-w-lg rounded-3xl bg-slate-950/95 border border-purple-500/40 shadow-2xl p-5 backdrop-blur-2xl'
      }`}
    >
      {/* 🛑 HIDDEN OFF-SCREEN AUDIO STREAM IFRAME (NO VIDEO DISPLAYED) */}
      <div className="w-0 h-0 overflow-hidden pointer-events-none opacity-0 absolute -top-9999px left-0">
        {isPlaying && (
          <iframe
            src={audioEmbedSrc}
            title={currentTrack.title}
            allow="autoplay"
            className="w-1 h-1 border-0"
          />
        )}
      </div>

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
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl bg-purple-600/30 text-purple-300 hover:bg-purple-600/50 transition-all"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button
              onClick={() => setIsMinimized(false)}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-all"
              title="Expand Player"
            >
              <Maximize2 className="w-3.5 h-3.5" />
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
        /* Expanded Pure Audio Deck Interface */
        <div className="space-y-4">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <Music className="w-4 h-4 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-white tracking-tight">System Audio Player</h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-mono font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    PURE AUDIO MODE (NO VIDEO)
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Plays pure song audio in background. No video window rendered.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-all"
                title="Minimize Player"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-red-400 border border-slate-800 transition-all"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 🎨 PURE AUDIO PLAYER DECK (ALBUM ART & VINYL DISC - NO VIDEO) */}
          <div className="relative rounded-2xl p-5 bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950/60 border border-purple-500/30 shadow-2xl overflow-hidden group">
            {/* Ambient Background Glow */}
            <div
              className={`absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br ${currentTrack.coverGradient} rounded-full filter blur-3xl opacity-20 pointer-events-none`}
            />

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5">
              {/* Spinning Vinyl Cover Art */}
              <div className="relative shrink-0">
                <div
                  className={`w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br ${currentTrack.coverGradient} p-1 shadow-2xl flex items-center justify-center relative overflow-hidden`}
                >
                  {/* Vinyl Disc Grooves pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/80 rounded-2xl" />

                  {/* Spinning Disc Center */}
                  <div
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-slate-900/80 bg-slate-950 flex items-center justify-center relative shadow-inner ${
                      isPlaying ? 'animate-spin-slow' : ''
                    }`}
                  >
                    <Disc className="w-10 h-10 text-purple-400/80" />
                    <div className="w-3 h-3 rounded-full bg-purple-500 border-2 border-white absolute" />
                  </div>
                </div>

                {/* Live Playing Tag */}
                {isPlaying && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-purple-600 text-white text-[9px] font-mono font-bold shadow-lg flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
                    PLAYING
                  </span>
                )}
              </div>

              {/* Track Details & Audio Controls */}
              <div className="flex-1 w-full space-y-3 text-center sm:text-left">
                <div>
                  <div className="flex items-center justify-center sm:justify-between gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono font-bold">
                      {currentTrack.language === 'Hindi' ? '🇮🇳 Hindi Song' : '🎵 Global Track'}
                    </span>
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`text-xs transition-all ${isLiked ? 'text-rose-500 scale-110' : 'text-slate-500 hover:text-white'}`}
                      title="Favorite"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <h3 className="text-base font-extrabold text-white mt-1 line-clamp-1">
                    {currentTrack.title}
                  </h3>
                  <p className="text-xs text-purple-300 font-medium">
                    {currentTrack.artist}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Album: {currentTrack.album} • {currentTrack.genre}
                  </p>
                </div>

                {/* Progress Bar / Timeline Scrubber */}
                <div className="space-y-1">
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden relative cursor-pointer">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 rounded-full"
                      style={{
                        width: `${Math.min(100, (currentTimeSec / currentTrack.durationSec) * 100)}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>{formatTime(currentTimeSec)}</span>
                    <span>{formatTime(currentTrack.durationSec)}</span>
                  </div>
                </div>

                {/* Audio Control Buttons */}
                <div className="flex items-center justify-center sm:justify-start gap-4">
                  <button
                    onClick={handlePrevTrack}
                    className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 transition-all"
                    title="Previous Song"
                  >
                    <SkipBack className="w-4 h-4 fill-current" />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 hover:scale-105 transition-all"
                    title={isPlaying ? 'Pause Audio' : 'Play Audio'}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 fill-current" />
                    )}
                  </button>

                  <button
                    onClick={handleNextTrack}
                    className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 transition-all"
                    title="Next Song"
                  >
                    <SkipForward className="w-4 h-4 fill-current" />
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-all ml-auto"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Equalizer Waveform Visualization */}
            {isPlaying && (
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-purple-300">Live Audio Visualizer</span>
                </div>
                <div className="flex items-end gap-1 h-5">
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

          {/* Quick Search & Song Pickers */}
          <div className="space-y-2.5">
            <form onSubmit={handleCustomSearch} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search any song name (e.g., 'play Kesariya', 'play Apna Bana Le')..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 pr-8"
                />
                <Search className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5" />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all flex items-center gap-1 shrink-0"
              >
                <span>Play Song</span>
              </button>
            </form>

            {/* Song Selection Categories */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" />
                  TOP RECOMMENDED SONGS:
                </span>

                <div className="flex items-center gap-1">
                  {(['Hindi', 'All', 'Global'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-2 py-0.5 rounded-lg border transition-all ${
                        activeCategory === cat
                          ? 'bg-purple-600 text-white border-purple-400 font-bold'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {cat === 'Hindi' ? '🇮🇳 Hindi Hits' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable Song Chips */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 text-[10px] font-mono scrollbar-none">
                {filteredSongs.map((song) => (
                  <button
                    key={song.id}
                    onClick={() => onSelectTrack(song)}
                    className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                      currentTrack.id === song.id
                        ? 'bg-purple-600/30 text-purple-200 border-purple-500 font-bold ring-1 ring-purple-500/40'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <Play className="w-2.5 h-2.5 fill-current text-purple-400" />
                    <span>{song.title}</span>
                    <span className="text-[9px] text-slate-500">({song.artist.split('&')[0].trim()})</span>
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
