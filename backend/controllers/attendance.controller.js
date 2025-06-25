const db = require('../config/db'); 



const markOrUpdateAttendance = (req, res) => {
  const { attendance } = req.body;

  if (!attendance || !Array.isArray(attendance)) {
    return res.status(400).json({ message: 'Invalid attendance data.' });
  }

  const tasks = attendance.map(entry => {
    const { student_id, lecture_id, status } = entry;

    return new Promise((resolve, reject) => {
      const checkQuery = `
        SELECT * FROM attendance 
        WHERE student_id = ? AND lecture_id = ?
      `;

      db.query(checkQuery, [student_id, lecture_id], (err, result) => {
        if (err) return reject(err);

        if (result.length > 0) {
          // Record exists -> update
          const updateQuery = `
            UPDATE attendance SET status = ? 
            WHERE student_id = ? AND lecture_id = ?
          `;
          db.query(updateQuery, [status, student_id, lecture_id], (err2) => {
            if (err2) return reject(err2);
            resolve('updated');
          });
        } else {
          // Insert new record
          const insertQuery = `
            INSERT INTO attendance (student_id, lecture_id, status)
            VALUES (?, ?, ?)
          `;
          db.query(insertQuery, [student_id, lecture_id, status], (err3) => {
            if (err3) return reject(err3);
            resolve('inserted');
          });
        }
      });
    });
  });

  Promise.all(tasks)
    .then(() => res.status(200).json({ message: 'Attendance saved successfully.' }))
    .catch((err) => {
      console.error('Attendance error:', err);
      res.status(500).json({ message: 'Error processing attendance.' });
    });
};

const getAttendanceByLecture = (req, res) => {
  const { lectureId } = req.params;

  const query = `
    SELECT student_id, status 
    FROM attendance 
    WHERE lecture_id = ?
  `;

  db.query(query, [lectureId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const attendanceMap = {};
    results.forEach(row => {
      attendanceMap[row.student_id] = row.status;
    });

    res.status(200).json(attendanceMap);
  });
};



module.exports = {
  markOrUpdateAttendance,
  getAttendanceByLecture
};
