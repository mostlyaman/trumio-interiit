import { ChatBubbleIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import type { Project } from "@prisma/client";
import { CodeIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button, Flex, Popover, TextField } from "@radix-ui/themes";
import { useState } from "react";

interface MasterAIProps {
  project: Project
}

export default function MasterAI({ project }: MasterAIProps) {

  const [githubInput, setGithubInput] = useState<string>("")
  

  return (
    <>
      <div className="w-[75%] ml-4 mt-4 bg-white rounded-2xl shadow-xl">
        <div className="h-[80px] w-full border-b border-gray-200 py-2 px-4 flex flex-col justify-center">
          <div className="flex flex-row gap-3 justify-between items-center">
            <div className="flex flex-row items-center gap-3">
              <div className="bg-sky-600 p-4 rounded-full">
                <ChatBubbleIcon className="scale-[150%] text-white"></ChatBubbleIcon>
              </div>
              <div className="flex flex-col my-auto">
                <div className="font-semibold">
                  Master AI
                </div>
                <div className="text-xs">
                  { project.project_name }
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-3 mr-3 h-full items-center">

              <Popover.Root>
                <Popover.Trigger>
                  <Button className="bg-slate-400 cursor-pointer text-white p-3 rounded-full" variant="soft">
                    <CodeIcon className="scale-[150%]" />
                  </Button>
                </Popover.Trigger>
                <Popover.Content style={{ width: 360 }}>

                  <div className="flex flex-col gap-2">
                    <h1 className="text-xs">Add context to Master AI by connecting your Github Repository.</h1>
                    <TextField.Root>
                      <TextField.Slot>
                        <GitHubLogoIcon/>
                      </TextField.Slot>
                      <TextField.Input onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setGithubInput(event.target.value) }} placeholder="Paste Repo URL..." />
                    </TextField.Root>
                    <Button variant="solid" color="blue">
                      Submit
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
