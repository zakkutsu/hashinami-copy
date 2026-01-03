const express = require('express');
const router = express.Router();
const { addKana, getAllKana } = require('../controllers/kanaController');

router.post('/kana', addKana);
router.get('/kana', getAllKana);

module.exports = router;