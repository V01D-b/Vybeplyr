'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { URL } = require('node:url');

const ROOT = __dirname;
const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number(process.env.PORT || 4173);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ogg': 'audio/ogg', '.m4a': 'audio/mp4',
};
const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url || '/', `http://${req.headers.host || `${HOST}:${PORT}`}`);
  let pathname;
  try { pathname = decodeURIComponent(requestUrl.pathname); } catch { res.writeHead(400); res.end('Bad request'); return; }
  if (pathname === '/') pathname = '/index.html';
  const target = path.resolve(ROOT, `.${pathname}`);
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.stat(target, (statError, stat) => {
    if (statError || !stat.isFile()) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Not found'); return; }
    const headers = {
      'Content-Type': TYPES[path.extname(target).toLowerCase()] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Cache-Control': ['.html', '.js', '.css', '.webmanifest'].includes(path.extname(target).toLowerCase()) ? 'no-cache' : 'public, max-age=3600',
    };
    if (req.method === 'HEAD') { res.writeHead(200, headers); res.end(); return; }
    const stream = fs.createReadStream(target);
    res.writeHead(200, headers);
    stream.on('error', () => { if (!res.headersSent) res.writeHead(500); res.end('Server error'); });
    stream.pipe(res);
  });
});
server.listen(PORT, HOST, () => {
  console.log(`VYBE is running at http://${HOST}:${PORT}`);
  console.log('Press Ctrl+C to stop the local server.');
});
