(function(G){
const P={
login:'<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="m10 17 5-5-5-5M15 12H3"/>',
userplus:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
eyeoff:'<path d="M9.9 4.2A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3 3.9M6.6 6.6C3.5 8.4 2 12 2 12s3.5 7 10 7a9.7 9.7 0 0 0 4.4-1M9.9 9.9a3 3 0 0 0 4.2 4.2M2 2l20 20"/>',
home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
shop:'<path d="m4 9 1-5h14l1 5"/><path d="M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0A2.7 2.7 0 0 0 20 9M5 21V12M19 21V12M3 21h18"/>',
orders:'<path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
history:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
shield:'<path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6z"/>',
check:'<path d="m5 12 5 5L20 7"/>',x:'<path d="M6 6l12 12M18 6 6 18"/>',
copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>',
upload:'<path d="M12 16V4M7 9l5-5 5 5M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
download:'<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>',
box:'<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
alert:'<path d="M12 3 2 20h20z"/><path d="M12 10v5M12 18h.01"/>',
chart:'<path d="M4 20V4M4 20h16M8 16v-5M13 16V8M18 16v-9"/>',
settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',
trophy:'<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.7V17c0 .6-.5 1-1.1 1.2C7.8 18.7 7 20.2 7 22M14 14.7V17c0 .6.5 1 1.1 1.2 1.1.5 1.9 2 1.9 3.8M18 2H6v7a6 6 0 0 0 12 0z"/>',help:'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',robux:'<path d="M12 2 21 7v10l-9 5-9-5V7z"/><rect x="9" y="9" width="6" height="6" rx="1"/>',refresh:'<path d="M3 12a9 9 0 0 1 15.5-6.3L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.3L3 16M3 21v-5h5"/>',lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',up:'<path d="m6 15 6-6 6 6"/>',down:'<path d="m6 9 6 6 6-6"/>'};
G.ic=(n,c)=>`<svg class="ic ${c||''}" viewBox="0 0 24 24" aria-hidden="true">${P[n]||''}</svg>`;
G.toast=(m,t)=>{t=t||'ok';const x=document.createElement('div');x.className='toast '+t;x.setAttribute('role','status');x.innerHTML=G.ic(t==='ok'?'check':t==='bad'?'x':'alert')+'<span>'+G.esc(m)+'</span>';document.body.appendChild(x);setTimeout(()=>x.remove(),3200)};
G.nav=p=>{const u=G.me(),n=G.unread(),L=[['home','home','Home'],['shop','lock','Growtopia Shop'],['robux','robux','Top Up Robux'],['rich','trophy','Top Rich'],['orders','orders','My Orders'],['history','history','Transaction History'],['profile','user','Profile'],['help','help','Help Center']];if(u.admin)L.push(['admin','shield','Admin']);
const lk=l=>`<a href="#${l[0]}" class="${p===l[0]?'on':''}">${G.ic(l[1])}<span>${l[2]}</span></a>`,B=['home','shop','robux','rich','orders'].map(k=>L.find(l=>l[0]===k));
return `<aside class="side" id="side"><a class="brand" href="#home"><img class="logo" src="assets/logos/logo.png" width="40" height="40" alt=""><span>${G.esc(G.db.set.name)}</span></a><nav>${L.map(lk).join('')}</nav><a href="#" data-act="logout" class="out">${G.ic('logout')}<span>Logout</span></a></aside><header class="nav"><button class="btn sm sec burger" data-act="menu" aria-label="Menu">${G.ic('menu')}</button><form class="hs" data-form="hsearch">${G.ic('search')}<input name="q" placeholder="Cari produk Growtopia" aria-label="Cari produk" autocomplete="off"></form><a class="bell" href="#notif" aria-label="Notifications">${G.ic('bell')}${n?`<i>${n}</i>`:''}</a><a class="me" href="#profile">${G.ic('user')}<span>${G.esc(u.username)}</span></a></header><nav class="bnav">${B.map(l=>`<a href="#${l[0]}" class="${p===l[0]?'on':''}">${G.ic(l[1])}<span>${l[2].replace('Growtopia ','').replace('Top Up ','')}</span></a>`).join('')}</nav>`};
G.act.menu=()=>document.getElementById('side').classList.toggle('open');
G.act.hsearch=f=>{const v=f.q.value;G.go('shop');setTimeout(()=>{const i=document.getElementById('q');if(i){i.value=v;G.act.shopf()}},60)};
document.addEventListener('click',ev=>{const t=ev.target.closest('[data-act]'),f=t&&G.act[t.dataset.act];if(f){ev.preventDefault();f(t)}});
document.addEventListener('submit',ev=>{const f=G.act[ev.target.dataset.form];if(f){ev.preventDefault();f(ev.target)}});
document.addEventListener('input',ev=>{const f=G.act[ev.target.dataset&&ev.target.dataset.inp];if(f)f(ev.target)});
document.addEventListener('change',ev=>{const f=G.act[ev.target.dataset&&ev.target.dataset.chg];if(f)f(ev.target)});
G.render();
})(GB);
