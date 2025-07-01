import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <h5 className="text-primary mb-3">
              <i className="bi bi-mortarboard-fill me-2"></i>
              ELearn
            </h5>
            <p className="text-light-emphasis">
              UK's premier online education platform offering personalized tutoring 
              for CBSE, ICSE, IGCSE, and British curriculum students.
            </p>
            <div className="d-flex gap-3">
              <a href="https://www.facebook.com/share/1HguFTRy7G/" className="text-light"><i className="bi bi-facebook fs-5"></i></a>
              <a href="#" className="text-light"><i className="bi bi-twitter fs-5"></i></a>
              <a href="https://www.instagram.com/seyontechnology?igsh=Z3AzdHk0a2ZtMGNy" className="text-light"><i className="bi bi-instagram fs-5"></i></a>
              <a href="https://www.linkedin.com/posts/seyon-technology-digital-solutions_seyontech-applaunch-mobiletracker-activity-7345548751261810688-qb2Y?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAEhJoGUBegaTEHA4FJRgue-cSaot9swp-iQ&utm_campaign=whatsapp" className="text-light"><i className="bi bi-linkedin fs-5"></i></a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-primary mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light-emphasis text-decoration-none">Home</a></li>
              <li><a href="/about" className="text-light-emphasis text-decoration-none">About</a></li>
              <li><a href="/courses" className="text-light-emphasis text-decoration-none">Courses</a></li>
              <li><a href="/contact" className="text-light-emphasis text-decoration-none">Contact</a></li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="text-primary mb-3">Curriculum</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light-emphasis text-decoration-none">CBSE</a></li>
              <li><a href="#" className="text-light-emphasis text-decoration-none">ICSE</a></li>
              <li><a href="#" className="text-light-emphasis text-decoration-none">IGCSE</a></li>
              <li><a href="#" className="text-light-emphasis text-decoration-none">A-Levels</a></li>
            </ul>
          </div>
          
          <div className="col-lg-3 mb-4">
            <h6 className="text-primary mb-3">Contact Info</h6>
            <ul className="list-unstyled">
              <li className="text-light-emphasis">
                <i className="bi bi-envelope me-2"></i>
                info@elearn.co.uk
              </li>
              <li className="text-light-emphasis">
                <i className="bi bi-phone me-2"></i>
                +44 20 1234 5678
              </li>
              <li className="text-light-emphasis">
                <i className="bi bi-geo-alt me-2"></i>
                London, United Kingdom
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-secondary"/>
        
        <div className="row">
          <div className="col-md-6">
            <p className="text-light-emphasis mb-0">
              &copy; 2024 ELearn. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <a href="#" className="text-light-emphasis text-decoration-none me-3">Privacy Policy</a>
            <a href="#" className="text-light-emphasis text-decoration-none">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;