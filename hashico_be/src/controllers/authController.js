const authService = require('../services/authService');
const response = require('../helpers/response');

exports.register = async (req, res) => {
    try {
        // Ambil semua data dari body
        const { username, password, email, full_name } = req.body;

        if (!username || !password) {
            return response(res, 400, "error", "Username and password are required", null);
        }

        // Kirim object lengkap ke Service
        const newUser = await authService.registerUser({ username, password, email, full_name });
        
        response(res, 201, "success", "User registered successfully", newUser);
    } catch (err) {
        // ... (error handling sama)
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