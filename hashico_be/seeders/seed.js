const sequelize = require('../src/config/database');
const bcrypt = require('bcrypt');

// Import Semua Model
const User = require('../src/models/user');
const Kana = require('../src/models/kana');
const Kanji = require('../src/models/kanji');
const KanjiExample = require('../src/models/kanjiExample');
const Vocabulary = require('../src/models/vocabulary');
const Material = require('../src/models/material');
const Quiz = require('../src/models/quiz');
const QuizOption = require('../src/models/quizOption');
const QuizHistory = require('../src/models/quizHistory');

// ==========================================
// SETUP RELASI (Wajib di seed.js)
// ==========================================
Kanji.hasMany(KanjiExample, { foreignKey: 'kanjiId' });
KanjiExample.belongsTo(Kanji, { foreignKey: 'kanjiId' });
Quiz.hasMany(QuizOption, { foreignKey: 'quizId' });
QuizOption.belongsTo(Quiz, { foreignKey: 'quizId' });
User.hasMany(QuizHistory, { foreignKey: 'userId' });
QuizHistory.belongsTo(User, { foreignKey: 'userId' });

// ==========================================
// DATA MENTAH (N5 FULL PACK)
// ==========================================

// 1. DATA HIRAGANA (46 Karakter Dasar)
const hiraganaData = [
    { c: 'あ', r: 'a', s: 3 }, { c: 'い', r: 'i', s: 2 }, { c: 'う', r: 'u', s: 2 }, { c: 'え', r: 'e', s: 2 }, { c: 'お', r: 'o', s: 3 },
    { c: 'か', r: 'ka', s: 3 }, { c: 'き', r: 'ki', s: 4 }, { c: 'く', r: 'ku', s: 1 }, { c: 'け', r: 'ke', s: 3 }, { c: 'こ', r: 'ko', s: 2 },
    { c: 'さ', r: 'sa', s: 3 }, { c: 'し', r: 'shi', s: 1 }, { c: 'す', r: 'su', s: 2 }, { c: 'せ', r: 'se', s: 3 }, { c: 'そ', r: 'so', s: 1 },
    { c: 'た', r: 'ta', s: 4 }, { c: 'ち', r: 'chi', s: 2 }, { c: 'つ', r: 'tsu', s: 1 }, { c: 'て', r: 'te', s: 1 }, { c: 'と', r: 'to', s: 2 },
    { c: 'な', r: 'na', s: 4 }, { c: 'に', r: 'ni', s: 3 }, { c: 'ぬ', r: 'nu', s: 2 }, { c: 'ね', r: 'ne', s: 2 }, { c: 'の', r: 'no', s: 1 },
    { c: 'は', r: 'ha', s: 3 }, { c: 'ひ', r: 'hi', s: 1 }, { c: 'ふ', r: 'fu', s: 4 }, { c: 'へ', r: 'he', s: 1 }, { c: 'ほ', r: 'ho', s: 4 },
    { c: 'ま', r: 'ma', s: 3 }, { c: 'み', r: 'mi', s: 2 }, { c: 'む', r: 'mu', s: 3 }, { c: 'め', r: 'me', s: 2 }, { c: 'も', r: 'mo', s: 3 },
    { c: 'や', r: 'ya', s: 3 }, { c: 'ゆ', r: 'yu', s: 2 }, { c: 'よ', r: 'yo', s: 2 },
    { c: 'ら', r: 'ra', s: 2 }, { c: 'り', r: 'ri', s: 2 }, { c: 'る', r: 'ru', s: 1 }, { c: 'れ', r: 're', s: 2 }, { c: 'ろ', r: 'ro', s: 1 },
    { c: 'わ', r: 'wa', s: 2 }, { c: 'を', r: 'wo', s: 3 }, { c: 'ん', r: 'n', s: 1 }
];

