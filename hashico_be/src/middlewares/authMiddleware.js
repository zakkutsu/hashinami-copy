const jwt = require('jsonwebtoken');
const response = require('../helpers/response'); // Import util response
require('dotenv').config();

module.exports = (req, res, next) => {
    // Ambil header Authorization: "Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Ambil tokennya saja

    if (!token) {
        // Gunakan format response standar
        return response(res, 401, "error", "Access denied. No token provided.", null);
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Masukkan data user ke request
        next(); // Lanjut ke controller
    } catch (err) {
        return response(res, 403, "error", "Invalid or expired token.", null);
    }
};