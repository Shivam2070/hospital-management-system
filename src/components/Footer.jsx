import React from 'react'
import '../styles/Footer.css'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { MdLocalHospital, MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'

const quickLinks = ['Home', 'About Us', 'Our Doctors', 'Departments', 'Appointments', 'Contact']
const services   = ['Cardiology', 'Neurology', 'Orthopedics', 'Dentistry', 'Pulmonology', 'Urology']
const socials = [
  { icon: <FaFacebookF />,  href: '#' },
  { icon: <FaTwitter />,    href: '#' },
  { icon: <FaInstagram />,  href: '#' },
  { icon: <FaLinkedinIn />, href: '#' },
  { icon: <FaYoutube />,    href: '#' },
]

const Footer = () => {
  return (
    <footer className="footer">

      {/* ── Top CTA strip ── */}
      <div className="footer-cta" data-aos="fade-up">
        <div className="footer-cta-text">
          <h3>Need Emergency Help?</h3>
          <p>Our medical team is available 24/7 for emergency cases</p>
        </div>
        <a href="tel:+18001234567" className="footer-cta-btn">
          <MdPhone /> Call Now: +1 (800) 123-4567
        </a>
      </div>

      {/* ── Main grid ── */}
      <div className="footer-main">

        {/* Brand column */}
        <div className="footer-brand">
          <div className="footer-logo">
            <MdLocalHospital className="footer-logo-icon" />
            <span>HMS</span>
          </div>
          <p className="footer-brand-desc">
            Providing premium healthcare services with expert doctors,
            modern facilities and compassionate care for every patient.
          </p>
          <div className="footer-socials">
            {socials.map((s, i) => (
              <a key={i} href={s.href} className="footer-social-btn">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links">
            {quickLinks.map((link) => (
              <li key={link}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h4 className="footer-col-title">Our Services</h4>
          <ul className="footer-links">
            {services.map((s) => (
              <li key={s}>
                <a href="#">{s}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-col-title">Contact Us</h4>
          <ul className="footer-contact">
            <li>
              <MdLocationOn className="contact-icon" />
              <span>123 Health Street,<br />New York, NY 10001</span>
            </li>
            <li>
              <MdPhone className="contact-icon" />
              <span>+1 (800) 123-4567</span>
            </li>
            <li>
              <MdEmail className="contact-icon" />
              <span>info@hms-hospital.com</span>
            </li>
          </ul>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <p className="newsletter-label">Subscribe to Newsletter</p>
            <div className="newsletter-input-wrap">
              <input type="email" placeholder="Your email address" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <p>© 2025 HMS Hospital. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Sitemap</a>
        </div>
      </div>

    </footer>
  )
}

export default Footer