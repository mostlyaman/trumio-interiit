import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import DownIcon from "../icons/DownIcon";
const mont = Montserrat({ subsets: ["latin"] });

export default function Chat() {
  const { userId } = useAuth();

  return (
    <>
      <div className="flex h-[100vh] w-[100%] items-center justify-center bg-black pt-5">
        <div className="flex h-[80%] w-[95%]  bg-white flex-col">
          <div>
            {/* Path */}
            home=project=chat
          </div>
          <div>
            <div>
              {/* Chat Section */}
              <div>Chats</div>
              <div>
              </div>
            </div>

            <div>{/* Main Area */}</div>
          </div>
        </div>
      </div>
    </>
  );
}