// 2. DATA KATAKANA (46 Karakter Dasar)
const katakanaData = [
    { c: 'ア', r: 'a', s: 2 }, { c: 'イ', r: 'i', s: 2 }, { c: 'ウ', r: 'u', s: 3 }, { c: 'エ', r: 'e', s: 3 }, { c: 'オ', r: 'o', s: 3 },
    { c: 'カ', r: 'ka', s: 2 }, { c: 'キ', r: 'ki', s: 3 }, { c: 'ク', r: 'ku', s: 2 }, { c: 'ケ', r: 'ke', s: 3 }, { c: 'コ', r: 'ko', s: 2 },
    { c: 'サ', r: 'sa', s: 3 }, { c: 'シ', r: 'shi', s: 3 }, { c: 'ス', r: 'su', s: 2 }, { c: 'セ', r: 'se', s: 2 }, { c: 'ソ', r: 'so', s: 2 },
    { c: 'タ', r: 'ta', s: 3 }, { c: 'チ', r: 'chi', s: 3 }, { c: 'ツ', r: 'tsu', s: 3 }, { c: 'テ', r: 'te', s: 3 }, { c: 'ト', r: 'to', s: 2 },
    { c: 'ナ', r: 'na', s: 2 }, { c: 'ニ', r: 'ni', s: 2 }, { c: 'ヌ', r: 'nu', s: 2 }, { c: 'ネ', r: 'ne', s: 4 }, { c: 'ノ', r: 'no', s: 1 },
    { c: 'ハ', r: 'ha', s: 2 }, { c: 'ヒ', r: 'hi', s: 2 }, { c: 'フ', r: 'fu', s: 1 }, { c: 'ヘ', r: 'he', s: 1 }, { c: 'ホ', r: 'ho', s: 4 },
    { c: 'マ', r: 'ma', s: 2 }, { c: 'ミ', r: 'mi', s: 3 }, { c: 'ム', r: 'mu', s: 2 }, { c: 'メ', r: 'me', s: 2 }, { c: 'モ', r: 'mo', s: 3 },
    { c: 'ヤ', r: 'ya', s: 2 }, { c: 'ユ', r: 'yu', s: 2 }, { c: 'ヨ', r: 'yo', s: 3 },
    { c: 'ラ', r: 'ra', s: 2 }, { c: 'リ', r: 'ri', s: 2 }, { c: 'ル', r: 'ru', s: 2 }, { c: 'レ', r: 're', s: 1 }, { c: 'ロ', r: 'ro', s: 3 },
    { c: 'ワ', r: 'wa', s: 2 }, { c: 'ヲ', r: 'wo', s: 3 }, { c: 'ン', r: 'n', s: 2 }
];

