

const connection = require('../config/db');

// -------------------------
// Get All faculty
// -------------------------
exports.getAllClasses = (req, res) => {
  const query = `select * from classes;`;

  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(200).json({
      message: 'classes fetched successfully',
      classes: results
    });
  });
};  
