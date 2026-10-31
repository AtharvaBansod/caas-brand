import * as React from 'react';
import { startSmoothScroll, ScrollTrigger } from './lib/smooth';
import { Nav } from './sections/Nav';
import { Hero } from './sections/Hero';
import { Marquee } from './sections/Marquee';
import { Action } from './sections/Action';
import { Calls } from './sections/Calls';
import { Editions } from './sections/Editions';
import { Bento } from './sections/Bento';
import { Console } from './sections/Console';
import { Integrate } from './sections/Integrate';
import { Docs } from './sections/Docs';
import { Security } from './sections/Security';
import { CTA, Footer } from './sections/Finale';

export function App() {
  React.useEffect(() => {
    startSmoothScroll();
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 800);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => { window.clearTimeout(t); window.removeEventListener('load', onLoad); };
  }, []);
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Integrate />
        <Action />
        <Editions />
        <Calls />
        <Bento />
        <Console />
        <Docs />
        <Security />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
