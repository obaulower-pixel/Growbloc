(function(G){
const e=G.esc,MIN=15*60000;
/* Batas jumlah per pesanan. Ubah angka di sini bila perlu (min/max per kode produk). */
const LIM={WL:{min:10,max:Infinity}},lim=c=>LIM[c]||{min:1,max:Infinity};
const conv=(c,q)=>c==='WL'&&q>=100?`${Math.floor(q/100)} DL${q%100?` + ${q%100} WL`:''}`:c==='DL'&&q>=100?`${Math.floor(q/100)} BGL${q%100?` + ${q%100} DL`:''}`:'';
G.end=(o,st,type,msg)=>{o.st=st;const p=G.db.products.find(x=>x.id===o.pid);if(p)p.stock+=o.qty;G.notify(o.uid,type,msg);G.log(`${o.id} menjadi ${st}`)};
G.tick=()=>{let c=0;G.db.orders.forEach(o=>{if(o.st==='PENDING'&&o.exp<=Date.now()){G.end(o,'EXPIRED','expired',`Pesanan ${o.id} kedaluwarsa dan stok dikembalikan.`);c++}});if(c)G.save();return c};
G.pages.checkout=id=>{const ps=G.db.products.filter(p=>p.on&&p.stock>0),p=ps.find(x=>x.id===id)||ps[0];
if(!p)return'<div class="panel"><h2>Checkout</h2><p class="mu">Semua produk sedang habis.</p><a class="btn" href="#shop">Back to Shop</a></div>';
return `<h2 class="sec">Checkout</h2><form class="panel" data-form="order" novalidate><label>Product</label><select name="pid" data-inp="co">${ps.map(x=>`<option value="${e(x.id)}" ${x.id===p.id?'selected':''}>${e(x.name)} (${e(x.code)}) - ${G.rp(x.price)} - stock ${x.stock}</option>`).join('')}</select><label>Quantity</label><div class="qty"><button type="button" class="btn sec" data-act="qty" data-d="-1" aria-label="Minus">${G.ic('minus')}</button><input name="qty" type="number" min="${lim(p.code).min}" value="${lim(p.code).min}" inputmode="numeric" data-inp="co"><button type="button" class="btn sec" data-act="qty" data-d="1" aria-label="Plus">${G.ic('plus')}</button></div><label>GrowID</label><input name="growid" placeholder="GrowID" autocomplete="off"><label>World Name</label><input name="world" placeholder="World Name" autocomplete="off"><div class="sum" id="sum"></div><p class="err" id="err" role="alert"></p><div class="end"><button class="btn" type="submit">${G.ic('check')}Confirm Order</button></div></form>`};
G.after.checkout=()=>G.act.co();
G.act.co=t=>{const f=document.querySelector('[data-form=order]');if(!f)return;if(t&&t.name==='pid')f.qty.value=lim((G.db.products.find(x=>x.id===t.value)||{}).code).min;const d=G.fd(f),p=G.db.products.find(x=>x.id===d.pid),q=Math.floor(+d.qty)||0,c=conv(p.code,q),L=lim(p.code),B=[L.min>1&&'minimal '+L.min,L.max<Infinity&&'maksimal '+L.max].filter(Boolean).join(', '),er=document.getElementById('err');
if(L.max<Infinity)f.qty.max=L.max;else f.qty.removeAttribute('max');f.qty.min=L.min;
if(er)er.textContent=q>L.max?`Pembelian ${p.code} maksimal ${L.max} per pesanan.`:q&&q<L.min?`Pembelian ${p.code} minimal ${L.min} per pesanan.`:'';
document.getElementById('sum').innerHTML=`<h3>Order Summary</h3><p>${e(p.name)} x ${q}</p><p class="mu">${G.rp(p.price)} each${c?` | equals ${c}`:''}</p>${B?`<p class="mu">Batas pembelian ${e(p.code)}: ${B} per pesanan.</p>`:''}<p class="total">Total Payment: ${G.rp(p.price*q)}</p>`};
G.act.qty=t=>{const i=t.parentNode.querySelector('input'),f=t.closest('form'),p=G.db.products.find(x=>x.id===f.pid.value),L=lim(p?p.code:'');i.value=Math.min(L.max,Math.max(L.min,(+i.value||L.min)+ +t.dataset.d));G.act.co()};
G.act.order=f=>{const d=G.fd(f),p=G.db.products.find(x=>x.id===d.pid),q=+d.qty,gi=d.growid.trim(),w=d.world.trim(),er=document.getElementById('err'),bad=m=>{er.textContent=m};
if(!Number.isInteger(q)||q<1)return bad('Jumlah harus bilangan bulat minimal 1.');
if(p){const L=lim(p.code);if(q>L.max)return bad(`Pembelian ${p.code} maksimal ${L.max} per pesanan.`);if(q<L.min)return bad(`Pembelian ${p.code} minimal ${L.min} per pesanan.`)}
if(!p||!p.on||q>p.stock)return bad('Stok tidak cukup. Tersedia: '+(p?p.stock:0)+'.');
if(!/^[A-Za-z0-9_.-]{3,30}$/.test(gi))return bad('GrowID 3-30 karakter (huruf, angka, _ . -).');
if(!/^[A-Za-z0-9]{1,24}$/.test(w))return bad('Nama world hanya huruf dan angka (maks 24).');
const u=G.me(),t=Date.now(),o={id:G.uid('GBX-'),uid:u.id,user:u.username,pid:p.id,code:p.code,name:p.name,qty:q,price:p.price,total:p.price*q,growid:gi,world:w.toUpperCase(),st:'PENDING',t,exp:t+MIN,proof:'',done:0};
p.stock-=q;G.db.orders.unshift(o);G.notify(u.id,'created',`Pesanan ${o.id} (${G.lbl(o)}) dibuat. Bayar sebelum 15 menit.`);G.notify('admin','created',`Pesanan baru ${o.id} (${G.lbl(o)}) dari ${u.username}.`);G.log('Pesanan dibuat: '+o.id);G.save();G.go('pay/'+o.id)};
})(GB);
