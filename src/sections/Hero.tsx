import * as React from 'react';
import { gsap, scrollToId } from '../lib/smooth';
import { SplitText } from '../components/Reveal';
import { Shot } from '../components/Media';
import { HeroScene } from '../components/HeroScene';
import { faces, video, phone } from '../assets';

class SceneBoundary extends React.Component<{ children: React.ReactNode; fallback: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

const Lock = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
);

export function Hero() {
  const root = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = root.current; if (!el) return undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 });
      tl.from('[data-hero-fade]', { y: 26, opacity: 0, duration: 1.1, stagger: 0.12 }, 0.5)
        .from('[data-bubble]', { y: 40, scale: 0.8, opacity: 0, duration: 1.1, stagger: 0.28, ease: 'back.out(1.5)' }, 1.3)
        .from('[data-hero-scroll]', { opacity: 0, y: -10, duration: 1 }, 2.4);
      // gentle idle float + scroll parallax for the bubbles
      gsap.utils.toArray<HTMLElement>('[data-bubble]').forEach((b, i) => {
        gsap.to(b, { y: i % 2 ? 12 : -12, duration: 3.2 + i * 0.5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 2 });
      });
      gsap.to('[data-hero-stage]', { yPercent: -10, scale: 0.94, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('[data-hero-copy]', { yPercent: -14, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: '80% top', scrub: true } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative isolate min-h-[100svh] overflow-hidden pt-24" id="top">
      {/* calm, slow colour fields */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-10 h-[560px] w-[560px] rounded-full bg-iris/20 blur-[120px] animate-float" />
        <div className="absolute right-[-120px] top-[-60px] h-[520px] w-[520px] rounded-full bg-aqua/20 blur-[120px] animate-float [animation-delay:-3s]" />
        <div className="absolute bottom-[-160px] left-[35%] h-[460px] w-[460px] rounded-full bg-blush/15 blur-[130px] animate-float [animation-delay:-5s]" />
        <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_60%_40%,#000_10%,transparent_75%)]" />
      </div>

      <div className="wrap grid min-h-[calc(100svh-6rem)] items-center gap-6 lg:grid-cols-[1.02fr_1fr]">
        <div data-hero-copy className="relative z-10 pb-10 pt-6 lg:pb-24">
          <div data-hero-fade className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_0_4px_rgba(52,211,153,.2)]" /> Chat infrastructure · end-to-end encrypted</div>
          <h1 className="h-display mt-6 text-[clamp(2.3rem,4.8vw,4.3rem)]" aria-label="The chat infrastructure for products that talk.">
            <SplitText as="span" text="The chat infrastructure" onView={false} delay={0.25} />{' '}
            <br className="hidden sm:block" />
            <SplitText as="span" text="for products that" onView={false} delay={0.45} />{' '}
            <SplitText as="span" text="talk." onView={false} delay={0.7} accentFrom={0} accentClass="serif-i grad-text pr-2" className="text-[1.06em]" />
          </h1>
          <p data-hero-fade className="mt-7 max-w-[34rem] text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-ink-2">
            Embed messaging, calls, social feeds and team workspaces directly inside your own product — one SDK for your app, one console to run it. Private by design.
          </p>
          <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-3">
            <button className="btn btn-primary" onClick={() => scrollToId('docs')}>Start building
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
            <button className="btn btn-ghost" onClick={() => window.dispatchEvent(new Event('open-tour'))}>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-iris text-white"><svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
              See it in action
            </button>
          </div>
        </div>

        {/* the 3D phone + floating product bubbles */}
        <div data-hero-stage className="relative z-0 h-[560px] sm:h-[640px] lg:h-[min(760px,82svh)]">
          <SceneBoundary fallback={<div className="absolute inset-0 grid place-items-center"><Shot src={phone.chat} className="h-[80%] rounded-[36px] shadow-lift" /></div>}>
            <HeroScene still={phone.chat} />
          </SceneBoundary>

          <div data-bubble className="glass absolute left-[2%] top-[14%] z-10 flex max-w-[15.5rem] items-end gap-2 rounded-2xl rounded-bl-md p-2.5 pr-3.5 shadow-lift sm:left-[-2%]">
            <Shot src={faces[1]} className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-white" />
            <div><p className="text-[10.5px] font-medium text-ink-3">Arjun Rao</p><p className="text-[13px] leading-snug text-ink">Deploy&rsquo;s live — zero downtime 🎉</p></div>
          </div>
          <div data-bubble className="absolute right-[0%] top-[34%] z-10 max-w-[13rem] rounded-2xl rounded-br-md bg-iris p-2.5 px-3.5 text-[13px] leading-snug text-white shadow-glow sm:right-[-4%]">
            Just saw it. Smooth. ✨
          </div>
          <div data-bubble className="glass absolute bottom-[20%] left-[-2%] z-10 flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4 shadow-lift sm:left-[-8%]">
            <Shot src={faces[2]} className="h-8 w-8 rounded-full object-cover ring-2 ring-white" />
            <span className="flex gap-1"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-iris" /><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-iris [animation-delay:.2s]" /><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-iris [animation-delay:.4s]" /></span>
          </div>
          <div data-bubble className="glass absolute bottom-[8%] right-[2%] z-10 flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] font-medium text-ink-2 shadow-lift sm:right-[-2%]">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-mint/20 text-mint"><Lock /></span> End-to-end encrypted
          </div>
        </div>
      </div>

      <div data-hero-scroll className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[.2em] text-ink-4 md:flex">
        Scroll
        <span className="relative block h-9 w-px overflow-hidden bg-ink/10"><i className="absolute left-0 top-0 h-3 w-px animate-[scrollDot_2.2s_ease-in-out_infinite] bg-iris" /></span>
      </div>
    </section>
  );
}
