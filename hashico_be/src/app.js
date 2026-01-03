const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const routes = require('./routes');
require('dotenv').config();

// --- IMPORT MODELS (PENTING) ---
const User = require('./models/user');
const Kanji = require('./models/kanji');
const KanjiExample = require('./models/kanjiExample');
const Kana = require('./models/kana');

// --- SETUP RELASI ---
// "Kanji punya banyak Contoh"
Kanji.hasMany(KanjiExample, { foreignKey: 'kanjiId' });
// "Contoh milik satu Kanji"
KanjiExample.belongsTo(Kanji, { foreignKey: 'kanjiId' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1', routes);

app.get('/', (req, res) => {
    res.send("Backend Hashico (Kanji Database) Siap!");
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        
        // alter: true -> Otomatis update tabel jika kita nambah kolom baru tanpa hapus data lama
        await sequelize.sync({ alter: true }); 
        
        console.log('✅ Database Kanji & User Terkoneksi!');
        app.listen(PORT, () => {
            console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ Gagal koneksi database:', err);
    }
};

startServer();