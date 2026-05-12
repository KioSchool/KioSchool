import { URLS } from '@constants/urls';

interface MarketingOrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
  description: string;
}

interface MarketingWebsiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  inLanguage: string;
}

interface MarketingServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'Service';
  name: string;
  serviceType: string;
  provider: {
    '@type': 'Organization';
    name: string;
  };
  areaServed: string;
  audience: {
    '@type': 'Audience';
    audienceType: string;
  };
  description: string;
  url: string;
}

interface MarketingHeadElement {
  type: string;
  props: Record<string, string>;
  children?: string;
}

export interface MarketingSeoConfigEntry {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImageUrl: string;
  structuredData: object[];
}

const MARKETING_OG_IMAGE_URL = `${URLS.EXTERNAL.KIO_SCHOOL}/preview.png`;

const ORGANIZATION_SCHEMA: MarketingOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '키오스쿨',
  url: URLS.EXTERNAL.KIO_SCHOOL,
  logo: `${URLS.EXTERNAL.KIO_SCHOOL}/logo192.png`,
  sameAs: [URLS.EXTERNAL.INSTAGRAM, URLS.EXTERNAL.YOUTUBE],
  description: '대학 축제 주점을 위한 QR 주문, 실시간 주문 관리, 자동 정산 서비스',
};

const WEBSITE_SCHEMA: MarketingWebsiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '키오스쿨',
  url: URLS.EXTERNAL.KIO_SCHOOL,
  description: '대학 축제 주점을 위한 QR 주문 서비스 키오스쿨',
  inLanguage: 'ko-KR',
};

const SERVICE_SCHEMA: MarketingServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '키오스쿨',
  serviceType: '대학 축제 주점 QR 주문 서비스',
  provider: {
    '@type': 'Organization',
    name: '키오스쿨',
  },
  areaServed: 'KR',
  audience: {
    '@type': 'Audience',
    audienceType: '대학 축제 주점 운영자 및 학생회',
  },
  description: '대학 축제 주점을 위한 QR 주문, 실시간 주문 관리, 자동 정산, 테이블 관리 서비스',
  url: `${URLS.EXTERNAL.KIO_SCHOOL}/info`,
};

export type MarketingSeoKey = 'home' | 'info';

type MarketingSeoConfig = Record<MarketingSeoKey, MarketingSeoConfigEntry>;

export const MARKETING_SEO: MarketingSeoConfig = {
  home: {
    title: '키오스쿨 | 대학 축제 주점 QR 주문·실시간 주문 관리 서비스',
    description: '대학 축제 주점을 위한 QR 주문 서비스 키오스쿨. 테이블 주문, 실시간 주문 관리, 자동 정산까지 한 번에 운영하세요.',
    canonicalUrl: URLS.EXTERNAL.KIO_SCHOOL,
    ogImageUrl: MARKETING_OG_IMAGE_URL,
    structuredData: [WEBSITE_SCHEMA, ORGANIZATION_SCHEMA],
  },
  info: {
    title: '키오스쿨 소개 | 대학 축제 주점 운영을 위한 QR 주문 서비스',
    description: '키오스쿨의 QR 주문, 실시간 주문 관리, 자동 정산, 테이블 관리 기능을 확인하세요. 대학 축제 주점 운영을 더 쉽고 안정적으로 바꿉니다.',
    canonicalUrl: `${URLS.EXTERNAL.KIO_SCHOOL}/info`,
    ogImageUrl: MARKETING_OG_IMAGE_URL,
    structuredData: [ORGANIZATION_SCHEMA, SERVICE_SCHEMA],
  },
};

export function getMarketingSeoKeyByPathname(pathname: string): MarketingSeoKey {
  return pathname === '/info' ? 'info' : 'home';
}

export function getMarketingSeoByPathname(pathname: string): MarketingSeoConfigEntry {
  return MARKETING_SEO[getMarketingSeoKeyByPathname(pathname)];
}

export function getMarketingHeadElements(pathname: string): Set<MarketingHeadElement> {
  const seo = getMarketingSeoByPathname(pathname);
  const headElements: MarketingHeadElement[] = [
    { type: 'meta', props: { name: 'description', content: seo.description } },
    { type: 'meta', props: { name: 'robots', content: 'index, follow' } },
    { type: 'link', props: { rel: 'canonical', href: seo.canonicalUrl } },
    { type: 'meta', props: { property: 'og:type', content: 'website' } },
    { type: 'meta', props: { property: 'og:site_name', content: '키오스쿨' } },
    { type: 'meta', props: { property: 'og:title', content: seo.title } },
    { type: 'meta', props: { property: 'og:description', content: seo.description } },
    { type: 'meta', props: { property: 'og:url', content: seo.canonicalUrl } },
    { type: 'meta', props: { property: 'og:image', content: seo.ogImageUrl } },
    { type: 'meta', props: { name: 'twitter:card', content: 'summary_large_image' } },
    { type: 'meta', props: { name: 'twitter:title', content: seo.title } },
    { type: 'meta', props: { name: 'twitter:description', content: seo.description } },
    { type: 'meta', props: { name: 'twitter:image', content: seo.ogImageUrl } },
  ];

  seo.structuredData.forEach((item) => {
    headElements.push({
      type: 'script',
      props: { type: 'application/ld+json' },
      children: JSON.stringify(item),
    });
  });

  return new Set(headElements);
}
