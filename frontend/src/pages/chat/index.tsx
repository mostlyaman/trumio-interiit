import Head from "next/head"
import React from "react";
import Breadcrumbs from "~/components/Breadcrumbs"
import { CaretUpIcon } from '@radix-ui/react-icons'
import { useState } from "react";
import MasterAI from "~/components/chat/Master";
import { api } from "~/utils/api";
import Loading from "~/components/Loading";
import Select from 'react-select';
import type { Prisma } from "@prisma/client";

export type ProjectWithGithubRepos = Prisma.ProjectGetPayload<{ include: { github_repos: true } }>

export default function ChatPage() {
  const [projectChat, setProjectChat] = useState<string>('Master AI');
  const [openPrivateChat, setOpenPrivateChat] = useState<boolean>(false);
  const [openProjectChat, setOpenProjectChat] = useState<boolean>(true);
  const [openGroupChat, setOpenGroupChat] = useState<boolean>(false);

  const [selectedProject, setSelectedProject] = useState<ProjectWithGithubRepos | null>(null);


  const { data: projects1, isLoading: isLoadingProjects } = api.project.getMyProjects.useQuery({})

  const projects = projects1?.projects
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
                  <Loading className="w-4 h-4"/>
                </div> :
                (projects?.length === 0) ? "No Projects Found" :
                (!openProjectChat || !projects || projects?.length === 0) ? null :
                <>
                
                  {/* Projects */}
                  <div className="px-4 my-2 transition-opacity duration-200 ease-in-out">
                      {
                        <Select onChange={(option) => { setSelectedProject(option ? option.value: null) }}
                          value={{label: selectedProject?.project_name ?? "Select a project", value: selectedProject}}
                          placeholder={"Select a project"}
                          options={projects?.map((project) => ({ label: project.project_name, value: project }))} 
                        />
                      }

                    {
                      selectedProject ?
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
                      </div> : null
                    }
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
            selectedProject ? 
            
              projectChat === 'Master AI' ? <MasterAI project={selectedProject} /> :
              projectChat === 'Updates' ? <div></div> :
              projectChat === 'Resource Sharing' ? <div></div> :
              projectChat === 'Discussions' ? <div></div> :
              projectChat === 'Payments' ? <div></div> :
              <div className="w-[75%] ml-4 mt-4 bg-white rounded-2xl shadow-xl"></div>
            :

            null
          }

          
        </div>
      </main>
    </>
  )
}
