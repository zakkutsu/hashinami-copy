const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const routes = require('./routes');
require('dotenv').config();

// --- IMPORT MODELS ---
const User = require('./models/user');
const Kanji = require('./models/kanji');
const KanjiExample = require('./models/kanjiExample');
const Kana = require('./models/kana');
const Material = require('./models/material');
const Quiz = require('./models/quiz');
const QuizOption = require('./models/quizOption');
const QuizHistory = require('./models/quizHistory');

// --- SETUP RELASI ---
Kanji.hasMany(KanjiExample, { foreignKey: 'kanjiId' });
KanjiExample.belongsTo(Kanji, { foreignKey: 'kanjiId' });

Quiz.hasMany(QuizOption, { foreignKey: 'quizId' });
QuizOption.belongsTo(Quiz, { foreignKey: 'quizId' });

User.hasMany(QuizHistory, { foreignKey: 'userId' });
QuizHistory.belongsTo(User, { foreignKey: 'userId' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use('/api/v1', routes);

app.get('/', (req, res) => {
    res.send("Backend Hashico (Kanji Database) Siap!");
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        
        // alter: true -> Otomatis update tabel jika kita nambah kolom baru tanpa hapus data lama
        await sequelize.sync({ alter: true }); 
        
        console.log('✅ Database Terkoneksi!');
        app.listen(PORT, () => {
            console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ Gagal koneksi database:', err);
    }
};

startServer();