'use strict';
// Aviso de privacidad simplificado y elección de almacenamiento (sin cookies de rastreo).
(() => {
  const K = 'cz_privacidad';
  let mem = null;
  const leer = () => { try { return localStorage.getItem(K) || mem; } catch { return mem; } };
  const escribir = (v) => { mem = v; try { localStorage.setItem(K, v); } catch { /* sin almacenamiento */ } };
  window.CZ_PRIV = { funcional: () => leer() === 'todas' };

  const cerrar = () => { const b = document.getElementById('czPriv'); if (b) b.remove(); };
  const elegir = (v) => {
    escribir(v);
    if (v !== 'todas') { try { localStorage.removeItem('cz_guardadas'); } catch { /* ignorar */ } }
    cerrar();
    document.dispatchEvent(new CustomEvent('cz-privacidad', { detail: v }));
  };
  const mostrar = () => {
    if (document.getElementById('czPriv')) return;
    const d = document.createElement('section');
    d.id = 'czPriv'; d.className = 'priv'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Aviso de privacidad');
    d.innerHTML = '<div class="priv-in"><p><strong>Aviso de privacidad simplificado.</strong> CAZAHAL GO! no usa cookies de analítica, publicidad ni rastreo. '
      + 'Solo guardamos en tu navegador las ofertas que marcas como guardadas, si lo aceptas. Si nos escribes, usamos tus datos solo para responderte o atender tu pedido. '
      + 'Al entrar a una tienda, aplican sus propias cookies. Consulta el <a href="aviso-de-privacidad.html">aviso integral</a> y la <a href="cookies.html">política de cookies</a>.</p>'
      + '<div class="priv-btn"><button type="button" data-p="necesarias" class="btn sec">Solo necesarias</button><button type="button" data-p="todas" class="btn">Aceptar</button></div></div>';
    d.addEventListener('click', (e) => { const b = e.target.closest('[data-p]'); if (b) elegir(b.dataset.p); });
    document.body.appendChild(d);
  };
  const iniciar = () => {
    try { localStorage.removeItem('cazahal_guardadas'); } catch { /* clave anterior */ }
    if (!leer()) mostrar();
    document.querySelectorAll('[data-priv]').forEach((b) => b.addEventListener('click', mostrar));
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
