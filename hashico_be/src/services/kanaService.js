const Kana = require('../models/kana');

exports.createKana = async (data) => {
    return await Kana.create(data);
};

exports.getAllKanas = async () => {
    return await Kana.findAll();
};