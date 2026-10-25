'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { contactDetails } from '@/lib/business-data';

// Davies marina film, re-encoded with keyframes every four frames for accurate,
// bi-directional scroll seeking. The video deliberately NEVER autoplays.
const INTRO_VIDEO = 'https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/aa38a087-410c-4285-9f7f-fa5718a3efad.mp4';
const INTRO_POSTER = 'https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/255009a6-ca87-45bc-9879-d173d9a8212e.jpg';

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.max(minimum, Math.min(maximum, value));

export function AutomotiveHero() {
  const trackRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const meterRef = useRef<HTMLSpanElement>(null);
  const percentageRef = useRef<HTMLOutputElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const video = videoRef.current;
    if (!track || !video) return;

    let scheduled = 0;
    let wantedTime = 0;
    let lastPercent = -1;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    video.pause();

    function seekToWantedTime() {
      if (!video || motionPreference.matches || video.readyState < 1 || video.seeking) return;
      if (Math.abs(video.currentTime - wantedTime) <= 0.045) return;
      try {
        video.currentTime = wantedTime;
      } catch {
        // Wait for video metadata / seekable data if this browser needs it.
      }
    }

    function update() {
      scheduled = 0;
      if (!track || !video) return;

      // The video stays sticky while the surrounding track scrolls past.
      // Reversing page scroll reverses the film, with no jump cut.
      const distance = Math.max(1, track.offsetHeight - window.innerHeight);
      const progress = motionPreference.matches
        ? 0
        : clamp(-track.getBoundingClientRect().top / distance, 0, 1);

      if (meterRef.current) {
        meterRef.current.style.transform = `scaleX(${progress})`;
      }
      const percent = Math.round(progress * 100);
      if (percent !== lastPercent) {
        lastPercent = percent;
        if (percentageRef.current) percentageRef.current.textContent = `${percent}%`;
        progressRef.current?.setAttribute('aria-valuenow', String(percent));
      }
      if (Number.isFinite(video.duration) && video.duration > 0) {
        // Seek just inside the final video frame, avoiding "ended" reset.
        wantedTime = progress * Math.max(0, video.duration - 0.018);
        seekToWantedTime();
      }
    }

    function requestUpdate() {
      if (!scheduled) scheduled = window.requestAnimationFrame(update);
    }

    function onMetadataReady() {
      video.pause();
      requestUpdate();
    }

    function onSeeked() {
      // Scroll may move again while the previous frame is decoding.
      // Always converge on the latest requested position, not an old seek.
      if (Math.abs(video.currentTime - wantedTime) > 0.075) requestUpdate();
    }

    function onMotionChange() {
      video.pause();
      requestUpdate();
    }

    video.addEventListener('loadedmetadata', onMetadataReady);
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('play', onMotionChange);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    window.addEventListener('pageshow', requestUpdate);
    motionPreference.addEventListener('change', onMotionChange);
    requestUpdate();

    return () => {
      if (scheduled) window.cancelAnimationFrame(scheduled);
      video.removeEventListener('loadedmetadata', onMetadataReady);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('play', onMotionChange);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.removeEventListener('pageshow', requestUpdate);
      motionPreference.removeEventListener('change', onMotionChange);
    };
  }, []);

  return (
    <section
      ref={trackRef}
      className="scroll-film-track"
      aria-label="Davies Wrap Specialist scroll-controlled cinematic introduction"
    >
      <div className="hero-showcase hero-showcase-cinematic scroll-film-stage">
        <video
          ref={videoRef}
          className="hero-showcase-video"
          playsInline
          muted
          preload="auto"
          poster={INTRO_POSTER}
          disablePictureInPicture
          controls={false}
          aria-label="Davies marina workshop, wrapped vehicles and yacht moving smoothly from daylight to a dramatic orange sunset as you scroll"
        >
          <source src={INTRO_VIDEO} type="video/mp4" />
        </video>

        <div className="scroll-film-hud">
          <div className="scroll-film-progress-wrap">
            <span className="scroll-film-kicker">SCROLL TO REVEAL</span>
            <div
              ref={progressRef}
              className="scroll-film-progress"
              role="progressbar"
              aria-label="Intro animation progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={0}
            >
              <span ref={meterRef} className="scroll-film-progress-fill" />
            </div>
            <output ref={percentageRef} className="scroll-film-percentage">0%</output>
          </div>
          <a href="#after-intro" className="scroll-film-skip">Skip intro <span aria-hidden="true">↘</span></a>
        </div>

        <div className="hero-showcase-mobile-copy">
          <p className="hero-showcase-eyebrow">DAVIES / THE WRAP SPECIALIST</p>
          <h1>NOT JUST WRAPPED.<br /><em>ENGINEERED TO LAST.</em></h1>
          <p>Over 20 years of specialist film installation. Arlon Fleet and Restyling certified. STEK PPF approved.</p>
        </div>

        <div className="hero-showcase-actions">
          <a className="hero-showcase-button hero-showcase-quote" href={contactDetails.bookingHref}>
            Book <span aria-hidden="true">→</span>
          </a>
          <Link className="hero-showcase-button hero-showcase-work" href="#instagram-work">
            View Our Work <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="scroll-film-prompt" aria-hidden="true">
          <span>SCROLL DOWN</span>
          <span className="scroll-film-arrow">↓</span>
        </div>
      </div>
    </section>
  );
}
