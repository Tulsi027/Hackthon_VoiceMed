require('dotenv').config();

const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

const app = express();
const PORT = 3000;

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

// Hospital Information - Single Partnered Hospital
const HOSPITAL_INFO = {
    name: 'VitalCare Community Hospital',
    address: 'Main Road, District Center',
    phone: '+91-9876500000',
    emergency: '+91-9876500108',
    distance: '2.5 km',
    facilities: ['Emergency Ward', 'ICU', 'Operation Theater', 'Ambulance Service']
};

// Mock Hospital Doctors Database - All Specialties
const HOSPITAL_DOCTORS = [
    {
        id: 1,
        name: 'Dr. Rajesh Sharma',
        specialty: 'General Surgeon',
        experience: '15 years',
        availability: 'Available',
        nextSlot: '02:00 PM Today',
        phone: '+91-9876501001',
        conditions: ['trauma', 'injury', 'wound', 'fracture', 'accident', 'cut', 'burn', 'bleeding', 'abdominal pain']
    },
    {
        id: 2,
        name: 'Dr. Priya Verma',
        specialty: 'Cardiologist',
        experience: '18 years',
        availability: 'Available',
        nextSlot: '03:00 PM Today',
        phone: '+91-9876501002',
        conditions: ['chest pain', 'heart', 'cardiac', 'palpitation', 'breathlessness', 'heart attack', 'angina']
    },
    {
        id: 3,
        name: 'Dr. Anil Kumar',
        specialty: 'Neurologist',
        experience: '12 years',
        availability: 'Available',
        nextSlot: '02:30 PM Today',
        phone: '+91-9876501003',
        conditions: ['headache', 'seizure', 'stroke', 'paralysis', 'numbness', 'dizziness', 'neurological', 'brain', 'unconscious']
    },
    {
        id: 4,
        name: 'Dr. Sunita Reddy',
        specialty: 'Gastroenterologist',
        experience: '10 years',
        availability: 'Available',
        nextSlot: '04:00 PM Today',
        phone: '+91-9876501004',
        conditions: ['stomach pain', 'vomiting', 'diarrhea', 'abdominal', 'gastric', 'ulcer', 'liver', 'jaundice', 'digestive']
    },
    {
        id: 5,
        name: 'Dr. Amit Patel',
        specialty: 'Urologist',
        experience: '14 years',
        availability: 'Available',
        nextSlot: '03:30 PM Today',
        phone: '+91-9876501005',
        conditions: ['urinary', 'kidney', 'bladder', 'urine', 'kidney stone', 'prostate', 'urination problem']
    },
    {
        id: 6,
        name: 'Dr. Meera Singh',
        specialty: 'Orthopedic Surgeon',
        experience: '16 years',
        availability: 'Available',
        nextSlot: '02:00 PM Today',
        phone: '+91-9876501006',
        conditions: ['bone', 'fracture', 'joint', 'arthritis', 'sprain', 'back pain', 'neck pain', 'orthopedic']
    },
    {
        id: 7,
        name: 'Dr. Vikram Joshi',
        specialty: 'Pulmonologist',
        experience: '11 years',
        availability: 'Available',
        nextSlot: '03:00 PM Today',
        phone: '+91-9876501007',
        conditions: ['breathing', 'asthma', 'respiratory', 'lung', 'cough', 'pneumonia', 'breathlessness', 'chest congestion']
    },
    {
        id: 8,
        name: 'Dr. Kavita Desai',
        specialty: 'Emergency Medicine Specialist',
        experience: '13 years',
        availability: 'Available',
        nextSlot: 'Immediate',
        phone: '+91-9876501008',
        conditions: ['severe', 'critical', 'emergency', 'life threatening', 'serious']
    },
    {
        id: 9,
        name: 'Dr. Ramesh Nair',
        specialty: 'General Physician',
        experience: '20 years',
        availability: 'Available',
        nextSlot: '02:30 PM Today',
        phone: '+91-9876501009',
        conditions: ['fever', 'general', 'weakness', 'fatigue', 'infection', 'common']
    },
    {
        id: 10,
        name: 'Dr. Anjali Khanna',
        specialty: 'Gynecologist',
        experience: '17 years',
        availability: 'Available',
        nextSlot: '04:00 PM Today',
        phone: '+91-9876501010',
        conditions: ['pregnancy', 'gynecological', 'menstrual', 'pelvic pain', 'obstetric', 'female reproductive']
    },
    {
        id: 11,
        name: 'Dr. Sanjay Mehta',
        specialty: 'Pediatrician',
        experience: '14 years',
        availability: 'Available',
        nextSlot: '03:00 PM Today',
        phone: '+91-9876501011',
        conditions: ['child', 'infant', 'baby', 'pediatric', 'newborn']
    },
    {
        id: 12,
        name: 'Dr. Deepak Rao',
        specialty: 'ENT Specialist',
        experience: '9 years',
        availability: 'Available',
        nextSlot: '04:30 PM Today',
        phone: '+91-9876501012',
        conditions: ['ear', 'nose', 'throat', 'ent', 'sinus', 'tonsil', 'hearing', 'swallowing difficulty']
    }
];

