import * as React from 'react';
import { Laptop, Phone } from '../components/Devices';
import { Reveal, SplitText } from '../components/Reveal';

type Step = { id: string; group: string; device: 'laptop' | 'phone'; title: string; copy: string; tags: string[] };
const clipSrc = (id: string) => ({ mp4: `/media/clips/${id}.mp4`, webm: `/media/clips/${id}.webm`, poster: `/media/clips/${id}.jpg` });

export const STEPS: Step[] = [
  { id: 'g-chat', group: 'General', device: 'laptop', title: 'Conversations that feel instant', copy: 'One-to-one chat with replies, reactions, read receipts, scheduled messages and voice notes — end-to-end encrypted.', tags: ['E2EE', 'Receipts', 'Scheduled'] },
  { id: 'g-group', group: 'General', device: 'laptop', title: 'Groups, media and plans', copy: 'Group chats with photos, files, polls and pinned messages. Everyone sees the same thread, instantly.', tags: ['Groups', 'Media', 'Pins'] },
  { id: 'g-phone-chat', group: 'General', device: 'phone', title: 'Made for the phone in your hand', copy: 'A native-feeling mobile layout: swipe to reply, long-press for actions, notch-safe and thumb-friendly.', tags: ['Responsive', 'Touch', 'PWA'] },
  { id: 'g-feed', group: 'General', device: 'laptop', title: 'Posts, stories and reels', copy: 'A social layer with a creator studio — stories, reels, posts with filters, music and drafts.', tags: ['Stories', 'Reels', 'Studio'] },
  { id: 'g-phone-feed', group: 'General', device: 'phone', title: 'The feed, in your users’ pocket', copy: 'Follow people, react, comment and share — with privacy controls and private accounts built in.', tags: ['Follow', 'Privacy', 'Share'] },
  { id: 'g-profile', group: 'General', device: 'laptop', title: 'Profiles people care about', copy: 'Avatars, bios, links, highlights and an avatar builder — plus two-step verification and chat lock.', tags: ['Avatar builder', '2-step', 'Chat lock'] },
  { id: 'c-video', group: 'Calls', device: 'laptop', title: 'Voice, video and live spaces', copy: 'Crisp 1:1 and group calls with screen share, in-call chat and a shared whiteboard — plus drop-in voice spaces.', tags: ['Video', 'Group', 'Screen share'] },
  { id: 'c-whiteboard', group: 'Calls', device: 'laptop', title: 'Draw together, mid-call', copy: 'Open the call whiteboard and everyone draws at once — each person’s cursor is live on the board.', tags: ['Call board', 'Multi-cursor', 'Auto-save'] },
  { id: 'p-tasks', group: 'Professional', device: 'laptop', title: 'Turn talk into tasks', copy: 'Type /task in any chat. Owners, priorities, labels and due dates are parsed for you.', tags: ['/task', 'Owners', 'Due dates'] },
  { id: 'p-planner', group: 'Professional', device: 'laptop', title: 'A planner that moves with the team', copy: 'Kanban boards, lists and calendars. Drag work between columns and everyone sees it live.', tags: ['Kanban', 'Calendar', 'Live'] },
  { id: 'p-whiteboard', group: 'Professional', device: 'laptop', title: 'Whiteboards, together', copy: 'Sketch, diagram and brainstorm in real time — shapes, pen, text, sharing and call boards.', tags: ['Real-time', 'Shapes', 'Share'] },
  { id: 'p-pages', group: 'Professional', device: 'laptop', title: 'Pages and notes', copy: 'Notion-style pages with databases, habit trackers and templates, shared per chat or channel.', tags: ['Pages', 'Databases', 'Templates'] },
  { id: 'p-topics', group: 'Professional', device: 'laptop', title: 'Topics keep chats tidy', copy: 'Split a busy group into focused topics — design, engineering, launch plan — without losing context.', tags: ['Topics', 'Threads'] },
  { id: 'p-org', group: 'Professional', device: 'laptop', title: 'Workspaces and an org chart', copy: 'Isolated workspaces with join codes and admins, and a reporting line built from real working links.', tags: ['Workspaces', 'Org chart'] },
  { id: 'u-communities', group: 'Ultra', device: 'laptop', title: 'Communities at scale', copy: 'Public or private communities with posts, events, roles, join requests and an encrypted broadcast channel.', tags: ['Communities', 'Channels', 'Moderation'] },
  { id: 's-customer', group: 'Support desk', device: 'phone', title: 'Contact support, built in', copy: 'Customers raise a request from inside your product — subject, topic, priority — and wait in the queue.', tags: ['Tickets', 'Queue'] },
  { id: 's-agent', group: 'Support desk', device: 'laptop', title: 'A portal for your agents', copy: 'Agents pick up tickets, chat, add notes, use canned replies and runbooks — with CSAT tracked.', tags: ['Agents', 'Canned replies', 'CSAT'] },
];

