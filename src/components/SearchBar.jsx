import { useState } from 'react'
import '../styles/SearchBar.css'

const doctorData = [
  { name: 'Dr. Sarah Johnson',  department: 'Cardiology',   location: 'New York',    available: ['Today', 'This Week', 'This Month'] },
  { name: 'Dr. James Williams', department: 'Neurology',    location: 'Los Angeles', available: ['Tomorrow', 'This Week', 'This Month'] },
  { name: 'Dr. Robert Wilson',  department: 'Urology',      location: 'Chicago',     available: ['Today', 'Tomorrow', 'This Week'] },
  { name: 'Dr. Emily Davis',    department: 'Pulmonology',  location: 'Houston',     available: ['This Week', 'This Month', 'Next Month'] },
  { name: 'Dr. Sophia Martinez',department: 'Dentistry',    location: 'Phoenix',     available: ['Today', 'Tomorrow', 'Next Month'] },
  { name: 'Dr. Michael Brown',  department: 'Orthopedics',  location: 'New York',    available: ['Tomorrow', 'This Month', 'Next Month'] },
]

const options = {
  department: ['Cardiology', 'Neurology', 'Urology', 'Pulmonology', 'Dentistry', 'Orthopedics'],
  doctor:     ['Dr. Sarah Johnson', 'Dr. James Williams', 'Dr. Robert Wilson', 'Dr. Emily Davis', 'Dr. Sophia Martinez', 'Dr. Michael Brown'],
  date:       ['Today', 'Tomorrow', 'This Week', 'This Month', 'Next Month'],
  location:   ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
}

const dropdowns = [
  { key: 'department', label: 'Select Department' },
  { key: 'doctor',     label: 'Select Doctor'     },
  { key: 'date',       label: 'Select Date'       },
  { key: 'location',   label: 'Select Location'   },
]

const deptColors = {
  Cardiology:   '#ef4444',
  Neurology:    '#8b5cf6',
  Urology:      '#3b82f6',
  Pulmonology:  '#06b6d4',
  Dentistry:    '#f59e0b',
  Orthopedics:  '#10b981',
}

export default function SearchBar() {
  const [selected, setSelected] = useState({
    department: '', doctor: '', date: '', location: '',
  })
  const [open, setOpen]         = useState(null)
  const [results, setResults]   = useState(null)
  const [searched, setSearched] = useState(false)

  const toggle = (key) => setOpen(open === key ? null : key)

  const select = (key, val) => {
    setSelected((prev) => ({ ...prev, [key]: val }))
    setOpen(null)
  }

  const handleSearch = () => {
    let filtered = doctorData
    if (selected.department) filtered = filtered.filter(d => d.department === selected.department)
    if (selected.doctor)     filtered = filtered.filter(d => d.name === selected.doctor)
    if (selected.date)       filtered = filtered.filter(d => d.available.includes(selected.date))
    if (selected.location)   filtered = filtered.filter(d => d.location === selected.location)
    setResults(filtered)
    setSearched(true)
  }

  const handleClear = () => {
    setSelected({ department: '', doctor: '', date: '', location: '' })
    setResults(null)
    setSearched(false)
  }

  return (
    <>
      <div className="searchbar-wrapper" data-aos="fade-up" onClick={() => setOpen(null)}>
        <div className="searchbar" onClick={(e) => e.stopPropagation()}>

          {dropdowns.map(({ key, label }) => (
            <div className="dropdown-wrap" key={key}>
              <button
                className={`dropdown-btn ${open === key ? 'active' : ''} ${selected[key] ? 'selected' : ''}`}
                onClick={() => toggle(key)}
              >
                <span>{selected[key] || label}</span>
                <svg className={`chevron ${open === key ? 'rotate' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

          <button className="search-btn" onClick={handleSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
            Search
          </button>

        </div>
      </div>

      {/* ── Results ── */}
      {searched && (
        <div className="search-results-section">
          <div className="search-results-header">
            <h3>{results.length > 0 ? `Found ${results.length} Doctor${results.length > 1 ? 's' : ''}` : 'No doctors found'}</h3>
            <button className="search-clear-btn" onClick={handleClear}>✕ Clear Search</button>
          </div>

          {results.length === 0 ? (
            <div className="search-empty">
              <p>😔 No doctors match your search criteria.</p>
              <p>Try changing your filters.</p>
            </div>
          ) : (
            <div className="search-results-grid">
              {results.map((doc, i) => (
                <div className="search-doctor-card" key={i}>
                  <div className="search-doctor-avatar" style={{ background: deptColors[doc.department] }}>
                    {doc.name.split(' ')[1]?.charAt(0)}{doc.name.split(' ')[2]?.charAt(0)}
                  </div>
                  <div className="search-doctor-info">
                    <h4>{doc.name}</h4>
                    <span className="search-dept-badge" style={{ background: deptColors[doc.department] + '20', color: deptColors[doc.department] }}>
                      {doc.department}
                    </span>
                    <p className="search-doctor-location">📍 {doc.location}</p>
                    <p className="search-doctor-available">🗓 Available: {doc.available.join(', ')}</p>
                  </div>
                  <a href="/appointments" className="search-book-btn">Book Now</a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}