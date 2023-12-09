from fastapi import FastAPI
from api.models import (
    AllCommitsSummaryRequest,
    CommitDiffRequest,
    RepoDataRequest,
    RepoFileRequest,
    RepoFilesDescriptionRequest,
    TranscriptRequest,
    MilestonesRequest,
    Project,
    CommitRequest,
)
from services.file_describe_service import describe_files
from services.transcript_service import (
    create_prompt,
    get_chapters_from_transcription,
)
from services.milestone_service import generate_milestones, create_milestone_prompt
from services.github_service import GithubService, RepoContentRequest
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


@app.post("/commits")
async def get_commits(request: CommitRequest):
    github_service = GithubService(token)

    return github_service.get_commits(request)


@app.post("/commit-diff")
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

    commits = github_service.get_commits(
        CommitRequest(owner=request.owner, repo=request.repo)
    )

    if commits is None:
        return None

    summaries = []

    for commit in commits.commits:
        commit_diff = github_service.get_commit_diff(
            CommitDiffRequest(
                owner=request.owner, repo=request.repo, commit_sha=commit.sha
            )
        )

        if commit_diff is None:
            return None

        summaries.append(summarise_commit(commit_diff.commit_diff))

    return summaries


@app.post("/repo-files")
async def get_repo_content(request: RepoContentRequest):
    github_service = GithubService(token)

    return github_service.get_repo_files(request)


@app.post("/repo-files-content")
async def get_repo_files_content(request: RepoContentRequest):
    github_service = GithubService(token)

    repo_content = github_service.get_repo_files(request)

    if repo_content is None:
        return None

    files = []

    for file in repo_content.repo_content:
        content = github_service.get_repo_file_content(
            RepoFileRequest(owner=request.owner, repo=request.repo, path=file.path)
        )

        if content is None:
            return None

        files.append(content)

    return files


@app.post("/describe-repo")
async def describe_repo(request: RepoFilesDescriptionRequest):
    return describe_files(request)


@app.post("/repo-data")
async def get_repo_data(request: RepoDataRequest):
    github_service = GithubService(token)

    data = github_service.get_all_data(request)

    if data is None:
        return None

    return data
