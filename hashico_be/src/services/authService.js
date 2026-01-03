const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerUser = async (username, password) => {
    // 1. Cek apakah username sudah ada?
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
        throw new Error("Username already taken");
    }

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Simpan ke DB
    const newUser = await User.create({
        username,
        password: hashedPassword,
        xp: 0 // Default XP 0
    });

    return newUser;
};

exports.loginUser = async (username, password) => {
    // 1. Cari User
    const user = await User.findOne({ where: { username } });
    if (!user) {
        throw new Error("User not found");
    }

    // 2. Cek Password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error("Invalid password");
    }

    // 3. Buat Token JWT
    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '7d' } // Token berlaku 7 hari
    );

    // Kembalikan data user (tanpa password) dan token
    return {
        user: {
            id: user.id,
            username: user.username,
            xp: user.xp,
            createdAt: user.createdAt
        },
        token
    };
};