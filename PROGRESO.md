# PROGRESO — Web comercial menuFast

## Estado
| Sprint | Estado | Fecha |
|---|---|---|
| 0 — Reconocimiento y diagnóstico | ✅ Aprobado | 2026-10-22 |
| 1 — Base e identidad visual | ✅ Aprobado | 2026-10-22 |
| 2 — Hero y problema | ✅ Aprobado | 2026-10-22 |
| 3 — Demo interactiva | ✅ Terminado, **esperando revisión** | 2026-10-22 |
| 4 — Beneficios y ejemplos | ⏳ Pendiente | |

---

## SPRINT 0 — Reconocimiento y diagnóstico

### 0.1 Árbol del proyecto (`Plataformas_Servicios/`)
```
Documentacion del negocio + estrategia.docx   Parte A (negocio y planes) + Parte B (estrategia)
Instruccines de diseño.txt                    Instrucciones de diseño (prioridad 1)
SPRINTS.txt                                   Plan de trabajo (prioridad 2)
Logo.jpg                                      Logo menuFast (ver 0.4)
Publicidad Menu.png                           Pieza publicitaria antigua (marca "MenuClick")
Menu_Basico/   (repo git propio, 64 MB)       Demo plan Básico
Menu_Galeria/  (repo git propio, 64 MB)       Demo plan Pro
servicios_web/                                Carpeta de desarrollo de esta web
  index.html   (98 KB)                        Intento anterior fallido — NO se reutiliza
  PROGRESO.md                                 Este archivo
```

### Archivos de instrucciones leídos
- [x] `Instruccines de diseño.txt` (completo)
- [x] `SPRINTS.txt` (completo)
- [x] `Documentacion del negocio + estrategia.docx` (completo; secciones A y 1–13). `pandoc` no está instalado: se extrajo el texto con Python (zip + XML). Contiene una sola imagen interna (`image1.png`).

### 0.2 Reglas de diseño detectadas (`Instruccines de diseño.txt`, prioridad 1)
1. Rol: arquitecto de software y diseñador UX/UI senior de interfaces **premium**.
2. Evitar patrones visuales estándar: innovación, **asimetría controlada**, estética moderna.
3. Estética: tendencias concretas como **Glassmorphism, Bento Grid, Brutalismo Suave o Dark Mode Avanzado**.
4. Color: paleta exacta en HEX, **gradientes sutiles / mesh gradients**. El ejemplo (`#0B0F19`, `#1A2235`, `#00F0FF`) va marcado como "ej.".
5. Tipografía moderna con pesos, kerning y altura de línea definidos. El ejemplo es **Space Grotesk (títulos) + Inter (lectura)**.
6. Profundidad: **bordes de 1px con baja opacidad, backdrop-blur y sombras multicapa suaves** (nada de sombras genéricas).
7. Composición: **CSS Grid complejo, superposición intencional, márgenes generosos con sistema de 8pt**.
8. Interacción: transiciones con `cubic-bezier`, microinteracciones en hover/active y animaciones fluidas.
9. Tecnología: **Tailwind CSS** con clases utilitarias avanzadas y arbitrarias; **prohibidos los componentes prefabricados genéricos**.

### Reglas clave del docx (parte B)
- Paleta: negro carbón `#171717`, coral `#FF5A36` (CTA), amarillo `#FFC857` (con moderación), blanco `#FFFFFF`, crema `#F4F1EC`, verde `#267A55` (solo acento). Proporción ~60/30/10 como guía flexible.
- Tres líneas visuales: moderna-comercial (fondos oscuros estratégicos), clara-demostrativa (blanco/crema, mockups de teléfono) y adaptable por tipo de negocio.
- Sección 10: nada de promesas falsas, urgencia artificial, testimonios inventados ni miedo. No garantizar ventas.
- 7.3: "los menús están ya hechos… en un apartado pequeño tipo mini teléfono, con JS, usa librerías".
- 7.6: la actualización es de **pago único**.

### 0.3 Datos del negocio (parte A)
| Plan | Precio | Notas |
|---|---|---|
| Menú Básico | $100.000 COP ("Desde") | Imágenes no originales o generadas con IA; lista con nombre y descripción; carrito con cuenta estimada. El precio varía según la cantidad de productos y si hay que generar imágenes. |
| Menú Pro | $130.000 COP | Fotos originales en pantalla completa con deslizamiento, barra superior de categorías, vista tipo galería del teléfono con botón "agregar" por imagen, carrito. El cliente entrega las fotos. |
| Menú Pro + Panel Admin | $250.000 COP | Todo lo del Pro + panel para agregar, editar y eliminar productos. |

