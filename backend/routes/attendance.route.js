const express = require('express');
const router = express.Router();
const { markOrUpdateAttendance, getAttendanceByLecture } = require('../controllers/attendance.controller');

router.post('/markOrUpdate', markOrUpdateAttendance);
router.get('/byLecture/:lectureId', getAttendanceByLecture);

module.exports = router;
