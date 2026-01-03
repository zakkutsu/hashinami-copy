const Material = require('../models/material');

exports.createMaterial = async (data) => {
    return await Material.create(data);
};

exports.getAllMaterials = async (page, limit, type) => {
    const offset = (page - 1) * limit;
    
    const whereClause = type ? { type: type } : {};

    return await Material.findAndCountAll({
        where: whereClause,
        limit: limit,
        offset: offset
    });
};

exports.getMaterialById = async (id) => {
    return await Material.findByPk(id);
};