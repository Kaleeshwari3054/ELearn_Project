import React, { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../firebase/config';
import '../styles/AuthPages.css';

const StudentLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    dateOfBirth: '',
    grade: '',
    curriculum: '',
    subjects: [],
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    address: '',
    city: '',
    country: '',
    previousSchool: '',
    learningGoals: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const curriculumOptions = ['CBSE', 'ICSE', 'IGCSE', 'A-Levels', 'Kerala Board', 'Others'];
  const subjectOptions = ['Mathematics', 'Science', 'English', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Python Programming', 'Abacus'];
  const gradeOptions = ['Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'A-Level'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        subjects: checked 
          ? [...prev.subjects, value]
          : prev.subjects.filter(subject => subject !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      if (isLogin) {
        // Login existing student
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        setSubmitStatus({
          type: 'success',
          message: 'Login successful! Welcome back.'
        });
      } else {
        // Register new student
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }

        if (formData.subjects.length === 0) {
          throw new Error('Please select at least one subject');
        }

        // Create user account
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        
        // Save student data to Firebase Realtime Database
        const studentData = {
          uid: userCredential.user.uid,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          dateOfBirth: formData.dateOfBirth,
          grade: formData.grade,
          curriculum: formData.curriculum,
          subjects: formData.subjects,
          parentName: formData.parentName,
          parentEmail: formData.parentEmail,
          parentPhone: formData.parentPhone,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          previousSchool: formData.previousSchool,
          learningGoals: formData.learningGoals,
          registeredAt: new Date().toISOString(),
          status: 'active',
          type: 'student'
        };

        // Push to studentRegistrations node
        const studentRegistrationsRef = ref(database, 'studentRegistrations');
        const newStudentRef = push(studentRegistrationsRef);
        await set(newStudentRef, studentData);

        setSubmitStatus({
          type: 'success',
          message: 'Registration successful! Welcome to ELearn.'
        });

        // Reset form
        setFormData({
          firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
          phoneNumber: '', dateOfBirth: '', grade: '', curriculum: '', subjects: [],
          parentName: '', parentEmail: '', parentPhone: '', address: '', city: '',
          country: '', previousSchool: '', learningGoals: ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'An error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-header">
            <h2>
              <i className="bi bi-mortarboard text-primary me-2"></i>
              Student {isLogin ? 'Login' : 'Registration'}
            </h2>
            <p>
              {isLogin 
                ? 'Welcome back! Sign in to continue your learning journey.' 
                : 'Join thousands of students learning with expert tutors.'
              }
            </p>
          </div>

          <div className="auth-toggle">
            <button 
              className={`toggle-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={`toggle-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          {submitStatus.message && (
            <div className={`alert ${submitStatus.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
              <i className={`bi bi-${submitStatus.type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2`}></i>
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {isLogin ? (
              // Login Form
              <>
                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-envelope me-2"></i>Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-lock me-2"></i>Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your password"
                  />
                </div>
              </>
            ) : (
              // Registration Form
              <>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">
                        <i className="bi bi-person me-2"></i>First Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter first name"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">
                        <i className="bi bi-person me-2"></i>Last Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">
                        <i className="bi bi-envelope me-2"></i>Email Address *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">
                        <i className="bi bi-phone me-2"></i>Phone Number *
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">
                        <i className="bi bi-lock me-2"></i>Password *
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        placeholder="Create password"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">
                        <i className="bi bi-lock-fill me-2"></i>Confirm Password *
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        placeholder="Confirm password"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">
                        <i className="bi bi-calendar me-2"></i>Date of Birth *
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">
                        <i className="bi bi-mortarboard me-2"></i>Current Grade *
                      </label>
                      <select
                        className="form-select"
                        name="grade"
                        value={formData.grade}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Grade</option>
                        {gradeOptions.map(grade => (
                          <option key={grade} value={grade}>{grade}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-book me-2"></i>Curriculum *
                  </label>
                  <select
                    className="form-select"
                    name="curriculum"
                    value={formData.curriculum}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Curriculum</option>
                    {curriculumOptions.map(curriculum => (
                      <option key={curriculum} value={curriculum}>{curriculum}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <i className="bi bi-journal-text me-2"></i>Subjects of Interest *
                  </label>
                  <div className="subjects-grid">
                    {subjectOptions.map(subject => (
                      <div key={subject} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={subject}
                          id={subject}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor={subject}>
                          {subject}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="parent-info-section">
                  <h5 className="section-title">
                    <i className="bi bi-people me-2"></i>Parent/Guardian Information
                  </h5>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Parent/Guardian Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="parentName"
                          value={formData.parentName}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter parent name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Parent Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          name="parentEmail"
                          value={formData.parentEmail}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter parent email"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Parent Phone Number *</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="parentPhone"
                      value={formData.parentPhone}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter parent phone number"
                    />
                  </div>
                </div>

                <div className="address-section">
                  <h5 className="section-title">
                    <i className="bi bi-geo-alt me-2"></i>Address Information
                  </h5>
                  
                  <div className="form-group">
                    <label className="form-label">Address *</label>
                    <textarea
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      placeholder="Enter full address"
                    ></textarea>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">City *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter city"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Country *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter country"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="additional-info-section">
                  <h5 className="section-title">
                    <i className="bi bi-info-circle me-2"></i>Additional Information
                  </h5>
                  
                  <div className="form-group">
                    <label className="form-label">Previous School</label>
                    <input
                      type="text"
                      className="form-control"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleInputChange}
                      placeholder="Enter previous school name"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Learning Goals</label>
                    <textarea
                      className="form-control"
                      name="learningGoals"
                      value={formData.learningGoals}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Tell us about your learning goals and expectations"
                    ></textarea>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting && <span className="loading-spinner"></span>}
              <i className="bi bi-person-check me-2"></i>
              {isSubmitting 
                ? (isLogin ? 'Signing In...' : 'Registering...') 
                : (isLogin ? 'Sign In' : 'Register')
              }
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button" 
                className="link-btn"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Register here' : 'Login here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;