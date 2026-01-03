const Quiz = require('../models/quiz');
const QuizOption = require('../models/quizOption');
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