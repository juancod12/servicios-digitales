/* ==========================================================================
   menuFast — animaciones de entrada al hacer scroll (GSAP + ScrollTrigger)
   - La entrada del hero es CSS puro (ver .entrada en src/input.css).
   - GSAP y ScrollTrigger se descargan cuando la página ya cargó y el navegador
     está libre: no compiten con el primer pintado en celulares de gama media.
   - Cortas (≤ 0,65 s); solo opacidad y posición (los títulos siguen en el árbol
     de accesibilidad).
   - Con prefers-reduced-motion no se anima nada. Sin GSAP todo queda visible.
   ========================================================================== */
(function () {
  'use strict';

  const util = window.menuFastUtil;
  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (sinMovimiento || !util) return;

  const EASE = 'power3.out';

  const iniciar = () => {
    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);

    // Solo se ocultan los bloques que todavía no se ven (nada parpadea arriba).
    const elementos = gsap.utils
      .toArray('[data-animar]')
      .filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
    gsap.set(elementos, { opacity: 0, y: 28 });
    ScrollTrigger.batch(elementos, {
      start: 'top 90%',
      once: true,
      onEnter: (lote) => gsap.to(lote, { opacity: 1, y: 0, duration: 0.65, ease: EASE, stagger: 0.07, overwrite: true }),
    });
    ScrollTrigger.refresh();

    // Red de seguridad: nada que ya esté en pantalla puede quedarse invisible
    // (por ejemplo, si se saltó con un ancla o el scroll fue muy rápido).
    let espera;
    const revisar = () => {
      const pendientes = elementos.filter(
        (el) => Number(gsap.getProperty(el, 'opacity')) < 1 && !gsap.isTweening(el) && el.getBoundingClientRect().top < window.innerHeight
      );
      if (pendientes.length) gsap.to(pendientes, { opacity: 1, y: 0, duration: 0.4, ease: EASE, stagger: 0.05 });
    };
    window.addEventListener('scroll', () => { clearTimeout(espera); espera = setTimeout(revisar, 250); }, { passive: true });
    setTimeout(revisar, 1500);
  };

  const cargar = () =>
    util
      .cargarScript(util.LIBS.gsap)
      .then(() => util.cargarScript(util.LIBS.scrollTrigger))
      .then(iniciar)
      .catch(() => {}); // sin CDN: la página funciona igual, sin animaciones

  const cuandoLibre = (fn) => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 300));
  if (document.readyState === 'complete') cuandoLibre(cargar);
  else window.addEventListener('load', () => cuandoLibre(cargar), { once: true });
})();