// 3. DATA KANJI N5 (Pilihan Populer)
const kanjiN5Data = [
    { char: '日', on: 'NICHI, JITSU', kun: 'hi, -ka', mean: 'Matahari, Hari', str: 4, rad: '日 (hi)', 
      ex: [{ s: '日曜日', r: 'Nichiyoubi', m: 'Hari Minggu' }, { s: '毎日', r: 'Mainichi', m: 'Setiap hari' }] },
    { char: '月', on: 'GETSU, GATSU', kun: 'tsuki', mean: 'Bulan', str: 4, rad: '月 (tsuki)', 
      ex: [{ s: '一月', r: 'Ichigatsu', m: 'Januari' }, { s: '月曜日', r: 'Getsuyoubi', m: 'Hari Senin' }] },
    { char: '火', on: 'KA', kun: 'hi', mean: 'Api', str: 4, rad: '火 (hi)', 
      ex: [{ s: '火曜日', r: 'Kayoubi', m: 'Hari Selasa' }, { s: '花火', r: 'Hanabi', m: 'Kembang api' }] },
    { char: '水', on: 'SUI', kun: 'mizu', mean: 'Air', str: 4, rad: '水 (mizu)', 
      ex: [{ s: '水曜日', r: 'Suiyoubi', m: 'Hari Rabu' }, { s: '水を飲む', r: 'Mizu o nomu', m: 'Minum air' }] },
    { char: '木', on: 'MOKU, BOKU', kun: 'ki', mean: 'Pohon', str: 4, rad: '木 (ki)', 
      ex: [{ s: '木曜日', r: 'Mokuyoubi', m: 'Hari Kamis' }] },
    { char: '金', on: 'KIN, KON', kun: 'kane', mean: 'Emas, Uang', str: 8, rad: '金 (kane)', 
      ex: [{ s: '金曜日', r: 'Kinyoubi', m: 'Hari Jumat' }, { s: 'お金', r: 'Okane', m: 'Uang' }] },
    { char: '土', on: 'DO, TO', kun: 'tsuchi', mean: 'Tanah', str: 3, rad: '土 (tsuchi)', 
      ex: [{ s: '土曜日', r: 'Doyoubi', m: 'Hari Sabtu' }] },
    { char: '山', on: 'SAN', kun: 'yama', mean: 'Gunung', str: 3, rad: '山 (yama)', 
      ex: [{ s: '富士山', r: 'Fujisan', m: 'Gunung Fuji' }, { s: '山登り', r: 'Yamanobori', m: 'Mendaki gunung' }] },
    { char: '川', on: 'SEN', kun: 'kawa', mean: 'Sungai', str: 3, rad: '川 (kawa)', 
      ex: [{ s: '川で泳ぐ', r: 'Kawa de oyogu', m: 'Berenang di sungai' }] },
    { char: '田', on: 'DEN', kun: 'ta', mean: 'Sawah', str: 5, rad: '田 (ta)', 
      ex: [{ s: '田中さん', r: 'Tanakasan', m: 'Saudara Tanaka' }] },
    { char: '人', on: 'JIN, NIN', kun: 'hito', mean: 'Orang', str: 2, rad: '人 (hito)', 
      ex: [{ s: '日本人', r: 'Nihonjin', m: 'Orang Jepang' }, { s: '三人', r: 'Sannin', m: 'Tiga orang' }] },
    { char: '口', on: 'KOU', kun: 'kuchi', mean: 'Mulut', str: 3, rad: '口 (kuchi)', 
      ex: [{ s: '入口', r: 'Iriguchi', m: 'Pintu masuk' }] },
    { char: '車', on: 'SHA', kun: 'kuruma', mean: 'Mobil', str: 7, rad: '車 (kuruma)', 
      ex: [{ s: '電車', r: 'Densha', m: 'Kereta' }] },
    { char: '門', on: 'MON', kun: 'kado', mean: 'Gerbang', str: 8, rad: '門 (mon)', 
      ex: [{ s: '専門', r: 'Senmon', m: 'Keahlian/Jurusan' }] },
    { char: '学', on: 'GAKU', kun: 'mana(bu)', mean: 'Belajar', str: 8, rad: '子 (ko)', 
      ex: [{ s: '学校', r: 'Gakkou', m: 'Sekolah' }, { s: '学生', r: 'Gakusei', m: 'Siswa' }] },
    { char: '生', on: 'SEI, SHOU', kun: 'i(kiru), u(mu)', mean: 'Hidup, Lahir', str: 5, rad: '生 (ikiru)', 
      ex: [{ s: '先生', r: 'Sensei', m: 'Guru' }, { s: '誕生日', r: 'Tanjoubi', m: 'Ulang tahun' }] },
    { char: '先', on: 'SEN', kun: 'saki', mean: 'Sebelum, Depan', str: 6, rad: '儿 (hitoashi)', 
      ex: [{ s: '先月', r: 'Sengetsu', m: 'Bulan lalu' }] },
    { char: '私', on: 'SHI', kun: 'watashi', mean: 'Saya', str: 7, rad: '禾 (nogihen)', 
      ex: [{ s: '私立大学', r: 'Shiritsu Daigaku', m: 'Universitas Swasta' }] },
    { char: '一', on: 'ICHI', kun: 'hito(tsu)', mean: 'Satu', str: 1, rad: '一 (ichi)', ex: [] },
    { char: '二', on: 'NI', kun: 'futa(tsu)', mean: 'Dua', str: 2, rad: '二 (ni)', ex: [] },
    { char: '三', on: 'SAN', kun: 'mit(tsu)', mean: 'Tiga', str: 3, rad: '一 (ichi)', ex: [] }
];

