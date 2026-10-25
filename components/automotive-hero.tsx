'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { contactDetails } from '@/lib/business-data';
import { DAVIES_DESKTOP_FRAMES, DAVIES_MOBILE_FRAMES } from '@/lib/davies-hd-frames';

const INTRO_VIDEO = 'https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/aa38a087-410c-4285-9f7f-fa5718a3efad.mp4';
const INTRO_POSTER = 'https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/255009a6-ca87-45bc-9879-d173d9a8212e.jpg';
const MOBILE_FRAME_QUERY = '(pointer: coarse), (max-width: 760px)';
const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value));

export function AutomotiveHero() {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLSpanElement>(null);
  const percentageRef = useRef<HTMLOutputElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!track || !stage || !canvas || !video) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileMedia = window.matchMedia(MOBILE_FRAME_QUERY);
    const cache = new Map<string, HTMLImageElement>();
    const queued = new Set<string>();
    const waiting: Array<{ key: string; src: string }> = [];
    let inFlight = 0;
    let requestId = 0;
    let desired = 0;
    let renderedKey = '';
    let lastPercent = -1;
    let lastMobile = mobileMedia.matches;
    let lastSelected = 0;
    let destroyed = false;

    video.pause();
    video.preload = 'none';
    track.classList.toggle('intro-kinetic-active', !reduceMotion.matches);

    function trimCache() {
      if (cache.size <= 16) return;
      const prefix = lastMobile ? 'm:' : 'd:';
      const deletable = [...cache.keys()]
        .filter(key => key !== renderedKey && key !== prefix + desired)
        .sort((a, b) => {
          const distance = (key: string) => key.startsWith(prefix)
            ? Math.abs(Number(key.split(':')[1]) - desired) : 1000;
          return distance(b) - distance(a);
        });
      for (const key of deletable) {
        if (cache.size <= 13) break;
        cache.delete(key);
      }
    }

    function requestUpdate() {
      if (!requestId && !destroyed) requestId = window.requestAnimationFrame(update);
    }

    function enqueue(index: number, urgent = false) {
      const items = lastMobile ? DAVIES_MOBILE_FRAMES : DAVIES_DESKTOP_FRAMES;
      if (index < 0 || index >= items.length) return;
      const key = (lastMobile ? 'm:' : 'd:') + index;
      if (cache.has(key) || queued.has(key)) return;
      queued.add(key);
      const job = { key, src: items[index] };
      if (urgent) waiting.unshift(job);
      else waiting.push(job);
      pump();
    }

    function pump() {
      while (inFlight < 4 && waiting.length && !destroyed) {
        const job = waiting.shift()!;
        if (!queued.has(job.key)) continue;
        inFlight++;
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          inFlight--;
          queued.delete(job.key);
          if (!destroyed) {
            cache.set(job.key, img);
            trimCache();
            if (job.key === (lastMobile ? 'm:' : 'd:') + desired || !renderedKey) requestUpdate();
            pump();
          }
        };
        img.onerror = () => {
          inFlight--;
          queued.delete(job.key);
          if (!destroyed) pump();
        };
        img.src = job.src;
      }
    }

    function preloadNear(index: number, direction: number) {
      enqueue(index, true);
      for (let offset = 1; offset <= 5; offset++) enqueue(index + direction * offset, offset <= 2);
      for (let offset = 1; offset <= 3; offset++) enqueue(index - direction * offset);
      if (waiting.length > 22) {
        const prefix = lastMobile ? 'm:' : 'd:';
        const near = waiting.filter(job =>
          job.key.startsWith(prefix) && Math.abs(Number(job.key.split(':')[1]) - index) <= 9
        );
        waiting.length = 0;
        waiting.push(...near);
        for (const key of [...queued]) {
          if (!cache.has(key) && !waiting.some(job => job.key === key) && key !== renderedKey) {
            // Started requests will finish; the current target gets priority.
            queued.delete(key);
          }
        }
      }
    }

    function draw(index: number) {
      const key = (lastMobile ? 'm:' : 'd:') + index;
      const image = cache.get(key);
      if (!image || !canvas || !context || key === renderedKey) return;
      try {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        renderedKey = key;
        canvas.dataset.frame = String(index);
        canvas.dataset.quality = 'native-full-hd';
      } catch { /* Keep the previous decoded frame visible. */ }
    }

    function update() {
      requestId = 0;
      if (!track || !stage || !canvas || destroyed) return;
      const isMobile = mobileMedia.matches;
      if (isMobile !== lastMobile) {
        lastMobile = isMobile;
        renderedKey = '';
        canvas.width = isMobile ? 1080 : 1912;
        canvas.height = isMobile ? 1920 : 1080;
      }
      const distance = Math.max(1, track.offsetHeight - stage.offsetHeight);
      const progress = reduceMotion.matches ? 0 :
        clamp(-track.getBoundingClientRect().top / distance, 0, 1);

      if (meterRef.current) meterRef.current.style.transform = `scaleX(${progress})`;
      if (lineRef.current && !reduceMotion.matches) {
        const line = lineRef.current;
        line.style.setProperty('--intro-first', String(clamp((progress - .19) / .24, 0, 1)));
        line.style.setProperty('--intro-second', String(clamp((progress - .34) / .25, 0, 1)));
        line.style.setProperty('--intro-third', String(clamp((progress - .49) / .27, 0, 1)));
        line.style.setProperty('--intro-underline', String(clamp((progress - .56) / .35, 0, 1)));
        line.style.setProperty('--intro-eyebrow', String(clamp((progress - .09) / .20, 0, 1)));
      }
      const percent = Math.round(progress * 100);
      if (percent !== lastPercent) {
        lastPercent = percent;
        if (percentageRef.current) percentageRef.current.textContent = percent + '%';
        progressRef.current?.setAttribute('aria-valuenow', String(percent));
      }
      const count = isMobile ? DAVIES_MOBILE_FRAMES.length : DAVIES_DESKTOP_FRAMES.length;
      const next = Math.round(progress * (count - 1));
      const direction = next >= lastSelected ? 1 : -1;
      lastSelected = next;
      desired = next;
      preloadNear(next, direction);
      draw(next);
    }

    function onModeChange() {
      video.pause();
      track?.classList.toggle('intro-kinetic-active', !reduceMotion.matches);
      requestUpdate();
    }

    const onScroll = () => requestUpdate();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('pageshow', onScroll);
    mobileMedia.addEventListener('change', onModeChange);
    reduceMotion.addEventListener('change', onModeChange);
    enqueue(0, true);
    enqueue(1, true);
    enqueue(2);
    requestUpdate();

    return () => {
      destroyed = true;
      if (requestId) cancelAnimationFrame(requestId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('pageshow', onScroll);
      mobileMedia.removeEventListener('change', onModeChange);
      reduceMotion.removeEventListener('change', onModeChange);
      track.classList.remove('intro-kinetic-active');
      waiting.length = 0;
      cache.clear();
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
          width={1912}
          height={1080}
          aria-hidden="true"
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
