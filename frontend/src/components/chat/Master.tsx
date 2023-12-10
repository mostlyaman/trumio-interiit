import {
  ChatBubbleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import type { Project } from "@prisma/client";
import { CodeIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  Button,
  Flex,
  Popover,
  TextField,
  Card,
  Text,
  Callout,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import type { ProjectWithGithubRepos } from "~/pages/chat";
interface MasterAIProps {
  project: ProjectWithGithubRepos;
}

export default function MasterAI({ project }: MasterAIProps) {
  const [githubInput, setGithubInput] = useState<string>("");

  const { isLoading, mutate, error } = api.project.addGithubRepo.useMutation();

  function extractUsernameAndRepo(url: string) {
    const parts = url.split("/");

    const username = parts[parts.length - 2];
    const repo = parts[parts.length - 1];

    return { username, repo };
  }

  const handleSubmit = () => {
    const { username, repo } = extractUsernameAndRepo(githubInput);
    try {
      const result = mutate({
        username: username,
        repo: repo,
        projectId: project.id,
      });bi
    } catch (error) {
      console.error("Error creating bid:", error);
    }
  };

  return (
    <>
      <div className="ml-4 mt-4 w-[75%] rounded-2xl bg-white shadow-xl">
        <div className="flex h-[80px] w-full flex-col justify-center border-b border-gray-200 px-4 py-2">
          <div className="flex flex-row items-center justify-between gap-3">
            <div className="flex flex-row items-center gap-3">
              <div className="rounded-full bg-sky-600 p-4">
                <ChatBubbleIcon className="scale-[150%] text-white"></ChatBubbleIcon>
              </div>
              <div className="my-auto flex flex-col">
                <div className="font-semibold">Master AI</div>
                <div className="text-xs">{project.project_name}</div>
              </div>
            </div>
            <div className="mr-3 flex h-full flex-row items-center gap-3">
              <Popover.Root>
                <Popover.Trigger>
                  <Button
                    className="cursor-pointer rounded-full bg-slate-400 p-3 text-white"
                    variant="soft"
                  >
                    <CodeIcon className="scale-[150%]" />
                  </Button>
                </Popover.Trigger>
                <Popover.Content style={{ width: 360 }}>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-xs">
                      Add context to Master AI by connecting your Github
                      Repository.
                    </h1>
                    <div className="mb-4">
                      {project.github_repos.map((data) => {
                        return (
                          <>
                            <TextField.Root>
                              <TextField.Slot>
                                <GitHubLogoIcon />
                              </TextField.Slot>
                              <TextField.Input
                                disabled={true}
                                value={`${data.username}/${data.repo}`}
                              />
                            </TextField.Root>
                          </>
                        );
                      })}
                    </div>
                    {error && (
                      <Callout.Root
                        id="error-call"
                        color="red"
                        role="alert"
                        className="flex h-[30px] items-center"
                      >
                        <Callout.Icon>
                          <ExclamationTriangleIcon />
                        </Callout.Icon>
                        <Callout.Text>{error.message}</Callout.Text>
                      </Callout.Root>
                    )}
                    <TextField.Root>
                      <TextField.Slot>
                        <GitHubLogoIcon />
                      </TextField.Slot>
                      <TextField.Input
                        disabled={isLoading}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                          setGithubInput(event.target.value);
                        }}
                        placeholder="Paste Repo URL..."
                      />
                    </TextField.Root>
                    <Button
                      variant="solid"
                      color="blue"
                      onClick={handleSubmit}
                      className="h-[30px] cursor-pointer"
                    >
                      {isLoading ? (
                        <svg
                          className="scale-[200%] stroke-white"
                          width="9"
                          height="9"
                          viewBox="0 0 25 25"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <circle
                              cx="12"
                              cy="12"
                              r="9.5"
                              fill="none"
                              strokeWidth="3"
                              strokeLinecap="round"
                            >
                              <animate
                                attributeName="stroke-dasharray"
                                dur="1.5s"
                                calcMode="spline"
                                values="0 150;42 150;42 150;42 150"
                                keyTimes="0;0.475;0.95;1"
                                keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                                repeatCount="indefinite"
                              />
                              <animate
                                attributeName="stroke-dashoffset"
                                dur="1.5s"
                                calcMode="spline"
                                values="0;-16;-59;-59"
                                keyTimes="0;0.475;0.95;1"
                                keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                                repeatCount="indefinite"
                              />
                            </circle>
                            <animateTransform
                              attributeName="transform"
                              type="rotate"
                              dur="2s"
                              values="0 12 12;360 12 12"
                              repeatCount="indefinite"
                            />
                          </g>
                        </svg>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                </Popover.Content>
              </Popover.Root>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
