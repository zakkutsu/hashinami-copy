const express = require('express');
const router = express.Router();
const { addQuiz, getQuizGame, submitQuizResult } = require('../controllers/quizController');
const authMiddleware = require('../middlewares/authMiddleware');

// URL: POST /api/v1/learning/quiz (Admin Input Soal)
router.post('/', addQuiz);

// URL: GET /api/v1/learning/quiz/play?level=N5&category=KANJI (User Main)
router.get('/play', getQuizGame);

// User Simpan Skor
router.post('/submit', authMiddleware, submitQuizResult);

module.exports = router;