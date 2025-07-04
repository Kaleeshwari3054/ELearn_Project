import React, { useEffect, useState, useRef } from 'react';
import HeroCarousel from '../components/HeroCarousel';
import '../styles/Home.css';
import CountUp from 'react-countup';

import mainLogo from '../assets/logo-remove.jpg';

const features = [
  { icon: 'bi-tv', title: 'Interactive Learning' },
  { icon: 'bi-clock-history', title: 'Flexible Class Time' },
  { icon: 'bi-signpost-split', title: 'Curated Learning Path' },
  { icon: 'bi-person-check', title: 'Qualified Faculty' },
  { icon: 'bi-headset', title: 'Dedicated Support' },
  { icon: 'bi-clipboard-data', title: 'Regular Assessment' },
];
const subjects = [
  {
    id: 1,
    title: 'Python Programming',
    level: 'BEGINNER',
    description: 'Year 2–5 • Maths, English, and Science',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: '5.0',
    reviews: '12'
  },
  {
    id: 2,
    title: 'Abacus Mental Math',
    level: 'ALL LEVELS',
    description: 'Year 6–8 • Maths, English, and Science',
    image: 'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: '4.9',
    reviews: '8'
  },
  {
    id: 3,
    title: 'Advanced Mathematics',
    level: 'ADVANCED',
    description: 'Year 9 • GCSE',
    image: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: '5.0',
    reviews: '15'
  },
  {
    id: 4,
    title: 'Science Fundamentals',
    level: 'INTERMEDIATE',
    description: 'A Level',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: '4.8',
    reviews: '11'
  },
  {
    id: 5,
    title: 'Computer Science',
    level: 'EXPERT',
    description: 'Core Coding Concepts',
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: '5.0',
    reviews: '13'
  },
  {
    id: 6,
    title: 'AI Courses',
    level: 'ALL LEVELS',
    description: 'Year 2 to A Level',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: '5.0',
    reviews: '10'
  }
];


const getLevelColor = (level) => {
  switch (level) {
    case 'BEGINNER': return 'level-beginner';
    case 'INTERMEDIATE': return 'level-intermediate';
    case 'ADVANCED': return 'level-advanced';
    case 'EXPERT': return 'level-expert';
    default: return 'level-all';
  }
};

