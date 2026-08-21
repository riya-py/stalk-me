# Interactive MAC-OS-AI Portfolio

An interactive, macOS-inspired developer portfolio with an AI-powered recruiter assistant.

HireMeAI combines a visually interactive React portfolio with a FastAPI backend that reads the candidate's resume, converts it into structured information using an LLM, and provides a conversational AI assistant that can answer recruiter questions about the candidate.

> **Live Demo:** Add your deployed URL here
> **Frontend:** React + Vite
> **Backend:** FastAPI + Groq
> **AI Model:** `openai/gpt-oss-120b`

---

## ✨ Features

### 🖥️ Interactive Portfolio

* macOS-inspired desktop interface
* Draggable folders and application windows
* Animated navigation and UI interactions
* Project explorer
* Resume viewer
* GitHub, LinkedIn and email windows
* Safari-style browser window
* Terminal-style interface
* Responsive desktop/tablet experience
* Dark/light themed UI elements

### 🤖 AI Recruiter Assistant

HireMeAI includes an AI chatbot designed specifically for recruiters.

Instead of using a generic chatbot, the assistant is grounded in the candidate's actual resume.

It can answer questions such as:

* What technologies does the candidate know?
* Does the candidate have internship experience?
* What projects has the candidate worked on?
* Is the candidate suitable for a particular role?
* What is the candidate's educational background?
* What experience does the candidate have with a particular technology?

The assistant is explicitly instructed **not to invent information that isn't present in the resume**.

### 📄 Automatic Resume Parsing

The backend reads the candidate's PDF resume and uses an LLM to convert it into structured JSON containing:

* Name
* Email
* Phone
* Total experience
* Skills
* Work experience
* Internships
* Education
* Projects
* Certifications

The parsed resume is cached in memory so the PDF does not need to be processed for every chatbot request.

### ⚡ Streaming Responses

Chat responses are streamed from the FastAPI backend to the React frontend.

The frontend then reveals the response progressively using a typewriter-style animation for a more natural chat experience.

### 💬 Conversational Context

The chatbot maintains recent conversation history.

The backend sends the most recent messages back to the model, allowing recruiters to ask follow-up questions without repeating context.

---

## 🏗️ Architecture

```text
                         ┌─────────────────────────┐
                         │       React Frontend     │
                         │                         │
                         │  macOS-style Portfolio  │
                         │  Interactive Windows   │
                         │  AI Chatbot            │
                         └────────────┬────────────┘
                                      │
                                      │ HTTP / Streaming
                                      ▼
                         ┌─────────────────────────┐
                         │      FastAPI Backend    │
                         │                         │
                         │  /                    │
                         │  /resume              │
                         │  /chat                │
                         └────────────┬────────────┘
                                      │
                         ┌────────────┴────────────┐
                         │                         │
                         ▼                         ▼
                  ┌──────────────┐          ┌──────────────┐
                  │ Resume PDF   │          │    Groq API  │
                  │              │          │              │
                  │    pypdf     │          │ GPT OSS      │
                  └──────────────┘          └──────────────┘
```

### Request flow

1. The portfolio loads in the browser.
2. A recruiter opens the chatbot.
3. The recruiter sends a question.
4. React sends the question and recent conversation history to `/chat`.
5. FastAPI loads the structured resume data.
6. The backend constructs a grounded system prompt.
7. Groq generates the response.
8. The response is streamed back to the browser.
9. React displays the answer progressively.

---

## 🛠️ Tech Stack

### Frontend

| Technology     | Purpose                           |
| -------------- | --------------------------------- |
| React 19       | UI framework                      |
| Vite           | Development server and build tool |
| Tailwind CSS   | Styling                           |
| GSAP           | Animations and interactions       |
| GSAP Draggable | Draggable desktop elements        |
| Zustand        | State management                  |
| React Markdown | Rendering chatbot responses       |
| React PDF      | PDF rendering                     |
| Lucide React   | Icons                             |
| Day.js         | Date/time utilities               |
| clsx           | Conditional class names           |

### Backend

| Technology            | Purpose                               |
| --------------------- | ------------------------------------- |
| Python                | Backend language                      |
| FastAPI               | REST API                              |
| Uvicorn               | ASGI server                           |
| Groq                  | LLM API                               |
| `openai/gpt-oss-120b` | AI model                              |
| Pydantic              | Data validation                       |
| pypdf                 | Resume PDF extraction                 |
| python-dotenv         | Environment variable management       |
| uv                    | Python package/environment management |

---

## 📁 Project Structure

```text
hiremeai/
│
├── backend/
│   │
│   ├── hiremeai/
│   │   ├── main.py
│   │   ├── my_resume.pdf
│   │   ├── pyproject.toml
│   │   ├── README.md
│   │   └── .env
│   │
│   ├── main.py
│   ├── pyproject.toml
│   ├── uv.lock
│   ├── .python-version
│   └── .gitignore
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── ControlCenter.jsx
│   │   │   ├── Dock.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Welcome.jsx
│   │   │   ├── WindowControls.jsx
│   │   │   └── index.js
│   │   │
│   │   ├── constants/
│   │   │   └── index.js
│   │   │
│   │   ├── hoc/
│   │   │   └── WindowWrapper.jsx
│   │   │
│   │   ├── store/
│   │   │   ├── Window.jsx
│   │   │   └── location.js
│   │   │
│   │   ├── windows/
│   │   │   ├── Chatbot.jsx
│   │   │   ├── Finder.jsx
│   │   │   ├── Github.jsx
│   │   │   ├── Image.jsx
│   │   │   ├── Linkedin.jsx
│   │   │   ├── Mail.jsx
│   │   │   ├── Resume.jsx
│   │   │   ├── Safari.jsx
│   │   │   ├── Terminal.jsx
│   │   │   ├── Text.jsx
│   │   │   └── index.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── index.html
│   └── .gitignore
│
└── .gitignore
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* Python 3.14+
* [uv](https://docs.astral.sh/uv/)
* A Groq API key

---

## 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd hiremeai
```

