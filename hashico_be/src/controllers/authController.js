const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const response = require('../utils/response');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });

        response(res, 201, "success", "User registered successfully", user);
    } catch (err) {
        response(res, 500, "error", err.message, null);
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) return response(res, 404, "error", "User not found", null);

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return response(res, 401, "error", "Invalid credentials", null);

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        response(res, 200, "success", "Login successful", { token });
    } catch (err) {
        response(res, 500, "error", err.message, null);
    }
};