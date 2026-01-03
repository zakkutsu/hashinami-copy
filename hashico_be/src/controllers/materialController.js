const materialService = require('../services/materialService');
const response = require('../helpers/response');

exports.addMaterial = async (req, res) => {
    try {
        const newMaterial = await materialService.createMaterial(req.body);
        response(res, 201, "success", "Learning material created", newMaterial);
    } catch (err) {
        response(res, 500, "error", err.message, null);
    }
};

exports.getMaterials = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const type = req.query.type; // Bisa filter by type (?type=USAGE)

        const { count, rows } = await materialService.getAllMaterials(page, limit, type);

        const pagination = {
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalRows: count,
            limit: limit
        };

        response(res, 200, "success", "Materials retrieved", rows, pagination);
    } catch (err) {
        response(res, 500, "error", err.message, null);
    }
};

exports.getMaterialDetail = async (req, res) => {
    try {
        const material = await materialService.getMaterialById(req.params.id);
        if (!material) return response(res, 404, "error", "Material not found", null);
        
        response(res, 200, "success", "Material detail retrieved", material);
    } catch (err) {
        response(res, 500, "error", err.message, null);
    }
};