// src/services/kanjiService.js
const Kanji = require('../models/kanji');
const KanjiExample = require('../models/kanjiExample');

// Service 1: Buat Kanji Baru (plus contoh jika ada)
exports.createKanji = async (data) => {
    // Logika "include" dipindah ke sini
    const includeOptions = (data.examples && data.examples.length > 0) ? [KanjiExample] : [];

    // Langsung return hasil dari database
    return await Kanji.create({
        ...data,                 // Copy semua field (character, level, dll)
        KanjiExamples: data.examples 
    }, {
        include: includeOptions
    });
};

// Service 2: Tambah Contoh Kalimat Saja
exports.addExampleToKanji = async (kanjiId, exampleData) => {
    // Cek dulu apakah Kanjinya ada (Validasi Bisnis)
    const checkKanji = await Kanji.findByPk(kanjiId);
    if (!checkKanji) {
        throw new Error(`Kanji dengan ID ${kanjiId} tidak ditemukan!`);
    }

    // Buat contoh baru
    return await KanjiExample.create({
        kanjiId, 
        ...exampleData
    });
};

// Service 3: Ambil Semua Data
exports.getAllKanjis = async () => {
    return await Kanji.findAll({
        include: [KanjiExample]
    });
};