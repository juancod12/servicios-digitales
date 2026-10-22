// Captura de pantalla con Chrome headless vía CDP (sin dependencias).
// Uso: node tools/captura.mjs <url> <salida.png> [ancho=390] [alto=844] [dpr=2] [js-antes-de-capturar] [espera-ms=2500]
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [url, salida, ancho = 390, alto = 844, dpr = 2, js = '', espera = 2500] = process.argv.slice(2);
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PUERTO = 9333 + Math.floor(Math.random() * 500);
const dormir = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PUERTO}`, '--no-first-run', '--hide-scrollbars',
  `--user-data-dir=${mkdtempSync(join(tmpdir(), 'cdp-'))}`, 'about:blank',
], { stdio: 'ignore' });

try {
  let destino;
  for (let i = 0; i < 50 && !destino; i++) {
    await dormir(200);
    try {
      const lista = await (await fetch(`http://127.0.0.1:${PUERTO}/json`)).json();
      destino = lista.find((t) => t.type === 'page');
    } catch {}
  }
  const ws = new WebSocket(destino.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r));
  let id = 0;
  const pendientes = new Map();
  ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pendientes.has(m.id)) { pendientes.get(m.id)(m); pendientes.delete(m.id); }
    if (m.method === 'Runtime.exceptionThrown') console.error('EXCEPCION:', m.params.exceptionDetails.exception?.description);
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') console.error('CONSOLE.ERROR:', m.params.args.map((a) => a.value ?? a.description).join(' '));
    if (m.method === 'Network.loadingFailed') console.error('FALLO RED:', m.params.errorText);
    if (m.method === 'Network.responseReceived' && m.params.response.status >= 400) console.error('HTTP', m.params.response.status, m.params.response.url);
  });
  const cdp = (method, params = {}) => new Promise((r) => { const i = ++id; pendientes.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

  await cdp('Runtime.enable');
  await cdp('Network.enable');
  await cdp('Emulation.setDeviceMetricsOverride', { width: +ancho, height: +alto, deviceScaleFactor: +dpr, mobile: +ancho < 800 });
  await cdp('Page.enable');
  await cdp('Page.navigate', { url });
  await dormir(+espera);
  if (js) {
    const r = await cdp('Runtime.evaluate', { expression: js, awaitPromise: true, returnByValue: true });
    if (r.result?.result?.value !== undefined) console.log('JS =>', JSON.stringify(r.result.result.value));
    await dormir(1200);
  }
  const shot = await cdp('Page.captureScreenshot', { format: salida.endsWith('.jpg') ? 'jpeg' : 'png', quality: salida.endsWith('.jpg') ? 85 : undefined });
  writeFileSync(salida, Buffer.from(shot.result.data, 'base64'));
  console.log('OK', salida);
  ws.close();
} finally {
  chrome.kill();
}
