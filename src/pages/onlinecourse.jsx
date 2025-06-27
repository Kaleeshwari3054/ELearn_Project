import React from 'react';
import '../styles/SubjectsSection.css';

const SubjectsSection = () => {
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

  return (
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
                    <img 
                      src={subject.instructor.avatar} 
                      alt={subject.instructor.name}
                      className="instructor-avatar"
                    />
                    <span className="instructor-name">{subject.instructor.name}</span>
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
  );
};

export default SubjectsSection;