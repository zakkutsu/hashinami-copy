# Hashico Backend (Hashinami App)

Backend server untuk aplikasi belajar Bahasa Jepang **Hashinami**, dibangun menggunakan Node.js, Express, dan MySQL (Sequelize ORM).

## 🚀 Fitur Utama (MVP)
1.  **Authentication**: Register & Login dengan JWT (JSON Web Token).
2.  **User Management**: Update Profile, XP System, Leaderboard.
3.  **Dictionary System**:
    * **Kanji**: Data Kanji, Onyomi/Kunyomi, Goresan, dan Contoh Kalimat.
    * **Kana**: Hiragana & Katakana.
    * **Vocabulary**: Kosakata, Arti, dan Jenis Kata.
4.  **Learning System**: Artikel dan Materi Pelajaran.
5.  **Quiz System**: Latihan soal pilihan ganda & history nilai.
6.  **Search Engine**: Pencarian global untuk Kanji dan Vocab.

---

## 🛠️ Instalasi & Cara Menjalankan

### 1. Prasyarat
* Node.js (v14+)
* MySQL (Via XAMPP/Laragon atau Docker)

### 2. Instalasi Dependencies
```bash
npm install
```

### 3. Konfigurasi Environment
Buat file `.env` dan sesuaikan dengan database kamu:

```ini
PORT=3000
DB_NAME=hashico_db
DB_USER=root
DB_PASS=            # Isi jika ada password
DB_HOST=localhost   # Atau 127.0.0.1
DB_PORT=3306        # Ganti 3307 jika pakai Docker
JWT_SECRET=rahasia_hashico_super_aman
```

### 4. Menjalankan Server
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`.

### 5. Seeding Database (Isi Data Otomatis)
Agar tidak perlu input manual, jalankan perintah ini untuk mengisi database dengan data User, Kanji, Vocab, dan Quiz dasar:

```bash
node seed.js
```

**Akun Default Siap Pakai:**

* **Admin:** `admin` / `password123`
* **User:** `user` / `password123`

---

## 📚 Dokumentasi API (Endpoints)
Semua endpoint memiliki prefix: `/api/v1`

### 🔐 Authentication
| Method | Endpoint | Deskripsi | Auth Butuh? |
|--------|----------|-----------|-------------|
| POST | `/auth/register` | Mendaftar user baru | ❌ |
| POST | `/auth/login` | Masuk & dapatkan Token | ❌ |

### 👤 User Profile
| Method | Endpoint | Deskripsi | Auth Butuh? |
|--------|----------|-----------|-------------|
| GET | `/users/me` | Lihat profil & history kuis | ✅ |
| PUT | `/users/me` | Update data diri | ✅ |
| GET | `/users/leaderboard` | Top 10 User dengan XP tertinggi | ❌ |

### 📖 Dictionary (Kamus) & Search
| Method | Endpoint | Deskripsi | Auth Butuh? |
|--------|----------|-----------|-------------|
| GET | `/search` | Cari Kanji/Vocab (`?keyword=makan`) | ❌ |
| GET | `/dictionary/kanji` | Ambil daftar Kanji (Paginasi) | ❌ |
| POST | `/dictionary/kanji` | Tambah Kanji + Contoh (Admin) | ❌ |
| POST | `/dictionary/kanji-example` | Tambah Contoh Kalimat saja | ❌ |
| GET | `/dictionary/kana` | Ambil Hiragana/Katakana | ❌ |
| POST | `/dictionary/kana` | Tambah Kana (Admin) | ❌ |
| GET | `/dictionary/vocab` | Ambil Kosakata (Filter Level) | ❌ |
| POST | `/dictionary/vocab` | Tambah Kosakata (Admin) | ❌ |

### 🎓 Learning & Quiz
| Method | Endpoint | Deskripsi | Auth Butuh? |
|--------|----------|-----------|-------------|
| GET | `/learning/materials` | Ambil materi pelajaran | ❌ |
| POST | `/learning/materials` | Tambah materi (Admin) | ❌ |
| GET | `/learning/quiz/play` | Main Kuis (Random Soal) | ❌ |
| POST | `/learning/quiz` | Tambah Soal (Admin) | ❌ |
| POST | `/learning/quiz/submit` | Simpan Nilai & XP | ✅ |

---

## 🔮 Future Roadmap (Fitur Masa Depan)
Fitur berikut direncanakan untuk pengembangan tahap selanjutnya:

* [ ] **User Avatar Upload**: Upload foto profil fisik (sekarang menggunakan generated avatar).
* [ ] **Admin Dashboard**: Web khusus untuk input data tanpa Postman.
* [ ] **Daily Streak**: Fitur absen harian.
