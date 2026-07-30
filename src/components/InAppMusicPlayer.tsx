import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, X, Music, Sparkles, Youtube, Disc, Radio, ExternalLink, Search } from 'lucide-react';

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  genre: string;
  coverGradient: string;
}

export const POPULAR_SONGS: SongTrack[] = [
  { id: '1', title: 'Believer', artist: 'Imagine Dragons', youtubeId: '7wtfhZwyrYY', genre: 'Rock / Alternative', coverGradient: 'from-amber-500 to-red-600' },
  { id: '2', title: 'Shape of You', artist: 'Ed Sheeran', youtubeId: 'JGwWNGJdvx8', genre: 'Pop', coverGradient: 'from-cyan-500 to-blue-600' },
  { id: '3', title: 'Blinding Lights', artist: 'The Weeknd', youtubeId: '4NRXx6U8ABQ', genre: 'Synthwave / Pop', coverGradient: 'from-purple-600 to-pink-600' },
  { id: '4', title: 'Kesariya', artist: 'Arijit Singh', youtubeId: 'BddP6PYo2gs', genre: 'Bollywood Romantic', coverGradient: 'from-orange-500 to-amber-600' },
  { id: '5', title: 'Lofi Chill Beats', artist: 'Lofi Girl', youtubeId: 'jfKfPfyJRdk', genre: 'Lofi / Ambient', coverGradient: 'from-indigo-600 to-purple-800' },
  { id: '6', title: 'Counting Stars', artist: 'OneRepublic', youtubeId: 'hT_nvWreI60', genre: 'Pop Rock', coverGradient: 'from-emerald-500 to-teal-700' },
  { id: '7', title: 'Faded', artist: 'Alan Walker', youtubeId: '60ItHLz5WEA', genre: 'EDM / Dance', coverGradient: 'from-blue-600 to-slate-800' },
  { id: '8', title: 'Starboy', artist: 'The Weeknd ft. Daft Punk', youtubeId: '34Na4j8AVgA', genre: 'R&B / Pop', coverGradient: 'from-red-600 to-black' },
  { id: '9', title: 'Pasoori', artist: 'Ali Sethi & Shae Gill', youtubeId: '5Eqb_-j3FDA', genre: 'Indie Fusion', coverGradient: 'from-rose-500 to-purple-700' },
  { id: '10', title: 'Night Changes', artist: 'One Direction', youtubeId: 'pj6k-EF8I2A', genre: 'Pop', coverGradient: 'from-cyan-600 to-indigo-800' },
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
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentTrack = activeTrack || POPULAR_SONGS[0];

  useEffect(() => {
    if (activeTrack) {
      setIsPlaying(true);
      setIsMinimized(false);
    }
  }, [activeTrack]);

  if (!isOpen) return null;

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Search or create custom track entry
    const found = POPULAR_SONGS.find(
      (s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (found) {
      onSelectTrack(found);
    } else {
      // Create dynamic track
      const customTrack: SongTrack = {
        id: `custom_${Date.now()}`,
        title: searchQuery.trim(),
        artist: 'Auto-Retrieved Song',
        youtubeId: '', // Uses YouTube search embed
        genre: 'System Audio Stream',
        coverGradient: 'from-purple-600 via-indigo-600 to-cyan-500',
      };
      onSelectTrack(customTrack);
    }
  };

  // Build embed URL without leaving the system
  const embedSrc = currentTrack.youtubeId
    ? `https://www.youtube-nocookie.com/embed/${currentTrack.youtubeId}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1`
    : `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(currentTrack.title + ' ' + currentTrack.artist)}&autoplay=1`;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isMinimized
          ? 'bottom-6 right-6 w-80 sm:w-96 rounded-2xl bg-slate-900/95 border border-purple-500/50 shadow-2xl p-3 backdrop-blur-xl'
          : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] max-w-xl rounded-3xl bg-slate-950/95 border border-purple-500/40 shadow-2xl p-5 backdrop-blur-2xl'
      }`}
    >
      {/* Minimized View Bar */}
      {isMinimized ? (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentTrack.coverGradient} flex items-center justify-center shrink-0 shadow-lg animate-spin-slow`}>
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
        /* Expanded Full Player */
        <div className="space-y-4">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <Music className="w-4 h-4 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-white tracking-tight">In-System Music Player</h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-mono font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    AUTOPLAY WITHIN APP
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Direct stream without leaving AstraCognix system. No external YouTube redirect.
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

          {/* Embedded Video/Audio Frame */}
          <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-800 aspect-video shadow-inner group">
            {isPlaying ? (
              <iframe
                src={embedSrc}
                title={currentTrack.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-400 space-y-2">
                <Disc className="w-12 h-12 text-purple-400 opacity-50" />
                <p className="text-xs font-mono">Playback Paused</p>
                <button
                  onClick={() => setIsPlaying(true)}
                  className="px-4 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Resume Playing</span>
                </button>
              </div>
            )}

            {/* Overlaid Badges */}
            <div className="absolute top-2 left-2 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
              <Youtube className="w-3 h-3 text-red-500" />
              <span>SYSTEM EMBEDDED STREAM</span>
            </div>
          </div>

          {/* Currently Playing Track Info & Visualizer */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${currentTrack.coverGradient} flex items-center justify-center shrink-0 shadow-md`}>
                <Disc className="w-6 h-6 text-white animate-spin-slow" />
              </div>
              <div className="text-xs">
                <div className="font-extrabold text-white flex items-center gap-2">
                  <span>{currentTrack.title}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                    {currentTrack.genre}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">{currentTrack.artist}</div>
              </div>
            </div>

            {/* Equalizer Waveform Animation */}
            {isPlaying && (
              <div className="flex items-end gap-1 h-6 px-3 py-1 rounded-xl bg-slate-950 border border-purple-500/30">
                <span className="w-1 bg-cyan-400 rounded-full animate-[bounce_0.8s_infinite]" style={{ height: '60%' }} />
                <span className="w-1 bg-purple-400 rounded-full animate-[bounce_1.1s_infinite]" style={{ height: '100%' }} />
                <span className="w-1 bg-pink-400 rounded-full animate-[bounce_0.7s_infinite]" style={{ height: '40%' }} />
                <span className="w-1 bg-amber-400 rounded-full animate-[bounce_0.9s_infinite]" style={{ height: '80%' }} />
              </div>
            )}
          </div>

          {/* Quick Search & Song Selectors */}
          <div className="space-y-2">
            <form onSubmit={handleCustomSearch} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type any song name (e.g. 'play Kesariya', 'play Believer')..."
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

            {/* Curated Song Badges */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
                <span>QUICK SONG PICKER (CLICK TO PLAY):</span>
                <span className="text-purple-400">10 Songs Ready</span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1 text-[10px] font-mono scrollbar-none">
                {POPULAR_SONGS.map((song) => (
                  <button
                    key={song.id}
                    onClick={() => onSelectTrack(song)}
                    className={`px-2.5 py-1 rounded-lg border transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                      currentTrack.id === song.id
                        ? 'bg-purple-600/30 text-purple-200 border-purple-500 font-bold'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <Play className="w-2.5 h-2.5 fill-current text-purple-400" />
                    <span>{song.title}</span>
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
