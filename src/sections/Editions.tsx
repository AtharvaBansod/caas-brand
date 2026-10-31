import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Laptop, Phone } from '../components/Devices';
import { Shot } from '../components/Media';
import { Reveal, SplitText } from '../components/Reveal';
import { phone, faces } from '../assets';

type Edition = {
  id: string; label: string; kicker: string; title: string; blurb: string; accent: string;
  points: { t: string; d: string }[];
  laptop: { video: { mp4: string; webm: string; poster: string } };
  phones: { image?: string; video?: { mp4: string; webm: string; poster: string } }[]; floats: { img: string; label: string; cls: string }[];
};
const cv = (id: string) => ({ mp4: `/media/clips/${id}.mp4`, webm: `/media/clips/${id}.webm`, poster: `/media/clips/${id}.jpg` });

const editions: Edition[] = [
  {
    id: 'general', label: 'General', kicker: 'For everyone', accent: 'from-iris to-violet',
    title: 'Everyday conversation, beautifully done.', blurb: 'The social messenger your users already expect — private, fast and full of life.',
    points: [
      { t: 'Chats, groups & media', d: 'Replies, reactions, voice notes, photos and scheduled messages.' },
      { t: 'Stories, posts & reels', d: 'A creator studio with filters, text, music and drafts.' },
      { t: 'Calls & voice spaces', d: 'Crisp 1:1 and group calls, plus drop-in audio rooms.' },
      { t: 'Profiles & privacy', d: 'Followers, private accounts, two-step verification, chat lock.' },
    ],
    laptop: { video: cv('g-chat') }, phones: [{ image: phone.chat }, { image: phone.feed }],
    floats: [{ img: faces[1], label: 'Soundcheck at 6 🎸', cls: 'left-[-2%] top-[8%]' }, { img: faces[2], label: 'Take me with you!!', cls: 'right-[-1%] top-[40%]' }],
  },
  {
    id: 'pro', label: 'Professional', kicker: 'For teams', accent: 'from-aqua to-iris',
    title: 'Where the work happens — inside the chat.', blurb: 'Workspaces, tasks, boards and an org chart that live next to the conversation.',
    points: [
      { t: 'Workspaces', d: 'Isolated spaces per team with join codes and admins.' },
      { t: 'Planner & tasks', d: 'Kanban, lists and /task commands straight from a message.' },
      { t: 'Whiteboards & pages', d: 'Real-time boards and Notion-style pages, shared per chat.' },
      { t: 'Topics & org chart', d: 'Focused threads inside a group and reporting lines that build themselves.' },
    ],
    laptop: { video: cv('p-planner') }, phones: [{ image: phone.planner }, { image: phone.tracker }],
    floats: [{ img: faces[0], label: 'Design is ready ✅', cls: 'left-[-2%] top-[10%]' }, { img: faces[5], label: 'Launch is Friday 🚀', cls: 'right-[-1%] top-[44%]' }],
  },
  {
    id: 'ultra', label: 'Ultra', kicker: 'For communities', accent: 'from-fuchsia-500 to-iris',
    title: 'Build a community, not just a chat.', blurb: 'Public and private communities with their own people, posts and encrypted broadcast channels.',
    points: [
      { t: 'Communities', d: 'Create or join by link or code, with logos, banners and rules.' },
      { t: 'Roles & moderation', d: 'Admins, moderators, join requests and review-before-post.' },
      { t: 'Channels & polls', d: 'Announcements, polls and live voice — end-to-end encrypted.' },
      { t: 'Workspaces too', d: 'Run teams and communities side by side in one product.' },
    ],
    laptop: { video: cv('u-communities') }, phones: [{ image: phone.launch }, { image: phone.weekly }],
    floats: [{ img: faces[3], label: 'Joined Design Guild 🎨', cls: 'left-[-2%] top-[10%]' }, { img: faces[4], label: 'New channel post', cls: 'right-[-1%] top-[44%]' }],
  },
  {
    id: 'support', label: 'Support desk', kicker: 'For customer care', accent: 'from-amber-400 to-rose-500',
    title: 'A help desk inside your product.', blurb: 'Customers tap “Contact support”; your agents pick it up in their own portal.',
    points: [
      { t: 'Built-in requests', d: 'Subject, topic and priority from inside the app.' },
      { t: 'Agent portal', d: 'Queue, my tickets, notes, canned replies and runbooks.' },
      { t: 'Calls on demand', d: 'Agents can start a call; customers can be allowed to.' },
      { t: 'Insights', d: 'Waiting time, active chats and CSAT at a glance.' },
    ],
    laptop: { video: cv('s-agent') }, phones: [{ video: cv('s-customer') }, { image: phone.chat }],
    floats: [{ img: faces[0], label: 'Ticket #1040 sent', cls: 'left-[-2%] top-[10%]' }, { img: faces[2], label: 'Agent joined the chat', cls: 'right-[-1%] top-[44%]' }],
  },
];

