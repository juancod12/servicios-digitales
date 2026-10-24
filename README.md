# menuFast — Web comercial

Página de venta de menús digitales para negocios gastronómicos. Es un **sitio estático** (HTML, CSS y JS): no necesita servidor de aplicaciones ni base de datos.

- Historial de trabajo, decisiones y verificaciones: [`PROGRESO.md`](PROGRESO.md)
- Créditos de imágenes: [`assets/img/CREDITOS.md`](assets/img/CREDITOS.md)

---

## 1. Abrir el proyecto

Requisito: **Node.js 18 o superior** (solo para la vista previa local).

```sh
cd servicios_web
node scripts/servidor.mjs        # abre http://localhost:5500
```

El servidor local comprime con gzip, igual que un hosting real, así que lo que ves ahí es lo que verá el visitante.

> Abrir `index.html` con doble clic (`file://`) también funciona. En ese modo no se puede comprobar si una demo existe, así que se carga directamente.

## 2. Estructura

```
index.html            Página principal (una sola página con todas las secciones)
qr.html               Página puente del QR: registra el escaneo y abre la demo
js/config.js          ★ TODOS los datos editables: precios, WhatsApp, textos, planes, FAQ
js/main.js            WhatsApp, medición (track), prueba A/B, header, menú móvil
js/secciones.js       Genera planes, tabla comparativa, ejemplos y FAQ desde config.js
js/demo-telefono.js   Demo interactiva en el mini teléfono (pestañas, QR, fallback)
js/animaciones.js     Animaciones GSAP (se cargan después de la página)
src/*.css             Estilos fuente (Tailwind v4): tokens.css = colores y fuentes
css/app.css           CSS compilado (GENERADO, no editar a mano)
assets/               Logo, fuentes, imágenes (WebP) e imagen para compartir (og)
demos/basico, pro     Copias de Menu_Basico y Menu_Galeria (código intacto)
scripts/              Servidor local, copia/verificación de demos, capturas
```

## 3. Editar contenido: `js/config.js`

Casi todo se cambia en **un solo archivo**, sin tocar el HTML. Al guardar y recargar se actualiza toda la página: tarjetas de planes, tabla comparativa, demo, datos estructurados para Google y botones de WhatsApp.

| Quiero cambiar… | Campo en `config.js` |
|---|---|
| Número de WhatsApp | `contacto.numeroWhatsApp`: formato `57` + celular, sin `+` ni espacios. Ej.: `573001234567` |
| Instagram o correo | `contacto.instagram`, `contacto.correo` (vacío = no se muestra) |
| Mensaje prellenado de WhatsApp | `whatsapp.mensajeConTipo` / `mensajeSinTipo` (`{tipo}` y `{plan}` se reemplazan solos) |
| Precio de un plan | `planes[i].precio` (número sin puntos: `130000`). `precioDesde: true` muestra "Desde" |
| Plan recomendado | `planes[i].recomendado: true` (solo uno) |
| Características de un plan | `planes[i].caracteristicas` y la tabla `comparativa` |
| Tiempo de entrega | `planes[i].tiempoEntrega` |
| Pasos para contratar | `pasosContratacion` |
| Preguntas frecuentes | `preguntas` |
| Tipos de negocio (ejemplos) | `tiposNegocio`: la imagen debe existir como `assets/img/negocios/<imagen>-400.webp` y `-800.webp` |
| Testimonios | `testimonios`: **solo reales**. Vacío = la sección no se muestra |
| Titular principal | `hero.titular` |

**Valores `TODO:`**: un texto que empieza por `TODO:` no se muestra en la web. Por ejemplo, la pregunta "¿Cuánto tarda la entrega?" aparece sola cuando se reemplaza su respuesta por el dato real.

### Cambiar colores, fuentes o estilos

Los colores de marca están en `src/tokens.css`. Después de editar cualquier archivo de `src/` o de agregar clases nuevas en el HTML o el JS, hay que recompilar el CSS:

```sh
./build.sh            # una vez (minificado)
./build.sh --watch    # recompila al guardar
```

