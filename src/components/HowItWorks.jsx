import React from 'react'
import '../styles/HowItWorks.css'
import { FaUserPlus, FaCalendarCheck, FaHeartbeat } from 'react-icons/fa'
import { BsArrowRight } from 'react-icons/bs'

const steps = [
  {
    step: '01',
    icon: <FaUserPlus />,
    title: 'Create an Account',
    description:
      'Register yourself on our platform in just a few seconds. Fill in your basic details and get started instantly.',
  },
  {
    step: '02',
    icon: <FaCalendarCheck />,
    title: 'Book Appointment',
    description:
      'Choose your preferred doctor, select a date and time that suits you, and confirm your appointment with ease.',
  },
  {
    step: '03',
    icon: <FaHeartbeat />,
    title: 'Get Treatment',
    description:
      'Visit the hospital or consult online. Our expert doctors will provide the best care tailored to your needs.',
  },
]

const HowItWorks = () => {
  return (
    <section className="hiw-section">
      {/* Header */}
      <div className="hiw-header">
        <p className="hiw-eyebrow">Simple Process</p>
        <h2 className="hiw-title">How It Works</h2>
        <p className="hiw-subtitle">
          Get the care you need in 3 easy steps — fast, simple and hassle-free
        </p>
      </div>

      {/* Steps */}
      <div className="hiw-steps">
        {steps.map((s, index) => (
          <React.Fragment key={s.step}>
            <div className="hiw-card">
              {/* Step number */}
              <div className="hiw-step-number">{s.step}</div>

              {/* Icon circle */}
              <div className="hiw-icon-circle">
                {s.icon}
              </div>

              {/* Text */}
              <h3 className="hiw-card-title">{s.title}</h3>
              <p className="hiw-card-desc">{s.description}</p>
            </div>

            {/* Arrow between cards */}
            {index < steps.length - 1 && (
              <div className="hiw-arrow">
                <BsArrowRight />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks