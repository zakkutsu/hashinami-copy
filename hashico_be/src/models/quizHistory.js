const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const QuizHistory = sequelize.define('QuizHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    category: {
        type: DataTypes.STRING, // KANJI, KANA, etc
        allowNull: false
    },
    level: {
        type: DataTypes.STRING, // N5, N4...
        allowNull: false
    },
    total_questions: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    correct_answers: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER, // Nilai 0-100
        allowNull: false
    },
    xp_earned: {
        type: DataTypes.INTEGER, // XP yang didapat
        defaultValue: 0
    }
}, {
    timestamps: true
});

module.exports = QuizHistory;