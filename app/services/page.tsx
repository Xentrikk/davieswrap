import type { Metadata } from 'next';
import Image from 'next/image';
import { AccreditationMarks, ServiceBrandMark } from '@/components/accreditation-marks';
import { BorderGlow } from '@/components/border-glow';
import { Eyebrow, Shell } from '@/components/site-shell';
import { contactDetails, projectDetails, services } from '@/lib/business-data';

export const metadata: Metadata = {
  title: 'Services & Day Rates | Davies Wrap Specialist',
  description: 'Explore commercial fleet wrapping, colour changes, STEK paint protection film, window, architectural and marine film installation. Experienced, certified installation in Hampshire.',
};

export default function Services() {
  return (
    <Shell>
      <main>
        <section className="page-intro visual-intro services-intro">
          <div className="visual-intro-copy section-pad">
            <Eyebrow>Six specialist services / Hampshire</Eyebrow>
            <h1>THE RIGHT FILM.<br /><em>THE RIGHT FINISH.</em></h1>
            <p>Over 20 years of hands-on wrapping experience. From early Avery 800 cast vinyl to today&apos;s advanced fleet, restyling and PPF systems, every job starts with understanding the surface and the finish you want.</p>
            <AccreditationMarks compact />
            <div className="intro-action-row">
              <a className="booking-primary" href={contactDetails.bookingHref}>Book an installation <span>↗</span></a>
              <a className="booking-secondary" href={contactDetails.phoneHref}>Ask Chris <span>↗</span></a>
            </div>
          </div>
          <div className="visual-intro-image services-intro-image">
            <Image src="/images/davies-marine-prep.jpg" width={720} height={1280} sizes="(max-width: 900px) 100vw, 42vw" alt="Surface preparation ahead of specialist marine film installation" priority />
          </div>
        </section>

        <section className="rates section-pad section-dark">
          <div className="section-heading">
            <div><Eyebrow>Published local day rates</Eyebrow><h2>CLEAR RATES.<br /><em>NO GUESSWORK.</em></h2></div>
            <p>Based in Bursledon, Southampton. The standard local radius is 25 miles; travel beyond that is charged at 45p per mile.</p>
          </div>
          <p className="rates-intro-note">Explore the work included in each service. Chris can confirm the material, project requirements and suitable booking before installation.</p>
          <div className="rate-grid">
            {services.map((service, index) => (
              <BorderGlow className="rate-glow-card" key={service.id}>
                <article className="rate-card">
                  <div className="rate-tag">
                    <span>{String(index + 1).padStart(2, '0')} / {service.shortTitle}</span>
                    {service.brand && <ServiceBrandMark brand={service.brand} />}
                  </div>
                  <h3>{service.title}</h3>
                  <div className="rate-price"><strong>£{service.price}</strong><span>Per day</span></div>
                  <p>{service.inclusion}</p>
                  <p className="service-summary">{service.summary}</p>
                  <div className="rate-action-row">
                    <a className="booking-primary" href={contactDetails.bookingHref}>Book <span>↗</span></a>
                    <a className="booking-secondary" href={contactDetails.phoneHref}>Ask Chris <span>↗</span></a>
                  </div>
                </article>
              </BorderGlow>
            ))}
          </div>
        </section>

        <section className="details section-pad light-surface">
          <div className="details-heading">
            <Eyebrow>Working with Davies</Eyebrow>
            <h2>GOOD WORK<br /><em>STARTS WITH DETAIL.</em></h2>
            <p>Preparation, material knowledge and honest communication are part of every installation. Here&apos;s what to expect before work begins.</p>
          </div>
          <div className="detail-columns">
            {projectDetails.map((detail) => (
              <BorderGlow className="detail-glow-card" key={detail.title}>
                <article className="detail-card">
                  <div className="detail-card-top"><span>{detail.tag}</span><i aria-hidden="true" /></div>
                  <h3>{detail.title}</h3>
                  <p>{detail.copy}</p>
                  <div className="detail-card-footer"><span>{detail.note}</span></div>
                </article>
              </BorderGlow>
            ))}
          </div>
        </section>

        <section className="cta-strip section-pad">
          <Eyebrow>Let&apos;s get started</Eyebrow>
          <h2>PRECISION IN EVERY PANEL.<br /><em>CONFIDENCE IN THE FINISH.</em></h2>
          <p className="cta-support-copy">Know exactly what you want? Book online. Need help choosing a film, finish or installation approach? Ask Chris directly.</p>
          <div className="cta-action-row">
            <a className="booking-primary" href={contactDetails.bookingHref}>Book an installation <span>↗</span></a>
            <a className="booking-secondary" href={contactDetails.phoneHref}>Ask Chris · {contactDetails.phoneDisplay} <span>↗</span></a>
          </div>
        </section>
      </main>
    </Shell>
  );
}
