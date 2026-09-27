import Image from 'next/image';
import Link from 'next/link';
import { GooeyNav } from './gooey-nav';
import { RevealInit } from './reveal-init';
import { contactDetails } from '@/lib/business-data';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services / Rates' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Davies Wrap Specialist home">
        <span className="brand-logo-crop">
          <Image src="/images/davies-logo-300dpi.png" width={1659} height={948} alt="Davies Wrap Specialist" priority />
        </span>
      </Link>
      <GooeyNav items={nav} />
      <a className="header-cta" href={contactDetails.phoneHref}><span>Start a project</span><b>↗</b></a>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead"><p className="eyebrow">Hampshire / UK</p><h2>MAKE THE<br/>FIRST IMPRESSION<br/><em>COUNT.</em></h2></div>
      <div className="footer-contact"><p>Professional installation.<br/>Consistent service. No shortcuts.</p><a href={contactDetails.phoneHref}>{contactDetails.phoneDisplay} ↗</a><a href={contactDetails.emailHref}>{contactDetails.email} ↗</a><a href={contactDetails.websiteHref}>{contactDetails.website} ↗</a><a href="https://www.instagram.com/thewrapspecialist" target="_blank" rel="noreferrer">@thewrapspecialist ↗</a></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Davies Wrap Specialist</span><span>Bursledon · SO31</span><span>Arlon / STEK accredited</span></div>
    </footer>
  );
}

export function Shell({ children }: { children: React.ReactNode }) { return <><RevealInit /><div className="site-atmosphere" aria-hidden="true"><div className="atmosphere-veil"/><div className="atmosphere-lines"/><div className="atmosphere-grain"/></div><div className="site-frame"><SiteHeader />{children}<SiteFooter /></div></>; }
export function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="eyebrow"><i />{children}</p>; }
export function ArrowLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) { return <Link className={`arrow-link${light ? ' arrow-link-light' : ''}`} href={href}><span>{children}</span><b>↗</b></Link>; }
