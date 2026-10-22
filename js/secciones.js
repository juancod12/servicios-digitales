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

  /* ---------- Planes ---------- */
  const check = (clase = 'text-verde') =>
    `<svg aria-hidden="true" viewBox="0 0 20 20" class="mt-0.5 size-5 shrink-0 ${clase}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 10.5l3.2 3L15 6.5"/></svg>`;

  const pintarPlanes = () => {
    const $lista = $('planes-lista');
    if (!$lista) return;
    $lista.innerHTML = CFG.planes
      .map((p) => {
        const dest = p.recomendado;
        const meta = [
          ['Tiempo de entrega', p.tiempoEntrega],
          ['Mantenimiento', CFG.condiciones.mantenimiento],
        ].filter(([, v]) => !pendiente(v));
        return `
      <li class="tarjeta-plan ${dest ? 'tarjeta-plan--destacada malla-carbon' : ''}" data-animar>
        ${dest ? '<p class="absolute -top-3.5 left-7 rounded-pastilla bg-amarillo px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-carbon">Recomendado</p>' : ''}
        <h3 class="text-2xl">${escapar(p.nombre)}</h3>
        <p class="mt-5 flex flex-wrap items-baseline gap-x-2">
          ${p.precioDesde ? `<span class="text-sm font-semibold ${dest ? 'text-gris-claro' : 'text-gris'}">Desde</span>` : ''}
          <span class="font-display text-[2.75rem] font-bold leading-none tracking-[-0.04em]">${util.formatearCOP(p.precio)}</span>
          <span class="text-sm font-semibold ${dest ? 'text-gris-claro' : 'text-gris'}">COP</span>
        </p>
        ${p.pagoUnico ? `<p class="mt-3 inline-flex items-center gap-1.5 self-start rounded-pastilla px-3 py-1 text-sm font-semibold ${dest ? 'bg-blanco/10 text-blanco' : 'bg-verde/10 text-verde'}">${check(dest ? 'text-amarillo' : 'text-verde')}Pago único</p>` : ''}
        <ul class="mt-7 grid gap-3 border-t ${dest ? 'border-blanco/10' : 'border-carbon/[0.08]'} pt-7">
          ${p.caracteristicas.map((c) => `<li class="flex gap-3 text-[0.9375rem]">${check(dest ? 'text-amarillo' : 'text-verde')}<span>${escapar(c)}</span></li>`).join('')}
        </ul>
        ${p.nota ? `<p class="mt-6 rounded-2xl px-4 py-3 text-sm ${dest ? 'bg-blanco/5 text-gris-claro' : 'bg-crema text-gris'}"><strong class="font-semibold ${dest ? 'text-blanco' : 'text-carbon'}">Nota:</strong> ${escapar(p.nota)}</p>` : ''}
        ${
          meta.length
            ? `<dl class="mt-5 grid gap-2 text-sm">${meta.map(([k, v]) => `<div class="flex justify-between gap-4"><dt class="${dest ? 'text-gris-claro' : 'text-gris'}">${k}</dt><dd class="text-right font-semibold">${escapar(v)}</dd></div>`).join('')}</dl>`
            : ''
        }
        <a data-wa data-wa-plan="${escapar(p.nombre)}" data-origen="planes"
           class="${dest ? 'btn-cta' : 'btn-oscuro'} mt-auto w-full">Quiero este plan</a>
      </li>`;
      })
      .join('');
  };

  /* ---------- Nota general y pasos ---------- */
  const pintarCondiciones = () => {
    const c = CFG.condiciones;
    if ($('nota-personalizacion')) $('nota-personalizacion').textContent = c.personalizacion;
    if ($('nota-adicionales')) $('nota-adicionales').textContent = ' ' + c.adicionales;
    const $pasos = $('pasos-lista');
    if ($pasos) {
      $pasos.innerHTML = CFG.pasosContratacion
        .map(
          (paso, i) => `
        <li class="relative rounded-tarjeta border border-carbon/[0.07] bg-crema p-6">
          <span class="font-display text-5xl font-bold leading-none text-coral-texto/25" aria-hidden="true">0${i + 1}</span>
          <p class="mt-4 font-display text-lg font-bold leading-snug"><span class="sr-only">Paso ${i + 1}: </span>${escapar(paso)}</p>
        </li>`
        )
        .join('');
    }
  };

  /* ---------- Tabla comparativa ---------- */
  const pintarTabla = () => {
    const $cab = $('tabla-cabecera');
    const $cuerpo = $('tabla-cuerpo');
    if (!$cab || !$cuerpo) return;
    const celda = (v) =>
      v === true
        ? `${check('mx-auto text-verde')}<span class="sr-only">Incluido</span>`
        : v === false
          ? `<span aria-hidden="true" class="text-gris">—</span><span class="sr-only">No incluido</span>`
          : `<span class="text-sm">${escapar(v)}</span>`;
    $cab.innerHTML = `<tr>
        <th scope="col" class="p-4 font-display text-sm font-bold">Característica</th>
        ${CFG.planes.map((p) => `<th scope="col" class="p-4 text-center font-display text-sm font-bold">${escapar(p.nombre)}</th>`).join('')}
      </tr>`;
    const filaPrecio = `<tr class="bg-crema">
        <th scope="row" class="p-4 text-sm font-semibold">Precio</th>
        ${CFG.planes.map((p) => `<td class="p-4 text-center font-display font-bold">${p.precioDesde ? 'Desde ' : ''}${util.formatearCOP(p.precio)}</td>`).join('')}
      </tr>`;
    $cuerpo.innerHTML =
      filaPrecio +
      CFG.comparativa
        .map(
          (f) => `<tr>
        <th scope="row" class="p-4 text-sm font-medium">${escapar(f.caracteristica)}</th>
        ${CFG.planes.map((p) => `<td class="p-4 text-center">${celda(f[p.id])}</td>`).join('')}
      </tr>`
        )
        .join('');
  };

  pintarEjemplos();
  pintarPlanes();
  pintarCondiciones();
  pintarTabla();
  util.pintarEnlacesWhatsApp();

  // El contenido generado empuja la página: si se llegó con un #ancla, se vuelve a ubicar.
  if (location.hash.length > 1) {
    const destino = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (destino) requestAnimationFrame(() => destino.scrollIntoView({ behavior: 'instant' }));
  }
  window.menuFastSecciones = { pendiente, escapar };
})();
