# AI Email Generator

A web-based application that generates professional emails using Google's Gemini AI model.

## Structure

```
EMAIL-AI/
├── backend/
│   ├── app.py
│   ├── .env
│   └── requirements.txt
└── frontend/
    ├── index.html
    ├── style.css
    └── script.js
```

## Setup

1. **Clone**
```bash
git clone https://github.com/SaiAbhiRam9496/EMAIL-AI.git
cd EMAIL-AI
```

2. **Install Dependencies**
```bash
cd backend
pip install -r requirements.txt
```

3. **Configure API Key**
Create `.env` file in `backend/`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

## Run

**Backend:**
```bash
cd backend
python app.py
```
Server: `http://127.0.0.1:5000`

**Frontend:**
```bash
cd frontend
python -m http.server 8000
```
Access: `http://localhost:8000`

## API

**POST** `/generate-email`
```json
{
  "prompt": "Write a professional email..."
}
```

## Troubleshooting

- **API Key Error**: Check `.env` file contains valid key
- **Connection Error**: Ensure backend runs on port 5000
- **CORS Error**: Verify frontend API URL matches backend

---

**Repository**: https://github.com/SaiAbhiRam9496/EMAIL-AI
