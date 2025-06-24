const express = require('express');

const router = express.Router();
const {getAllLecture,getLectureSummary, getLectureSummaryByFaculty, getLectureCountsByFaculty} = require('../controllers/lecture.controller');

router.get('/getAllLecture', getAllLecture);
router.get('/getLectureSummary', getLectureSummary);
router.get('/getLectureSummaryByFaculty', getLectureSummaryByFaculty);
router.get('/lectureCounts/:facultyId', getLectureCountsByFaculty);




module.exports = router;
