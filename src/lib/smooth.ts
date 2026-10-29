import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** One smooth-scroll instance, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function startSmoothScroll(): Lenis {
  if (lenis) return lenis;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  lenis = new Lenis({ duration: reduce ? 0 : 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: !reduce, wheelMultiplier: 0.95 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export const scrollToId = (id: string) => lenis?.scrollTo(`#${id}`, { offset: -72, duration: 1.4 });
export { gsap, ScrollTrigger };

export const lockScroll = (on: boolean) => { if (on) lenis?.stop(); else lenis?.start(); };
