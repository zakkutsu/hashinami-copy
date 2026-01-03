// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getMyProfile, updateProfile } = require('../controllers/userController');
const { getTopUsers } = require('../controllers/userController'); // Pastikan ini terimport
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const userService = require('../services/userService'); 

router.use(authMiddleware);

// Routes lama
router.get('/me', getMyProfile);
router.put('/me', updateProfile);
router.get('/leaderboard', getTopUsers);

// --- ROUTE BARU: UPLOAD AVATAR ---
router.post('/upload-avatar', upload.single('avatar'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                meta: { code: 400, status: "error", message: "No file uploaded" }, 
                data: null 
            });
        }

        // Buat URL agar bisa diakses browser/flutter
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        
        // Simpan URL ke database
        await userService.updateUser(req.user.id, { avatar: fileUrl });

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