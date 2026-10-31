import * as React from 'react';
import { Shot, Clip, type ClipSrc } from './Media';

type Media = { image?: string; video?: ClipSrc };

/** Fills its screen edge to edge (a hair of overscan hides sub-pixel gaps at the rounded corners). */
function Screen({ media, top }: { media: Media; top?: boolean }) {
  const fit = `absolute inset-0 h-full w-full scale-[1.006] object-cover ${top ? 'object-top' : 'object-center'}`;
  return media.video ? <Clip {...media.video} className={fit} /> : <Shot src={media.image || ''} className={fit} />;
}

/** A phone with a real status bar and home bar: the app sits in a plain rectangle between them, so no corner of the UI is ever clipped. */
export const Phone = React.forwardRef<HTMLDivElement, { media?: Media; className?: string; glow?: boolean; children?: React.ReactNode }>(function Phone({ media = {}, className = '', glow, children }, ref) {
  return (
    <div ref={ref} className={`relative aspect-[9/20.4] w-full ${className}`}>
      {glow ? <div className="absolute -inset-10 -z-10 rounded-[80px] bg-iris/25 blur-3xl" /> : null}
      <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[14%/6.4%] bg-gradient-to-b from-[#2b2e3f] via-[#12141f] to-[#2a2d3c] p-[2.4%] shadow-[0_30px_80px_-20px_rgba(30,30,90,.55),inset_0_0_0_1.5px_rgba(255,255,255,.14)]">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-[9%/4%] bg-white">
          <div className="flex h-[3.6%] min-h-[10px] shrink-0 items-center justify-between bg-white px-[7%] text-[clamp(6px,1.9cqw,10px)] font-semibold text-ink [container-type:inline-size]">
            <span>10:10</span>
            <span className="flex items-center gap-1"><i className="inline-block h-[5px] w-[9px] rounded-[1.5px] bg-ink/80" /><i className="inline-block h-[5px] w-[5px] rounded-full bg-ink/80" /><span className="relative inline-grid h-[8px] w-[17px] place-items-center rounded-[3px] bg-emerald-500 text-[5.5px] font-bold leading-none text-white">99</span></span>
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden bg-black">{children ?? <Screen media={media} top />}</div>
          <div className="grid h-[2.4%] min-h-[6px] shrink-0 place-items-center bg-white"><i className="block h-[3px] w-[34%] rounded-full bg-ink/70" /></div>
        </div>
      </div>
      <i className="absolute -left-[1.2%] top-[18%] h-[5%] w-[1.2%] rounded-l bg-[#1b1d2a]" />
      <i className="absolute -left-[1.2%] top-[26%] h-[9%] w-[1.2%] rounded-l bg-[#1b1d2a]" />
      <i className="absolute -right-[1.2%] top-[24%] h-[13%] w-[1.2%] rounded-r bg-[#1b1d2a]" />
    </div>
  );
});

/** A laptop: thin bezel + hinge base. Screen is 16 : 10 and the clips are recorded 16 : 10, so nothing is cropped or padded. */
export const Laptop = React.forwardRef<HTMLDivElement, { media?: Media; className?: string; glow?: boolean; children?: React.ReactNode }>(function Laptop({ media = {}, className = '', glow, children }, ref) {
  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      {glow ? <div className="absolute -inset-8 -z-10 rounded-[60px] bg-violet/20 blur-3xl" /> : null}
      <div className="rounded-[14px] bg-gradient-to-b from-[#2a2d3b] to-[#151724] p-[0.9%] shadow-[0_40px_90px_-30px_rgba(30,30,90,.6),inset_0_0_0_1.5px_rgba(255,255,255,.12)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[7px] bg-black">
          {children ?? <Screen media={media} top />}
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
      <div className="relative aspect-[16/10] bg-black">
        <Screen media={media} top />
      </div>
    </div>
  );
});
