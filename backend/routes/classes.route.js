const express = require('express');
const router = express.Router();
const { getAllClasses} = require('../controllers/class.controller');

router.get('/getAllClasses',getAllClasses);

module.exports = router;
