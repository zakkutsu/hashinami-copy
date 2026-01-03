const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Kanji = sequelize.define('Kanji', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    character: {
        type: DataTypes.STRING(5), // Cukup untuk 1 karakter kanji
        allowNull: false,
        unique: true
    },
    level: {
        type: DataTypes.ENUM('N5', 'N4', 'N3', 'N2', 'N1'), // Dropdown level
        allowNull: false
    },
    onyomi: {
        type: DataTypes.STRING, // Contoh: "ICHI, ITSU"
        allowNull: true
    },
    kunyomi: {
        type: DataTypes.STRING, // Contoh: "hito(tsu)"
        allowNull: true
    },
    meaning: {
        type: DataTypes.STRING, // Arti bahasa Indonesia
        allowNull: false
    },
    strokes: {
        type: DataTypes.INTEGER, // Jumlah goresan (misal: 12)
        allowNull: true
    },
    radical: {
        type: DataTypes.STRING, // Radikal kanji
        allowNull: true
    },
    stroke_video: {
        type: DataTypes.STRING, // URL video tutorial (untuk fitur masa depan)
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Kanji;