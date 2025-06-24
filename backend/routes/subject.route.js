const express = require('express');
const router = express.Router();
const {
  getSubjectsByClass,
  assignFacultyToSubject,
  getSubjectsByDepartmentFull, // ✅ newly added
  getSubjectsByFaculty
} = require('../controllers/subject.controller');

const { getFacultyByDepartment } = require('../controllers/faculty.controller');

// Existing routes
router.get('/byClass/:classId', getSubjectsByClass);
router.get('/facultyByDept/:deptId', getFacultyByDepartment);
router.post('/assignFaculty/:subjectId', assignFacultyToSubject);

// ✅ New route to get full subject info (for HOD view)
router.get('/byDeptFull/:deptId', getSubjectsByDepartmentFull);

router.get('/byFaculty/:facultyId', getSubjectsByFaculty);

module.exports = router;
