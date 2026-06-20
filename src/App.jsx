import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import Departments from './components/Departments'
import Doctors from './components/Doctors'
import HowItWorks from './components/HowItWorks'
import Appointment from './components/Appointment'
import Testimonials from './components/Testimonials'
import Login from './components/Login'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import './App.css'

const Home = () => (
  <>
    <Hero />
    <SearchBar />
    <Departments />
    <Doctors />
    <HowItWorks />
    <Testimonials />
    <Appointment />
  </>
)

function App() {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: '68px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App