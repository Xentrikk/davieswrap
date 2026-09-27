'use client';

import { useEffect } from 'react';

export function RevealInit() {
  useEffect(() => {
    const selectors = [
      'main > section:not(.hero-cinematic) > *',
      '.section-heading > *',
      '.service-bay-head > *',
      '.service-specs > .border-glow',
      '.rate-grid > .border-glow',
      '.detail-columns > .border-glow',
      '.contact-grid > *',
      '.visual-intro-copy > *',
      '.cta-strip > *',
      '.footer-lead',
      '.footer-contact',
    ];
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selectors.join(',')));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.documentElement.classList.add('reveal-ready');
    elements.forEach((element, index) => {
      element.dataset.reveal = '';
      element.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`);
    });

    if (reduceMotion) {
      elements.forEach((element) => element.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
