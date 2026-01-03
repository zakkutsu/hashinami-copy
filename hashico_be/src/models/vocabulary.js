const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vocabulary = sequelize.define('Vocabulary', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    word: {
        type: DataTypes.STRING, // Contoh: "食べる" (Taberu)
        allowNull: false
    },
    reading: {
        type: DataTypes.STRING, // Contoh: "Taberu" atau "たべる"
        allowNull: false
    },
    meaning: {
        type: DataTypes.STRING, // Contoh: "Makan"
        allowNull: false
    },
    level: {
        type: DataTypes.ENUM('N5', 'N4', 'N3', 'N2', 'N1'),
        allowNull: false
    },
    type: {
        // Jenis kata: Kata Kerja (Verb), Kata Benda (Noun), Sifat (Adj)
        type: DataTypes.STRING, 
        defaultValue: 'Noun'
    },
    example_sentence: {
        type: DataTypes.TEXT, // Opsional: Contoh kalimat pendek
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Vocabulary;