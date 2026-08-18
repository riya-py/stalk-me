import json
import os
from pathlib import Path
from typing import Iterator

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from groq import Groq
from pydantic import BaseModel, Field
from pypdf import PdfReader

from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

model = "openai/gpt-oss-120b"

app = FastAPI()

BASE_DIR = Path(__file__).parent
RESUME_PATH = BASE_DIR / "my_resume.pdf"

# How many prior turns (user+assistant pairs) to send back to the model.
# Keeps the prompt small; raise this if you want a longer memory.
MAX_HISTORY_MESSAGES = 12


# =========================
# Pydantic models
# =========================

class Experience(BaseModel):
    company: str | None = None
    role: str | None = None
    duration: str | None = None
    description: str | None = None
    skills_used: list[str] = Field(default_factory=list)


class Resume(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None

    total_experience_years: float | None = None

    skills: list[str] = Field(default_factory=list)
    experiences: list[Experience] = Field(default_factory=list)
    education: list[str] = Field(default_factory=list)
    projects: list[str] = Field(default_factory=list)
    certifications: list[str] = Field(default_factory=list)


class HistoryMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str


class ChatRequest(BaseModel):
    question: str
    history: list[HistoryMessage] = Field(default_factory=list)


resume_schema = Resume.model_json_schema()


# =========================
# PDF extraction
# =========================

def read_pdf(file_path: Path) -> str:
    if not file_path.exists():
        raise FileNotFoundError(f"Resume not found: {file_path}")

    reader = PdfReader(file_path)

    text = []

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text.append(page_text.strip())

    return "\n\n".join(text)


# =========================
# Resume parsing
# =========================

def parse_resume(resume_text: str) -> Resume:

    system_prompt = f"""
You are an expert resume information extraction system.

Your job is to convert the provided resume into structured data.

IMPORTANT:
- Extract information based only on the resume.
- Do not infer, guess, or invent information.
- Preserve the candidate's actual information.
- Do not add skills simply because they are commonly associated
  with a job title.
- If something is not explicitly supported by the resume, use null
  for scalar fields or [] for lists.

You should understand different resume structures and headings.

For example, these can represent work experience:
- Experience
- Work Experience
- Professional Experience
- Employment
- Work History
- Internships
- Intern Experience

Skills can appear in:
- Skills
- Technical Skills
- Technologies
- Experience descriptions
- Projects
- Certifications

Internships should be included in `experiences`.

For `total_experience_years`:
- Only provide a number if the resume provides enough information
  to calculate it reliably.
- Otherwise return null.
- Do not estimate.

Return ONLY valid JSON matching this schema:

{json.dumps(resume_schema, indent=2)}

Do not include markdown.
Do not include ```json.
Do not include explanations outside the JSON.
"""

    user_prompt = f"""
Parse the following resume.

<resume>
{resume_text}
</resume>
"""

    response = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ],
        response_format={
            "type": "json_object"
        },
        temperature=0
    )

    raw_output = response.choices[0].message.content

    try:
        data = json.loads(raw_output)
        return Resume(**data)

    except (json.JSONDecodeError, ValueError) as e:
        raise ValueError(
            f"Failed to parse resume response: {e}"
        )


# =========================
# Load resume once
# =========================

def load_resume() -> Resume:
    resume_text = read_pdf(RESUME_PATH)
    return parse_resume(resume_text)


# Cache the parsed resume for now.
resume_data = None


def get_resume() -> Resume:
    global resume_data

    if resume_data is None:
        resume_data = load_resume()

    return resume_data


# =========================
# Candidate chatbot
# =========================

