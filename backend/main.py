from fastapi import FastAPI
from api.models import TranscriptRequest, Project
from services.transcript_service import (
    create_prompt,
    get_chapters_from_transcription,
)

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/transcript")
async def get_transcript_chapters(transcript: TranscriptRequest, project: Project):
    prompt = create_prompt(project)

    print("prompt: ", prompt)

    return await get_chapters_from_transcription(transcript.transcript, prompt)
