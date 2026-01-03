const authService = require('../services/authService');
const response = require('../utils/response');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validasi sederhana
        if (!username || !password) {
            return response(res, 400, "error", "Username and password are required", null);
        }

        const newUser = await authService.registerUser(username, password);
        
        response(res, 201, "success", "User registered successfully", newUser);
    } catch (err) {
        // Cek error message untuk menentukan status code
        const statusCode = err.message === "Username already taken" ? 409 : 500;
        response(res, statusCode, "error", err.message, null);
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const result = await authService.loginUser(username, password);

        response(res, 200, "success", "Login successful", result);
    } catch (err) {
        // Error login biasanya 401 (Unauthorized) atau 404 (Not Found)
        const statusCode = (err.message === "User not found" || err.message === "Invalid password") ? 401 : 500;
        response(res, statusCode, "error", "Authentication failed: " + err.message, null);
    }
};