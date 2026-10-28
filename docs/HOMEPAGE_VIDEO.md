# Davies homepage: play-once film hero

**Main site:** `www.cdavies.work`. The approved marina film (workshop, wrapped vehicles and yacht, daylight to sunset) plays once, at normal speed, as soon as the page loads (like the booking page at app.cdavies.work/book). It then rests on its final sunset frame, which stays behind the **ENGINEERED TO LAST.** chapter as that chapter scrolls up over it.

This replaced the scroll-scrubbed version (frames chasing scroll position), which was laggy on a first visit because each frame had to download before it could be shown.

## How it works (`components/hero-film.tsx`, `app/hero-film.css`)
- The film is picked once per visit by orientation: the 1600×904 widescreen film, or the 1080×1920 portrait film on phones held upright.
- The film autoplays muted on page load, showing its poster until it starts. If it hasn't started within 6 seconds (slow connection), it settles on the final frame instead.
- The "SCROLL TO EXPLORE" cue appears once the film has finished.
- **TRUSTED. TRAINED. PROVEN.** builds word by word in time with the film; the orange rule draws in after.
- At the end, the matching final-frame still crossfades in, and the backdrop darkens as the page scrolls (one CSS variable, `--film-shade`).
- The backdrop is `position: sticky` inside `.film-scope`, which wraps the hero and the second chapter, so it stops at the end of that chapter.
- Straight to the final frame, no film: reduced-motion users, autoplay refused (iOS Low Power Mode), a video error, or arriving part-way down the page (reload, back button, `#section` links).
- The headline is only hidden once the script has run, so it's readable without JavaScript.

## Assets (Higgsfield CDN)
- Widescreen film: https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/aa38a087-410c-4285-9f7f-fa5718a3efad.mp4 (10s, ~11.5 MB)
- Portrait film: https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/84e8f177-a84f-4e85-b4bf-9d1df67d6644.mp4 (8s, ~17 MB)
- Posters and final-frame stills are listed in `components/hero-film.tsx`.
- Both films are large for mobile data; re-encoding them to ~2–4 Mbps would make the first play start sooner. Consider moving them to first-party hosting for long-term independence.

Book: https://app.cdavies.work/book. The booking app at `app.cdavies.work` is a separate project.

## Logo
The header uses `public/images/davies-logo-transparent.png` (900×230, real transparency), the same file as the booking page header, so there's no black box behind it on any page.
