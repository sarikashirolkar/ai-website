from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .schemas import ChatRequest, ChatResponse, ContactRequest, ContactResponse
from .services import generate_response

app = FastAPI(title="AI Website API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in settings.allowed_origins.split(",") if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/v1/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest) -> ChatResponse:
    result = await generate_response(payload.message)
    return ChatResponse(output=result)


@app.post("/api/v1/contact", response_model=ContactResponse)
async def contact(payload: ContactRequest) -> ContactResponse:
    if not payload.name.strip() or not payload.email.strip() or not payload.message.strip():
        return ContactResponse(status="error", detail="Name, email, and message are required.")

    return ContactResponse(
        status="ok",
        detail=f"Thanks {payload.name.strip()}, your request has been captured for follow-up.",
    )
