const Kana = require('../models/kana');
const response = require('../utils/response');

// 1. Input Kana
exports.addKana = async (req, res) => {
    try {
        const { character, romaji, type, strokes } = req.body;
        const newKana = await Kana.create({ character, romaji, type, strokes });
        response(201, newKana, `Data ${type} berhasil ditambahkan!`, res);
    } catch (err) {
        response(500, null, err.message, res);
    }
};

// 2. Ambil Semua Kana (Bonus: Biar bisa dicek nanti)
exports.getAllKana = async (req, res) => {
    try {
        const data = await Kana.findAll();
        response(200, data, "Semua data Kana", res);
    } catch (err) {
        response(500, null, err.message, res);
    }
};