// Traditional Home Remedies List (Maa Ka Nuska)
const ALLOWED_MEDICINES = [
    {
        name: 'Haldi Doodh (Turmeric Milk)',
        use: 'Fever, pain relief, immunity',
        dosage: '1 glass warm milk with 1/2 teaspoon turmeric powder, drink before bedtime',
        ingredients: 'Turmeric powder, warm milk, honey (optional)'
    },
    {
        name: 'Adrak Tulsi Chai (Ginger-Tulsi Tea)',
        use: 'Fever, cold, body ache',
        dosage: 'Boil 5-6 tulsi leaves with crushed ginger, drink 2-3 times daily',
        ingredients: 'Fresh tulsi leaves, ginger, water'
    },
    {
        name: 'Nimbu Pani with Namak-Shakkar (Lemon Water with Salt-Sugar)',
        use: 'Dehydration, diarrhea, weakness',
        dosage: 'Mix juice of 1 lemon, pinch of salt, 1 teaspoon sugar in 1 glass water. Drink every 2-3 hours',
        ingredients: 'Lemon, salt, sugar, water'
    },
    {
        name: 'Chawal Ka Pani (Rice Water)',
        use: 'Diarrhea, dehydration',
        dosage: 'Boil rice, strain the water, drink 1 cup 3-4 times daily',
        ingredients: 'Rice, water'
    },
    {
        name: 'Dahi-Chaach (Curd/Buttermilk)',
        use: 'Stomach upset, digestion, dehydration',
        dosage: '1 glass buttermilk with pinch of roasted jeera powder, 2-3 times daily',
        ingredients: 'Fresh curd, water, roasted cumin powder, salt'
    },
    {
        name: 'Neem Paste',
        use: 'Skin irritation, itching, minor wounds',
        dosage: 'Grind fresh neem leaves, apply paste on affected area, wash after 20 minutes',
        ingredients: 'Fresh neem leaves, water'
    },
    {
        name: 'Jeera Pani (Cumin Water)',
        use: 'Acidity, indigestion, gas',
        dosage: 'Boil 1 teaspoon jeera in water, strain and drink warm after meals',
        ingredients: 'Cumin seeds (jeera), water'
    },
    {
        name: 'Thanda Doodh (Cold Milk)',
        use: 'Acidity, heartburn',
        dosage: '1 glass cold milk without sugar, drink slowly',
        ingredients: 'Cold milk'
    },
    {
        name: 'Shahad-Adrak (Honey-Ginger)',
        use: 'Cough, throat irritation, cold',
        dosage: 'Mix 1 teaspoon honey with few drops of ginger juice, take 3 times daily',
        ingredients: 'Pure honey, fresh ginger juice'
    },
    {
        name: 'Ajwain Ka Pani (Carom Seeds Water)',
        use: 'Stomach pain, gas, indigestion',
        dosage: 'Boil 1 teaspoon ajwain in water, drink warm',
        ingredients: 'Carom seeds (ajwain), water'
    },
    {
        name: 'Haldi Paste (Turmeric Paste)',
        use: 'Minor cuts, wounds, skin infections',
        dosage: 'Mix turmeric powder with water to make paste, apply on clean wound, cover with clean cloth',
        ingredients: 'Turmeric powder, water'
    },
    {
        name: 'Aloe Vera Gel',
        use: 'Minor burns, skin irritation, cuts',
        dosage: 'Apply fresh aloe vera gel directly on affected area, leave for 20-30 minutes',
        ingredients: 'Fresh aloe vera leaf'
    }
];

