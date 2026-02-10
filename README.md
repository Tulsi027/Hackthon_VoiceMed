# 🏥 Rural Health Triage System

A voice-based AI triage system that helps village health workers (Mukhiya) make safe healthcare decisions by classifying emergencies, routing doctor reviews, and guiding local treatment.

## 📋 Overview

This system helps rural healthcare workers:
- **Screen patients** using voice-based symptom collection
- **Classify urgency** into RED (emergency), YELLOW (doctor review), or GREEN (local care)
- **Guide treatment** with AI-powered clinical reasoning
- **Ensure safety** with strict medicine lists and escalation protocols

## ✨ Features

### 🎤 Voice Interface
- Hands-free operation in local languages
- Real-time speech-to-text conversion
- Text-to-speech responses
- Works on mobile and desktop

### 🤖 AI Clinical Reasoning
- Dynamic follow-up questions (2-4 questions max)
- Context-aware symptom assessment
- Risk-based triage classification
- Fast inference using Groq API

### 🚨 Three-Level Triage System

#### 🔴 RED - EMERGENCY
- Immediate hospital referral required
- Conditions: chest pain, severe bleeding, stroke symptoms, unconsciousness
- Actions: Call 108, alert hospital, arrange transport
- **NO medicine recommendations**

#### 🟡 YELLOW - DOCTOR REVIEW
- Stable but medically concerning
- Generates medical report for doctor
- Simulated doctor review (50-60 min demo timer)
- Returns with approved treatment plan

#### 🟢 GREEN - LOCAL CARE
- Conditions manageable at village level
- Only recommends from predefined medicine list
- Automatic 3-day follow-up reminder
- Medicine tracking and logging

