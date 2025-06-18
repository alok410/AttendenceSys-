

const connection = require('../config/db');

// -------------------------
// Get All faculty
// -------------------------
exports.getAllDepartments = (req, res) => {
  const query = `select * from departments;`;

  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(200).json({
      message: 'departments fetched successfully',
      departments: results
    });
  });
};  
