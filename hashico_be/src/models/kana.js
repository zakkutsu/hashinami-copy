const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Kana = sequelize.define('Kana', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    character: {
        type: DataTypes.STRING(5), 
        allowNull: false,
        unique: true
    },
    romaji: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('HIRAGANA', 'KATAKANA'), // Pembeda jenis
        allowNull: false
    },
    strokes: {
        type: DataTypes.INTEGER, 
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Kana;