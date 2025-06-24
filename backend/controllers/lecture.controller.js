const db = require('../config/db'); 

const getAllLecture = (req,res) =>{

    const query = `SELECT 
  L.subject_id,
  f.name AS faculty_name,
  L.faculty_id,
  S.name AS subject_name,
  L.id AS lecture_id,
  L.duration,
  C.name AS class_name
FROM lectures AS L
JOIN subjects AS S ON L.subject_id = S.id
JOIN classes AS C ON S.class_id = C.id
JOIN faculty AS f ON f.id = L.faculty_id;`


  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(200).json({
      message: 'Lectures fetched successfully',
      lectures: results
    });
  });
};




// 📘 Controller to get count of lectures (duration = 1) and labs (duration = 2) per subject
const getLectureSummary = (req, res) => {
    const query = `
    SELECT 
    s.id AS subject_id,
    s.name AS subject_name,
    c.name AS class_name,
    SUM(CASE WHEN l.duration = 1 THEN 1 ELSE 0 END) AS total_lectures,
    SUM(CASE WHEN l.duration = 2 THEN 1 ELSE 0 END) AS total_labs
    FROM lectures l
    JOIN subjects s ON l.subject_id = s.id
    JOIN classes c ON s.class_id = c.id
    GROUP BY l.subject_id;
    `;
    
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
    res.status(200).json({
        message: 'Lecture summary fetched successfully',
        summary: results
    });
  });
};

const getLectureSummaryByFaculty = (req, res) => {
  const query = `
    SELECT 
      f.id AS faculty_id,
      f.name AS faculty_name,
      s.id AS subject_id,
      s.name AS subject_name,
      c.name AS class_name,
      SUM(CASE WHEN l.duration = 1 THEN 1 ELSE 0 END) AS total_lectures,
      SUM(CASE WHEN l.duration = 2 THEN 1 ELSE 0 END) AS total_labs
    FROM lectures l
    JOIN faculty f ON l.faculty_id = f.id
    JOIN subjects s ON l.subject_id = s.id
    JOIN classes c ON s.class_id = c.id
    GROUP BY f.id, s.id;
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(200).json({
      message: 'Lecture summary by faculty fetched successfully',
      summary: results
    });
  });
};

const getLectureCountsByFaculty = (req, res) => {
  const { facultyId } = req.params;

  const query = `
    SELECT 
      subject_id,
      SUM(CASE WHEN duration = 1 THEN 1 ELSE 0 END) AS lecture_count,
      SUM(CASE WHEN duration = 2 THEN 1 ELSE 0 END) AS lab_count
    FROM lectures
    WHERE faculty_id = ?
    GROUP BY subject_id
  `;

  db.query(query, [facultyId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(200).json(results);
  });
};

module.exports = {
  getAllLecture,getLectureSummary,
  getLectureSummaryByFaculty,getLectureCountsByFaculty};