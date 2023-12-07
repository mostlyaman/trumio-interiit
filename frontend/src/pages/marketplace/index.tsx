import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import RightIcon from "../../components/icons/RightIcon";
import ProjectStatus from "~/components/project/ProjectStatus";
import React, { useRef, useState } from "react";
import SearchableDropdown from "../../components/SearchDropDown";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import HeartIcon from "~/components/icons/HeartIcon";
import { Avatar } from "@radix-ui/themes";
import AvatarIcon from "~/components/icons/AvatarIcon";
import StarIcon from "~/components/icons/StarIcon";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useEffect } from "react";

const mont = Montserrat({ subsets: ["latin"] });

export default function Home() {
  const { userId } = useAuth();
  const MarketStatus = [
    {
      count: 16,
      status: "All Listings",
      img: (
        <img
          className="h-[40px] w-[40px] rounded-full bg-[#ECE3E0] p-2"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAG8SURBVHgB1VRNVsJADE5a3OMN8AYcoQJ79Qb2uXIlnKDlBNSVC58PvAHsFfAG3IDeQPbSxqQz0pYWOuW54XtvykzI5EsmPwDnDtwX0NhpAlhP/JfDx5Zegg2vFcQ0AyueorsMoS4BjXsef30wAvnozodVWtYB4xNedwDRFbqfKEv2iYzgXfvm01unX0WAKUHnm4/8PHiN7sfy2CV2xuHvgrcbJr8EkwiUccEWKrE10NFoFEX2gsbdCUQwg59ohY8qmfTitODCboMNN3y8V7r0DBXIPFGXoBZoyEn2q7RKIpBkWrfMzZ5SO306CNXCL36jgMt0AwYoRKAqpsTfE/vDKhgqKT1VwrZUmc9HJ2Nc0ExkFo5YZ83V6B0lEEWOZp03fnp/lOSAwvw57quXLO8P/SSypuzMJOkPCyWKoJSAK+NqT1KvPxq27JpHIjiEOv2Rce9vsxsVMQ3wYR6k8rr9oQ3raswmWU3GvSSnkGTSgDdL/s32QKhkyPejwlxqpIzzgKOQi15eRYwleWiJDujklYFeHUdb3DmAUAEmlSoa6aPpjNqNkUoCRdJjZfLACPkZZUSgSNjTf5xR54NfKk7alL9vN2YAAAAASUVORK5CYII="
          height="22"
          alt="money"
        ></img>
      ),
    },
    {
      count: 1,
      status: "My Bids",
      img: (
        <svg
          className="h-[40px] w-[40px] rounded-full bg-[#D5F1FA] p-2 text-[#46D8D5]"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
        </svg>
      ),
    },
    {
      count: 10,
      status: "Opens",
      img: (
        <svg
          className="h-[40px] w-[40px] rounded-full bg-[#ECE3FF] p-2 text-[#651FFF]"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      count: 41,
      status: "Clients",
      img: (
        <svg
          className="h-[40px] w-[40px] rounded-full bg-[#ECE3FF] p-2 text-[#651FFF]"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
  ];

  const [selected, setSelected] = useState("");
  const [status, setStatus] = useState("");
  const [modal, setModal] = useState(false);

  const handleClick = (val: any) => {
    setSelected(val);
    setStatus(val);
  };

  return (
    <>
      <div className="flex min-h-[100vh] max-w-[100vw] bg-[#f8f8f8] ">
        <div className="flex w-[100%] flex-col gap-5 p-5">
          <div className="flex flex-wrap gap-5 ">
            {MarketStatus.map((value, index) => (
              <div
                key={index}
                onClick={() => handleClick(value.status)}
                className={`mx-1 flex h-[80px] w-[220px] cursor-pointer justify-between rounded-lg bg-white pl-3 pt-2 shadow-lg ${
                  selected === value.status
                    ? "bg-[#c1d8f7] outline outline-1 outline-blue-700"
                    : ""
                }`}
              >
                <div className="flex flex-col gap-1 py-1 pl-2">
                  <span className=" text-2xl font-semibold text-slate-600">
                    {value.count}
                  </span>
                  <span className=" text-sm text-slate-400">
                    {value.status}
                  </span>
                </div>
                <div className=" flex h-[100%] items-center pb-3 pr-5">
                  {value.img}
                </div>
              </div>
            ))}
          </div>
          <div className="p-2">
            <InlineForm status={status} />
          </div>
          <div className="cursor-pointer">
            {modal ? (
              <DialogDemo modal={modal} setModal={setModal} />
            ) : (
              <span onClick={() => setModal((prev) => true)}>
                <ProjectComp />
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const InlineForm = ({ status }: any) => {
  const [dropdown1, setDropdown1] = useState<any>("");
  const [dropdown2, setDropdown2] = useState<any>("");
  const [dropdown3, setDropdown3] = useState<any>("");
  const [dropdown4, setDropdown4] = useState<any>("");

  const options1 = [
    { value: "New", label: "New" },
    { value: "Recommended", label: "Recommended" },
    { value: "Favortite", label: "Favortite" },
  ];
  const options2Drop = [
    { value: "Open", label: "Open" },
    { value: "Review", label: "Review" },
  ];
  const options3Drop = [
    { value: "Fixed", label: "Fixed" },
    { value: "Variable", label: "Variable" },
  ];

  const handleSearch = (event: any) => {
    console.log("Searching for:", event.target.value);
  };

  const handleReset = () => {
    console.log(dropdown2);
    setDropdown1("");
    setDropdown2("");
    setDropdown3("");
    setDropdown4("");
  };

  return (
    <div className="flex flex-col  items-start justify-between gap-4 ">
      <input
        type="text"
        placeholder="search project name, username"
        onChange={handleSearch}
        className="mt-5  w-[250px] rounded-md p-2 text-sm outline outline-1"
      />
      <div className="flex gap-5">
        <div className="flex flex-col gap-1 ">
          <span className="pl-2 text-sm text-gray-500">Project type</span>
          <SearchableDropdown
            options={options1}
            dropdowni={dropdown1}
            setDropdowni={setDropdown1}
            text="select type"
          />
        </div>

        <div className="mx-2 flex flex-col gap-1">
          <span className="pl-2 text-sm text-gray-500">Status</span>
          <SearchableDropdown
            options={options2Drop}
            dropdowni={dropdown2}
            setDropdowni={setDropdown2}
            text="select status"
          />
        </div>
        <div className="mx-2 flex flex-col gap-1">
          <span className="pl-2 text-sm  text-gray-500">Payment Type</span>
          <SearchableDropdown
            options={options3Drop}
            dropdowni={dropdown3}
            setDropdowni={setDropdown3}
            text="select type"
          />
        </div>
        <div className="mx-2 flex flex-col gap-1">
          <span className="pl-2 text-sm  text-gray-500">Skills</span>
          <SearchableDropdown
            options={[]}
            dropdowni={dropdown4}
            setDropdowni={setDropdown4}
            text="type skills"
          />
        </div>
        <div className="mx-2 flex flex-col gap-1">
          <span className="pl-2 text-sm  text-gray-500">Tools</span>
          <SearchableDropdown
            options={options3Drop}
            dropdowni={dropdown4}
            setDropdowni={setDropdown4}
            text="select tool"
          />
        </div>

        <button
          className="mt-5 flex items-center gap-1 text-[#5CB0EC]"
          onClick={handleReset}
        >
          <span>
            <svg
              className="h-[30px] w-[30px] rounded-full bg-[#D5F1FA] p-2 text-[#46D8D5]"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0185e4"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="1 4 1 10 7 10"></polyline>
              <polyline points="23 20 23 14 17 14"></polyline>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
            </svg>
          </span>
          <span className=" font-medium">Reset</span>
        </button>
      </div>
    </div>
  );
};

const DialogDemo = ({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const proj = {
    name: "asdas",
    location: "India",
    skills: ["ML", "Web dev"],
    tools: ["AWS Services"],
    stars: 0,
    project_count: 0,
    Person: "Luv",
    title: "Enigma",
    currency: "INR",
    duration: "5w",
    desc: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  };
  return (
    <Dialog.Root open={modal}>
      {
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className=" data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[900px] translate-x-[-50%] translate-y-[-50%] overflow-y-scroll rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <div className="m-2 flex flex-col gap-5 bg-[#FFFFFF]">
              <div className="bg-white pb-4 shadow-md">
                <div className="border-b border-slate-200 pb-2 pl-3 pt-3 text-2xl">
                  Project Details
                </div>
                <div className="flex justify-between text-lg ">
                  <div className=" mt-2 flex flex-col gap-3 p-4">
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold">{proj.name}</span>
                      <span>Project Name</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">{proj.currency}</span>
                      <span>Currency</span>
                    </div>
                  </div>

                  <div className=" mt-2 flex flex-col gap-3 p-4">
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold">
                        {proj.duration}
                      </span>
                      <span>Duration</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">Variable</span>
                      <span>Payment Type</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">6 hr</span>
                      <span>Minimum Overlap</span>
                    </div>
                  </div>

                  <div className=" mt-2 flex flex-col gap-3 p-4">
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold">
                        07 Dec 2023 to 19 Feb 2024
                      </span>
                      <span>Listing Duration</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">Yes</span>
                      <span>NDA</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white pb-4 shadow-md">
                <div className="border-b border-slate-200 pb-2 pl-3 pt-3 text-2xl">
                  Project Description
                </div>
                <div className="p-4 text-lg text-gray-500">{proj.desc}</div>
              </div>
              <div className="bg-white pb-4 shadow-md">
                <div className="border-b border-slate-200 pb-2 pl-3 pt-3 text-2xl">
                  Requirement Details
                </div>
                <div className="flex justify-between text-lg ">
                  <div className=" mt-2 flex flex-col gap-3 p-4">
                    <div className="flex flex-col">
                      <span className="text-lg ">Skills</span>
                      <div className="flex max-w-[150px] flex-wrap gap-2">
                        {proj.skills?.map((val, index) => (
                          <span className="w-[max-content] rounded-md bg-[#E3F2FD] p-[2px]  px-2 text-sm font-medium text-[#2196F3]">
                            {val}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg ">Tools</span>
                      <div className="flex max-w-[150px] flex-wrap gap-2">
                        {proj.tools?.map((val, index) => (
                          <span className="w-[max-content] rounded-md bg-[#E3F2FD] p-[2px]  px-2 text-sm font-medium text-[#2196F3]">
                            {val}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
              <span className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#0065C1] px-5 py-2 text-white shadow-md hover:shadow-blue-400">
                  Create Bid <RightIcon />
                </span>
              </div>
            </div>
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
                onClick={() => setModal(false)}
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      }
    </Dialog.Root>
  );
};
const ProjectComp = () => {
  const proj = {
    name: "asdas",
    location: "India",
    skills: ["ML", "Web dev"],
    tools: ["AWS Services"],
    stars: 0,
    project_count: 0,
    Person: "Luv",
    title: "Enigma",
    desc: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  };

  return (
    <>
      <div className="flex h-[max-content]   flex-col justify-between gap-5 rounded-lg bg-white p-5 shadow-md">
        <div className="flex items-center justify-between">
          <span className=" rounded-md bg-green-100 p-[2px] px-2 text-sm font-medium text-green-600">
            Open Listing
          </span>
          <span className=" cursor-pointer ">
            <HeartIcon />
          </span>
        </div>
        <div className="flex justify-between px-[1rem]  ">
          <div className="flex w-[65%] flex-col gap-5">
            <span className="text-xl">{proj.name}</span>
            <div className="mr-3 mt-3 flex flex-col gap-3 text-sm">
              <div className="flex gap-5">
                <span className="text-lg">Variable Price</span>
                <span className="flex items-center gap-1 text-lg">
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHUSURBVHgBjVPLbcJAFLTN9+gSTAWBDqADqAB8QAhxQFSAqYDkgBBwcKgAOoBUEHeAS/ANxDczzj60GEhY6ek9v52dnZ1dm8aDMR6PnXQ63T2fz1V8OuyZphkgBafTadBut8PkGjPZmE6n3cvl8o4yQg4QX4roDUFiw7Isr9lsDp4SzWazPlR4WPyRy+U813WjpFIkD0T1JJmpgRqY9EFE6Z7xxwCWZH2UtVartbwhmkwmG2ZMFKTn+7693W4b6mhL3RtYsIJyR/CW2qGM5FCNAEejUXG/329SqdSQAQXf7Mk8TJ9zjVr7SwTmGJDP55cCxK35SBHICwzWmUxmKPOCxQbFKxFk28wJc4sgmPM4DNbYsCyTgkXf1hVF4okAQb7m7fCmGKzRDnT/lKJIVxQDdrtdVYCHw6GHZAO4YbA+Ho+uzAsWioIrEaSvkUKYWhdgp9MJACrB1B4jm80W2JN5hQ3V2vt3ZGhv49nQ3pwLos8bIg71Nmhy6dH/pEjo14q1/uYsHYQjuEr2QjdeBntCgs0q+twNkbrmGlXB7JVOxpo9lA5MryUV3/39ugcoQ9lZKXF0X/4l4uDvgNe9UJ+xMiip6Df3EpFSFhuLo4YI99kFcPwAwawiRF+qxvsAAAAASUVORK5CYII="
                    alt="Mpin"
                    className="mpin h-[17px] w-[17px]"
                  />{" "}
                  <span>{proj.location}</span>
                </span>
                <span className="text-lg">Posted 8 hrs ago</span>
              </div>
              <p>{proj.desc}</p>
            </div>
          </div>
          <div className="flex flex-grow items-start gap-[3rem]">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span>
                  <Avatar radius="full" fallback="A" size="3" />
                </span>
                <div className="flex flex-col">
                  <span>{proj.Person}</span>
                  <span className="text-xs">{proj.title}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm">Skills</span>
                <div className="flex max-w-[150px] flex-wrap gap-2">
                  {proj.skills?.map((val, index) => (
                    <span className="w-[max-content] rounded-md bg-[#E3F2FD] p-[2px]  px-2 text-xs font-medium text-[#2196F3]">
                      {val}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm">Tools</span>
                <div className="flex max-w-[150px] flex-wrap gap-2">
                  {proj.tools?.map((val, index) => (
                    <span className="w-[max-content] rounded-md bg-[#E3F2FD] p-[2px] px-2 text-xs font-medium text-[#2196F3]">
                      {val}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2 text-sm">
              <span className="flex items-center gap-1 rounded-md bg-[#FFEDE0] px-2 py-[2px] text-sm">
                <span className="text-[#FF9F43]">
                  <StarIcon />
                </span>
                <span>{proj.stars}</span>
              </span>
              <span className="text-sm">{proj.project_count} Projects</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
