const express = require('express');
const router = express.Router();
const { getAllDepartments} = require('../controllers/department.controller');

router.get('/getAllDepartments',getAllDepartments);

module.exports = router;
