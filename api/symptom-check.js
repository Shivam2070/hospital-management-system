export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { symptoms } = req.body

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.VITE_CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `You are a medical assistant for HMS Hospital. Based on the symptoms provided, suggest the most appropriate department from this list only: Cardiology, Neurology, Urology, Pulmonology, Dentistry, Orthopedics.

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
{
  "Cardiology": "Dr. Sarah Johnson",
  "Neurology": "Dr. James Williams",
  "Urology": "Dr. Robert Wilson",
  "Pulmonology": "Dr. Emily Davis",
  "Dentistry": "Dr. Sophia Martinez",
  "Orthopedics": "Dr. Michael Brown"
}`
        }]
      })
    })

    const data = await response.json()
    const text = data.content[0].text
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)
    res.status(200).json(parsed)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to analyze symptoms' })
  }
}