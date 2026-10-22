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

  // Expone las utilidades para los demás scripts.
  window.menuFastUtil = { formatearCOP, formatearTelefono, enlaceWhatsApp };

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

  /* ---------- Inicio ---------- */
  pintarThemeColor();
  pintarContacto();
  pintarEnlacesWhatsApp();
  iniciarHeader();
  iniciarFlotante();
})();
