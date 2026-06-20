import React, { useState } from 'react'
import '../styles/Appointment.css'
import { FaUser, FaPhone, FaEnvelope, FaCalendarAlt, FaClock } from 'react-icons/fa'
import { MdLocalHospital } from 'react-icons/md'
import { supabase } from '../supabase'

const departments = ['Cardiology', 'Neurology', 'Urology', 'Pulmonology', 'Dentistry', 'Orthopedics']
const doctors = {
  Cardiology:   ['Dr. Sarah Johnson'],
  Neurology:    ['Dr. James Williams'],
  Urology:      ['Dr. Robert Wilson'],
  Pulmonology:  ['Dr. Emily Davis'],
  Dentistry:    ['Dr. Sophia Martinez'],
  Orthopedics:  ['Dr. Michael Brown'],
}
const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']

const Appointment = () => {
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    department: '', doctor: '', date: '', time: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'department' ? { doctor: '' } : {}),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await supabase
        .from('appointments')
        .insert([{
          name:       form.name,
          phone:      form.phone,
          email:      form.email,
          department: form.department,
          doctor:     form.doctor,
          date:       form.date,
          time:       form.time,
        }])

      if (error) throw error

      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
      setForm({ name: '', phone: '', email: '', department: '', doctor: '', date: '', time: '' })
    } catch (err) {
      setError('Failed to book appointment. Please try again.')
      console.error(err)
    }

    setLoading(false)
  }

  return (
    <section className="appt-section">
      <div className="appt-inner">

        {/* ── Left info panel ── */}
        <div className="appt-left" data-aos="fade-right">
          <p className="appt-eyebrow">Easy Booking</p>
          <h2 className="appt-title">Book an Appointment</h2>
          <p className="appt-desc">
            Schedule your visit with our specialist doctors quickly and easily.
            We are here to provide the best care for you and your family.
          </p>

          <div className="appt-info-cards">
            <div className="appt-info-card">
              <div className="appt-info-icon"><FaClock /></div>
              <div>
                <p className="appt-info-label">Working Hours</p>
                <p className="appt-info-value">Mon – Sat: 9:00 AM – 6:00 PM</p>
              </div>
            </div>
            <div className="appt-info-card">
              <div className="appt-info-icon"><FaPhone /></div>
              <div>
                <p className="appt-info-label">Emergency Contact</p>
                <p className="appt-info-value">+1 (800) 123-4567</p>
              </div>
            </div>
            <div className="appt-info-card">
              <div className="appt-info-icon"><MdLocalHospital /></div>
              <div>
                <p className="appt-info-label">Location</p>
                <p className="appt-info-value">123 Health Street, New York</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div className="appt-right" data-aos="fade-left">
          {submitted && (
            <div className="appt-success">
              ✅ Appointment booked successfully! We will contact you shortly.
            </div>
          )}
          {error && (
            <div className="appt-error">
              ⚠️ {error}
            </div>
          )}

          <form className="appt-form" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="appt-field">
              <label>Full Name</label>
              <div className="appt-input-wrap">
                <FaUser className="appt-input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Phone + Email */}
            <div className="appt-row">
              <div className="appt-field">
                <label>Phone Number</label>
                <div className="appt-input-wrap">
                  <FaPhone className="appt-input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your phone number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="appt-field">
                <label>Email Address</label>
                <div className="appt-input-wrap">
                  <FaEnvelope className="appt-input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Department + Doctor */}
            <div className="appt-row">
              <div className="appt-field">
                <label>Department</label>
                <div className="appt-input-wrap">
                  <MdLocalHospital className="appt-input-icon" />
                  <select name="department" value={form.department} onChange={handleChange} required>
                    <option value="">Select Department</option>
                    {departments.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="appt-field">
                <label>Doctor</label>
                <div className="appt-input-wrap">
                  <FaUser className="appt-input-icon" />
                  <select name="doctor" value={form.doctor} onChange={handleChange} required disabled={!form.department}>
                    <option value="">Select Doctor</option>
                    {(doctors[form.department] || []).map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Date + Time */}
            <div className="appt-row">
              <div className="appt-field">
                <label>Preferred Date</label>
                <div className="appt-input-wrap">
                  <FaCalendarAlt className="appt-input-icon" />
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
              <div className="appt-field">
                <label>Preferred Time</label>
                <div className="appt-input-wrap">
                  <FaClock className="appt-input-icon" />
                  <select name="time" value={form.time} onChange={handleChange} required>
                    <option value="">Select Time</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" className="appt-submit-btn" disabled={loading}>
              {loading ? 'Booking...' : 'Confirm Appointment'}
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}

export default Appointment