'use client';

import Link from 'next/link';
import { useEffect, useRef, type ReactNode } from 'react';
import { contactDetails } from '@/lib/business-data';

// The marina film plays once, start to finish, as soon as the visitor starts
// scrolling - real video playback, so it's smooth from the first gesture
// instead of chasing scroll position frame by frame. It then rests on its
// final sunset frame, which stays behind the next chapter as its background.
const CDN = 'https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/';
const FILMS = {
  // 1600×904, 10s
  wide: {
    video: CDN + 'aa38a087-410c-4285-9f7f-fa5718a3efad.mp4',
    poster: CDN + '255009a6-ca87-45bc-9879-d173d9a8212e.jpg',
    end: CDN + '86fdea6f-cd40-4cee-85cd-11bf54dfb947.webp',
  },
  // 1080×1920, 8s
  portrait: {
    video: CDN + '84e8f177-a84f-4e85-b4bf-9d1df67d6644.mp4',
    poster: CDN + 'f67dcda4-46b8-4e94-b7b5-03ef6231c0b6.jpg',
    end: CDN + '312cd957-dbc6-4800-afcb-43cc6e81d627.webp',
  },
};
const PORTRAIT_QUERY = '(orientation: portrait) and (max-width: 900px)';
// How long a first scroll waits for enough of the film to play smoothly.
const PATIENCE_MS = 6000;

// Headline beats, as fractions of the film's running time.
const BEATS: Array<[string, number]> = [
  ['word-1', 0.12],
  ['word-2', 0.3],
  ['word-3', 0.48],
  ['rule', 0.64],
];

type FilmState = 'ready' | 'playing' | 'done';

export function HeroFilm({ children }: { children?: ReactNode }) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stillRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    const video = videoRef.current;
    const still = stillRef.current;
    if (!scope || !video || !still) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const film = window.matchMedia(PORTRAIT_QUERY).matches ? FILMS.portrait : FILMS.wide;
    let state: FilmState = 'ready';
    let frame = 0;
    let lastShade = -1;

    const setState = (next: FilmState) => {
      state = next;
      scope.dataset.film = next;
    };
    const reveal = (beat: string) => scope.classList.add(`film-beat-${beat}`);
    const finish = () => {
      if (state === 'done') return;
      BEATS.forEach(([beat]) => reveal(beat));
      setState('done');
      video.pause();
    };

    scope.classList.add('film-armed');
    still.src = film.end;
    video.poster = film.poster;

    // Arrived part-way down the page (reload, back button, a #section link)
    // or asked for less motion: go straight to the final frame.
    if (reduceMotion || window.location.hash || window.scrollY > window.innerHeight * 0.4) {
      finish();
    } else {
      video.src = film.video;
      video.load();
      // iOS ignores preload until a video has played, so start it and stop it
      // straight away to get the download going before the first scroll.
      video
        .play()
        .then(() => {
          if (state === 'ready') {
            video.pause();
            video.currentTime = 0;
          }
        })
        .catch(() => {});
    }

    // Only roll once the browser expects to play through without stalling -
    // a stuttering film is worse than none. If that takes too long (slow
    // connection), settle on the final frame instead.
    let giveUp = 0;
    const roll = () => {
      if (state !== 'playing') return;
      window.clearTimeout(giveUp);
      // Autoplay can be refused (e.g. iOS Low Power Mode) - fall back to the still.
      video.play().catch(finish);
    };
    const start = () => {
      if (state !== 'ready') return;
      setState('playing');
      if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) return roll();
      video.addEventListener('canplaythrough', roll, { once: true });
      giveUp = window.setTimeout(finish, PATIENCE_MS);
    };

    const onTime = () => {
      if (!Number.isFinite(video.duration) || !video.duration) return;
      const progress = video.currentTime / video.duration;
      for (const [beat, at] of BEATS) if (progress >= at) reveal(beat);
    };

    // One CSS variable drives the shade over the backdrop as the hero
    // scrolls away; everything else is CSS transitions on state classes.
    const paintShade = () => {
      frame = 0;
      const shade = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      if (Math.abs(shade - lastShade) < 0.004) return;
      lastShade = shade;
      scope.style.setProperty('--film-shade', shade.toFixed(3));
    };

    const onScroll = () => {
      if (window.scrollY > 2) start();
      if (!frame) frame = requestAnimationFrame(paintShade);
    };
    // Scroll intent before the page actually moves (e.g. a trackpad nudge at the top).
    const onIntent = () => start();
    const onKey = (e: KeyboardEvent) => {
      if ([' ', 'ArrowDown', 'PageDown', 'End'].includes(e.key)) start();
    };

    video.addEventListener('timeupdate', onTime);
    video.addEventListener('ended', finish);
    video.addEventListener('error', finish);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onIntent, { passive: true });
    window.addEventListener('touchmove', onIntent, { passive: true });
    window.addEventListener('keydown', onKey);
    paintShade();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(giveUp);
      video.removeEventListener('canplaythrough', roll);
      video.removeEventListener('timeupdate', onTime);
      video.removeEventListener('ended', finish);
      video.removeEventListener('error', finish);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onIntent);
      window.removeEventListener('touchmove', onIntent);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div ref={scopeRef} className="film-scope" data-film="ready">
      <div className="film-backdrop" aria-hidden="true">
        {/* The film's last frame, crossfaded in once it ends. A plain img: its src is
            picked per orientation at runtime, which next/image can't do. */}
        {/* eslint-disable-next-line next/no-img-element */}
        <img ref={stillRef} className="film-still" alt="" decoding="async" />
        <video
          ref={videoRef}
          className="film-video"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
        />
        <div className="film-shade" />
      </div>

      <section
        className="film-hero"
        aria-label="Davies marina workshop, wrapped vehicles and yacht moving from daylight to an orange sunset"
      >
        <div className="film-statement">
          <p className="film-kicker">
            <span className="film-kicker-dash" aria-hidden="true" /> MADE TO STAND OUT. BUILT TO STAY THAT WAY.
          </p>
          <h1 className="film-title" aria-label="Trusted. Trained. Proven.">
            <span className="film-word">TRUSTED.</span>{' '}
            <span className="film-word">TRAINED.</span>{' '}
            <span className="film-word film-word-final">PROVEN.</span>
          </h1>
          <span className="film-rule" aria-hidden="true" />
        </div>

        <div className="film-actions">
          <a className="film-button film-button-book" href={contactDetails.bookingHref}>
            Book <span aria-hidden="true">→</span>
          </a>
          <Link className="film-button film-button-work" href="#instagram-work">
            View Our Work <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="film-cue" aria-hidden="true">
          <span>SCROLL TO THE REVEAL</span>
          <span className="film-cue-arrow">↓</span>
        </div>
      </section>

      {children}
    </div>
  );
}
