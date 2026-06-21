import React, { useEffect, useState } from 'react'
import '../styles/Hero.css'
import { FaStar, FaPlay } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'
import { BsArrowRight } from 'react-icons/bs'
import {
  heroStats,
  heroBadges,
  heroAvatars,
  heroFloatCards,
  heroPill,
  heroContent,
} from '../data/Hero.js'

const Hero = () => {
  const [count, setCount] = useState({ patients: 0, doctors: 0 })

  useEffect(() => {
    const duration = 2000
    const steps    = 60
    const interval = duration / steps
    let step       = 0
    const timer = setInterval(() => {
      step++
      setCount({
        patients: Math.min(Math.round((4500 / steps) * step), 4500),
        doctors:  Math.min(Math.round((heroContent.doctorsOnlineCount / steps) * step), heroContent.doctorsOnlineCount),
      })
      if (step >= steps) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero-section">

      {/* ── Background circles ── */}
      <div className="hero-bg-circle hero-bg-circle-1" />
      <div className="hero-bg-circle hero-bg-circle-2" />
      <div className="hero-bg-circle hero-bg-circle-3" />

      <div className="hero-inner">

        {/* ── Left column ── */}
        <div className="hero-left" data-aos="fade-right">

          {/* Pill badge */}
          <div className="hero-pill">
            <MdVerified className="hero-pill-icon" />
            {heroPill}
          </div>

          {/* Headline */}
          <h1 className="hero-headline">
            {heroContent.headline1}{' '}
            <span className="hero-highlight">{heroContent.headline2}</span><br />
            {heroContent.headline3}{' '}
            <span className="hero-highlight">{heroContent.headline4}</span>
          </h1>

          {/* Subtext */}
          <p className="hero-subtext">{heroContent.subtext}</p>

          {/* CTA buttons */}
          <div className="hero-cta-row">
            <a href="#" className="hero-btn-primary">
              {heroContent.primaryBtn}
              <BsArrowRight className="btn-arrow" />
            </a>
            <a href="#" className="hero-btn-secondary">
              <span className="play-icon"><FaPlay /></span>
              {heroContent.secondaryBtn}
            </a>
          </div>

          {/* Doctors row */}
          <div className="hero-doctors-row">
            <div className="hero-avatars">
              {heroAvatars.map((a, i) => (
                <img
                  key={i}
                  src={`https://randomuser.me/api/portraits/${a.gender}/${a.id}.jpg`}
                  alt="doctor"
                  className="hero-avatar"
                  style={{ zIndex: 5 - i }}
                />
              ))}
            </div>
            <div className="hero-doctors-text">
              <div className="hero-stars">
                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
              </div>
              <p>
                <strong>{count.doctors.toLocaleString()}+</strong>{' '}
                {heroContent.doctorsOnlineLabel}
              </p>
            </div>
          </div>

        </div>

        {/* ── Right column ── */}
        <div className="hero-right" data-aos="fade-left">

          {/* Image frame */}
          <div className="hero-img-frame">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80"
              alt="Doctor"
              className="hero-doctor-img"
            />

            {/* Floating cards */}
            {heroFloatCards.map((card, i) => (
              <div
                key={i}
                className="hero-float-card"
                style={{ ...card.position, animationDelay: card.delay }}
              >
                <div className={`float-card-icon ${card.color}`}>
                  {card.icon}
                </div>
                <div>
                  <p className="float-card-title">{card.title}</p>
                  <p className="float-card-sub">{card.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Specialty badges */}
          {heroBadges.map((b, i) => (
            <div
              key={i}
              className="hero-badge"
              style={{ top: b.top, right: b.right }}
            >
              {b.text}
            </div>
          ))}

        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="hero-stats" data-aos="fade-up">
        {heroStats.map((s, i) => (
          <div className="hero-stat-item" key={i}>
            <span className="hero-stat-value">{s.value}</span>
            <span className="hero-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

    </section>
  )
}

export default Hero