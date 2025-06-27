import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import '../styles/BookDemo.css';

const BookDemo = () => {
  const [formData, setFormData] = useState({
    syllabus: '',
    studentName: '',
    subject: '',
    whatsappNumber: '',
    className: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Validate form data
      if (!formData.syllabus || !formData.studentName || !formData.subject || 
          !formData.whatsappNumber || !formData.className) {
        throw new Error('Please fill in all required fields');
      }

      // Add demo request to Firebase
      const docRef = await addDoc(collection(db, 'demoRequests'), {
        ...formData,
        submittedAt: new Date(),
        status: 'pending'
      });

      console.log('Demo request submitted with ID: ', docRef.id);
      
      setSubmitStatus({
        type: 'success',
        message: 'Your demo request has been submitted successfully! We will contact you soon.'
      });
      
      // Reset form
      setFormData({
        syllabus: '',
        studentName: '',
        subject: '',
        whatsappNumber: '',
        className: ''
      });

    } catch (error) {
      console.error('Error submitting demo request: ', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to submit demo request. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="book-demo-page">
      <div className="container">
        <div className="demo-form-container">
          <div className="demo-form-header">
            <h2>
              <i className="bi bi-calendar-check text-primary me-2"></i>
              Book A Demo Class
            </h2>
            <p>Start your learning journey with a free personalized demo session</p>
          </div>

          {submitStatus.message && (
            <div className={`${submitStatus.type === 'success' ? 'success-message' : 'error-message'}`}>
              <i className={`bi bi-${submitStatus.type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2`}></i>
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="syllabus">
                <i className="bi bi-book me-2"></i>
                Syllabus *
              </label>
              <select
                className="form-select"
                id="syllabus"
                name="syllabus"
                value={formData.syllabus}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Curriculum Board</option>
                <option value="CBSE">CBSE</option>
                <option value="Kerala">Kerala Board</option>
                <option value="ICSE">ICSE</option>
                <option value="IGCSE">IGCSE</option>
                <option value="A-Levels">A-Levels</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="studentName">
                <i className="bi bi-person me-2"></i>
                Student Name *
              </label>
              <input
                type="text"
                className="form-control"
                id="studentName"
                name="studentName"
                placeholder="Enter student name"
                value={formData.studentName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="subject">
                <i className="bi bi-journal-text me-2"></i>
                Subject *
              </label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                placeholder="Enter subject (e.g., Mathematics, Science)"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="whatsappNumber">
                <i className="bi bi-whatsapp me-2"></i>
                WhatsApp Number *
              </label>
              <div className="phone-input-group">
                <span className="country-code">+91</span>
                <input
                  type="tel"
                  className="form-control"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  placeholder="Enter mobile number"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  pattern="[0-9]{10}"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="className">
                <i className="bi bi-mortarboard me-2"></i>
                Class *
              </label>
              <input
                type="text"
                className="form-control"
                id="className"
                name="className"
                placeholder="Enter class name (e.g., Class 10, Year 11)"
                value={formData.className}
                onChange={handleInputChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting && <span className="loading-spinner"></span>}
              <i className="bi bi-send me-2"></i>
              {isSubmitting ? 'Submitting...' : 'Submit Demo Request'}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted">
              <i className="bi bi-shield-check me-2"></i>
              Your information is secure and will only be used to contact you about the demo session.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDemo;