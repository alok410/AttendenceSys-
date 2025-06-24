import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';


const AllLectures = () => {
  const { id: subjectId } = useParams();
  const [lectures, setLectures] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const navigate = useNavigate();
  
  const [filter, setFilter] = useState({
    date: '',
    type: '',
    topic: '',
    faculty: ''
  });

  useEffect(() => {
    fetch(`http://localhost:5000/lectures/bySubject/${subjectId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLectures(data);
          if (data.length > 0) {
            setSubjectName(data[0].subject_name || '');
          }
        }
      })
      .catch(err => {
        console.error('Error fetching lectures:', err);
        setLectures([]);
      });
  }, [subjectId]);

  const filteredLectures = lectures.filter(lec =>
    (filter.date ? new Date(lec.date).toLocaleDateString().includes(filter.date) : true) &&
    (filter.type ? (lec.duration === 1 ? 'Lec' : 'Lab') === filter.type : true) &&
    (filter.topic ? lec.topic?.toLowerCase().includes(filter.topic.toLowerCase()) : true) &&
    (filter.faculty ? lec.faculty_name?.toLowerCase().includes(filter.faculty.toLowerCase()) : true)
  );

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1>📚 All Lectures for: <span style={{ color: "#2c3e50" }}>{subjectName || 'Subject'}</span></h1>

        {/* Filters */}
        <div style={filterWrapperStyle}>
          <input
            type="text"
            placeholder="Filter by Date"
            value={filter.date}
            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            style={filterInputStyle}
          />
          <select
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            style={filterInputStyle}
          >
            <option value="">All Types</option>
            <option value="Lec">Lec</option>
            <option value="Lab">Lab</option>
          </select>
          <input
            type="text"
            placeholder="Filter by Topic"
            value={filter.topic}
            onChange={(e) => setFilter({ ...filter, topic: e.target.value })}
            style={filterInputStyle}
          />
          <input
            type="text"
            placeholder="Filter by Faculty"
            value={filter.faculty}
            onChange={(e) => setFilter({ ...filter, faculty: e.target.value })}
            style={filterInputStyle}
          />
        </div>

        {filteredLectures.length === 0 ? (
          <p>No lectures found.</p>
        ) : (
            <div style={scrollContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Topic</th>
                <th style={thStyle}>Faculty</th>
                <th style={thStyle}>Mark Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filteredLectures.map(lec => (
                <tr key={lec.id} style={rowHoverStyle}>
                  <td style={tdStyle}>{lec.id}</td>
                  <td style={tdStyle}>{new Date(lec.date).toLocaleDateString()}</td>
                  <td style={tdStyle}>{lec.duration === 1 ? "Lec" : "Lab"}</td>
                  <td style={tdStyle}>{lec.topic || '-'}</td>
                  <td style={tdStyle}>{lec.faculty_name}</td>
                  <td style={tdStyle}>
          
                    <button onClick={() => navigate('/faculty/my-subjects/:id/atd')} style={btnStyle}>Mark</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AllLectures;

// --- Styles ---
const tableStyle = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0',
  marginTop: '20px',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
};

const thTdBase = {
  padding: '12px 16px',
  textAlign: 'left',
  borderBottom: '1px solid #eee',
};

const thStyle = {
  ...thTdBase,
  backgroundColor: '#f7f9fc',
  color: '#333',
  fontWeight: '600',
  textAlign:"center"
};

const tdStyle = {
  ...thTdBase,
  backgroundColor: '#fff',
  textAlign:"center"
};

const rowHoverStyle = {
  transition: 'background-color 0.3s',
};

const btnStyle = {
  padding: '6px 12px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const filterWrapperStyle = {
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
  margin: '20px 0'
};

const filterInputStyle = {
  padding: '8px 12px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  minWidth: '150px',
  fontSize: '14px'
};


const scrollContainerStyle = {
  maxHeight: '400px',
  overflowY: 'auto',
  borderRadius: '10px',
  boxShadow: '0 0 12px rgba(0, 0, 0, 0.08)',
};
