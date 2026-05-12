import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://kio-school.com';
const OUTPUT_PATH = path.resolve(process.cwd(), 'build', 'sitemap.xml');
const ROUTES = ['/', '/info'];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((route) => `  <url><loc>${SITE_URL}${route === '/' ? '' : route}</loc></url>`).join('\n')}
</urlset>
`;

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, sitemap, 'utf8');
