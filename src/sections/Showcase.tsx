import * as React from 'react';
import { gsap } from '../lib/smooth';
import { Laptop, Phone } from '../components/Devices';
import { desktop, phone, video, tour } from '../assets';

const beats = [
  { k: 'Chat', t: 'Conversations that feel instant.', d: 'Direct, group and topic threads with replies, reactions, media, scheduled sends and read receipts.' },
  { k: 'Teams', t: 'Work happens where people talk.', d: 'Tasks, pages, whiteboards and an org chart — right beside the conversation.' },
  { k: 'Embedded', t: 'All of it, inside your product.', d: 'One SDK mounts the whole experience in your app — in your brand, for your users.' },
];

/** Pinned, scroll-scrubbed reveal: the laptop grows into view, the phone slides in, captions change. */
export function Showcase() {
  const root = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    const el = root.current; if (!el) return undefined;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top top', end: '+=2400', pin: true, scrub: 0.8, anticipatePin: 1 } });
      tl.fromTo('[data-sc-laptop]', { scale: 0.55, rotateX: 28, y: 120, opacity: 0.2 }, { scale: 1, rotateX: 0, y: 0, opacity: 1, duration: 2, ease: 'power2.out' })
        .fromTo('[data-sc-phone]', { x: 220, y: 160, opacity: 0, rotate: 8 }, { x: 0, y: 0, opacity: 1, rotate: 0, duration: 1.4, ease: 'power3.out' }, 1.1)
        .fromTo('[data-sc-beat="0"]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6)
        .to('[data-sc-beat="0"]', { opacity: 0, y: -30, duration: 0.6 }, 2.2)
        .fromTo('[data-sc-beat="1"]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, 2.7)
        .to('[data-sc-beat="1"]', { opacity: 0, y: -30, duration: 0.6 }, 4.1)
        .fromTo('[data-sc-beat="2"]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, 4.6)
        .to('[data-sc-dot]', { scaleX: 1, transformOrigin: 'left', duration: 5.4, ease: 'none' }, 0)
        .to('[data-sc-glow]', { scale: 1.4, opacity: 0.9, duration: 5, ease: 'none' }, 0);
    });
    mm.add('(max-width: 899px), (prefers-reduced-motion: reduce)', () => {
      gsap.set('[data-sc-beat]', { opacity: 1, position: 'relative' });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="product" className="relative isolate overflow-hidden bg-night py-16 text-white md:h-screen md:py-0">
      <div data-sc-glow className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-iris/30 opacity-40 blur-[140px]" />
      <div className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-40" />
      <div className="wrap flex h-full flex-col justify-center gap-10 md:gap-6">
        <div className="relative mx-auto min-h-[190px] w-full max-w-2xl text-center">
          <div className="eyebrow !border-white/15 !bg-white/5 !text-iris-200">See it work</div>
          {beats.map((b, i) => (
            <div key={b.k} data-sc-beat={i} className="mt-4 md:absolute md:inset-x-0 md:top-10 md:opacity-0">
              <h2 className="h-display !text-white text-[clamp(1.6rem,3vw,2.5rem)]">{b.t}</h2>
              <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-white/60">{b.d}</p>
            </div>
          ))}
        </div>
        <div className="relative mx-auto w-full max-w-[860px] [perspective:1600px]">
          <div data-sc-laptop className="will-change-transform [transform-style:preserve-3d]">
            <Laptop glow media={{ video: tour, image: desktop.chat }} />
          </div>
          <div data-sc-phone className="absolute -bottom-6 right-[-4%] w-[21%] min-w-[110px] will-change-transform">
            <Phone glow media={{ video: video.hero, image: phone.chat }} />
          </div>
        </div>
        <div className="mx-auto hidden h-1 w-48 overflow-hidden rounded-full bg-white/10 md:block"><i data-sc-dot className="block h-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-iris to-aqua" /></div>
      </div>
    </section>
  );
}
