import {
  ChatBubbleIcon,
  CheckCircledIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import {
  AlertDialog,
  Button,
  Flex,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";
import type { Project } from "@prisma/client";

interface UpdateProps {
  project: Project
}

export default function Updates({ project }: UpdateProps) {

  // const createMinutesMutation = api.updates.create_minutes.useMutation()

  const [title, setTitle] = useState<string>("")
  const [transcript, setTranscript] = useState<string>("")

  return (
    <>
      <div className="ml-4 mt-4 w-[75%] rounded-2xl bg-white shadow-xl h-[80vh] flex flex-col relative">
        <div className="flex z-[100] h-[80px] w-full flex-col justify-center border-b border-gray-200 px-4 py-2">
          <div className="flex flex-row items-center justify-between gap-3">
            <div className="flex flex-row items-center gap-3">
              <div className="rounded-full bg-sky-600 p-4">
                <ChatBubbleIcon className="scale-[150%] text-white"></ChatBubbleIcon>
              </div>
              <div className="my-auto flex flex-col">
                <div className="font-semibold">Updates & Meetings</div>
                <div className="text-xs">Project Name</div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3">
          <div className="flex flex-row gap-4 flex-wrap items-center justify-around">
          <div className="my-5 w-[40%] flex-wrap h-[400px]  flex flex-col border border-gray-400 rounded-lg p-5 w-flex-grows">
              <div className="flex-wrap text-center font-semibold ">
                {/* Updates Heading goes here. */}
              </div>
              <div className="font-medium text-sm text-left">
                {/* AI Response goes here. */}
              </div>
            </div>
            <div className="my-5 w-[40%] flex-wrap h-[400px] flex flex-row border border-gray-400 rounded-lg p-5 w-flex-grows">
              <div className="flex flex-wrap text-center font-semibold ">
                
              </div>
              <div className="relative font-medium text-sm text-center flex flex-wrap w-full justify-center items-center">
                <div>
                  <UploadIcon className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] scale-[900%] text-sky-500" />
                  <div className="absolute top-[70%] left-[44%] -transform-x-[70%] font-bold"> UPLOAD</div>
                </div>
              </div>
            </div>

          </ div>
          <div>
``
          </div>

        </div>
        <div className="bottom-0 absolute h-[80px] flex w-full items-center flex-row border-t-2 border-gray-200 self-end">
          
          <div className="flex flex-row flex-wrap w-full justify-between text-black">
            <div className="flex flex-row gap-5 ml-10">
                <Button color="indigo" >Add a Query / Checklist</Button>
                <Button color="indigo">Resolve</Button>
            </div>
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button className="mx-8 bg-sky-600 outline-none scale-[115%] cursor-pointer" color="red">Generate Updates</Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content style={{ maxWidth: 900 }}>
                <AlertDialog.Title>Title</AlertDialog.Title>
                <AlertDialog.Description size="2">
                  <div className="flex flex-col gap-2">
                    <TextField.Root>
                      <TextField.Slot className="mr-3">
                        <CheckCircledIcon />
                      </TextField.Slot>
                      <TextField.Input className="text-xs font-semibold" variant="classic"
                        placeholder="Name the meeting..."
                        value={title} onChange={(event) => { setTitle((event.target as HTMLInputElement).value) }}
                      />
                    </TextField.Root>
                    <TextArea value={transcript} onChange={(event) => { setTranscript((event.target as HTMLTextAreaElement).value) }} className="border text-xs border-gray-200 h-[50vh] overflow-y-auto" />
                  </div>
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button className="cursor-pointer" variant="soft" color="gray">
                      Cancel
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button 
                      // onClick={() => { createMinutesMutation.mutate({ text: transcript }) }} 
                      className="bg-blue-500"
                    >
                      Submit Transcript
                    </Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>

          </div>
        </div>

      </div>
    </>
  );
}
