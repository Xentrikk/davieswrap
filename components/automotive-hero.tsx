'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { contactDetails } from '@/lib/business-data';

// Davies marina film, re-encoded with keyframes every four frames for accurate,
// bi-directional scroll seeking. The video deliberately NEVER autoplays.
const INTRO_VIDEO = 'https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/aa38a087-410c-4285-9f7f-fa5718a3efad.mp4';
const PHONE_VIDEO = 'https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/84e8f177-a84f-4e85-b4bf-9d1df67d6644.mp4';
const MOBILE_POSTER = 'https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/f67dcda4-46b8-4e94-b7b5-03ef6231c0b6.jpg';
const INTRO_POSTER = 'https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/255009a6-ca87-45bc-9879-d173d9a8212e.jpg';

// Mobile browsers (especially iOS Safari) can stall when seeking a paused MP4.
// Each sheet holds 25 frames arranged in a 5×5 grid. Together they reproduce
// the same approved 10-second film without the mobile video-decoder dependency.
const MOBILE_FRAME_SHEETS = [
  'https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/7149b856-b795-4389-9642-cfa64b862c12.webp',
  'https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/8b8d75aa-7737-4642-995e-edcba4248fbd.webp',
  'https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/d68e9b6c-a75c-4d1f-99cf-8b020ff8e7f9.webp',
  'https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/2cd94058-ceb1-4d62-8e66-90418575c8e1.webp',
  'https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/54e18319-87df-4c9f-8eb4-b5f8f70448db.webp',
];
const FRAME_WIDTH = 480;
const FRAME_HEIGHT = 854;
const SHEET_COLUMNS = 5;
const FRAMES_PER_SHEET = 20;
const FRAME_COUNT = 100;
const MOBILE_FRAME_QUERY = '(pointer: coarse), (max-width: 760px)';

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.max(minimum, Math.min(maximum, value));

