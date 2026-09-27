'use client';

import Image from 'next/image';
import { useState, type SyntheticEvent } from 'react';
import { BorderGlow } from '@/components/border-glow';
import { Eyebrow, Shell } from '@/components/site-shell';
import { ServiceRadiusMap } from '@/components/service-radius-map';
import { contactDetails, services } from '@/lib/business-data';

export default function Contact() {
  const [sent, setSent] = useState(false);

  function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <Shell>
      <main>
        <section className="page-intro visual-intro contact-intro">
          <div className="visual-intro-copy section-pad">
            <Eyebrow>Start a conversation</Eyebrow>
            <h1>Let’s talk about<br /><em>your project.</em></h1>
            <p>Whether it’s fleet branding, a colour change, PPF, glass, architectural film or a marine project, send over the details and Chris will come back to you.</p>
          </div>
          <div className="visual-intro-image contact-intro-image">
            <Image src="/images/davies-architectural-wide.jpg" width={853} height={1280} sizes="(max-width: 900px) 100vw, 42vw" alt="Chris Davies installing architectural film in a kitchen" priority />
          </div>
        </section>

        <section className="contact-grid section-pad contact-project-section">
          <BorderGlow className="contact-details-glow"><div className="contact-details">
            <div className="contact-panel-main">
              <span className="contact-panel-index">01 / PROJECT LINE</span>
              <Eyebrow>Direct to the specialist</Eyebrow>
              <h2>LET’S MAKE IT<br /><em>UNMISSABLE.</em></h2>
              <p className="contact-panel-copy">Speak directly with Chris about the vehicle, finish and deadline. No sales desk. No generic package. Just a clear route from idea to installation.</p>
              <div className="contact-actions">
                <a href={contactDetails.phoneHref}><small>Call Chris</small><strong>{contactDetails.phoneDisplay}</strong><span>↗</span></a>
                <a href={contactDetails.emailHref}><small>Email the brief</small><strong>{contactDetails.email}</strong><span>↗</span></a>
              </div>
              <div className="contact-availability"><i /> Taking bookings across Hampshire</div>
            </div>
            <div className="contact-meta">
              <p><strong>Based in</strong><br />Bursledon, SO31<br />Serving Hampshire & surrounding areas</p>
              <p><strong>Website</strong><br /><a href={contactDetails.websiteHref}>{contactDetails.website} ↗</a><br /><a href="https://www.instagram.com/thewrapspecialist" target="_blank" rel="noreferrer">@thewrapspecialist ↗</a></p>
            </div>
          </div></BorderGlow>

          <BorderGlow className="contact-form-glow">
            <form className="enquiry-form" onSubmit={submit}>
              {sent ? (
                <div className="form-success"><span>✓</span><h2>Thanks — your enquiry is ready.</h2><p>This demo form is not connected to a mailbox yet. Please use the phone or email alongside to send your project details directly.</p></div>
              ) : (
                <>
                  <div className="form-heading"><span>02 / PROJECT BRIEF</span><h2>START WITH<br /><em>THE DETAILS.</em></h2><p>A few essentials are enough. Chris will follow up personally.</p></div>
                  <div className="form-row"><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input type="email" name="email" required placeholder="you@example.com" /></label></div>
                  <div className="form-row"><label>Vehicle / project<input name="vehicle" placeholder="Vehicle, vessel or site" /></label><label>Service<select name="service" defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.id}>{service.title}</option>)}</select></label></div>
                  <label>Message<textarea name="message" required placeholder="Tell me a little about the project..." rows={4} /></label>
                  <button type="submit" className="form-submit">Send enquiry <span>↗</span></button>
                </>
              )}
            </form>
          </BorderGlow>
        </section>

        <ServiceRadiusMap />
      </main>
    </Shell>
  );
}
