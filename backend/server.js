const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/auth.route');
const  studentRoutes  = require('./routes/student.route');
const  facultyRoutes  = require('./routes/faculty.route');
const  hodRoutes  = require('./routes/hod.route');
const principalRoutes = require("./routes/principal.route");
const classesRoutes =  require("./routes/classes.route");
const adminRoutes=  require("./routes/admin.route");
const departmentsRoutes = require("./routes/departments.route")
const subjectssRoutes = require("./routes/subject.route")

 
require('dotenv').config();

// ✅ Apply CORS middleware BEFORE routes
app.use(cors({
  origin: 'http://localhost:3000', // React frontend URL
  credentials: true
}));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Mount routes
app.use('/api/auth', authRoutes);
app.use('/students',studentRoutes)
app.use('/faculty',facultyRoutes)
app.use('/hod',hodRoutes)
app.use('/principal',principalRoutes)
app.use('/admin',adminRoutes)
app.use('/classes',classesRoutes)
app.use('/departments',departmentsRoutes)
app.use('/subjects',subjectssRoutes)







// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
