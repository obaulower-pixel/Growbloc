(function(G){
const e=G.esc,mask=n=>e(String(n).slice(0,2))+'***';
G.lbl=o=>o.kind==='ROBUX'?o.name:`${o.qty.toLocaleString('id-ID')} ${o.code}`;
const ago=t=>{const s=Math.max(0,(Date.now()-t)/1000);return s<60?'baru saja':s<3600?Math.floor(s/60)+' menit lalu':s<86400?Math.floor(s/3600)+' jam lalu':Math.floor(s/86400)+' hari lalu'};
G.buys=n=>G.db.orders.filter(o=>o.st==='SUCCESS').sort((a,b)=>(b.ta||b.t)-(a.ta||a.t)).slice(0,n||8);
G.feed=()=>`<section class="panel feed"><h2>${G.ic('bell')}Pembelian Terbaru</h2><div class="list">${G.buys(8).map(o=>`<div class="row fi">${G.ic('check')}<div><b>${mask(o.user)}</b> membeli <b>${e(G.lbl(o))}</b><small>${ago(o.ta||o.t)}</small></div></div>`).join('')||'<p class="mu">Belum ada pembelian yang disetujui.</p>'}</div><p class="mu note">Hanya pesanan yang sudah diverifikasi admin. Data diambil dari browser ini.</p></section>`;
/* Popup pembelian: muncul tiap 5 detik di Home, Shop, Robux, dan Top Rich.
   Sumber tetap pesanan SUCCESS (disetujui admin), dibaca ulang setiap muncul. */
const PAGES=['home','shop','robux','rich'],GAP=5000,LIVE=4200;
let hd,i=0,mute=0;
const page=()=>location.hash.slice(1).split('/')[0]||'home';
const host=()=>{let el=document.getElementById('pop');if(el)return el;const m=document.querySelector('main');if(!m)return null;
el=document.createElement('div');el.className='pop';el.id='pop';el.hidden=true;el.setAttribute('role','status');m.appendChild(el);return el};
const hide=()=>{clearTimeout(hd);const el=document.getElementById('pop');if(el)el.hidden=true};
const tick=()=>{if(mute||document.hidden||!G.me()||!PAGES.includes(page()))return hide();
const l=G.buys(8);if(!l.length)return hide();const el=host();if(!el)return;const o=l[i++%l.length];
el.innerHTML=`${G.ic(o.kind==='ROBUX'?'robux':'bell')}<div><p><b>${mask(o.user)}</b> membeli <b>${e(G.lbl(o))}</b></p><small>${ago(o.ta||o.t)}</small></div><button data-act="popx" aria-label="Tutup">${G.ic('x')}</button>`;
el.hidden=false;clearTimeout(hd);hd=setTimeout(()=>{el.hidden=true},LIVE)};
G.act.popx=()=>{mute=1;hide()};
addEventListener('hashchange',()=>{mute=0});
setTimeout(()=>{tick();setInterval(tick,GAP)},1500);
})(GB);
