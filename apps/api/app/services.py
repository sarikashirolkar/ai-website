from openai import AsyncOpenAI

from .config import settings


client = AsyncOpenAI(api_key=settings.openai_api_key)


async def generate_response(prompt: str) -> str:
    if not settings.openai_api_key:
        return "Set OPENAI_API_KEY to enable model responses."

    response = await client.responses.create(
        model=settings.openai_model,
        input=prompt,
        temperature=0.3,
    )
    return response.output_text
