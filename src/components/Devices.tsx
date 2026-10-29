import * as React from 'react';
import { Shot, Clip, type ClipSrc } from './Media';

type Media = { image?: string; video?: ClipSrc };

/** A phone: titanium frame, dynamic island, the captured app inside. Aspect ≈ 9 : 19.2. */
export const Phone = React.forwardRef<HTMLDivElement, { media: Media; className?: string; glow?: boolean }>(function Phone({ media, className = '', glow }, ref) {
  return (
    <div ref={ref} className={`relative aspect-[9/19.2] w-full ${className}`}>
      {glow ? <div className="absolute -inset-10 -z-10 rounded-[80px] bg-iris/25 blur-3xl" /> : null}
      <div className="absolute inset-0 rounded-[13%/6%] bg-gradient-to-b from-[#2b2e3f] via-[#12141f] to-[#2a2d3c] p-[2.6%] shadow-[0_30px_80px_-20px_rgba(30,30,90,.55),inset_0_0_0_1.5px_rgba(255,255,255,.14)]">
        <div className="relative h-full w-full overflow-hidden rounded-[11%/5.2%] bg-white ring-1 ring-black/50">
          {media.video ? <Clip {...media.video} className="h-full w-full object-cover" /> : <Shot src={media.image || ''} className="h-full w-full origin-top-left animate-push object-cover object-top motion-reduce:animate-none" />}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[.07] to-white/0" />
        </div>
      </div>
      <i className="absolute -left-[1.2%] top-[18%] h-[5%] w-[1.2%] rounded-l bg-[#1b1d2a]" />
      <i className="absolute -left-[1.2%] top-[26%] h-[9%] w-[1.2%] rounded-l bg-[#1b1d2a]" />
      <i className="absolute -right-[1.2%] top-[24%] h-[13%] w-[1.2%] rounded-r bg-[#1b1d2a]" />
    </div>
  );
});

/** A laptop: slim bezel + hinge base. Screen is 16 : 10. */
export const Laptop = React.forwardRef<HTMLDivElement, { media: Media; className?: string; glow?: boolean }>(function Laptop({ media, className = '', glow }, ref) {
  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      {glow ? <div className="absolute -inset-8 -z-10 rounded-[60px] bg-violet/20 blur-3xl" /> : null}
      <div className="rounded-[2.2%/3.4%] bg-gradient-to-b from-[#2a2d3b] to-[#151724] p-[1.3%] shadow-[0_40px_90px_-30px_rgba(30,30,90,.6),inset_0_0_0_1.5px_rgba(255,255,255,.12)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.4%/2.2%] bg-white ring-1 ring-black/60">
          {media.video ? <Clip {...media.video} className="h-full w-full object-cover" /> : <Shot src={media.image || ''} className="h-full w-full origin-top-left animate-push object-cover object-top motion-reduce:animate-none" />}
          <div className="pointer-events-none absolute left-1/2 top-0 h-[1.6%] w-[8%] -translate-x-1/2 rounded-b-lg bg-black" />
        </div>
      </div>
      <div className="relative mx-auto -mt-px h-[2.4%] min-h-[10px] w-[112%] -translate-x-[5.3%] rounded-b-[40%/100%] bg-gradient-to-b from-[#c9ccd9] to-[#9ea2b4] shadow-[0_20px_40px_-18px_rgba(0,0,0,.5)]">
        <div className="absolute left-1/2 top-0 h-[40%] w-[14%] -translate-x-1/2 rounded-b-xl bg-[#8d91a5]" />
      </div>
    </div>
  );
});

/** A browser window (for the admin console): traffic lights + address pill. */
export const Browser = React.forwardRef<HTMLDivElement, { media: Media; url?: string; className?: string; dark?: boolean }>(function Browser({ media, url = 'admin.yourapp.com', className = '', dark }, ref) {
  return (
    <div ref={ref} className={`overflow-hidden rounded-2xl border ${dark ? 'border-white/10 bg-night-2' : 'border-ink/10 bg-white'} shadow-[0_40px_100px_-30px_rgba(20,20,70,.55)] ${className}`}>
      <div className={`flex items-center gap-3 px-4 py-2.5 ${dark ? 'bg-night-3' : 'bg-paper-2'}`}>
        <span className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span>
        <span className={`mx-auto flex h-6 w-[46%] items-center justify-center rounded-md text-[11px] ${dark ? 'bg-black/30 text-white/50' : 'bg-white text-ink-3'}`}>{url}</span>
      </div>
      <div className="relative aspect-[16/10]">
        {media.video ? <Clip {...media.video} className="h-full w-full object-cover object-top" /> : <Shot src={media.image || ''} className="h-full w-full origin-top-left animate-push object-cover object-top motion-reduce:animate-none" />}
      </div>
    </div>
  );
});
