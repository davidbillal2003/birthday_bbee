# Birthday Website — For Bbee ❤️

Website ulang tahun personal untuk Mira Aulia Safitri.

## 1. Jalankan di komputer

Cara paling mudah:
- Buka folder ini.
- Klik dua kali `index.html`.
- Website akan terbuka di browser.

Jika ingin pengalaman yang lebih stabil, gunakan VS Code + extension Live Server.

## 2. Ganti foto

Masukkan foto kalian ke folder:

images/

Gunakan nama:
- photo1.jpg
- photo2.jpg
- photo3.jpg
- photo4.jpg
- photo5.jpg
- photo6.jpg

Jika file foto kamu PNG, ubah nama di `index.html` menjadi `.png`.

## 3. Tambahkan musik

Masukkan lagu MP3 ke:

audio/birthday-song.mp3

Catatan: browser dapat membatasi autoplay. Website sudah mencoba memulai musik setelah tombol pembuka ditekan. Tombol musik berada di kanan bawah.

## 4. Ganti tanggal

Buka `script.js` dan cari:

const birthdayMonth = 8;
const birthdayDay = 8;

September = 8 karena JavaScript menghitung bulan dari 0.

## 5. Ganti pertanyaan game

Di `script.js`, cari:

const questions = [...]

Kamu bisa mengganti pertanyaan, pilihan jawaban, dan nomor jawaban benar.

## 6. Upload online

Pilihan termudah:
- GitHub Pages
- Netlify
- Vercel

Karena website ini hanya HTML/CSS/JS, tidak membutuhkan database atau backend.

## 7. Catatan

Foto placeholder memakai gambar dari placehold.co jika foto lokal belum tersedia. Setelah foto kamu dimasukkan, foto lokal akan tampil.
