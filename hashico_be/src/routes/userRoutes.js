const express = require('express');
const router = express.Router();
const { getMyProfile, updateProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Semua route di bawah ini butuh Login
router.use(authMiddleware);

// GET /api/v1/users/me (Lihat Profil Sendiri)
router.get('/me', getMyProfile);

// PUT /api/v1/users/me (Edit Profil)
router.put('/me', updateProfile);

module.exports = router;