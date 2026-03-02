import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp'; 

const faviconPath = 'IT photo.jpg';
const inputImagePath = 'AI photo.jpg';

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/favicon.ico') {
    try {
      const favicon = await readFile(faviconPath);
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(favicon);
    } catch (err) {
      res.writeHead(404);
      res.end('Favicon not found');
    }
    return;
  }

  if (url.pathname === '/process' || url.pathname === '/') {
    try {
      const width = parseInt(url.searchParams.get('w')) || 600;

      const processedBuffer = await sharp(inputImagePath)
        .resize(width) 
        .toBuffer(); 
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(processedBuffer);
    } catch (err) {
      res.writeHead(500);
      res.end('Error processing image. Check if AI photo.jpg exists.');
    }
    return;
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Сервер працює: http://127.0.0.1:3000');
});