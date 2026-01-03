const Quiz = require('../models/quiz');
const QuizOption = require('../models/quizOption');
const QuizHistory = require('../models/quizHistory');
const User = require('../models/user');
const sequelize = require('../config/database');

// 1. Buat Soal Baru (Beserta 4 Opsinya)
exports.createQuiz = async (data) => {
    // data.options harus array berisi 4 objek jawaban
    return await Quiz.create({
        question: data.question,
        image_url: data.image_url,
        category: data.category,
        level: data.level,
        QuizOptions: data.options // Sequelize otomatis simpan ke tabel Option
    }, {
        include: [QuizOption]
    });
};

// 2. Ambil Soal Random (Untuk Gameplay)
exports.getRandomQuizzes = async (level, category, limit = 10) => {
    return await Quiz.findAll({
        where: { 
            level: level, 
            category: category 
        },
        include: [{
            model: QuizOption,
            attributes: ['id', 'option_text', 'is_correct'] // Ambil text dan status benar/salah
        }],
        order: sequelize.random(),
        limit: parseInt(limit)
    });
};

exports.submitScore = async (userId, data) => {
    // data: { category, level, total_questions, correct_answers }
    
    // 1. Hitung Skor (0-100)
    const score = Math.round((data.correct_answers / data.total_questions) * 100);
    
    // 2. Hitung XP (Rumus: Skor / 10. Misal dapat 80 -> 8 XP. Kalau 100 -> 10 XP)
    const xpEarned = Math.floor(score / 10);

    // 3. Simpan ke History (Rapor)
    const history = await QuizHistory.create({
        userId,
        category: data.category,
        level: data.level,
        total_questions: data.total_questions,
        correct_answers: data.correct_answers,
        score: score,
        xp_earned: xpEarned
    });

    // 4. Update Total XP User (Gamifikasi)
    const user = await User.findByPk(userId);
    if (user) {
        user.xp += xpEarned;
        await user.save();
    }

    return { history, total_xp: user.xp };
};