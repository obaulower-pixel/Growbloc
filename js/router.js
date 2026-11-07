(function(G){
G.go=h=>{if(location.hash==='#'+h)G.render();else location.hash=h};
G.foot=()=>{const s=G.db.set,e=G.esc,l=(u,t)=>u?`<a href="${e(u)}" target="_blank" rel="noopener">${t}</a>`:'';return `<footer class="foot"><p>${e(s.foot)}</p><div>${l(s.wa,'WhatsApp Support')}${l(s.dc,'Discord')}</div></footer>`};
G.render=k=>{clearInterval(G.T);G.tick();const q=location.hash.slice(1).split('/'),u=G.me();let p=q[0]||'home';const au=p==='auth';
if(!u&&!au)return G.go('auth');if(u&&au)return G.go('home');if(p==='admin'&&!u.admin)p='home';if(!G.pages[p])p='home';
document.getElementById('app').innerHTML=(p==='auth'?'':G.nav(p))+`<main class="${p==='auth'?'auth':'wrap'} fade">${G.pages[p](q[1])}</main>`+(p==='auth'?'':G.foot());
if(G.after[p])G.after[p](q[1]);if(k!==true)window.scrollTo(0,0)};
addEventListener('hashchange',()=>G.render());
})(GB);
