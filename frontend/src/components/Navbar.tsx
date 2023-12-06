import { useAuth } from "@clerk/nextjs";
import SearchIcon from "./icons/SearchIcon";
import BellIcon from "./icons/BellIcon";
import ChatIcon from "./icons/ChatIcon";
import { Avatar } from "@radix-ui/themes";
import { Montserrat } from 'next/font/google'

const mont = Montserrat({ subsets: ['latin'] })

export default function Navbar() {
  const { userId } = useAuth();

  return (
    <>
      <div className={`${mont.className} flex h-[9vh] items-center justify-between px-5 text-gray-600 shadow-md fixed w-[100%] bg-white`}>
        <div className="flex gap-5">
          <div className="flex items-center">
            <span>
              <img src="/images/Trumio.png" alt="" className="h-[28px] w-[100px]" />
            </span>
            <span className="pt-1 text-xs">v0.0.8</span>
          </div>
          <div className="flex items-center">
            <ul className="flex gap-[2rem] text-sm">
              <li className="hover:text-[#008EBA] cursor-pointer hover:border-b-2 hover:border-[#008EBA]  h-[9vh] flex items-center transition-all duration-100 hover:font-semibold box-border hover:mr-[1.2px] mr-[0.2rem]">Dashboard</li>
              <li className="hover:text-[#008EBA] cursor-pointer hover:border-b-2 hover:border-[#008EBA]  h-[9vh] flex items-center transition-all duration-100 hover:font-semibold box-border hover:mr-[0.5px] mr-[0.2rem]">Marketplace</li>
              <li className="hover:text-[#008EBA] cursor-pointer hover:border-b-2 hover:border-[#008EBA]  h-[9vh] flex items-center transition-all duration-100 hover:font-semibold box-border hover:mr-[1.2px] mr-[0.2rem]">Project</li>
              <li className="hover:text-[#008EBA] cursor-pointer hover:border-b-2 hover:border-[#008EBA]  h-[9vh] flex items-center transition-all duration-100 hover:font-semibold box-border">My Team</li>
              <li className="hover:text-[#008EBA] cursor-pointer hover:border-b-2 hover:border-[#008EBA]  h-[9vh] flex items-center transition-all duration-100 hover:font-semibold box-border">Chats</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-[4rem] text-sm ">
          <div className="flex gap-5">
            <span className=" cursor-pointer hover:text-[#008EBA] hover:font-semibold">
              <SearchIcon/>
            </span>
            <span className=" cursor-pointer hover:text-[#008EBA] hover:font-semibold">
              <BellIcon />
            </span>
            <span className=" cursor-pointer hover:text-[#008EBA] hover:font-semibold">
              <ChatIcon />
            </span>
          </div>

          <div className="flex gap-1">
            <div className="flex flex-col items-end">
              <span className="text-md">Chins</span>
              <span className="text-xs">Client</span>
            </div>
            <Avatar radius="full" fallback="A" size="2" />
          </div>
        </div>
      </div>
    </>
  );
}
