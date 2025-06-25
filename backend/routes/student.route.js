const express = require('express');
const router = express.Router();
const { getAllStudents, createStudent, deleteStudent, updateStudent, getStudentsBySubject } = require('../controllers/student.controller');

router.get('/getAllStudents', getAllStudents);
router.post('/create', createStudent);
router.delete('/delete/:id', deleteStudent);
router.put('/update/:id',updateStudent);

router.get('/bySubject/:subjectId', getStudentsBySubject);



module.exports = router;
