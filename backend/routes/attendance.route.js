const express = require('express');
const router = express.Router();
const {
  markOrUpdateAttendance,
  getAttendanceByLecture,
  getAttendanceReport
} = require('../controllers/attendance.controller');

router.post('/markOrUpdate', markOrUpdateAttendance);
router.get('/byLecture/:lectureId', getAttendanceByLecture);
router.get('/report/:subjectId/:facultyId', getAttendanceReport); // ✅ new




module.exports = router;
