/* ==========================================================================
   CONFIGURACIÓN DEL NEGOCIO — menuFast
   Todos los datos editables de la web viven aquí. Cambiar un valor aquí lo
   cambia en toda la página.
   Los valores marcados con "TODO:" están pendientes de confirmar.
   ========================================================================== */

window.MENUFAST = {
  marca: 'menuFast',
  categoria: 'Menús digitales para negocios gastronómicos',

  contacto: {
    // Formato internacional sin "+" ni espacios: 57 + número de celular.
    numeroWhatsApp: '573044168961',
    instagram: 'davidvar2014',
    correo: '', // TODO: correo de contacto (si aplica). Vacío = no se muestra.
  },

  // Mensaje prellenado de WhatsApp (documento del negocio, sección 8).
  // {tipo} se reemplaza por el tipo de negocio cuando se conoce.
  whatsapp: {
    mensajeConTipo:
      'Hola, quiero conocer los planes de menús digitales para mi negocio. Mi restaurante es de {tipo} y me gustaría recibir información',
    mensajeSinTipo:
      'Hola, quiero conocer los planes de menús digitales para mi negocio y me gustaría recibir información',
    sufijoPlan: '. Me interesa el plan {plan}',
  },

  // Titular principal y alternativos (documento, secciones 6 y 6.1).
  hero: {
    titular: 'Tu comida conquista por el sabor. Tu menú debe conquistar desde la primera mirada',
    titularesAlternativos: [
      'Haz que tu menú trabaje a favor de tu negocio',
      'Tus platos merecen una presentación que abra el apetito',
      'Digitaliza tu carta. Simplifica la experiencia de tus clientes',
      'Una nueva forma de presentar lo mejor de tu restaurante',
      'Tu carta en el celular de tus clientes, con el estilo de tu negocio',
    ],
    // Prueba A/B (Sprint 8). Desactivada por defecto.
    pruebaAB: {
      activa: false,
      versionA: 'Haz que tu menú trabaje a favor de tu negocio',
      versionB: 'Tus platos merecen una presentación que abra el apetito',
    },
  },

  // Planes (documento del negocio, parte A). Precios en COP, pago único.
  planes: [
    {
      id: 'basico',
      nombre: 'Menú Básico',
      precio: 100000,
      precioDesde: true,
      pagoUnico: true,
      recomendado: false,
      demo: 'demos/basico/index.html',
      captura: 'assets/img/capturas/basico-categoria-780.webp', // fallback si la demo no carga
      caracteristicas: [
        'Lista de productos con nombre, descripción e imagen',
        'Imágenes descriptivas (no originales) o generadas con IA',
        'Carrito: el cliente agrega productos y ve una cuenta estimada',
      ],
      nota: 'El precio varía según la cantidad de productos y si hay que generar las imágenes.',
      tiempoEntrega: 'TODO: tiempo de entrega del plan Básico',
    },
    {
      id: 'pro',
      nombre: 'Menú Pro',
      precio: 130000,
      precioDesde: false,
      pagoUnico: true,
      recomendado: true,
      demo: 'demos/pro/index.html',
      captura: 'assets/img/capturas/pro-inicio-780.webp',
      caracteristicas: [
        'Tus productos originales en pantalla completa, imagen por imagen',
        'Barra de navegación superior por categorías',
        'Vista ampliada tipo galería del teléfono, con botón "agregar" en cada imagen',
        'Incluye lo del Básico: carrito y cuenta estimada',
      ],
      nota: 'Tú nos das las fotos de tus productos.',
      tiempoEntrega: 'TODO: tiempo de entrega del plan Pro',
    },
    {
      id: 'pro-admin',
      nombre: 'Menú Pro + Panel Admin',
      precio: 250000,
      precioDesde: false,
      pagoUnico: true,
      recomendado: false,
      demo: null, // Sin demo todavía: la pestaña no se muestra.
      caracteristicas: [
        'Todo lo del Menú Pro',
        'Panel para agregar, editar y eliminar productos y platos cuando quieras',
      ],
      nota: '',
      tiempoEntrega: 'TODO: tiempo de entrega del plan Pro + Panel Admin',
    },
  ],

  // Tabla comparativa de planes. true = incluido, false = no incluido, texto = detalle.
  // El precio de la tabla sale de "planes" (no se repite aquí).
  comparativa: [
    { caracteristica: 'Productos con nombre, descripción e imagen', basico: true, pro: true, 'pro-admin': true },
    { caracteristica: 'Imágenes', basico: 'Descriptivas o generadas con IA', pro: 'Fotos originales que tú entregas', 'pro-admin': 'Fotos originales que tú entregas' },
    { caracteristica: 'Carrito con cuenta estimada', basico: true, pro: true, 'pro-admin': true },
    { caracteristica: 'Producto en pantalla completa, imagen por imagen', basico: false, pro: true, 'pro-admin': true },
    { caracteristica: 'Barra de navegación superior por categorías', basico: false, pro: true, 'pro-admin': true },
    { caracteristica: 'Vista tipo galería con botón "agregar"', basico: false, pro: true, 'pro-admin': true },
    { caracteristica: 'Panel para agregar, editar y eliminar productos', basico: false, pro: false, 'pro-admin': true },
    { caracteristica: 'Personalización de colores y logo', basico: true, pro: true, 'pro-admin': true },
    { caracteristica: 'Pago único, sin mensualidad', basico: true, pro: true, 'pro-admin': true },
  ],

  condiciones: {
    personalizacion:
      'Cada menú se personaliza con los colores, el logo y las especificaciones de tu negocio.',
    adicionales:
      'Si necesitas gestionar más cosas (software de administración u otro), es un producto aparte y el precio se acuerda contigo.',
    actualizacion: 'Pago único, sin mensualidad.', // TODO: detallar qué cambios incluye después de la entrega
    mantenimiento: 'TODO: condiciones de mantenimiento',
  },

  // TODO: confirmar los pasos reales del proceso.
  pasosContratacion: [
    'Escríbenos',
    'Nos cuentas tu negocio y envías tu carta o tus fotos',
    'Diseñamos y ajustamos tu menú',
    'Recibes tu menú y tu código QR',
  ],

  // Ejemplos por tipo de negocio (sección "Ejemplos" y selector del cierre).
  tiposNegocio: [
    { nombre: 'Hamburguesería', imagen: 'hamburgueseria', descripcion: 'Combos, adiciones y salsas bien organizados, con la foto de cada hamburguesa.' },
    { nombre: 'Pizzería', imagen: 'pizzeria', descripcion: 'Tamaños, sabores e ingredientes claros para que elegir sea fácil.' },
    { nombre: 'Comidas rápidas', imagen: 'comidas-rapidas', descripcion: 'Perros, sándwiches, salchipapas y más, cada cosa en su categoría.' },
    { nombre: 'Comida típica', imagen: 'comida-tipica', descripcion: 'Corrientazo, platos del día y especiales con su foto y su precio.' },
    { nombre: 'Cafetería', imagen: 'cafeteria', descripcion: 'Bebidas calientes, frías y acompañamientos en una carta clara.' },
    { nombre: 'Postres', imagen: 'postres', descripcion: 'Tortas, porciones y antojos presentados para abrir el apetito.' },
    { nombre: 'Heladería', imagen: 'heladeria', descripcion: 'Sabores, toppings y tamaños a la vista de tus clientes.' },
    { nombre: 'Comidas y bebidas', imagen: 'comidas-y-bebidas', descripcion: 'Platos, cócteles y bebidas en un mismo menú, con categorías separadas.' },
  ],

  // Preguntas frecuentes. Solo información real: las respuestas que empiezan por
  // "TODO:" NO se muestran en la web hasta que se completen.
  preguntas: [
    {
      pregunta: '¿Mis clientes necesitan instalar una aplicación?',
      respuesta: 'No. Tu menú se abre en el navegador del celular: tus clientes solo escanean el código QR o abren el enlace.',
    },
    {
      pregunta: '¿Cómo ven el menú mis clientes?',
      respuesta: 'Escanean el código QR con la cámara del celular o abren el enlace. Ahí ven tus categorías, las fotos de tus productos y sus precios, y pueden armar una cuenta estimada con el carrito.',
    },
    {
      pregunta: '¿Puedo cambiar los precios después?',
      respuesta: 'Con el plan Pro + Panel Admin tú mismo agregas, editas y eliminas productos y precios desde el panel, cuando quieras. Si tienes el Básico o el Pro, escríbenos y te contamos cómo actualizarlo.',
    },
    {
      pregunta: '¿Qué pasa si no tengo fotos de mis productos?',
      respuesta: 'Con el Menú Básico usamos imágenes descriptivas o generadas con inteligencia artificial. Para el Menú Pro y el Pro + Panel Admin necesitamos las fotos originales de tus productos.',
    },
    {
      pregunta: '¿Es pago único o mensualidad?',
      respuesta: 'Es pago único: pagas una sola vez por tu menú, sin mensualidades.',
    },
    {
      pregunta: '¿Cuánto tarda la entrega?',
      respuesta: 'TODO: tiempo de entrega por plan',
    },
    {
      pregunta: '¿Qué incluye el mantenimiento?',
      respuesta: 'TODO: condiciones de mantenimiento y de cambios después de la entrega',
    },
    {
      pregunta: '¿Puedo pedir funciones extra?',
      respuesta: 'Sí. Si necesitas gestionar más cosas, como un software de administración, lo cotizamos como un producto aparte y acordamos el precio contigo.',
    },
    {
      pregunta: '¿Puedo usar los colores y el logo de mi negocio?',
      respuesta: 'Sí. Cada menú se personaliza con tus colores, tu logo y las especificaciones que necesites.',
    },
    {
      pregunta: '¿Funciona en cualquier celular?',
      respuesta: 'Funciona desde el navegador de celulares Android y iPhone con conexión a internet. También se puede abrir en tabletas y computadores.',
    },
  ],

  // URL pública del sitio, para los QR de las demos.
  // TODO: completar cuando haya dominio. Vacío = se usa la URL actual.
  urlPublica: '',

  // TODO: herramienta de analítica (GA4 u otra). Ver Sprint 8.
  analitica: { proveedor: '', id: '' },

  // Solo testimonios REALES. Vacío = la sección no se muestra.
  // Formato: { nombre: 'Ana', negocio: 'Pizzería La 10, Cali', texto: '...' }
  testimonios: [],
};
