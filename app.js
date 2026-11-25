'use strict';
// CAZAHAL GO! portal v1.1. Datos en ofertas.json (ofertas, cupones, tiendas), aprobados por Gaba antes de publicar.
(async () => {
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = (n) => '$' + Number(n).toLocaleString('es-MX', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
  const seguro = (u) => { try { const x = new URL(u); return x.protocol === 'https:' ? x.href : ''; } catch { return ''; } };
  const toast = (t) => { const e = $('#toast'); e.textContent = t; e.classList.add('on'); clearTimeout(toast.h); toast.h = setTimeout(() => e.classList.remove('on'), 1800); };
  const copiar = async (t) => { try { await navigator.clipboard.writeText(t); toast('Copiado: ' + t); } catch { toast('Código: ' + t); } };
  let data;
  try { data = await (await fetch('ofertas.json', { cache: 'no-store' })).json(); }
  catch { $('#ofertas').innerHTML = '<p>No se pudieron cargar las ofertas. Intenta de nuevo.</p>'; return; }

  const vnum = (v) => { if (!v) return 0; const m = String(v).replace(/[+,\s]/g, '').match(/(\d+)(mil)?/i); return m ? Number(m[1]) * (m[2] ? 1000 : 1) : 0; };
  const ofertas = (data.ofertas || []).filter((o) => o.activa !== false).map((o) => ({ ...o, pct: o.precio_antes > o.precio ? Math.round((1 - o.precio / o.precio_antes) * 100) : 0, ahorro: o.precio_antes > o.precio ? o.precio_antes - o.precio : 0, nv: vnum(o.vendidos) }));
  ofertas.forEach((o) => { o.score = o.pct + (o.comision_pct || 0) * 1.5 + Math.log10(1 + o.nv) * 6; });
  const KEY = 'cazahal_guardadas';
  let guard = new Set(); try { guard = new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch { /* sin almacenamiento */ }
  const saveG = () => { try { localStorage.setItem(KEY, JSON.stringify([...guard])); } catch { /* ignorar */ } $('#nGuard').textContent = guard.size; };
  const st = { tienda: 'Todas', cat: 'Todas', q: '', ord: 'top' };

  const tiendas = ['Todas', ...new Set(ofertas.map((o) => o.tienda))];
  $('#fTienda').innerHTML = tiendas.map((t) => `<button type="button" data-t="${esc(t)}">${esc(t)}</button>`).join('');
  $('#cat').innerHTML = ['Todas', ...new Set(ofertas.map((o) => o.categoria))].map((c) => `<option>${esc(c)}</option>`).join('');
  const ahorroTot = ofertas.reduce((s, o) => s + o.ahorro, 0);
  const mx = Math.max(0, ...ofertas.map((o) => o.pct));
  $('#datos').innerHTML = `<li><b>${ofertas.length}</b> ofertas vigentes</li><li><b>${tiendas.length - 1}</b> tiendas</li><li>hasta <b>-${mx}%</b></li><li><b>${fmt(Math.round(ahorroTot))}</b> de ahorro sumado</li>`;
  if (data.whatsapp_canal && seguro(data.whatsapp_canal)) { const w = $('#waCanal'); w.href = seguro(data.whatsapp_canal); w.hidden = false; }

  function nivel(p) { return p >= 50 ? ['n3', 'Oferta brutal'] : p >= 30 ? ['n2', 'Muy buena'] : p >= 10 ? ['n1', 'Buena'] : null; }
  function tarjeta(o) {
    const c = new Date(o.fecha_consulta); const h = (Date.now() - c) / 36e5;
    const fTxt = c.toLocaleString('es-MX', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
    const nv = nivel(o.pct); const url = seguro(o.url_afiliado || o.url);
    const share = `${o.nombre} a ${fmt(o.precio)} en ${o.tienda}. Visto en CAZAHAL GO!: https://cazahalgo.com/#${o.id}`;
    const btns = [];
    if (url) btns.push(`<a class="btn ir" href="${esc(url)}" target="_blank" rel="${o.url_afiliado ? 'sponsored ' : ''}nofollow noopener noreferrer">Ver oferta en ${esc(o.tienda)}</a>`);
    if (seguro(o.url_tienda_propia)) btns.push(`<a class="btn sec" href="${esc(seguro(o.url_tienda_propia))}" target="_blank" rel="noopener">Comprar en nuestra tienda</a>`);
    if (data.whatsapp && o.venta_directa) btns.push(`<a class="btn sec" href="https://wa.me/${esc(data.whatsapp)}?text=${encodeURIComponent('Hola CAZAHAL GO!, me interesa: ' + o.nombre)}" target="_blank" rel="noopener">Pedir por WhatsApp</a>`);
    return `<article class="oferta" id="${esc(o.id)}">
      ${nv ? `<span class="nivel ${nv[0]}">${nv[1]}</span>` : ''}
      <button class="guardar" type="button" data-g="${esc(o.id)}" aria-pressed="${guard.has(o.id)}" aria-label="Guardar oferta">${guard.has(o.id) ? '♥' : '♡'}</button>
      <div class="foto">${o.imagen ? `<img src="${esc(o.imagen)}" alt="${esc(o.nombre)}" loading="lazy" referrerpolicy="no-referrer">` : ''}</div>
      <div class="cuerpo">
        <span class="tienda">${esc(o.tienda)} ${o.url_afiliado ? '<span class="tag af">Afiliado</span>' : '<span class="tag">Enlace directo</span>'}</span>
        <h3 title="${esc(o.nombre)}">${esc(o.nombre)}</h3>
        <div class="precios"><span class="precio">${fmt(o.precio)}</span>${o.pct ? `<span class="antes">${fmt(o.precio_antes)}</span><span class="desc">-${o.pct}%</span>` : ''}</div>
        ${o.ahorro || o.vendidos ? `<span class="ahorro">${o.ahorro ? 'Ahorras ' + fmt(Math.round(o.ahorro)) : ''}${o.ahorro && o.vendidos ? ' · ' : ''}${o.vendidos ? `<span class="vend">${esc(o.vendidos)} vendidos</span>` : ''}</span>` : ''}
        <span class="fecha${h > 24 ? ' vieja' : ''}">${h > 24 ? 'Verifica el precio en la tienda · ' : ''}Revisado ${fTxt}</span>
        <div class="botones">${btns.join('')}
          <div class="compartir"><a href="https://wa.me/?text=${encodeURIComponent(share)}" target="_blank" rel="noopener">WhatsApp</a><a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://cazahalgo.com/#' + o.id)}" target="_blank" rel="noopener">Facebook</a><button type="button" data-copy="${esc('https://cazahalgo.com/#' + o.id)}">Copiar</button></div>
        </div>
      </div></article>`;
  }
  const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  function pintar() {
    const q = norm(st.q.trim());
    let l = ofertas.filter((o) => (st.tienda === 'Todas' || o.tienda === st.tienda) && (st.cat === 'Todas' || o.categoria === st.cat) && (!q || norm(o.nombre + ' ' + o.categoria + ' ' + o.tienda).includes(q)));
    const f = { top: (a, b) => b.score - a.score, vend: (a, b) => b.nv - a.nv || b.pct - a.pct, desc: (a, b) => b.pct - a.pct, barato: (a, b) => a.precio - b.precio, ahorro: (a, b) => b.ahorro - a.ahorro, nuevo: (a, b) => new Date(b.fecha_consulta) - new Date(a.fecha_consulta) }[st.ord];
    l.sort(f);
    $('#ofertas').innerHTML = l.map(tarjeta).join('');
    $('#vacio').hidden = l.length > 0;
    document.querySelectorAll('#fTienda button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.t === st.tienda));
    document.querySelectorAll('#cats button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.c === st.cat));
    const g = ofertas.filter((o) => guard.has(o.id));
    $('#guardadas').hidden = g.length === 0; $('#gGrid').innerHTML = g.map(tarjeta).join('');
    saveG();
  }
  // Accesos rápidos por categoría, ordenados por número de ofertas.
  const conteo = {}; ofertas.forEach((o) => { conteo[o.categoria] = (conteo[o.categoria] || 0) + 1; });
  const cats = Object.entries(conteo).sort((a, b) => b[1] - a[1]);
  const IC = window.CZ_ICONOS || {}; const ic = (c) => `<i class="ico">${IC[c] || IC.otro || ''}</i>`;
  $('#cats').innerHTML = `<button type="button" data-c="Todas">${ic('Todas')}<b>Todo</b><span>${ofertas.length}</span></button>` + cats.map(([c, n]) => `<button type="button" data-c="${esc(c)}">${ic(c)}<b>${esc(c)}</b><span>${n}</span></button>`).join('');
  document.querySelectorAll('.conf-in [data-i]').forEach((d) => { if (IC[d.dataset.i]) d.insertAdjacentHTML('afterbegin', `<i class="ico">${IC[d.dataset.i]}</i>`); });
  $('#cats').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; st.cat = b.dataset.c; $('#cat').value = st.cat; $('#q').value = ''; st.q = ''; pintar(); document.querySelector('.barra').scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  $('#fTienda').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { st.tienda = b.dataset.t; pintar(); } });
  $('#cat').addEventListener('change', (e) => { st.cat = e.target.value; pintar(); });
  $('#ord').addEventListener('change', (e) => { st.ord = e.target.value; pintar(); });
  let t; $('#q').addEventListener('input', (e) => { clearTimeout(t); t = setTimeout(() => { st.q = e.target.value; pintar(); }, 150); });
  document.addEventListener('click', (e) => {
    const g = e.target.closest('[data-g]'); if (g) { const id = g.dataset.g; guard.has(id) ? guard.delete(id) : guard.add(id); toast(guard.has(id) ? 'Oferta guardada' : 'Quitada de guardadas'); pintar(); return; }
    const c = e.target.closest('[data-copy]'); if (c) copiar(c.dataset.copy);
  });

  $('#cGrid').innerHTML = (data.cupones || []).map((c) => `<div class="cupon"><span class="t">${esc(c.titulo)}</span><span class="d">${esc(c.tienda)} · ${esc(c.condicion)}</span>
    ${c.codigo ? `<div class="cod"><code>${esc(c.codigo)}</code><button type="button" data-copy="${esc(c.codigo)}">Copiar</button></div>` : ''}
    ${seguro(c.url) ? `<a class="btn ir" href="${esc(seguro(c.url))}" target="_blank" rel="sponsored nofollow noopener noreferrer">Usar en ${esc(c.tienda)}</a>` : ''}</div>`).join('');
  $('#tGrid').innerHTML = (data.tiendas || []).map((s) => seguro(s.url) ? `<a href="${esc(seguro(s.url))}" target="_blank" rel="${s.afiliado ? 'sponsored ' : ''}nofollow noopener noreferrer"><strong>${esc(s.nombre)}</strong><span>${esc(s.nota)}</span></a>` : '').join('');
  pintar();
  if (location.hash) { const el = document.getElementById(location.hash.slice(1)); if (el) el.scrollIntoView({ block: 'center' }); }
})();
