# Davies cinematic scroll-story homepage

Date: 25 October 2026.

## Scroll narrative
- The approved 10-second marina-to-sunset film begins at the very top of the viewport. A translucent primary navigation sits over the film rather than occupying vertical space.
- Scrolling (not autoplay) advances the film on desktop and the 100-frame canvas sequence on mobile, preserving bidirectional reverse scrolling.
- The first headline, **NOT JUST WRAPPED.**, reveals as three individually timed words. It is fully visible on the final video frame.
- Further scrolling introduces the next full-height, sticky chapter, **ENGINEERED TO LAST.** The text fill, key message, and credential counters reveal in stages tied to scroll progress.
- The following chapters retain the genuine Instagram gallery, the six original services and day rates, Avery 800 history, Arlon Fleet & Restyling certifications, STEK PPF status, and booking/contact links.
- Editorial transitions include a moving service ribbon, bold oversized chapter numbers, material-history comparison, staggered service cards, cropped typography and a strong final booking call.

## Locations
- Scroll hero: `components/automotive-hero.tsx`.
- Sticky second chapter and homepage content: `app/page.tsx`.
- Scroll-tied progress and IntersectionObserver reveals: `components/home-motion.tsx`.
- Styling and responsive layout: `app/home-story.css`.
- Homepage-only transparent overlay header: `components/site-shell.tsx`.
- Conventional reveals retained on Services and Contact: `components/reveal-init.tsx`.

## Accessibility and resilience
- Reduced-motion users get readable, static text and no forced scroll-film progress.
- Site text is readable without JavaScript; observer animation styles are only enabled after hydration.
- Skip intro skips both pinned chapters; the Book action is always available.
- The phone animation remains canvas-based instead of paused MP4 seeking (iOS Safari compatibility).
- No additional generation credits or new imagery were used.

## Links
- Book: https://app.cdavies.work/book
- Ask Chris: tel:07309052735
- Main domain: https://www.cdavies.work

The separate booking application at `app.cdavies.work` has not been edited.