export function Editions() {
  const [tab, setTab] = React.useState<string>('general');
  const cur = editions.find((e) => e.id === tab)!;
  return (
    <section id="editions" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-paper via-iris-50/60 to-paper" />
      <div className="wrap">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className="eyebrow">Two products · one platform</span></Reveal>
          <SplitText as="h2" className="h-display mt-5 text-[clamp(2rem,4.2vw,3.5rem)]" text="Pick the experience. Switch anytime." />
        </div>

        <div className="mt-10 flex justify-center">
          <div role="tablist" aria-label="Edition" className="relative inline-flex rounded-full border border-ink/10 bg-white p-1.5 shadow-soft">
            {editions.map((e) => (
              <button key={e.id} role="tab" aria-selected={tab === e.id} onClick={() => setTab(e.id)} className={`relative z-10 rounded-full px-6 py-2.5 text-[14px] font-medium transition-colors ${tab === e.id ? 'text-white' : 'text-ink-2 hover:text-ink'}`}>
                {tab === e.id ? <motion.span layoutId="ed-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} className={`absolute inset-0 -z-10 rounded-full bg-gradient-to-r ${e.accent} shadow-glow`} /> : null}
                {e.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={cur.id} initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="mt-14 grid items-center gap-12 lg:grid-cols-[0.9fr_1.25fr]">
            <div>
              <div className={`inline-block bg-gradient-to-r ${cur.accent} bg-clip-text text-[13px] font-semibold uppercase tracking-[.18em] text-transparent`}>{cur.kicker}</div>
              <h3 className="h-display mt-3 text-[clamp(1.7rem,3vw,2.5rem)]">{cur.title}</h3>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink-2">{cur.blurb}</p>
              <ul className="mt-8 space-y-4">
                {cur.points.map((p, i) => (
                  <motion.li key={p.t} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.09, duration: 0.5 }} className="flex gap-4">
                    <span className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br ${cur.accent} text-[12px] font-semibold text-white`}>{i + 1}</span>
                    <span><b className="block text-[15px] font-semibold">{p.t}</b><span className="text-[14px] leading-relaxed text-ink-3">{p.d}</span></span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="relative px-2 pb-10 sm:px-8">
              <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <Laptop glow media={cur.laptop} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 60, rotate: 6 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: 0.35, type: 'spring', stiffness: 90, damping: 16 }} className="absolute -bottom-2 right-0 w-[22%] min-w-[96px] sm:right-2">
                <Phone media={cur.phones[0]} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 60, rotate: -6 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: 0.5, type: 'spring', stiffness: 90, damping: 16 }} className="absolute -bottom-8 left-0 hidden w-[17%] sm:block">
                <Phone media={cur.phones[1]} />
              </motion.div>
              {cur.floats.map((f, i) => (
                <motion.div key={f.label} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 + i * 0.2, type: 'spring', stiffness: 200, damping: 14 }} className={`glass absolute hidden items-center gap-2 rounded-2xl px-3 py-2 shadow-lift md:flex ${f.cls}`}>
                  <Shot src={f.img} className="h-7 w-7 rounded-full object-cover" />
                  <span className="text-[12px] font-medium text-ink">{f.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
