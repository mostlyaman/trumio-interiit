import { ChatBubbleIcon } from "@radix-ui/react-icons";

export default function MasterAI() {

  return (
    <>
      <div className="w-[75%] ml-4 mt-4 bg-white rounded-2xl shadow-xl">
        <div className="h-[70px] w-full border-b border-gray-200 py-2 px-4">
          <div className="flex flex-row items-center gap-3">
            <div className="bg-sky-600 p-4 rounded-full">
              <ChatBubbleIcon className="scale-[150%] text-white"></ChatBubbleIcon>
            </div>
            <div className="">
              <div className="font-semibold">
                Master AI
              </div>
              <div className="text-xs">
                Project 1
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
