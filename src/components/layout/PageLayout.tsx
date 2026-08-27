import { Nav } from './Nav';
import { SmoothScroll } from '@/components/effects/SmoothScroll';
import { CursorDot } from '@/components/effects/CursorDot';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { TechStack } from '@/components/sections/TechStack';
import { Contact } from '@/components/sections/Contact';

export function PageLayout() {
  return (
    <SmoothScroll>
      <CursorDot />
      <Nav />
      <main className="relative">
        <Hero />
        <About />
        <SelectedWork />
        <TechStack />
        <Contact />
      </main>
    </SmoothScroll>
  );
}