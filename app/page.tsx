import Image from 'next/image';
import { AccreditationMarks, ServiceBrandMark } from '@/components/accreditation-marks';
import { AutomotiveHero } from '@/components/automotive-hero';
import { HomeMotion } from '@/components/home-motion';
import { BorderGlow } from '@/components/border-glow';
import { PortfolioCarousel } from '@/components/portfolio-carousel';
import { ArrowLink, Eyebrow, Shell } from '@/components/site-shell';
import { contactDetails, services } from '@/lib/business-data';

export default function Home() {
  return (
    <Shell immersive>
      <HomeMotion />
      <main className="davies-scroll-story">
        <AutomotiveHero />

        <section className="story-second-line" data-story-track aria-labelledby="story-second-title">
          <div className="story-second-stage">
            <div className="story-second-grain" aria-hidden="true" />
            <div className="story-second-shell">
              <div className="story-second-topline">
                <span>01 / THE PROMISE</span>
                <span>DAVIES WRAP SPECIALIST — HAMPSHIRE</span>
              </div>
              <p className="story-second-echo" aria-hidden="true">NOT JUST WRAPPED.</p>
              <h2 id="story-second-title" className="story-second-heading">
                <span className="story-second-heading-first">ENGINEERED</span>
                <span className="story-second-heading-final">TO LAST<span className="story-full-stop">.</span></span>
              </h2>
              <p className="story-second-subcopy">
                Precision comes from what you don&apos;t see: meticulous preparation, material knowledge and the details that make the finish.
              </p>
              <div className="story-second-specs">
                <div><strong>20<span>+</span></strong><small>YEARS ON THE TOOLS</small></div>
                <div><strong>ARLON</strong><small>FLEET &amp; RESTYLING CERTIFIED</small></div>
                <div><strong>STEK</strong><small>PPF APPROVED INSTALLER</small></div>
              </div>
              <div className="story-second-next">
                <span>KEEP SCROLLING / THE WORK BEHIND THE FINISH</span>
                <span aria-hidden="true">↓</span>
              </div>
            </div>
          </div>
        </section>

        <div id="after-intro" className="kinetic-rail story-kinetic-rail" aria-hidden="true">
          <div><span>THE OLD SCHOOL SKILL</span><i>◆</i><span>THE NEW SCHOOL FILMS</span><i>◆</i><span>FLEET</span><i>◆</i><span>RESTYLING</span><i>◆</i><span>PPF</span><i>◆</i><span>MARINE</span><i>◆</i><span>NO SHORTCUTS</span><i>◆</i></div>
        </div>

        <section className="manifesto section-pad story-manifesto" aria-labelledby="story-material-title">
          <div className="manifesto-index" data-kinetic="stamp">02 / THE KNOW-HOW</div>
          <div className="story-manifesto-heading">
            <Eyebrow>From the first cast films to today</Eyebrow>
            <h2 id="story-material-title" data-kinetic="headline">OLD-SCHOOL SKILL.<br/><em>NEW-SCHOOL FILMS.</em></h2>
            <div className="story-film-journey" data-kinetic="rise">
              <div><span>THEN</span><strong>AVERY 800</strong><small>Before modern air-release films</small></div>
              <span className="story-film-journey-arrow" aria-hidden="true">↗</span>
              <div><span>NOW</span><strong>LATEST SYSTEMS</strong><small>Fleet, restyling, STEK PPF &amp; more</small></div>
            </div>
          </div>
          <p className="story-manifesto-body" data-kinetic="slide">
            Chris started wrapping with Avery 800 cast vinyl, long before air-release technology became the norm. More than two decades on, that hands-on foundation still matters — paired with a commitment to keeping up with the latest materials, techniques and finishes.
          </p>
        </section>

        <section className="portfolio section-pad section-dark story-portfolio" id="instagram-work">
          <div className="story-chapter-marker" data-kinetic="stamp"><span>03</span><span>/ REAL WORK. REAL PROOF.</span></div>
          <div className="section-heading">
            <div data-kinetic="headline">
              <Eyebrow>Genuine projects / Not stock photos</Eyebrow>
              <h2>THE WORK,<br/><em>IN MOTION.</em></h2>
            </div>
            <p data-kinetic="slide">These are Chris&apos;s real installations. Explore the selected projects and open each original Instagram post to see the detail for yourself.</p>
          </div>
          <PortfolioCarousel />
          <div className="portfolio-footer" data-kinetic="rise">
            <span>Selected portfolio / Use the arrows or keyboard</span>
            <a href="https://www.instagram.com/thewrapspecialist" target="_blank" rel="noreferrer">More real projects on Instagram <b>↗</b></a>
          </div>
        </section>

        <section className="service-bay section-pad story-services" aria-labelledby="story-services-title">
          <div className="story-chapter-marker" data-kinetic="stamp"><span>04</span><span>/ WHAT I DO</span></div>
          <div className="service-bay-head">
            <div data-kinetic="headline">
              <Eyebrow>Six specialist services / Transparent local day rates</Eyebrow>
              <h2 id="story-services-title">RIGHT MATERIAL.<br/><em>RIGHT FINISH.</em></h2>
            </div>
            <ArrowLink href="/services">Explore all services</ArrowLink>
          </div>
          <div className="story-services-lead" data-kinetic="rise">
            <p>One specialist. Every detail considered. From fleet branding to high-end paint protection, the right material and correct preparation make all the difference.</p>
            <span>CHOOSE YOUR SERVICE ↓</span>
          </div>
          <div className="service-specs">
            {services.map((service, index) => (
              <BorderGlow className="service-glow-card" key={service.id}>
                <article>
                  <div className="service-top">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div className="service-day-rate"><strong>£{service.price}</strong><small>/ day</small></div>
                  </div>
                  {service.brand && <ServiceBrandMark brand={service.brand} />}
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <div className="service-meter"><i /><i /><i /><i /><i /></div>
                  <a href={contactDetails.bookingHref}>Book <span>↗</span></a>
                </article>
              </BorderGlow>
            ))}
          </div>
        </section>

        <section className="operator section-pad story-operator" aria-labelledby="story-experience-title">
          <div className="story-operator-corner" aria-hidden="true">05 / THE SPECIALIST</div>
          <BorderGlow className="operator-image-glow">
            <div className="operator-image operator-image-pair">
              <div className="operator-number">20<span>+</span></div>
              <figure className="operator-working-frame operator-working-frame-first">
                <Image
                  src="/images/davies-orange-car-installation.webp"
                  width={1280}
                  height={720}
                  sizes="(max-width: 700px) 88vw, (max-width: 1200px) 50vw, 45vw"
                  alt="Chris carefully fitting burnt-orange vinyl film around the rear engine bay of a sports car"
                />
                <figcaption><span>01 / PRECISION FITTING</span><strong>THE DETAIL IS THE DIFFERENCE.</strong></figcaption>
              </figure>
              <figure className="operator-working-frame operator-working-frame-detail">
                <Image
                  src="/images/davies-orange-wrap-detail.webp"
                  width={1280}
                  height={720}
                  sizes="(max-width: 700px) 88vw, (max-width: 1200px) 50vw, 45vw"
                  alt="Chris hand-finishing orange wrap film with an applicator on a sports-car rear panel"
                />
                <figcaption><span>02 / HAND-FINISHED</span><strong>CRAFTED. NOT RUSHED.</strong></figcaption>
              </figure>
            </div>
          </BorderGlow>
          <div className="operator-copy">
            <Eyebrow>Not a franchise. Your specialist.</Eyebrow>
            <h2 id="story-experience-title" data-kinetic="headline">KNOW-HOW<br/>YOU CAN <em>SEE.</em></h2>
            <p data-kinetic="rise">From the early days of cast vinyl to modern air-release films and advanced surface protection, Chris brings more than twenty years&apos; experience to every installation.</p>
            <div className="story-credentials-label" data-kinetic="stamp">TRAINED. CERTIFIED. ALWAYS LEARNING.</div>
            <AccreditationMarks />
            <ul>
              <li><span>01</span> Arlon Fleet certified</li>
              <li><span>02</span> Arlon Restyling certified</li>
              <li><span>03</span> STEK PPF approved</li>
              <li><span>04</span> Precise fitting, proper preparation</li>
            </ul>
            <a href={contactDetails.phoneHref} className="arrow-link arrow-link-light"><span>Ask Chris</span><b>↗</b></a>
          </div>
        </section>

        <section className="story-last-call" aria-labelledby="story-final-title">
          <div className="story-last-call-top" data-kinetic="stamp"><span>06 / YOUR PROJECT</span><span>LET&apos;S MAKE IT COUNT</span></div>
          <p data-kinetic="rise">A BOLD FINISH STARTS WITH A CONVERSATION.</p>
          <h2 id="story-final-title" data-kinetic="headline">YOUR NEXT<br/><em>MOVE.</em></h2>
          <div className="story-last-call-bottom" data-kinetic="rise">
            <span>Based in Bursledon, Hampshire. Commercial, automotive, marine and architectural film installation.</span>
            <div className="story-last-call-actions">
              <a href={contactDetails.bookingHref}>Book an installation <b>↗</b></a>
              <a href={contactDetails.phoneHref}>Ask Chris · {contactDetails.phoneDisplay} <b>↗</b></a>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
