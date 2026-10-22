# PROGRESO — Web comercial menuFast

## Estado
| Sprint | Estado | Fecha |
|---|---|---|
| 0 — Reconocimiento y diagnóstico | ✅ Terminado, **esperando revisión** | 2026-10-22 |
| 1 — Base e identidad visual | ⏳ Pendiente | |

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

### Verificación Sprint 0
- [x] PROGRESO.md existe y lista todos los archivos de instrucciones leídos.
- [x] Cada menú demo está identificado con su plan y su ruta de entrada.
- [x] Hay una lista de preguntas abiertas para el humano.
- [x] No se ha escrito código de la web todavía.

>>> PAUSA: esperando aprobación para iniciar el Sprint 1.
