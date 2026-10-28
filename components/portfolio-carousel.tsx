'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const slides = [
  { src: '/images/instagram-01.jpg', width: 1080, height: 1080, title: 'BMW race livery', meta: 'Competition graphics / full livery', url: 'https://www.instagram.com/p/BhQ8hKyBzqw/' },
  { src: '/images/instagram-02.jpg', width: 1080, height: 809, title: 'Porsche GT race livery', meta: 'Motorsport wrap / geometric finish', url: 'https://www.instagram.com/p/Bd21G1HBnFt/' },
  { src: '/images/instagram-03.jpg', width: 1080, height: 637, title: 'Supercars at Silverstone', meta: 'AMG GT / McLaren track project', url: 'https://www.instagram.com/p/BvOz05AlQ0m/' },
  { src: '/images/instagram-04.jpg', width: 1080, height: 868, title: 'Audi touring car', meta: 'High-impact motorsport livery', url: 'https://www.instagram.com/p/BqW9KpzFz7Q/?img_index=1' },
  { src: '/images/instagram-05.jpg', width: 667, height: 618, title: 'Ferrari endurance car', meta: 'Track livery / race preparation', url: 'https://www.instagram.com/p/BXyGHcpB8U3/' },
  { src: '/images/instagram-06.jpg', width: 1080, height: 720, title: 'McLaren night livery', meta: 'Bespoke graphics / illuminated finish', url: 'https://www.instagram.com/p/Bc0Ai3CBS8s/' },
];

// A native scroll-snap gallery: swipe on phones, arrows on desktop (tabbing
// through the cards scrolls them into view too). The browser does the
// scrolling, so it stays smooth and always lines up with the screen.
export function PortfolioCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = track.scrollWidth - track.clientWidth;
      setProgress(max > 0 ? track.scrollLeft / max : 1);
      setAtStart(track.scrollLeft < 4);
      setAtEnd(track.scrollLeft > max - 4);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const move = (direction: number) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  return (
    <section className="ig-gallery" aria-roledescription="carousel" aria-label="Chris Davies selected Instagram work">
      <div className="ig-track" ref={trackRef}>
        {slides.map((slide, index) => (
          <a className="ig-card" key={slide.url} href={slide.url} target="_blank" rel="noreferrer" aria-label={`${slide.title}, open the original Instagram post`}>
            <Image src={slide.src} width={slide.width} height={slide.height} alt={slide.title} sizes="(max-width: 700px) 84vw, 33vw" priority={index === 0} />
            <span className="ig-card-index">{String(index + 1).padStart(2, '0')}</span>
            <span className="ig-card-caption">
              <span>
                <strong>{slide.title}</strong>
                <small>{slide.meta}</small>
              </span>
              <b aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" /></svg>
              </b>
            </span>
          </a>
        ))}
      </div>
      <div className="ig-controls">
        <span className="ig-progress" aria-hidden="true"><i style={{ transform: `scaleX(${0.12 + progress * 0.88})` }} /></span>
        <button type="button" onClick={() => move(-1)} disabled={atStart} aria-label="Previous projects">←</button>
        <button type="button" onClick={() => move(1)} disabled={atEnd} aria-label="More projects">→</button>
      </div>
    </section>
  );
}
