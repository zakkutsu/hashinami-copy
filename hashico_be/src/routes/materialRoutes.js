const express = require('express');
const router = express.Router();
const { addMaterial, getMaterials, getMaterialDetail } = require('../controllers/materialController');

router.post('/', addMaterial);       
router.get('/', getMaterials);   
router.get('/:id', getMaterialDetail); 

module.exports = router;