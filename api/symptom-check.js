export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { symptoms } = req.body

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a medical assistant for HMS Hospital. Based on the symptoms provided, suggest the most appropriate department from this list only: Cardiology, Neurology, Urology, Pulmonology, Dentistry, Orthopedics.

Symptoms: ${symptoms}

Respond ONLY in this exact JSON format, nothing else, no extra text:
{
  "department": "department name from the list",
  "doctor": "doctor name",
  "reason": "brief explanation in 1-2 sentences",
  "severity": "Low/Medium/High",
  "tips": ["tip1", "tip2", "tip3"]
}

Doctor mapping:
Cardiology = Dr. Sarah Johnson
Neurology = Dr. James Williams
Urology = Dr. Robert Wilson
Pulmonology = Dr. Emily Davis
Dentistry = Dr. Sophia Martinez
Orthopedics = Dr. Michael Brown`
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1000,
          }
        })
      }
    )

    const data = await response.json()
    console.log('Gemini response:', JSON.stringify(data))

    if (data.error) {
      return res.status(500).json({ error: data.error.message })
    }

    const text = data.candidates[0].content.parts[0].text
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)
    res.status(200).json(parsed)

  } catch (err) {
    console.error('Error:', err.message)
    res.status(500).json({ error: err.message })
  }
}