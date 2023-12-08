import Head from "next/head"
import Breadcrumbs from "~/components/Breadcrumbs"
import { CaretDownIcon, CaretRightIcon, CaretUpIcon } from '@radix-ui/react-icons'
import { useState } from "react";
import MasterAI from "~/components/chat/Master";
import { api } from "~/utils/api";
import Loading from "~/components/Loading";
import { Select } from "@radix-ui/themes";

export default function ChatPage() {
  const [projectChat, setProjectChat] = useState<string>('Master AI');
  const [openPrivateChat, setOpenPrivateChat] = useState<boolean>(false);
  const [openProjectChat, setOpenProjectChat] = useState<boolean>(true);
  const [openGroupChat, setOpenGroupChat] = useState<boolean>(false);


  const { data, isLoading: isLoadingProjects } = api.project.getProjects.useQuery({})

  return (
    <>
      <Head>
        <title>Trumio</title>
      </Head>
      <main className="py-2 px-8">
        <div className="mx-2">
          <Breadcrumbs paths={['Chats']} />
        </div>
        <div className="w-full my-4 text-gray-600 flex flex-row">
          <div className="w-[25%] flex flex-col gap-3">
            <div className="">Chats</div>

            <div className=" flex flex-row justify-between items-center p-5 bg-white rounded-2xl shadow-xl">
              <p className="flex font-semibold">Private Chats</p>
              <button 
                  onClick={() => { setOpenPrivateChat(!openPrivateChat) }}
                  className={"outline-none scale-[200%] duration-100 ease-in cursor-pointer hover:bg-sky-400 hover:text-white rounded-full" + (openPrivateChat ? "": " rotate-180")}
                >
                  <CaretUpIcon className="scale-200"/>
                </button>
            </div>

            <div className="p-5 bg-white rounded-2xl shadow-xl">
              {/* Heading */}
              <div className="flex flex-row justify-between items-center">
                <p className="flex font-semibold">Project Chats</p>
                <button 
                  onClick={() => { setOpenProjectChat(!openProjectChat) }}
                  className={"outline-none scale-[200%] duration-100 ease-in cursor-pointer hover:bg-sky-400 hover:text-white rounded-full" + (openProjectChat ? "": " rotate-180")}
                >
                  <CaretUpIcon className="scale-200"/>
                </button>
              </div>

              {
                isLoadingProjects ? 
                <div className="flex justify-center mt-3">
                  <Loading className="stroke-blue-500 w-10 h-10"/>
                </div> :
                !openProjectChat ? null :
                <>
                
                  {/* Projects */}
                  <div className="px-4 my-2 transition-opacity duration-200 ease-in-out">
                    <div className="mt-3 px-6 flex font-semibold justify-between items-center flex-row p-2 border border-sky-400 rounded-lg bg-sky-300 bg-opacity-20 text-sky-500">
                      <div>{isLoadingProjects ? 'Loading...' : 'Project 1'}</div>
                      <div className="scale-[200%]">
                          <CaretRightIcon className="text-sky-500" />
                      </div>
                    </div>

                    <div className="mx-5 my-2 font-medium flex flex-col">
                      <button onClick={() => { setProjectChat('Master AI') }}
                        className={`text-left px-3 py-1 border-l-2 ${projectChat === 'Master AI' ? 'border-sky-500 text-sky-500' : 'border-gray-300 text-gray-500'} `}>
                        Master AI
                      </button>
                      <button onClick={() => { setProjectChat('Updates') }}
                        className={`text-left px-3 py-1 border-l-2 ${projectChat === 'Updates' ? 'border-sky-500 text-sky-500' : 'border-gray-300 text-gray-500'}`}>
                        Updates
                      </button>
                      <button onClick={() => { setProjectChat('Resource Sharing') }}
                        className={`text-left px-3 py-1 border-l-2 ${projectChat === 'Resource Sharing' ? 'border-sky-500 text-sky-500' : 'border-gray-300 text-gray-500'}`}>
                        Resource Sharing
                      </button>
                      <button onClick={() => { setProjectChat('Discussions') }}
                        className={`text-left px-3 py-1 border-l-2 ${projectChat === 'Discussions' ? 'border-sky-500 text-sky-500' : 'border-gray-300 text-gray-500'}`}>
                        Discussions
                      </button>
                      <button onClick={() => { setProjectChat('Payments') }}
                        className={`text-left px-3 py-1 border-l-2 ${projectChat === 'Payments' ? 'border-sky-500 text-sky-500' : 'border-gray-300 text-gray-500'}`}>
                        Payments
                      </button>
                    </div>
                  </div>
                </>
              }

            </div>

          <div className=" flex flex-row justify-between items-center p-5 bg-white rounded-2xl shadow-xl">
            <p className="flex font-semibold">Group Chats</p>
            <button 
                onClick={() => { setOpenGroupChat(!openGroupChat) }}
                className={"outline-none scale-[200%] duration-100 ease-in cursor-pointer hover:bg-sky-400 hover:text-white rounded-full" + (openGroupChat ? "": " rotate-180")}
              >
                <CaretUpIcon className="scale-200"/>
                </button>
            </div>

          </div>
          {
            projectChat === 'Master AI' ? <MasterAI /> :
            projectChat === 'Updates' ? <div></div> :
            projectChat === 'Resource Sharing' ? <div></div> :
            projectChat === 'Discussions' ? <div></div> :
            projectChat === 'Payments' ? <div></div> :
            <div className="w-[75%] ml-4 mt-4 bg-white rounded-2xl shadow-xl"></div>
          }

          
        </div>
      </main>
    </>
  )
}