import {
  ChatBubbleIcon,
  CheckCircledIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import {
  AlertDialog,
  Button,
  Flex,
  Tabs,
  TextArea,
  TextField,
  Text,
  Box,
  Checkbox,
} from "@radix-ui/themes";
import { useState } from "react";
import type { Project } from "@prisma/client";
import { api } from "~/utils/api";
import type { MomData } from "~/langchain/mom";
import Loading from "../Loading";

interface UpdateProps {
  project: Project;
}

export default function Updates({ project }: UpdateProps) {
  // const createMinutesMutation = api.updates.create_minutes.useMutation()

  const [title, setTitle] = useState<string>("");
  const [transcript, setTranscript] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<MomData[]>([]);

  const generateMomMutation = api.project.getMOM.useMutation();
  const generateMom = async () => {
    const res = await generateMomMutation.mutateAsync({
      transcript: transcript,
    });
    if (res instanceof Error) {
      console.error();
    } else {
      setAiResponse(res);
    }
  };
  return (
    <>
      <div className="relative ml-4 mt-4 flex h-[80vh] w-[75%] flex-col rounded-2xl bg-white shadow-xl">
        <div className="z-[100] flex h-[80px] w-full flex-col justify-center border-b border-gray-200 px-4 py-2">
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
          <div className="flex flex-row flex-wrap items-center justify-around gap-4">
            <div className="w-flex-grows mx-4 my-5 flex  h-[400px] w-[100%] flex-col flex-wrap rounded-lg border border-gray-400 p-5">
              <div className="flex-wrap text-center font-semibold ">
                {/* Updates Heading goes here. */}
              </div>
              <div className="overflow-hidden text-left text-sm font-medium">
                {/* AI Response goes here. */}
                {aiResponse.length !== 0 || generateMomMutation.isLoading ? generateMomMutation.isLoading ? (
                 <div className="w-[100%] h-[300px] flex justify-center items-center gap-2 text-lg"> Fetching Minutes of Meeting <Loading className="scale-75" /></div>
                ) : (
                  <Tabs.Root
                    className="w-[100%] overflow-hidden"
                    defaultValue={aiResponse[0]?.agenda}
                  >
                    <Tabs.List>
                      {aiResponse.map((data, index) => {
                        return (
                          <>
                            <Tabs.Trigger 
                              value={data.agenda}
                              className="cursor-pointer"
                            >
                              {data.agenda}
                            </Tabs.Trigger>
                          </>
                        );
                      })}
                    </Tabs.List>

                    <Box px="4" pt="3" pb="2">
                      {aiResponse.map((data, index) => {
                        return (
                          <>
                            <Tabs.Content value={data.agenda}>
                              <div className="flex gap-3 w-[100%]">
                                <ol className="flex flex-col gap-2 list-disc w-[50%]">
                                  <div className="text-xl flex justify-center mb-3">Key Points</div>
                                  {data.key_points.map((key_point, index) => {
                                    return (
                                      <li
                                        key={key_point}
                                      >
                                        <Text size="2">{key_point}</Text>
                                      </li>
                                    );
                                  })}
                                </ol>
                                <div className="w-[50%]">
                                  <div className="flex flex-col gap-2">
                                  <div className="text-xl flex justify-center mb-3">Action Items</div>
                                    {data.action_items.map(
                                      (action_item, index) => {
                                        return (
                                          <div
                                            className="flex items-center gap-2"
                                            key={action_item}
                                          >
                                               <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "/>
                                            <Text size="2">{action_item}</Text>
                                          </div>
                                        );
                                      },
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Tabs.Content>
                          </>
                        );
                      })}
                    </Box>
                  </Tabs.Root>
                ) : <div  className="w-[100%] h-[300px] flex justify-center items-center gap-2 text-lg">No Updates Found</div>}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 flex h-[80px] w-full flex-row items-center self-end border-t-2 border-gray-200">
          <div className="flex w-full flex-row flex-wrap justify-between text-black">
            <div className="ml-10 flex flex-row gap-5">
              <Button color="indigo">Add a Query / Checklist</Button>
              <Button color="indigo">Resolve</Button>
            </div>
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button
                  className="mx-8 scale-[115%] cursor-pointer bg-sky-600 outline-none"
                  color="red"
                >
                  Generate Updates
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content style={{ maxWidth: 900 }}>
                <AlertDialog.Title>Title</AlertDialog.Title>
                <AlertDialog.Description size="2">
                  <div className="flex flex-col gap-2">
                    <TextField.Root>
                      <TextField.Slot className="mr-3">
                        <CheckCircledIcon />
                      </TextField.Slot>
                      <TextField.Input
                        className="text-xs font-semibold"
                        variant="classic"
                        placeholder="Name the meeting..."
                        value={title}
                        onChange={(event) => {
                          setTitle((event.target as HTMLInputElement).value);
                        }}
                      />
                    </TextField.Root>
                    <TextArea
                      value={transcript}
                      onChange={(event) => {
                        setTranscript(
                          (event.target as HTMLTextAreaElement).value,
                        );
                      }}
                      className="h-[50vh] overflow-y-auto border border-gray-200 text-xs"
                    />
                  </div>
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button
                      className="cursor-pointer"
                      variant="soft"
                      color="gray"
                    >
                      Cancel
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button
                      onClick={generateMom}
                      className="cursor-pointer bg-blue-500"
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
