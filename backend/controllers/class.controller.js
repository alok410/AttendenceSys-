const connection = require('../config/db');

// -------------------------
// Get All Classes
// -------------------------
exports.getAllClasses = (req, res) => {
  const query = `SELECT * FROM classes;`;

  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(200).json({
      message: 'Classes fetched successfully',
      classes: results
    });
  });
};

// -------------------------
// Get Classes by Department ID
// -------------------------
exports.getClassesByDepartment = (req, res) => {
  const { deptId } = req.params;

  const query = `SELECT * FROM classes WHERE department_id = ?`;

  connection.query(query, [deptId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(200).json(results);
  });
};
