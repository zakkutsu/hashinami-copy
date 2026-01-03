const Kanji = require('../models/kanji');
const KanjiExample = require('../models/kanjiExample');

exports.createKanji = async (data) => {
    const includeOptions = (data.examples && data.examples.length > 0) ? [KanjiExample] : [];

    return await Kanji.create({
        ...data,         
        KanjiExamples: data.examples 
    }, {
        include: includeOptions
    });
};

exports.addExampleToKanji = async (kanjiId, exampleData) => {
    const checkKanji = await Kanji.findByPk(kanjiId);
    if (!checkKanji) {
        throw new Error(`Kanji dengan ID ${kanjiId} tidak ditemukan!`);
    }

    // Buat contoh baru
    return await KanjiExample.create({
        kanjiId, 
        ...exampleData
    });
};

exports.getAllKanjis = async (page, limit) => {
    const offset = (page - 1) * limit; 

    return await Kanji.findAndCountAll({
        include: [KanjiExample],
        limit: limit,   
        offset: offset, 
        distinct: true  
    });
};