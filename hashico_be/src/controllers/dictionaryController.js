const Kanji = require('../models/kanji');
const KanjiExample = require('../models/kanjiExample');
const Kana = require('../models/kana');
const response = require('../utils/response');

// --- BAGIAN KANJI ---

// 1. OPSI A & B: Input Kanji Saja ATAU Kanji + Contoh Sekaligus
exports.addKanji = async (req, res) => {
    try {
        // Ambil data dari Body
        const { character, level, onyomi, kunyomi, meaning, strokes, radical, examples } = req.body;

        // Cek apakah 'examples' ada isinya?
        // Jika user tidak mengirim 'examples', maka otomatis cuma simpan Kanji saja.
        const includeOptions = (examples && examples.length > 0) ? [KanjiExample] : [];

        const newKanji = await Kanji.create({
            character, level, onyomi, kunyomi, meaning, strokes, radical,
            KanjiExamples: examples // Jika kosong, Sequelize akan mengabaikannya
        }, {
            include: includeOptions
        });

        response(201, newKanji, "Data Kanji berhasil disimpan!", res);
    } catch (err) {
        response(500, null, "Gagal menambah Kanji: " + err.message, res);
    }
};

// 2. OPSI C: Input Contoh Kalimat Saja (Untuk Kanji yang sudah ada)
exports.addExampleOnly = async (req, res) => {
    try {
        const { kanjiId, sentence, reading, meaning } = req.body;

        // Cek dulu apakah Kanjinya ada?
        const checkKanji = await Kanji.findByPk(kanjiId);
        if (!checkKanji) {
            return response(404, null, `Kanji dengan ID ${kanjiId} tidak ditemukan!`, res);
        }

        // Buat contoh kalimat baru yang nempel ke Kanji tersebut
        const newExample = await KanjiExample.create({
            kanjiId, // Penting: Ini kuncinya agar terhubung
            sentence,
            reading,
            meaning
        });

        response(201, newExample, "Contoh kalimat berhasil ditambahkan ke Kanji!", res);
    } catch (err) {
        response(500, null, "Gagal menambah contoh: " + err.message, res);
    }
};

// --- BAGIAN KANA & GET DATA (Sama seperti sebelumnya) ---

exports.addKana = async (req, res) => {
    try {
        const { character, romaji, type, strokes } = req.body;
        const newKana = await Kana.create({ character, romaji, type, strokes });
        response(201, newKana, `Data ${type} berhasil ditambahkan!`, res);
    } catch (err) {
        response(500, null, err.message, res);
    }
};

exports.getAllKanji = async (req, res) => {
    try {
        const data = await Kanji.findAll({
            include: [KanjiExample] // Agar contoh kalimatnya ikut terambil
        });
        response(200, data, "Semua data Kanji", res);
    } catch (err) {
        response(500, null, err.message, res);
    }
};