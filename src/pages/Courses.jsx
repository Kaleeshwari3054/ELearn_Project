import React from 'react';

const Courses = () => {
  const courses = [
    {
      title: 'CBSE Mathematics',
      level: 'Classes 6-12',
      duration: '1 Hour/Session',
      price: '₹500/session',
      features: ['Algebra & Geometry', 'Calculus', 'Trigonometry', 'Statistics'],
      image: 'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'IGCSE Science',
      level: 'Years 9-11',
      duration: '1 Hour/Session',
      price: '₹600/session',
      features: ['Physics', 'Chemistry', 'Biology', 'Lab Practicals'],
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'English Literature',
      level: 'All Levels',
      duration: '45 Min/Session',
      price: '₹450/session',
      features: ['Grammar', 'Creative Writing', 'Literature Analysis', 'Speaking Skills'],
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="courses-page" style={{ paddingTop: '80px' }}>
      <div className="container section-padding">
        <div className="text-center mb-5">
          <h1 className="text-gradient">Our Courses</h1>
          <p className="lead">Comprehensive online tutoring across all major subjects and curriculum boards</p>
        </div>

        <div className="row g-4">
          {courses.map((course, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="card border-0 shadow-sm h-100">
                <img src={course.image} className="card-img-top" alt={course.title} style={{height: '200px', objectFit: 'cover'}} />
                <div className="card-body">
                  <h5 className="card-title text-primary">{course.title}</h5>
                  <p className="text-muted mb-2">
                    <i className="bi bi-mortarboard me-2"></i>
                    {course.level}
                  </p>
                  <p className="text-muted mb-2">
                    <i className="bi bi-clock me-2"></i>
                    {course.duration}
                  </p>
                  <h6 className="text-success mb-3">{course.price}</h6>
                  <ul className="list-unstyled">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="mb-1">
                        <i className="bi bi-check-circle text-success me-2"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer bg-transparent border-0">
                  <a href="/book-demo" className="btn btn-primary w-100">Book Demo Class</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;