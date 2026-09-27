import Image from 'next/image';

export function AccreditationMarks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`accreditation-marks${compact ? ' accreditation-marks-compact' : ''}`} aria-label="Installer accreditations">
      <a className="accreditation-mark" href="https://www.arlon.com/eu_en/" target="_blank" rel="noreferrer" aria-label="Visit the Arlon website — Davies is an Arlon Fleet certified installer">
        <Image src="/images/arlon-logo.png" width={1254} height={1254} alt="Arlon certified installer" />
        <span><b>Arlon Fleet</b>Certified installer</span>
      </a>
      <a className="accreditation-mark" href="https://www.arlon.com/eu_en/" target="_blank" rel="noreferrer" aria-label="Visit the Arlon website — Davies is an Arlon Restyling certified installer">
        <Image src="/images/arlon-logo.png" width={1254} height={1254} alt="Arlon Restyling certified installer" />
        <span><b>Arlon Restyling</b>Certified installer</span>
      </a>
      <a className="accreditation-mark accreditation-mark-stek" href="https://www.stekautomotive.com/" target="_blank" rel="noreferrer" aria-label="Visit the STEK Automotive website — Davies is a STEK PPF accredited installer">
        <Image src="/images/stek-logo.jpg" width={817} height={805} alt="STEK accredited installer" />
        <span><b>STEK PPF</b>Accredited installer</span>
      </a>
    </div>
  );
}

export function ServiceBrandMark({ brand }: { brand: 'arlon' | 'stek' }) {
  const isArlon = brand === 'arlon';
  const brandName = isArlon ? 'Arlon' : 'STEK Automotive';
  return (
    <a
      className={`service-brand-mark service-brand-mark-${brand}`}
      href={isArlon ? 'https://www.arlon.com/eu_en/' : 'https://www.stekautomotive.com/'}
      target="_blank"
      rel="noreferrer"
      title={`Visit ${brandName}`}
      aria-label={`Visit the ${brandName} website`}
    >
      <Image
        src={isArlon ? '/images/arlon-logo.png' : '/images/stek-logo.jpg'}
        width={isArlon ? 1254 : 817}
        height={isArlon ? 1254 : 805}
        alt={isArlon ? 'Arlon' : 'STEK'}
      />
    </a>
  );
}
