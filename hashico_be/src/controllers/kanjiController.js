// src/controllers/kanjiController.js
const kanjiService = require('../services/kanjiService'); // Import Service
const response = require('../utils/response');

exports.addKanji = async (req, res) => {
    try {
        // Panggil Service (Koki), lempar req.body (Bahan)
        const newKanji = await kanjiService.createKanji(req.body);
        response(201, newKanji, "Data Kanji berhasil disimpan!", res);
    } catch (err) {
        response(500, null, "Gagal menambah Kanji: " + err.message, res);
    }
};

exports.addExampleOnly = async (req, res) => {
    try {
        const { kanjiId, ...exampleData } = req.body;
        
        // Panggil Service khusus nambah example
        const newExample = await kanjiService.addExampleToKanji(kanjiId, exampleData);
        response(201, newExample, "Contoh kalimat berhasil ditambahkan!", res);
    } catch (err) {
        // Jika error "Kanji tidak ditemukan" dilempar oleh Service, akan ketangkap di sini
        const statusCode = err.message.includes('tidak ditemukan') ? 404 : 500;
        response(statusCode, null, err.message, res);
    }
};

exports.getAllKanji = async (req, res) => {
    try {
        const data = await kanjiService.getAllKanjis();
        response(200, data, "Semua data Kanji", res);
    } catch (err) {
        response(500, null, err.message, res);
    }
};