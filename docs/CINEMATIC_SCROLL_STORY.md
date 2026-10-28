# Davies cinematic scroll-story homepage

Date: 25 October 2026.

## Scroll narrative
- The approved 10-second marina-to-sunset film begins at the very top of the viewport. A translucent primary navigation sits over the film rather than occupying vertical space.
- The film plays once when the visitor starts scrolling, then rests on its final sunset frame (updated 28 October 2026; see `docs/HOMEPAGE_VIDEO.md`).
- The first headline, **TRUSTED. TRAINED. PROVEN.**, reveals as three individually timed statements in time with the film, set in bold modern Russo One typography.
- Further scrolling brings the next full-height, sticky chapter, **ENGINEERED TO LAST.**, up over the resting sunset frame. The text fill, key message, and credential counters reveal in stages tied to scroll progress.
- The following chapters retain the genuine Instagram gallery, the six original services and day rates, Avery 800 history, Arlon Fleet & Restyling certifications, STEK PPF status, and booking/contact links.
- Editorial transitions include a moving service ribbon, bold oversized chapter numbers, material-history comparison, staggered service cards, cropped typography and a strong final booking call.

## Locations
- Film hero: `components/hero-film.tsx` and `app/hero-film.css`.
- Sticky second chapter and homepage content: `app/page.tsx`.
- Scroll-tied progress and IntersectionObserver reveals: `components/home-motion.tsx`.
- Styling and responsive layout: `app/home-story.css`.
- Homepage-only transparent overlay header: `components/site-shell.tsx`.
- Conventional reveals retained on Services and Contact: `components/reveal-init.tsx`.

## Accessibility and resilience
- Reduced-motion users get readable, static text and the final frame without the film.
- Site text is readable without JavaScript; observer animation styles are only enabled after hydration.
- The Book action is always available.
- No additional generation credits or new imagery were used.

## Links
- Book: https://app.cdavies.work/book
- Ask Chris: tel:07309052735
- Main domain: https://www.cdavies.work

The separate booking application at `app.cdavies.work` has not been edited.