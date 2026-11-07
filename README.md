# GROWBLOX SHOP

Marketplace WL / DL / BGL Growtopia. HTML5 + CSS3 + JavaScript Vanilla, tanpa backend dan tanpa API.

## Menjalankan
- Lokal: buka `index.html` di browser (atau `python -m http.server`).
- Hosting statis: upload seluruh folder ke GitHub Pages, Netlify, atau Vercel.

## Alur
1. Hanya ada satu akun owner (admin) yang dibuat di `G.OWNER` pada `js/storage.js`. Akun lain, termasuk yang mendaftar, selalu pembeli biasa dan username owner tidak bisa didaftarkan.
2. QRIS toko sudah terpasang dari `assets/images/qris.jpg`. Ganti lewat Admin > Website Settings bila perlu, dan isi link WhatsApp/Discord di sana.
3. Admin: Admin > Products & Stock untuk ubah harga, stok, aktif/nonaktif produk.
4. Pembeli: Shop > Buy Now > isi GrowID + World > bayar QRIS (batas 15 menit) > unggah bukti. Di halaman bayar ada tombol Download QRIS. Pembelian WL minimal 10 per pesanan dan tanpa batas maksimal (selama stok cukup; ubah `LIM` di `js/checkout.js`).
5. Admin: Orders > Approve/Reject bukti secara manual > Complete Order setelah item dikirim.

## Penting
- Semua data (akun, pesanan, bukti bayar) ada di LocalStorage browser masing-masing. Tidak tersinkron antar perangkat dan hilang jika data browser dibersihkan. Gunakan Backup & Restore.
- Login dan Admin berbasis browser hanya untuk demo/penggunaan lokal, bukan keamanan sungguhan.
- Tanpa payment gateway, pembayaran TIDAK diverifikasi otomatis. Status SUCCESS hanya muncul setelah admin menyetujui.

## Ganti password owner
Buka index.html, tekan F12 > Console, jalankan (password ASCII saja), lalu salin nilai h dan b ke `G.OWNER` di `js/storage.js`:
`(async()=>{const p=prompt('Password baru'),r=new TextEncoder().encode('gbx:'+p);console.log(JSON.stringify({h:[...new Uint8Array(await crypto.subtle.digest('SHA-256',r))].map(x=>x.toString(16).padStart(2,'0')).join(''),b:btoa('gbx:'+p)}))})()`
Hash tersimpan di source frontend, jadi ini hanya pembatas untuk demo/lokal, bukan keamanan server.

## V2
- Navigasi: sidebar (desktop) dan bottom nav (mobile) dengan Home, Growtopia Shop, Top Up Robux, Top Rich, My Orders, Transaction History, Profile, Help Center. Menu Admin hanya untuk owner.
- Top Up Robux: paket dikelola di Admin > Robux Packages. Pesanan memakai alur bayar QRIS dan verifikasi manual yang sama dengan Growtopia. Pengiriman Robux dilakukan manual oleh admin.
- Top Rich: data dikelola di Admin > Top Rich (tambah, edit, hapus, aktif/nonaktif, import CSV). Total dihitung dengan bilangan bulat: WL total = BGL x 10.000 + DL x 100 + WL. Tampilan mengikuti embed Discord (medali peringkat, ikon DL/WL/BGL, total ≈ DL). Data awal hanyalah contoh, bukan data live. Untuk API sungguhan, ganti sumber `G.db.rich` di `js/top-rich.js`.
- Semua data tetap di LocalStorage browser. Untuk pemakaian publik dibutuhkan backend (autentikasi admin, validasi harga, dan bukti bayar di server).
- Notifikasi pembelian: panel di Home dan popup (muncul tiap 5 detik di Home, Shop, Top Up Robux, Top Rich) hanya menampilkan pesanan yang sudah disetujui admin (contoh 1 WL, 800 WL, 12 DL). Tidak ada pembelian palsu. Karena data di browser masing-masing, feed bersama untuk semua pengunjung butuh backend.
