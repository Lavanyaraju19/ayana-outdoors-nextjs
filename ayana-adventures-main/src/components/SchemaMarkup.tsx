"use client";

import { usePathname } from 'next/navigation';

const SITE_URL = 'https://www.ayanaoutdoors.com';

const pageMeta: Record<string, { name: string; description: string }> = {
  '/': {
    name: 'Outdoor Learning for Children | Ayana Outdoors',
    description: 'Ayana Outdoors builds confidence, leadership and life skills through trekking, travel and outdoor experiences for children, families and schools.',
  },
  '/about': {
    name: 'Who We Are | Ayana Outdoors',
    description: 'Learn who Ayana Outdoors is and how we help children grow beyond the classroom through outdoor learning experiences.',
  },
  '/adventures': {
    name: 'Upcoming Adventures | Ayana Outdoors',
    description: 'Explore upcoming outdoor learning experiences for children, families, schools and teachers.',
  },
  '/resources': {
    name: 'Resources | Ayana Outdoors',
    description: 'Browse resources for parents and schools, including FAQs, safety care, founder story and Sankalpa.',
  },
  '/resources/faqs': {
    name: 'Frequently Asked Questions | Ayana Outdoors',
    description: 'Find answers about outdoor learning programs, safety standards, preparation, children, families and schools.',
  },
  '/founder': {
    name: 'Founder Story | Ayana Outdoors',
    description: 'Read the story of Mountain Manju, Founder, Outdoor Educator and NIM Certified Trek Leader.',
  },
  '/who-we-journey-with': {
    name: 'Who We Journey With | Ayana Outdoors',
    description: 'Outdoor learning for children, families, schools and teachers at every stage of growing up.',
  },
  '/gallery': {
    name: 'Gallery | Ayana Outdoors',
    description: 'View photos and videos from outdoor learning programs, treks, camps and family experiences.',
  },
  '/safety-care': {
    name: 'Safety & Care | Ayana Outdoors',
    description: 'Learn about preparation, supervision, parent communication and safe outdoor learning practices.',
  },
  '/sankalpa': {
    name: 'Sankalpa | Ayana Outdoors',
    description: 'Explore the Ayana Outdoors commitment to safe, meaningful and responsible outdoor learning.',
  },
  '/contact': {
    name: 'Connect With Us | Ayana Outdoors',
    description: 'Contact Ayana Outdoors for outdoor learning guidance and program support.',
  },
};

const getPageMeta = (pathname: string) => (
  pageMeta[pathname] || {
    name: 'Ayana Outdoors',
    description: 'Ayana Outdoors creates outdoor learning experiences for children, families and schools.',
  }
);

interface SchemaMarkupProps {
  addressLocality: string;
  addressRegion: string;
  faqItems?: { question: string; answer: string }[];
}

const SchemaMarkup = ({ addressLocality, addressRegion, faqItems = [] }: SchemaMarkupProps) => {
  const pathname = usePathname();
  const canonicalUrl = `${SITE_URL}${pathname}`;
  const currentPage = getPageMeta(pathname);

  const schemas: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Ayana Outdoors',
      url: SITE_URL,
      foundingDate: '2015',
      address: {
        '@type': 'PostalAddress',
        addressLocality,
        addressRegion,
        addressCountry: 'IN',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Ayana Outdoors',
      url: SITE_URL,
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      name: currentPage.name,
      description: currentPage.description,
      url: canonicalUrl,
      isPartOf: {
        '@id': `${SITE_URL}/#website`,
      },
      about: {
        '@id': `${SITE_URL}/#organization`,
      },
    },
  ];

  if (pathname === '/resources/faqs' && faqItems.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faq`,
      mainEntity: faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={String(schema['@id'] || schema['@type'])}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};

export default SchemaMarkup;