// 4. DATA VOCABULARY N5
const vocabN5Data = [
    // Salam
    { w: 'おはよう', r: 'Ohayou', m: 'Selamat pagi', t: 'Greeting' },
    { w: 'こんにちは', r: 'Konnichiwa', m: 'Selamat siang', t: 'Greeting' },
    { w: 'こんばんは', r: 'Konbanwa', m: 'Selamat malam', t: 'Greeting' },
    { w: 'ありがとう', r: 'Arigatou', m: 'Terima kasih', t: 'Greeting' },
    // Kata Kerja (Verb)
    { w: '食べる', r: 'Taberu', m: 'Makan', t: 'Verb', ex: 'ご飯を食べる' },
    { w: '飲む', r: 'Nomu', m: 'Minum', t: 'Verb', ex: '水を飲む' },
    { w: '行く', r: 'Iku', m: 'Pergi', t: 'Verb', ex: '学校へ行く' },
    { w: '来る', r: 'Kuru', m: 'Datang', t: 'Verb', ex: '日本へ来る' },
    { w: '見る', r: 'Miru', m: 'Melihat', t: 'Verb', ex: 'テレビを見る' },
    { w: '書く', r: 'Kaku', m: 'Menulis', t: 'Verb', ex: '手紙を書く' },
    { w: '聞く', r: 'Kiku', m: 'Mendengar', t: 'Verb', ex: '音楽を聞く' },
    { w: '読む', r: 'Yomu', m: 'Membaca', t: 'Verb', ex: '本を読む' },
    { w: '話す', r: 'Hanasu', m: 'Berbicara', t: 'Verb', ex: '日本語を話す' },
    { w: '買う', r: 'Kau', m: 'Membeli', t: 'Verb', ex: 'パンを買う' },
    // Kata Sifat (Adjective)
    { w: '大きい', r: 'Ookii', m: 'Besar', t: 'Adjective -i' },
    { w: '小さい', r: 'Chiisai', m: 'Kecil', t: 'Adjective -i' },
    { w: '高い', r: 'Takai', m: 'Mahal / Tinggi', t: 'Adjective -i' },
    { w: '安い', r: 'Yasui', m: 'Murah', t: 'Adjective -i' },
    { w: '新しい', r: 'Atarashii', m: 'Baru', t: 'Adjective -i' },
    { w: '古い', r: 'Furui', m: 'Lama / Tua', t: 'Adjective -i' },
    { w: '静か', r: 'Shizuka', m: 'Tenang', t: 'Adjective -na' },
    { w: '有名', r: 'Yuumei', m: 'Terkenal', t: 'Adjective -na' },
    { w: '好き', r: 'Suki', m: 'Suka', t: 'Adjective -na' },
    // Kata Benda (Noun)
    { w: '猫', r: 'Neko', m: 'Kucing', t: 'Noun' },
    { w: '犬', r: 'Inu', m: 'Anjing', t: 'Noun' },
    { w: '本', r: 'Hon', m: 'Buku', t: 'Noun' },
    { w: '学生', r: 'Gakusei', m: 'Siswa', t: 'Noun' },
    { w: '先生', r: 'Sensei', m: 'Guru', t: 'Noun' }
];

// ==========================================
// SEED SCRIPT
// ==========================================

