import * as React from 'react';
import { Reveal, SplitText } from '../components/Reveal';

const SecurityScene = React.lazy(() => import('../components/SecurityScene').then((m) => ({ default: m.SecurityScene })));

class Boundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="h-full w-full rounded-full bg-iris/20 blur-3xl" /> : this.props.children; }
}

const items = [
  ['End-to-end encrypted', 'Room keys live on trusted devices. Messages are ciphertext everywhere else.'],
  ['Trusted devices', 'Sign-in is bound to a device key; new devices need an emailed code.'],
  ['Two-step verification', 'Optional email MFA with printable recovery codes.'],
  ['Your data, your rules', 'Configurable retention, soft or direct deletion and a legal-hold workflow.'],
];

export function Security() {
  const [on, setOn] = React.useState(false);
  const host = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = host.current; if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: '200px' });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <section id="security" className="relative overflow-hidden py-24 md:py-32">
      <div className="wrap grid items-center gap-10 lg:grid-cols-2">
        <div ref={host} className="relative mx-auto aspect-square w-full max-w-[460px] order-last lg:order-first">
          <div className="absolute inset-8 rounded-full bg-iris/15 blur-3xl" />
          {on ? <Boundary><React.Suspense fallback={null}><SecurityScene /></React.Suspense></Boundary> : null}
        </div>
        <div>
          <Reveal><span className="eyebrow">Security &amp; privacy</span></Reveal>
          <SplitText as="h2" className="h-display mt-5 text-[clamp(2rem,4vw,3.2rem)]" text="Trust is built in, not bolted on." />
          <Reveal stagger={0.09} className="mt-8 grid gap-4 sm:grid-cols-2">
            {items.map(([t, d]) => (
              <div key={t} className="card p-5"><b className="text-[15px] font-semibold">{t}</b><p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-3">{d}</p></div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
