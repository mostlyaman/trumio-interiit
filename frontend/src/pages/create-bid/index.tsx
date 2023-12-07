import { Avatar } from "@radix-ui/themes";
import StarIcon from "~/components/icons/StarIcon";
import AttachIcon from "~/components/icons/AttachIcon";
import WatchIcon from "~/components/icons/WatchIcon";
import TickIcon from "~/components/icons/TickIcon";
import InfoIcon from "~/components/icons/InfoIcon";
import RightIcon from "~/components/icons/RightIcon";
import { ChevronLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface Milestone {
  name?: string | undefined;
  description?: string;
  duration?: number;
  cost?: number;
  deliverables?: string;
}

export default function Home() {
  const [milestones, setMiles] = useState<Milestone[]>([]);
  const [arr,setArr] = useState<JSX.Element[]>([<MilesStonesComp
    name="Milestone-1"
    index={0}
    setMiles={setMiles}
  />])

  const handleAdd = () =>{
    setArr(prev => [...prev,<MilesStonesComp
      name={`Milestone-${prev.length + 1}`}
      index={prev.length}
      setMiles={setMiles}
    />])
  }

  return (
    <>
      <div className="items flex min-h-[100vh] justify-center bg-[#F8F8F8] pb-[2rem]">
        <div className="mx-[2vw] flex w-[100%] justify-between gap-5">
          <div className="flex h-[max-content] w-[25%] flex-col gap-3 rounded-lg bg-white p-5 shadow-lg">
            <div className="flex h-[max-content] w-[100%] justify-between">
              <span className=" rounded-md bg-green-100 p-[2px] px-2 text-sm font-medium text-green-600">
                Open
              </span>
              <span className=" text-sm font-medium text-red-500">
                69 Days left
              </span>
            </div>
            <div>Building a PEP LLM</div>
            <div className="mt-2 flex items-center gap-3">
              <span className="pt-2">
                <Avatar radius="full" fallback="A" size="2" />
              </span>
              <div className="flex flex-col">
                <div>Rzolut Technologies</div>
                <div className="flex items-center gap-2 text-xs ">
                  <span className="flex items-center rounded-md bg-[#FFEDE0] px-2 py-[2px]">
                    <span className="text-[#FF9F43]">
                      <StarIcon />
                    </span>
                    <span>0</span>
                  </span>
                  <span>0 Projects</span>
                </div>
              </div>
            </div>
            <div className="mt-5 border-b border-slate-200 pb-1 text-lg">
              Project Details
            </div>
            <div className="flex justify-between">
              <div className="flex gap-3">
                <span>Posed Date: </span>
                <span>Nov 21,23</span>
              </div>
              <span className="flex items-center">
                <AttachIcon /> <span>1</span>
              </span>
            </div>
            <div className="flex flex-col gap-1 text-xs ">
              <span>Tags:</span>
              <div className="flex gap-2">
                <span className="rounded-md bg-[#E3F2FD] p-[2px] px-2 text-xs font-medium text-[#2196F3]">
                  Machine Learning
                </span>
                <span className="rounded-md bg-[#E3F2FD] p-[2px] px-2 text-xs font-medium  text-[#2196F3]">
                  + 1
                </span>
              </div>
            </div>
            <div>
              <span>Description:</span>
              <p className="text-sm">
                The project is to develop a preliminary LLM that specifically
                identifies Politically-Exposed- People (PEPs) and develops the
                basic data fields relating to a PEP
              </p>
            </div>
            <div className=" mt-5 flex items-center justify-center">
              <span className="cursor-pointer rounded-lg bg-[#0065C1] px-5 py-2 text-white shadow-md hover:shadow-blue-400">
                Message
              </span>
            </div>
          </div>
          <div className="flex h-[max-content] flex-grow flex-col gap-5">
            <div className="flex gap-5">
              <div className="flex items-center gap-4 text-[#2495E6]">
                <span className="rounded-md bg-[#D9E9F5] p-3">
                  <WatchIcon />
                </span>
                <div className="flex flex-col text-sm">
                  <span className="font-semibold">Milestone</span>
                  <span className="text-xs">Add milestone</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="rounded-md bg-[#ECECEC] p-3 text-[#757575]">
                  <TickIcon />
                </span>
                <div className="flex flex-col text-sm">
                  <span>Preview</span>
                  <span className="text-xs">Review before posting</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-[#FAFAFA] p-4 shadow-md">
              <div className="border-b border-slate-200 pb-1">
                Create milestones that will make it easier to work on and track
                this project
              </div>
              <div className="mt-5 flex justify-between rounded-md bg-white p-4 text-sm shadow-md">
                <div className="flex flex-col gap-3">
                  <span>
                    Start Date<span className="text-red-500">*</span>
                  </span>
                  <input
                    required
                    type="date"
                    name="date"
                    placeholder="select start date"
                    id="date"
                    className=" rounded-md border px-5 py-2"
                  />
                </div>
                <div className="flex gap-5">
                  <div className="mr-5 flex flex-col items-end gap-3">
                    <span>Estimated Duration</span>
                    <span>0w</span>
                  </div>
                  <div className="mr-5 flex flex-col items-end gap-3">
                    <span>Total cost</span>
                    <span>$ 0</span>
                  </div>
                </div>
              </div>
              {arr.map((value,index) => value)}
              <div className="mt-3 flex cursor-pointer items-center gap-2 text-[#0065C1]" onClick={handleAdd}>
                <span>
                  <PlusIcon />
                </span>
                <span>Add Milestone</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-lg bg-[#FAFAFA] p-4 shadow-md">
              <div className="border-b border-slate-200 pb-1">Documents</div>
              <div className="flex flex-col gap-3">
                <div className="flex  items-center gap-1 text-xs font-normal text-gray-500 ">
                  Upload detailed requirements document (optional)
                  <span>
                    <InfoIcon />
                  </span>
                </div>
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#1E88E5] text-[#1E88E5]"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <svg
                        className="mb-4 h-8 w-8 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm ">
                        <span className="font-semibold">
                          Drop files here or click to upload
                        </span>
                      </p>
                      <p className="text-xs ">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex cursor-pointer items-center gap-2 text-[#0065C1]">
                <span className="rounded-full bg-[#D9E9F5] p-1">
                  <ChevronLeftIcon />{" "}
                </span>
                Back
              </div>
              <div className=" flex items-center justify-center">
                <span className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#0065C1] px-5 py-2 text-white shadow-md hover:shadow-blue-400">
                  Save & Continue <RightIcon />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MilesStonesComp({
  name,
  index,
  setMiles,
}: {
  name: string;
  index: number;
  setMiles: React.Dispatch<React.SetStateAction<Milestone[]>>;
}) {
  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [cost, setCost] = useState<number | undefined>(undefined);
  const [milename, setMilename] = useState<string | undefined>(undefined);
  const [desc, setDesc] = useState<string | undefined>(undefined);
  const [deliverable, setDeliverable] = useState<string | undefined>(undefined);

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setDuration(value);

    setMiles((prevMilestones) => {
      const updatedMilestones = [...prevMilestones];
      if (!updatedMilestones[index]) {
        updatedMilestones[index] = {
          ...updatedMilestones[index],
          duration: value,
        };
      } else {
        updatedMilestones[index] = {
          name: name,
          description: "",
          duration: value,
          cost: 0,
          deliverables: "",
        };
      }
      return updatedMilestones;
    });
  };
  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCost(value);
    setMiles((prevMilestones) => {
      const updatedMilestones = [...prevMilestones];
      if (!updatedMilestones[index]) {
        updatedMilestones[index] = {
          name: "",
          description:"",
          duration: value,
          cost: 0,
          deliverables: ""
        };
      }
      else{
        updatedMilestones[index] = {
          ...updatedMilestones[index],
          cost: value,
        };
      }
      return updatedMilestones;
    });
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMilename(e.target.value);
    setMiles((prevMilestones) => {
      const updatedMilestones = [...prevMilestones];
      if (!updatedMilestones[index]) {
        updatedMilestones[index] = {
          name: e.target.value,
          description: "",
          duration: 0,
          cost: 0,
          deliverables: "",
        };
      }
      else{
        updatedMilestones[index] = {
          ...updatedMilestones[index],
          name: e.target.value,
        };
      }
      return updatedMilestones;
    });
  };
  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
    setMiles((prevMilestones) => {
      const updatedMilestones = [...prevMilestones];
      if (!updatedMilestones[index]) {
        updatedMilestones[index] = {
          name: "",
          description:e.target.value,
          duration: 0,
          cost: 0,
          deliverables: "",
        };
      }
      else{
        updatedMilestones[index] = {
          ...updatedMilestones[index],
          description: e.target.value,
        };
      }
      return updatedMilestones;
    });
  };
  const handleDeliverablesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliverable(e.target.value);
    setMiles((prevMilestones) => {
      const updatedMilestones = [...prevMilestones];
      if (!updatedMilestones[index]) {
        updatedMilestones[index] = {
          name: "",
          description:"",
          duration: 0,
          cost: 0,
          deliverables: e.target.value
        };
      }
      else{
        updatedMilestones[index] = {
          ...updatedMilestones[index],
          deliverables: e.target.value,
        };
      }
      return updatedMilestones;
    });
  };
  return (
    <>
      <div className="mt-5 flex flex-col justify-between gap-5 rounded-md bg-[#FFFFFF] p-4 shadow-md">
        <div className="flex w-[100%] justify-between">
          <span>{name}</span>
          <div className="flex gap-2 text-sm">
            <div className="flex flex-col gap-3">
              <span>
                Duration<span className="text-red-500">*</span>
              </span>
              <span className="relative">
                <input
                  type="number"
                  name="duration"
                  value={duration || ""}
                  onChange={handleDurationChange}
                  placeholder="Enter"
                  id="date"
                  className=" rounded-md border px-2 py-2"
                  required
                />
                <i className="absolute right-9 top-2">w</i>
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <span>
                Talent Cost<span className="text-red-500">*</span>
              </span>
              <span className="relative">
                <input
                  type="number"
                  name="talent cost"
                  placeholder="Enter"
                  value={cost || ""}
                  onChange={handleCostChange}
                  id="date"
                  className=" rounded-md border px-2 py-2"
                  required
                />
                <i className="absolute right-9 top-2">$</i>
              </span>
            </div>
          </div>
        </div>
        <div className="mb-5 flex justify-between gap-5">
          <div className="flex flex-grow flex-col gap-3 rounded-md p-4 shadow-md">
            <span>Milestone Details</span>
            <div className="mt-3 flex flex-col gap-4">
              <div>
                <label htmlFor="first_name" className="mb-2 block text-sm">
                  Milestone Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter name"
                  value={milename || ""}
                  onChange={handleNameChange}
                  minLength={4}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm">
                  Description
                </label>
                <textarea
                  id="message"
                  value={desc || ""}
                  onChange={handleDescChange}
                  rows={4}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                  placeholder="Enter description in 500 characters"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex h-[max-content] flex-grow flex-col gap-3 rounded-md p-4 shadow-md">
            <div>Deliverable Details</div>
            <input
              type="text"
              id="deliverable"
              className=" mt-5 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter deliverable"
              minLength={4}
              value={deliverable || ""}
              onChange={handleDeliverablesChange}
              required
            />
            <div className="mt-3 flex cursor-pointer items-center gap-2 text-[#0065C1]">
              <span className="rounded-full bg-[#E0F0FC] p-2">
                <PlusIcon />
              </span>
              <span>Add Deliverable</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