### 💊 Safety Features
- **Strict medicine list** - Only 6 approved medicines
- **No diagnosis** - Decision support only
- **Clear disclaimers** - "I am not a doctor"
- **Escalation bias** - When in doubt, escalate

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Groq API key ([Get one here](https://console.groq.com/keys))
- Modern web browser with speech recognition support

### Installation

1. **Clone or download the project**
```bash
cd rural-health-triage
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your Groq API key
# GROQ_API_KEY=gsk_your_actual_key_here
```

4. **Start the server**
```bash
npm start
```

The server will start on `http://localhost:3000`

5. **Open the web interface**
Open `index.html` in your browser (you can double-click the file or use a local server)

## 📱 Usage Guide

### For Mukhiya (Village Health Worker)

1. **Click the microphone button** 🎤
2. **Speak patient symptoms** in your language
3. **Answer AI follow-up questions** (2-4 questions)
4. **Receive triage decision**:
   - **RED**: Follow emergency actions immediately
   - **YELLOW**: Wait for doctor review (simulated)
   - **GREEN**: Dispense recommended medicines from village box

### Example Consultation Flow

```
Mukhiya: "Patient has fever and headache since yesterday"

AI: "I understand the patient has fever and headache since yesterday. 
     To assess this properly, can you tell me:
     1. What is the patient's temperature if measured?
     2. Is there any neck stiffness or vomiting?"

Mukhiya: "Temperature is 99 degrees, no neck stiffness"

AI: "Any body aches or cough?"

Mukhiya: "Yes, mild body aches and slight cough"

AI: "🟢 GREEN - LOCAL/BASIC CARE
     Based on mild fever, body aches, and cough with no danger signs,
     this appears to be a common viral illness.
     
     Recommended medicines:
     - Paracetamol: 500mg every 6 hours for fever
     - Cough syrup: 2 teaspoons 3 times daily
     
     Monitor patient and return if fever persists beyond 3 days."
```

## 🛠️ Technical Architecture

### Frontend (`index.html`)
- Pure HTML/CSS/JavaScript
- Web Speech API for voice input/output
- Real-time conversation threading
- Responsive design for mobile/desktop

### Backend (`server.js`)
- Express.js server
- Groq SDK for AI inference
- JSON API endpoints
- CORS enabled for local development

### AI Model
- **Model**: Llama 3.3 70B (via Groq)
- **Temperature**: 0.3 (consistent medical reasoning)
- **Response format**: JSON
- **Max tokens**: 1000
- **Inference speed**: ~50-200 tokens/sec

## 📊 Predefined Medicine List

Only these 6 medicines can be recommended for GREEN cases:

1. **Paracetamol** - Fever, pain relief
2. **ORS** - Dehydration, diarrhea
3. **Cetirizine** - Allergies, itching
4. **Antacid Syrup** - Acidity, heartburn
5. **Cough Syrup** - Cough, throat irritation
6. **Antiseptic Cream** - Minor cuts, wounds

## 🔒 Safety & Ethics

### Built-in Safeguards
- ✅ Clear "not a doctor" disclaimer
- ✅ No diagnosis provided
- ✅ Strict medicine list (no substitutions)
- ✅ Emergency escalation bias
- ✅ Doctor review for ambiguous cases
- ✅ Basic dosage guidance only

### Limitations
- This is a **decision support tool**, not a medical device
- Requires human oversight by village health worker
- Simulated doctor review (for hackathon demo)
- Voice recognition accuracy depends on environment
- Requires internet connection for AI inference

## 🎯 Demo Features (Hackathon)

### Simulated Components
- **Doctor Review**: 5-minute countdown timer (instead of 50-60 min)
- **Hospital Alerts**: Alert dialogs (would be SMS/API in production)
- **Transport Coordination**: Simulated with alerts
- **Location**: Mocked for demo purposes

### Production Readiness
For production deployment, add:
- Real SMS/call integration (Twilio, MSG91)
- Hospital database integration
- Electronic Health Records (EHR)
- Offline voice recognition
- Multi-language support
- Admin dashboard for tracking
- Medicine inventory management

## 📂 Project Structure

```
rural-health-triage/
├── index.html          # Frontend interface
├── server.js           # Backend API server
├── package.json        # Dependencies
├── .env.example        # Environment template
└── README.md          # This file
```

## 🔧 API Endpoints

### `POST /api/triage`
Main triage endpoint for AI reasoning

**Request:**
```json
{
  "sessionId": "session_1234567890",
  "userInput": "Patient has fever and cough",
  "conversationHistory": []
}
```

**Response (needs more info):**
```json
{
  "needsMoreInfo": true,
  "question": "What is the patient's temperature?"
}
```

**Response (triage decision):**
```json
{
  "needsMoreInfo": false,
  "category": "GREEN",
  "reasoning": "Mild symptoms with no danger signs",
  "actions": ["Monitor patient", "Follow up in 3 days"],
  "medicines": [
    {
      "name": "Paracetamol",
      "dosage": "500mg every 6 hours",
      "instructions": "Take with food"
    }
  ]
}
```

### `GET /api/medicines`
Get list of allowed medicines

### `GET /health`
Server health check

## 🌐 Browser Compatibility

### Voice Recognition Support
- ✅ Chrome/Edge (Windows, macOS, Android)
- ✅ Safari (macOS, iOS)
- ❌ Firefox (limited support)

### Recommended Setup
- Chrome browser on desktop/mobile
- Stable internet connection
- Microphone access enabled
- Quiet environment for voice input

## 🔑 Environment Variables

Create a `.env` file with:

```bash
GROQ_API_KEY=gsk_your_api_key_here
PORT=3000
NODE_ENV=development
```

Get your Groq API key from: https://console.groq.com/keys

## 🐛 Troubleshooting

### "Voice input not supported"
- Use Chrome or Safari browser
- Check microphone permissions
- Try desktop instead of mobile

### "Error connecting to server"
- Ensure server is running (`npm start`)
- Check if port 3000 is available
- Verify GROQ_API_KEY in .env file

### "AI response errors"
- Verify Groq API key is valid
- Check internet connection
- Review server console logs

### CORS errors
- Make sure both frontend and backend are on localhost
- Clear browser cache and reload

## 📈 Future Enhancements

### Phase 2 (Production)
- [ ] Offline mode with local AI model
- [ ] Multi-language voice support (Hindi, regional languages)
- [ ] Real doctor integration via telemedicine
- [ ] Medicine inventory tracking
- [ ] Patient database and follow-up system
- [ ] SMS alerts for emergencies
- [ ] Integration with 108 ambulance service

### Phase 3 (Scale)
- [ ] Mobile app (Android/iOS)
- [ ] WhatsApp bot integration
- [ ] Tablet mode for better voice recognition
- [ ] Analytics dashboard for health authorities
- [ ] Integration with National Health Mission systems
- [ ] Training module for Mukhiyas

## 📄 License

MIT License - Free to use for healthcare and educational purposes

## 🤝 Contributing

This is a hackathon project. For production deployment:
1. Add comprehensive testing
2. Implement real integrations (SMS, EHR, etc.)
3. Get medical professional validation
4. Follow local healthcare regulations
5. Add security measures (authentication, encryption)

## ⚠️ Important Disclaimer

**THIS IS A PROTOTYPE SYSTEM FOR DEMONSTRATION PURPOSES.**

- Not approved for medical use
- Requires validation by healthcare professionals
- Should not replace trained medical personnel
- For educational and hackathon demonstration only
- Real deployment requires regulatory compliance

## 📞 Support

For questions about this project:
- Check the code comments in `server.js` and `index.html`
- Review the API documentation above
- Test with the example scenarios below

## 🎬 Demo Scenarios

Try these test cases:

### Scenario 1: Emergency (RED)
```
"Patient has severe chest pain and difficulty breathing"
→ Should trigger RED classification
→ Should show emergency action buttons
```

### Scenario 2: Doctor Review (YELLOW)
```
"Patient has been having stomach pain for 3 days, getting worse"
→ Should ask follow-up questions
→ Should classify as YELLOW
→ Should start doctor review timer
```

### Scenario 3: Basic Care (GREEN)
```
"Patient has mild fever since yesterday and slight cough"
→ Should ask about temperature
→ Should classify as GREEN
→ Should recommend Paracetamol and Cough Syrup
```

---

**Built for rural healthcare workers, powered by AI, focused on safety.** 🏥
