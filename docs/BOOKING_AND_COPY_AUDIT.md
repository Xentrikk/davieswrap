# Davies site: CTA links and page-copy audit

Prepared for the current Next.js site. Existing homepage design and six day rates are retained.

## Required links
- **Book / Book an installation:** `https://app.cdavies.work/book`.
- **Ask Chris:** `tel:07309052735` (shown as 07309 052735).
- **Email Chris:** `mailto:hello@cdavies.work`.
- Internal pages: `/`, `/services`, `/contact`.
- Original Instagram portfolio URLs and Arlon/STEK links remain unchanged.

The booking endpoint is live, but presently redirects to `/book/login`. Check that this authentication step is appropriate for first-time customers before public launch.

## Copy changes
- Services: clearer installation summaries for fleet, window film, colour change, STEK PPF, architectural and marine; original **£260 / £260 / £350 / £350 / £280 / £300** day rates unchanged.
- Experience: Avery 800 pre-air-release history; Arlon Fleet/Restyling and STEK PPF credentials.
- Contact: prominent Book and Ask Chris choices, real email preparation instead of a fake "message sent" confirmation.
- Shared header/footer: explicit booking link and callable number.
- Homepage: retains original design and wording; only "Enquire" card actions become Book and "Talk to Chris" becomes a direct call.

## Publish review
- No deployment is included in this PR; merging or deploying is a separate action.
- Check Contact's email-draft CTA on the target browser and device: an email client must be configured.
- Confirm booking customers can access the login page and proceed to booking.
- Verify mobile navigation and the existing Instagram gallery after deployment.
