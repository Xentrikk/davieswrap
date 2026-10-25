# Davies homepage: scroll-controlled intro, with mobile fallback

**Main site:** `www.cdavies.work` — the approved 10-second marina film (workshop, wrapped vehicles and yacht, ending at sunset) is tied to visitor scroll position.

## Desktop
- Uses the seek-optimised H.264 movie (keyframe every four frames).
- No autoplay; scroll down progresses through the film, scroll back up reverses.
- Video: https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/aa38a087-410c-4285-9f7f-fa5718a3efad.mp4

## Phones and touch devices (including iOS Safari)
- Browser-native paused MP4 seeking may fail to paint video frames on real iPhones even when Chrome mobile emulation works.
- The mobile intro uses **100 frames extracted from the same approved movie**, arranged across four compressed WebP sprite sheets (total approximately **2.8 MB**).
- A small canvas draws the relevant film frame on each scroll event; does not rely on video autoplay, decoding unlock gestures or `currentTime` seeking.
- The opening poster stays visible until sprite sheets load, ensuring the page isn't blank.
- Scroll progress is calculated against the stable sticky-stage height (not the changing iPhone toolbar viewport).
- The laptop's video-based scroll implementation is unchanged.

## Visitor experience
- Sticky intro with scrubbed media, progress bar and Skip intro link.
- Works in both scroll directions; visitor can still access Book and View Our Work.
- Book: https://app.cdavies.work/book
- Ask Chris links elsewhere: tel:07309052735
- Reduced-motion users see the original static poster, and can continue without animation.

## Assets
- 0: https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/82522045-8e59-4b70-a373-c4780a9c2114.webp
- 1: https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/fa2230bc-fc25-47b6-8cce-cbafc77c24bd.webp
- 2: https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/dd394879-20c5-42ba-b9b4-baacbb4305b9.webp
- 3: https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/e3bf7b9e-5ef5-445d-afea-96d569cb6493.webp
- Poster: https://d2ol7oe51mr4n9.cloudfront.net/user_3L8MGjMkW0k1NWSkETx0dFplZNu/255009a6-ca87-45bc-9879-d173d9a8212e.jpg
- The assets are hosted on the connected Higgsfield CDN; consider migrating these files into first-party static hosting for long-term independence.

Changes in `components/automotive-hero.tsx` and `app/portfolio-live.css`.
The booking app at `app.cdavies.work` is untouched. No model generation or spending is involved.
