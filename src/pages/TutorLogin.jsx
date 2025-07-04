import React, { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../firebase/config';
import '../styles/AuthPages.css';

const TutorLogin = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        whatsappNumber: '',
        city: '',
        country: '',
        qualification: '',
        specialization: '',
        university: '',
        hasExperience: '',
        experienceYears: '',
        curriculums: [],
        subjects: [],
        hasEquipment: '',
        comfortableWithTools: '',
        portfolioLink: '',
        cvFileName: '',
        videoFileName: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const curriculumOptions = ['UK Syllabus', 'IGCSE', 'CBSE', 'ICSE', 'A-Levels', 'Others'];
    const subjectOptions = [
        'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Science',
        'Computer Science', 'Economics', 'Business Studies', 'History', 'Geography',
        'Psychology', 'Geology', 'Art', 'Music', 'Coding', 'AI', 'Others'
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: checked
                    ? [...prev[name], value]
                    : prev[name].filter(item => item !== value)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleFileChange = (e, fileType) => {
        const file = e.target.files[0];
        if (fileType === 'cv') {
            if (file && (file.type === 'application/pdf' || file.type.includes('document'))) {
                if (file.size <= 10 * 1024 * 1024) { // 10MB
                    setFormData(prev => ({
                        ...prev,
                        cvFileName: file.name
                    }));
                } else {
                    alert('CV file size must be less than 10MB');
                }
            } else {
                alert('Please upload a PDF or document file for CV');
            }
        } else if (fileType === 'video') {
            if (file && file.type.includes('video')) {
                if (file.size <= 100 * 1024 * 1024) { // 100MB
                    setFormData(prev => ({
                        ...prev,
                        videoFileName: file.name
                    }));
                } else {
                    alert('Video file size must be less than 100MB');
                }
            } else {
                alert('Please upload a video file');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            if (isLogin) {
                // Login existing tutor
                await signInWithEmailAndPassword(auth, formData.email, formData.password);
                setSubmitStatus({
                    type: 'success',
                    message: 'Login successful! Welcome back.'
                });
            } else {
                // Register new tutor
                if (formData.password !== formData.confirmPassword) {
                    throw new Error('Passwords do not match');
                }

                if (formData.curriculums.length === 0) {
                    throw new Error('Please select at least one curriculum');
                }

                if (formData.subjects.length === 0) {
                    throw new Error('Please select at least one subject');
                }

                if (!formData.cvFileName) {
                    throw new Error('Please upload your CV');
                }

                // Create user account
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                const tutorId = userCredential.user.uid;

                // Save tutor data to Firebase Realtime Database
                const tutorData = {
                    uid: tutorId,
                    fullName: formData.fullName,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    whatsappNumber: formData.whatsappNumber,
                    location: `${formData.city}, ${formData.country}`,
                    qualification: formData.qualification,
                    specialization: formData.specialization,
                    university: formData.university,
                    hasExperience: formData.hasExperience,
                    experienceYears: formData.experienceYears,
                    curriculums: formData.curriculums,
                    subjects: formData.subjects,
                    hasEquipment: formData.hasEquipment,
                    comfortableWithTools: formData.comfortableWithTools,
                    portfolioLink: formData.portfolioLink,
                    cvFileName: formData.cvFileName,
                    videoFileName: formData.videoFileName || '',
                    registeredAt: new Date().toISOString(),
                    status: 'pending',
                    type: 'tutor'
                };

                // Push to tutorRegistrations node
                const tutorRegistrationsRef = ref(database, 'tutorRegistrations');
                const newTutorRef = push(tutorRegistrationsRef);
                await set(newTutorRef, tutorData);

                setSubmitStatus({
                    type: 'success',
                    message: 'Registration successful! Your application is under review. We will contact you soon.'
                });

                // Reset form
                setFormData({
                    fullName: '', email: '', password: '', confirmPassword: '',
                    phoneNumber: '', whatsappNumber: '', city: '', country: '',
                    qualification: '', specialization: '', university: '', hasExperience: '',
                    experienceYears: '', curriculums: [], subjects: [], hasEquipment: '',
                    comfortableWithTools: '', portfolioLink: '', cvFileName: '', videoFileName: ''
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
                <div className="auth-container tutor-auth">
                    <div className="auth-header">
                        <h2>
                            <i className="bi bi-person-check text-primary me-2"></i>
                            Tutor {isLogin ? 'Login' : 'Registration'}
                        </h2>
                        <p>
                            {isLogin
                                ? 'Welcome back! Sign in to access your tutor dashboard.'
                                : 'Join our team of expert educators and make a difference in students\' lives.'
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
                            Apply as Tutor
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
                                <div className="personal-info-section">
                                    <h5 className="section-title">
                                        <i className="bi bi-person me-2"></i>Personal Information
                                    </h5>

                                    <div className="form-group">
                                        <label className="form-label">Full Name *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Email Address *</label>
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
                                                <label className="form-label">Phone Number *</label>
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

                                    <div className="form-group">
                                        <label className="form-label">WhatsApp Number *</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="whatsappNumber"
                                            value={formData.whatsappNumber}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter WhatsApp number"
                                        />
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

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Password *</label>
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
                                                <label className="form-label">Confirm Password *</label>
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
                                </div>

                                <div className="qualification-section">
                                    <h5 className="section-title">
                                        <i className="bi bi-mortarboard me-2"></i>Educational Background
                                    </h5>

                                    <div className="form-group">
                                        <label className="form-label">Highest Qualification *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="qualification"
                                            value={formData.qualification}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="e.g., Master's in Mathematics, PhD in Physics"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Specialization / Subject Area *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="specialization"
                                            value={formData.specialization}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="e.g., Mathematics, Physics, Chemistry"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">College/University Attended *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="university"
                                            value={formData.university}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter university/college name"
                                        />
                                    </div>
                                </div>

                                <div className="experience-section">
                                    <h5 className="section-title">
                                        <i className="bi bi-briefcase me-2"></i>Teaching Experience
                                    </h5>

                                    <div className="form-group">
                                        <label className="form-label">Do you have prior teaching experience? *</label>
                                        <div className="form-check-group">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="hasExperience"
                                                    value="yes"
                                                    id="experienceYes"
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="experienceYes">
                                                    Yes
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="hasExperience"
                                                    value="no"
                                                    id="experienceNo"
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="experienceNo">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {formData.hasExperience === 'yes' && (
                                        <div className="form-group">
                                            <label className="form-label">How many years of experience? *</label>
                                            <select
                                                className="form-select"
                                                name="experienceYears"
                                                value={formData.experienceYears}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">Select experience</option>
                                                <option value="0-1">0-1 years</option>
                                                <option value="1-3">1-3 years</option>
                                                <option value="3-5">3-5 years</option>
                                                <option value="5-10">5-10 years</option>
                                                <option value="10+">10+ years</option>
                                            </select>
                                        </div>
                                    )}

                                    <div className="form-group">
                                        <label className="form-label">Which curriculum(s) have you taught before? *</label>
                                        <div className="curriculum-grid">
                                            {curriculumOptions.map(curriculum => (
                                                <div key={curriculum} className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={curriculum}
                                                        id={`curriculum-${curriculum}`}
                                                        name="curriculums"
                                                        onChange={handleInputChange}
                                                    />
                                                    <label className="form-check-label" htmlFor={`curriculum-${curriculum}`}>
                                                        {curriculum}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Subjects you can confidently teach *</label>
                                        <div className="subjects-grid">
                                            {subjectOptions.map(subject => (
                                                <div key={subject} className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={subject}
                                                        id={`subject-${subject}`}
                                                        name="subjects"
                                                        onChange={handleInputChange}
                                                    />
                                                    <label className="form-check-label" htmlFor={`subject-${subject}`}>
                                                        {subject}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="technical-section">
                                    <h5 className="section-title">
                                        <i className="bi bi-laptop me-2"></i>Technical Requirements
                                    </h5>

                                    <div className="form-group">
                                        <label className="form-label">Do you have a laptop/desktop with stable internet connection? *</label>
                                        <div className="form-check-group">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="hasEquipment"
                                                    value="yes"
                                                    id="equipmentYes"
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="equipmentYes">
                                                    Yes
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="hasEquipment"
                                                    value="no"
                                                    id="equipmentNo"
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="equipmentNo">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Are you comfortable using Zoom/Google Meet/Whiteboard tools? *</label>
                                        <div className="form-check-group">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="comfortableWithTools"
                                                    value="yes"
                                                    id="toolsYes"
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="toolsYes">
                                                    Yes
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="comfortableWithTools"
                                                    value="no"
                                                    id="toolsNo"
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="toolsNo">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="documents-section">
                                    <h5 className="section-title">
                                        <i className="bi bi-file-earmark me-2"></i>Documents & Portfolio
                                    </h5>

                                    <div className="form-group">
                                        <label className="form-label">Upload Your Resume/CV *</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => handleFileChange(e, 'cv')}
                                            required
                                        />
                                        <small className="form-text text-muted">
                                            Upload 1 supported file: PDF or document. Max 10 MB.
                                            <br />
                                            <strong>Note:</strong> File will be noted for manual review. Please ensure you have the CV ready for interview.
                                        </small>
                                        {formData.cvFileName && (
                                            <div className="file-info">
                                                <i className="bi bi-file-earmark-pdf text-danger me-2"></i>
                                                {formData.cvFileName}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Upload Teaching Demo Video or Portfolio (Optional)</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="video/*"
                                            onChange={(e) => handleFileChange(e, 'video')}
                                        />
                                        <small className="form-text text-muted">
                                            Upload 1 supported file: video. Max 100 MB.
                                            <br />
                                            <strong>Note:</strong> File will be noted for manual review.
                                        </small>
                                        {formData.videoFileName && (
                                            <div className="file-info">
                                                <i className="bi bi-camera-video text-primary me-2"></i>
                                                {formData.videoFileName}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Share any teaching demo video or portfolio link (Optional)</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            name="portfolioLink"
                                            value={formData.portfolioLink}
                                            onChange={handleInputChange}
                                            placeholder="https://youtube.com/watch?v=... or portfolio website"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">LinkedIn Profile URL <span className="text-muted">(Optional)</span></label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            name="linkedinLink"
                                            value={formData.linkedinLink}
                                            onChange={handleInputChange}
                                            placeholder="https://www.linkedin.com/in/your-profile"
                                        />
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
                                ? (isLogin ? 'Signing In...' : 'Submitting Application...')
                                : (isLogin ? 'Sign In' : 'Submit Application')
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
                                {isLogin ? 'Apply as Tutor' : 'Login here'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorLogin;