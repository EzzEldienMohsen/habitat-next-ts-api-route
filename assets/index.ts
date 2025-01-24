import { FooterColumn, HeaderLinks } from './types';
// Header Links
export const headerLinks: HeaderLinks = [
  'about',
  'products',
  'contact',
  'profile',
];

export const productsTypes: HeaderLinks = [
  'all',
  'rock',
  'root',
  'tank',
  'soil',
];

export const footerShop: FooterColumn = {
  title: 'shop',
  list: ['Shop Live Plants', 'Shop Live Fish', 'Shop Hardscape'],
};
export const footerCompany: FooterColumn = {
  title: 'company',
  list: ['about us', 'contact us', 'career'],
};
export const footerAddress: FooterColumn = {
  title: 'Address',
  list: ['123 Some St Name Tampa, FL USA 33605'],
};

// Single Product
export const infoBtn: string[] = ['details', 'care & maintenance'];
export const careData: { id: number; para1: string; para2: string }[] = [
  { id: 1, para1: 'Lighting', para2: 'Low to Medium' },
  { id: 2, para1: 'Care', para2: 'Easy' },
  { id: 3, para1: 'CO2', para2: 'Optional' },
  { id: 4, para1: 'Placement', para2: 'Midground' },
  { id: 5, para1: 'Propagation', para2: 'Separate rhizome and plant' },
  { id: 6, para1: 'Propagation', para2: 'Growth Rate' },
  { id: 7, para1: 'Leaf Size', para2: '4-6"' },
];
export const detailsData: { id: number; para1: string; para2?: string }[] = [
  {
    id: 1,
    para1:
      'Cryptocoryne Wendtii Green Gecko is a perfect choice for beginners due to its hardiness and ability to grow in a wide range of planted aquarium tank parameters. Cryptocoryne Wendtii Green Gecko’s coloration depends on its environment and has the potential to present varying shades of green.',
  },
  {
    id: 2,
    para1:
      'Like most Cryptocoryne species, Crypt. Wendtii Green Gecko grows at a slow rate and is relatively undemanding in care. Providing this aquatic plant with quality aquarium LED lighting, CO2 injection and quality aquarium soil will help yield more robust and lush growth. To propagate, simply cut off new plantlets growing from the mother plant and replant it into quality aquarium soil.',
  },
];
export const inst: { id: number; title: string; text: string }[] = [
  { id: 1, title: 'Shipping', text: 'We offer country-wide shipping.' },
  {
    id: 2,
    title: 'Difficulty Level',
    text: 'Fast-growing and easy to care for, this is a great choice for beginner aquascape enthusiasts. Does not require CO2 supplementation.',
  },
  {
    id: 3,
    title: 'Return & Exchange',
    text: 'If you are not satisfied with your purchase you can return it to us within 14 days for an exchange or refund. For more info email us at hello@habitatscapes.com',
  },
  { id: 4, title: 'Help', text: 'Email us at service@habitatscapes.com' },
];
// Client links

export const clientLinks:HeaderLinks = ["profile","address"]