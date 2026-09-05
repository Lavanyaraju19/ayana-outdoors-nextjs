import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.ayanaoutdoors.com';

const routes = [
  '',
  '/about',
  '/adventures',
  '/resources',
  '/resources/faqs',
  '/founder',
  '/who-we-journey-with',
  '/gallery',
  '/safety-care',
  '/sankalpa',
  '/contact',
  '/privacy',
  '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }));
}
