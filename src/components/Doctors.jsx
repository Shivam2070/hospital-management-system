import React, { useState } from 'react'
import '../styles/Doctors.css'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'

const doctors = [
  {
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    experience: '12 Years Exp.',
    rating: 4.9,
    reviews: 320,
    available: true,
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Dr. James Williams',
    specialty: 'Neurologist',
    experience: '10 Years Exp.',
    rating: 4.7,
    reviews: 210,
    available: true,
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Dr. Emily Davis',
    specialty: 'Pulmonologist',
    experience: '8 Years Exp.',
    rating: 4.8,
    reviews: 180,
    available: false,
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Dr. Michael Brown',
    specialty: 'Orthopedic',
    experience: '15 Years Exp.',
    rating: 4.6,
    reviews: 290,
    available: true,
    img: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    name: 'Dr. Sophia Martinez',
    specialty: 'Dentist',
    experience: '6 Years Exp.',
    rating: 4.5,
    reviews: 150,
    available: true,
    img: 'https://randomuser.me/api/portraits/women/90.jpg',
  },
]

const renderStars = (rating) => {
  const stars = []
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)

  for (let i = 0; i < full; i++)
    stars.push(<FaStar key={`f${i}`} className="star filled" />)
  if (half)
    stars.push(<FaStarHalfAlt key="h" className="star half" />)
  for (let i = 0; i < empty; i++)
    stars.push(<FaRegStar key={`e${i}`} className="star empty" />)

  return stars
}

const Doctors = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section className="doctors-section">
      {/* Header */}
      <div className="doctors-header">
        <p className="doctors-eyebrow">Our Medical Team</p>
        <h2 className="doctors-title">Meet Our Specialist Doctors</h2>
        <p className="doctors-subtitle">
          Experienced professionals dedicated to your health and well-being
        </p>
      </div>

      {/* Grid */}
      <div className="doctors-grid">
        {doctors.map((doc, index) => (
          <div
            className={`doctor-card ${hoveredIndex === index ? 'hovered' : ''}`}
            key={doc.name}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Available badge */}
            <div className={`availability-badge ${doc.available ? 'available' : 'unavailable'}`}>
              <span className="badge-dot" />
              {doc.available ? 'Available' : 'Unavailable'}
            </div>

            {/* Photo */}
            <div className="doctor-img-wrap">
              <img src={doc.img} alt={doc.name} className="doctor-img" />
            </div>

            {/* Info */}
            <div className="doctor-info">
              <div className="doctor-name-row">
                <h3 className="doctor-name">{doc.name}</h3>
                <MdVerified className="verified-icon" />
              </div>
              <p className="doctor-specialty">{doc.specialty}</p>
              <p className="doctor-experience">{doc.experience}</p>

              {/* Stars */}
              <div className="doctor-rating">
                <div className="stars">{renderStars(doc.rating)}</div>
                <span className="rating-value">{doc.rating}</span>
                <span className="rating-reviews">({doc.reviews} reviews)</span>
              </div>
            </div>

            {/* Button */}
            <button className="book-btn">Book Appointment</button>
          </div>
        ))}
      </div>

      {/* View all */}
      <div className="doctors-footer">
        <button className="view-all-btn">View All Doctors</button>
      </div>
    </section>
  )
}

export default Doctors