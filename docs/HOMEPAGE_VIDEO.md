# Davies homepage: scroll-controlled cinema

The approved **10-second Davies marina film** is controlled by page scroll position, **not autoplay**.

## Experience
- The introduction pins in place for about 205% of the viewport's scroll distance.
- Scrolling down advances the film from its opening frame to the sunset finale.
- Scrolling up reverses the same sequence.
- Visitors can choose **Skip intro**, **Book** (https://app.cdavies.work/book), or **View Our Work**.
- A visible progress bar tracks the sequence.
- No sound is played: audio scrubbing would be distracting.
- Narrow screens show the full width of the film and move the heading / CTA below it without hiding the vehicles or yacht.
- Reduced-motion visitors see a static introduction and can proceed normally.

## Technical
- Scroll playback media: `https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/aa38a087-410c-4285-9f7f-fa5718a3efad.mp4`
- Poster image: `https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/255009a6-ca87-45bc-9879-d173d9a8212e.jpg`
- The MP4 is recoded as a 1600×904 H.264 video with an **I-frame every 4 frames (0.167 seconds)** for responsive seeking in either direction.
- No new imagery was generated. The approved video content itself was not re-edited.
- Implementation lives in `components/automotive-hero.tsx` and the last portion of `app/portfolio-live.css`.
- The hosting CDN is third-party. For permanent first-party storage, download both assets and serve them from your own `/public` paths, then update the constants in the component.

## Scope
Only the main `www.cdavies.work` source is changed. The booking application at `app.cdavies.work` is untouched, and the older black-bonnet intro remains available for a later booking-site project.
