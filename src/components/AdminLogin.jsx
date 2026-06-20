import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError('')
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error

      // Check if user is admin
      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('email')
        .eq('email', data.user.email)
        .single()

      if (adminError || !adminData) {
        await supabase.auth.signOut()
        throw new Error('You are not authorized as admin.')
      }

      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>🏥 Admin Login</h2>
        <p className="auth-subtitle">Hospital Management System</p>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />

        {error && <p className="auth-error">⚠️ {error}</p>}

        <button className="auth-btn primary" onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login as Admin'}
        </button>
      </div>
    </div>
  )
}