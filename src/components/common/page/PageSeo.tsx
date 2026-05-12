import { Helmet } from 'react-helmet-async';
import type { MarketingSeoConfigEntry } from '@constants/marketingSeo';

function PageSeo({ title, description, canonicalUrl, ogImageUrl, structuredData }: MarketingSeoConfigEntry) {
  return (
    <Helmet prioritizeSeoTags={true}>
      <html lang="ko" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="키오스쿨" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      {structuredData.map((item) => (
        <script key={JSON.stringify(item)} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}

export default PageSeo;
