import React, { useState, useEffect } from 'react';
import { ref, onValue, update, remove } from 'firebase/database';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, database } from '../firebase/config';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [tutorRegistrations, setTutorRegistrations] = useState([]);
  const [studentRegistrations, setStudentRegistrations] = useState([]);
  const [demoRequests, setDemoRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('tutors');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const ADMIN_EMAIL = 'nestonlineschooluk@gmail.com';

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email === ADMIN_EMAIL) {
        setIsLoggedIn(true);
        fetchAllData();
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    try {
      if (loginData.email !== ADMIN_EMAIL) {
        throw new Error('Unauthorized access. Admin only.');
      }

      await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      setIsLoggedIn(true);
      fetchAllData();
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setTutorRegistrations([]);
      setStudentRegistrations([]);
      setDemoRequests([]);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch tutor registrations
      const tutorsRef = ref(database, 'tutorRegistrations');
      onValue(tutorsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const tutorsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
            registeredAt: new Date(data[key].registeredAt)
          }));
          setTutorRegistrations(tutorsArray);
        } else {
          setTutorRegistrations([]);
        }
      });

      // Fetch student registrations
      const studentsRef = ref(database, 'studentRegistrations');
      onValue(studentsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const studentsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
            registeredAt: new Date(data[key].registeredAt)
          }));
          setStudentRegistrations(studentsArray);
        } else {
          setStudentRegistrations([]);
        }
      });

      // Fetch demo requests
      const demoRef = ref(database, 'demoRequests');
      onValue(demoRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const demoArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
            submittedAt: new Date(data[key].submittedAt)
          }));
          setDemoRequests(demoArray);
        } else {
          setDemoRequests([]);
        }
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (collection_name, id, newStatus) => {
    try {
      const itemRef = ref(database, `${collection_name}/${id}`);
      await update(itemRef, { status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteRecord = async (collection_name, id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const itemRef = ref(database, `${collection_name}/${id}`);
        await remove(itemRef);
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login-page">
        <div className="container">
          <div className="login-container">
            <div className="login-header">
              <h2>
                <i className="bi bi-shield-lock text-primary me-2"></i>
                Admin Dashboard
              </h2>
              <p>Secure access for administrators only</p>
            </div>

            {loginError && (
              <div className="alert alert-danger">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label className="form-label">
                  <i className="bi bi-envelope me-2"></i>Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  required
                  placeholder="Enter admin email"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <i className="bi bi-lock me-2"></i>Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={loading}
              >
                {loading && <span className="loading-spinner"></span>}
                <i className="bi bi-box-arrow-in-right me-2"></i>
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h1>
              <i className="bi bi-speedometer2 text-primary me-2"></i>
              Admin Dashboard
            </h1>
            <button onClick={handleLogout} className="btn btn-outline-danger">
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        {/* Statistics Cards */}
        <div className="row mb-4">
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="stat-card">
              <div className="stat-icon bg-primary">
                <i className="bi bi-person-check"></i>
              </div>
              <div className="stat-content">
                <h3>{tutorRegistrations.length}</h3>
                <p>Tutor Applications</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="stat-card">
              <div className="stat-icon bg-success">
                <i className="bi bi-mortarboard"></i>
              </div>
              <div className="stat-content">
                <h3>{studentRegistrations.length}</h3>
                <p>Student Registrations</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="stat-card">
              <div className="stat-icon bg-warning">
                <i className="bi bi-calendar-check"></i>
              </div>
              <div className="stat-content">
                <h3>{demoRequests.length}</h3>
                <p>Demo Requests</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="stat-card">
              <div className="stat-icon bg-info">
                <i className="bi bi-graph-up"></i>
              </div>
              <div className="stat-content">
                <h3>{tutorRegistrations.length + studentRegistrations.length}</h3>
                <p>Total Registrations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'tutors' ? 'active' : ''}`}
            onClick={() => setActiveTab('tutors')}
          >
            <i className="bi bi-person-check me-2"></i>
            Tutor Applications ({tutorRegistrations.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            <i className="bi bi-mortarboard me-2"></i>
            Student Registrations ({studentRegistrations.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'demos' ? 'active' : ''}`}
            onClick={() => setActiveTab('demos')}
          >
            <i className="bi bi-calendar-check me-2"></i>
            Demo Requests ({demoRequests.length})
          </button>
        </div>

        {/* Content Area */}
        <div className="dashboard-content">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {/* Tutor Applications */}
              {activeTab === 'tutors' && (
                <div className="data-section">
                  <h3 className="section-title mb-4">
                    <i className="bi bi-person-check me-2"></i>
                    Tutor Applications
                  </h3>
                  {tutorRegistrations.length === 0 ? (
                    <div className="no-data">
                      <i className="bi bi-inbox"></i>
                      <p>No tutor applications found</p>
                    </div>
                  ) : (
                    <div className="row">
                      {tutorRegistrations.map((tutor) => (
                        <div key={tutor.id} className="col-lg-6 col-xl-4 mb-4">
                          <div className="registration-card tutor-card">
                            <div className="card-header">
                              <div className="d-flex justify-content-between align-items-start">
                                <div className="user-info">
                                  <h5 className="user-name">
                                    <i className="bi bi-person-circle me-2"></i>
                                    {tutor.fullName}
                                  </h5>
                                  <p className="user-email">
                                    <i className="bi bi-envelope me-2"></i>
                                    {tutor.email}
                                  </p>
                                </div>
                                <span className={`status-badge status-${tutor.status}`}>
                                  {tutor.status}
                                </span>
                              </div>
                            </div>

                            <div className="card-body">
                              <div className="info-section">
                                <h6 className="section-subtitle">
                                  <i className="bi bi-telephone me-2"></i>Contact Information
                                </h6>
                                <div className="info-grid">
                                  <div className="info-item">
                                    <span className="label">Phone:</span>
                                    <span className="value">{tutor.phoneNumber}</span>
                                  </div>
                                  <div className="info-item">
                                    <span className="label">WhatsApp:</span>
                                    <span className="value">{tutor.whatsappNumber}</span>
                                  </div>
                                  <div className="info-item">
                                    <span className="label">Location:</span>
                                    <span className="value">{tutor.location}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="info-section">
                                <h6 className="section-subtitle">
                                  <i className="bi bi-mortarboard me-2"></i>Educational Background
                                </h6>
                                <div className="info-grid">
                                  <div className="info-item">
                                    <span className="label">Qualification:</span>
                                    <span className="value">{tutor.qualification}</span>
                                  </div>
                                  <div className="info-item">
                                    <span className="label">Specialization:</span>
                                    <span className="value">{tutor.specialization}</span>
                                  </div>
                                  <div className="info-item">
                                    <span className="label">University:</span>
                                    <span className="value">{tutor.university}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="info-section">
                                <h6 className="section-subtitle">
                                  <i className="bi bi-briefcase me-2"></i>Teaching Experience
                                </h6>
                                <div className="info-grid">
                                  <div className="info-item">
                                    <span className="label">Experience:</span>
                                    <span className="value">
                                      {tutor.hasExperience === 'yes' ? tutor.experienceYears : 'No experience'}
                                    </span>
                                  </div>
                                  <div className="info-item full-width">
                                    <span className="label">Curriculums:</span>
                                    <div className="tags">
                                      {tutor.curriculums?.map((curriculum, index) => (
                                        <span key={index} className="tag curriculum-tag">
                                          {curriculum}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="info-item full-width">
                                    <span className="label">Subjects:</span>
                                    <div className="tags">
                                      {tutor.subjects?.map((subject, index) => (
                                        <span key={index} className="tag subject-tag">
                                          {subject}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="info-section">
                                <h6 className="section-subtitle">
                                  <i className="bi bi-laptop me-2"></i>Technical & Documents
                                </h6>
                                <div className="info-grid">
                                  <div className="info-item">
                                    <span className="label">Equipment:</span>
                                    <span className={`value ${tutor.hasEquipment === 'yes' ? 'text-success' : 'text-danger'}`}>
                                      <i className={`bi bi-${tutor.hasEquipment === 'yes' ? 'check-circle' : 'x-circle'} me-1`}></i>
                                      {tutor.hasEquipment === 'yes' ? 'Available' : 'Not Available'}
                                    </span>
                                  </div>
                                  <div className="info-item">
                                    <span className="label">Tools Comfort:</span>
                                    <span className={`value ${tutor.comfortableWithTools === 'yes' ? 'text-success' : 'text-danger'}`}>
                                      <i className={`bi bi-${tutor.comfortableWithTools === 'yes' ? 'check-circle' : 'x-circle'} me-1`}></i>
                                      {tutor.comfortableWithTools === 'yes' ? 'Comfortable' : 'Not Comfortable'}
                                    </span>
                                  </div>
                                  <div className="info-item">
                                    <span className="label">CV File:</span>
                                    <span className="value">
                                      {tutor.cvFileName ? (
                                        <span className="file-indicator">
                                          <i className="bi bi-file-earmark-pdf text-danger me-1"></i>
                                          {tutor.cvFileName.length > 20 
                                            ? tutor.cvFileName.substring(0, 20) + '...' 
                                            : tutor.cvFileName
                                          }
                                        </span>
                                      ) : (
                                        <span className="text-muted">No CV</span>
                                      )}
                                    </span>
                                  </div>
                                  <div className="info-item">
                                    <span className="label">Demo Video:</span>
                                    <span className="value">
                                      {tutor.videoFileName ? (
                                        <span className="file-indicator">
                                          <i className="bi bi-camera-video text-primary me-1"></i>
                                          {tutor.videoFileName.length > 20 
                                            ? tutor.videoFileName.substring(0, 20) + '...' 
                                            : tutor.videoFileName
                                          }
                                        </span>
                                      ) : (
                                        <span className="text-muted">No Video</span>
                                      )}
                                    </span>
                                  </div>
                                  {tutor.portfolioLink && (
                                    <div className="info-item">
                                      <span className="label">Portfolio:</span>
                                      <a href={tutor.portfolioLink} target="_blank" rel="noopener noreferrer" className="link">
                                        <i className="bi bi-link-45deg me-1"></i>View Portfolio
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="info-section">
                                <div className="info-item">
                                  <span className="label">Registration Date:</span>
                                  <span className="value">{tutor.registeredAt.toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>

                            <div className="card-footer">
                              <div className="action-buttons">
                                <select
                                  className="form-select form-select-sm"
                                  value={tutor.status}
                                  onChange={(e) => updateStatus('tutorRegistrations', tutor.id, e.target.value)}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="approved">Approved</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => deleteRecord('tutorRegistrations', tutor.id)}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Student Registrations */}
              {activeTab === 'students' && (
                <div className="data-section">
                  <h3 className="section-title mb-4">
                    <i className="bi bi-mortarboard me-2"></i>
                    Student Registrations
                  </h3>
                  {studentRegistrations.length === 0 ? (
                    <div className="no-data">
                      <i className="bi bi-inbox"></i>
                      <p>No student registrations found</p>
                    </div>
                  ) : (
                    <div className="row">
                      {studentRegistrations.map((student) => (
                        <div key={student.id} className="col-lg-6 col-xl-4 mb-4">
                          <div className="registration-card student-card">
                            <div className="card-header">
                              <div className="d-flex justify-content-between align-items-start">
                                <div className="user-info">
                                  <h5 className="user-name">
                                    <i className="bi bi-person-circle me-2"></i>
                                    {student.firstName} {student.lastName}
                                  </h5>
                                  <p className="user-email">
                                    <i className="bi bi-envelope me-2"></i>
                                    {student.email}
                                  </p>
                                </div>
                                <span className={`status-badge status-${student.status}`}>
                                  {student.status}
                                </span>
                              </div>
                            </div>

                            <div className="card-body">
                              <div className="info-section">
                                <h6 className="section-subtitle">
                                  <i className="bi bi-person me-2"></i>Personal Information
                                </h6>
                                <div className="info-grid">
                                  <div className="info-item">
                                    <span className="label">Phone:</span>
                                    <span className="value">{student.phoneNumber}</span>
                                  </div>
                                  <div className="info-item">
                                    <span className="label">Date of Birth:</span>
                                    <span className="value">{student.dateOfBirth}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="info-section">
                                <h6 className="section-subtitle">
                                  <i className="bi bi-book me-2"></i>Academic Information
                                </h6>
                                <div className="info-grid">
                                  <div className="info-item">
                                    <span className="label">Grade:</span>
                                    <span className="value">{student.grade}</span>
                                  </div>
                                  <div className="info-item">
                                    <span className="label">Curriculum:</span>
                                    <span className="value">{student.curriculum}</span>
                                  </div>
                                  <div className="info-item full-width">
                                    <span className="label">Subjects:</span>
                                    <div className="tags">
                                      {student.subjects?.map((subject, index) => (
                                        <span key={index} className="tag subject-tag">
                                          {subject}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  {student.previousSchool && (
                                    <div className="info-item">
                                      <span className="label">Previous School:</span>
                                      <span className="value">{student.previousSchool}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="info-section">
                                <h6 className="section-subtitle">
                                  <i className="bi bi-people me-2"></i>Parent/Guardian Information
                                </h6>
                                <div className="info-grid">
                                  <div className="info-item">
                                    <span className="label">Parent Name:</span>
                                    <span className="value">{student.parentName}</span>
                                  </div>
                                  <div className="info-item">
                                    <span className="label">Parent Email:</span>
                                    <span className="value">{student.parentEmail}</span>
                                  </div>
                                  <div className="info-item">
                                    <span className="label">Parent Phone:</span>
                                    <span className="value">{student.parentPhone}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="info-section">
                                <h6 className="section-subtitle">
                                  <i className="bi bi-geo-alt me-2"></i>Address Information
                                </h6>
                                <div className="info-grid">
                                  <div className="info-item full-width">
                                    <span className="label">Address:</span>
                                    <span className="value">{student.address}</span>
                                  </div>
                                  <div className="info-item">
                                    <span className="label">City:</span>
                                    <span className="value">{student.city}</span>
                                  </div>
                                  <div className="info-item">
                                    <span className="label">Country:</span>
                                    <span className="value">{student.country}</span>
                                  </div>
                                </div>
                              </div>

                              {student.learningGoals && (
                                <div className="info-section">
                                  <h6 className="section-subtitle">
                                    <i className="bi bi-target me-2"></i>Learning Goals
                                  </h6>
                                  <p className="learning-goals">{student.learningGoals}</p>
                                </div>
                              )}

                              <div className="info-section">
                                <div className="info-item">
                                  <span className="label">Registration Date:</span>
                                  <span className="value">{student.registeredAt.toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>

                            <div className="card-footer">
                              <div className="action-buttons">
                                <select
                                  className="form-select form-select-sm"
                                  value={student.status}
                                  onChange={(e) => updateStatus('studentRegistrations', student.id, e.target.value)}
                                >
                                  <option value="active">Active</option>
                                  <option value="inactive">Inactive</option>
                                  <option value="suspended">Suspended</option>
                                </select>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => deleteRecord('studentRegistrations', student.id)}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Demo Requests */}
              {activeTab === 'demos' && (
                <div className="data-section">
                  <h3 className="section-title mb-4">
                    <i className="bi bi-calendar-check me-2"></i>
                    Demo Class Requests
                  </h3>
                  {demoRequests.length === 0 ? (
                    <div className="no-data">
                      <i className="bi bi-inbox"></i>
                      <p>No demo requests found</p>
                    </div>
                  ) : (
                    <div className="row">
                      {demoRequests.map((demo) => (
                        <div key={demo.id} className="col-lg-6 col-xl-4 mb-4">
                          <div className="registration-card demo-card">
                            <div className="card-header">
                              <div className="d-flex justify-content-between align-items-start">
                                <div className="user-info">
                                  <h5 className="user-name">
                                    <i className="bi bi-person-circle me-2"></i>
                                    {demo.studentName}
                                  </h5>
                                  <p className="user-email">
                                    <i className="bi bi-whatsapp me-2"></i>
                                    +91 {demo.whatsappNumber}
                                  </p>
                                </div>
                                <span className={`status-badge status-${demo.status}`}>
                                  {demo.status}
                                </span>
                              </div>
                            </div>

                            <div className="card-body">
                              <div className="info-section">
                                <h6 className="section-subtitle">
                                  <i className="bi bi-book me-2"></i>Demo Details
                                </h6>
                                <div className="info-grid">
                                  <div className="info-item">
                                    <span className="label">Syllabus:</span>
                                    <span className="value">{demo.syllabus}</span>
                                  </div>
                                  <div className="info-item">
                                    <span className="label">Subject:</span>
                                    <span className="value">{demo.subject}</span>
                                  </div>
                                  <div className="info-item">
                                    <span className="label">Class:</span>
                                    <span className="value">{demo.className}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="info-section">
                                <div className="info-item">
                                  <span className="label">Submitted Date:</span>
                                  <span className="value">{demo.submittedAt.toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>

                            <div className="card-footer">
                              <div className="action-buttons">
                                <select
                                  className="form-select form-select-sm"
                                  value={demo.status}
                                  onChange={(e) => updateStatus('demoRequests', demo.id, e.target.value)}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="scheduled">Scheduled</option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => deleteRecord('demoRequests', demo.id)}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;