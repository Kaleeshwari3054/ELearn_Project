import React, { useEffect } from 'react';
import '../styles/Hero.css';

const HeroCarousel = () => {
  useEffect(() => {
    // Ensure Bootstrap JS is loaded and initialize carousel
    const initCarousel = () => {
      const carouselElement = document.querySelector('#heroCarousel');
      if (carouselElement && window.bootstrap) {
        // Dispose any existing carousel instance
        const existingCarousel = window.bootstrap.Carousel.getInstance(carouselElement);
        if (existingCarousel) {
          existingCarousel.dispose();
        }
        
        // Create new carousel instance
        new window.bootstrap.Carousel(carouselElement, {
          interval: 3000, // 2 seconds auto-slide
          ride: 'carousel',
          wrap: true,
          keyboard: true,
          pause: 'hover'
        });
      }
    };

    // Initialize after a short delay to ensure DOM is ready
    const timer = setTimeout(initCarousel, 1000);
    
    return () => {
      clearTimeout(timer);
      // Clean up carousel instance on unmount
      const carouselElement = document.querySelector('#heroCarousel');
      if (carouselElement && window.bootstrap) {
        const carousel = window.bootstrap.Carousel.getInstance(carouselElement);
        if (carousel) {
          carousel.dispose();
        }
      }
    };
  }, []);

  const slides = [
    {
      id: 1,
      background: 'https://bridge.edu/tefl/blog/wp-content/uploads/2024/06/Best-Digital-Tools-for-Teaching-English-Online.jpg',
      smallTitle: 'Enjoy Smooth Learning',
      mainTitle: 'Study from Home – Anytime, Anywhere, with Expert Tutors!',
      subtitle: 'Achieve perfect marks in exams with one-on-one online tuition from qualified UK tutors',
      primaryBtn: 'Book A Demo',
      secondbutton: 'Learn More'
    },
    {
      id: 2,
      background: 'https://www.venkateshwaragroup.in/vgiblog/wp-content/uploads/2022/09/Untitled-design-2-1.jpg',
      smallTitle: 'Expert UK tutors',
      mainTitle: 'CBSE, ICSE, IGCSE Excellence',
      subtitle: 'Expert tutoring for all major curriculum boards with proven results and grade improvements',
      primaryBtn: 'View Courses',
      secondbutton: 'Success Stories'
    },
    {
      id: 3,
      background: 'https://images.pexels.com/photos/5427674/pexels-photo-5427674.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      smallTitle: 'Interactive Learning',
      mainTitle: 'Advanced Online Classroom',
      subtitle: 'Engaging virtual classrooms with advanced tools for effective and enjoyable learning experience',
      primaryBtn: 'Start Learning',
      secondbutton: 'Platform Tour'
    }
  ];

  return (
    <div id="heroCarousel" className="carousel slide hero-carousel" data-bs-ride="carousel">
      {/* Carousel Indicators */}
      <div className="carousel-indicators">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Carousel Inner */}
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
          >
            {/* Background Image */}
            <div 
              className="carousel-bg-image"
              style={{
                backgroundImage: `url(${slide.background})`
              }}
            ></div>
            
            {/* Content Overlay */}
            <div className="carousel-content-wrapper">
              <div className="container-fluid h-100">
                <div className="row h-100 align-items-center">
                  {/* Left Content */}
                  <div className="col-lg-6 col-md-7">
                    <div className="hero-content">
                      <div className="hero-small-title">
                        {slide.smallTitle}
                      </div>
                      <h1 className="hero-main-title">
                        {slide.mainTitle}
                      </h1>
                      <p className="hero-subtitle">
                        {slide.subtitle}
                      </p>
                      <div className="hero-buttons">
                        <a href="/book-demo" className="btn btn-hero-primary">
                          <i className="bi bi-calendar-check me-2"></i>
                          {slide.primaryBtn}
                        </a>
                        {/* <button className="btn btn-hero-outlines">
                          <i className="bi bi-play-circle me-2"></i>
                          {slide.secondbutton}
                        </button> */}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right side for image/person - handled by background */}
                  <div className="col-lg-6 col-md-5">
                    {/* This space is for the person/image which comes from background */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <button 
        className="carousel-control-prev" 
        type="button" 
        data-bs-target="#heroCarousel" 
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true">
          <i className="bi bi-chevron-left"></i>
        </span>
        <span className="visually-hidden">Previous</span>
      </button>
      
      <button 
        className="carousel-control-next" 
        type="button" 
        data-bs-target="#heroCarousel" 
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true">
          <i className="bi bi-chevron-right"></i>
        </span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HeroCarousel;