General: se personalizan colores, logo y especificaciones. El software adicional es un producto aparte con precio acordado.

### 0.4 Logo
- Ruta: `Plataformas_Servicios/Logo.jpg`. JPEG de 2752×1536 px, 300 DPI y 1,9 MB.
- ⚠️ **NO tiene fondo transparente.** Es un JPG (formato sin alfa) y el patrón de cuadros gris de "transparencia" está **impreso dentro de la imagen**. No sirve tal cual en la web.
- Contenido: palabra "menu" en **blanco** y "Fast" en **amarillo-naranja**, con un ícono de carta y celular (degradado amarillo→rojo). Abajo a la derecha hay un **isotipo suelto** (círculo con tenedor y cuchillo con líneas de velocidad) que sirve para favicon.
- Como el texto "menu" es blanco, el logo solo funciona sobre **fondos oscuros**. Sobre blanco o crema hace falta una versión con "menu" en negro carbón.
- Colores del logo: blanco, amarillo ≈ `#FFB800`, degradado naranja→rojo. **No es navy** (SPRINTS.txt dice "navy oscuro"; lo navy es el fondo cuadriculado falso). Combina bien con la paleta del docx (coral y amarillo).
- Acción propuesta: pedir el archivo original (PNG transparente o SVG). Si no existe, recortarlo y vectorizarlo/limpiarlo a SVG en el Sprint 1 → **pregunta abierta 9**.

