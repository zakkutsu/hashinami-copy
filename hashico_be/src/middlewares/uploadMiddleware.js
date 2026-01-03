// src/middlewares/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// 1. Tentukan lokasi simpan
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Pastikan folder ini nanti dibuat manual
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        // Format nama file: timestamp-namadepan.jpg
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// 2. Filter file (Hanya Gambar)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Hanya boleh upload file gambar!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 } // Maksimal 2MB
});

module.exports = upload;