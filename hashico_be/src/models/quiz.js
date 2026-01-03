const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Quiz = sequelize.define('Quiz', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    question: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    category: {
        type: DataTypes.ENUM('KANJI', 'KANA', 'VOCAB', 'GRAMMAR'),
        allowNull: false
    },
    level: {
        type: DataTypes.ENUM('N5', 'N4', 'N3', 'N2', 'N1'),
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Quiz;