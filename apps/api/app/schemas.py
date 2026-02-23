from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    output: str


class ContactRequest(BaseModel):
    name: str
    email: str
    company: str | None = None
    message: str


class ContactResponse(BaseModel):
    status: str
    detail: str
