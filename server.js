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
