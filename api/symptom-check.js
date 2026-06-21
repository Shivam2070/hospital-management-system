// Gemini API v2 - updated
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { symptoms } = req.body

  if (!symptoms) {
    return res.status(400).json({ error: 'Symptoms description is required' })
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a medical assistant for HMS Hospital. Based on the symptoms provided, suggest the most appropriate department from this list only: Cardiology, Neurology, Urology, Pulmonology, Dentistry, Orthopedics.

Symptoms: ${symptoms}

Respond strictly using this JSON structure:
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
            temperature: 0.1, // Dropped to 0.1 to make it follow formatting rules strictly
            maxOutputTokens: 1000,
            responseMimeType: "application/json" // <-- Crucial: Forces Gemini to respond in clean, raw JSON
          }
        })
      }
    )

    const data = await response.json()
    console.log('Gemini response:', JSON.stringify(data))

    if (data.error) {
      return res.status(500).json({ error: data.error.message })
    }

    // Safety check for candidates structure
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid response structural layout from Gemini API.")
    }

    const text = data.candidates[0].content.parts[0].text
    
    // Now parsing is entirely safe because markdown backticks are suppressed
    const parsed = JSON.parse(text.trim())
    
    res.status(200).json(parsed)

  } catch (err) {
    console.error('Error:', err.message)
    res.status(500).json({ error: err.message })
  }
}