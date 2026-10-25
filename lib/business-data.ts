export type ServiceBrand = 'arlon' | 'stek' | null;

export type Service = {
  id: string;
  title: string;
  shortTitle: string;
  price: number;
  brand: ServiceBrand;
  inclusion: string;
  summary: string;
};

export const services: Service[] = [
  {
    id: 'commercial-fleet',
    title: 'Commercial / Fleet',
    shortTitle: 'Fleet',
    price: 260,
    brand: 'arlon',
    inclusion: 'Trim removal, surface preparation, wrap installation and post heat.',
    summary: 'Consistent presentation across individual commercial vehicles and fleets, with careful preparation and attention to the details your customers see.',
  },
  {
    id: 'window-film',
    title: 'Window Film',
    shortTitle: 'Window Film',
    price: 260,
    brand: null,
    inclusion: 'Scrape and clean the window surface, spray, wipe and install on flat to lightly curved glass. Excludes vehicles.',
    summary: 'Precision installation for suitable flat and lightly curved glazing. Vehicle window tinting is not included in this service.',
  },
  {
    id: 'colour-change',
    title: 'Colour Change',
    shortTitle: 'Colour Change',
    price: 350,
    brand: 'arlon',
    inclusion: 'Clay bar treatment, surface preparation, vinyl installation and post heat.',
    summary: 'From subtle colour changes to bold restyling, a carefully fitted finish makes the difference.',
  },
  {
    id: 'ppf',
    title: 'Paint Protection Film',
    shortTitle: 'PPF',
    price: 350,
    brand: 'stek',
    inclusion: 'Full clean, clay bar treatment and installation using a pre-cut kit or film fitted off the roll.',
    summary: 'STEK PPF-approved installation, planned around the panels and areas you want protected.',
  },
  {
    id: 'architectural',
    title: 'Architectural Film',
    shortTitle: 'Architectural',
    price: 280,
    brand: null,
    inclusion: 'Tension test, surface preparation, primer application and installation.',
    summary: 'Transform suitable interior and architectural surfaces with the correct preparation, fit and finishing.',
  },
  {
    id: 'marine',
    title: 'Marine',
    shortTitle: 'Marine',
    price: 300,
    brand: null,
    inclusion: 'Surface preparation, material positioning and installation, working independently where required.',
    summary: 'A hands-on approach to demanding curves, larger surfaces and specialist marine applications.',
  },
];

export const contactDetails = {
  phoneDisplay: '07309 052735',
  phoneHref: 'tel:07309052735',
  bookingHref: 'https://app.cdavies.work/book',
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
    copy: 'More than twenty years in wrapping and signage, starting with Avery 800 cast film before modern air-release systems. Arlon Fleet and Restyling certified and STEK PPF approved.',
    note: 'Certified installation',
  },
  {
    tag: '04 / WHY DAVIES',
    title: 'Work done properly',
    copy: 'Careful preparation, precise fitting and straightforward communication, from your initial brief to the final details.',
    note: 'Direct specialist service',
  },
];
