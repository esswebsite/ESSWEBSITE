import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.resolve(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

// Dedicated routes for sitemap.xml and robots.txt with correct MIME types
app.get('/sitemap.xml', (req, res) => {
  const sitemapFile = fs.existsSync(path.join(distPath, 'sitemap.xml'))
    ? path.join(distPath, 'sitemap.xml')
    : path.join(__dirname, 'public', 'sitemap.xml');
  if (fs.existsSync(sitemapFile)) {
    res.type('application/xml').sendFile(sitemapFile);
  } else {
    res.status(404).send('Sitemap not found');
  }
});

app.get('/robots.txt', (req, res) => {
  const robotsFile = fs.existsSync(path.join(distPath, 'robots.txt'))
    ? path.join(distPath, 'robots.txt')
    : path.join(__dirname, 'public', 'robots.txt');
  if (fs.existsSync(robotsFile)) {
    res.type('text/plain').sendFile(robotsFile);
  } else {
    res.status(404).send('Robots.txt not found');
  }
});

app.get('/sitemap.xsl', (req, res) => {
  const xslFile = fs.existsSync(path.join(distPath, 'sitemap.xsl'))
    ? path.join(distPath, 'sitemap.xsl')
    : path.join(__dirname, 'public', 'sitemap.xsl');
  if (fs.existsSync(xslFile)) {
    res.type('application/xml').sendFile(xslFile);
  } else {
    res.status(404).send('Stylesheet not found');
  }
});

// Serve static assets from compiled dist directory
app.use(express.static(distPath));

// SPA fallback: return index.html for all other routes
app.get('*', (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(503).send(
      'Production build not found. Please execute "npm run build" before running "npm start".'
    );
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
