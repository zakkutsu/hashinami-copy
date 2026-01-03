const sequelize = require('./src/config/database');
const bcrypt = require('bcrypt');

// Import Semua Model
const User = require('./src/models/user');
const Kana = require('./src/models/kana');
const Kanji = require('./src/models/kanji');
const KanjiExample = require('./src/models/kanjiExample');
const Vocabulary = require('./src/models/vocabulary');
const Material = require('./src/models/material');
const Quiz = require('./src/models/quiz');
const QuizOption = require('./src/models/quizOption');
const QuizHistory = require('./src/models/quizHistory');

// ==========================================
// PENTING: SETUP RELASI (ASSOCIATIONS)
// Karena seed.js jalan sendiri, kita harus definisikan ulang relasinya di sini
// ==========================================

// 1. Relasi Kanji
Kanji.hasMany(KanjiExample, { foreignKey: 'kanjiId' });
KanjiExample.belongsTo(Kanji, { foreignKey: 'kanjiId' });

// 2. Relasi Quiz
Quiz.hasMany(QuizOption, { foreignKey: 'quizId' });
QuizOption.belongsTo(Quiz, { foreignKey: 'quizId' });

// 3. Relasi User & History
User.hasMany(QuizHistory, { foreignKey: 'userId' });
QuizHistory.belongsTo(User, { foreignKey: 'userId' });

// ==========================================

const seedDatabase = async () => {
    try {
        // 1. Matikan Foreign Key Checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
        console.log('🔓 Foreign Key Checks dimatikan sementara...');

        // 2. Reset Database
        await sequelize.sync({ force: true });
        console.log('🗑️  Database lama dihapus & tabel dibuat ulang.');

        // 3. Nyalakan kembali Foreign Key Checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });

        // ==========================================
        // 4. SEED USERS
        // ==========================================
        const passwordHash = await bcrypt.hash('password123', 10);

        await User.bulkCreate([
            {
                username: 'admin',
                email: 'admin@hashinami.com',
                password: passwordHash,
                full_name: 'Admin Hashinami',
                role: 'ADMIN',
                xp: 9999
            },
            {
                username: 'user',
                email: 'user@gmail.com',
                password: passwordHash,
                full_name: 'Murid Teladan',
                role: 'USER',
                xp: 50
            }
        ]);
        console.log('✅ Users berhasil dibuat (Pass: password123)');

        // ==========================================
        // 5. SEED KANA
        // ==========================================
        // Gunakan create satu per satu jika bulkCreate bermasalah dengan validasi di beberapa versi MySQL
        // atau pastikan DB sudah support utf8mb4_bin
        const kanas = [
            { character: 'あ', romaji: 'a', type: 'HIRAGANA', strokes: 3 },
            { character: 'い', romaji: 'i', type: 'HIRAGANA', strokes: 2 },
            { character: 'う', romaji: 'u', type: 'HIRAGANA', strokes: 2 },
            { character: 'ア', romaji: 'a', type: 'KATAKANA', strokes: 2 },
            { character: 'イ', romaji: 'i', type: 'KATAKANA', strokes: 2 }
        ];
        
        for (const k of kanas) {
            await Kana.create(k);
        }
        console.log('✅ Kana berhasil dibuat');

        // ==========================================
        // 6. SEED KANJI + EXAMPLES
        // ==========================================
        await Kanji.create({
            character: '日',
            level: 'N5',
            onyomi: 'NICHI, JITSU',
            kunyomi: 'hi, -ka',
            meaning: 'Matahari, Hari',
            strokes: 4,
            radical: '日 (hi)',
            KanjiExamples: [
                { sentence: '日は東から昇る', reading: 'Hi wa higashi kara noboru', meaning: 'Matahari terbit dari timur' },
                { sentence: '日曜日', reading: 'Nichiyoubi', meaning: 'Hari Minggu' }
            ]
        }, { include: [KanjiExample] });

        await Kanji.create({
            character: '月',
            level: 'N5',
            onyomi: 'GETSU, GATSU',
            kunyomi: 'tsuki',
            meaning: 'Bulan',
            strokes: 4,
            radical: '月 (tsuki)',
            KanjiExamples: [
                { sentence: '月がきれいですね', reading: 'Tsuki ga kirei desu ne', meaning: 'Bulannya indah ya (I love you)' },
                { sentence: '一月', reading: 'Ichigatsu', meaning: 'Januari' }
            ]
        }, { include: [KanjiExample] });
        console.log('✅ Kanji N5 berhasil dibuat');

        // ==========================================
        // 7. SEED VOCABULARY
        // ==========================================
        await Vocabulary.bulkCreate([
            { word: '食べる', reading: 'Taberu', meaning: 'Makan', level: 'N5', type: 'Verb', example_sentence: '寿司を食べる' },
            { word: '見る', reading: 'Miru', meaning: 'Melihat', level: 'N5', type: 'Verb', example_sentence: '映画を見る' },
            { word: '猫', reading: 'Neko', meaning: 'Kucing', level: 'N5', type: 'Noun', example_sentence: '猫が好きです' }
        ]);
        console.log('✅ Vocabulary berhasil dibuat');

        // ==========================================
        // 8. SEED LEARNING MATERIAL
        // ==========================================
        await Material.create({
            title: 'Fungsi Katakana',
            type: 'USAGE',
            level: 'N5',
            content: `1. Menulis kosakata yang berasal dari bahasa asing (contoh: テレビ - Terebi).
2. Menulis nama orang asing, nama tempat asing.
3. Menulis onomatopeia (bunyi tiruan).
4. Menulis kata untuk penekanan (emphasis).`
        });
        console.log('✅ Material berhasil dibuat');

        // ==========================================
        // 9. SEED QUIZ
        // ==========================================
        await Quiz.create({
            question: 'Apa arti dari kanji 日 ?',
            category: 'KANJI',
            level: 'N5',
            QuizOptions: [
                { option_text: 'Bulan', is_correct: false },
                { option_text: 'Matahari', is_correct: true },
                { option_text: 'Api', is_correct: false },
                { option_text: 'Pohon', is_correct: false }
            ]
        }, { include: [QuizOption] });

        await Quiz.create({
            question: 'Manakah yang merupakan Hiragana untuk "a"?',
            category: 'KANA',
            level: 'N5',
            QuizOptions: [
                { option_text: 'あ', is_correct: true },
                { option_text: 'い', is_correct: false },
                { option_text: 'ア', is_correct: false },
                { option_text: 'オ', is_correct: false }
            ]
        }, { include: [QuizOption] });
        console.log('✅ Quiz berhasil dibuat');

        console.log('🎉 SEEDING SELESAI! Database siap digunakan.');
        process.exit(0);

    } catch (error) {
        console.error('❌ Gagal Seeding:', error);
        process.exit(1);
    }
};

seedDatabase();