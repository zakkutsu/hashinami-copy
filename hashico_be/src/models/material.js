const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Material = sequelize.define('Material', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('GRAMMAR', 'CULTURE', 'USAGE', 'TIPS'), 
        defaultValue: 'USAGE'
    },
    level: {
        type: DataTypes.ENUM('N5', 'N4', 'N3', 'N2', 'N1', 'GENERAL'),
        defaultValue: 'GENERAL'
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING, 
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Material;