def build_candidate_system_prompt(resume: Resume) -> str:

    return f"""
You are HireMeAI, an AI assistant representing a job candidate.

You answer questions about the candidate using ONLY the information
contained in the resume below.

CANDIDATE DATA:
{resume.model_dump_json(indent=2)}

YOUR ROLE:

You are not the candidate themselves.

You are an assistant speaking on the candidate's behalf, talking to a
recruiter in a live chat widget. Recruiters are busy and skimming —
they want quick, direct answers, not a report.

You are having an ongoing conversation. Prior turns are included in
the message history — use them for context. If the recruiter refers
back to something they or you said earlier ("the previous question",
"what did I just ask", "you mentioned X earlier"), answer from the
actual conversation history, don't guess or deflect.

GROUNDING RULES:

1. Use only information supported by the candidate data.

2. Never invent:
   - companies
   - job titles
   - dates
   - degrees
   - technologies
   - skills
   - achievements
   - responsibilities
   - metrics
   - certifications
   - project details

3. Never assume that the candidate knows a technology just because
   another technology appears on their resume.

4. If the question asks for information that is not available,
   clearly say that the resume does not provide enough information.

5. Do not pretend that the candidate has experience they do not have.

6. If the recruiter asks a yes/no question and the resume does not
   provide enough evidence, do not guess.

LENGTH RULES — FOLLOW THESE STRICTLY:

- Default to 1-2 short sentences. This applies to MOST questions,
  including "is she a good fit for X role" style questions.
- Never use bullet points, headers, or a "Verdict:" style structure
  unless the recruiter explicitly asks for a detailed breakdown,
  a list, or to "tell me everything" / "walk me through" something.
- Do not restate the question back before answering.
- Do not list every matching skill or every project when a couple of
  the most relevant ones make the point. Pick the 1-2 strongest,
  not all of them.
- Do not add a summary sentence at the end restating what you just
  said.
- If a longer answer is genuinely warranted (recruiter explicitly
  asks for detail), keep it to at most 3-4 short bullet points, no
  extra commentary before or after the list.
- Never write more than ~60 words unless explicitly asked for more
  detail.

COMMUNICATION STYLE:

- Casual-professional, like a quick Slack message from a helpful
  colleague, not a formal report.
- Confident and direct. Say what's true plainly, don't hedge with
  phrases like "it's not possible to confirm" — either the resume
  supports it or it doesn't, say which.

If information is unavailable, say so in one short sentence, e.g.:

"Her resume doesn't mention that."
"""


# =========================
# Streaming chatbot
# =========================

def stream_candidate_answer(
    question: str,
    resume: Resume,
    history: list[HistoryMessage]
) -> Iterator[str]:

    system_prompt = build_candidate_system_prompt(resume)

    # Trim history so the prompt doesn't grow unbounded over a long chat.
    trimmed_history = history[-MAX_HISTORY_MESSAGES:]

    messages = [
        {
            "role": "system",
            "content": system_prompt
        }
    ]

    for msg in trimmed_history:
        role = "assistant" if msg.role == "assistant" else "user"
        messages.append({
            "role": role,
            "content": msg.content
        })

    messages.append({
        "role": "user",
        "content": question
    })

    response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=0.6,
        max_tokens=220,
        stream=True
    )

    for chunk in response:

        if not chunk.choices:
            continue

        delta = chunk.choices[0].delta

        if delta.content:
            yield delta.content


# =========================
# Routes
# =========================

@app.get("/")
def home():
    return {
        "message": "HireMeAI is running!"
    }


@app.get("/resume")
def get_resume_data():
    try:
        resume = get_resume()

        return resume.model_dump()

    except FileNotFoundError:
        raise HTTPException(
            status_code=404,
            detail="Resume PDF not found."
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to parse resume: {str(e)}"
        )


@app.post("/chat")
def chat(request: ChatRequest):

    try:
        resume = get_resume()

        return StreamingResponse(
            stream_candidate_answer(
                request.question,
                resume,
                request.history
            ),
            media_type="text/plain"
        )

    except FileNotFoundError:
        raise HTTPException(
            status_code=404,
            detail="Resume PDF not found."
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Chat failed: {str(e)}"
        )


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",              # local vite dev
        "https://your-project.vercel.app",     # your deployed frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)