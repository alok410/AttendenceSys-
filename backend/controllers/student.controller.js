const bcrypt = require('bcrypt');
const db = require('../config/db'); 
// -------------------------
// Get All Students
// -------------------------
const getAllStudents = (req, res) => {
  const query = `
    SELECT 
      students.id, 
      students.name, 
      students.email, 
      students.batch,
      students.department_id, 
      students.class_id, 
      departments.name AS department_name,
      classes.name AS class_name
    FROM 
      students
    JOIN 
      departments ON students.department_id = departments.id
    JOIN 
      classes ON students.class_id = classes.id
    order by id desc;
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(200).json({
      message: 'Students fetched successfully',
      students: results
    });
  });
};

// -------------------------
// Create Student
// -------------------------
const createStudent = (req, res) => {
  const { name, email, password, batch, department_id, class_id } = req.body;

  if (!name || !email || !password || !batch || !department_id || !class_id) {
    return res.status(400).json({ message: "All fields are required." });
  }

  db.query("SELECT id FROM students WHERE email = ?", [email], async (err, existing) => {
    if (err) return res.status(500).json({ message: "DB error 1", error: err });

    if (existing.length > 0) {
      return res.status(409).json({ message: "Student with this email already exists." });
    }

    db.query("SELECT id FROM departments WHERE id = ?", [department_id], (err, dept) => {
      if (err) return res.status(500).json({ message: "DB error 2", error: err });
      if (dept.length === 0) return res.status(404).json({ message: "Department not found." });

      db.query("SELECT id FROM classes WHERE id = ?", [class_id], async (err, cls) => {
        if (err) return res.status(500).json({ message: "DB error 3", error: err });
        if (cls.length === 0) return res.status(404).json({ message: "Class not found." });

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          "INSERT INTO students (name, email, password, batch, department_id, class_id) VALUES (?, ?, ?, ?, ?, ?)",
          [name, email, hashedPassword, batch, department_id, class_id],
          (err, result) => {
            if (err) return res.status(500).json({ message: "DB error 4", error: err });

            return res.status(201).json({
              message: "Student created successfully.",
              student_id: result.insertId,
            });
          }
        );
      });
    });
  });
};
// -------------------------
// Delete Student by ID
// -------------------------
const deleteStudent = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Student ID is required." });
  }

  db.query("DELETE FROM students WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found." });
    }

    return res.status(200).json({ message: "Student deleted successfully." });
  });
};

// -------------------------
// Update Student
// -------------------------
const updateStudent = (req, res) => {
  const studentId = req.params.id;
  const { name, email, password, batch, department_id, class_id } = req.body;

  if (!name || !email || !batch || !department_id || !class_id) {
    return res.status(400).json({ message: "All fields except password are required." });
  }

  // Check if student exists
  db.query("SELECT * FROM students WHERE id = ?", [studentId], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB error 1", error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: "Student not found." });
    }

    // Hash password only if provided
    let hashedPassword = results[0].password; // existing password
    if (password && password.trim() !== "") {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updateQuery = `
      UPDATE students SET 
        name = ?, 
        email = ?, 
        password = ?, 
        batch = ?, 
        department_id = ?, 
        class_id = ?
      WHERE id = ?
    `;

    db.query(updateQuery, [name, email, hashedPassword, batch, department_id, class_id, studentId], (err, result) => {
      if (err) return res.status(500).json({ message: "DB error 2", error: err });

      return res.status(200).json({
        message: "Student updated successfully."
      });
    });
  });
};

module.exports = {
  getAllStudents,
  createStudent,
  deleteStudent,
  updateStudent
};
