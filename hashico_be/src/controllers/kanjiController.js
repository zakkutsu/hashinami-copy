const Kanji = require('../models/kanji');
const KanjiExample = require('../models/kanjiExample');
const response = require('../utils/response');

// 1. Input Kanji (Bisa + Contoh)
exports.addKanji = async (req, res) => {
    try {
        const { character, level, onyomi, kunyomi, meaning, strokes, radical, examples } = req.body;
        
        const includeOptions = (examples && examples.length > 0) ? [KanjiExample] : [];

        const newKanji = await Kanji.create({
            character, level, onyomi, kunyomi, meaning, strokes, radical,
            KanjiExamples: examples 
        }, {
            include: includeOptions
        });

        response(201, newKanji, "Data Kanji berhasil disimpan!", res);
    } catch (err) {
        response(500, null, "Gagal menambah Kanji: " + err.message, res);
    }
};

// 2. Input Contoh Saja (Susulan)
exports.addExampleOnly = async (req, res) => {
    try {
        const { kanjiId, sentence, reading, meaning } = req.body;

        const checkKanji = await Kanji.findByPk(kanjiId);
        if (!checkKanji) {
            return response(404, null, `Kanji ID ${kanjiId} tidak ditemukan!`, res);
        }

        const newExample = await KanjiExample.create({
            kanjiId, sentence, reading, meaning
        });

        response(201, newExample, "Contoh kalimat berhasil ditambahkan!", res);
    } catch (err) {
        response(500, null, "Gagal menambah contoh: " + err.message, res);
    }
};

// 3. Ambil Semua Kanji
exports.getAllKanji = async (req, res) => {
    try {
        const data = await Kanji.findAll({
            include: [KanjiExample]
        });
        response(200, data, "Semua data Kanji", res);
    } catch (err) {
        response(500, null, err.message, res);
    }
};