export function AutomotiveHero() {
  const trackRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meterRef = useRef<HTMLSpanElement>(null);
  const percentageRef = useRef<HTMLOutputElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!track || !stage || !video || !canvas) return;

    let scheduled = 0;
    let wantedTime = 0;
    let lastPercent = -1;
    let lastFrame = -1;
    let framesStarted = false;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileMedia = window.matchMedia(MOBILE_FRAME_QUERY);
    const imageSheets: HTMLImageElement[] = [];

    video.pause();
    const enableKinetic = !motionPreference.matches;
    track.classList.toggle('intro-kinetic-active', enableKinetic);

    function requestUpdate() {
      if (!scheduled) scheduled = window.requestAnimationFrame(update);
    }

    function loadMobileFrames() {
      if (framesStarted || !canvas) return;
      framesStarted = true;

      // A small, fixed-size canvas avoids MP4 seek failures on phones.
      // Its poster background remains visible until the appropriate sheet loads.
      const context = canvas.getContext('2d');
      if (!context) return;

      MOBILE_FRAME_SHEETS.forEach((source, sheetIndex) => {
        const sheet = new Image();
        sheet.decoding = 'async';
        sheet.onload = () => {
          if (sheetIndex === 0 || mobileMedia.matches) requestUpdate();
        };
        sheet.onerror = () => {
          // Preserve the supplied poster instead of leaving a blank video.
          requestUpdate();
        };
        imageSheets.push(sheet);
        sheet.src = source;
      });
    }

    function drawMobileFrame(progress: number) {
      if (!canvas) return;
      const frame = clamp(Math.round(progress * (FRAME_COUNT - 1)), 0, FRAME_COUNT - 1);
      if (lastFrame === frame) return;

      const sheetIndex = Math.floor(frame / FRAMES_PER_SHEET);
      const sheet = imageSheets[sheetIndex];
      if (!sheet || !sheet.complete || sheet.naturalWidth === 0) return;

      const tileIndex = frame % FRAMES_PER_SHEET;
      const sourceX = (tileIndex % SHEET_COLUMNS) * FRAME_WIDTH;
      const sourceY = Math.floor(tileIndex / SHEET_COLUMNS) * FRAME_HEIGHT;
      const context = canvas.getContext('2d');
      if (!context) return;

      context.drawImage(
        sheet,
        sourceX, sourceY, FRAME_WIDTH, FRAME_HEIGHT,
        0, 0, FRAME_WIDTH, FRAME_HEIGHT,
      );
      lastFrame = frame;
      canvas.dataset.frame = String(frame);
    }

    function seekToWantedTime() {
      if (!video || mobileMedia.matches || motionPreference.matches || video.readyState < 1 || video.seeking) return;
      if (Math.abs(video.currentTime - wantedTime) <= 0.045) return;
      try { video.currentTime = wantedTime; } catch { /* Retry once the video is seekable. */ }
    }

    function update() {
      scheduled = 0;
      if (!track || !video || !stage) return;

      // The pinned stage uses a stable small viewport height (svh).
      // iOS changes window.innerHeight as browser toolbars collapse, so use
      // the stage's physical height to avoid jumps and reverse-scroll glitches.
      const distance = Math.max(1, track.offsetHeight - stage.offsetHeight);
      const progress = motionPreference.matches
        ? 0
        : clamp(-track.getBoundingClientRect().top / distance, 0, 1);

      if (meterRef.current) meterRef.current.style.transform = `scaleX(${progress})`;
      if (lineRef.current && !motionPreference.matches) {
        // Each trust-and-skill statement rises in sequence through the marina-to-sunset transition.
        lineRef.current.style.setProperty('--intro-first', String(clamp((progress - 0.19) / 0.24, 0, 1)));
        lineRef.current.style.setProperty('--intro-second', String(clamp((progress - 0.34) / 0.25, 0, 1)));
        lineRef.current.style.setProperty('--intro-third', String(clamp((progress - 0.49) / 0.27, 0, 1)));
        lineRef.current.style.setProperty('--intro-underline', String(clamp((progress - 0.56) / 0.35, 0, 1)));
        lineRef.current.style.setProperty('--intro-eyebrow', String(clamp((progress - 0.09) / 0.20, 0, 1)));
      }
      const percent = Math.round(progress * 100);
      if (percent !== lastPercent) {
        lastPercent = percent;
        if (percentageRef.current) percentageRef.current.textContent = `${percent}%`;
        progressRef.current?.setAttribute('aria-valuenow', String(percent));
      }

      if (mobileMedia.matches) {
        if (!motionPreference.matches) loadMobileFrames();
        drawMobileFrame(progress);
      } else if (Number.isFinite(video.duration) && video.duration > 0) {
        wantedTime = progress * Math.max(0, video.duration - 0.018);
        seekToWantedTime();
      }
    }

    function onMetadataReady() {
      video.pause();
      requestUpdate();
    }

    function onSeeked() {
      if (!mobileMedia.matches && Math.abs(video.currentTime - wantedTime) > 0.075) requestUpdate();
    }

    function onPlay() {
      video.pause();
      requestUpdate();
    }

    function onModeChange() {
      video.pause();
      if (mobileMedia.matches) {
        video.preload = 'none';
        if (!motionPreference.matches) loadMobileFrames();
      } else {
        video.preload = 'auto';
        video.load();
      }
      requestUpdate();
    }

    function onMotionChange() {
      video.pause();
      requestUpdate();
    }

    video.addEventListener('loadedmetadata', onMetadataReady);
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('play', onPlay);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    window.addEventListener('pageshow', requestUpdate);
    mobileMedia.addEventListener('change', onModeChange);
    motionPreference.addEventListener('change', onMotionChange);

    onModeChange();

    return () => {
      if (scheduled) window.cancelAnimationFrame(scheduled);
      video.removeEventListener('loadedmetadata', onMetadataReady);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('play', onPlay);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.removeEventListener('pageshow', requestUpdate);
      mobileMedia.removeEventListener('change', onModeChange);
      motionPreference.removeEventListener('change', onMotionChange);
      track.classList.remove('intro-kinetic-active');
      for (const image of imageSheets) {
        image.onload = null;
        image.onerror = null;
      }
    };

  }, []);

  return (
    <section
      ref={trackRef}
      className="scroll-film-track"
      aria-label="Davies Wrap Specialist scroll-controlled cinematic introduction"
    >
      <div ref={stageRef} className="hero-showcase hero-showcase-cinematic scroll-film-stage">
        <video
          ref={videoRef}
          className="hero-showcase-video"
          playsInline
          muted
          preload="none"
          poster={INTRO_POSTER}
          disablePictureInPicture
          controls={false}
          aria-label="Davies marina workshop, wrapped vehicles and yacht moving smoothly from daylight to a dramatic orange sunset as you scroll"
        >
          <source src={INTRO_VIDEO} type="video/mp4" />
        </video>
        <canvas
          ref={canvasRef}
          className="hero-showcase-frames"
          width={FRAME_WIDTH}
          height={FRAME_HEIGHT}
          aria-hidden="true"
          style={{ backgroundImage: `url("${MOBILE_POSTER}")` }}
        />

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

        <div ref={lineRef} className="intro-statement">
          <p className="intro-statement-kicker"><span className="intro-kicker-dash" aria-hidden="true" /> MADE TO STAND OUT. BUILT TO STAY THAT WAY.</p>
          <h1 className="intro-statement-title" aria-label="Trusted. Trained. Proven.">
            <span className="intro-word">TRUSTED.</span>{' '}
            <span className="intro-word">TRAINED.</span>{' '}
            <span className="intro-word intro-word-final">PROVEN.</span>
          </h1>
          <span className="intro-statement-rule" aria-hidden="true" />
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
          <span>SCROLL TO THE REVEAL</span>
          <span className="scroll-film-arrow">↓</span>
        </div>
      </div>
    </section>
  );
}
