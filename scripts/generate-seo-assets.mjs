import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://kio-school.com';
const OUTPUT_DIRECTORY = path.resolve(process.cwd(), 'build');
const ROBOTS_PATH = path.resolve(OUTPUT_DIRECTORY, 'robots.txt');
const SITEMAP_PATH = path.resolve(OUTPUT_DIRECTORY, 'sitemap.xml');
const ROUTES = ['/', '/info'];
const mode = process.argv[2] ?? 'production';
const isProduction = mode === 'production';

function writeRobotsFile() {
  const robotsContent = isProduction
    ? `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n';

  fs.writeFileSync(ROBOTS_PATH, robotsContent, 'utf8');
}

function writeSitemapFile() {
  if (!isProduction) {
    return;
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((route) => `  <url><loc>${SITE_URL}${route === '/' ? '' : route}</loc></url>`).join('\n')}
</urlset>
`;

  fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');
}

fs.mkdirSync(OUTPUT_DIRECTORY, { recursive: true });
writeRobotsFile();
writeSitemapFile();
