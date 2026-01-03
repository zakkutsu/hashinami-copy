const kanaService = require('../services/kanaService');
const response = require('../helpers/response');

exports.addKana = async (req, res) => {
    try {
        const newKana = await kanaService.createKana(req.body);
        response(res, 201, "success", `Data ${newKana.type} added successfully`, newKana);
    } catch (err) {
        response(res, 500, "error", err.message, null);
    }
};

exports.getAllKana = async (req, res) => {
    try {
        const data = await kanaService.getAllKanas();
        response(res, 200, "success", "All Kana retrieved successfully", data);
        
    } catch (err) {
        response(res, 500, "error", err.message, null);
    }
};