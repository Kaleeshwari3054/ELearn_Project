import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-phone-input-2/lib/bootstrap.css';
import PhoneInput from 'react-phone-input-2';


import { collection, addDoc } from 'firebase/firestore';
// import { db } from '../firebase/config';
import '../styles/BookDemo.css';

const BookDemo = () => {
  const [formData, setFormData] = useState({
    syllabus: '',
    studentName: '',
    subject: '',
    whatsappNumber: '',
    className: '',
    location: ''

  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const navigate = useNavigate();

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
      // ✅ Validation
      if (
        !formData.syllabus ||
        !formData.studentName ||
        !formData.subject ||
        !formData.whatsappNumber ||
        !formData.className
      ) {
        throw new Error('Please fill in all required fields');
      }

      // ✅ Add to Firestore
      const docRef = await addDoc(collection(db, 'demoSubmit'), {
        ...formData,
        submittedAt: new Date(),
      });

      console.log('Demo request submitted with ID: ', docRef.id);

      // ✅ Show success message
      setSubmitStatus({
        type: 'success',
        message: 'Your demo request has been submitted successfully!',
      });

      // ✅ Reset form
      setFormData({
        syllabus: '',
        studentName: '',
        subject: '',
        whatsappNumber: '',
        className: '',
        location: '' // 🔁 Add this if you use location input
      });

      // ✅ Redirect to home after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error('Error submitting demo request: ', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to submit demo request. Please try again.',
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
                <option value="Kerala">GCSE</option>
                <option value="ICSE">ICSE</option>
                <option value="IGCSE">IGCSE</option>
                <option value="A-Levels">A-Levels</option>
                <option value="UK Curriculum">UK Curriculum</option>
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
              <label className="form-label">
                <i className="bi bi-whatsapp me-2"></i>
                WhatsApp Number *
              </label>
              <PhoneInput
                country={'in'}
                value={formData.whatsappNumber}
                onChange={(phone) => setFormData({ ...formData, whatsappNumber: phone })}
                inputClass="form-control"
                inputStyle={{ width: '100%' }}
                enableSearch={true}
                placeholder="Enter WhatsApp number"
                inputProps={{
                  required: true,
                  name: 'whatsappNumber',
                }}
              />
            </div>




            <div className="form-group">
              <label className="form-label" htmlFor="className">
                <i className="bi bi-mortarboard me-2"></i>
                Grade *
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
            <div className="form-group">
              <label className="form-label" htmlFor="location">
                <i className="bi bi-geo-alt me-2"></i>
                Location *
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                placeholder="Enter your city or area"
                value={formData.location}
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
              {isSubmitting ? 'Submitting...' : 'Submit Demo'}
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