import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import BookDemo from './pages/BookDemo'
import About from './pages/About'
import Courses from './pages/Courses'
import Contact from './pages/Contact'
import TutorLogin from './pages/TutorLogin'
import StudentLogin from './pages/StudentLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminSignIn from './pages/AdminSignIn'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-demo" element={<BookDemo />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
         <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/tutor-login" element={<TutorLogin />} />
           <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminSignIn />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App