import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/SymptomChecker.css'

const departments = ['Cardiology', 'Neurology', 'Urology', 'Pulmonology', 'Dentistry', 'Orthopedics']
const doctors = {
  Cardiology:  'Dr. Sarah Johnson',
  Neurology:   'Dr. James Williams',
  Urology:     'Dr. Robert Wilson',
  Pulmonology: 'Dr. Emily Davis',
  Dentistry:   'Dr. Sophia Martinez',
  Orthopedics: 'Dr. Michael Brown',
}

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const checkSymptoms = async () => {
    if (!symptoms.trim()) return
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are a medical assistant for HMS Hospital. Based on the symptoms provided, suggest the most appropriate department from this list only: ${departments.join(', ')}.

Symptoms: ${symptoms}

Respond ONLY in this exact JSON format, nothing else:
{
  "department": "department name from the list",
  "doctor": "doctor name",
  "reason": "brief explanation in 1-2 sentences",
  "severity": "Low/Medium/High",
  "tips": ["tip1", "tip2", "tip3"]
}

Doctor mapping:
${JSON.stringify(doctors, null, 2)}`
          }]
        })
      })

      const data = await response.json()
      const text = data.content[0].text
      const clean = text.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(clean)
      setResult(parsed)
    } catch (err) {
      setError('Failed to analyze symptoms. Please try again.')
      console.error(err)
    }

    setLoading(false)
  }

  const severityColor = {
    Low: '#16a34a',
    Medium: '#d97706',
    High: '#dc2626'
  }

  return (
    <section className="symptom-section">
      <div className="symptom-inner">

        {/* ── Header ── */}
        <div className="symptom-header">
          <p className="symptom-eyebrow">🤖 AI Powered</p>
          <h2 className="symptom-title">AI Symptom Checker</h2>
          <p className="symptom-subtitle">
            Describe your symptoms and our AI will suggest the right department and doctor for you.
          </p>
        </div>

        {/* ── Input ── */}
        <div className="symptom-input-box">
          <textarea
            className="symptom-textarea"
            placeholder="Describe your symptoms here... e.g. I have chest pain, shortness of breath and dizziness for the past 2 days."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={4}
          />
          <button
            className="symptom-btn"
            onClick={checkSymptoms}
            disabled={loading || !symptoms.trim()}
          >
            {loading ? '🔍 Analyzing...' : '🔍 Check Symptoms'}
          </button>
        </div>

        {/* ── Error ── */}
        {error && <p className="symptom-error">⚠️ {error}</p>}

        {/* ── Result ── */}
        {result && (
          <div className="symptom-result">

            {/* Severity badge */}
            <div className="symptom-severity" style={{ background: severityColor[result.severity] }}>
              {result.severity === 'High' ? '🔴' : result.severity === 'Medium' ? '🟡' : '🟢'} {result.severity} Severity
            </div>

            {/* Department + Doctor */}
            <div className="symptom-cards">
              <div className="symptom-card">
                <p className="symptom-card-label">Recommended Department</p>
                <p className="symptom-card-value">🏥 {result.department}</p>
              </div>
              <div className="symptom-card">
                <p className="symptom-card-label">Recommended Doctor</p>
                <p className="symptom-card-value">👨‍⚕️ {result.doctor}</p>
              </div>
            </div>

            {/* Reason */}
            <div className="symptom-reason">
              <p className="symptom-reason-title">Why this department?</p>
              <p className="symptom-reason-text">{result.reason}</p>
            </div>

            {/* Tips */}
            <div className="symptom-tips">
              <p className="symptom-tips-title">💡 Health Tips</p>
              <ul>
                {result.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

            {/* Book Appointment */}
            <button
              className="symptom-book-btn"
              onClick={() => navigate('/appointments')}
            >
              📅 Book Appointment with {result.doctor}
            </button>

          </div>
        )}

        {/* Disclaimer */}
        <p className="symptom-disclaimer">
          ⚠️ This AI tool is for informational purposes only and does not replace professional medical advice.
        </p>

      </div>
    </section>
  )
}