import * as React from 'react';
import { Reveal, SplitText } from '../components/Reveal';
import { Logo } from './Nav';
import { Shot } from '../components/Media';
import { faces } from '../assets';

export function CTA() {
  return (
    <section id="start" className="relative isolate overflow-hidden bg-night py-28 text-center text-white md:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-iris/35 blur-[150px] animate-float" />
        <div className="grid-lines absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000,transparent)]" />
      </div>
      <div className="wrap">
        <div className="mb-8 flex justify-center -space-x-3">{faces.map((f) => <Shot key={f} src={f} className="h-11 w-11 rounded-full border-2 border-night object-cover" />)}</div>
        <SplitText as="h2" className="h-display mx-auto max-w-3xl !text-white text-[clamp(2.2rem,5vw,4rem)]" text="Give your product a voice." />
        <Reveal delay={0.1}><p className="mx-auto mt-5 max-w-lg text-[16px] text-white/60">Add chat, calls and community to your app today — and keep every message private.</p></Reveal>
        <Reveal delay={0.2} className="mt-9 flex flex-wrap justify-center gap-3">
          <a href="#docs" className="btn bg-white text-ink hover:-translate-y-0.5 hover:shadow-glow">Start building</a>
          <a href="#console" className="btn border border-white/20 text-white hover:bg-white/10">Explore the console</a>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink/5 bg-paper py-10">
      <div className="wrap flex flex-col items-center justify-between gap-4 text-[13px] text-ink-3 sm:flex-row">
        <Logo />
        <span>Chat infrastructure for products that talk.</span>
        <span>© {new Date().getFullYear()} CaaS</span>
      </div>
    </footer>
  );
}
