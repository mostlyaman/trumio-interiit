import requests
from typing import Optional
from api.models import (
    CommitDiff,
    CommitDiffRequest,
    CommitDiffResponse,
    CommitRequest,
    CommitsResponse,
)


class GithubService:
    def __init__(self, token: str):
        self.token = token
        self.headers = {"Authorization": f"token {self.token}"}

    def get_commit_diff(
        self, commitDiffRequest: CommitDiffRequest
    ) -> Optional[CommitDiffResponse]:
        url = f"https://github.com/{commitDiffRequest.owner}/{commitDiffRequest.repo}/commit/{commitDiffRequest.commit_sha}.diff"
        response = requests.get(url, headers=self.headers)

        print("response: ", response.text)

        if response.status_code == 200:
            return CommitDiffResponse(
                commit_diff=CommitDiff(
                    sha=commitDiffRequest.commit_sha, diff=response.text
                )
            )
        else:
            return None

    def get_commit_hashes(self, request: CommitRequest) -> Optional[CommitsResponse]:
        url = f"https://api.github.com/repos/{request.owner}/{request.repo}/commits"
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            return CommitsResponse(hashes=[commit["sha"] for commit in response.json()])
        else:
            return None
