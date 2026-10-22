/* ==========================================================================
   menuFast — animaciones de entrada (GSAP + ScrollTrigger)
   - Cortas (≤ 0,7 s) y sin bloquear la lectura.
   - El titular y el botón del hero NO se animan: se ven desde el primer pintado.
   - Con prefers-reduced-motion no se anima nada.
   - Sin GSAP (CDN caído) todo queda visible: las animaciones son un extra.
   ========================================================================== */
(function () {
  'use strict';

  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (sinMovimiento || !window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  const EASE = 'power3.out';

  /* ---------- Hero: solo los elementos secundarios ---------- */
  const visual = document.querySelector('#inicio .telefono')?.parentElement;
  gsap
    .timeline({ defaults: { ease: EASE } })
    .from('#inicio .beneficio-hero', { opacity: 0, y: 12, duration: 0.5, stagger: 0.06 }, 0.15)
    .from(visual?.children[0] || [], { opacity: 0, scale: 0.96, rotate: 0, duration: 0.8 }, 0)
    .from('#inicio .telefono', { opacity: 0, y: 40, rotate: -10, duration: 0.9 }, 0.15)
    .from('#inicio .chip-vidrio', { opacity: 0, y: 10, scale: 0.9, duration: 0.5, stagger: 0.12 }, 0.6);

  // Se arranca cuando la página ya cargó y el navegador está libre, para no
  // competir con el primer pintado (rendimiento en celulares de gama media).
  const cuandoLibre = (fn) => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1200 }) : setTimeout(fn, 200));
  const iniciar = () => {
  /* ---------- Secciones: entrada al hacer scroll ---------- */
  // Solo se ocultan los elementos que todavía no se ven (evita parpadeos arriba).
  const elementos = gsap.utils.toArray('[data-animar]').filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
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

  if (document.readyState === 'complete') cuandoLibre(iniciar);
  else window.addEventListener('load', () => cuandoLibre(iniciar), { once: true });
})();
