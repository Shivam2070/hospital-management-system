import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import '../styles/AdminDashboard.css'

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    checkAdminAndFetch()
  }, [])

  const checkAdminAndFetch = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { navigate('/admin'); return }

    const { data: adminData } = await supabase
      .from('admins')
      .select('email')
      .eq('email', session.user.email)
      .single()

    if (!adminData) { navigate('/admin'); return }

    fetchAppointments()
  }

  const fetchAppointments = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) setError('Failed to load appointments.')
    else setAppointments(data)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin')
  }

  // ── Stats ──
  const totalAppointments = appointments.length
  const todayAppointments = appointments.filter(a => a.date === today).length
  const departments = [...new Set(appointments.map(a => a.department))]
  const deptCounts = departments.map(d => ({
    name: d,
    count: appointments.filter(a => a.department === d).length
  }))

  return (
    <div className="admin-container">

      {/* ── Header ── */}
      <div className="admin-header">
        <div className="admin-header-left">
          <h1>🏥 HMS Admin Dashboard</h1>
          <p>Manage all appointments</p>
        </div>
        <button className="admin-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* ── Stats Cards ── */}
      <div className="admin-stats">
        <div className="admin-stat-card blue">
          <p className="stat-label">Total Appointments</p>
          <h2 className="stat-value">{totalAppointments}</h2>
        </div>
        <div className="admin-stat-card green">
          <p className="stat-label">Today's Appointments</p>
          <h2 className="stat-value">{todayAppointments}</h2>
        </div>
        <div className="admin-stat-card purple">
          <p className="stat-label">Departments Active</p>
          <h2 className="stat-value">{departments.length}</h2>
        </div>
      </div>

      {/* ── Department Breakdown ── */}
      <div className="admin-dept-section">
        <h3>Appointments by Department</h3>
        <div className="admin-dept-grid">
          {deptCounts.map(d => (
            <div className="admin-dept-card" key={d.name}>
              <p className="dept-name">{d.name}</p>
              <p className="dept-count">{d.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Appointments Table ── */}
      <div className="admin-table-section">
        <h3>All Appointments</h3>
        {loading ? (
          <p className="admin-loading">Loading...</p>
        ) : error ? (
          <p className="admin-error">{error}</p>
        ) : appointments.length === 0 ? (
          <p className="admin-empty">No appointments yet.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a, i) => (
                  <tr key={a.id}>
                    <td>{i + 1}</td>
                    <td>{a.name}</td>
                    <td>{a.phone}</td>
                    <td>{a.email}</td>
                    <td><span className="dept-badge">{a.department}</span></td>
                    <td>{a.doctor}</td>
                    <td>{a.date}</td>
                    <td>{a.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  )
}