import React from 'react'
import '../styles/Departments.css'
import { GiKidneys, GiHeartOrgan, GiLungs, GiTooth } from 'react-icons/gi'
import { FaBrain } from 'react-icons/fa'
import { TbBone } from 'react-icons/tb'

const departments = [
  { name: 'Urology',     icon: <GiKidneys /> },
  { name: 'Cardiology',  icon: <GiHeartOrgan /> },
  { name: 'Pulmonology', icon: <GiLungs /> },
  { name: 'Dentistry',   icon: <GiTooth /> },
  { name: 'Neurology',   icon: <FaBrain /> },
  { name: 'Orthopedics', icon: <TbBone /> },
]

const Departments = () => {
  return (
    <section className="dept-section">
      <div className="dept-header" data-aos="fade-up">
        <h2 className="dept-title">Department Category</h2>
        <p className="dept-subtitle">
          Browse by department for tailored services and expert solutions
        </p>
      </div>
      <div className="dept-grid">
        {departments.map((dept) => (
          <div className="dept-card" key={dept.name} data-aos='zoom-in'>
            <div className="dept-icon">{dept.icon}</div>
            <p className="dept-name">{dept.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Departments