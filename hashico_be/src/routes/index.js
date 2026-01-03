const express = require('express');
const authRoutes = require('./authRoutes');
const dictionaryRoutes = require('./dictionaryRoutes'); // <--- Import ini

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/dictionary', dictionaryRoutes); // <--- Tambahkan prefix ini

module.exports = router;