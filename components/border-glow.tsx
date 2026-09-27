'use client';

import type { PointerEvent, ReactNode } from 'react';

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
};

export function BorderGlow({ children, className = '' }: BorderGlowProps) {
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const dx = x - bounds.width / 2;
    const dy = y - bounds.height / 2;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    const edgeX = Math.abs(dx) / (bounds.width / 2);
    const edgeY = Math.abs(dy) / (bounds.height / 2);
    const proximity = Math.max(edgeX, edgeY);
    element.style.setProperty('--glow-angle', `${angle}deg`);
    element.style.setProperty('--glow-x', `${x}px`);
    element.style.setProperty('--glow-y', `${y}px`);
    element.style.setProperty('--glow-opacity', `${Math.max(0.18, proximity)}`);
  }

  return (
    <div
      className={`border-glow ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={(event) => event.currentTarget.style.setProperty('--glow-visible', '1')}
      onPointerLeave={(event) => event.currentTarget.style.setProperty('--glow-visible', '0')}
    >
      <span className="border-glow-aura" aria-hidden="true" />
      <div className="border-glow-content">{children}</div>
    </div>
  );
}