// Analytics Data Storage
const analyticsData = {
    casesPerDay: {},
    categoryDistribution: {
        RED: 0,
        YELLOW: 0,
        GREEN: 0
    },
    medicineConsumption: {},
    totalCases: 0,
    recentCases: []
};

// Initialize medicine consumption counters
ALLOWED_MEDICINES.forEach(med => {
    analyticsData.medicineConsumption[med.name] = 0;
});

// Helper to get today's date key
function getTodayKey() {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

// Initialize last 7 days
for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    analyticsData.casesPerDay[key] = 0;
}

// Middleware
app.use(cors());
app.use(express.json());

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
4. Only recommend traditional home remedies from the allowed list for GREEN cases
5. When in doubt, escalate to YELLOW (doctor review)

TRADITIONAL HOME REMEDIES - MAA KA NUSKA (GREEN cases only):
${ALLOWED_MEDICINES.map(m => `- ${m.name}: ${m.use}`).join('\n')}

IMPORTANT: These are traditional home remedies (maa ka nuska). Always recommend natural, easily available ingredients.

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

🟢 GREEN - Ayurvedic Care/BASIC CARE (Village health worker can manage with home remedies):
- Mild fever (<101°F with no danger signs)
- Common cold, mild cough
- Minor cuts/wounds
- Mild headache
- Mild stomach upset
- Minor rash/skin irritation
- Must ONLY be conditions manageable with traditional home remedies (maa ka nuska)

WORKFLOW:
1. When you receive initial symptoms, DON'T jump to conclusion
2. Ask 2-4 targeted follow-up questions to gather:
   - Duration and severity
   - Associated symptoms
   - Vital signs if available (temperature, breathing rate)
   - Patient age and medical history if relevant
   - Red flag symptoms
3. After gathering enough information, make ONE of these decisions:
   - RED: Emergency referral (no home remedy advice)
   - YELLOW: Send for doctor review
   - GREEN: Recommend traditional home remedies (maa ka nuska) only

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

