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

  tiposNegocio: [
    'Hamburguesería',
    'Pizzería',
    'Comidas rápidas',
    'Comida típica',
    'Cafetería',
    'Postres',
    'Heladería',
    'Comidas y bebidas',
  ],

  // URL pública del sitio, para los QR de las demos.
  // TODO: completar cuando haya dominio. Vacío = se usa la URL actual.
  urlPublica: '',

  // TODO: herramienta de analítica (GA4 u otra). Ver Sprint 8.
  analitica: { proveedor: '', id: '' },

  // Solo testimonios reales. Vacío = la sección no se muestra.
  testimonios: [],
};
