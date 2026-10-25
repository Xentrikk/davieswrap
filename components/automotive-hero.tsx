'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { contactDetails } from '@/lib/business-data';

// Uploaded Davies marina intro, web-optimised from the approved MP4.
// These URLs are the current hosted assets. For long-term self-hosting,
// copy the files into /public/videos and /public/images and change the constants.
const INTRO_VIDEO = 'https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/97e99ffe-d129-4491-98ab-a03080109cb3.mp4';
const INTRO_POSTER = 'https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/255009a6-ca87-45bc-9879-d173d9a8212e.jpg';

export function AutomotiveHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);
  const [needsPlay, setNeedsPlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Respect visitors who explicitly prefer less motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setNeedsPlay(true);
      return;
    }

    // Browsers allow autoplay when the video is muted and plays inline.
    video.muted = true;
    void video.play().catch(() => setNeedsPlay(true));
  }, []);

  function replay() {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setHasEnded(false);
    setNeedsPlay(false);
    void video.play().catch(() => setNeedsPlay(true));
  }

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  }

  return (
    <section className="hero-showcase hero-showcase-cinematic" aria-label="Davies Wrap Specialist cinematic introduction">
      <video
        ref={videoRef}
        className="hero-showcase-video"
        playsInline
        muted={isMuted}
        preload="auto"
        poster={INTRO_POSTER}
        onEnded={() => setHasEnded(true)}
        onPlay={() => { setHasEnded(false); setNeedsPlay(false); }}
        onError={() => setNeedsPlay(true)}
        aria-label="Davies marina wrapping studio with vehicles and yacht, transforming from daylight to an orange sunset"
      >
        <source src={INTRO_VIDEO} type="video/mp4" />
      </video>

      <div className="hero-showcase-mobile-copy">
        <p className="hero-showcase-eyebrow">DAVIES / THE WRAP SPECIALIST</p>
        <h1>NOT JUST WRAPPED.<br /><em>ENGINEERED TO LAST.</em></h1>
        <p>Over 20 years of specialist film installation. Arlon Fleet and Restyling certified. STEK PPF approved.</p>
      </div>

      <div className="hero-showcase-actions">
        <a className="hero-showcase-button hero-showcase-quote" href={contactDetails.bookingHref}>Book <span aria-hidden="true">→</span></a>
        <Link className="hero-showcase-button hero-showcase-work" href="#instagram-work">View Our Work <span aria-hidden="true">→</span></Link>
      </div>

      <div className="hero-showcase-controls" aria-label="Intro playback controls">
        {(hasEnded || needsPlay) && (
          <button type="button" onClick={replay} aria-label={hasEnded ? 'Replay the intro' : 'Play the intro'}>
            {hasEnded ? '↻ Replay' : '▶ Play'}
          </button>
        )}
        <button type="button" onClick={toggleSound} aria-label={isMuted ? 'Turn intro sound on' : 'Mute intro sound'} aria-pressed={!isMuted}>
          {isMuted ? 'Sound off' : 'Sound on'}
        </button>
      </div>
    </section>
  );
}
