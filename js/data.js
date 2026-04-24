/**
 * data.js — Datos de los cupones
 *
 * Estos objetos replican el esquema de MongoDB Atlas:
 *   _id, titulo, descripcion, codigo, expiracion, estado, fechaCanje
 *
 * Campos extra añadidos para la UI:
 *   categoria  → slug usado por los filtros: 'disponible' | 'expirado' | 'usado' | 'especial'
 *   imagen     → ruta relativa a /img/ o URL externa
 *   etiqueta   → texto visible en el badge de categoría
 *
 * Cuando consumas la API de MongoDB Atlas (Data API o tu propio backend),
 * simplemente reemplaza este array con la respuesta del fetch y asegúrate
 * de que cada documento incluya los campos extra de UI (o mapéalos en tu backend).
 */

const COUPONS = [
  {
    _id:         "69e9c57a8e4c6d70f744de4d",
    titulo:      "Cena Romántica",
    descripcion: "Válido por una cena en tu lugar favorito, con todo lo que más te gusta.",
    codigo:      "CENA2026",
    expiracion:  "2026-12-31",
    estado:      "disponible",   // "disponible" | "usado" | "expirado" | "especial"
    fechaCanje:  null,

    // — campos extra para la UI —
    categoria: "disponible",
    etiqueta:  "Disponible",
    imagen:    "img/1.jpeg"
  },
  {
    _id:         "a1b2c3d4e5f6a7b8c9d0e1f2",
    titulo:      "Ritual de Rosas y Aromas",
    descripcion: "Una sesión completa de spa con masaje de 60 minutos, baño de rosas y aromaterapia personalizada para dos personas.",
    codigo:      "SPA2026",
    expiracion:  "2026-12-31",
    estado:      "disponible",
    fechaCanje:  null,

    categoria: "disponible",
    etiqueta:  "Disponible",
    imagen:    "img/7.jpeg"
  },
  {
    _id:         "b2c3d4e5f6a7b8c9d0e1f2a3",
    titulo:      "Vuelo en Globo al Amanecer",
    descripcion: "Vive un amanecer mágico sobrevolando el paisaje en globo aerostático para dos, con champagne incluido.",
    codigo:      "GLOBO2026",
    expiracion:  "2026-06-30",
    estado:      "disponible",
    fechaCanje:  null,

    categoria: "disponible",
    etiqueta:  "Disponible",
    imagen:    "img/10.jpeg"
  },
  {
    _id:         "c3d4e5f6a7b8c9d0e1f2a3b4",
    titulo:      "Bouquet de Temporada Premium",
    descripcion: "Arreglo floral artesanal con rosas, peonías y flores de temporada, entregado con nota personalizada.",
    codigo:      "FLORES2026",
    expiracion:  "2026-03-31",
    estado:      "expirado",
    fechaCanje:  null,

    categoria: "expirado",
    etiqueta:  "Expirado",
    imagen:    "img/4.jpeg"
  },
  {
    _id:         "d4e5f6a7b8c9d0e1f2a3b4c5",
    titulo:      "Cata Privada de Vinos Mexicanos",
    descripcion: "Sesión guiada de cata con sommelier en bodega boutique, degustación de 6 vinos y tabla de quesos artesanales.",
    codigo:      "VINOS2026",
    expiracion:  "2026-08-15",
    estado:      "usado",
    fechaCanje:  "2025-11-10",

    categoria: "usado",
    etiqueta:  "Usado",
    imagen:    "img/5.jpeg"
  },
  {
    _id:         "e5f6a7b8c9d0e1f2a3b4c5d6",
    titulo:      "Escape de Bienestar para Parejas",
    descripcion: "Tina privada de hidromasaje, baño de pétalos, masaje sincronizado para dos y cava de frutas con chocolate.",
    codigo:      "BIENESTAR2026",
    expiracion:  "2026-05-01",
    estado:      "especial",
    fechaCanje:  null,

    categoria: "especial",
    etiqueta:  "Especiales",
    imagen:    "img/6.jpeg"
  }
];