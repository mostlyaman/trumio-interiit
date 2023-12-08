from pydantic import BaseModel
from typing import List, Optional


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


class Project(BaseModel):
    name: str
    description: str
    expected_duration: str
    listing_duration: str
    team: Team
    meeting_transcripts: List[MeetingTranscript] | None
    milestones: List[Milestone]
    skills_required: List[str] | None
    tools_required: List[str] | None


class ProjectRequest(BaseModel):
    project: MilestonesRequest


class Commit(BaseModel):
    sha: str
    commit: dict


class CommitRequest(BaseModel):
    owner: str
    repo: str


class CommitsResponse(BaseModel):
    hashes: List[str]


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


# TODO: Add Project budget
# TODO: Add Project status
# TODO: Add Project progress
# TODO: Add Skill required in Milestone
