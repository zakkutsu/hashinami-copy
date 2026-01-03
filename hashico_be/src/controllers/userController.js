// src/controllers/userController.js
const userService = require('../services/userService');
const response = require('../helpers/response');

exports.getMyProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const userProfile = await userService.getUserProfile(userId);
        response(res, 200, "success", "User profile retrieved", userProfile);
    } catch (err) {
        response(res, 500, "error", err.message, null);
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updatedUser = await userService.updateUser(userId, req.body);
        response(res, 200, "success", "Profile updated successfully", updatedUser);
    } catch (err) {
        response(res, 500, "error", err.message, null);
    }
};

// Pastikan fungsi ini ADA dan diexport!
exports.getTopUsers = async (req, res) => {
    try {
        const leaderboard = await userService.getLeaderboard();
        response(res, 200, "success", "Leaderboard retrieved", leaderboard);
    } catch (err) {
        response(res, 500, "error", err.message, null);
    }
};