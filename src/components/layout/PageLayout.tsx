import { Nav } from './Nav';
import { SmoothScroll } from '@/components/effects/SmoothScroll';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { TechStack } from '@/components/sections/TechStack';
import { Contact } from '@/components/sections/Contact';

export function PageLayout() {
  return (
    <SmoothScroll>
      <Nav />
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <SelectedWork />
        <TechStack />
        <Contact />
      </main>
    </SmoothScroll>
  );
}