'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { useState, type PointerEvent, type ReactNode } from 'react';

type TiltedCardProps = {
  children: ReactNode;
  caption?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
};

const spring = { stiffness: 165, damping: 24, mass: 0.7 };

export function TiltedCard({
  children,
  caption = 'Open original on Instagram',
  rotateAmplitude = 7,
  scaleOnHover = 1.025,
}: TiltedCardProps) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const rotateXTarget = useMotionValue(0);
  const rotateYTarget = useMotionValue(0);
  const scaleTarget = useMotionValue(1);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(rotateXTarget, spring);
  const rotateY = useSpring(rotateYTarget, spring);
  const scale = useSpring(scaleTarget, spring);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    pointerX.set(x + 18);
    pointerY.set(y + 18);
    if (reduceMotion) return;
    rotateXTarget.set(((y / bounds.height) - 0.5) * -2 * rotateAmplitude);
    rotateYTarget.set(((x / bounds.width) - 0.5) * 2 * rotateAmplitude);
  }

  function handlePointerEnter() {
    setHovered(true);
    if (!reduceMotion) scaleTarget.set(scaleOnHover);
  }

  function handlePointerLeave() {
    setHovered(false);
    scaleTarget.set(1);
    rotateXTarget.set(0);
    rotateYTarget.set(0);
  }

  return (
    <div
      className="tilted-card"
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="tilted-card-surface"
        style={hovered && !reduceMotion ? { rotateX, rotateY, scale, transformStyle: 'preserve-3d' } : undefined}
      >
        {children}
        <span className="tilted-card-reflection" aria-hidden="true" />
      </motion.div>
      <motion.span className="tilted-card-caption" style={{ x: pointerX, y: pointerY }}>
        {caption} ↗
      </motion.span>
    </div>
  );
}
