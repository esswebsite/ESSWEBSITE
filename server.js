import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve distribution and asset directories
const possibleDistDirs = [
  path.resolve(__dirname, 'dist'),
  path.resolve(__dirname),
  path.resolve(process.cwd(), 'dist'),
  path.resolve(process.cwd()),
];

const findFile = (relativeFilePath) => {
  for (const baseDir of possibleDistDirs) {
    const candidate = path.join(baseDir, relativeFilePath);
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
};

// 1. Dedicated XML & Robots Routes
app.get('/sitemap.xml', (req, res) => {
  const filePath = findFile('sitemap.xml');
  if (filePath) {
    res.type('application/xml').sendFile(filePath);
  } else {
    res.status(404).send('sitemap.xml not found');
  }
});

app.get('/robots.txt', (req, res) => {
  const filePath = findFile('robots.txt');
  if (filePath) {
    res.type('text/plain').sendFile(filePath);
  } else {
    res.status(404).send('robots.txt not found');
  }
});

app.get('/sitemap.xsl', (req, res) => {
  const filePath = findFile('sitemap.xsl');
  if (filePath) {
    res.type('application/xml').sendFile(filePath);
  } else {
    res.status(404).send('sitemap.xsl not found');
  }
});

// 2. Serve static assets from 'dist' if it exists, or from root
const primaryDist = possibleDistDirs.find((d) => fs.existsSync(d) && fs.existsSync(path.join(d, 'index.html'))) || possibleDistDirs[0];

app.use(
  express.static(primaryDist, {
    maxAge: '1y',
    immutable: true,
    index: false, // Do not auto-serve index.html for directories; handled by SPA fallback
    setHeaders: (res, pathHeader) => {
      if (pathHeader.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    },
  })
);

// 3. SPA Fallback: Serve index.html for ALL routes (including direct page reloads and deep links)
// Supports: /about, /departments, /pricelist, /knowledge-hub/*, /faq, /contact, /team, /ceo,
// /department/*, /service/*, etc.
app.get('*', (req, res) => {
  const indexFile = findFile('index.html');
  if (indexFile) {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.sendFile(indexFile);
  } else {
    res.status(503).send(
      'Production build not found. Please run "npm run build" before running "npm start".'
    );
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`ESS Server running at http://0.0.0.0:${PORT}`);
  console.log(`Serving static files from: ${primaryDist}`);
});