---

# ⚙️ Backend Setup

Navigate to the backend project:

```bash
cd backend/hiremeai
```

This project uses **uv** for Python environment and dependency management.

### Install dependencies

```bash
uv sync
```

### Configure environment variables

Create a `.env` file inside `backend/hiremeai/`:

```env
GROQ_API_KEY=your_groq_api_key
```

Do not commit your `.env` file to Git.

### Start the backend

```bash
uv run uvicorn main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

FastAPI's interactive API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

---

# 🎨 Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🔗 Frontend → Backend Configuration

The chatbot uses the following environment variable:

```env
VITE_API_URL=http://localhost:8000
```

Create:

```text
frontend/.env
```

with:

```env
VITE_API_URL=http://localhost:8000
```

If the variable is not provided, the frontend automatically falls back to:

```text
http://localhost:8000
```

---

# 🔌 API Endpoints

## `GET /`

Health check endpoint.

### Response

```json
{
  "message": "HireMeAI is running!"
}
```

---

## `GET /resume`

Extracts and returns structured information from the candidate's resume.

### Example response

```json
{
  "name": "...",
  "email": "...",
  "phone": "...",
  "skills": [],
  "experiences": [],
  "education": [],
  "projects": [],
  "certifications": []
}
```

The resume is parsed using the configured Groq model and cached after the first request.

---

## `POST /chat`

Sends a recruiter question to the AI assistant.

### Request

```json
{
  "question": "What technologies does the candidate know?",
  "history": [
    {
      "role": "user",
      "content": "Does she have AI experience?"
    },
    {
      "role": "assistant",
      "content": "..."
    }
  ]
}
```

### Response

The endpoint returns a streamed plain-text response.

---

# 🧠 AI Design

HireMeAI uses a **resume-grounded prompting approach**.

Before answering recruiter questions, the backend:

1. Extracts text from the candidate's PDF.
2. Sends the resume to the LLM for structured extraction.
3. Validates the resulting JSON using Pydantic.
4. Stores the structured resume in memory.
5. Uses the structured resume as the chatbot's candidate context.
6. Includes recent conversation history.
7. Streams the generated answer back to the frontend.

The chatbot is explicitly instructed to avoid hallucinating candidate information.

For example, if the resume does not mention a particular technology, the assistant should respond that the resume does not provide that information instead of assuming the candidate knows it.

---

# 🔐 Environment Variables

### Backend

```env
GROQ_API_KEY=your_groq_api_key
```

### Frontend

```env
VITE_API_URL=http://localhost:8000
```

Never commit API keys or other secrets to Git.

---

# 🧪 Development

### Backend

Run the development server:

```bash
uv run uvicorn main:app --reload
```

### Frontend

Run Vite:

```bash
npm run dev
```

### Build frontend

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint frontend

```bash
npm run lint
```

---

# 🌐 Deployment

The frontend and backend can be deployed separately.

### Frontend

The React/Vite application can be deployed to platforms such as Vercel or another static hosting provider.

Set:

```env
VITE_API_URL=https://your-backend-url.com
```

### Backend

Deploy the FastAPI application to a Python-compatible hosting provider.

The backend requires:

```env
GROQ_API_KEY=your_groq_api_key
```

Update the backend CORS configuration with the deployed frontend URL before production deployment.

---

# ⚠️ Current Limitations

* The chatbot is grounded in the information available in a single resume PDF.
* Resume information is cached in memory and reparsed when the backend process restarts.
* The chatbot only retains a limited number of previous messages.
* The current UI is primarily designed for desktop/tablet screens.
* The application requires an active Groq API connection for AI functionality.

---

# 🔮 Future Improvements

Potential improvements include:

* [ ] Persistent conversation history
* [ ] Multiple resume/profile support
* [ ] Resume upload from the UI
* [ ] Job-description analysis
* [ ] Candidate/job matching score
* [ ] Recruiter-specific conversation sessions
* [ ] Authentication
* [ ] Database-backed candidate profiles
* [ ] More robust resume parsing
* [ ] Production-grade logging and monitoring
* [ ] Improved mobile support
* [ ] Automated deployment

---

# 👩‍💻 About

HireMeAI is an experimental AI-powered portfolio designed to make a developer's portfolio more interactive and recruiter-friendly.

Instead of simply displaying a resume, the application allows recruiters to explore the portfolio and interact with an AI assistant that can answer questions based on the candidate's actual experience.

---

## 📄 License

This project is intended for personal/portfolio use.

Add a specific open-source license here if you decide to distribute the project under one.
