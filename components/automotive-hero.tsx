import Image from 'next/image';
import Link from 'next/link';
import { contactDetails } from '@/lib/business-data';

export function AutomotiveHero() {
  return (
    <section className="hero-showcase" aria-label="Davies Wrap Specialist">
      <Image
        className="hero-showcase-image"
        src="/images/davies-marina-hero.png"
        width={1672}
        height={941}
        sizes="100vw"
        alt="Davies Wrap Specialist workshop beside a marina, featuring wrapped vehicles and a luxury yacht"
        priority
      />
      <div className="hero-showcase-actions">
        <a className="hero-showcase-button hero-showcase-quote" href={contactDetails.bookingHref}>Book <span aria-hidden="true">→</span></a>
        <Link className="hero-showcase-button hero-showcase-work" href="#instagram-work">View Our Work <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
