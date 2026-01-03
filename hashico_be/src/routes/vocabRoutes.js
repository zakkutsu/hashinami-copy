const express = require('express');
const router = express.Router();
const { addVocab, getVocabs } = require('../controllers/vocabController');

// URL: POST /api/v1/dictionary/vocab
router.post('/', addVocab);

// URL: GET /api/v1/dictionary/vocab?level=N5&type=Verb
router.get('/', getVocabs);

module.exports = router;