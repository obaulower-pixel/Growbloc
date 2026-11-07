window.GB={pages:{},act:{},after:{},T:null};
(function(G){
const K='growblox_v1';
const RB=()=>[[100,12000,0],[400,46000,0],[800,90000,1],[1000,110000,0]].map((a,i)=>({id:'R'+(i+1),amt:a[0],price:a[1],pop:a[2],on:1}));
const RICH=()=>[['MWTSTORE123',72,14],['NiHaoMa',30,49],['wang',18,106],['FLOY',15,78],['Merchant',15,59],['SPEED',12,56],['DOBLEH',10,29],['KUCAITOKODL',9,96],['klasstore',9,81]].map((a,i)=>({id:'P'+(i+1),name:a[0],dl:a[1],wl:a[2],bgl:0,on:1,d:0}));
G.seed=()=>({patches:5,robux:RB(),rich:RICH(),richT:Date.now(),users:[],session:null,orders:[],notifs:[],log:[],products:[
{id:'WL',name:'World Lock',code:'WL',cat:'Lock',price:1000,stock:1247,on:1,best:1},
{id:'DL',name:'Diamond Lock',code:'DL',cat:'Lock',price:100000,stock:13,on:1,best:0},
{id:'BGL',name:'Blue Gem Lock',code:'BGL',cat:'Lock',price:0,stock:0,on:1,best:0}],
set:{name:'GROWBLOX SHOP',desc:'Trusted Growtopia item marketplace.',qris:'',wa:'',dc:'',foot:'Data toko tersimpan di browser ini dan tidak tersinkron ke perangkat lain.'}});
G.OWNER={username:'owner',h:'1fbdd81067019d0cd8c8622a2311ef5c217520c4ed00d76932c32cf11bf85b9f',b:'Z2J4Old0WExYdlRqVzRGYXgz'};
G.clean=d=>{d.users=d.users.filter(u=>u.username.toLowerCase()!==G.OWNER.username);d.users.forEach(u=>u.admin=false);if(!d.patches){const b=d.products.find(p=>p.id==='BGL');if(b)b.stock=0;d.patches=1}if(d.patches<2){const l=d.products.find(p=>p.id==='DL');if(l)l.stock=17;d.patches=2}if(d.patches<3){const pr={WL:2000,DL:200000,BGL:2000000};d.products.forEach(p=>{if(pr[p.id])p.price=pr[p.id]});d.robux=RB();d.patches=3}if(d.patches<4){const pr={WL:1000,DL:100000,BGL:0};d.products.forEach(p=>{if(p.id in pr)p.price=pr[p.id]});const l=d.products.find(p=>p.id==='DL');if(l)l.stock=13;d.patches=4}if(d.patches<5){const w=d.products.find(p=>p.id==='WL');if(w)w.stock=1247;d.patches=5}if(!d.robux)d.robux=RB();if(!d.rich){d.rich=RICH();d.richT=Date.now()}return d};
G.db=(()=>{try{const d=JSON.parse(localStorage.getItem(K));if(d&&d.users&&d.products&&d.set)return G.clean(d)}catch(e){}return G.seed()})();
G.save=()=>{try{localStorage.setItem(K,JSON.stringify(G.db));return true}catch(e){G.toast('Penyimpanan penuh. Ekspor backup lalu hapus data lama.','bad');return false}};
G.uid=p=>p+Date.now().toString(36).toUpperCase().slice(-5)+Math.random().toString(36).slice(2,5).toUpperCase();
G.rp=n=>'Rp'+Math.round(n).toLocaleString('id-ID');
G.esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
G.me=()=>G.db.session==='OWNER'?{id:'OWNER',username:G.OWNER.username,email:'Owner account',admin:true,owner:true,t:0}:G.db.users.find(u=>u.id===G.db.session)||null;
G.log=m=>{G.db.log.unshift({t:Date.now(),m});G.db.log=G.db.log.slice(0,100)};
G.fmt=t=>new Date(t).toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'});
G.fd=f=>Object.fromEntries(new FormData(f));
G.img=(file,max)=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>{const i=new Image();i.onload=()=>{const s=Math.min(1,max/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*s;c.height=i.height*s;c.getContext('2d').drawImage(i,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.85))};i.onerror=rej;i.src=r.result};r.onerror=rej;r.readAsDataURL(file)});
})(GB);
