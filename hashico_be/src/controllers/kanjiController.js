const kanjiService = require('../services/kanjiService');
const response = require('../helpers/response');

exports.addKanji = async (req, res) => {
    try {
        const newKanji = await kanjiService.createKanji(req.body);
        response(res, 201, "success", "Kanji created successfully", newKanji);
    } catch (err) {
        response(res, 500, "error", "Failed to create Kanji: " + err.message, null);
    }
};

exports.addExampleOnly = async (req, res) => {
    try {
        const { kanjiId, ...exampleData } = req.body;
        const newExample = await kanjiService.addExampleToKanji(kanjiId, exampleData);
        response(res, 201, "success", "Example added successfully", newExample);
    } catch (err) {
        const statusCode = err.message.includes('tidak ditemukan') ? 404 : 500;
        response(res, statusCode, "error", err.message, null);
    }
};

exports.getAllKanji = async (req, res) => {
    try {
        // 1. Ambil Query Params (Default: page 1, limit 10)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // 2. Panggil Service
        const { count, rows } = await kanjiService.getAllKanjis(page, limit);

        // 3. Hitung Metadata Pagination
        const totalPages = Math.ceil(count / limit);
        const startIndex = (page - 1) * limit + 1;
        const endIndex = Math.min(page * limit, count); // Agar tidak melebihi total
        
        // Cek data kosong untuk index
        const showingText = count === 0 
            ? "0 items" 
            : `${startIndex}-${endIndex} of ${count} items`;

        const pagination = {
            currentPage: page,
            totalPages: totalPages,
            totalRows: count,
            limit: limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
            startIndex: count === 0 ? 0 : startIndex,
            endIndex: endIndex,
            showing: showingText
        };

        // 4. Kirim Response dengan Format Baru
        response(res, 200, "success", "Kanji data retrieved successfully", rows, pagination);

    } catch (err) {
        response(res, 500, "error", err.message, null);
    }
};