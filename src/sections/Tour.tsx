import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { lockScroll } from '../lib/smooth';
import { tour } from '../assets';


export const CHAPTERS: { id: string; at: number; title: string; blurb: string }[] = [
  { id: 'chat', at: 4.3, title: 'Team chat', blurb: 'Groups, topics and tasks — right inside the conversation.' },
  { id: 'workspaces', at: 9.6, title: 'Workspaces', blurb: 'One account, isolated workspaces with their own people and data.' },
  { id: 'planner', at: 16.1, title: 'Planner & tasks', blurb: 'A kanban board born from your chats.' },
  { id: 'whiteboard', at: 23.8, title: 'Whiteboards', blurb: 'Sketch together in real time — shapes, pen, text.' },
  { id: 'pages', at: 35.4, title: 'Pages & notes', blurb: 'Notion-style pages with boards, tables and habit trackers.' },
  { id: 'communities', at: 51.5, title: 'Communities', blurb: 'Public or private spaces with posts, channels and roles.' },
  { id: 'org', at: 60.5, title: 'Org chart', blurb: 'Reporting lines built from who actually works with whom.' },
  { id: 'inbox', at: 69.9, title: 'All inside your app', blurb: 'Everything you just saw is one SDK, mounted in your product.' },
];
const END = 75.9;

export function Tour() {
  const [open, setOpen] = React.useState(false);
  const [t, setT] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const vid = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const on = () => setOpen(true);
    window.addEventListener('open-tour', on);
    return () => window.removeEventListener('open-tour', on);
  }, []);
  React.useEffect(() => {
    lockScroll(open);
    if (!open) return undefined;
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', key);
    return () => { window.removeEventListener('keydown', key); lockScroll(false); };
  }, [open]);

  const idx = Math.max(0, CHAPTERS.reduce((acc, c, i) => (t >= c.at ? i : acc), 0));
  const ch = CHAPTERS[idx];
  const seek = (s: number) => { const v = vid.current; if (v) { v.currentTime = s + 0.2; void v.play(); setPlaying(true); } };
  const toggle = () => { const v = vid.current; if (!v) return; if (v.paused) { void v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); } };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div role="dialog" aria-modal="true" aria-label="Product tour" className="fixed inset-0 z-[100] flex flex-col bg-night/95 text-white backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <div className="text-[13px] font-medium tracking-wide text-white/60">Product tour · the Professional edition</div>
            <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-lg transition hover:bg-white/20" aria-label="Close">×</button>
          </div>
          <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center gap-5 px-4 pb-6 sm:px-8">
            <motion.div initial={{ scale: 0.9, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 18 }} className="relative overflow-hidden rounded-2xl border border-white/10 bg-night-2 shadow-[0_40px_120px_-30px_rgba(91,91,240,.6)]">
              <div className="relative aspect-[16/10] max-h-[62vh] w-full cursor-pointer bg-white" onClick={toggle}>
                <video ref={vid} className="h-full w-full object-cover" autoPlay muted playsInline loop poster={tour.poster} onTimeUpdate={(e) => setT(e.currentTarget.currentTime)} onEnded={() => setPlaying(false)}>
                  <source src={tour.webm} type="video/webm" /><source src={tour.mp4} type="video/mp4" />
                </video>
                {!playing ? <div className="absolute inset-0 grid place-items-center bg-black/25"><span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-ink"><svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span></div> : null}
              </div>
              <div className="h-1 bg-white/10"><i className="block h-full bg-gradient-to-r from-iris to-aqua transition-[width] duration-200" style={{ width: `${Math.min(100, (t / END) * 100)}%` }} /></div>
            </motion.div>
            <div className="text-center">
              <AnimatePresence mode="wait"><motion.div key={ch.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <h3 className="text-xl font-semibold">{ch.title}</h3><p className="mt-1 text-[14px] text-white/60">{ch.blurb}</p>
              </motion.div></AnimatePresence>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {CHAPTERS.map((c, i) => (
                <button key={c.id} onClick={() => seek(c.at)} className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition ${i === idx ? 'border-iris bg-iris/25 text-white' : 'border-white/10 text-white/55 hover:border-white/30 hover:text-white'}`}>{c.title}</button>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
