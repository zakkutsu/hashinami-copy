const express = require('express');
const router = express.Router();
const { addKanji, addKana, getAllKanji, addExampleOnly } = require('../controllers/dictionaryController');

// Route Kanji Utama (Bisa Kanji saja atau Kanji+Example)
router.post('/kanji', addKanji);

// Route KHUSUS nambah contoh kalimat saja
router.post('/kanji-example', addExampleOnly); // <--- INI ROUTE BARU

// Route Kana & Get All
router.post('/kana', addKana);
router.get('/kanji', getAllKanji);

module.exports = router;