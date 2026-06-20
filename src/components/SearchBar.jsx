import { useState } from 'react'
import '../styles/SearchBar.css'

const options = {
  department: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology'],
  doctor:     ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown', 'Dr. Davis'],
  date:       ['Today', 'Tomorrow', 'This Week', 'This Month', 'Next Month'],
  location:   ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
}

const dropdowns = [
  { key: 'department', label: 'Select Department' },
  { key: 'doctor',     label: 'Select Doctor'     },
  { key: 'date',       label: 'Select Date'       },
  { key: 'location',   label: 'Select Location'   },
]

export default function SearchBar() {
  const [selected, setSelected] = useState({
    department: '',
    doctor: '',
    date: '',
    location: '',
  })
  const [open, setOpen] = useState(null)

  const toggle = (key) => setOpen(open === key ? null : key)

  const select = (key, val) => {
    setSelected((prev) => ({ ...prev, [key]: val }))
    setOpen(null)
  }

  return (
    <div className="searchbar-wrapper" data-aos="fade-up" onClick={() => setOpen(null)}>
      <div className="searchbar" onClick={(e) => e.stopPropagation()}>

        {dropdowns.map(({ key, label }) => (
          <div className="dropdown-wrap" key={key}>
            <button
              className={`dropdown-btn ${open === key ? 'active' : ''}`}
              onClick={() => toggle(key)}
            >
              <span>{selected[key] || label}</span>
              <svg
                className={`chevron ${open === key ? 'rotate' : ''}`}
                width="12" height="12" viewBox="0 0 12 12" fill="none"
              >
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {open === key && (
              <ul className="dropdown-menu">
                {options[key].map((opt) => (
                  <li
                    key={opt}
                    className={`dropdown-option ${selected[key] === opt ? 'chosen' : ''}`}
                    onClick={() => select(key, opt)}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            )}

            <div className="divider" />
          </div>
        ))}

        <button className="search-btn">
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="22" y2="22" />
          </svg>
          Search
        </button>

      </div>
    </div>
  )
}