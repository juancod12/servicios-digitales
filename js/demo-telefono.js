/* ==========================================================================
   menuFast — demo interactiva dentro del mini teléfono
   - Pestañas generadas desde config.js (solo planes con demo).
   - El iframe se renderiza a tamaño real (390×844) y se escala con transform
     para que el menú se vea igual que en un celular.
   - Carga diferida: la demo solo se pide cuando la sección es visible.
   ========================================================================== */
(function () {
  'use strict';

  const CFG = window.MENUFAST;
  const util = window.menuFastUtil;
  const $pestanas = document.getElementById('demo-pestanas');
  const $pantalla = document.getElementById('demo-pantalla');
  const $iframe = document.getElementById('demo-iframe');
  const $info = document.getElementById('demo-info');
  const $qr = document.getElementById('demo-qr');
  const $completa = document.getElementById('demo-completa');
  const $fallback = document.getElementById('demo-fallback');
  if (!CFG || !util || !$pestanas || !$iframe) return;

  const ANCHO = 390;
  const ALTO = 844;
  const ESPERA_MAX = 10000; // ms antes de mostrar el fallback
  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const planes = CFG.planes.filter((p) => p.demo);
  if (!planes.length) {
    document.getElementById('demo')?.remove();
    return;
  }

  let activo = null;
  let visible = false;
  let temporizador = null;
  let fallo = false; // la demo activa respondió con error

  const track = (evento, datos) => window.menuFastTrack?.(evento, datos);

  // URL absoluta de una demo (para la pantalla completa y el fallback).
  const base = () => (CFG.urlPublica ? CFG.urlPublica.replace(/\/?$/, '/') : new URL('.', location.href).href);
  const urlDemo = (plan) => new URL(plan.demo, base()).href;
  // El QR pasa por qr.html, que registra el escaneo y redirige a la demo.
  const urlQR = (plan) => new URL(`qr.html?plan=${encodeURIComponent(plan.id)}`, base()).href;

  /* ---------- Escalado del iframe ---------- */
  const escalar = () => {
    const ancho = $pantalla.clientWidth;
    const estilos = getComputedStyle($pantalla);
    const alto = $pantalla.clientHeight - parseFloat(estilos.paddingTop);
    const escala = ancho / ANCHO;
    $iframe.style.top = estilos.paddingTop;
    $iframe.style.width = ANCHO + 'px';
    $iframe.style.height = Math.round(alto / escala) + 'px'; // ocupa todo el alto disponible
    $iframe.style.transform = `scale(${escala})`;
  };
  new ResizeObserver(escalar).observe($pantalla);

  /* ---------- QR ---------- */
  // La librería del QR se descarga solo cuando la demo está por verse.
  const pintarQR = (url) => {
    if (typeof window.qrcode !== 'function') {
      util
        .cargarScript(util.LIBS.qr)
        .then(() => activo && pintarQR(urlQR(activo)))
        .catch(() => ($qr.textContent = 'QR no disponible'));
      return;
    }
    const qr = window.qrcode(0, 'M');
    qr.addData(url);
    qr.make();
    const n = qr.getModuleCount();
    let d = '';
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) if (qr.isDark(y, x)) d += `M${x} ${y}h1v1h-1z`;
    }
    $qr.innerHTML = `<svg viewBox="-2 -2 ${n + 4} ${n + 4}" class="size-full" shape-rendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="${d}"/></svg>`;
    $qr.setAttribute('aria-label', `Código QR que abre la demo: ${url}`);
    $qr.dataset.url = url;
  };

  /* ---------- Información del plan ---------- */
  const pintarInfo = (plan) => {
    const precio = (plan.precioDesde ? 'Desde ' : '') + util.formatearCOP(plan.precio);
    $info.innerHTML = `
      <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 class="text-2xl">Estás viendo: ${plan.nombre}</h3>
        <p class="font-display text-lg font-bold text-amarillo">${precio} <span class="text-sm font-medium text-gris-claro">· pago único</span></p>
      </div>
      <ul class="mt-5 grid gap-2.5">
        ${plan.caracteristicas.map((c) => `<li class="beneficio-hero">${c}</li>`).join('')}
      </ul>
      ${plan.nota ? `<p class="mt-5 border-t border-blanco/10 pt-4 text-sm text-gris-claro">${plan.nota}</p>` : ''}
      <a data-wa data-wa-plan="${plan.nombre}" data-origen="demo" class="btn-cta mt-6">Quiero este plan</a>`;
    util.pintarEnlacesWhatsApp($info);
  };

  /* ---------- Fallback ---------- */
  const mostrarFallback = (plan, mostrar) => {
    $fallback.hidden = !mostrar;
    if (mostrar) window.gsap?.killTweensOf($iframe);
    $iframe.style.visibility = mostrar ? 'hidden' : '';
    if (mostrar) {
      const img = document.getElementById('demo-fallback-img');
      img.src = plan.captura || '';
      img.alt = `Captura del ${plan.nombre}`;
      document.getElementById('demo-fallback-enlace').href = urlDemo(plan);
    }
  };

  // Comprueba que la demo realmente cargó (mismo origen: se puede inspeccionar).
  $iframe.addEventListener('load', () => {
    if (!$iframe.src || $iframe.src === 'about:blank') return;
    clearTimeout(temporizador);
    let ok = false;
    try {
      const doc = $iframe.contentDocument;
      ok = !!doc && !!doc.body && doc.body.children.length > 0 && !/404|not found/i.test(doc.title);
    } catch (e) {
      ok = true; // otro origen: si llegó el evento load, asumimos que cargó
    }
    const falla = !ok || fallo;
    mostrarFallback(activo, falla);
    if (!falla && window.gsap && !sinMovimiento) {
      gsap.fromTo($iframe, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: 'power2.out' });
    }
  });
  $iframe.addEventListener('error', () => mostrarFallback(activo, true));

  const cargarIframe = (plan) => {
    clearTimeout(temporizador);
    fallo = false;
    mostrarFallback(plan, false);
    temporizador = setTimeout(() => mostrarFallback(plan, true), ESPERA_MAX);
    // Una página 404 también dispara "load": se comprueba antes que la demo exista.
    fetch(plan.demo, { method: 'HEAD', cache: 'no-store' })
      .then((r) => {
        if (!r.ok && plan === activo) {
          fallo = true;
          clearTimeout(temporizador);
          mostrarFallback(plan, true);
        }
      })
      .catch(() => {}); // sin servidor (file://) no se puede comprobar
    $iframe.title = `Demo interactiva del ${plan.nombre}`;
    $iframe.src = plan.demo;
  };

  /* ---------- Cambiar de plan ---------- */
  const activar = (id, { foco = false, usuario = false } = {}) => {
    const plan = planes.find((p) => p.id === id);
    if (!plan || plan === activo) return;
    activo = plan;

    $pestanas.querySelectorAll('[role="tab"]').forEach((t) => {
      const sel = t.dataset.plan === id;
      t.setAttribute('aria-selected', String(sel));
      t.tabIndex = sel ? 0 : -1;
      if (sel && foco) t.focus();
    });
    $pantalla.setAttribute('aria-labelledby', `pestana-${id}`);

    pintarInfo(plan);
    if (visible) pintarQR(urlQR(plan));
    $completa.href = plan.demo;
    $completa.onclick = () => track('demo_pantalla_completa', { plan: plan.id });
    if (usuario) track('demo_cambio_plan', { plan: plan.id });

    if (!visible) return; // aún no se ve la sección: se carga al aparecer
    if (window.gsap && !sinMovimiento && $iframe.src) {
      gsap.to($iframe, { autoAlpha: 0, duration: 0.2, ease: 'power1.in', onComplete: () => cargarIframe(plan) });
      gsap.fromTo($info, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    } else {
      cargarIframe(plan);
    }
  };

  /* ---------- Pestañas accesibles (flechas, Inicio, Fin) ---------- */
  $pestanas.innerHTML = planes
    .map(
      (p) => `<button type="button" role="tab" id="pestana-${p.id}" data-plan="${p.id}" aria-controls="demo-pantalla"
         aria-selected="false" tabindex="-1" class="pestana">${p.nombre.replace(/^Menú /, '')}</button>`
    )
    .join('');
  $pestanas.addEventListener('click', (e) => {
    const t = e.target.closest('[role="tab"]');
    if (t) activar(t.dataset.plan, { usuario: true });
  });
  $pestanas.addEventListener('keydown', (e) => {
    const tabs = [...$pestanas.querySelectorAll('[role="tab"]')];
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    const destino = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (destino === undefined) return;
    e.preventDefault();
    const t = tabs[(destino + tabs.length) % tabs.length];
    activar(t.dataset.plan, { foco: true, usuario: true });
  });

  /* ---------- Carga diferida al ver la sección ---------- */
  activar(planes[0].id);
  new IntersectionObserver(
    (entradas, obs) => {
      if (!entradas.some((e) => e.isIntersecting)) return;
      visible = true;
      cargarIframe(activo);
      pintarQR(urlQR(activo));
      track('demo_visible', { plan: activo.id });
      obs.disconnect();
    },
    { rootMargin: '200px 0px' }
  ).observe($pantalla);
})();
