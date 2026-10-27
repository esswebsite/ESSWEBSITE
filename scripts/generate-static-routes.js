import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const sitemapFile = path.resolve(rootDir, 'public', 'sitemap.xml');
const templateHtmlFile = path.resolve(distDir, 'index.html');

if (!fs.existsSync(templateHtmlFile)) {
  console.error('Error: dist/index.html does not exist. Run "vite build" first.');
  process.exit(1);
}

if (!fs.existsSync(sitemapFile)) {
  console.error('Error: public/sitemap.xml does not exist.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templateHtmlFile, 'utf-8');
const sitemapContent = fs.readFileSync(sitemapFile, 'utf-8');

// Extract all <loc> URLs from sitemap.xml
const locRegex = /<loc>(https:\/\/ess\.ae(\/[^<]*))<\/loc>/g;
const routes = new Set();
let match;

while ((match = locRegex.exec(sitemapContent)) !== null) {
  let route = match[2];
  if (!route || route === '' || route === '/') {
    continue; // root already has dist/index.html
  }
  // Remove any trailing slash
  route = route.replace(/\/+$/, '');
  if (route) {
    routes.add(route);
  }
}

// Generate human-friendly page titles based on route structure
function getTitleForRoute(route) {
  const parts = route.split('/').filter(Boolean);
  if (parts.length === 0) return 'Emirates Secretarial Services (ESS) | Government Services & Medical Fitness Dubai';

  if (parts[0] === 'about') return 'About Us | Emirates Secretarial Services (ESS) & Karama Business Center';
  if (parts[0] === 'departments') return 'Government Departments & Authorized Counters | ESS Dubai';
  if (parts[0] === 'pricelist') return 'Official Government Fees & Price List | ESS Dubai';
  if (parts[0] === 'knowledge-hub') {
    if (parts.length > 1) {
      const slugTitle = parts[1].replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      return `${slugTitle} | Knowledge Hub | ESS Dubai`;
    }
    return 'Knowledge Hub & UAE Government Guides | ESS Dubai';
  }
  if (parts[0] === 'faq') return 'Frequently Asked Questions (FAQ) | ESS Dubai';
  if (parts[0] === 'contact') return 'Contact Us & Location Map | ESS Karama Business Center Dubai';
  if (parts[0] === 'team') return 'Executive Leadership & PRO Team | ESS Dubai';
  if (parts[0] === 'ceo') return 'CEO Message & Strategic Vision | ESS Dubai';
  if (parts[0] === 'awards') return 'Accreditations & Government Awards | ESS Dubai';
  if (parts[0] === 'clients') return 'Corporate Clients & Partners | ESS Dubai';
  if (parts[0] === 'events') return 'Community Events & Corporate Milestone Gallery | ESS Dubai';
  if (parts[0] === 'gallery') return 'Center Gallery & VIP Facilities | ESS Dubai';

  if (parts[0] === 'department' && parts.length > 1) {
    const deptName = parts[1].toUpperCase();
    return `${deptName} Center Services Karama Dubai | Emirates Secretarial Services (ESS)`;
  }

  if (parts[0] === 'service' && parts.length > 1) {
    const serviceName = parts[1].replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    return `${serviceName} | Official Government Processing | ESS Dubai`;
  }

  const genericName = parts[parts.length - 1].replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return `${genericName} | Emirates Secretarial Services (ESS) Dubai`;
}

console.log(`Starting physical HTML folder generation for ${routes.size} routes...`);

let generatedCount = 0;

for (const route of routes) {
  const targetDir = path.join(distDir, route);
  fs.mkdirSync(targetDir, { recursive: true });

  const canonicalUrl = `https://ess.ae${route}`;
  const pageTitle = getTitleForRoute(route);

  // Customize title, canonical URL, and OG metadata for this physical route
  let pageHtml = templateHtml;

  // Replace Title
  pageHtml = pageHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>${pageTitle}</title>`
  );

  // Replace Canonical Link
  if (pageHtml.includes('<link rel="canonical"')) {
    pageHtml = pageHtml.replace(
      /<link rel="canonical" href=".*?" \/>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );
  } else {
    pageHtml = pageHtml.replace(
      '</head>',
      `  <link rel="canonical" href="${canonicalUrl}" />\n  </head>`
    );
  }

  // Replace og:url
  pageHtml = pageHtml.replace(
    /<meta property="og:url" content=".*?" \/>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );

  // Replace og:title
  pageHtml = pageHtml.replace(
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${pageTitle}" />`
  );

  // Replace twitter:title
  pageHtml = pageHtml.replace(
    /<meta name="twitter:title" content=".*?" \/>/i,
    `<meta name="twitter:title" content="${pageTitle}" />`
  );

  const targetFile = path.join(targetDir, 'index.html');
  fs.writeFileSync(targetFile, pageHtml, 'utf-8');
  generatedCount++;
}

console.log(`Successfully generated physical index.html for ${generatedCount} routes in dist/!`);
