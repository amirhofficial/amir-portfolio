import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Capabilities from '@/components/sections/Capabilities';
import Skills from '@/components/sections/Skills';
import FeaturedProject from '@/components/sections/FeaturedProject';
import Process from '@/components/sections/Process';
import Statement from '@/components/sections/Statement';
import Contact from '@/components/sections/Contact';
import LunoRunTeaser from '@/components/sections/LunoRunTeaser';
import MusicDock from '@/components/ui/MusicDock';

export default function Home() {
  return (
    <>
      <Hero />

      <MusicDock />

      <About />

      <Capabilities />

      <Skills />

      <FeaturedProject />

      <Process />

      <Statement />

      <LunoRunTeaser />

      <Contact />
    </>
  );
}