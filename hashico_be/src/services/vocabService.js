const Vocabulary = require('../models/vocabulary');

exports.createVocab = async (data) => {
    return await Vocabulary.create(data);
};

exports.getAllVocabs = async (page, limit, level, type) => {
    const offset = (page - 1) * limit;

    // Filter dinamis (Hanya filter jika user mengirim parameter)
    const whereClause = {};
    if (level) whereClause.level = level;
    if (type) whereClause.type = type;

    return await Vocabulary.findAndCountAll({
        where: whereClause,
        limit: limit,
        offset: offset,
        order: [['createdAt', 'DESC']] // Data terbaru paling atas
    });
};