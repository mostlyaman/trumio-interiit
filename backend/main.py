from fastapi import FastAPI
from api.models import (
    AllCommitsSummaryRequest,
    CommitDiffRequest,
    TranscriptRequest,
    MilestonesRequest,
    Project,
    CommitRequest,
)
from services.transcript_service import (
    create_prompt,
    get_chapters_from_transcription,
)
from services.milestone_service import generate_milestones, create_milestone_prompt
from services.github_service import GithubService
from services.commit_summary_service import summarise_commit
import dotenv
import os

dotenv.load_dotenv()

token = os.getenv("GITHUB_ACCESS_TOKEN")

if token is None:
    raise Exception("GITHUB_ACCESS_TOKEN not found in environment variables")
else:
    token = str(token)

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


@app.get("/commits")
async def get_commits(request: CommitRequest):
    github_service = GithubService(token)

    return github_service.get_commit_hashes(request)


@app.get("/commit-diff")
async def get_commit_diff(request: CommitDiffRequest):
    github_service = GithubService(token)

    return github_service.get_commit_diff(request)


@app.post("/commit-summary")
async def get_commit_summary(request: CommitDiffRequest):
    github_service = GithubService(token)

    commit_diff = github_service.get_commit_diff(request)

    print("commit_diff: ", commit_diff)

    if commit_diff is None:
        return None

    return summarise_commit(commit_diff.commit_diff)


@app.post("/all-commits-summary")
async def get_all_commits_summary(request: AllCommitsSummaryRequest):
    github_service = GithubService(token)

    commits = github_service.get_commit_hashes(
        CommitRequest(owner=request.owner, repo=request.repo)
    )

    if commits is None:
        return None

    summaries = []

    for commit in commits.hashes:
        commit_diff = github_service.get_commit_diff(
            CommitDiffRequest(owner=request.owner, repo=request.repo, commit_sha=commit)
        )

        if commit_diff is None:
            return None

        summaries.append(summarise_commit(commit_diff.commit_diff))

    return summaries
