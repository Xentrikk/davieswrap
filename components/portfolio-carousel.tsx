'use client';

import Image from 'next/image';
import { useState } from 'react';
import { TiltedCard } from './tilted-card';

const slides = [
  { src: '/images/instagram-01.jpg', width: 1080, height: 1080, title: 'BMW race livery', meta: 'Competition graphics / full livery', url: 'https://www.instagram.com/p/BhQ8hKyBzqw/' },
  { src: '/images/instagram-02.jpg', width: 1080, height: 809, title: 'Porsche GT race livery', meta: 'Motorsport wrap / geometric finish', url: 'https://www.instagram.com/p/Bd21G1HBnFt/' },
  { src: '/images/instagram-03.jpg', width: 1080, height: 637, title: 'Supercars at Silverstone', meta: 'AMG GT / McLaren track project', url: 'https://www.instagram.com/p/BvOz05AlQ0m/' },
  { src: '/images/instagram-04.jpg', width: 1080, height: 868, title: 'Audi touring car', meta: 'High-impact motorsport livery', url: 'https://www.instagram.com/p/BqW9KpzFz7Q/?img_index=1' },
  { src: '/images/instagram-05.jpg', width: 667, height: 618, title: 'Ferrari endurance car', meta: 'Track livery / race preparation', url: 'https://www.instagram.com/p/BXyGHcpB8U3/' },
  { src: '/images/instagram-06.jpg', width: 1080, height: 720, title: 'McLaren night livery', meta: 'Bespoke graphics / illuminated finish', url: 'https://www.instagram.com/p/Bc0Ai3CBS8s/' },
];

export function PortfolioCarousel() {
  const [active, setActive] = useState(0);
  const move = (direction: number) => setActive((current) => (current + direction + slides.length) % slides.length);

  return (
    <section className="work-carousel" aria-roledescription="carousel" aria-label="Chris Davies selected Instagram work">
      <div className="work-stage">
        {slides.map((slide, index) => {
          const delta = (index - active + slides.length) % slides.length;
          const position = delta === 0 ? 'active' : delta === 1 ? 'next' : delta === slides.length - 1 ? 'previous' : 'hidden';
          const card = (
            <article className={`work-card work-card-${position}`} key={slide.url} aria-hidden={position !== 'active'}>
              <div className="work-card-top"><span>{String(index + 1).padStart(2, '0')}</span><span>Selected from @thewrapspecialist</span></div>
              <a className="work-image" href={slide.url} target="_blank" rel="noreferrer" tabIndex={position === 'active' ? 0 : -1} aria-label={`${slide.title} — open original Instagram post`}>
                <Image src={slide.src} width={slide.width} height={slide.height} alt={slide.title} priority={index === 0} />
              </a>
              <div className="work-card-bottom"><div><strong>{slide.title}</strong><small>{slide.meta}</small></div><a href={slide.url} target="_blank" rel="noreferrer" tabIndex={position === 'active' ? 0 : -1}>View original ↗</a></div>
            </article>
          );
          return position === 'active' ? <TiltedCard key={slide.url} caption="View the original work">{card}</TiltedCard> : card;
        })}
      </div>
      <div className="work-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous portfolio image">←</button><span><b>{String(active + 1).padStart(2, '0')}</b> / {String(slides.length).padStart(2, '0')}</span><button type="button" onClick={() => move(1)} aria-label="Next portfolio image">→</button></div>
    </section>
  );
}