const seedDatabase = async () => {
    try {
        console.log('🔄 Memulai Seeding N5 Full Pack...');
        
        // 1. Matikan Foreign Key Checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
        
        // 2. Reset Database
        await sequelize.sync({ force: true });
        console.log('🗑️  Database lama dihapus & tabel dibuat ulang.');

        // 3. Nyalakan kembali Foreign Key Checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });

        // ------------------------------------------
        // A. SEED USERS
        // ------------------------------------------
        const passwordHash = await bcrypt.hash('password123', 10);
        await User.bulkCreate([
            {
                username: 'admin',
                email: 'admin@hashinami.com',
                password: passwordHash,
                full_name: 'Admin Hashinami',
                role: 'ADMIN',
                xp: 9999,
                avatar: 'https://ui-avatars.com/api/?background=E53935&color=fff&name=Admin'
            },
            {
                username: 'user',
                email: 'user@gmail.com',
                password: passwordHash,
                full_name: 'Hashinami User',
                role: 'USER',
                xp: 150,
                avatar: 'https://ui-avatars.com/api/?background=random&name=User'
            }
        ]);
        console.log('✅ Users Created');

        // ------------------------------------------
        // B. SEED KANA (HIRAGANA & KATAKANA)
        // ------------------------------------------
        const kanaPayload = [
            ...hiraganaData.map(k => ({ character: k.c, romaji: k.r, type: 'HIRAGANA', strokes: k.s })),
            ...katakanaData.map(k => ({ character: k.c, romaji: k.r, type: 'KATAKANA', strokes: k.s }))
        ];
        // Gunakan loop create untuk keamanan karakter utf8mb4
        for (const k of kanaPayload) {
            await Kana.create(k);
        }
        console.log(`✅ ${kanaPayload.length} Kana Created`);

        // ------------------------------------------
        // C. SEED KANJI N5 (Looping)
        // ------------------------------------------
        for (const k of kanjiN5Data) {
            await Kanji.create({
                character: k.char,
                level: 'N5',
                onyomi: k.on,
                kunyomi: k.kun,
                meaning: k.mean,
                strokes: k.str,
                radical: k.rad,
                KanjiExamples: k.ex ? k.ex.map(e => ({
                    sentence: e.s,
                    reading: e.r,
                    meaning: e.m
                })) : []
            }, { include: [KanjiExample] });
        }
        console.log(`✅ ${kanjiN5Data.length} Kanji N5 Created`);

        // ------------------------------------------
        // D. SEED VOCABULARY
        // ------------------------------------------
        for (const v of vocabN5Data) {
            await Vocabulary.create({
                word: v.w,
                reading: v.r,
                meaning: v.m,
                level: 'N5',
                type: v.t,
                example_sentence: v.ex || null
            });
        }
        console.log(`✅ ${vocabN5Data.length} Vocabularies Created`);

        // ------------------------------------------
        // E. SEED MATERIALS
        // ------------------------------------------
        await Material.bulkCreate([
            {
                title: 'Fungsi Katakana',
                type: 'USAGE',
                level: 'N5',
                content: `1. Menulis kosakata dari bahasa asing (contoh: テレビ).\n2. Menulis nama orang/tempat asing.\n3. Menulis onomatopeia (bunyi).\n4. Penekanan kata.`
            },
            {
                title: 'Partikel WA (は)',
                type: 'GRAMMAR',
                level: 'N5',
                content: `Partikel "WA" (ditulis は) digunakan untuk menandakan TOPIC kalimat.\n\nContoh:\nwatashi wa gakusei desu (Saya adalah siswa).`
            },
            {
                title: 'Partikel WO (を)',
                type: 'GRAMMAR',
                level: 'N5',
                content: `Partikel "WO" (ditulis を) digunakan untuk menandakan OBJEK dari kata kerja.\n\nContoh:\nmizu o nomimasu (Minum air).`
            }
        ]);
        console.log('✅ Materials Created');

        // ------------------------------------------
        // F. SEED QUIZ
        // ------------------------------------------
        await Quiz.create({
            question: 'Apa arti dari kanji 木 ?',
            category: 'KANJI',
            level: 'N5',
            QuizOptions: [
                { option_text: 'Air', is_correct: false },
                { option_text: 'Api', is_correct: false },
                { option_text: 'Pohon', is_correct: true },
                { option_text: 'Uang', is_correct: false }
            ]
        }, { include: [QuizOption] });

        await Quiz.create({
            question: 'Manakah yang merupakan Hiragana untuk "shi"?',
            category: 'KANA',
            level: 'N5',
            QuizOptions: [
                { option_text: 'さ', is_correct: false },
                { option_text: 'し', is_correct: true },
                { option_text: 'す', is_correct: false },
                { option_text: 'せ', is_correct: false }
            ]
        }, { include: [QuizOption] });

        await Quiz.create({
            question: 'Bahasa Jepang dari "Kucing" adalah...',
            category: 'VOCAB',
            level: 'N5',
            QuizOptions: [
                { option_text: 'Inu', is_correct: false },
                { option_text: 'Neko', is_correct: true },
                { option_text: 'Tori', is_correct: false },
                { option_text: 'Uma', is_correct: false }
            ]
        }, { include: [QuizOption] });
        console.log('✅ Quizzes Created');

        console.log('🎉 SEEDING SELESAI! Database N5 Full Pack Siap.');
        process.exit(0);

    } catch (error) {
        console.error('❌ Gagal Seeding:', error);
        process.exit(1);
    }
};

seedDatabase();