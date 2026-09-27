export type ServiceBrand = 'arlon' | 'stek' | null;

export type Service = {
  id: string;
  title: string;
  shortTitle: string;
  price: number;
  brand: ServiceBrand;
  inclusion: string;
};

export const services: Service[] = [
  {
    id: 'commercial-fleet',
    title: 'Commercial / Fleet',
    shortTitle: 'Fleet',
    price: 260,
    brand: 'arlon',
    inclusion: 'Trim removal, surface preparation, wrap installation and post heat.',
  },
  {
    id: 'window-film',
    title: 'Window Film',
    shortTitle: 'Window Film',
    price: 260,
    brand: null,
    inclusion: 'Scrape and clean the window surface, spray, wipe and install on flat to lightly curved glass. Excludes vehicles.',
  },
  {
    id: 'colour-change',
    title: 'Colour Change',
    shortTitle: 'Colour Change',
    price: 350,
    brand: 'arlon',
    inclusion: 'Clay bar treatment, surface preparation, vinyl installation and post heat.',
  },
  {
    id: 'ppf',
    title: 'Paint Protection Film',
    shortTitle: 'PPF',
    price: 350,
    brand: 'stek',
    inclusion: 'Full clean, clay bar treatment and installation using a pre-cut kit or film fitted off the roll.',
  },
  {
    id: 'architectural',
    title: 'Architectural Film',
    shortTitle: 'Architectural',
    price: 280,
    brand: null,
    inclusion: 'Tension test, surface preparation, primer application and installation.',
  },
  {
    id: 'marine',
    title: 'Marine',
    shortTitle: 'Marine',
    price: 300,
    brand: null,
    inclusion: 'Surface preparation, material positioning and installation, working independently where required.',
  },
];

export const contactDetails = {
  phoneDisplay: '07309 052735',
  phoneHref: 'tel:07309052735',
  email: 'hello@cdavies.work',
  emailHref: 'mailto:hello@cdavies.work',
  website: 'cdavies.work',
  websiteHref: 'https://cdavies.work',
};

export const projectDetails = [
  {
    tag: '01 / TRAVEL & BASE',
    title: 'Bursledon based',
    copy: 'Based in Bursledon, Southampton. Travel is charged at 45p per mile beyond a 25-mile radius.',
    note: '25-mile local radius',
  },
  {
    tag: '02 / SUPPLY & EQUIPMENT',
    title: 'Prepared to install',
    copy: 'Cleaning and preparation products, tools and specialist equipment are included. Access equipment above two metres must be supplied or added at extra cost.',
    note: 'Specialist tools included',
  },
  {
    tag: '03 / EXPERIENCE',
    title: '20+ years hands-on',
    copy: 'More than twenty years in vehicle wrapping and signage, with certification across Arlon Fleet, Arlon Restyling, STEK PPF and Spandex Architectural Film.',
    note: 'Certified installation',
  },
  {
    tag: '04 / WHY DAVIES',
    title: 'Work done properly',
    copy: 'Professional workmanship, reliable and consistent service, exceptional attention to detail and competitive day rates.',
    note: 'Direct specialist service',
  },
];
