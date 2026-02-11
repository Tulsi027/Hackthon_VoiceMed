# 🏥 VoiceMed - Rural Health Triage System

A voice-based AI triage system that helps village health workers (Mukhiya) make safe healthcare decisions by classifying emergencies, routing doctor reviews, and guiding traditional home remedy treatments.

## 📋 Overview

This system helps rural healthcare workers:
- **Screen patients** using voice-based symptom collection in local languages
- **Classify urgency** into RED (emergency), YELLOW (doctor review), or GREEN (traditional care)
- **Guide treatment** with AI-powered clinical reasoning using traditional Indian remedies ("Maa Ka Nuska")
- **Book specialist appointments** at partnered hospitals with 12 specialist doctors
- **Arrange emergency transport** through a network of 6 local volunteers
- **Track analytics** via comprehensive admin dashboard
- **Ensure safety** with strict traditional remedy lists and escalation protocols

## 📑 Table of Contents

- [What Makes VoiceMed Unique](#-what-makes-voicemed-unique)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Usage Guide](#-usage-guide)
- [Technical Architecture](#️-technical-architecture)
- [Traditional Home Remedies](#-traditional-home-remedies-maa-ka-nuska)
- [API Endpoints](#-api-endpoints)
- [Demo Features](#-demo-features-hackathon)
- [Browser Compatibility](#-browser-compatibility)
- [Troubleshooting](#-troubleshooting)
- [Demo Scenarios](#-demo-scenarios)
- [Important Disclaimer](#️-important-disclaimer)

## 🌟 What Makes VoiceMed Unique

### Cultural Integration
- **Traditional Indian Remedies**: Uses familiar "Maa Ka Nuska" (grandmother's remedies) instead of unfamiliar Western medicines
- **12 Natural Remedies**: All ingredients easily available in rural households
- **No Pharmacy Needed**: Remedies use items like turmeric, ginger, tulsi, neem, honey - already in most homes

### Intelligent Triage System
- **AI-Powered**: Llama 3.3 70B model provides medical reasoning
- **3-Tier Classification**: RED (emergency), YELLOW (doctor review), GREEN (traditional care)
- **Smart Questions**: AI asks 2-4 targeted follow-up questions for accurate assessment
- **Safety First**: Automatically escalates serious conditions to hospitals

### Complete Ecosystem
- **12 Specialist Doctors**: Automatic matching based on symptoms
- **6 Transport Volunteers**: Emergency transport network with fair compensation
- **VitalCare Hospital Partnership**: 2.5 km away with full emergency facilities
- **Real-time Analytics**: Admin dashboard tracks all cases and remedy usage

### Voice-First Design
- **Hands-Free**: No typing needed - speak symptoms directly
- **Local Language**: Designed for Hindi and regional language support
- **Text-to-Speech**: AI responses spoken back for illiterate users
- **Mobile Friendly**: Works on phones and tablets

## ✨ Features

### 🎤 Voice Interface
- Hands-free operation in local languages (Hindi & regional languages)
- Real-time speech-to-text conversion using Web Speech API
- Text-to-speech responses for guidance
- Works on mobile and desktop browsers
- Conversation threading with AI follow-up questions

### 🤖 AI Clinical Reasoning
- **Model**: Llama 3.3 70B via Groq API
- Dynamic follow-up questions (2-4 questions max)
- Context-aware symptom assessment
- Risk-based triage classification with JSON responses
- Fast inference (50-200 tokens/sec)
- Temperature: 0.3 for consistent medical reasoning

### 🚨 Three-Level Triage System

#### 🔴 RED - EMERGENCY
- Immediate hospital referral required
- Conditions: chest pain, severe bleeding, stroke symptoms, unconsciousness, difficulty breathing, severe trauma
- **Automated Actions**:
  - Call 108 ambulance service
  - Book specialist doctor at VitalCare Community Hospital
  - Arrange emergency transport from 6 local volunteers
  - Alert hospital emergency department
- **NO traditional remedy recommendations**

#### 🟡 YELLOW - DOCTOR REVIEW
- Stable but medically concerning conditions
- Generates comprehensive medical report for doctor review
- **Doctor Consultation Options**:
  - Wait for AI-simulated review (5-minute timer for demo)
  - Request immediate consultation with specialist
  - Book appointment at VitalCare Community Hospital
  - Choose from 12 specialist doctors across specialties
- Returns with approved treatment plan and follow-up instructions

#### 🟢 GREEN - TRADITIONAL CARE (Maa Ka Nuska)
- Conditions manageable with traditional Indian home remedies
- Only recommends from 12 predefined traditional remedies
- **Available Remedies**:
  1. Haldi Doodh (Turmeric Milk) - Fever, pain, immunity
  2. Adrak Tulsi Chai (Ginger-Tulsi Tea) - Cold, fever, body ache
  3. Nimbu Pani (Lemon Water with Salt-Sugar) - Dehydration, diarrhea  
  4. Chawal Ka Pani (Rice Water) - Diarrhea, dehydration
  5. Dahi-Chaach (Curd/Buttermilk) - Digestion, stomach upset
  6. Neem Paste - Skin irritation, minor wounds
  7. Jeera Pani (Cumin Water) - Acidity, gas
  8. Thanda Doodh (Cold Milk) - Acidity, heartburn
  9. Shahad-Adrak (Honey-Ginger) - Cough, throat irritation
  10. Ajwain Ka Pani (Carom Water) - Stomach pain, gas
  11. Haldi Paste (Turmeric Paste) - Cuts, wounds
  12. Aloe Vera Gel - Burns, skin irritation
- Automatic 3-day follow-up reminder
- Usage tracking and analytics

### 🏥 Hospital & Specialist Integration

#### VitalCare Community Hospital Partnership
- **Distance**: 2.5 km from village
- **Facilities**: Emergency Ward, ICU, Operation Theater, Ambulance Service
- **Emergency Line**: +91-9876500108
- **24/7 Emergency Services**

#### 12 Specialist Doctors Available
1. **Dr. Rajesh Sharma** - General Surgeon (15 years)
2. **Dr. Priya Verma** - Cardiologist (18 years)
3. **Dr. Anil Kumar** - Neurologist (12 years)
4. **Dr. Sunita Reddy** - Gastroenterologist (10 years)
5. **Dr. Amit Patel** - Urologist (14 years)
6. **Dr. Meera Singh** - Orthopedic Surgeon (16 years)
7. **Dr. Vikram Joshi** - Pulmonologist (11 years)
8. **Dr. Kavita Desai** - Emergency Medicine Specialist (13 years)
9. **Dr. Ramesh Nair** - General Physician (20 years)
10. **Dr. Anjali Khanna** - Gynecologist (17 years)
11. **Dr. Sanjay Mehta** - Pediatrician (14 years)
12. **Dr. Deepak Rao** - ENT Specialist (9 years)

**AI-Powered Matching**: System automatically matches patient symptoms to appropriate specialist

### 🚗 Emergency Transport Network

#### 6 Local Volunteers Available
- **Rajesh Kumar** - Motorcycle (0.5 km, ₹500)
- **Suresh Patel** - Auto-rickshaw (1.2 km, ₹800)
- **Amit Singh** - Motorcycle (0.8 km, ₹500)
- **Vikram Yadav** - Car (2.0 km, ₹1200)
- **Mahesh Verma** - Motorcycle (1.5 km, ₹1500)
- **Ramesh Gupta** - Three-wheeler (1.0 km, ₹700)

**Features**:
- One-click emergency transport request
- Automatic notification to all available volunteers
- Real-time availability status
- Distance-based routing
- Fair compensation structure

### 📊 Admin Dashboard (`admin.html`)

#### Real-time Analytics
- **Daily Cases Chart**: Line graph showing last 7 days activity
- **Category Distribution**: Pie chart (RED/YELLOW/GREEN cases)
- **Medicine Consumption**: Bar chart of traditional remedy usage
- **Total Cases Counter**: Overall system usage statistics

#### Case Management
- View last 20 recent cases with details
- Filter by category (All/Emergency/Review/Local Care)
- Case ID tracking (CASE-001, CASE-002, etc.)
- Timestamp and symptoms logging
- Medicine dispensation records

#### Medicine Inventory
- Track usage of all 12 traditional remedies
- Visual indicators for consumption patterns
- Real-time updates on medicine dispensation

### 💊 Safety Features
- **Strict traditional remedy list** - Only 12 approved home remedies ("Maa Ka Nuska")
- **No diagnosis** - Decision support only, always states "I am not a doctor"
- **Clear disclaimers** - Explicit non-medical advice warnings
- **Escalation bias** - When in doubt, always escalate to YELLOW or RED
- **Natural ingredients only** - Uses easily available household items
- **Cultural appropriateness** - Traditional Indian remedies familiar to rural communities

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Groq API key ([Get one free here](https://console.groq.com/keys))
- Modern web browser with speech recognition support (Chrome/Edge/Safari)
- Microphone access for voice input

### Installation

1. **Clone or download the project**
```bash
cd Hackthon_VoiceMed
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

**Expected Console Output:**
```
🏥 Rural Health Triage Server running on http://localhost:3000
🌿 Traditional Home Remedies (Maa Ka Nuska): 12
👨‍⚕️ Specialist Doctors: 12
🚗 Transport volunteers: 6
🤖 AI Model: llama-3.3-70b-versatile (Groq)

Endpoints:
  POST /api/triage - Main triage endpoint
  GET  /api/medicines - Get home remedies list (maa ka nuska)
  GET  /api/transport-volunteers - Get transport volunteers
  POST /api/request-transport - Send emergency transport requests
  POST /api/book-specialist - Book specialist doctor appointment
  GET  /api/analytics - Get dashboard analytics
  GET  /health - Health check
```

5. **Open the applications**
- **Main Interface**: Open `index.html` or go to `http://localhost:3000/index.html`
- **Admin Dashboard**: Open `admin.html` or go to `http://localhost:3000/admin.html`

## 📱 Usage Guide

### For Mukhiya (Village Health Worker) - index.html

1. **Click the microphone button** 🎤
2. **Speak patient symptoms** clearly (e.g., "Patient has fever and headache")
3. **Answer AI follow-up questions** (typically 2-4 questions for accurate assessment)
4. **Receive triage decision**:
   - **🔴 RED**: Emergency - Use action buttons to call 108, book specialist, arrange transport
   - **🟡 YELLOW**: Doctor review - Wait for review or request immediate consultation
   - **🟢 GREEN**: Traditional care - Dispense recommended home remedies (Maa Ka Nuska)
5. **Start new consultation** - Click "New Consultation" button to help next patient

### For Healthcare Administrators - admin.html

1. **Open Admin Dashboard** at `http://localhost:3000/admin.html`
2. **Monitor Statistics**:
   - Total cases processed today
   - Emergency cases (RED)
   - Doctor reviews (YELLOW)
   - Local care (GREEN)
3. **View Analytics**:
   - Daily trends (7-day chart)
   - Category distribution
   - Traditional remedy consumption patterns
4. **Manage Cases**:
   - View recent 20 cases
   - Filter by category (All/Emergency/Review/Local Care)
   - Track medicine dispensation
5. **Auto-refresh**: Dashboard updates every 30 seconds
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

AI: "🟢 GREEN - TRADITIONAL/BASIC CARE (Maa Ka Nuska)
     Based on mild fever, body aches, and cough with no danger signs,
     this appears to be a common viral illness.
     
     Recommended traditional home remedies:
     - Haldi Doodh (Turmeric Milk): 1 glass warm milk with 1/2 teaspoon 
       turmeric powder, drink before bedtime
     - Adrak Tulsi Chai (Ginger-Tulsi Tea): Boil 5-6 tulsi leaves with 
       crushed ginger, drink 2-3 times daily
     
     Monitor patient and return if fever persists beyond 3 days or worsens."
```

## 🛠️ Technical Architecture

### Frontend
- **Main Interface** (`index.html`): Patient triage and consultation
- **Admin Dashboard** (`admin.html`): Analytics and case management
- Pure HTML/CSS/JavaScript (no framework dependencies)
- Web Speech API for voice input/output
- Chart.js for analytics visualization
- Real-time conversation threading
- Responsive design for mobile/desktop

### Backend (`server.js`)
- Express.js REST API server
- Groq SDK for AI inference (Llama 3.3 70B)
- CORS enabled for local development
- In-memory analytics storage
- 6 API endpoints for complete functionality

### AI Model
- **Model**: Llama 3.3 70B Versatile (via Groq Cloud)
- **Temperature**: 0.3 (consistent medical reasoning)
- **Response format**: JSON for structured output
- **Max tokens**: 1000
- **Inference speed**: ~50-200 tokens/sec
- **Context**: System prompt with 12 remedies, triage guidelines

### Dependencies (package.json)
#### Production Dependencies
- **express** (^4.18.2) - Web server framework
- **cors** (^2.8.5) - Cross-origin resource sharing
- **dotenv** (^17.2.4) - Environment variable management
- **groq-sdk** (^0.3.0) - Groq AI API client
- **node-fetch** (^2.7.0) - HTTP request library

#### Development Dependencies
- **nodemon** (^3.0.1) - Auto-restart server on file changes

#### Frontend Dependencies (via CDN)
- **Chart.js** (4.4.1) - Analytics visualization in admin dashboard

## 🌿 Traditional Home Remedies (Maa Ka Nuska)

Only these 12 traditional remedies can be recommended for GREEN cases:

1. **Haldi Doodh (Turmeric Milk)** - Fever, pain relief, immunity boost
   - 1 glass warm milk with 1/2 teaspoon turmeric powder, drink before bedtime
   
2. **Adrak Tulsi Chai (Ginger-Tulsi Tea)** - Fever, cold, body ache
   - Boil 5-6 tulsi leaves with crushed ginger, drink 2-3 times daily
   
3. **Nimbu Pani with Namak-Shakkar** - Dehydration, diarrhea, weakness
   - Mix juice of 1 lemon, pinch of salt, 1 teaspoon sugar in 1 glass water
   
4. **Chawal Ka Pani (Rice Water)** - Diarrhea, dehydration
   - Boil rice, strain the water, drink 1 cup 3-4 times daily
   
5. **Dahi-Chaach (Curd/Buttermilk)** - Stomach upset, digestion, dehydration
   - 1 glass buttermilk with pinch of roasted jeera powder, 2-3 times daily
   
6. **Neem Paste** - Skin irritation, itching, minor wounds
   - Grind fresh neem leaves, apply paste on affected area, wash after 20 minutes
   
7. **Jeera Pani (Cumin Water)** - Acidity, indigestion, gas
   - Boil 1 teaspoon jeera in water, strain and drink warm after meals
   
8. **Thanda Doodh (Cold Milk)** - Acidity, heartburn
   - 1 glass cold milk without sugar, drink slowly
   
9. **Shahad-Adrak (Honey-Ginger)** - Cough, throat irritation, cold
   - Mix 1 teaspoon honey with few drops of ginger juice, take 3 times daily
   
10. **Ajwain Ka Pani (Carom Seeds Water)** - Stomach pain, gas, indigestion
    - Boil 1 teaspoon ajwain in water, drink warm
    
11. **Haldi Paste (Turmeric Paste)** - Minor cuts, wounds, skin infections
    - Mix turmeric powder with water to make paste, apply on clean wound
    
12. **Aloe Vera Gel** - Minor burns, skin irritation, cuts
    - Apply fresh aloe vera gel directly on affected area, leave for 20-30 minutes

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
- **Doctor Review**: 5-minute countdown timer (instead of actual 50-60 min wait)
- **Hospital Alerts**: Alert dialogs (would be SMS/direct API calls in production)
- **Transport Coordination**: Simulated notification system
- **Location Services**: Mocked distance calculations
- **In-Memory Storage**: Analytics data resets on server restart

### Fully Functional Features
- ✅ Real AI-powered triage using Groq API (Llama 3.3 70B)
- ✅ Voice recognition and speech synthesis
- ✅ 12 Traditional home remedies database
- ✅ 12 Specialist doctors with intelligent matching
- ✅ 6 Transport volunteers database
- ✅ Admin dashboard with real-time analytics
- ✅ Case tracking and management system
- ✅ Traditional remedy consumption tracking

### Production Readiness
For production deployment, enhance with:
- Persistent database (MongoDB/PostgreSQL) instead of in-memory storage
- Real SMS/call integration (Twilio, MSG91, or local providers)
- Actual hospital EHR/API integration
- Real-time GPS location services
- Offline voice recognition capability
- Multi-language support (Hindi, Telugu, Tamil, Bengali, etc.)
- User authentication and session management
- Medicine inventory management system
- WhatsApp integration for wider reach
- Integration with National Health Mission systems

## 📂 Project Structure

```
Hackthon_VoiceMed/
├── index.html          # Main triage interface for village health workers
├── admin.html          # Admin dashboard with analytics and case management
├── server.js           # Backend API server with AI integration
├── package.json        # Dependencies and scripts
├── package-lock.json   # Dependency lock file
├── .env.example        # Environment variable template
├── .env               # Your API keys (git-ignored)
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## 🔧 API Endpoints

### Core Triage
- **`POST /api/triage`** - Main AI triage endpoint
  - Accepts: sessionId, userInput, conversationHistory
  - Returns: Question or triage decision (RED/YELLOW/GREEN)
  
### Resource Management
- **`GET /api/medicines`** - Get list of 12 traditional remedies
- **`GET /api/transport-volunteers`** - Get 6 available transport volunteers
- **`POST /api/request-transport`** - Send emergency transport request to all volunteers
- **`POST /api/book-specialist`** - Auto-match and book specialist doctor appointment
  
### Analytics
- **`GET /api/analytics`** - Get dashboard data
  - Returns: Daily cases, category distribution, medicine consumption, recent cases
  
### System
- **`GET /health`** - Server health check
- **Static files** - Serves HTML/CSS/JS files

### Detailed API Examples

#### POST /api/triage

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

**Response (triage decision - GREEN with traditional remedies):**
```json
{
  "needsMoreInfo": false,
  "category": "GREEN",
  "reasoning": "Mild symptoms with no danger signs",
  "actions": ["Monitor patient", "Follow up in 3 days"],
  "medicines": [
    {
      "name": "Haldi Doodh (Turmeric Milk)",
      "dosage": "1 glass warm milk with 1/2 teaspoon turmeric powder",
      "instructions": "Drink before bedtime"
    }
  ]
}
```

#### POST /api/book-specialist

**Request:**
```json
{
  "symptoms": "chest pain and breathing difficulty",
  "reasoning": "Severe chest pain requires immediate attention"
}
```

**Response:**
```json
{
  "success": true,
  "hospital": {
    "name": "VitalCare Community Hospital",
    "distance": "2.5 km",
    "emergency": "+91-9876500108"
  },
  "doctor": {
    "name": "Dr. Priya Verma",
    "specialty": "Cardiologist",
    "experience": "18 years",
    "phone": "+91-9876501002",
    "nextSlot": "03:00 PM Today"
  },
  "appointment": {
    "reference": "APT-123456",
    "time": "03:00 PM Today",
    "status": "Confirmed"
  }
}
```

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
- ✅ **Solution**: Use Chrome or Safari browser (Firefox has limited Web Speech API support)
- ✅ Check microphone permissions in browser settings
- ✅ Try desktop version instead of mobile if issues persist

### "Error connecting to server"
- ✅ **Solution**: Ensure server is running with `npm start`
- ✅ Check if port 3000 is available (or change PORT in .env)
- ✅ Verify GROQ_API_KEY is correctly set in .env file
- ✅ Look for error messages in server console

### "AI response errors" or "500 Internal Server Error"
- ✅ **Solution**: Verify Groq API key is valid and has credits
- ✅ Check internet connection (required for Groq API)
- ✅ Review server console logs for detailed error messages
- ✅ Test API key at https://console.groq.com/

### "Admin dashboard shows no data"
- ✅ **Solution**: Complete at least one triage consultation first
- ✅ Refresh the page (or wait 30 seconds for auto-refresh)
- ✅ Check browser console for JavaScript errors
- ✅ Ensure server is running and accessible

### CORS errors
- ✅ **Solution**: Make sure both frontend and backend are on localhost
- ✅ Clear browser cache and reload page
- ✅ Check that CORS is enabled in server.js (it's enabled by default)

### "Cannot find module" errors during npm start
- ✅ **Solution**: Delete `node_modules` folder and run `npm install` again
- ✅ Ensure you're in the correct directory (Hackthon_VoiceMed)
- ✅ Check that Node.js version is 16 or higher

## 📈 Future Enhancements

### ✅ Already Implemented (v1.0)
- ✅ Admin dashboard with analytics (admin.html)
- ✅ Specialist doctor booking system (12 doctors)
- ✅ Emergency transport network (6 volunteers)
- ✅ Traditional home remedies (12 Maa Ka Nuska)
- ✅ Real-time case tracking and analytics
- ✅ Voice-based interaction with AI

### Phase 2 (Production Ready)
- [ ] **Persistent Database**: MongoDB/PostgreSQL instead of in-memory storage
- [ ] **Real SMS Integration**: Twilio/MSG91 for emergency alerts
- [ ] **Hospital EHR Integration**: Connect with actual hospital systems
- [ ] **Offline Mode**: Local AI model for areas with poor connectivity
- [ ] **Multi-language**: Hindi, Telugu, Tamil, Bengali, Marathi voice support
- [ ] **User Authentication**: Secure login for healthcare workers
- [ ] **Inventory Management**: Track traditional remedy supplies
- [ ] **Real GPS**: Actual location-based volunteer routing
- [ ] **108 Integration**: Direct connection to ambulance service
- [ ] **Patient History**: Track follow-ups and outcomes

### Phase 3 (Scale & Advanced Features)
- [ ] **Mobile Apps**: Native Android/iOS applications
- [ ] **WhatsApp Bot**: Reach users on popular messaging platform
- [ ] **Telemedicine**: Video consultation with doctors
- [ ] **Predictive Analytics**: Disease outbreak detection
- [ ] **Government Integration**: National Health Mission systems
- [ ] **Electronic Health Records**: Complete patient record system
- [ ] **Training Module**: Interactive learning for village health workers
- [ ] **Quality Assurance**: Audit trails and case reviews
- [ ] **Regional Customization**: Adapt remedies for different regions
- [ ] **Community Health Metrics**: Village-level health tracking
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

### Medical Disclaimer
- ❌ Not approved for medical use or clinical deployment
- ❌ Not a substitute for professional medical advice, diagnosis, or treatment
- ❌ Requires validation by licensed healthcare professionals
- ❌ Should not replace trained medical personnel
- ✅ For educational and hackathon demonstration only
- ✅ Real deployment requires regulatory compliance and medical authority approval

### Traditional Remedies Disclaimer
- The 12 traditional home remedies ("Maa Ka Nuska") are cultural practices passed down through generations
- These remedies are NOT FDA-approved medicines or treatments
- Individual results may vary; not all remedies work for everyone
- Consult with qualified healthcare providers before using any remedy
- For serious conditions, always seek immediate professional medical care
- System is designed to escalate serious cases to hospitals (RED category)

### AI & Technology Disclaimer
- AI decisions are based on pattern recognition, not medical training
- System explicitly states "I am not a doctor" in all responses
- Groq API and internet connectivity required; offline mode not available
- Voice recognition accuracy depends on environment and pronunciation
- Data privacy: No patient data is permanently stored (demo version)

## 📞 Support

For questions about this project:
- Check the code comments in `server.js` and `index.html`
- Review the API documentation above
- Test with the example scenarios below

## 🎬 Demo Scenarios

Try these test cases to see the system in action:

### Scenario 1: Emergency (RED)
```
Input: "Patient has severe chest pain and difficulty breathing"
Expected: 
→ RED classification
→ Emergency action buttons (Call 108, Book Specialist, Arrange Transport)
→ No traditional remedy recommendations
→ Immediate hospital referral
```

### Scenario 2: Doctor Review (YELLOW)
```
Input: "Patient has been having stomach pain for 3 days, getting worse"
Expected:
→ AI asks follow-up questions about severity, vomiting, fever
→ YELLOW classification
→ Doctor review countdown timer (5 minutes demo)
→ Option to request immediate consultation
→ Specialist booking available
```

### Scenario 3: Traditional Care (GREEN)
```
Input: "Patient has mild fever since yesterday and slight cough"
Expected:
→ AI asks about temperature, other symptoms
→ GREEN classification
→ Traditional remedies recommended:
  - Haldi Doodh (Turmeric Milk)
  - Adrak Tulsi Chai (Ginger-Tulsi Tea)
→ 3-day follow-up reminder set
→ Dosage and preparation instructions provided
```

### Scenario 4: Admin Dashboard
```
Steps:
1. Complete a few consultations with different categories
2. Open admin.html
3. View:
   - Daily cases chart (last 7 days)
   - Category distribution pie chart
   - Traditional remedy usage bar chart
   - Recent cases list with filtering options
```

---

**VoiceMed: Built for rural healthcare workers, powered by AI, guided by tradition, focused on safety.** 🏥🌿

### Key Statistics
- 🤖 AI Model: Llama 3.3 70B (Groq Cloud)
- 🌿 Traditional Remedies: 12 Maa Ka Nuska
- 👨‍⚕️ Specialist Doctors: 12 across all major specialties
- 🚗 Transport Volunteers: 6 with various vehicles
- 📊 Admin Analytics: Real-time dashboard with charts
- 🎤 Voice-enabled: Hands-free operation with speech recognition
