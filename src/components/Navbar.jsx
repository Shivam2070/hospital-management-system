import React, { useState, useEffect } from 'react'
import '../styles/Navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { MdLocalHospital } from 'react-icons/md'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { navLinks } from '../data/Hero'
import { supabase } from '../supabase'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Get current user on mount + listen for auth changes ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    navigate('/')
    closeMenu()
  }

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const closeMenu  = () => setMenuOpen(false)

  // ── Get display name ──
  const displayName = user?.user_metadata?.full_name
    || user?.email?.split('@')[0]
    || 'User'

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">

          {/* ── Logo ── */}
          <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
            <MdLocalHospital className="navbar-logo-icon" />
            <span>HMS</span>
          </NavLink>

          {/* ── Desktop links ── */}
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    isActive ? 'navbar-link active-link' : 'navbar-link'
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ── */}
          <div className="navbar-actions">
            {user ? (
              <>
                <span className="navbar-username">
                  <span className="navbar-avatar">
                    {displayName.charAt(0)}
                  </span>
                  {displayName}
                </span>
                <button className="navbar-btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className="navbar-btn-outline">
                Login
              </NavLink>
            )}
            <NavLink to="/appointments" className="navbar-btn-filled">
              Get Appointment
            </NavLink>
          </div>

          {/* ── Hamburger ── */}
          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>

        </div>
      </nav>

      {/* ── Mobile overlay ── */}
      <div
        className={`mobile-overlay ${menuOpen ? 'open' : ''}`}
        onClick={closeMenu}
      />

      {/* ── Mobile drawer ── */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>

        {/* Drawer header */}
        <div className="mobile-menu-header">
          <div className="mobile-logo">
            <MdLocalHospital className="navbar-logo-icon" />
            <span>HMS</span>
          </div>
          <button className="mobile-close" onClick={closeMenu}>
            <HiX />
          </button>
        </div>

        {/* Drawer links */}
        <ul className="mobile-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  isActive ? 'mobile-link mobile-link-active' : 'mobile-link'
                }
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Drawer CTA buttons */}
        <div className="mobile-actions">
          {user ? (
            <>
              <span className="navbar-username" style={{ padding: '0 4px' }}>
                <span className="navbar-avatar" style={{ background: '#1a6fbd', border: '2px solid #1a6fbd' }}>
                  {displayName.charAt(0)}
                </span>
                {displayName}
              </span>
              <button
                className="navbar-btn-logout w-full"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="navbar-btn-outline w-full"
              onClick={closeMenu}
            >
              Login
            </NavLink>
          )}
          <NavLink
            to="/appointments"
            className="navbar-btn-filled w-full"
            onClick={closeMenu}
          >
            Get Appointment
          </NavLink>
        </div>

      </div>
    </>
  )
}

export default Navbar