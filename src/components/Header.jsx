// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/Header.css';

// const Header = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? 'navbar-scrolled' : ''}`}>
//       <div className="container d-flex align-items-center">
        
//         {/* Logo */}
//         <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
//           <i className="bi bi-mortarboard-fill fs-4 logo-icon"></i>
//           <span className="fw-bold fs-5 brand-text">eLEARN</span>
//         </Link>

//         {/* Mobile toggle */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Nav links */}
//         <div className={`collapse navbar-collapse justify-content-between ${isMobileMenuOpen ? 'show' : ''}`}>
//           <ul className="navbar-nav mx-auto gap-lg-4">
//             <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
//             <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>

//             <li className="nav-item dropdown">
//               <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Courses</a>
//               <ul className="dropdown-menu">
//                 <li><a className="dropdown-item" href="#"><i className="bi bi-calculator me-2"></i>Mathematics</a></li>
//                 <li><a className="dropdown-item" href="#"><i className="bi bi-atom me-2"></i>Science</a></li>
//                 <li><a className="dropdown-item" href="#"><i className="bi bi-book me-2"></i>English</a></li>
//                 <li><a className="dropdown-item" href="#"><i className="bi bi-globe me-2"></i>Social Studies</a></li>
//                 <li><hr className="dropdown-divider" /></li>
//                 <li><a className="dropdown-item" href="#"><i className="bi bi-star me-2"></i>All Subjects</a></li>
//               </ul>
//             </li>

//             <li className="nav-item dropdown">
//               <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Curriculum Boards</a>
//               <ul className="dropdown-menu">
//                 <li><a className="dropdown-item" href="#"><i className="bi bi-flag me-2"></i>CBSE</a></li>
//                 <li><a className="dropdown-item" href="#"><i className="bi bi-geo-alt me-2"></i>Kerala Board</a></li>
//                 <li><a className="dropdown-item" href="#"><i className="bi bi-building me-2"></i>ICSE</a></li>
//                 <li><a className="dropdown-item" href="#"><i className="bi bi-globe-europe-africa me-2"></i>IGCSE</a></li>
//                 <li><a className="dropdown-item" href="#"><i className="bi bi-mortarboard me-2"></i>A-Levels</a></li>
//               </ul>
//             </li>

//             <li className="nav-item"><a className="nav-link" href="#tutors">Tutors</a></li>
//             <li className="nav-item"><a className="nav-link" href="#blog">Blog</a></li>
//             <li className="nav-item"><a className="nav-link" href="#careers">Careers</a></li>
//             <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
//           </ul>

//           {/* Right button */}
//           <div className="ms-lg-4 mt-3 mt-lg-0">
//             <Link to="/book-demo" className="btn-bookdemo">
//               <i className="bi bi-plus-circle me-2"></i>Book A Demo
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;




import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-mortarboard-fill me-2"></i>
          <span className="brand-text">ELearn</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">HOME</Link>
            </li>
            
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                PAGES
                <i className="bi bi-chevron-down ms-1"></i>
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/about"><i className="bi bi-info-circle me-2"></i>About Us</Link></li>
                <li><Link className="dropdown-item" to="/contact"><i className="bi bi-envelope me-2"></i>Contact</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-star me-2"></i>Success Stories</a></li>
              </ul>
            </li>
            
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                COURSES
                <i className="bi bi-chevron-down ms-1"></i>
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#"><i className="bi bi-calculator me-2"></i>Mathematics</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-atom me-2"></i>Science</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-book me-2"></i>English</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-code-slash me-2"></i>Python Programming</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-123 me-2"></i>Abacus</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-laptop me-2"></i>Computer Science</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-mortarboard me-2"></i>Year 2 to A Level</a></li>
              </ul>
            </li>
            
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                EVENTS
                <i className="bi bi-chevron-down ms-1"></i>
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#"><i className="bi bi-calendar-event me-2"></i>Upcoming Events</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-camera-video me-2"></i>Webinars</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-trophy me-2"></i>Competitions</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-calendar-check me-2"></i>Event Calendar</a></li>
              </ul>
            </li>
            
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                PORTFOLIO
                <i className="bi bi-chevron-down ms-1"></i>
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#"><i className="bi bi-flag me-2"></i>CBSE</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-geo-alt me-2"></i>Kerala Board</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-building me-2"></i>ICSE</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-globe-europe-africa me-2"></i>IGCSE</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-mortarboard me-2"></i>A-Levels</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-plus-circle me-2"></i>Others</a></li>
              </ul>
            </li>
            
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                BLOG
                <i className="bi bi-chevron-down ms-1"></i>
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#"><i className="bi bi-newspaper me-2"></i>Latest Articles</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-lightbulb me-2"></i>Study Tips</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-graph-up me-2"></i>Success Stories</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-rss me-2"></i>All Posts</a></li>
              </ul>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/contact">CONTACT</Link>
            </li>
          </ul>

          <div className="navbar-actions ">
           
            <Link to="/book-demo" className="btn btn-apply ">
              <i className="bi bi-person-plus me-2"></i>
             Book a Demo
            </Link>

            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;