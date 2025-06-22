const express = require('express');
const router = express.Router();
const { getAllClasses, getClassesByDepartment} = require('../controllers/class.controller');

router.get('/getAllClasses',getAllClasses);
router.get('/byDept/:deptId', getClassesByDepartment);

module.exports = router;
