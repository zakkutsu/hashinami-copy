// src/controllers/kanaController.js
const kanaService = require('../services/kanaService');
const response = require('../utils/response');

exports.addKana = async (req, res) => {
    try {
        const newKana = await kanaService.createKana(req.body);
        response(201, newKana, `Data ${newKana.type} berhasil ditambahkan!`, res);
    } catch (err) {
        response(500, null, err.message, res);
    }
};

exports.getAllKana = async (req, res) => {
    try {
        const data = await kanaService.getAllKanas();
        response(200, data, "Semua data Kana", res);
    } catch (err) {
        response(500, null, err.message, res);
    }
};