const vocabService = require('../services/vocabService');
const response = require('../utils/response');

exports.addVocab = async (req, res) => {
    try {
        const newVocab = await vocabService.createVocab(req.body);
        response(res, 201, "success", "Vocabulary added successfully", newVocab);
    } catch (err) {
        response(res, 500, "error", err.message, null);
    }
};

exports.getVocabs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { level, type } = req.query; // Ambil filter dari URL

        const { count, rows } = await vocabService.getAllVocabs(page, limit, level, type);

        // Metadata Pagination
        const pagination = {
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalRows: count,
            limit: limit,
            hasNextPage: page < Math.ceil(count / limit),
            hasPrevPage: page > 1,
            startIndex: (page - 1) * limit + 1,
            endIndex: Math.min(page * limit, count),
            showing: count === 0 ? "0 items" : `${(page - 1) * limit + 1}-${Math.min(page * limit, count)} of ${count} items`
        };

        response(res, 200, "success", "Vocabularies retrieved", rows, pagination);
    } catch (err) {
        response(res, 500, "error", err.message, null);
    }
};