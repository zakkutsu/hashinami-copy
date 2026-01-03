const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Kanji = sequelize.define('Kanji', {
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
    level: {
        type: DataTypes.ENUM('N5', 'N4', 'N3', 'N2', 'N1'), 
        allowNull: false
    },
    onyomi: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    kunyomi: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    meaning: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    strokes: {
        type: DataTypes.INTEGER, 
        allowNull: true
    },
    radical: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    stroke_video: {
        type: DataTypes.STRING, 
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Kanji;