### 0.5 Menús de demostración
| | Menu_Basico | Menu_Galeria |
|---|---|---|
| Entrada | `Menu_Basico/index.html` | `Menu_Galeria/index.html` |
| Plan | **Básico** | **Pro** (galería con barra superior de categorías) |
| Pro + Panel Admin | — | — **(no hay demo → esa pestaña no se muestra)** |
| Recursos externos | Google Fonts (Outfit, Poppins) | Google Fonts (Outfit) |
| Rutas | Todas relativas (`assets/…`, `css/…`, `js/…`) → embebibles sin romperse si se copia la carpeta completa | Igual |
| Carrito | `localStorage` con clave `menu_digital_cuenta_v1` | **La misma clave** `menu_digital_cuenta_v1` |
| Sin servidor (file://) | Sí: HTML/CSS/JS puro, sin fetch ni módulos | Sí |
| Peso de assets | 33 MB (297 archivos) | 33 MB (297 archivos) |

Hallazgos:
- Las dos carpetas son **clones del mismo repo** (`github.com/juancod12/menu_digital`, último commit `fbab49c`). El Pro existe **solo como cambios sin commitear** en `Menu_Galeria` (index.html, css, js modificados), y ambas tienen imágenes y `data.js` modificados sin commitear. Si alguien hace `git checkout` o `reset` en Menu_Galeria, **se pierde el menú Pro**. Recomiendo hacer un commit o una rama en ese repo (no lo toco: regla 5).
- **Carrito compartido**: al servirse desde el mismo dominio, los dos iframes comparten `localStorage` y la misma clave, así que lo que se agrega en una demo aparece en la otra. Probablemente sea aceptable porque los productos son los mismos; se verificará en el Sprint 3.
- **Peso**: hay imágenes de hasta 3,2 MB (`Hamburguesa/HamburguesaDePolloRebozadoConPatatasFritas.jpg`, 3,2 MB) y la carpeta Licores pesa 13 MB. Dentro del iframe esto afecta el rendimiento en móvil (Sprint 8). No se pueden optimizar sin modificar las demos → **pregunta abierta 10**.
- El contenido de las demos es de un **bar/cafetería estilo español** (bocadillos, tapas, "patatas", Cacaolat, Bitter Kas), no colombiano. Es válido como demostración, pero conviene saberlo.
- Las demos traen su propio `<h1>`, `<title>` y `theme-color`. Al ir en un iframe no afectan la jerarquía de la web.
- Plan para /demos/: **copiar** cada carpeta sin `.git` a `servicios_web/demos/basico/` y `servicios_web/demos/pro/`, y guardar los hashes SHA-256 de los archivos copiados para comprobar en cada sprint que no cambiaron.

### 0.6 Inventario de imágenes de comida
De `Menu_*/assets/categorias/` (idénticas en las dos demos):
| Categoría | Archivos | Peso |
|---|---|---|
| Hamburguesa | 8 | 3,7 MB |
| ComidaChina | 66 | 4,6 MB |
| Tapas | 34 | 2,3 MB |
| PlatosCombinados | 29 | 2,2 MB |
| BocadilloCaliente / BocadilloFrio | 27 / 12 | 1,6 MB / 0,6 MB |
| ArrozConSalsa | 9 | 0,4 MB |
| Cafe | 14 | 0,2 MB |
| Bebidas / Refrescos / Cervezas / Licores | 25 / 21 / 14 / 36 | — |

Además: `assets/inicio.png` (portada de la demo) y `Publicidad Menu.png` (1080×1350, con hamburguesa, café y cheesecake **dentro de un arte con textos de "MenuClick"**, que no sirve como foto limpia).

Cobertura para los ejemplos por tipo de negocio (Sprint 4):
| Tipo | ¿Hay imagen? |
|---|---|
| Hamburguesería | ✅ |
| Comidas rápidas | ✅ (bocadillos, combinados) |
| Comida típica | ⚠️ parcial (platos combinados/arroz, pero de estilo español, no colombiano) |
| Cafetería | ✅ |
| Comidas y bebidas | ✅ |
| Pizzería | ❌ placeholder + TODO |
| Postres | ❌ placeholder + TODO |
| Heladería | ❌ placeholder + TODO |

Para el hero no hay foto de comida "premium" de buena calidad, solo fotos de producto de la demo → **pregunta abierta 11**.

### 0.7 Stack propuesto
Las instrucciones de diseño (prioridad 1) mandan sobre SPRINTS.txt:
- **HTML5 + Tailwind CSS** (en lugar del CSS vanilla con `tokens.css`). Los tokens de color y tipografía viven en el `theme` de Tailwind (y como variables CSS), así se mantiene la regla de "ningún color a mano fuera de los tokens".
  - Modo de uso de Tailwind → **pregunta abierta 12**. Recomendación: **Tailwind CLI standalone** (un ejecutable, sin npm), que genera un `css/app.css` ya compilado. El sitio publicado queda estático y liviano. El CDN "Play" de Tailwind no está pensado para producción y pesaría en el Lighthouse del Sprint 8.
- **JavaScript vanilla** (`config.js`, `main.js`, `demo-telefono.js`).
- CDN con versión fija: **GSAP 3.12.5 + ScrollTrigger** y **qrcode-generator** o **QRCode.js 1.0.0**. Swiper solo si hace falta.
- Fuentes: **Space Grotesk** (títulos) + **Inter** (cuerpo, mínimo 16 px) desde Google Fonts.
- Estilo: el **Bento Grid** encaja con beneficios y planes, el **glassmorphism** con el header y el mockup del teléfono, y el **mesh gradient** con coral/amarillo sobre negro carbón en el hero y el cierre. Hay asimetría controlada en el hero (teléfono superpuesto a la foto).

Estructura:
```
servicios_web/
  index.html
  src/input.css          (entrada de Tailwind: @tailwind + capas propias)
  tailwind.config.js     (tokens: colores, fuentes, espaciado 8pt, easing)
  css/app.css            (generado)
  js/config.js  js/main.js  js/demo-telefono.js
  assets/logo/  assets/img/
  demos/basico/  demos/pro/   (copias sin modificar + checksums)
  PROGRESO.md  README.md
```

### Contradicciones detectadas
| # | Tema | Fuente A | Fuente B | Decisión provisional |
|---|---|---|---|---|
| C1 | CSS | Diseño.txt: Tailwind | SPRINTS: CSS vanilla y tokens.css | Tailwind (manda diseño.txt) |
| C2 | Paleta | Diseño.txt: ejemplo oscuro `#0B0F19` / `#00F0FF` | docx: carbón, coral, amarillo, crema, verde | **Paleta del docx** (el ejemplo es ilustrativo y el cian no combina con el logo), aplicando las técnicas de diseño.txt (mesh gradients, glass, bordes 1px). *Confirmar.* |
| C3 | Modo | Diseño.txt: "Dark Mode Avanzado" como opción | docx: ~60 % fondos claros | Mezcla: hero, demo y cierre oscuros; problema, beneficios y planes claros o crema. *Confirmar.* |
| C4 | Marca | Logo: **menuFast** | docx: "TuMarca Digital"; publicidad e intento anterior: **"MenuClick"** | menuFast |
| C5 | Precio de entrada | docx: $100.000 | Publicidad: "Planes desde $99.000" | $100.000 (docx) |
| C6 | Nombre del plan | docx: "Menú Pro" | Intento anterior: "Menú Galería" | "Menú Pro" |
| C7 | Logo | SPRINTS: "navy oscuro" | Archivo real: sin navy | Paleta del docx |

### Datos faltantes → TODO en config.js
- `numeroWhatsApp`: en `Publicidad Menu.png` y en el intento anterior aparece **304 416 8961** (573044168961). No se usará sin confirmación (regla 6).
- `redes`: la publicidad muestra Instagram **@DAVIDVAR2014**. Pendiente de confirmar. `correo`: no existe.
- `tiempoEntrega` por plan: no existe.
- `condicionesMantenimiento`: no existe.
- `condicionesActualizacion`: "pago único" (docx). Falta el detalle de qué cambios incluye después de la entrega.
- `testimonios: []`: vacío, así que la sección no se muestra.
- Dominio y URL pública para el QR: no existen.
- Herramienta de analítica: no definida.
- Pasos reales del proceso de contratación: no definidos.

### Preguntas abiertas para el humano
1. ¿La marca final es **menuFast**? (El docx dice "TuMarca Digital" y la publicidad vieja "MenuClick".)
2. Número de WhatsApp: ¿uso el **304 416 8961** que aparece en la publicidad? ¿El Instagram @DAVIDVAR2014 va en la web?
3. Tiempo de entrega por plan.
4. Condiciones de mantenimiento y de cambios después de la entrega.
5. ¿Qué plan se destaca como "Recomendado"? (Por defecto: Pro.)
6. ¿Hay dominio y hosting definidos?
7. ¿Hay testimonios o clientes reales?
8. ¿Qué analítica se usará (GA4 u otra)?
9. **Logo**: ¿tienes el original en PNG transparente o SVG? El `Logo.jpg` trae el cuadriculado impreso. Si no lo tienes, lo recreo o limpio.
10. **Peso de las demos (33 MB c/u)**: ¿autorizas usar en `/demos/` una copia con imágenes optimizadas (mismos nombres, sin tocar el código)? Si no, se dejan tal cual y el iframe se carga en diferido.
11. **Fotos**: ¿hay fotos para pizzería, postres, heladería y para el hero? Si no, ¿se pueden usar fotos libres (Unsplash/Pexels con crédito) o generadas con IA?
12. **Tailwind**: ¿OK usar el CLI standalone, que requiere compilar el CSS al editar estilos? ¿O prefieres el CDN, sin compilación pero más lento?
13. **Paleta y modo** (C2, C3): ¿OK la paleta del docx con estética premium (mesh gradients y glass) y mezcla de secciones oscuras y claras?
14. **Pasos de contratación**: ¿son 1) Escríbenos 2) Nos cuentas tu negocio y envías tu carta/fotos 3) Diseñamos y ajustamos 4) Recibes tu menú y tu QR?
15. **Intento anterior** (`servicios_web/index.html`): ¿lo borro o lo muevo a `_descartado/`? Por ahora no se toca y queda fuera de git.
16. **Menu_Galeria** tiene el menú Pro solo como cambios sin commitear. ¿Quieres hacer un commit en ese repo para no perderlo? (Yo no lo modifico.)

