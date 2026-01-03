const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerUser = async (userData) => {
    // userData berisi: { username, password, email, full_name }
    
    // 1. Cek Username & Email
    const existingUser = await User.findOne({ 
        where: { username: userData.username } 
    });
    if (existingUser) throw new Error("Username already taken");

    if (userData.email) {
        const existingEmail = await User.findOne({ where: { email: userData.email } });
        if (existingEmail) throw new Error("Email already registered");
    }

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // 3. Simpan Lengkap
    const newUser = await User.create({
        username: userData.username,
        password: hashedPassword,
        email: userData.email || null,
        full_name: userData.full_name || null,
        xp: 0,
        role: 'USER' // Default user biasa
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