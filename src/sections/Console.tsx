import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { gsap } from '../lib/smooth';
import { Browser } from '../components/Devices';
import { Reveal, SplitText } from '../components/Reveal';
import { admin } from '../assets';
import { useStickRelease } from '../lib/useStickRelease';


const views = [
  { id: 'dashboard', label: 'Overview', d: 'Live activity, API usage and health at a glance.', img: admin.dashboard, url: 'admin.yourapp.com/dashboard' },
  { id: 'playground', label: 'SDK Playground', d: 'Toggle features, preview the SDK on any device, copy the install.', img: admin.playground, url: 'admin.yourapp.com/sdk-preview' },
  { id: 'workspaces', label: 'Workspaces', d: 'Standard, Pro or Ultra — with admins, join codes and communities.', img: admin.workspaces, url: 'admin.yourapp.com/workspaces' },
  { id: 'branding', label: 'Branding', d: 'Your name, colour, logo and contacts — applied to every email, code screen and shared page.', img: admin.branding, url: 'admin.yourapp.com/branding' },
  { id: 'emails', label: 'Branded emails', d: 'Sign-in codes and alerts carry your logo and tone, with live previews and a send-test.', img: admin.brandemails, url: 'admin.yourapp.com/branding/emails' },
  { id: 'signin', label: 'Sign-in screen', d: 'Pick a design for the verification screen and watch the preview update.', img: admin.brandsignin, url: 'admin.yourapp.com/branding/sign-in' },
  { id: 'docs', label: 'Docs', d: 'Integration guides and copy-paste snippets for every framework and language.', img: admin.docs, url: 'admin.yourapp.com/docs' },
  { id: 'people', label: 'People', d: 'Everyone using your product, searchable and manageable.', img: admin.people, url: 'admin.yourapp.com/people' },
];

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return undefined;
    const o = { v: 0 };
    const t = gsap.to(o, { v: to, duration: 1.8, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString() + suffix; }, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    return () => { t.scrollTrigger?.kill(); t.kill(); };
  }, [to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

export function Console() {
  const section = React.useRef<HTMLElement>(null);
  const released = useStickRelease(section);
  const [i, setI] = React.useState(0);
  const v = views[i];
  return (
    <section ref={section} id="console" className="relative isolate overflow-clip bg-night py-24 text-white md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-iris/25 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[460px] w-[460px] rounded-full bg-aqua/15 blur-[140px]" />
        <div className="grid-lines absolute inset-0 opacity-30" />
      </div>
      <div className="wrap">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className="eyebrow !border-white/15 !bg-white/5 !text-iris-200">Admin console</span></Reveal>
          <SplitText as="h2" className="h-display mt-5 !text-white text-[clamp(2rem,4.2vw,3.5rem)]" text="Run all of it from one calm console." />
          <Reveal delay={0.1}><p className="mt-4 text-[16px] text-white/60">No infrastructure to babysit. Configure features, brand and people — then watch it grow.</p></Reveal>
        </div>

        <div className={`stick-nav ${released ? 'released' : ''} mt-12 flex flex-wrap justify-center gap-2 rounded-2xl bg-night/70 py-2 backdrop-blur-md`}>
          {views.map((x, k) => (
            <button key={x.id} onClick={() => setI(k)} className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-all ${k === i ? 'border-iris bg-iris/20 text-white shadow-[0_0_30px_-5px_rgba(91,91,240,.7)]' : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'}`}>{x.label}</button>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-[1000px] [perspective:1800px]">
          <div>
            <AnimatePresence mode="wait">
              <motion.div key={v.id} initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, scale: 1.02, filter: 'blur(6px)' }} transition={{ duration: 0.45 }}>
                <div className="relative"><Browser dark url={v.url} media={{ image: v.img }} />                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-6 text-center text-[15px] text-white/60">{v.d}</p>
        </div>

        <Reveal stagger={0.1} className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 text-center md:grid-cols-4">
          {[['Active users', 2811, ''], ['Messages / 30d', 4695, ''], ['Calls / 30d', 331, ''], ['Activation', 29, '%']].map(([l, n, s]) => (
            <div key={l as string} className="rounded-2xl border border-white/10 bg-white/[.03] px-4 py-6 backdrop-blur">
              <div className="text-3xl font-semibold tracking-tight"><CountUp to={n as number} suffix={s as string} /></div>
              <div className="mt-1 text-[12px] uppercase tracking-widest text-white/45">{l}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
