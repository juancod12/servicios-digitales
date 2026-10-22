// MENÚ DIGITAL — versión galería con barra de navegación superior
// Usa CATEGORIAS y MENU_DATA de data.js (mismas rutas: assets/categorias/<folder>/<img>)
(function () {
  'use strict';
  const IMG_BASE = 'assets/categorias/';
  const STORAGE_KEY = 'menu_digital_cuenta_v1';
  const ICONS = {
    'bocadillo-frio':'🥖','hamburguesa':'🍔','bocadillo-caliente':'🥪','tapas':'🫒',
    'platos-combinados':'🍽️','comida-china':'🥡','bebidas':'🍹','cafe':'☕',
    'refrescos':'🥤','cervezas':'🍺','arroz-con-salsa':'🍚','licores':'🥃'
  };
  const SHORT = { 'bocadillo-frio':'B. Frío','bocadillo-caliente':'B. Caliente','platos-combinados':'Combinados',
    'arroz-con-salsa':'Arroz','comida-china':'China','hamburguesa':'Burgers' };

  const fmt = (n) => n.toLocaleString('es-ES',{minimumFractionDigits:2,maximumFractionDigits:2}) + ' €';
  const $ = (id) => document.getElementById(id);

  // ---- bloqueo scroll ----
  let lockCount = 0, savedY = 0;
  function lockBody(){ if(!lockCount){ savedY=window.scrollY; document.body.classList.add('no-scroll'); document.body.style.top=-savedY+'px'; } lockCount++; }
  function unlockBody(){ lockCount=Math.max(0,lockCount-1); if(!lockCount){ document.body.classList.remove('no-scroll'); document.body.style.top=''; window.scrollTo(0,savedY); } }

  // ---- carrito ----
  let cart = [];
  const load = () => { try { cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch(e){ cart = []; } };
  const save = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch(e){} };
  function addToCart(o){
    const id = o.catId+'|'+o.name+'|'+(o.variantLabel||'');
    const ex = cart.find(l=>l.id===id);
    if(ex) ex.qty++; else cart.push({id,...o,qty:1});
    save(); renderCart();
    const b=$('bar-total'); b.classList.remove('is-bump'); void b.offsetWidth; b.classList.add('is-bump');
  }
  function changeQty(id,d){ const l=cart.find(x=>x.id===id); if(!l) return; l.qty+=d; if(l.qty<=0) cart=cart.filter(x=>x.id!==id); save(); renderCart(); }
  function removeLine(id){ cart=cart.filter(x=>x.id!==id); save(); renderCart(); }
  function totals(){ return { count:cart.reduce((s,l)=>s+l.qty,0), total:cart.reduce((s,l)=>s+l.qty*l.price,0) }; }

  // ---- estado ----
  let currentCatId = null;
  const imgOf = (catId, file) => file ? IMG_BASE + MENU_DATA[catId].folder + '/' + file : '';

  // ---- navegación superior ----
  function renderNav(){
    const nav = $('nav'); nav.innerHTML = '';
    CATEGORIAS.forEach(cat=>{
      const b = document.createElement('button');
      b.className = 'nav__btn'; b.dataset.id = cat.id; b.title = cat.nombre;
      b.innerHTML = `<span class="nav__ico">${ICONS[cat.id]||'🍴'}</span><span class="nav__lbl">${SHORT[cat.id]||cat.nombre}</span>`;
      b.addEventListener('click',()=>openCategory(cat.id));
      nav.appendChild(b);
    });
  }

  // ---- galería ----
  function openCategory(catId){
    const cat = MENU_DATA[catId]; if(!cat) return;
    currentCatId = catId;
    document.body.setAttribute('data-tema', cat.tema);
    document.querySelectorAll('.nav__btn').forEach(b=>b.classList.toggle('is-active', b.dataset.id===catId));
    $('cat-title').textContent = cat.nombre;
    $('cat-count').textContent = cat.items.length + ' opciones';
    $('cat-search').value = '';
    renderGallery(cat.items);
    window.scrollTo(0,0);
  }

  function renderGallery(items){
    const g = $('gallery'); g.innerHTML = '';
    if(!items.length){ g.innerHTML = '<p class="empty">No se encontraron productos.</p>'; return; }
    items.forEach((item,i)=>{
      const src = imgOf(currentCatId, item.img);
      const min = Math.min(...item.variants.map(v=>v.price));
      const prefix = item.variants.length>1 ? 'desde ' : '';
      const tile = document.createElement('div');
      tile.className = 'tile'; tile.style.animationDelay = Math.min(i*0.03,0.4)+'s';
      tile.innerHTML = `
        ${src ? `<img class="tile__img" src="${src}" alt="${item.name}" loading="lazy">` : `<div class="tile__ph">${ICONS[currentCatId]||'🍴'}</div>`}
        <div class="tile__shade"></div>
        <div class="tile__info"><p class="tile__name">${item.name}</p><p class="tile__price">${prefix}${fmt(min)}</p></div>
        <button class="tile__add" aria-label="Añadir ${item.name}">+</button>`;
      const im = tile.querySelector('img');
      if(im) im.onerror = () => { im.replaceWith(Object.assign(document.createElement('div'),{className:'tile__ph',textContent:ICONS[currentCatId]||'🍴'})); };
      tile.addEventListener('click',()=>openViewer(items,i));
      // "+" rápido: 1 variante la añade; si hay varias abre la ficha
      tile.querySelector('.tile__add').addEventListener('click',(ev)=>{
        ev.stopPropagation();
        if(item.variants.length===1) addItem(item,0,ev.currentTarget); else openViewer(items,i);
      });
      g.appendChild(tile);
    });
  }

  function addItem(item,vi,srcEl){
    const v = item.variants[vi];
    addToCart({catId:currentCatId,name:item.name,variantLabel:v.label,price:v.price,img:item.img});
    if(srcEl) fly(srcEl);
    toast('Añadido a tu cuenta');
  }

  $('cat-search').addEventListener('input',()=>{
    const q = $('cat-search').value.trim().toLowerCase();
    const cat = MENU_DATA[currentCatId]; if(!cat) return;
    renderGallery(q ? cat.items.filter(i=>i.name.toLowerCase().includes(q)) : cat.items);
  });

  // ---- galería de producto a pantalla completa ----
  let vItems = [], vIndex = 0, vHistory = false;
  const viewerOpen = () => !$('viewer').hidden;

  function slideHtml(item, src){
    const media = src
      ? `<img class="viewer__img" src="${src}" alt="${item.name}" draggable="false">`
      : `<div class="viewer__ph">${ICONS[currentCatId]||'🍴'}</div>`;
    return `<div class="viewer__media">${media}</div>
      <div class="viewer__info">
        <h3 class="viewer__name">${item.name}</h3>
        <div class="viewer__buttons"></div>
      </div>`;
  }

  function openViewer(items, start){
    vItems = items; vIndex = start;
    const track = $('viewer-track'); track.innerHTML = '';
    items.forEach(item=>{
      const slide = document.createElement('div'); slide.className = 'viewer__slide';
      slide.innerHTML = slideHtml(item, imgOf(currentCatId, item.img));
      const im = slide.querySelector('img');
      if(im) im.onerror = () => { im.replaceWith(Object.assign(document.createElement('div'),{className:'viewer__ph',textContent:ICONS[currentCatId]||'🍴'})); };
      const box = slide.querySelector('.viewer__buttons');
      item.variants.forEach((v,vi)=>{
        const b = document.createElement('button'); b.className = 'btn-add';
        b.textContent = `+ ${v.label ? v.label+' · ' : 'Añadir · '}${fmt(v.price)}`;
        b.addEventListener('click',(ev)=>addItem(item,vi,ev.currentTarget));
        box.appendChild(b);
      });
      track.appendChild(slide);
    });
    const v = $('viewer'); v.hidden = false; lockBody();
    track.style.scrollBehavior = 'auto';
    track.scrollLeft = start * track.clientWidth;
    updateViewer();
    requestAnimationFrame(()=>{ track.style.scrollBehavior = ''; v.classList.add('is-open'); });
    history.pushState({viewer:true},''); vHistory = true;   // "atrás" del móvil cierra la galería
  }
  function closeViewer(fromPop){
    if(!viewerOpen()) return;
    const v = $('viewer'); v.classList.remove('is-open'); unlockBody();
    setTimeout(()=>{ v.hidden = true; $('viewer-track').innerHTML = ''; },250);
    if(vHistory){ vHistory = false; if(!fromPop) history.back(); }
  }
  function updateViewer(){
    $('viewer-counter').textContent = (vIndex+1)+' / '+vItems.length;
    $('viewer-prev').hidden = vIndex<=0;
    $('viewer-next').hidden = vIndex>=vItems.length-1;
  }
  function goTo(i){
    i = Math.max(0,Math.min(vItems.length-1,i));
    const t = $('viewer-track'); t.scrollTo({left:i*t.clientWidth,behavior:'smooth'});
  }
  let vRaf = 0;
  $('viewer-track').addEventListener('scroll',()=>{
    cancelAnimationFrame(vRaf);
    vRaf = requestAnimationFrame(()=>{
      const t = $('viewer-track'), i = Math.round(t.scrollLeft/(t.clientWidth||1));
      if(i!==vIndex){ vIndex = i; updateViewer(); }
    });
  },{passive:true});
  $('viewer-close').addEventListener('click',()=>closeViewer(false));
  $('viewer-prev').addEventListener('click',()=>goTo(vIndex-1));
  $('viewer-next').addEventListener('click',()=>goTo(vIndex+1));
  $('viewer-cart').addEventListener('click',()=>{ closeViewer(false); setTimeout(()=>openSheet($('cart-sheet')),350); });
  window.addEventListener('popstate',()=>{ if(viewerOpen()) closeViewer(true); });
  document.addEventListener('keydown',(ev)=>{
    if(!viewerOpen()) return;
    if(ev.key==='Escape') closeViewer(false);
    else if(ev.key==='ArrowLeft') goTo(vIndex-1);
    else if(ev.key==='ArrowRight') goTo(vIndex+1);
  });
  function openSheet(el){ el.hidden=false; lockBody(); requestAnimationFrame(()=>el.classList.add('is-open')); }
  function closeSheet(el){ el.classList.remove('is-open'); unlockBody(); setTimeout(()=>{ el.hidden=true; },320); }

  // ---- cuenta ----
  function renderCart(){
    const {count,total} = totals();
    const badge = $('cart-badge'); badge.hidden = !count; badge.textContent = count;
    const vb = $('viewer-badge'); vb.hidden = !count; vb.textContent = count;
    $('bar-total').hidden = !count;
    $('bar-count').textContent = count===1 ? '1 producto' : count+' productos';
    $('bar-sum').textContent = fmt(total);
    $('sheet-total').textContent = fmt(total);
    const list = $('cart-items'); list.innerHTML='';
    $('cart-empty').hidden = cart.length>0;
    cart.forEach(l=>{
      const src = MENU_DATA[l.catId] ? imgOf(l.catId,l.img) : '';
      const row = document.createElement('div'); row.className='cart-line';
      row.innerHTML = `
        ${src?`<img class="cart-line__img" src="${src}" alt="">`:''}
        <div class="cart-line__body"><p class="cart-line__name">${l.name}</p>
          ${l.variantLabel?`<p class="cart-line__variant">${l.variantLabel}</p>`:''}
          <p class="cart-line__price">${fmt(l.price*l.qty)}</p></div>
        <div class="cart-line__qty"><button class="qty-btn" data-a="m">−</button><span>${l.qty}</span><button class="qty-btn" data-a="p">+</button></div>
        <button class="cart-line__remove" data-a="r">✕</button>`;
      row.querySelector('[data-a=m]').onclick=()=>changeQty(l.id,-1);
      row.querySelector('[data-a=p]').onclick=()=>changeQty(l.id,1);
      row.querySelector('[data-a=r]').onclick=()=>removeLine(l.id);
      list.appendChild(row);
    });
  }
  $('btn-cart').addEventListener('click',()=>openSheet($('cart-sheet')));
  $('bar-total').addEventListener('click',()=>openSheet($('cart-sheet')));
  $('btn-close-cart').addEventListener('click',()=>closeSheet($('cart-sheet')));
  $('cart-backdrop').addEventListener('click',()=>closeSheet($('cart-sheet')));
  $('btn-clear-cart').addEventListener('click',()=>{ if(cart.length && confirm('¿Vaciar toda la cuenta?')){ cart=[]; save(); renderCart(); } });

  // ---- toast y animación ----
  let tt; function toast(m){ const t=$('toast'); t.textContent=m; t.classList.add('is-show'); clearTimeout(tt); tt=setTimeout(()=>t.classList.remove('is-show'),1200); }
  function fly(src){
    const s=src.getBoundingClientRect(), e=(viewerOpen()?$('viewer-cart'):$('btn-cart')).getBoundingClientRect();
    const f=document.createElement('div'); f.className='fly'; f.textContent='+1';
    f.style.left=(s.left+s.width/2-10)+'px'; f.style.top=(s.top+s.height/2-10)+'px'; document.body.appendChild(f);
    requestAnimationFrame(()=>{ f.style.transform=`translate(${e.left+e.width/2-s.left-s.width/2}px,${e.top+e.height/2-s.top-s.height/2}px) scale(.5)`; f.style.opacity='0'; });
    setTimeout(()=>f.remove(),600);
  }

  // barra compacta (sin etiquetas) al bajar
  window.addEventListener('scroll',()=>{ $('topbar').classList.toggle('is-compact', window.scrollY>60); },{passive:true});

  // ---- splash ----
  function initSplash(){
    const start=Date.now(); let done=false;
    const finish=()=>{ if(done) return; done=true;
      setTimeout(()=>{ $('splash').classList.add('is-hidden'); $('app').hidden=false; setTimeout(()=>$('splash').remove(),650); }, Math.max(0,1300-(Date.now()-start))); };
    const im=new Image(); im.onload=finish; im.onerror=finish; im.src='assets/inicio.png';
    setTimeout(finish,2500);
  }

  function init(){
    load(); renderNav(); renderCart();
    openCategory(CATEGORIAS[0].id);
    initSplash();
  }
  document.addEventListener('DOMContentLoaded',init);
})();
