const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Kanji = require('./kanji'); // Kita butuh ini untuk relasi

const KanjiExample = sequelize.define('KanjiExample', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Foreign Key (ID Kanji pemilik kalimat ini)
    kanjiId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Kanji,
            key: 'id'
        }
    },
    sentence: {
        type: DataTypes.TEXT, // Kalimat Jepang: 彼は日本に行きました
        allowNull: false
    },
    reading: {
        type: DataTypes.TEXT, // Cara baca: Kare wa nihon ni ikimashita
        allowNull: false
    },
    meaning: {
        type: DataTypes.TEXT, // Arti: Dia pergi ke Jepang
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = KanjiExample;