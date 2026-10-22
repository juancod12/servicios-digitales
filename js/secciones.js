/* ==========================================================================
   menuFast — secciones generadas desde config.js
   (ejemplos por tipo de negocio, planes, tabla, pasos, preguntas, testimonios
   y selector del cierre). Nada de esto se escribe a mano en el HTML.
   ========================================================================== */
(function () {
  'use strict';

  const CFG = window.MENUFAST;
  const util = window.menuFastUtil;
  if (!CFG || !util) return;

  const $ = (id) => document.getElementById(id);
  // Un valor con "TODO:" todavía no está confirmado: no se muestra.
  const pendiente = (v) => !v || /^TODO/i.test(String(v).trim());
  const escapar = (t) =>
    String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  /* ---------- Ejemplos por tipo de negocio ---------- */
  const pintarEjemplos = () => {
    const $lista = $('ejemplos-lista');
    if (!$lista) return;
    $lista.innerHTML = CFG.tiposNegocio
      .map(
        (t) => `
      <li class="tarjeta-ejemplo group" data-animar>
        <div class="overflow-hidden rounded-[1.1rem]">
          ${
            t.imagen
              ? `<img src="assets/img/negocios/${t.imagen}-400.webp"
                   srcset="assets/img/negocios/${t.imagen}-400.webp 400w, assets/img/negocios/${t.imagen}-800.webp 800w"
                   sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 90vw"
                   width="400" height="300" loading="lazy" alt="Foto de ejemplo para ${escapar(t.nombre.toLowerCase())}"
                   class="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105">`
              : `<div class="grid aspect-[4/3] place-items-center bg-carbon/5 text-sm text-gris">Imagen pendiente</div>`
          }
        </div>
        <div class="flex grow flex-col p-2 pt-4">
          <h3 class="text-xl">${escapar(t.nombre)}</h3>
          <p class="mt-1.5 grow text-[0.9375rem] text-gris">${escapar(t.descripcion)}</p>
          <a data-wa data-wa-tipo="${escapar(t.nombre)}" data-origen="ejemplos" class="enlace-flecha mt-4 self-start text-[0.9375rem]">¿Cómo se vería el mío?</a>
        </div>
      </li>`
      )
      .join('');
  };

  pintarEjemplos();
  util.pintarEnlacesWhatsApp();
  window.menuFastSecciones = { pendiente, escapar };
})();
