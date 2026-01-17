import { useState } from "react";
import {
  Play,
  X,
  Film,
  Heart,
  Sparkles,
  Clock,
  ChevronRight,
  History,
  Camera,
  Share2,
  Check,
  Youtube, // Added for the new button
  ExternalLink // Added for the new button
} from "lucide-react";

/**
 * ======================================================================
 * DATA & TYPES (Kept the same)
 * ======================================================================
 */
type VideoCategory = "full" | "wedding" | "kid" | "barua";

export type Video = {
  id: string;
  title: string;
  desc: string;
  category: VideoCategory;
  date?: string;
  duration?: string;
};

const DATA = {
  wedding: [
    {
      id: "mENjog07xDM",
      title: "The Wedding — Part I",
      desc: "The morning preparations and the arrival of the wedding party.",
      date: "Tilak",
      duration: "55m",
      category: "wedding" as const,
    },
    {
      id: "QsrXPrTWlfM",
      title: "The Wedding — Part II",
      desc: "The sacred rituals, the exchange of vows, and the main ceremony.",
      date: "Baraat",
      duration: "59m",
      category: "wedding" as const,
    },
    {
      id: "MgsN7m2bErM",
      title: "The Wedding — Part III",
      desc: "The Bidaai and the first moments of a new beginning.",
      date: "Shaadi",
      duration: "44m",
      category: "wedding" as const,
    },
  ],
  kid: [
    {
      id: "xmtzqKT-Yto",
      title: "Barhao — Part I",
      desc: "Welcoming the first child home with traditional blessings.",
      date: "Katha - 1",
      duration: "1h",
      category: "barua" as const,
    },
    {
      id: "lZeKoUlL7LQ",
      title: "Barhao — Part II",
      desc: "Family celebrations and the naming ceremony.",
      date: "Katha - 2",
      duration: "40m",
      category: "kid" as const,
    },
  ],
  fullTape: {
    id: "h72wvLEPrYA",
    title: "The Complete Family Archive",
    desc: "A beautifully restored feature-length film merging all five original cassette parts into one seamless narrative.",
    date: "1999 - 2002",
    duration: "3h 36m",
    category: "full" as const,
  },
};

const ytEmbedUrl = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;

/**
 * ======================================================================
 * UI COMPONENTS
 * ======================================================================
 */

