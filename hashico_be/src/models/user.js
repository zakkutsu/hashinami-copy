const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: true // Boleh kosong dulu saat register
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true, // Sebaiknya false, tapi kita buat true dulu agar data lama tidak error
        unique: true,
        validate: {
            isEmail: true // Validasi format email otomatis
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        // Gambar default jika user belum upload foto
        defaultValue: 'https://ui-avatars.com/api/?background=random&name=User' 
    },
    role: {
        type: DataTypes.ENUM('USER', 'ADMIN'),
        defaultValue: 'USER' // Default semua orang adalah User biasa
    },
    xp: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: true
});

module.exports = User;