`build.sh` usa el ejecutable standalone de **Tailwind CSS v4** en `tools/tailwindcss.exe`. La carpeta `tools/` no se sube a git; si falta, descarga `tailwindcss-windows-x64.exe` (o el de tu sistema) desde las *releases* de [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss/releases) y guárdalo como `tools/tailwindcss.exe`.

## 4. Agregar una demo nueva

Las demos son proyectos aparte (`Menu_Basico`, `Menu_Galeria`). **Su código nunca se modifica**: solo se copian y se optimizan las imágenes.

1. Pon la carpeta del menú junto a las otras, en `Plataformas_Servicios/`.
2. En `scripts/demos.py`, agrégala al diccionario `DEMOS`: `'nombre-id': ORIGEN / 'Carpeta_Del_Menu'`.
3. Copia y verifica:
   ```sh
   python scripts/demos.py copiar      # copia a demos/<id>/ y reduce las imágenes a 900 px
   python scripts/demos.py verificar   # confirma que html/css/js/json son idénticos al original
   ```
   Requiere Python con Pillow (`pip install pillow`).
4. En `js/config.js`, pon en el plan correspondiente `demo: 'demos/<id>/index.html'` y una `captura` (imagen WebP para el caso en que la demo no cargue). Con `demo: null` la pestaña no aparece.

## 5. Medición y prueba A/B

- Todos los eventos pasan por `menuFastTrack(evento, datos)` en `js/main.js`. Hoy solo se escriben en la consola (`[menuFast] …`).
- Eventos: `clic_whatsapp` (con `origen`, `plan` y `tipo_negocio`), `visita_precios`, `demo_visible`, `demo_cambio_plan`, `demo_pantalla_completa` y `demo_qr_escaneado`.
- **Conectar Google Analytics 4**:
  1. En `config.js`: `analitica: { proveedor: 'ga4', id: 'G-XXXXXXX' }`.
  2. Pega el fragmento `gtag.js` de GA4 en el `<head>` de `index.html` y de `qr.html`.
  3. Desde ahí, los eventos se envían solos.
- **Prueba A/B del titular**: `hero.pruebaAB.activa: true`. Cada visitante ve la versión A o B (se recuerda en su navegador) y todos los eventos llevan `version_titular`.

## 6. Publicar

Es un sitio estático: se sube **la carpeta `servicios_web` tal cual**. `css/app.css` ya está compilado, así que no hace falta ningún paso de build en el hosting.

- **Netlify**: en app.netlify.com → *Add new site → Deploy manually* y arrastra la carpeta. O conecta el repositorio sin comando de build, con *publish directory* = `servicios_web` (o la raíz, si el repo es solo esta carpeta).
- **Vercel**: *Add New → Project*, importa el repositorio, *Framework preset: Other*, sin build command y con *Output directory* = la carpeta del sitio.
- **GitHub Pages**: sube el contenido a un repositorio y entra a *Settings → Pages → Deploy from a branch* (rama `master` o `main`, carpeta `/root`).

### Al tener dominio (checklist)

1. `js/config.js` → `urlPublica: 'https://tu-dominio.com/'`, para que los QR de las demos apunten al sitio público.
2. `index.html` → agrega `<link rel="canonical" href="https://tu-dominio.com/">`, `og:url`, y cambia `og:image` a una URL absoluta: `https://tu-dominio.com/assets/og/og-image.jpg`. WhatsApp y Facebook exigen la URL absoluta para mostrar la vista previa.
3. `robots.txt` → agrega `Sitemap: https://tu-dominio.com/sitemap.xml` (y crea el sitemap con la URL principal).
4. Prueba la vista previa con el [depurador de Facebook](https://developers.facebook.com/tools/debug/) y mide en [PageSpeed Insights](https://pagespeed.web.dev/).

## 7. Herramientas de verificación

```sh
node scripts/captura.mjs <url> salida.png [ancho] [alto]   # captura con Chrome headless e imprime errores de consola
python scripts/demos.py verificar                          # demos sin modificar
```
