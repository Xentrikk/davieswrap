'use client';

import { useEffect } from 'react';

const clamp = (number: number, min: number, max: number) =>
  Math.max(min, Math.min(max, number));

export function HomeMotion() {
  useEffect(() => {
    const story = document.querySelector<HTMLElement>('[data-story-track]');
    const sticky = story?.querySelector<HTMLElement>('.story-second-stage');
    if (!story || !sticky) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const kineticNodes = Array.from(document.querySelectorAll<HTMLElement>(
      '.davies-scroll-story [data-kinetic], .story-services .service-specs > .border-glow, .story-portfolio .work-carousel, .story-operator .operator-image-glow, .story-operator .accreditation-marks'
    ));
    let frame = 0;

    function applyProgress() {
      frame = 0;
      if (!story || !sticky) return;
      if (reduceMotion.matches) {
        story.style.setProperty('--story-head', '1');
        story.style.setProperty('--story-ink', '1');
        story.style.setProperty('--story-sub', '1');
        story.style.setProperty('--story-stats', '1');
        story.style.setProperty('--story-echo', '0');
        return;
      }

      // The pinned chapter is precisely tied to scroll progress.
      const distance = Math.max(1, story.offsetHeight - sticky.offsetHeight);
      const value = clamp(-story.getBoundingClientRect().top / distance, 0, 1);
      story.style.setProperty('--story-head', String(clamp((value - 0.06) / 0.5, 0, 1)));
      story.style.setProperty('--story-ink', String(clamp((value - 0.26) / 0.40, 0, 1)));
      story.style.setProperty('--story-sub', String(clamp((value - 0.48) / 0.29, 0, 1)));
      story.style.setProperty('--story-stats', String(clamp((value - 0.59) / 0.31, 0, 1)));
      story.style.setProperty('--story-echo', String(clamp((0.56 - value) / 0.56, 0, 1)));
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(applyProgress);
    }

    applyProgress();

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

      // Mark elements already inside the viewport before hiding pending ones.
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

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      document.documentElement.classList.remove('home-motion-ready');
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('pageshow', schedule);
    };
  }, []);

  return null;
}
