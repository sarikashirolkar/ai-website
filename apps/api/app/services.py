async def generate_response(prompt: str) -> str:
    cleaned = prompt.strip()
    if not cleaned:
        return "Please enter a message to run the workflow."

    return (
        "Workflow completed (local mode).\n"
        f"Input: {cleaned}\n\n"
        "Next actions:\n"
        "1. Define your agent goal.\n"
        "2. Add your data source or memory store.\n"
        "3. Enable an LLM provider when you're ready."
    )
