const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Quiz = require('./quiz');

const QuizOption = sequelize.define('QuizOption', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quizId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Quiz,
            key: 'id'
        }
    },
    option_text: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    is_correct: {
        type: DataTypes.BOOLEAN, 
        defaultValue: false
    }
}, {
    timestamps: true
});

module.exports = QuizOption;