import { useState, useRef, useEffect } from 'react'
import '../styles/Chatbot.css'

const INITIAL_MESSAGE = {
  role: 'assistant',
  text: '👋 Hi! I am HMS Health Assistant. I can help you with health questions, symptoms, and information about our doctors and departments. How can I help you today?'
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages
        })
      })

      const data = await response.json()
      if (data.error) throw new Error(data.error)

      setMessages(prev => [...prev, { role: 'assistant', text: data.reply }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: '⚠️ Sorry, I could not process your request. Please try again.'
      }])
    }

    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        className={`chatbot-fab ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle chatbot"
      >
        {open ? '✕' : '💬'}
      </button>

      {/* ── Chat Window ── */}
      {open && (
        <div className="chatbot-window">

          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">🏥</div>
              <div>
                <p className="chatbot-name">HMS Health Assistant</p>
                <p className="chatbot-status">🟢 Online</p>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.role}`}>
                {msg.role === 'assistant' && (
                  <div className="chatbot-msg-avatar">🏥</div>
                )}
                <div className="chatbot-msg-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="chatbot-msg assistant">
                <div className="chatbot-msg-avatar">🏥</div>
                <div className="chatbot-msg-bubble typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Ask a health question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="chatbot-input"
              disabled={loading}
            />
            <button
              className="chatbot-send"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
            >
              ➤
            </button>
          </div>

        </div>
      )}
    </>
  )
}