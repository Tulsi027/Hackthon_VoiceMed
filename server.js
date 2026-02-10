require('dotenv').config();

const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Initialize Groq client
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || 'your-groq-api-key-here'
});

// Mock Transport Volunteer Database
const TRANSPORT_VOLUNTEERS = [
    {
        id: 1,
        name: 'Rajesh Kumar',
        phone: '+91-9876543210',
        vehicle: 'Motorcycle',
        availability: 'Available',
        compensation: '₹500',
        distance: '0.5 km away'
    },
    {
        id: 2,
        name: 'Suresh Patel',
        phone: '+91-9876543211',
        vehicle: 'Auto-rickshaw',
        availability: 'Available',
        compensation: '₹800',
        distance: '1.2 km away'
    },
    {
        id: 3,
        name: 'Amit Singh',
        phone: '+91-9876543212',
        vehicle: 'Motorcycle',
        availability: 'Available',
        compensation: '₹500',
        distance: '0.8 km away'
    },
    {
        id: 4,
        name: 'Vikram Yadav',
        phone: '+91-9876543213',
        vehicle: 'Car',
        availability: 'Available',
        compensation: '₹1200',
        distance: '2.0 km away'
    },
    {
        id: 5,
        name: 'Mahesh Verma',
        phone: '+91-9876543214',
        vehicle: 'Motorcycle',
        availability: 'Available',
        compensation: '₹500',
        distance: '1.5 km away'
    },
    {
        id: 6,
        name: 'Ramesh Gupta',
        phone: '+91-9876543215',
        vehicle: 'Three-wheeler',
        availability: 'Available',
        compensation: '₹700',
        distance: '1.0 km away'
    }
];

// Predefined Medicine List (STRICT)
const ALLOWED_MEDICINES = [
    {
        name: 'Paracetamol',
        use: 'Fever, pain relief',
        dosage: 'Adults: 500mg-1000mg every 4-6 hours (max 4g/day)'
    },
    {
        name: 'ORS (Oral Rehydration Solution)',
        use: 'Dehydration, diarrhea',
        dosage: 'Mix 1 sachet in 1 liter water, sip slowly'
    },
    {
        name: 'Cetirizine',
        use: 'Allergies, itching',
        dosage: 'Adults: 10mg once daily'
    },
    {
        name: 'Antacid Syrup',
        use: 'Acidity, heartburn',
        dosage: '2 teaspoons after meals'
    },
    {
        name: 'Cough Syrup (Basic)',
        use: 'Cough, throat irritation',
        dosage: '2 teaspoons 3 times daily'
    },
    {
        name: 'Antiseptic Cream',
        use: 'Minor cuts, wounds',
        dosage: 'Apply thin layer on cleaned wound, cover with bandage'
    }
];

// System Prompt for AI Triage
const SYSTEM_PROMPT = `You are a medical triage AI assistant for a rural healthcare system operated by village health workers (Mukhiya).

YOUR ROLE:
- Help assess patient symptoms and determine appropriate care level
- Ask intelligent follow-up questions to gather critical clinical information
- Classify patients into RED (emergency), YELLOW (doctor review), or GREEN (local care)
- You are NOT a doctor and do NOT provide diagnosis

CRITICAL SAFETY RULES:
1. Always state: "I am not a doctor, this is decision support only"
2. Never provide final diagnosis
3. Always escalate life-threatening conditions to RED
4. Only recommend medicines from the allowed list for GREEN cases
5. When in doubt, escalate to YELLOW (doctor review)

ALLOWED MEDICINES (GREEN cases only):
${ALLOWED_MEDICINES.map(m => `- ${m.name}: ${m.use}`).join('\n')}

TRIAGE CATEGORIES:

🔴 RED - EMERGENCY (Immediate referral required):
- Chest pain or pressure
- Difficulty breathing / low oxygen
- Unconsciousness or altered mental state
- Severe bleeding
- Stroke symptoms (face drooping, arm weakness, speech difficulty)
- Severe abdominal pain
- High fever with confusion
- Severe allergic reaction
- Severe injury or trauma

🟡 YELLOW - DOCTOR REVIEW (Stable but needs medical consultation):
- Moderate symptoms that are concerning but not immediately life-threatening
- Unclear diagnosis requiring medical expertise
- Chronic condition changes
- Symptoms lasting multiple days without improvement
- Any case where you're uncertain

🟢 GREEN - LOCAL/BASIC CARE (Village health worker can manage):
- Mild fever (<101°F with no danger signs)
- Common cold, mild cough
- Minor cuts/wounds
- Mild headache
- Mild stomach upset
- Minor rash/skin irritation
- Must ONLY be conditions manageable with allowed medicines

WORKFLOW:
1. When you receive initial symptoms, DON'T jump to conclusion
2. Ask 2-4 targeted follow-up questions to gather:
   - Duration and severity
   - Associated symptoms
   - Vital signs if available (temperature, breathing rate)
   - Patient age and medical history if relevant
   - Red flag symptoms
3. After gathering enough information, make ONE of these decisions:
   - RED: Emergency referral (no medicine advice)
   - YELLOW: Send for doctor review
   - GREEN: Recommend allowed medicines only

RESPONSE FORMAT (MUST BE JSON):

You must respond in valid JSON format. If you need more information:
{
  "needsMoreInfo": true,
  "question": "Your specific follow-up question here"
}

If you have enough information for triage:
{
  "needsMoreInfo": false,
  "category": "RED" | "YELLOW" | "GREEN",
  "reasoning": "Clear explanation of why this category",
  "actions": ["specific action items"],
  "medicines": [{"name": "...", "dosage": "...", "instructions": "..."}]  // Only for GREEN
}

IMPORTANT:
- Ask smart questions that help differentiate emergency vs non-emergency
- Don't ask too many questions (max 3-4)
- Be concise and clear
- Always err on the side of caution
- Never recommend medicines not in the allowed list`;

