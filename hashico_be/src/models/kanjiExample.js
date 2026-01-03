const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Kanji = require('./kanji');

const KanjiExample = sequelize.define('KanjiExample', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    kanjiId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Kanji,
            key: 'id'
        }
    },
    sentence: {
        type: DataTypes.TEXT, 
        allowNull: false
    },
    reading: {
        type: DataTypes.TEXT, 
        allowNull: false
    },
    meaning: {
        type: DataTypes.TEXT, 
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = KanjiExample;