(function(G){
const e=G.esc;
const pw=(n,ph)=>`<div class="pw"><input type="password" name="${n}" placeholder="${ph}" autocomplete="off" required><button type="button" class="eye" data-act="eye" aria-label="Show or hide password">${G.ic('eye')}</button></div>`;
const f=(l,n,ph,t)=>`<label>${l}</label><input type="${t||'text'}" name="${n}" placeholder="${ph}" required autocomplete="off">`;
const sub=t=>`<div class="end"><button class="btn" type="submit">${t}</button></div>`;
const hash=async s=>{const b=new TextEncoder().encode('gbx:'+s);if(window.crypto&&crypto.subtle)return[...new Uint8Array(await crypto.subtle.digest('SHA-256',b))].map(x=>x.toString(16).padStart(2,'0')).join('');return btoa(String.fromCharCode(...b))};
G.pages.auth=a=>{const n=e(G.db.set.name),rg=a==='register',rc=a==='recover';let b;
if(rg)b=`<h2>Dashboard Registration</h2><p class="mu sub">Create a new ${n} account.</p><form data-form="register" novalidate>${f('Username','username','Username')}${f('Email','email','Email','email')}<label>Password</label>${pw('password','Password')}<label>Confirm Password</label>${pw('confirm','Confirm Password')}<p class="err" role="alert"></p>${sub('Register')}</form>`;
else if(rc)b=`<h2>Account Recovery</h2><p class="mu sub">Atur ulang password lewat username dan email akun ini.</p><form data-form="recover" novalidate>${f('Username','username','Username')}${f('Email','email','Email','email')}<label>New Password</label>${pw('password','New Password')}<p class="err" role="alert"></p>${sub('Reset Password')}</form>`;
else b=`<h2>Dashboard Login</h2><p class="mu sub">Login to an existing ${n} account.</p><form data-form="login" novalidate>${f('Username','username','Username or Email')}<label>Password</label>${pw('password','Password')}<p class="hint">Forgot Password? <a href="#auth/recover">Recover</a></p><p class="err" role="alert"></p>${sub('Login')}</form>`;
return `<h1 class="title glow">${n}</h1><div class="tabs"><a class="tab ${rg||rc?'':'on'}" href="#auth">${G.ic('login')}Login</a><a class="tab ${rg?'on':''}" href="#auth/register">${G.ic('userplus')}Register</a></div><div class="panel">${b}</div><p class="mu hint">tempat aman beli wl &amp; dl growblox</p>`};
G.act.eye=b=>{const i=b.previousElementSibling,s=i.type==='password';i.type=s?'text':'password';b.innerHTML=G.ic(s?'eyeoff':'eye')};
const busy=async(fm,fn)=>{const b=fm.querySelector('[type=submit]'),er=fm.querySelector('.err');er.textContent='';b.disabled=true;b.classList.add('load');await new Promise(r=>setTimeout(r,450));try{const m=await fn(G.fd(fm));if(m)er.textContent=m}finally{b.disabled=false;b.classList.remove('load')}};
G.act.register=fm=>busy(fm,async v=>{const n=v.username.trim(),m=v.email.trim().toLowerCase(),d=G.db;
if(n.length<3||n.length>20)return'Username harus 3-20 karakter.';
if(n.toLowerCase()===G.OWNER.username)return'Username ini khusus akun owner.';
if(d.users.some(u=>u.username.toLowerCase()===n.toLowerCase()))return'Username sudah dipakai.';
if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m))return'Format email tidak valid.';
if(d.users.some(u=>u.email===m))return'Email sudah terdaftar.';
if(v.password.length<8)return'Password minimal 8 karakter.';
if(v.password!==v.confirm)return'Konfirmasi password tidak sama.';
const u={id:G.uid('U'),username:n,email:m,pass:await hash(v.password),admin:false,t:Date.now()};
d.users.push(u);d.session=u.id;G.log('Registrasi: '+n);G.save();G.toast('Registrasi berhasil. Selamat datang, '+n+'.');G.go('home')});
G.act.login=fm=>busy(fm,async v=>{const k=v.username.trim().toLowerCase(),u=G.db.users.find(x=>x.username.toLowerCase()===k||x.email===k),h=await hash(v.password),O=G.OWNER;
if(k===O.username){if(h!==O.h&&h!==O.b)return'Username/email atau password salah.';G.db.session='OWNER'}
else{if(!u||u.pass!==h)return'Username/email atau password salah.';G.db.session=u.id}
G.save();G.toast('Login berhasil.');G.go('home')});
G.act.recover=fm=>busy(fm,async v=>{const u=G.db.users.find(x=>x.username.toLowerCase()===v.username.trim().toLowerCase()&&x.email===v.email.trim().toLowerCase());
if(!u)return'Username dan email tidak cocok dengan akun mana pun.';
if(v.password.length<8)return'Password baru minimal 8 karakter.';
u.pass=await hash(v.password);G.save();G.toast('Password diganti. Silakan login.');G.go('auth')});
G.act.logout=()=>{G.db.session=null;G.save();G.go('auth')};
})(GB);
