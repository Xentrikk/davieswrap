'use client';

import Image from 'next/image';
import { useState, type FormEvent } from 'react';
import { BorderGlow } from '@/components/border-glow';
import { Eyebrow, Shell } from '@/components/site-shell';
import { ServiceRadiusMap } from '@/components/service-radius-map';
import { contactDetails, services } from '@/lib/business-data';

export default function Contact() {
  const [emailDraftOpened, setEmailDraftOpened] = useState(false);

  function openEmailDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const field = (name: string) => String(form.get(name) ?? '').trim();
    const service = field('service');
    const subject = service ? `Davies project enquiry — ${service}` : 'Davies project enquiry';
    const body = [
      'Hello Chris,',
      '',
      'I would like to discuss a project:',
      '',
      `Name: ${field('name')}`,
      `Email: ${field('email')}`,
      `Vehicle / project: ${field('vehicle') || 'To be confirmed'}`,
      `Service: ${service || 'To be confirmed'}`,
      '',
      field('message'),
      '',
      'Thanks,',
      field('name'),
    ].join('\\n');

    // A mailto link opens the visitor's email app. It does not silently send data.
    window.location.href = `mailto:${contactDetails.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setEmailDraftOpened(true);
  }

  return (
    <Shell>
      <main>
        <section className="page-intro visual-intro contact-intro">
          <div className="visual-intro-copy section-pad">
            <Eyebrow>Direct to Chris / Hampshire</Eyebrow>
            <h1>LET&apos;S GET THE<br /><em>DETAILS RIGHT.</em></h1>
            <p>Fleet branding, a full colour change, STEK PPF, architectural film or marine work — whatever the project, get straight to the specialist who will be doing the fitting.</p>
            <div className="intro-action-row">
              <a className="booking-primary" href={contactDetails.bookingHref}>Book an installation <span>↗</span></a>
              <a className="booking-secondary" href={contactDetails.phoneHref}>Ask Chris <span>↗</span></a>
            </div>
          </div>
          <div className="visual-intro-image contact-intro-image">
            <Image src="/images/davies-architectural-wide.jpg" width={853} height={1280} sizes="(max-width: 900px) 100vw, 42vw" alt="Careful installation of architectural film by Davies Wrap Specialist" priority />
          </div>
        </section>

        <section className="contact-grid section-pad contact-project-section">
          <BorderGlow className="contact-details-glow">
            <div className="contact-details">
              <div className="contact-panel-main">
                <span className="contact-panel-index">01 / GET IN TOUCH</span>
                <Eyebrow>No call centre. Just the installer.</Eyebrow>
                <h2>ONE CALL.<br /><em>CLEAR DIRECTION.</em></h2>
                <p className="contact-panel-copy">Speak with Chris about the vehicle or surface, film choice, timescale and finish. With more than 20 years&apos; hands-on experience, you&apos;ll get straightforward advice before the job begins.</p>
                <div className="contact-actions">
                  <a href={contactDetails.bookingHref}>
                    <small>Book online</small>
                    <strong>Choose a booking</strong>
                    <span>↗</span>
                  </a>
                  <a href={contactDetails.phoneHref}>
                    <small>Ask Chris</small>
                    <strong>{contactDetails.phoneDisplay}</strong>
                    <span>↗</span>
                  </a>
                </div>
                <p className="contact-email-direct">Prefer email? <a href={contactDetails.emailHref}>{contactDetails.email} ↗</a></p>
                <div className="contact-availability"><i /> Bursledon based · Hampshire &amp; surrounding areas</div>
              </div>
              <div className="contact-meta">
                <p><strong>Based in</strong><br />Bursledon, SO31<br />Hampshire, UK</p>
                <p><strong>Talk it through</strong><br /><a href={contactDetails.phoneHref}>Ask Chris ↗</a><br /><a href={contactDetails.emailHref}>Email Chris ↗</a></p>
                <p><strong>See the work</strong><br /><a href="https://www.instagram.com/thewrapspecialist" target="_blank" rel="noreferrer">@thewrapspecialist ↗</a></p>
              </div>
            </div>
          </BorderGlow>

          <BorderGlow className="contact-form-glow">
            <form className="enquiry-form" onSubmit={openEmailDraft}>
              <div className="form-heading">
                <span>02 / YOUR PROJECT</span>
                <h2>TELL ME WHAT<br /><em>YOU HAVE IN MIND.</em></h2>
                <p>A few details help Chris recommend the right approach. This form prepares an email for you to review and send from your email app.</p>
              </div>
              <div className="form-row">
                <label>Name<input name="name" required autoComplete="name" placeholder="Your name" /></label>
                <label>Email<input type="email" name="email" required autoComplete="email" placeholder="you@example.com" /></label>
              </div>
              <div className="form-row">
                <label>Vehicle / project<input name="vehicle" placeholder="Vehicle, vessel or site" /></label>
                <label>Service
                  <select name="service" defaultValue="">
                    <option value="" disabled>Select a service</option>
                    {services.map((service) => <option key={service.id} value={service.title}>{service.title}</option>)}
                  </select>
                </label>
              </div>
              <label>Message<textarea name="message" required placeholder="Tell Chris about the finish you want, timescale and anything else that matters..." rows={4} /></label>
              <button type="submit" className="form-submit">Open email to send <span>↗</span></button>
              <p className="form-email-notice">Your email app opens with the brief ready. Please press <strong>Send</strong> there; nothing is sent automatically from this page.</p>
              {emailDraftOpened && <p className="form-email-feedback" role="status">Email draft requested. If your email app did not open, email <a href={contactDetails.emailHref}>{contactDetails.email}</a> or <a href={contactDetails.phoneHref}>ask Chris directly</a>.</p>}
            </form>
          </BorderGlow>
        </section>

        <ServiceRadiusMap />
      </main>
    </Shell>
  );
}
