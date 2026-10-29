// Every captured asset the page uses. The capture scripts (capture/*.mjs) write these files into
// public/media; until a file exists the components fall back to a soft placeholder.
const m = (p: string) => `/media/${p}`;

export const phone = {
  chatlist: m('phone/chatlist.webp'),
  chat: m('phone/chat.webp'),
  chatMedia: m('phone/chat-media.webp'),
  group: m('phone/group.webp'),
  feed: m('phone/feed.webp'),
  story: m('phone/story.webp'),
  profile: m('phone/profile.webp'),
  call: m('phone/call.webp'),
  planner: m('phone/planner.webp'),
  tasks: m('phone/tasks.webp'),
  pages: m('phone/pages.webp'),
  whiteboard: m('phone/whiteboard.webp'),
  communities: m('phone/communities.webp'),
  tracker: m('phone/tracker.webp'),
  weekly: m('phone/weekly.webp'),
  launch: m('phone/launch.webp'),
};

export const desktop = {
  chat: m('desktop/chat.webp'),
  group: m('desktop/group.webp'),
  feed: m('desktop/feed.webp'),
  profile: m('desktop/profile.webp'),
  planner: m('desktop/planner.webp'),
  whiteboard: m('desktop/whiteboard.webp'),
  org: m('desktop/org.webp'),
  pages: m('desktop/pages.webp'),
  topics: m('desktop/topics.webp'),
  communities: m('desktop/communities.webp'),
  tracker: m('desktop/tracker.webp'),
  weekly: m('desktop/weekly.webp'),
  meeting: m('desktop/meeting.webp'),
};

export const admin = {
  dashboard: m('admin/dashboard.webp'),
  playground: m('admin/playground.webp'),
  workspaces: m('admin/workspaces.webp'),
  branding: m('admin/branding.webp'),
  people: m('admin/people.webp'),
  docs: m('admin/docs.webp'),
  insights: m('admin/insights.webp'),
  webhooks: m('admin/webhooks.webp'),
  apikeys: m('admin/apikeys.webp'),
};

const clip = (n: string) => ({ mp4: m(`video/${n}.mp4`), webm: m(`video/${n}.webm`), poster: m(`video/${n}.jpg`) });
export const tour = { mp4: m('video/tour.mp4'), webm: m('video/tour.webm'), poster: m('video/tour.jpg') };
export const integrate = { desktop: clip('integrate-desktop'), phone: clip('integrate-phone') };
export const video = {
  hero: clip('hero-phone'),
  chat: clip('chat-phone'),
  general: clip('general-desktop'),
  pro: tour,
  admin: clip('admin-desktop'),
};

export const faces = ['maya', 'arjun', 'sofia', 'liam', 'priya', 'noah'].map((k) => m(`faces/${k}.webp`));
export const photos = ['santorini', 'tuscany', 'jetty', 'mountains', 'cafe', 'galaxy', 'canoe', 'beach'].map((k) => m(`photos/${k}.webp`));
