import Image from 'next/image';
import Link from 'next/link';
import { AccreditationMarks, ServiceBrandMark } from '@/components/accreditation-marks';
import { AutomotiveHero } from '@/components/automotive-hero';
import { BorderGlow } from '@/components/border-glow';
import { PortfolioCarousel } from '@/components/portfolio-carousel';
import { ArrowLink, Eyebrow, Shell } from '@/components/site-shell';
import { services } from '@/lib/business-data';

export default function Home() {
  return <Shell><main>
    <AutomotiveHero />
    <div className="kinetic-rail" aria-hidden="true"><div><span>COMMERCIAL & FLEET</span><i>◆</i><span>WINDOW FILM</span><i>◆</i><span>COLOUR CHANGE</span><i>◆</i><span>STEK PPF</span><i>◆</i><span>ARCHITECTURAL FILM</span><i>◆</i><span>MARINE</span><i>◆</i><span>20+ YEARS EXPERIENCE</span><i>◆</i></div></div>

    <section className="manifesto section-pad">
      <div className="manifesto-index">01—04</div>
      <div><Eyebrow>The difference is in the finish</Eyebrow><h2>NOT JUST WRAPPED.<br/><em>ENGINEERED TO LAST.</em></h2></div>
      <p>Two decades of material knowledge, surface preparation and precision installation. No shortcuts, no rushed edges, no compromise on the final ten percent.</p>
    </section>

    <section className="portfolio section-pad section-dark" id="instagram-work">
      <div className="section-heading"><div><Eyebrow>Genuine work / Instagram</Eyebrow><h2>THE WORK,<br/><em>IN MOTION.</em></h2></div><p>Chris’s real installations stay sharp inside this interactive gallery. Every frame links back to its original Instagram post.</p></div>
      <PortfolioCarousel />
      <div className="portfolio-footer"><span>Interactive portfolio / Use arrows or keyboard</span><a href="https://www.instagram.com/thewrapspecialist" target="_blank" rel="noreferrer">Visit @thewrapspecialist on Instagram <b>↗</b></a></div>
    </section>

    <section className="service-bay section-pad">
      <div className="service-bay-head"><div><Eyebrow>Services / Local day rates</Eyebrow><h2>THE RIGHT SYSTEM.<br/><em>THE RIGHT FINISH.</em></h2></div><ArrowLink href="/services">Full details</ArrowLink></div>
      <div className="service-specs">{services.map((service, index) => <BorderGlow className="service-glow-card" key={service.id}><article><div className="service-top"><span>{String(index + 1).padStart(2, '0')}</span><div className="service-day-rate"><strong>£{service.price}</strong><small>/ day</small></div></div>{service.brand && <ServiceBrandMark brand={service.brand} />}<h3>{service.title}</h3><p>{service.inclusion}</p><div className="service-meter"><i /><i /><i /><i /><i /></div><Link href="/contact">Enquire <span>↗</span></Link></article></BorderGlow>)}</div>
    </section>

    <section className="operator section-pad">
      <BorderGlow className="operator-image-glow"><div className="operator-image operator-image-pair"><div className="operator-number">20<span>+</span></div><Image src="/images/davies-marine-wrap.jpg" width={853} height={1280} alt="Chris Davies applying vinyl to a yacht" /><Image src="/images/davies-architectural-detail.jpg" width={853} height={1280} alt="Chris Davies installing architectural film" /></div></BorderGlow>
      <div className="operator-copy"><Eyebrow>The specialist</Eyebrow><h2>EXPERIENCE<br/>YOU CAN <em>SEE.</em></h2><p>Chris Davies has spent more than twenty years working hands-on in vehicle wrapping and signage. From repeatable fleet standards to PPF, architectural films and marine applications, every detail is treated as part of the final result.</p><AccreditationMarks /><ul><li><span>01</span> Professional workmanship</li><li><span>02</span> Reliable, consistent service</li><li><span>03</span> Exceptional attention to detail</li><li><span>04</span> Competitive day rates</li></ul><ArrowLink href="/contact" light>Talk to Chris</ArrowLink></div>
    </section>
  </main></Shell>;
}
