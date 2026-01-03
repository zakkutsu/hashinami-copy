const express = require('express');
const router = express.Router();
const { addKanji, addExampleOnly, getAllKanji } = require('../controllers/kanjiController');

router.post('/kanji', addKanji);
router.post('/kanji-example', addExampleOnly);
router.get('/kanji', getAllKanji);

module.exports = router;