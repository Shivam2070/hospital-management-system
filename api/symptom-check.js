export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.CLAUDE_API_KEY
  console.log('API Key exists:', !!apiKey)
  console.log('API Key start:', apiKey ? apiKey.substring(0, 10) : 'MISSING')

  const { symptoms } = req.body
  console.log('Symptoms received:', symptoms)

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `You are a medical assistant. Based on symptoms, suggest department from: Cardiology, Neurology, Urology, Pulmonology, Dentistry, Orthopedics.

Symptoms: ${symptoms}

Respond ONLY in this JSON format:
{
  "department": "department name",
  "doctor": "doctor name",
  "reason": "brief explanation",
  "severity": "Low/Medium/High",
  "tips": ["tip1", "tip2", "tip3"]
}

Doctors: Cardiology=Dr. Sarah Johnson, Neurology=Dr. James Williams, Urology=Dr. Robert Wilson, Pulmonology=Dr. Emily Davis, Dentistry=Dr. Sophia Martinez, Orthopedics=Dr. Michael Brown`
        }]
      })
    })

    const raw = await response.text()
    console.log('Raw Claude response:', raw)

    const data = JSON.parse(raw)

    if (data.error) {
      return res.status(500).json({ error: data.error.message })
    }

    const text = data.content[0].text
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)
    res.status(200).json(parsed)

  } catch (err) {
    console.error('Error:', err.message)
    res.status(500).json({ error: err.message })
  }
}