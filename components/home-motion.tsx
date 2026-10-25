'use client';

import { useEffect } from 'react';

const clamp = (number: number, min: number, max: number) =>
  Math.max(min, Math.min(max, number));

/**
 * Drives the second chapter using only GPU-friendly opacity and translation.
 * The previous implementation updated inherited CSS variables each scroll frame,
 * re-blurring an enormous heading and changing the width of a clipped duplicate.
 * That frequently forced expensive repainting in iOS browsers.
 */
export function HomeMotion() {
  useEffect(() => {
    const story = document.querySelector<HTMLElement>('[data-story-track]');
    const sticky = story?.querySelector<HTMLElement>('.story-second-stage');
    if (!story || !sticky) return;

    const firstLine = story.querySelector<HTMLElement>('.story-second-heading-first');
    const secondLine = story.querySelector<HTMLElement>('.story-second-heading-final');
    const openingLine = story.querySelector<HTMLElement>('.story-second-echo');
    const subcopy = story.querySelector<HTMLElement>('.story-second-subcopy');
    const credentials = story.querySelector<HTMLElement>('.story-second-specs');
    const nextPrompt = story.querySelector<HTMLElement>('.story-second-next');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const kineticNodes = Array.from(document.querySelectorAll<HTMLElement>(
      '.davies-scroll-story [data-kinetic], .story-services .service-specs > .border-glow, .story-portfolio .work-carousel, .story-operator .operator-image-glow, .story-operator .accreditation-marks'
    ));

    let frame = 0;
    let lastProgress = -1;

    function paint(element: HTMLElement | null, fraction: number, offsetPx: number, maxOpacity = 1) {
      if (!element) return;
      const opacity = Math.round(fraction * maxOpacity * 1000) / 1000;
      const offset = Math.round((1 - fraction) * offsetPx * 10) / 10;
      element.style.opacity = String(opacity);
      element.style.transform = `translate3d(0, ${offset}px, 0)`;
    }

    function applyProgress() {
      frame = 0;
      if (!story || !sticky || reduceMotion.matches) return;

      const bounds = story.getBoundingClientRect();
      // Keep the rest of the long homepage free from scroll work.
      if (bounds.top > window.innerHeight * 1.3 || bounds.bottom < -window.innerHeight) return;

      const distance = Math.max(1, story.offsetHeight - sticky.offsetHeight);
      const fraction = clamp(-bounds.top / distance, 0, 1);
      // Avoid redundant DOM writes when scroll progress has barely changed.
      if (Math.abs(fraction - lastProgress) < 0.0015) return;
      lastProgress = fraction;

      const titleIn = clamp((fraction - 0.07) / 0.34, 0, 1);
      const lastIn = clamp((fraction - 0.30) / 0.32, 0, 1);
      const introOut = clamp((0.48 - fraction) / 0.43, 0, 1);

      paint(openingLine, introOut, -14, 0.6);
      paint(firstLine, titleIn, 34);
      paint(secondLine, lastIn, 32);
      subcopy?.classList.toggle('story-visible', fraction >= 0.51);
      credentials?.classList.toggle('story-visible', fraction >= 0.66);
      nextPrompt?.classList.toggle('story-visible', fraction >= 0.72);
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(applyProgress);
    }

    function switchMotionMode() {
      lastProgress = -1;
      const elements = [firstLine, secondLine, openingLine];
      if (reduceMotion.matches) {
        story?.classList.remove('story-motion-enabled');
        for (const element of elements) {
          element?.style.removeProperty('opacity');
          element?.style.removeProperty('transform');
        }
      } else {
        story?.classList.add('story-motion-enabled');
        schedule();
      }
    }

    switchMotionMode();

    // The remaining chapters keep their separate, one-time reveal animations.
    // These run only when an element enters the viewport.
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('kinetic-in');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.11, rootMargin: '0px 0px -6% 0px' });

    if (!reduceMotion.matches) {
      kineticNodes.forEach((node, index) => {
        if (!node.dataset.kinetic) node.dataset.kinetic = 'card';
        node.style.setProperty('--kinetic-delay', `${(index % 5) * 80}ms`);
      });

      kineticNodes.forEach(node => {
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          node.classList.add('kinetic-in');
        }
      });

      document.documentElement.classList.add('home-motion-ready');
      kineticNodes.forEach(node => {
        if (!node.classList.contains('kinetic-in')) observer.observe(node);
      });
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('pageshow', schedule);
    reduceMotion.addEventListener('change', switchMotionMode);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      document.documentElement.classList.remove('home-motion-ready');
      story.classList.remove('story-motion-enabled');
      for (const el of [firstLine, secondLine, openingLine]) {
        el?.style.removeProperty('opacity');
        el?.style.removeProperty('transform');
      }
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('pageshow', schedule);
      reduceMotion.removeEventListener('change', switchMotionMode);
    };
  }, []);

  return null;
}
