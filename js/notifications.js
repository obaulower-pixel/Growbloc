(function(G){
const IC={created:'orders',submitted:'upload',verifying:'history',approved:'check',rejected:'x',expired:'alert',stock:'box'};
G.notify=(uid,type,text)=>{G.db.notifs.unshift({id:G.uid('N'),uid,type,text,t:Date.now(),read:0});G.db.notifs=G.db.notifs.slice(0,200)};
const mine=()=>{const u=G.me();return G.db.notifs.filter(n=>n.uid===u.id||(u.admin&&n.uid==='admin'))};
G.unread=()=>mine().filter(n=>!n.read).length;
G.pages.notif=()=>`<h2 class="sec">Notifications</h2><div class="cta"><button class="btn sm" data-act="readall">${G.ic('check')}Mark all as read</button><button class="btn sm bad" data-act="clearn">${G.ic('trash')}Clear Notifications</button></div><div class="list">${mine().map(n=>`<div class="panel row ${n.read?'':'unread'}">${G.ic(IC[n.type]||'bell')}<div><p>${G.esc(n.text)}</p><small>${G.fmt(n.t)}</small></div>${n.read?'':`<button class="btn sm sec" data-act="readn" data-id="${n.id}">Mark as read</button>`}</div>`).join('')||'<p class="mu">Belum ada notifikasi.</p>'}</div>`;
G.act.readall=()=>{mine().forEach(n=>n.read=1);G.save();G.render(true)};
G.act.readn=t=>{const n=G.db.notifs.find(x=>x.id===t.dataset.id);if(n)n.read=1;G.save();G.render(true)};
G.act.clearn=()=>{const s=new Set(mine().map(n=>n.id));G.db.notifs=G.db.notifs.filter(n=>!s.has(n.id));G.save();G.render(true)};
})(GB);
