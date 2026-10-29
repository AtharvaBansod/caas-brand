import * as React from 'react';
import { gsap, scrollToId } from '../lib/smooth';

const LINKS = [
  { id: 'product', label: 'Product' },
  { id: 'integrate', label: 'Integrate' },
  { id: 'platform', label: 'Platform' },
  { id: 'console', label: 'Console' },
  { id: 'docs', label: 'Docs' },
  { id: 'security', label: 'Security' },
];

export function Logo({ light }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden>
        <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7c7cff" /><stop offset="1" stopColor="#5b5bf0" /></linearGradient></defs>
        <rect width="64" height="64" rx="18" fill="url(#lg)" />
        <path d="M20 24c0-3 2-5 5-5h14c3 0 5 2 5 5v10c0 3-2 5-5 5H31l-7 6v-6c-2-.5-4-2.3-4-5z" fill="#fff" />
        <circle cx="27" cy="29" r="2.2" fill="#5b5bf0" /><circle cx="33" cy="29" r="2.2" fill="#5b5bf0" /><circle cx="39" cy="29" r="2.2" fill="#5b5bf0" />
      </svg>
      <span className={`text-[17px] font-semibold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>CaaS</span>
    </span>
  );
}

export function Nav() {
  const bar = React.useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState('');

  React.useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      const el = bar.current;
      if (el) gsap.to(el, { yPercent: y > last && y > 400 ? -120 : 0, duration: 0.5, ease: 'power3.out', overwrite: true });
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: '-45% 0px -50% 0px' });
    LINKS.forEach((l) => { const s = document.getElementById(l.id); if (s) io.observe(s); });
    gsap.from(bar.current, { y: -40, opacity: 0, duration: 1, ease: 'expo.out', delay: 0.2 });
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); };
  }, []);

  return (
    <header ref={bar} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <div className={`mx-auto flex max-w-[1240px] items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-5 ${scrolled ? 'glass border-ink/5 shadow-soft' : 'border-transparent'}`}>
        <button onClick={() => scrollToId('top')} aria-label="CaaS home"><Logo /></button>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
          {LINKS.map((l) => (
            <button key={l.id} onClick={() => scrollToId(l.id)} className={`relative rounded-full px-3.5 py-1.5 text-[13.5px] font-medium transition-colors ${active === l.id ? 'text-iris-700' : 'text-ink-2 hover:text-ink'}`}>
              {active === l.id ? <span className="absolute inset-0 -z-10 rounded-full bg-iris/10" /> : null}
              {l.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost !px-4 !py-2 !text-[13px] max-sm:hidden" onClick={() => scrollToId('console')}>Admin console</button>
          <button className="btn btn-primary !px-4 !py-2 !text-[13px]" onClick={() => scrollToId('developers')}>Get started</button>
        </div>
      </div>
    </header>
  );
}
