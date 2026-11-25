'use strict';
// Iconos propios de CAZAHAL GO! (trazo simple 24x24, diseño original).
window.CZ_ICONOS = (() => {
  const s = (d) => `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  return {
    'Todas': s('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>'),
    'Cómputo': s('<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>'),
    'Celulares': s('<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18h2"/>'),
    'Videojuegos': s('<path d="M7 9h10a4 4 0 0 1 4 4v1.5a2.5 2.5 0 0 1-4.6 1.4L15 14H9l-1.4 1.9A2.5 2.5 0 0 1 3 14.5V13a4 4 0 0 1 4-4z"/><path d="M8 11.5v3M6.5 13h3"/><circle cx="16" cy="12" r=".6" fill="currentColor"/><circle cx="17.5" cy="13.8" r=".6" fill="currentColor"/>'),
    'Audio': s('<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>'),
    'Pantallas': s('<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M9 20h6M12 16v4"/>'),
    'Tablets': s('<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="18" r=".7" fill="currentColor"/>'),
    'Smartwatch': s('<rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9 6l1-3h4l1 3M9 18l1 3h4l1-3M12 9.5V12l1.5 1.5"/>'),
    'Accesorios iPhone': s('<rect x="6" y="7" width="12" height="10" rx="2"/><path d="M18 10.5h2v3h-2M9.5 10l-1.5 2.5h3L9.5 15"/>'),
    'Electrónica': s('<path d="M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-10 0V8zM12 16v5"/>'),
    'Hogar': s('<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>'),
    'Cocina': s('<path d="M4 10h16v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-5z"/><path d="M2 10h20M9 6c0-1 1-1 1-2M14 6c0-1 1-1 1-2"/>'),
    'Herramientas': s('<path d="M14.5 6.5a4 4 0 0 0 5 5l-8.8 8.8a2 2 0 0 1-2.8-2.8l8.8-8.8a4 4 0 0 0-2.2-2.2z"/>'),
    'Belleza': s('<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M18 16l.8 2 2 .8-2 .8L18 21.6l-.8-2-2-.8 2-.8z"/>'),
    'Salud': s('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/><path d="M9 11h6M12 8v6"/>'),
    'Seguridad': s('<path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/>'),
    'Negocio': s('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 12h18"/>'),
    'Deportes': s('<path d="M3 20L12 4l9 16H3z"/><path d="M12 20v-6"/>'),
    'Ropa': s('<path d="M8 3l4 2 4-2 5 4-3 3-2-1v12H8V9l-2 1-3-3 5-4z"/>'),
    'reloj': s('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    'tienda': s('<path d="M4 9l1.5-5h13L20 9M4 9h16v11H4z"/><path d="M9 20v-6h6v6"/>'),
    'candado': s('<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>'),
    'ojo': s('<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
    'rayo': s('<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="currentColor" stroke="none"/>'),
    'etiqueta': s('<path d="M3 12V4h8l10 10-8 8L3 12z"/><circle cx="7.5" cy="7.5" r="1.5" fill="currentColor"/>'),
    'otro': s('<circle cx="12" cy="12" r="8"/><path d="M9 12h6"/>')
  };
})();
