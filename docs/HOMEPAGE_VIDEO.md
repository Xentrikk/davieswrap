# Davies homepage video

The live homepage uses **davies_matte_black_final(1).mp4**, supplied for the main Davies site in October 2026, not the older matte-black bonnet scrolling intro reserved for a future booking-site project.

## Playback
- Single autoplay pass, muted by default (browser autoplay policy).
- Intro freezes on its final sunset frame instead of looping to daylight.
- Replay and sound controls are provided.
- Respect reduced-motion preferences.
- On small screens, the entire 16:9 video is shown above the headline to prevent cropping important vehicle/marina details.

## Media
- Web-optimised H.264/AAC (about 4.5 MB): `https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/97e99ffe-d129-4491-98ab-a03080109cb3.mp4`
- Matching poster image (about 219 KB): `https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/255009a6-ca87-45bc-9879-d173d9a8212e.jpg`
- Unmodified original remains in the user's uploaded files, not in the repository.

The video and poster are currently served from the connected Higgsfield CDN. For long-term hosting under the business domain, copy these exact assets to `public/videos/davies-home-intro.mp4` and `public/images/davies-home-intro-poster.jpg`, then change the `INTRO_VIDEO` and `INTRO_POSTER` constants in `components/automotive-hero.tsx` to use the local URLs. Review CDN storage policy before relying on a third-party hosted asset permanently.

The booking site at `app.cdavies.work` was **not** changed.
