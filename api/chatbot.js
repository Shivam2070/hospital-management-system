export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message, history } = req.body

  const systemContext = `You are HMS Health Assistant, a helpful medical chatbot for HMS Hospital. 
You help patients with:
- General health questions
- Symptom information
- Information about our departments: Cardiology, Neurology, Urology, Pulmonology, Dentistry, Orthopedics
- Information about our doctors:
  * Dr. Sarah Johnson - Cardiology
  * Dr. James Williams - Neurology
  * Dr. Robert Wilson - Urology
  * Dr. Emily Davis - Pulmonology
  * Dr. Sophia Martinez - Dentistry
  * Dr. Michael Brown - Orthopedics
- Appointment booking guidance
- General wellness tips

Always be helpful, empathetic and professional. Keep responses concise (2-4 sentences). 
Always recommend consulting a real doctor for serious concerns.
Never diagnose conditions definitively.`

  const conversationHistory = history
    .filter(m => m.role !== 'system')
    .map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }))

  conversationHistory.push({
    role: 'user',
    parts: [{ text: message }]
  })

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemContext }]
          },
          contents: conversationHistory,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        })
      }
    )

    const data = await response.json()
    console.log('Chatbot Gemini response:', JSON.stringify(data))

    if (data.error) {
      return res.status(500).json({ error: data.error.message })
    }

    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response from Gemini API')
    }

    const reply = data.candidates[0].content.parts[0].text
    res.status(200).json({ reply })

  } catch (err) {
    console.error('Chatbot error:', err.message)
    res.status(500).json({ error: err.message })
  }
}