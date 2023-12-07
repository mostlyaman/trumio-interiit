from fastapi import FastAPI
from api.models import TranscriptRequest, MilestonesRequest, Project
from services.transcript_service import (
    create_prompt,
    get_chapters_from_transcription,
)
from services.milestone_service import generate_milestones, create_milestone_prompt

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/transcript")
async def get_transcript_chapters(transcript: TranscriptRequest, project: Project):
    prompt = create_prompt(project)

    print("prompt: ", prompt)

    return await get_chapters_from_transcription(transcript.transcript, prompt)


@app.post("/milestones")
async def get_milestones(project: MilestonesRequest):
    prompt = create_milestone_prompt(project)

    print("prompt: ", prompt)

    return await generate_milestones(prompt)
