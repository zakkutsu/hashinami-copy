// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const userService = require('../services/userService');

// Import semua controller sekaligus di sini
const { 
    getMyProfile, 
    updateProfile, 
    getTopUsers 
} = require('../controllers/userController'); 

// Middleware Auth dipasang untuk semua route di bawah ini
router.use(authMiddleware);

// Routes
router.get('/me', getMyProfile);
router.put('/me', updateProfile);

// Route Leaderboard (Penyebab error tadi ada di sini)
router.get('/leaderboard', getTopUsers);

// Route Upload Avatar
router.post('/upload-avatar', upload.single('avatar'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                meta: { code: 400, status: "error", message: "No file uploaded" }, 
                data: null 
            });
        }

        const filePath = `/uploads/${req.file.filename}`;
        await userService.updateUser(req.user.id, { avatar: filePath });

        res.json({ 
            meta: { code: 200, status: "success", message: "Avatar updated" }, 
            data: { avatar_url: fileUrl } 
        });
    } catch (err) {
        res.status(500).json({ 
            meta: { code: 500, status: "error", message: err.message }, 
            data: null 
        });
    }
});

module.exports = router;