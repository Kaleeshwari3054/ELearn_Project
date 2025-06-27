import React from 'react';

const About = () => {
  return (
    <div className="about-page" style={{ paddingTop: '80px' }}>
      <div className="container section-padding">
        <div className="row align-items-center mb-5">
          <div className="col-lg-6">
            <h1 className="text-gradient">About ELearn</h1>
            <p className="lead">
              Leading the future of online education with personalized learning experiences 
              for students across UK and India.
            </p>
            <p>
              At ELearn, we believe every student deserves access to quality education. 
              Our platform connects students with qualified teachers for one-on-one tutoring 
              sessions across all major curriculum boards including CBSE, ICSE, IGCSE, and A-Levels.
            </p>
          </div>
          <div className="col-lg-6">
            <img 
              src="https://images.pexels.com/photos/5212339/pexels-photo-5212339.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Online Learning" 
              className="img-fluid rounded shadow"
            />
          </div>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-md-4 text-center">
            <div className="bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
              <i className="bi bi-people fs-2"></i>
            </div>
            <h4>10,000+</h4>
            <p>Students Taught</p>
          </div>
          <div className="col-md-4 text-center">
            <div className="bg-success text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
              <i className="bi bi-person-check fs-2"></i>
            </div>
            <h4>500+</h4>
            <p>Qualified Teachers</p>
          </div>
          <div className="col-md-4 text-center">
            <div className="bg-warning text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
              <i className="bi bi-trophy fs-2"></i>
            </div>
            <h4>95%</h4>
            <p>Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;