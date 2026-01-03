const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const response = require('../utils/response');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });
        response(201, user, "User berhasil didaftarkan", res);
    } catch (err) {
        response(500, null, err.message, res);
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) return response(404, null, "User tidak ditemukan", res);

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return response(401, null, "Password salah", res);

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        response(200, { token }, "Login berhasil", res);
    } catch (err) {
        response(500, null, err.message, res);
    }
};
