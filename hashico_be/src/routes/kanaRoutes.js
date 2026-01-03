const express = require('express');
const router = express.Router();
const { addKana, getAllKana } = require('../controllers/kanaController');

// URL akhir akan jadi: /api/v1/dictionary/kana...
router.post('/kana', addKana);
router.get('/kana', getAllKana);

module.exports = router;