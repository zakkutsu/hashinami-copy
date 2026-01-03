const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const kanjiRoutes = require('./kanjiRoutes');
const kanaRoutes = require('./kanaRoutes');

// 1. Jalur Auth
router.use('/auth', authRoutes);

// 2. Jalur Dictionary (Kamus)
router.use('/dictionary', kanjiRoutes); 
router.use('/dictionary', kanaRoutes);

module.exports = router;