// API Routes
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

        // Track analytics
        const todayKey = getTodayKey();
        if (!analyticsData.casesPerDay[todayKey]) {
            analyticsData.casesPerDay[todayKey] = 0;
        }
        analyticsData.casesPerDay[todayKey]++;
        analyticsData.categoryDistribution[aiResponse.category]++;
        analyticsData.totalCases++;

        // Track medicine consumption
        if (aiResponse.category === 'GREEN' && aiResponse.medicines) {
            aiResponse.medicines.forEach(med => {
                const medName = med.name;
                if (analyticsData.medicineConsumption[medName] !== undefined) {
                    analyticsData.medicineConsumption[medName]++;
                }
            });
        }

        // Add to recent cases (keep last 20)
        analyticsData.recentCases.unshift({
            id: `CASE-${String(analyticsData.totalCases).padStart(3, '0')}`,
            category: aiResponse.category,
            timestamp: new Date().toISOString(),
            symptoms: userInput.substring(0, 100),
            medicines: aiResponse.medicines || []
        });
        if (analyticsData.recentCases.length > 20) {
            analyticsData.recentCases.pop();
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

// Book specialist doctor based on health condition
app.post('/api/book-specialist', async (req, res) => {
    try {
        const { symptoms, reasoning } = req.body;
        
        console.log(`Booking specialist for symptoms: ${symptoms}`);
        
        // Analyze symptoms and match with specialist
        const symptomText = (symptoms + ' ' + (reasoning || '')).toLowerCase();
        
        // Find matching doctors based on conditions
        let matchedDoctors = HOSPITAL_DOCTORS.filter(doctor => {
            return doctor.conditions.some(condition => 
                symptomText.includes(condition.toLowerCase())
            );
        });
        
        // If no specific match, assign Emergency Medicine Specialist or General Physician
        if (matchedDoctors.length === 0) {
            matchedDoctors = HOSPITAL_DOCTORS.filter(doctor => 
                doctor.specialty === 'Emergency Medicine Specialist' || 
                doctor.specialty === 'General Physician'
            );
        }
        
        // Select the best available doctor (first match)
        const assignedDoctor = matchedDoctors[0];
        
        // Generate appointment reference number
        const appointmentRef = `APT-${Date.now().toString().slice(-6)}`;
        
        console.log(`Assigned doctor: ${assignedDoctor.name} (${assignedDoctor.specialty})`);
        
        res.json({
            success: true,
            hospital: HOSPITAL_INFO,
            doctor: assignedDoctor,
            appointment: {
                reference: appointmentRef,
                time: assignedDoctor.nextSlot,
                status: 'Confirmed',
                instructions: 'Please arrive 15 minutes before your appointment time. Bring any previous medical records if available.'
            },
            alternativeDoctors: matchedDoctors.slice(1, 3) // Show 2 alternative doctors
        });
        
    } catch (error) {
        console.error('Error booking specialist:', error);
        res.status(500).json({
            error: 'Failed to book specialist appointment',
            message: error.message,
            details: error.toString()
        });
    }
});

// Get analytics data for dashboard
app.get('/api/analytics', (req, res) => {
    try {
        // Ensure all dates are present in casesPerDay
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            if (analyticsData.casesPerDay[key] === undefined) {
                analyticsData.casesPerDay[key] = 0;
            }
        }

        res.json({
            casesPerDay: analyticsData.casesPerDay,
            categoryDistribution: analyticsData.categoryDistribution,
            medicineConsumption: analyticsData.medicineConsumption,
            totalCases: analyticsData.totalCases,
            recentCases: analyticsData.recentCases.slice(0, 10)
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({ error: 'Failed to fetch analytics data' });
    }
});

// Helper function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
}

// Serve static files (HTML, CSS, JS) - MUST be LAST!
app.use(express.static(__dirname));

// Start server
app.listen(PORT, () => {
    console.log(`🏥 Rural Health Triage Server running on http://localhost:${PORT}`);
    console.log(`🌿 Traditional Home Remedies (Maa Ka Nuska): ${ALLOWED_MEDICINES.length}`);
    console.log(`👨‍⚕️ Specialist Doctors: ${HOSPITAL_DOCTORS.length}`);
    console.log(`🚗 Transport volunteers: ${TRANSPORT_VOLUNTEERS.length}`);
    console.log(`🤖 AI Model: llama-3.3-70b-versatile (Groq)`);
    console.log('\nEndpoints:');
    console.log('  POST /api/triage - Main triage endpoint');
    console.log('  GET  /api/medicines - Get home remedies list (maa ka nuska)');
    console.log('  GET  /api/transport-volunteers - Get transport volunteers');
    console.log('  POST /api/request-transport - Send emergency transport requests');
    console.log('  POST /api/book-specialist - Book specialist doctor appointment');
    console.log('  GET  /health - Health check');
});

module.exports = app;
