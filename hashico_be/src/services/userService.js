const User = require('../models/user');
const QuizHistory = require('../models/quizHistory');

exports.getUserProfile = async (userId) => {
    // Ambil data user beserta riwayat kuisnya
    const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }, // Jangan kirim password ke frontend!
        include: [{
            model: QuizHistory,
            limit: 5, // Tampilkan 5 riwayat kuis terakhir
            order: [['createdAt', 'DESC']]
        }]
    });

    if (!user) throw new Error("User not found");
    return user;
};

exports.updateUser = async (userId, data) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");

    // Update field jika dikirim oleh user
    if (data.username) user.username = data.username;
    if (data.full_name) user.full_name = data.full_name;
    if (data.email) user.email = data.email;
    if (data.avatar) user.avatar = data.avatar;
    
    await user.save();
    return user;
};