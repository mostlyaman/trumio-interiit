import requests
import utils.consts as consts
from base64 import b64decode
from typing import Optional
from api.models import (
    CommitDiff,
    CommitDiffRequest,
    CommitDiffResponse,
    CommitRequest,
    CommitsResponse,
    RepoContentRequest,
    RepoContentResponse,
    RepoContent,
    RepoFile,
    RepoFileRequest,
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

    def get_directory_content(self, directory: dict) -> list[RepoContent]:
        url = directory["url"]
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            files = [
                content
                for content in response.json()
                if content["type"] == "file"
                and content["name"].endswith(tuple(consts.included_extensions))
            ]

            for directory in [
                content for content in response.json() if content["type"] == "dir"
            ]:
                files.extend(self.get_directory_content(directory))

            return files
        else:
            return []

    def get_repo_files(
        self, request: RepoContentRequest
    ) -> Optional[RepoContentResponse]:
        url = f"https://api.github.com/repos/{request.owner}/{request.repo}/contents"
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            files = [
                content
                for content in response.json()
                if content["type"] == "file"
                and content["name"].endswith(tuple(consts.included_extensions))
            ]

            for directory in [
                content for content in response.json() if content["type"] == "dir"
            ]:
                files.extend(self.get_directory_content(directory))

            return RepoContentResponse(
                repo_content=[
                    RepoContent(
                        name=file["name"],
                        path=file["path"],
                        url=file["url"],
                        type=file["type"],
                    )
                    for file in files
                ]
            )

        else:
            return None

    def get_repo_file_content(self, request: RepoFileRequest) -> Optional[RepoFile]:
        url = f"https://api.github.com/repos/{request.owner}/{request.repo}/contents/{request.path}"
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            return RepoFile(
                name=response.json()["name"],
                path=response.json()["path"],
                url=response.json()["url"],
                type=response.json()["type"],
                content=b64decode(response.json()["content"]).decode(
                    "utf-8", "replace"
                ),
            )

        else:
            return None
