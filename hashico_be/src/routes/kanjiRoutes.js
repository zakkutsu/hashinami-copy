const express = require('express');
const router = express.Router();
const { addKanji, addExampleOnly, getAllKanji } = require('../controllers/kanjiController');

// URL akhir akan jadi: /api/v1/dictionary/kanji...
router.post('/kanji', addKanji);
router.post('/kanji-example', addExampleOnly);
router.get('/kanji', getAllKanji);

module.exports = router;