### Respuestas del humano (2026-10-22)
- Se aprueban todas las preguntas abiertas con "sí": marca **menuFast**; WhatsApp **573044168961** e Instagram **@davidvar2014**; Tailwind con CLI standalone; copias de las demos con imágenes optimizadas; fotos libres o generadas con IA para lo que falte; paleta del docx con estética premium y mezcla de secciones oscuras y claras; pasos de contratación propuestos; plan Pro como "Recomendado".
- El `index.html` del intento anterior se **borró**.
- Logo: el humano entregó `Logo.png` (transparente, 669×373, la palabra mide ~450 px). Ver Sprint 1.
- Siguen pendientes: tiempos de entrega, mantenimiento, dominio, analítica, testimonios y correo.

### Verificación Sprint 0
- [x] PROGRESO.md existe y lista todos los archivos de instrucciones leídos.
- [x] Cada menú demo está identificado con su plan y su ruta de entrada.
- [x] Hay una lista de preguntas abiertas para el humano.
- [x] No se ha escrito código de la web todavía.

>>> Aprobado.

---

## SPRINT 1 — Base del proyecto e identidad visual

### Qué se hizo
- **Estructura**: `index.html`, `src/tokens.css`, `src/input.css`, `css/app.css` (generado), `js/config.js`, `js/main.js`, `assets/logo/`, `assets/img/`, `build.sh`, `tools/` (fuera de git: Tailwind CLI y página de prueba de anchos).
- **Tailwind CSS v4.3.3** con el ejecutable standalone (sin npm). `./build.sh` compila y `./build.sh --watch` recompila al guardar. En `tokens.css` se borra la paleta por defecto de Tailwind (`--color-*: initial`), así que **solo existen los colores de la marca**: no se puede usar otro color aunque se quiera.
- **Tokens**: paleta del docx + `coral-texto` (#C2361A), `gris` y `gris-claro` para texto secundario, `carbon-hondo` para la malla; Space Grotesk + Inter; curvas `ease-premium` y `ease-rebote`; sombras multicapa; radios.
- **Logo**: el `Logo.png` entregado es transparente pero pequeño y se ve borroso al ampliarlo. Se usa un recorte del `Logo.jpg` de 2752 px, al que se le quitó el cuadriculado por color: es el mismo diseño y queda más nítido. Hay versiones `menufast-logo-claro` (para fondo oscuro) y `menufast-logo-oscuro` ("menu" en carbón, para fondos claros), en PNG y WebP, más el isotipo para favicon (48 px) y apple-touch-icon (180 px). El PNG entregado queda en `assets/logo/original/`.
- **config.js**: marca, contacto, mensajes de WhatsApp, titulares (incluidos los de la prueba A/B), planes, condiciones, pasos, tipos de negocio, URL pública, analítica y testimonios. Los datos faltantes están marcados con `TODO:`.
- **Header**: pastilla flotante de vidrio (desenfoque + borde de 1 px con baja opacidad + sombra multicapa) que se oscurece al hacer scroll. Navegación desde 1024 px (Inicio, Demo, Planes, Preguntas); CTA "Quiero mi menú digital" desde 640 px; menú hamburguesa con `aria-expanded`, cierre con Escape y foco en el primer enlace. Incluye enlace "Saltar al contenido".
- **Footer**: malla de color sobre carbón; logo; enlaces; tarjeta de WhatsApp (acento verde) con el número formateado desde config; Instagram; correo (se oculta si está vacío); año dinámico; marca de agua "menuFast" decorativa con contorno.
- **Utilidad de WhatsApp** (`menuFastUtil.enlaceWhatsApp({tipo, plan})`): todo elemento con `data-wa` (más `data-wa-tipo` y `data-wa-plan` opcionales) recibe su enlace al cargar.
- Las secciones `#inicio`, `#problema`, `#demo`, `#planes` y `#preguntas` existen como esqueleto para los sprints siguientes.

### Decisiones
- **Botones coral con texto carbón** (contraste 5,78:1). Blanco sobre coral da **3,1:1 y no cumple AA**.
- Texto coral sobre fondo claro → `coral-texto` #C2361A (5,47 en blanco y 4,86 en crema).
- `theme-color` se toma del token `--color-carbon` por JS, para no escribir colores en el HTML.
- Sin tipo de negocio, el mensaje de WhatsApp usa la variante sin "[tipo de comida]".

### Verificación Sprint 1
- [x] `index.html` abre sin errores ni advertencias en consola y los 7 recursos cargan sin 4xx (Chrome, servidor local).
- [x] No hay colores escritos a mano fuera de `tokens.css` (búsqueda de hex, rgb y hsl en html, js e input.css: 0 resultados). El CSS compilado solo contiene los 8 hex de la paleta.
- [x] Header y footer revisados en **360, 768 y 1280 px** con iframes de ancho exacto, sin scroll horizontal. Se corrigió que el número se partía en 768 px y que el panel móvil era demasiado transparente.
- [x] El enlace de WhatsApp sale de `config.js`: los 3 botones, el número del footer y el Instagram se generan desde `contacto`. Probado `enlaceWhatsApp({tipo:'Pizzería', plan:'Menú Pro'})` → mensaje correcto.
- [x] Contraste ≥ 4,5:1 en todas las combinaciones usadas (coral/carbón 5,78 · gris-claro/carbón 8,51 · gris/crema 6,27 · amarillo/carbón 11,65 · blanco/verde 5,25).
- [x] Áreas táctiles de 44 px o más en todos los enlaces y botones visibles (el del logo se subió de 36 a 44 px).

>>> Aprobado ("continua").

---

## SPRINT 2 — Inicio (hero) y sección del problema

### Qué se hizo
- **Hero** sobre la malla de color carbón con una trama de puntos sutil. Composición asimétrica en 12 columnas: el texto ocupa 7 y el visual 5.
  - Etiqueta "TU NEGOCIO MERECE DESTACAR"; único `h1` con el titular del docx (la segunda frase con degradado amarillo→coral); texto descriptivo; CTA coral "Quiero mi menú digital" → WhatsApp; botón secundario "Ver cómo funciona" → `#demo`; texto complementario; los 5 beneficios del docx con check.
  - Visual: foto de hamburguesa (rotada 2°) con un **mockup de celular hecho en CSS** superpuesto (clase `.telefono`, reutilizable en el Sprint 3) que muestra una **captura real del menú Básico**, más dos etiquetas de vidrio ("Escanea y mira la carta", "Cuenta estimada"), que describen funciones reales de las demos.
- **Problema** (fondo crema): título y texto del docx 7.2 en una columna fija, y una cuadrícula bento escalonada con **4 situaciones**, cada una con una mini ilustración hecha en CSS: carta desactualizada, precios corregidos a mano, "¿cómo se ve ese plato?" y reimprimir por cada cambio. El tono es de reconocimiento, sin asustar. Termina con un enlace a la demo.
- **Imágenes**:
  - `assets/img/hero-hamburguesa-{480,800,1200}.webp` (49–221 KB, recorte 4:5 de la foto de 3,2 MB de la demo) con `srcset`.
  - `assets/img/capturas/{basico-inicio,basico-categoria,pro-inicio}-{390,780}.webp`: capturas de las demos a tamaño de teléfono (390×844 a 2x). Las de categoría y Pro se usarán como fallback en el Sprint 3.
- **scripts/captura.mjs**: captura con Chrome headless por CDP, sin dependencias. También reporta errores de consola, excepciones y respuestas 4xx/5xx. **scripts/anchos.html**: muestra la página en iframes de anchos exactos.

### Decisiones
- El `h1` va escrito en el HTML, no generado por JS, por SEO. La prueba A/B del Sprint 8 lo reemplazará solo si está activa.
- Las imágenes del hero no llevan `loading="lazy"` (regla del sprint). La del logo del footer sí.
- La isla del celular tapaba el encabezado de la captura, así que se agregó una franja de barra de estado (`pt-[11%]`), como en un teléfono real.

### Pregunta nueva
17. El hero (lista del docx 6) menciona **"Código QR personalizado"** y **"Botón de WhatsApp, según el plan"**, pero ningún plan de la parte A los nombra. ¿Qué planes incluyen el QR y cuáles el botón de WhatsApp? Por ahora se deja como en el docx ("según el plan"), y en el Sprint 5 no se pondrán en las tarjetas de planes hasta tener la respuesta.

### Verificación Sprint 2
- [x] **Above the fold en móvil**: el botón termina en y=580 px en 360×640, y=518 en 390×844 y y=535 en 768×1024. El titular y el CTA se ven sin hacer scroll.
- [x] El botón abre `wa.me/573044168961` con el mensaje prellenado del docx.
- [x] Ninguna promesa de ventas: búsqueda de "vende más", "vender más", "garantiz", "aumenta tus ventas", "más ventas" y "quedan" en el texto visible = 0 resultados.
- [x] Todas las imágenes tienen `alt`, `width` y `height`. `loading="lazy"` en todas menos las del hero.
- [x] Un solo `h1`; sin scroll horizontal en 360, 390, 768 y 1280; sin errores de consola ni 4xx (comprobado con `scripts/captura.mjs`).

>>> Aprobado ("continua").

---

## SPRINT 3 — Demo interactiva en mini teléfono

### Qué se hizo
- **`demos/basico/`** (desde `Menu_Basico`) y **`demos/pro/`** (desde `Menu_Galeria`, incluidos sus cambios sin commitear, que son el menú Pro real). Se generan con `python scripts/demos.py copiar`:
  - El código (html, css, js, md) se copia **byte a byte**. Solo se optimizan las imágenes, con los mismos nombres y formatos: máximo 900 px, JPEG con calidad 78 y PNG con paleta de 256 colores que conserva la transparencia. Resultado: **33,4 MB → 17,2 MB** por demo.
  - `python scripts/demos.py verificar` compara el código copiado con el original.
- **Sección `#demo`** (fondo oscuro con malla de color):
  - Pestañas `role="tablist"` generadas desde `config.planes`, **solo para los planes con `demo`**: hoy aparecen Básico y Pro, y Pro + Admin no aparece. Se manejan con flechas, Inicio y Fin.
  - Mini teléfono (`.telefono`, CSS puro) con un `<iframe>` que se renderiza a 390 px de ancho y se escala con `transform: scale()` según el ancho del marco (ResizeObserver). El alto se ajusta para llenar la pantalla.
  - Transición GSAP 3.12.5 (cdnjs, versión fija) al cambiar de plan: el iframe se desvanece y la tarjeta de información entra. Con `prefers-reduced-motion` no se anima.
  - Tarjeta "Estás viendo: …" con precio, características y nota desde config.js, más el botón "Quiero este plan" → WhatsApp con el plan.
  - **QR** con qrcode-generator 1.4.4 (cdnjs), dibujado como SVG propio (`currentColor`) y apuntando a la demo activa.
  - "Ver en pantalla completa" abre la demo en una pestaña nueva.
  - **Carga diferida**: el iframe solo pide la demo cuando la sección está a 200 px de verse (IntersectionObserver).
  - **Fallback**: si la demo responde con error (comprobación con HEAD) o no carga en 10 s, se muestra la captura del plan (`captura` en config.js) con el botón "Abrir la demo".
  - Ganchos de medición (`demo_visible`, `demo_cambio_plan`, `demo_pantalla_completa`) llaman a `window.menuFastTrack` si existe (se implementa en el Sprint 8).

### Hallazgos
- **Carrito compartido entre demos**: las dos usan la clave `menu_digital_cuenta_v1` en el mismo dominio, así que un producto agregado en Básico aparece en Pro. Como los productos son los mismos, no se ve raro. Arreglarlo exige cambiar el código de las demos (regla 5), así que **queda como está**.
- **QR en desarrollo**: apunta a la URL actual. Abierta como `localhost`, un celular no la puede abrir. Para probar con un celular en la misma red Wi-Fi, abre la web en el PC como `http://<IP-del-PC>:5500/` y el QR usará esa IP. **TODO**: llenar `urlPublica` en config.js cuando haya dominio.

### Verificación Sprint 3
- [x] Los 2 menús existentes cargan dentro del mini teléfono (escala 0,78 en escritorio y 0,74 en 360 px). Pro + Admin no tiene demo y su pestaña no aparece.
- [x] Los originales **no se modificaron**: `scripts/demos.py verificar` = OK (código idéntico byte a byte), y `git status` de Menu_Basico y Menu_Galeria muestra los mismos 20 y 23 cambios que había antes del proyecto, ninguno hecho aquí.
- [x] Navegación y carrito dentro del iframe:
  - Básico: abrir "Bocadillo Frío" → agregar → "1 producto / 3,30 €".
  - Pro: cambiar de pestaña → navegar a "Hamburguesas" → agregar desde la galería (badge 2) → el visor de pantalla completa se abre.
- [x] El QR se **decodificó con OpenCV** y da exactamente la URL de la demo activa (Básico y Pro). Falta la prueba física con un celular, que necesita una URL pública o la IP de la red local (ver arriba).
- [x] Sin errores de consola ni rutas rotas dentro de las demos. Los únicos `ERR_ABORTED` aparecen al cambiar de pestaña a mitad de carga, como es esperado.
- [x] Funciona en Chrome escritorio (1280) y en emulación móvil (360 y 390, `mobile: true`, DPR 2). Sin scroll horizontal.
- [x] Fallback probado con una demo inexistente: aparece la captura con el botón y el iframe queda oculto.

>>> PAUSA: esperando revisión para iniciar el Sprint 4.