const groupColor: Record<string, string> = { General: 'from-iris to-violet', Calls: 'from-emerald-400 to-aqua', Professional: 'from-aqua to-iris', Ultra: 'from-fuchsia-500 to-iris', 'Support desk': 'from-amber-400 to-rose-500' };

/** One video; plays from the start whenever it becomes the active step. */
function Layer({ id, active }: { id: string; active: boolean }) {
  const ref = React.useRef<HTMLVideoElement>(null);
  React.useEffect(() => {
    const v = ref.current; if (!v) return;
    if (active) { v.currentTime = 0; void v.play().catch(() => undefined); } else v.pause();
  }, [active]);
  const c = clipSrc(id);
  return (
    <video ref={ref} poster={c.poster} muted loop playsInline preload="metadata" className={`absolute inset-0 h-full w-full scale-[1.006] object-cover object-top transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'}`}>
      <source src={c.webm} type="video/webm" /><source src={c.mp4} type="video/mp4" />
    </video>
  );
}

export function Action() {
  const [active, setActive] = React.useState(0);
  const refs = React.useRef<(HTMLElement | null)[]>([]);
  React.useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }), { rootMargin: '-42% 0px -42% 0px' });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  const cur = STEPS[active];
  const laptops = STEPS.filter((s) => s.device === 'laptop'); const phones = STEPS.filter((s) => s.device === 'phone');

  return (
    <section id="action" className="relative bg-night py-24 text-white md:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden"><div className="absolute left-[-10%] top-[8%] h-[520px] w-[520px] rounded-full bg-iris/25 blur-[150px]" /><div className="absolute bottom-[4%] right-[-8%] h-[480px] w-[480px] rounded-full bg-aqua/15 blur-[150px]" /><div className="grid-lines absolute inset-0 opacity-25" /></div>
      <div className="wrap relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className="eyebrow !border-white/15 !bg-white/5 !text-iris-200">See it in action</span></Reveal>
          <SplitText as="h2" className="h-display mt-5 !text-white text-[clamp(2rem,4.2vw,3.6rem)]" text="Every feature, working — scroll to watch." />
          <Reveal delay={0.1}><p className="mt-4 text-[16px] text-white/60">Real recordings of the real product: General, Professional, Ultra, calls and the support desk.</p></Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            {STEPS.map((s, i) => (
              <article key={s.id} ref={(el) => { refs.current[i] = el; }} data-i={i} className="flex flex-col justify-center py-10 lg:min-h-[62vh]">
                <span className={`inline-block w-fit rounded-full bg-gradient-to-r ${groupColor[s.group]} px-3 py-1 text-[11px] font-semibold uppercase tracking-[.14em] text-white`}>{s.group}</span>
                <h3 className={`mt-4 text-[clamp(1.5rem,2.6vw,2.2rem)] font-semibold tracking-tight transition-opacity duration-500 ${i === active ? 'opacity-100' : 'lg:opacity-35'}`}>{s.title}</h3>
                <p className={`mt-3 max-w-md text-[15px] leading-relaxed text-white/60 transition-opacity duration-500 ${i === active ? 'opacity-100' : 'lg:opacity-35'}`}>{s.copy}</p>
                <div className="mt-4 flex flex-wrap gap-2">{s.tags.map((t) => <span key={t} className="rounded-full border border-white/10 px-2.5 py-1 text-[11.5px] text-white/55">{t}</span>)}</div>
                <div className="mt-6 lg:hidden">
                  {s.device === 'laptop' ? <Laptop glow><Layer id={s.id} active /></Laptop> : <div className="mx-auto w-[210px]"><Phone glow><Layer id={s.id} active /></Phone></div>}
                </div>
              </article>
            ))}
          </div>

          <div className="relative hidden lg:block">
            <div className="sticky top-[14vh] flex h-[72vh] items-center justify-center">
              <div className={`absolute inset-x-0 transition-all duration-700 ${cur.device === 'laptop' ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-6 scale-95 opacity-0'}`}>
                <Laptop glow>{laptops.map((s) => <Layer key={s.id} id={s.id} active={s.id === cur.id} />)}</Laptop>
              </div>
              <div className={`absolute w-[300px] transition-all duration-700 ${cur.device === 'phone' ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-6 scale-95 opacity-0'}`}>
                <Phone glow>{phones.map((s) => <Layer key={s.id} id={s.id} active={s.id === cur.id} />)}</Phone>
              </div>
              <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">{STEPS.map((s, i) => <i key={s.id} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-white' : 'w-1.5 bg-white/25'}`} />)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