const Home = () => {
  //   const [isVisible, setIsVisible] = useState(false);
  // const [counts, setCounts] = useState({
  //   years: 0,
  //   countries: 0,
  //   tutors: 0,
  //   students: 0
  // });

  // const sectionRef = useRef(null);

  // const statsData = [
  //   { 
  //     key: 'years',
  //     number: 4, 
  //     label: 'Years',
  //     icon: 'bi-calendar-check',
  //     color: '#ff6b35',
  //     description: 'Of Excellence'
  //   },
  //   { 
  //     key: 'countries',
  //     number: 12, 
  //     label: 'Countries',
  //     icon: 'bi-globe',
  //     color: '#4ade80',
  //     description: 'Worldwide Reach'
  //   },
  //   { 
  //     key: 'tutors',
  //     number: 2000, 
  //     label: 'Tutors',
  //     icon: 'bi-person-check',
  //     color: '#3b82f6',
  //     description: 'Expert tutors'
  //   },
  //   { 
  //     key: 'students',
  //     number: 10000, 
  //     label: 'Students',
  //     icon: 'bi-people',
  //     color: '#8b5cf6',
  //     description: 'Happy Learners'
  //   }
  // ];

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting && !isVisible) {
  //         setIsVisible(true);
  //         startCounting();
  //       }
  //     },
  //     { threshold: 0.3 }
  //   );

  //   if (sectionRef.current) {
  //     observer.observe(sectionRef.current);
  //   }

  //   return () => {
  //     if (sectionRef.current) {
  //       observer.unobserve(sectionRef.current);
  //     }
  //   };
  // }, [isVisible]);

  // const startCounting = () => {
  //   statsData.forEach((stat) => {
  //     const duration = 2000; // 2 seconds
  //     const steps = 60;
  //     const increment = stat.number / steps;
  //     let current = 0;
  //     let step = 0;

  //     const timer = setInterval(() => {
  //       step++;
  //       current = Math.min(Math.ceil(increment * step), stat.number);

  //       setCounts(prev => ({
  //         ...prev,
  //         [stat.key]: current
  //       }));

  //       if (current >= stat.number) {
  //         clearInterval(timer);
  //       }
  //     }, duration / steps);
  //   });
  // };


  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const statsData = [
    {
      number: 78,
      suffix: '+',
      label: 'Classes Complete',
      icon: 'bi-building'
    },
    {
      number: 20,
      suffix: 'k',
      label: 'Total Students',
      icon: 'bi-people'
    },
    {
      number: 400,
      suffix: 'k',
      label: 'Library Books',
      icon: 'bi-book'
    },
    {
      number: 1200,
      suffix: '+',
      label: 'Certified tutors',
      icon: 'bi-award'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);


  return (
    <div className="home-page">
      <HeroCarousel />
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4 justify-content-center">

            {/* Recognized By Box */}
            <div className="col-lg-6">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 d-flex flex-column align-items-center">
                <h4 className="mb-4 fst-italic text-secondary">Recognized By</h4>
                <div className="d-flex justify-content-evenly align-items-center w-100 flex-wrap gap-3">
                  <img src="https://clapslearn.com/wp-content/uploads/2024/11/Untitled-design-png.webp" alt="Logo 1" style={{ maxHeight: '100px', maxWidth: '120px' }} />
                  <img src="https://clapslearn.com/wp-content/uploads/2024/11/544-png.webp" alt="Logo 2" style={{ maxHeight: '100px', maxWidth: '120px' }} />
                  <img src="https://clapslearn.com/wp-content/uploads/2024/06/5.png" alt="Logo 3" style={{ maxHeight: '100px', maxWidth: '120px' }} />
                </div>
              </div>
            </div>

            {/* Certifications Box */}
            <div className="col-lg-6">
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 d-flex flex-column align-items-center">
                <h4 className="mb-4 fst-italic text-secondary">Certifications</h4>
                <div className="d-flex justify-content-evenly align-items-center w-100 flex-wrap gap-3">
                  <img src="https://clapslearn.com/wp-content/uploads/2024/06/6.png" alt="Cert 1" style={{ maxHeight: '100px', maxWidth: '120px' }} />
                  <img src="https://clapslearn.com/wp-content/uploads/2024/06/4.png" alt="Cert 2" style={{ maxHeight: '100px', maxWidth: '120px' }} />
                  <img src="https://clapslearn.com/wp-content/uploads/2024/06/7.png" alt="Cert 3" style={{ maxHeight: '100px', maxWidth: '120px' }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* welcome page nad intro with image */}

      <section className="elearn-hero-section py-5">
        <div className="container">
          <div className="row align-items-center">

            {/* LEFT SIDE - Images and Badge */}
            <div className="col-lg-6 position-relative text-center text-lg-start image-wrapper">
              <img
                src={mainLogo}
                alt="Main Logo"
                className="main-img"
              />

              <img
                src="https://clapslearn.com/wp-content/uploads/2025/06/10000-1.webp"
                alt="Overlay"
                className="img-fluid small-img"
                id='small-img'
              />
              {/* <div className="experience-badge shadow">
              <h2 className="text-success fw-bold mb-0">9+</h2>
              <p className="mb-0 text-muted small">YEARS EXPERIENCE<br /><strong>JUST ACHIEVED</strong></p>
            </div> */}
            </div>

            {/* RIGHT SIDE - Content */}
            <div className="col-lg-6 mt-5 mt-lg-0">
              <span className="badge bg-light text-primary mb-3 px-3 py-2">WELCOME!</span>
              <h2 className="fw-bold text-success mb-3">
                Learn whenever, anyplace, <br /> at your own speed.
              </h2>
              <p className="fst-italic text-muted border-start ps-3 border-4 border-primary">
                A place to empower students with deep knowledge and skills in an unpredictable world.
              </p>
              <p className="text-muted mt-3">
                Join a vibrant learning platform designed for success. Live sessions, real results, and global reach for every learner.
              </p>

              <div className="row mt-4">
                <div className="col-md-6 d-flex align-items-center mb-3">
                  <i className="bi bi-telephone-fill text-danger fs-4 me-3"></i>
                  <div>
                    <strong>Phone Number</strong><br />
                    +91 9600451093
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-center mb-3">
                  <i className="bi bi-envelope-fill text-warning fs-4 me-3"></i>
                  <div>
                    <strong>Email Address</strong><br />
                    nestonlineschooluk@gmail.com
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      <section className="counting-stats section-padding" ref={sectionRef}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <section className="d-flex justify-content-center align-items-center">
                <h2 className="section-title text-center">
                  Our <span className="text-primary">Achievements</span>
                </h2>
              </section>

              <p className="section-subtitle">
                Numbers that speak for our excellence in education
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            {statsData.map((stat, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-sm-6 mb-4">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className={`bi ${stat.icon}`}></i>
                  </div>
                  <div className="stat-content">
                    <div className="stat-number">
                      <CountUp
                        start={0}
                        end={stat.number}
                        duration={2}
                        suffix={stat.suffix}
                        enableScrollSpy
                        scrollSpyDelay={300}
                      />
                    </div>

                    <p className="stat-label">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="stats-section" ref={sectionRef}>
      <div className="stats-background"></div>
      <div className="stats-overlay"></div>
      
      <div className="container">
        <div className="row text-center mb-5">
          <div className="col-lg-8 mx-auto">
            <div className="stats-header">
              <span className="stats-badge">OUR ACHIEVEMENTS</span>
              <h2 className="stats-title">Success in Numbers</h2>
              <p className="stats-description">
                Trusted by thousands of students worldwide for quality education and proven results
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {statsData.map((stat, index) => (
            <div key={stat.key} className="col-lg-3 col-md-6">
              <div className="stat-card" style={{ '--delay': `${index * 0.2}s`, '--color': stat.color }}>
                <div className="stat-icon-wrapper">
                  <i className={`bi ${stat.icon} stat-icon`}></i>
                  <div className="stat-icon-bg"></div>
                </div>
                
                <div className="stat-content">
                  <div className="stat-number">
                    {formatNumber(counts[stat.key], stat.key)}
                  </div>
                  <h4 className="stat-label">{stat.label}</h4>
                  <p className="stat-description">{stat.description}</p>
                </div>
                
                <div className="stat-progress">
                  <div 
                    className="stat-progress-bar"
                    style={{ 
                      width: isVisible ? '100%' : '0%',
                      backgroundColor: stat.color
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-5">
          <div className="col-12 text-center">
            <div className="stats-cta">
              <h3 className="cta-title">Ready to Join Our Success Story?</h3>
              <p className="cta-description">
                Start your learning journey with the UK's premier online education platform
              </p>
              <div className="cta-buttons">
                <a href="/book-demo" className="btn btn-primary btn-lg me-3">
                  <i className="bi bi-calendar-check me-2"></i>
                  Book Free Demo
                </a>
                <a href="/courses" className="btn btn-outline-light btn-lg">
                  <i className="bi bi-grid-3x3-gap me-2"></i>
                  View Courses
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> */}
      {/* Features Section */}
    <section className="py-5 bg-light" id="features">
  <div className="container text-center">
    <h2 className="fw-bold text-primary mb-3">
      Why Choose <span className="text-gradient">ELearn?</span>
    </h2>
    <p className="lead text-secondary mb-5">
      Learn from top educators with interactive tools and proven results.
    </p>

    <div className="row g-4">
      {[
        {
          title: "Qualified Tutors",
          img: "https://www.qualifiedtutor.org/wp-content/uploads/2025/03/Untitled-design-38-1080x675.png",
          text: "Certified experts in British and Indian curriculum."
        },
        {
          title: "Interactive Learning",
          img: "https://images.stockcake.com/public/7/e/b/7ebe8c67-0ced-432a-bee9-fa028434ce22_large/interactive-learning-experience-stockcake.jpg",
          text: "Live virtual classrooms with modern tools."
        },
        {
          title: "Proven Results",
          img: "https://www.shutterstock.com/image-vector/proven-results-sticker-isolated-on-600w-25924036.jpg",
          text: "Track record of academic success."
        }
      ].map((item, i) => (
        <div className="col-md-6 col-lg-4" key={i}>
          <div className="card h-100 shadow-sm border-0 p-4">
            <div className="mx-auto mb-3 rounded-circle overflow-hidden" style={{ width: 100, height: 100 }}>
              <img src={item.img} alt={item.title} className="w-100 h-100 object-fit-cover" />
            </div>
            <h5 className="fw-semibold">{item.title}</h5>
            <p className="text-muted mb-0">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* online courses */}
      <section className="subjects-section section-padding">

        <div className="container">


          <div className="row g-4">
            <div className="section-heading">
              <h2 className="main-title">Best Online Tuition</h2>
              <h3 className="sub-title">Subjects</h3>
              <p className="description">
                Comprehensive online tutoring from <strong>Year 2 to A Level</strong> across all subjects with expert UK tutors.
              </p>
            </div>

            {subjects.map((subject) => (
              <div key={subject.id} className="col-lg-4 col-md-6">
                <div className="subject-card">
                  <div className="card-image-wrapper">
                    <img
                      src={subject.image}
                      alt={subject.title}
                      className="card-image"
                    />
                    <div className="card-overlay">
                      <button className="favorite-btn">
                        <i className="bi bi-heart"></i>
                      </button>
                      <span className={`level-badge ${getLevelColor(subject.level)}`}>
                        {subject.level}
                      </span>
                    </div>
                  </div>

                  <div className="card-content text-center">


                    <h4 className="subject-title">{subject.title}</h4>
                    <p className="text-muted small">{subject.description}</p>

                    <div className="subject-meta d-flex justify-content-center mb-3">
                      <div className="meta-item rating">
                        <i className="bi bi-star-fill text-warning"></i>
                        <span>{subject.rating} ({subject.reviews})</span>
                      </div>
                    </div>

                    <div className="card-footer d-flex justify-content-center">
                      <button className="enroll-btn">
                        <i className="bi bi-calendar-check me-2"></i>
                        Book Demo
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>



          {/* <div className="text-center mt-5">
            <button className="btn btn-primary btn-lg">
              <i className="bi bi-grid-3x3-gap me-2"></i>
              View All Subjects
            </button>
          </div> */}
        </div >
      </section >

      {/* popular history */}

      < section className="features-section" >
        <div className="features-background-overlay"></div>
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-lg-8 mx-auto">
              <div className="features-header">
                <span className="features-badge">INSTRUCTORS</span>
                <h2 className="features-title">Our Features</h2>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {features.map((feature) => (
              <div key={feature.id} className="col-lg-4 col-md-6">
                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <i className={`bi ${feature.icon} feature-icon`}></i>
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-title">{feature.title}</h4>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Subjects Section */}
      {/* <section className="section-padding bg-light" id="subjects">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-lg-8 mx-auto">
              <h2 className="text-gradient">Our Subjects</h2>
              <p className="lead">Comprehensive coverage across all major subjects and curriculum boards</p>
            </div>
          </div>

          <div className="row g-4">
            {[
              { icon: 'calculator', subject: 'Mathematics', desc: 'Algebra, Geometry, Calculus' },
              { icon: 'atom', subject: 'Science', desc: 'Physics, Chemistry, Biology' },
              { icon: 'book', subject: 'English', desc: 'Literature, Grammar, Writing' },
              { icon: 'globe', subject: 'Social Studies', desc: 'History, Geography, Civics' },
              { icon: 'cpu', subject: 'Computer Science', desc: 'Programming, IT, Digital Skills' },
              { icon: 'translate', subject: 'Languages', desc: 'Hindi, French, Spanish' }
            ].map((item, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <i className={`bi bi-${item.icon} text-primary fs-1 mb-3`}></i>
                    <h5>{item.subject}</h5>
                    <p className="text-muted">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      <section className="exam-board-section py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-5 exam-heading">Choose your exam board</h2>

          <div className="scroll-wrapper">
            <div className="scroll-track d-flex align-items-center">
              {/* Original + Duplicate Items for seamless loop */}
              {[...Array(2)].flatMap((_, i) =>
                [
                  { name: "AQA", icon: "fas fa-graduation-cap", color: "text-primary" },
                  { name: "CCEA", icon: "fas fa-certificate", color: "text-danger" },
                  { name: "Edexcel", icon: "fas fa-book-open", color: "text-warning" },
                  { name: "Eduqas", icon: "fas fa-university", color: "text-success" },
                  { name: "OCR", icon: "fas fa-pen-nib", color: "text-info" },
                  { name: "WJEC", icon: "fas fa-award", color: "text-dark" }
                ].map((exam, index) => (
                  <div className="exam-box text-center mx-4" key={`${i}-${index}`}>
                    <div className={`icon-box ${exam.color}`}>
                      <i className={`${exam.icon}`}></i>
                    </div>
                    <p className="exam-name mt-3">{exam.name}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>


    </div >
  );
};

export default Home;