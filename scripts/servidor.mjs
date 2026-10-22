// Servidor local de vista previa con compresión gzip (como un hosting real).
// Uso: node scripts/servidor.mjs [puerto=5500]   → http://localhost:5500
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const PUERTO = Number(process.argv[2] || 5500);
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml',
};
const COMPRIMIBLE = new Set(['.html', '.css', '.js', '.json', '.svg', '.txt', '.xml', '.webmanifest']);

createServer(async (req, res) => {
  try {
    let ruta = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (ruta.endsWith('/')) ruta += 'index.html';
    const archivo = normalize(join(RAIZ, ruta));
    if (!archivo.startsWith(normalize(RAIZ)) || archivo.includes(`${normalize('/tools/')}`)) throw new Error('fuera');
    if (!(await stat(archivo)).isFile()) throw new Error('no es archivo');
    let datos = await readFile(archivo);
    const ext = extname(archivo).toLowerCase();
    const cabeceras = { 'Content-Type': TIPOS[ext] || 'application/octet-stream', 'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600' };
    if (COMPRIMIBLE.has(ext) && /gzip/.test(req.headers['accept-encoding'] || '')) {
      datos = gzipSync(datos);
      cabeceras['Content-Encoding'] = 'gzip';
    }
    res.writeHead(200, cabeceras);
    res.end(req.method === 'HEAD' ? undefined : datos);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 - No encontrado');
  }
}).listen(PUERTO, () => console.log(`menuFast en http://localhost:${PUERTO}`));
