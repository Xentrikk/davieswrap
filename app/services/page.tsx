import Image from 'next/image';
import Link from 'next/link';
import { AccreditationMarks, ServiceBrandMark } from '@/components/accreditation-marks';
import { BorderGlow } from '@/components/border-glow';
import { ArrowLink, Eyebrow, Shell } from '@/components/site-shell';
import { projectDetails, services } from '@/lib/business-data';

export default function Services() {
  return (
    <Shell><main>
      <section className="page-intro visual-intro services-intro">
        <div className="visual-intro-copy section-pad"><Eyebrow>Six specialist services</Eyebrow><h1>Clear rates.<br /><em>Proper work.</em></h1><p>Commercial, vehicle, architectural and marine installation from a certified specialist with more than twenty years of hands-on experience.</p><AccreditationMarks compact /></div>
        <div className="visual-intro-image services-intro-image"><Image src="/images/davies-marine-prep.jpg" width={720} height={1280} sizes="(max-width: 900px) 100vw, 42vw" alt="Chris Davies preparing a yacht surface for specialist film installation" priority /></div>
      </section>

      <section className="rates section-pad section-dark">
        <div className="section-heading"><div><Eyebrow>Current day rates</Eyebrow><h2>Choose the right<br /><em>service</em></h2></div><p>Based in Bursledon, Southampton. Travel is charged at 45p per mile beyond a 25-mile radius.</p></div>
        <div className="rate-grid">{services.map((service, index) => <BorderGlow className="rate-glow-card" key={service.id}><article className="rate-card"><div className="rate-tag"><span>{String(index + 1).padStart(2, '0')} / {service.shortTitle}</span>{service.brand && <ServiceBrandMark brand={service.brand} />}</div><h3>{service.title}</h3><div className="rate-price"><strong>£{service.price}</strong><span>Per day</span></div><p>{service.inclusion}</p><Link href="/contact">Discuss this service <span>↗</span></Link></article></BorderGlow>)}</div>
      </section>

      <section className="details section-pad light-surface">
        <div className="details-heading"><Eyebrow>Working with Davies</Eyebrow><h2>Everything<br /><em>made clear.</em></h2><p>What is supplied, how travel is calculated and why Chris is trusted across commercial and specialist installation work.</p></div>
        <div className="detail-columns">{projectDetails.map((detail) => <BorderGlow className="detail-glow-card" key={detail.title}><article className="detail-card"><div className="detail-card-top"><span>{detail.tag}</span><i aria-hidden="true" /></div><h3>{detail.title}</h3><p>{detail.copy}</p><div className="detail-card-footer"><span>{detail.note}</span><b>↗</b></div></article></BorderGlow>)}</div>
      </section>

      <section className="cta-strip section-pad"><Eyebrow>Ready when you are</Eyebrow><h2>Let’s make your vehicle<br /><em>stand apart.</em></h2><ArrowLink href="/contact" light>Start a project</ArrowLink></section>
    </main></Shell>
  );
}
