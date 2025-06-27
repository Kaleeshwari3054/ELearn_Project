import React from 'react';

const Contact = () => {
  return (
    <div className="contact-page" style={{ paddingTop: '80px' }}>
      <div className="container section-padding">
        <div className="text-center mb-5">
          <h1 className="text-gradient">Contact Us</h1>
          <p className="lead">Get in touch with our education experts</p>
        </div>

        <div className="row g-5">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h4 className="mb-4">Send us a Message</h4>
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Subject</label>
                      <input type="text" className="form-control" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Message</label>
                      <textarea className="form-control" rows="5" required></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary">
                        <i className="bi bi-send me-2"></i>
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h4 className="mb-4">Contact Information</h4>
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                    <i className="bi bi-envelope"></i>
                  </div>
                  <div>
                    <h6 className="mb-0">Email</h6>
                    <p className="text-muted mb-0">info@elearn.co.uk</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-success text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                    <i className="bi bi-phone"></i>
                  </div>
                  <div>
                    <h6 className="mb-0">Phone</h6>
                    <p className="text-muted mb-0">+44 20 1234 5678</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="bg-warning text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <div>
                    <h6 className="mb-0">Address</h6>
                    <p className="text-muted mb-0">London, United Kingdom</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;