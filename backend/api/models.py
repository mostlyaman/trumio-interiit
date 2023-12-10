import datetime
from pydantic import BaseModel
from typing import List, Optional
from enum import Enum


class Chapter(BaseModel):
    title: str
    description: str


class Transcript(BaseModel):
    text: str


class TranscriptSummary(BaseModel):
    chapters: List[Chapter]


class TranscriptRequest(BaseModel):
    transcript: Transcript


class TranscriptResponse(BaseModel):
    transcript_summary: TranscriptSummary
    message: Optional[str]


class TeamMember(BaseModel):
    name: str
    role: str


class MeetingTranscript(BaseModel):
    timestamp: str
    members: List[TeamMember]
    trancriptSummary: TranscriptSummary


class Milestone(BaseModel):
    name: str
    description: str
    duration: str
    skills_required: List[str] | None


class MilestonesRequest(BaseModel):
    project_name: str
    project_description: str
    project_duration: str
    project_listing_duration: str
    skills_required: List[str] | None
    tools_required: List[str] | None
    team: List[TeamMember]


class Team(BaseModel):
    name: str
    description: str
    members: List[TeamMember]


class Budget(BaseModel):
    amount: str
    currency: str


class ProjectStatus(str, Enum):
    active = "active"
    completed = "completed"
    cancelled = "cancelled"


class ProjectProgress(BaseModel):
    completed: int
    total: int


class Project(BaseModel):
    name: str
    description: str
    expected_duration: str
    listing_duration: str
    team: Team
    budget: Budget
    progress: ProjectProgress
    status: ProjectStatus
    meeting_transcripts: List[MeetingTranscript] | None
    milestones: List[Milestone]
    skills_required: List[str] | None
    tools_required: List[str] | None


class ProjectRequest(BaseModel):
    project: Project


class GithubUser(BaseModel):
    name: str
    email: str
    username: str
    avatar_url: str | None


class Commit(BaseModel):
    sha: str
    message: str
    author: GithubUser
    timestamp: datetime.datetime


class CommitRequest(BaseModel):
    owner: str
    repo: str
    since: Optional[datetime.datetime] = None


class CommitsResponse(BaseModel):
    commits: List[Commit]


class CommitResponse(BaseModel):
    commits: List[Commit]


class CommitDiff(BaseModel):
    sha: str
    diff: str


class CommitDiffRequest(BaseModel):
    owner: str
    repo: str
    commit_sha: str


class CommitDiffResponse(BaseModel):
    commit_diff: CommitDiff


class CommitSummary(BaseModel):
    commit: Commit
    commit_diff: CommitDiff
    summary: list[str]


class AllCommitsSummary(BaseModel):
    commits: List[CommitSummary]


class AllCommitsSummaryRequest(BaseModel):
    owner: str
    repo: str


class RepoContent(BaseModel):
    name: str
    path: str
    url: str
    type: str


class RepoContentRequest(BaseModel):
    owner: str
    repo: str


class RepoContentResponse(BaseModel):
    repo_content: List[RepoContent]


class RepoFile(BaseModel):
    name: str
    path: str
    url: str
    type: str
    content: str


class RepoFiles(BaseModel):
    repo_files: List[RepoFile]


class RepoFileRequest(BaseModel):
    owner: str
    repo: str
    path: str


class RepoFileResponse(BaseModel):
    repo_file: RepoFile


class RepoFilesResponse(BaseModel):
    repo_files: List[RepoFile]


class RepoFileDescription(BaseModel):
    name: str
    description: str


class RepoFilesDescriptionRequest(BaseModel):
    repo_files: List[RepoFile]


class RepoFilesDescriptionResponse(BaseModel):
    repo_files_description: List[RepoFileDescription]
    summary: str


class CommitData(BaseModel):
    sha: str
    timestamp: datetime.datetime
    author: GithubUser
    message: str


class RepoFileData(BaseModel):
    name: str
    description: str
    path: str
    url: str


class RepoData(BaseModel):
    name: str
    owner: GithubUser
    summary: str
    url: str
    commits: List[CommitData]
    repo_files: List[RepoFileData]


class RepoDataRequest(BaseModel):
    owner: str
    repo: str
    since: Optional[datetime.datetime] = None


class RepoDataResponse(BaseModel):
    repo_data: RepoData | None
    error: Optional[str] = None


class GithubUserProfile(BaseModel):
    name: str
    email: str
    username: str
    avatar_url: str | None


class GithubUserProfileRequest(BaseModel):
    username: str