// Triage API Endpoint
app.post('/api/triage', async (req, res) => {
    try {
        const { sessionId, userInput, conversationHistory } = req.body;

        // Build messages for Groq API
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationHistory,
            { role: 'user', content: userInput }
        ];

        // Call Groq API
        const completion = await groq.chat.completions.create({
            messages: messages,
            model: 'llama-3.3-70b-versatile', // Fast and capable model
            temperature: 0.3, // Lower temperature for more consistent medical reasoning
            max_tokens: 1000,
            response_format: { type: 'json_object' }
        });

        const aiResponse = JSON.parse(completion.choices[0].message.content);

        // Validate response
        if (aiResponse.needsMoreInfo) {
            return res.json({
                needsMoreInfo: true,
                question: aiResponse.question
            });
        }

        // Validate triage category
        if (!['RED', 'YELLOW', 'GREEN'].includes(aiResponse.category)) {
            throw new Error('Invalid triage category');
        }

        // For GREEN category, validate medicines
        if (aiResponse.category === 'GREEN' && aiResponse.medicines) {
            const allowedNames = ALLOWED_MEDICINES.map(m => m.name.toLowerCase());
            aiResponse.medicines = aiResponse.medicines.filter(med => 
                allowedNames.includes(med.name.toLowerCase())
            );
        }

        // Return triage result
        return res.json({
            needsMoreInfo: false,
            category: aiResponse.category,
            reasoning: aiResponse.reasoning,
            actions: aiResponse.actions || [],
            medicines: aiResponse.medicines || [],
            doctorReview: aiResponse.category === 'YELLOW'
        });

    } catch (error) {
        console.error('Error in triage API:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get allowed medicines list
app.get('/api/medicines', (req, res) => {
    res.json({ medicines: ALLOWED_MEDICINES });
});

// Get transport volunteers
app.get('/api/transport-volunteers', (req, res) => {
    res.json({ volunteers: TRANSPORT_VOLUNTEERS });
});

// Send emergency transport request
app.post('/api/request-transport', (req, res) => {
    const { emergencyDetails } = req.body;
    
    // Simulate sending requests to all available volunteers
    const notifications = TRANSPORT_VOLUNTEERS.map(volunteer => ({
        volunteerId: volunteer.id,
        name: volunteer.name,
        phone: volunteer.phone,
        vehicle: volunteer.vehicle,
        compensation: volunteer.compensation,
        distance: volunteer.distance,
        message: `🚨 EMERGENCY TRANSPORT NEEDED\n\nPatient requires immediate transport to hospital.\n\nCompensation: ${volunteer.compensation}\n\nPlease respond ASAP if available.`,
        status: 'sent',
        timestamp: new Date().toISOString()
    }));
    
    res.json({
        success: true,
        message: 'Emergency transport requests sent to all volunteers',
        notifications: notifications,
        totalVolunteers: TRANSPORT_VOLUNTEERS.length
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🏥 Rural Health Triage Server running on http://localhost:${PORT}`);
    console.log(`📋 Allowed medicines: ${ALLOWED_MEDICINES.length}`);
    console.log(`🚗 Transport volunteers: ${TRANSPORT_VOLUNTEERS.length}`);
    console.log(`🤖 AI Model: llama-3.3-70b-versatile (Groq)`);
    console.log('\nEndpoints:');
    console.log('  POST /api/triage - Main triage endpoint');
    console.log('  GET  /api/medicines - Get allowed medicines');
    console.log('  GET  /api/transport-volunteers - Get transport volunteers');
    console.log('  POST /api/request-transport - Send emergency transport requests');
    console.log('  GET  /health - Health check');
});

module.exports = app;
