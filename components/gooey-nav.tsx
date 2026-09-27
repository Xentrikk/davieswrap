'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, type MouseEvent } from 'react';

type NavItem = { href: string; label: string };
type Particle = { id: number; x: number; y: number; size: number; delay: number; tone: number };

export function GooeyNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [burstAt, setBurstAt] = useState('');

  function makeBurst(href: string) {
    const next = Array.from({ length: 12 }, (_, index) => {
      const angle = (Math.PI * 2 * index) / 12;
      const distance = 30 + (index % 3) * 11;
      return {
        id: Date.now() + index,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: 7 + (index % 3) * 2,
        delay: (index % 4) * 18,
        tone: index % 3,
      };
    });
    setBurstAt(href);
    setParticles(next);
    window.setTimeout(() => setParticles([]), 820);
  }

  function handleNavigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    makeBurst(href);
    if (pathname !== href) window.setTimeout(() => router.push(href), 520);
  }

  return (
    <nav className="gooey-nav" aria-label="Primary navigation">
      <svg className="gooey-filter-defs" aria-hidden="true">
        <defs>
          <filter id="gooey-nav-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <ul>
        {items.map((item, index) => {
          const active = pathname === item.href;
          return (
            <li key={item.href} className={`${active ? 'is-active' : ''} ${burstAt === item.href && particles.length > 0 ? 'is-bursting' : ''}`.trim()}>
              <Link href={item.href} onClick={(event) => handleNavigate(event, item.href)} aria-current={active ? 'page' : undefined}>
                <span className="gooey-nav-number">0{index + 1}</span>
                <span>{item.label}</span>
              </Link>
              {burstAt === item.href && particles.length > 0 && (
                <span className="gooey-particles" aria-hidden="true">
                  {particles.map((particle) => (
                    <i
                      key={particle.id}
                      data-tone={particle.tone}
                      style={{
                        '--particle-x': `${particle.x}px`,
                        '--particle-y': `${particle.y}px`,
                        '--particle-size': `${particle.size}px`,
                        '--particle-delay': `${particle.delay}ms`,
                      } as React.CSSProperties}
                    />
                  ))}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
