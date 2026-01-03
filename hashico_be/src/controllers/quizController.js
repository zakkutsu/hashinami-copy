const quizService = require('../services/quizService');
const response = require('../utils/response');

// Input Soal Admin
exports.addQuiz = async (req, res) => {
    try {
        const newQuiz = await quizService.createQuiz(req.body);
        response(res, 201, "success", "Quiz created successfully", newQuiz);
    } catch (err) {
        response(res, 500, "error", err.message, null);
    }
};

// Ambil Soal untuk User Main
exports.getQuizGame = async (req, res) => {
    try {
        const { level, category, limit } = req.query;
        
        // Validasi wajib ada Level dan Kategori
        if (!level || !category) {
            return response(res, 400, "error", "Please provide level (N5-N1) and category", null);
        }

        const quizzes = await quizService.getRandomQuizzes(level, category, limit || 10);
        
        response(res, 200, "success", "Quiz game data retrieved", quizzes);
    } catch (err) {
        response(res, 500, "error", err.message, null);
    }
};