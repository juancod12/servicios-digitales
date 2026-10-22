/* ==========================================================================
   menuFast — lógica general de la página
   ========================================================================== */
(function () {
  'use strict';

  const CFG = window.MENUFAST;
  if (!CFG) {
    console.error('menuFast: falta js/config.js');
    return;
  }

  /* ---------- Prueba A/B del titular (desactivada por defecto) ----------
     Si config.hero.pruebaAB.activa = true, cada visitante recibe la versión A o B
     (se recuerda en su navegador) y la versión viaja en todos los eventos. */
  let versionTitular = 'original';
  const ab = CFG.hero && CFG.hero.pruebaAB;
  if (ab && ab.activa) {
    try {
      versionTitular = localStorage.getItem('menufast_ab');
    } catch (e) {}
    if (versionTitular !== 'A' && versionTitular !== 'B') {
      versionTitular = Math.random() < 0.5 ? 'A' : 'B';
      try { localStorage.setItem('menufast_ab', versionTitular); } catch (e) {}
    }
    const h1 = document.getElementById('hero-titulo');
    if (h1) h1.textContent = versionTitular === 'A' ? ab.versionA : ab.versionB;
  }

  /* ---------- Medición ----------
     Única puerta de salida de los eventos. Hoy solo escribe en la consola.
     TODO: conectar la herramienta de analítica (config.analitica). Con GA4 basta
     cargar gtag.js con el id y esta función ya envía los eventos. */
  const track = (evento, datos = {}) => {
    const payload = { ...datos, version_titular: versionTitular };
    console.log('[menuFast]', evento, payload);
    if (CFG.analitica && CFG.analitica.proveedor === 'ga4' && typeof window.gtag === 'function') {
      window.gtag('event', evento, payload);
    }
  };
  window.menuFastTrack = track;

  /* ---------- Utilidades ---------- */

  // 100000 → "$100.000"
  const formatearCOP = (valor) =>
    '$' + Math.round(valor).toLocaleString('es-CO', { maximumFractionDigits: 0 }).replace(/,/g, '.');

  // "573044168961" → "+57 304 416 8961"
  const formatearTelefono = (numero) => {
    const m = String(numero).match(/^(\d{2})(\d{3})(\d{3})(\d{4})$/);
    return m ? `+${m[1]} ${m[2]} ${m[3]} ${m[4]}` : `+${numero}`;
  };

  // Arma el enlace de WhatsApp con el mensaje prellenado.
  // opciones: { tipo: 'Pizzería', plan: 'Menú Pro' } (ambas opcionales)
  const enlaceWhatsApp = (opciones = {}) => {
    const { tipo, plan } = opciones;
    const w = CFG.whatsapp;
    let mensaje = tipo
      ? w.mensajeConTipo.replace('{tipo}', tipo.toLowerCase())
      : w.mensajeSinTipo;
    if (plan) mensaje += w.sufijoPlan.replace('{plan}', plan);
    return `https://wa.me/${CFG.contacto.numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  };

  // Carga un script externo una sola vez (librerías que no hacen falta al inicio).
  const cargados = {};
  const cargarScript = (src) =>
    (cargados[src] ||= new Promise((ok, falla) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = ok;
      s.onerror = falla;
      document.head.appendChild(s);
    }));

  // Librerías por CDN con versión fija.
  const LIBS = {
    gsap: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
    scrollTrigger: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
    qr: 'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js',
  };

  // Expone las utilidades para los demás scripts.
  window.menuFastUtil = { formatearCOP, formatearTelefono, enlaceWhatsApp, cargarScript, LIBS };

  /* ---------- Enlaces de WhatsApp declarativos ----------
     <a data-wa data-wa-tipo="Pizzería" data-wa-plan="Menú Pro"> */
  const pintarEnlacesWhatsApp = (raiz = document) => {
    raiz.querySelectorAll('[data-wa]').forEach((el) => {
      el.href = enlaceWhatsApp({ tipo: el.dataset.waTipo, plan: el.dataset.waPlan });
      el.target = '_blank';
      el.rel = 'noopener';
    });
  };
  window.menuFastUtil.pintarEnlacesWhatsApp = pintarEnlacesWhatsApp;

  /* ---------- Datos de contacto en el DOM ---------- */
  const pintarContacto = () => {
    document.querySelectorAll('[data-telefono]').forEach((el) => {
      el.textContent = formatearTelefono(CFG.contacto.numeroWhatsApp);
    });
    document.querySelectorAll('[data-instagram]').forEach((el) => {
      if (!CFG.contacto.instagram) return el.closest('[data-opcional]')?.remove();
      el.href = `https://www.instagram.com/${CFG.contacto.instagram}/`;
      const txt = el.querySelector('[data-instagram-texto]');
      if (txt) txt.textContent = '@' + CFG.contacto.instagram;
    });
    document.querySelectorAll('[data-correo]').forEach((el) => {
      if (!CFG.contacto.correo) return el.closest('[data-opcional]')?.remove();
      el.href = `mailto:${CFG.contacto.correo}`;
      el.textContent = CFG.contacto.correo;
    });
    document.querySelectorAll('[data-anio]').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  };

  /* ---------- Color de la barra del navegador (desde los tokens) ---------- */
  const pintarThemeColor = () => {
    const color = getComputedStyle(document.documentElement).getPropertyValue('--color-carbon').trim();
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta && color) meta.content = color;
  };

  /* ---------- Header: estado al hacer scroll + menú móvil ---------- */
  const iniciarHeader = () => {
    const header = document.getElementById('header');
    const boton = document.getElementById('menu-boton');
    const panel = document.getElementById('menu-movil');
    if (!header || !boton || !panel) return;

    const alScroll = () => header.toggleAttribute('data-scroll', window.scrollY > 24);
    alScroll();
    window.addEventListener('scroll', alScroll, { passive: true });

    const abrir = (abierto) => {
      boton.setAttribute('aria-expanded', String(abierto));
      boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
      panel.hidden = !abierto;
      header.toggleAttribute('data-menu-abierto', abierto);
      if (abierto) panel.querySelector('a')?.focus();
    };

    boton.addEventListener('click', () => abrir(boton.getAttribute('aria-expanded') !== 'true'));
    panel.addEventListener('click', (e) => {
      if (e.target.closest('a')) abrir(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && boton.getAttribute('aria-expanded') === 'true') {
        abrir(false);
        boton.focus();
      }
    });
    // Al pasar a escritorio se cierra el panel móvil.
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
      if (e.matches) abrir(false);
    });
  };

  /* ---------- Botón flotante de WhatsApp ----------
     Aparece al bajar del hero y se esconde donde ya hay botones principales
     (hero, demo, planes, preguntas, cierre, footer) para no taparlos. */
  const iniciarFlotante = () => {
    const btn = document.getElementById('wa-flotante');
    if (!btn) return;
    const zonas = ['inicio', 'demo', 'planes', 'preguntas', 'contacto'].map((id) => document.getElementById(id)).filter(Boolean);
    const pie = document.querySelector('footer');
    if (pie) zonas.push(pie);
    const visibles = new Set();
    const actualizar = () => {
      const mostrar = visibles.size === 0;
      btn.toggleAttribute('data-visible', mostrar);
      btn.toggleAttribute('inert', !mostrar); // oculto = no enfocable ni clicable
    };
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => (e.isIntersecting ? visibles.add(e.target) : visibles.delete(e.target)));
      actualizar();
    });
    zonas.forEach((z) => obs.observe(z));
    actualizar();
  };

  /* ---------- Eventos de medición ---------- */
  const iniciarMedicion = () => {
    // Clic en cualquier botón de WhatsApp (delegado: incluye los generados por JS).
    document.addEventListener('click', (e) => {
      const a = e.target.closest('[data-wa]');
      if (!a) return;
      track('clic_whatsapp', {
        origen: a.dataset.origen || a.closest('section, header, footer')?.id || 'otro',
        plan: a.dataset.waPlan || null,
        tipo_negocio: a.dataset.waTipo || null,
      });
    });
    // Visita a la sección de precios (una vez por carga).
    const planes = document.getElementById('planes');
    if (planes) {
      const obs = new IntersectionObserver((ent) => {
        if (ent.some((x) => x.isIntersecting)) {
          track('visita_precios');
          obs.disconnect();
        }
      }, { threshold: 0.25 });
      obs.observe(planes);
    }
  };

  /* ---------- Datos estructurados (SEO) desde config.js ---------- */
  const pintarDatosEstructurados = () => {
    const datos = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: CFG.marca,
      description: CFG.categoria + '. Menús digitales personalizados con fotos, precios, categorías y código QR.',
      areaServed: { '@type': 'Country', name: 'Colombia' },
      telephone: '+' + CFG.contacto.numeroWhatsApp,
      sameAs: CFG.contacto.instagram ? [`https://www.instagram.com/${CFG.contacto.instagram}/`] : undefined,
      url: CFG.urlPublica || undefined,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Planes de menú digital',
        itemListElement: CFG.planes.map((p) => ({
          '@type': 'Offer',
          name: p.nombre,
          description: p.caracteristicas.join('. '),
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'COP',
            ...(p.precioDesde ? { minPrice: p.precio } : { price: p.precio }),
          },
        })),
      },
    };
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(datos);
    document.head.appendChild(s);
  };

  /* ---------- Inicio ---------- */
  pintarThemeColor();
  pintarContacto();
  pintarEnlacesWhatsApp();
  iniciarHeader();
  iniciarFlotante();
  iniciarMedicion();
  pintarDatosEstructurados();
})();
