const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const kanjiRoutes = require('./kanjiRoutes');
const kanaRoutes = require('./kanaRoutes');
const materialRoutes = require('./materialRoutes');
const quizRoutes = require('./quizRoutes');
const vocabRoutes = require('./vocabRoutes'); 

// 1. Jalur Auth
router.use('/auth', authRoutes);

// 2. Jalur Dictionary (Kamus)
router.use('/dictionary', kanjiRoutes); 
router.use('/dictionary', kanaRoutes);
router.use('/dictionary/vocab', vocabRoutes);

// 3. Jalur Learning
router.use('/learning/materials', materialRoutes);
router.use('/learning/materials', materialRoutes);
router.use('/learning/quiz', quizRoutes);

module.exports = router;