function VideoCard({ video, onPlay }: { video: Video; onPlay: (v: Video) => void }) {
  return (
    <div
      onClick={() => onPlay(video)}
      className="group cursor-pointer flex flex-col"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-stone-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(120,113,108,0.2)]">
        <img
          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/20 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:opacity-100">
            <Play className="ml-1 h-6 w-6 text-white" fill="currentColor" />
          </div>
        </div>
        <div className="absolute right-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-900/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-200 backdrop-blur-md border border-amber-500/20">
            <Clock className="h-3 w-3" /> {video.duration}
          </span>
        </div>
      </div>
      <div className="mt-5 px-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-600/60">{video.date}</span>
          <div className="h-px flex-1 bg-stone-200" />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-stone-800 group-hover:text-amber-900 transition-colors">{video.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-stone-500 line-clamp-2 font-medium italic">"{video.desc}"</p>
        <div className="mt-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400 group-hover:text-amber-700 transition-colors">
          <span>Play Archive</span>
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleShare = async (video: Video) => {
    const shareData = {
      title: video.title,
      text: `Watch this memory from our family archive: ${video.title}`,
      url: `https://www.youtube.com/watch?v=${video.id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-900 selection:bg-amber-100 font-sans">

      {/* SUCCESS TOAST */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] transition-all duration-500 transform ${showToast ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"}`}>
        <div className="bg-stone-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-stone-700">
          <Check className="h-4 w-4 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-widest">Link copied to clipboard</span>
        </div>
      </div>

      {/* HEADER & MAIN SECTIONS (Same as your code) */}
      <header className="sticky top-0 z-50 border-b border-stone-200/40 bg-white/60 backdrop-blur-2xl">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-12">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-amber-500 to-stone-400 opacity-20 blur group-hover:opacity-40 transition" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-stone-900 text-amber-200 shadow-xl">
                <Camera className="h-6 w-6" />
              </div>
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-[0.3em] text-stone-900">The Digital Archive</h1>
              <p className="text-[10px] text-stone-400 font-bold tracking-widest uppercase mt-0.5">Established 2026 •</p>
            </div>
          </div>
          <button className="hidden sm:flex items-center rounded-full bg-stone-900 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-stone-800 transition-all shadow-lg">
            <Heart className="mr-2 h-3.5 w-3.5 text-amber-400" fill="currentColor" />
            Memories
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pb-32 pt-20">
        <section className="mb-32">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-stone-200 bg-white/50 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-600 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-amber-500" /> Restoration Project v2.0
            </div>
            <h2 className="font-serif text-6xl font-light tracking-tight text-stone-900 sm:text-8xl leading-[1.1]">
              Restoring the <br />
              <span className="italic font-serif text-stone-400">forgotten</span>
            </h2>
          </div>
        </section>

        {/* WEDDING */}
        <section className="mb-32">
          <div className="mb-12 flex items-center gap-6">
            <div className="h-12 w-12 rounded-full border border-stone-200 flex items-center justify-center bg-white shadow-sm text-amber-600">
              <History className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-3xl font-bold tracking-tight text-stone-900">The Wedding Casettes</h3>
              <p className="text-sm text-stone-400 font-bold uppercase tracking-widest mt-1">23 June 1999 • Katni Satna</p>
            </div>
          </div>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {DATA.wedding.map((v, idx) => (
              <VideoCard key={idx} video={v} onPlay={setActiveVideo} />
            ))}
          </div>
        </section>

        {/* KID RITUALS */}
        <section className="mb-32">
          <div className="mb-12 flex items-center gap-6">
            <div className="h-12 w-12 rounded-full border border-stone-200 flex items-center justify-center bg-white shadow-sm text-rose-400">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-3xl font-bold tracking-tight text-stone-900">Barhao Rituals</h3>
              <p className="text-sm text-stone-400 font-bold uppercase tracking-widest mt-1">20 April 2002 • Madhavgarh</p>
            </div>
          </div>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {DATA.kid.map((v, idx) => (
              <VideoCard key={idx} video={v} onPlay={setActiveVideo} />
            ))}
          </div>
        </section>

        {/* FULL CASSETTE SECTION (Kept the same) */}
        <section>
          <div className="group relative overflow-hidden rounded-[3rem] bg-[#1a1918] p-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] md:p-20">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="relative z-10 flex flex-col items-center gap-16 lg:flex-row">
              <div className="flex-1">
                <div className="mb-8 inline-flex items-center gap-3 text-amber-500 font-black text-[10px] uppercase tracking-[0.4em]">
                  <Film className="h-4 w-4" /> Feature Presentation
                </div>
                <h3 className="text-4xl font-bold text-white sm:text-6xl tracking-tight leading-tight">
                  The Complete <br /> Merged Archive
                </h3>
                <div className="mt-12 flex flex-wrap items-center gap-8">
                  <button
                    onClick={() => setActiveVideo(DATA.fullTape as Video)}
                    className="flex items-center gap-4 rounded-full bg-amber-500 px-10 py-5 text-xs font-black uppercase tracking-widest text-stone-950 transition-all hover:scale-105 shadow-xl"
                  >
                    <Play fill="currentColor" className="h-4 w-4" /> Watch 3.5 Hour Movie
                  </button>
                </div>
              </div>
              <div className="w-full shrink-0 lg:w-[500px]">
                <div
                  onClick={() => setActiveVideo(DATA.fullTape as Video)}
                  className="group/thumb relative aspect-video cursor-pointer overflow-hidden rounded-[2rem] shadow-2xl"
                >
                  <img
                    src={`https://img.youtube.com/vi/${DATA.fullTape.id}/hqdefault.jpg`}
                    className="h-full w-full object-cover opacity-50 transition duration-1000 group-hover/thumb:scale-110"
                    alt="Full Movie"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-500 text-stone-950">
                      <Play fill="currentColor" className="h-8 w-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* UPDATED PLAYER MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-stone-950/95 backdrop-blur-3xl p-4 md:p-12 transition-all">
          <div className="mx-auto w-full max-w-6xl flex-1 flex flex-col">

            {/* Header: Now only contains Title and Close button */}
            <div className="flex items-center justify-between pb-8 text-white">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-2 block">Now Playing</span>
                <h4 className="text-2xl font-bold tracking-tight">{activeVideo.title}</h4>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveVideo(null)}
                  className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/10 text-white hover:rotate-90 transition-all duration-300"
                >
                  <X className="h-6 w-6 md:h-7 md:w-7" />
                </button>
              </div>
            </div>

            {/* Video Frame */}
            <div className="relative flex-1 overflow-hidden rounded-[2rem] bg-black shadow-2xl border border-white/5">
              <iframe
                src={ytEmbedUrl(activeVideo.id)}
                title={activeVideo.title}
                className="h-full w-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>

            {/* Footer: Contains Description, Meta, and Action Buttons */}
            <div className="pt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-stone-400">

              {/* Left Side: Desc & Meta */}
              <div className="max-w-2xl">
                <p className="text-sm font-medium italic mb-3">"{activeVideo.desc}"</p>
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-stone-500">
                  <span>{activeVideo.date}</span>
                  <div className="h-1 w-1 rounded-full bg-stone-700" />
                  <span>{activeVideo.duration}</span>
                </div>
              </div>

              {/* Right Side: New Button Actions */}
              <div className="flex items-center gap-3">
                {/* Watch on YouTube Button */}
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 md:flex-none h-14 items-center justify-center gap-3 rounded-2xl bg-white/5 px-6 text-white hover:bg-white/10 transition-all border border-white/10 active:scale-95"
                >
                  <Youtube className="h-5 w-5 text-red-500" />
                  <span className="text-[11px] font-black uppercase tracking-widest">YouTube</span>
                  <ExternalLink className="h-3 w-3 opacity-50" />
                </a>

                {/* Share Button (Moved here) */}
                <button
                  onClick={() => handleShare(activeVideo)}
                  className="flex flex-1 md:flex-none h-14 items-center justify-center gap-3 rounded-2xl bg-amber-500 px-8 text-stone-950 hover:bg-amber-400 transition-all active:scale-95 shadow-lg shadow-amber-900/20"
                >
                  <Share2 className="h-5 w-5" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Share</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}