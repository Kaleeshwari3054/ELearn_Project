import React ,{useEffect,useState,useRef}from 'react';
import HeroCarousel from '../components/HeroCarousel';
import '../styles/Home.css';

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
    category: 'CODING',
    lessons: '15 Lessons',
    students: '45',
    rating: '5.0',
    reviews: '12',
    level: 'BEGINNER',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    instructor: {
      name: 'John Smith',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  },
  {
    id: 2,
    title: 'Abacus Mental Math',
    category: 'MATHEMATICS',
    lessons: '12 Lessons',
    students: '38',
    rating: '4.9',
    reviews: '8',
    level: 'ALL LEVELS',
    image: 'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=400',
    instructor: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  },
  {
    id: 3,
    title: 'Advanced Mathematics',
    category: 'MATHEMATICS',
    lessons: '20 Lessons',
    students: '52',
    rating: '5.0',
    reviews: '15',
    level: 'ADVANCED',
    image: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=400',
    instructor: {
      name: 'Michael Brown',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  },
  {
    id: 4,
    title: 'Science Fundamentals',
    category: 'SCIENCE',
    lessons: '18 Lessons',
    students: '41',
    rating: '4.8',
    reviews: '11',
    level: 'INTERMEDIATE',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    instructor: {
      name: 'Dr. Emily Davis',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  },
  {
    id: 5,
    title: 'English Literature',
    category: 'ENGLISH',
    lessons: '16 Lessons',
    students: '35',
    rating: '4.9',
    reviews: '9',
    level: 'ALL LEVELS',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    instructor: {
      name: 'James Wilson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  },
  {
    id: 6,
    title: 'Computer Science',
    category: 'TECHNOLOGY',
    lessons: '22 Lessons',
    students: '48',
    rating: '5.0',
    reviews: '13',
    level: 'EXPERT',
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
    instructor: {
      name: 'Alex Thompson',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
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
  //     description: 'Expert Teachers'
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
      label: 'Certified Teachers',
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

  const formatNumber = (num, key) => {
    if (key === 'tutors' && num >= 1000) {
      return `${Math.floor(num / 1000)}K+`;
    }
    if (key === 'students' && num >= 1000) {
      return `${Math.floor(num / 1000)}K+`;
    }
    return num.toString();
  };
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
                src="https://clapslearn.com/wp-content/uploads/2025/05/cbse-1200.webp"
                alt="Main"
                className="img-fluid main-img"
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
                    (123)-456-789
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-center mb-3">
                  <i className="bi bi-envelope-fill text-warning fs-4 me-3"></i>
                  <div>
                    <strong>Email Address</strong><br />
                    Info@mail.com
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
            <h2 className="section-title">
              Our <span className="text-primary">Achievements</span>
            </h2>
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
                    <div
                      target={stat.number} 
                      isVisible={isVisible}
                      suffix={stat.suffix}
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
      <section className="section-padding" id="features">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-lg-8 mx-auto">
              <h2 className="text-gradient">Why Choose ELearn?</h2>
              <p className="lead">Experience the best in online education with our comprehensive learning platform</p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="card border-0 shadow-sm h-100 text-center p-4">
                <div className="card-body">
                  <div className="bg-primary bg-gradient rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                    <i className="bi bi-person-check text-white fs-2"></i>
                  </div>
                  <h5>Qualified Teachers</h5>
                  <p className="text-muted">Expert educators with proven track records in British and Indian curriculum</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card border-0 shadow-sm h-100 text-center p-4">
                <div className="card-body">
                  <div className="bg-success bg-gradient rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                    <i className="bi bi-laptop text-white fs-2"></i>
                  </div>
                  <h5>Interactive Learning</h5>
                  <p className="text-muted">Engaging virtual classrooms with advanced tools and real-time interaction</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card border-0 shadow-sm h-100 text-center p-4">
                <div className="card-body">
                  <div className="bg-warning bg-gradient rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                    <i className="bi bi-graph-up-arrow text-white fs-2"></i>
                  </div>
                  <h5>Proven Results</h5>
                  <p className="text-muted">Track record of excellent grades and improved academic performance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* online courses */}
      <section className="subjects-section section-padding">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-lg-8 mx-auto">
              <h2 className="section-title">Best Online Tuition</h2>
              <h3 className="section-subtitle">Subjects</h3>
              <p className="section-description">
                Comprehensive online tutoring from Year 2 to A Level across all subjects with expert UK teachers
              </p>
            </div>
          </div>

          <div className="row g-4">
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

                  <div className="card-content">
                    <div className="instructor-info">

                    </div>

                    <h4 className="subject-title">{subject.title}</h4>

                    <div className="subject-meta">
                      <div className="meta-item">
                        <i className="bi bi-journal-text"></i>
                        <span>{subject.lessons}</span>
                      </div>
                      <div className="meta-item">
                        <i className="bi bi-people"></i>
                        <span>{subject.students}</span>
                      </div>
                      <div className="meta-item rating">
                        <i className="bi bi-star-fill"></i>
                        <span>{subject.rating}({subject.reviews})</span>
                      </div>
                    </div>

                    <div className="card-footer">
                      {/* <div className="price">
                      <span className="price-amount">{subject.price}</span>
                    </div> */}
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

          <div className="text-center mt-5">
            <button className="btn btn-primary btn-lg">
              <i className="bi bi-grid-3x3-gap me-2"></i>
              View All Subjects
            </button>
          </div>
        </div>
      </section>

      {/* popular history */}

      <section className="features-section">
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
      </section>

      {/* Subjects Section */}
      <section className="section-padding bg-light" id="subjects">
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
      </section>
      
    </div>
  );
};

export default Home;