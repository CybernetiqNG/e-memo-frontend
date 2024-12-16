import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../Components/SideBar";
import Email from "../assets/svg/email.svg";
import AllArchived from "../Lib/Archived";
import AllDrafts from "../Lib/Drafts";
import allInbox from "../Lib/AllInbox";
import AllStar from "../Lib/Starred";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import auth from "../Utils/auth";
import WaterMark from "../Components/WaterMark";
import allSent from "../Lib/Sent";
import statistics from "../Lib/Statistics";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import allChat from "../Lib/AllChats";
import Unviewed from "../Lib/ViewedMemo";
import Disapproved from "../Lib/Disapproved";
import AllApproved from "../Lib/Approved";

const Overview = () => {
  auth();
  const navigate = useNavigate();
  const [inbox, setInbox] = useState(0);
  const [drafts, setDrafts] = useState(0);
  const [archived, setArchived] = useState(0);
  const [starred, setStarred] = useState(0);
  const [memos, setMemos] = useState([]);
  const [stat, setStat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unviewed, setUnviewed] = useState([]);
  const [rejected, setRejected] = useState(0);
  const [approved, setApproved] = useState(0);

  const handleItemClick = (activeItem) => {
    navigate("/messages", { state: { activeItem } });
  };

  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (hasFetchedData.current) return;
    hasFetchedData.current = true;

    const fetchAll = async () => {
      setLoading(true);

      try {
        const fetchedInbox = await allInbox();
        setInbox(fetchedInbox.length);
        if (fetchedInbox.length > 0) {
          setMemos(fetchedInbox);
        } else {
          setError("No memo Available");
        }

        const stats = await statistics();
        setStat(stats);

        const fetchedDraft = await AllDrafts();
        setDrafts(fetchedDraft.length);

        const fetchDisapproved = await Disapproved();
        setRejected(fetchDisapproved.length);

        const fetchApproved = await AllApproved();
        setApproved(fetchApproved.length);

        const fetchedArchived = await AllArchived();
        setArchived(fetchedArchived.length);

        const fetchedStarred = await AllStar();
        setStarred(fetchedStarred.length);

        const unviewed = await Unviewed();
        setUnviewed(unviewed);
        // console.log(unviewed);

        const data = await allChat();
        // console.log(data);
        localStorage.setItem("chatdata", JSON.stringify(data));
      } catch (error) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);
  // console.log(stat);

  return (
    <div className="lg:grid lg:grid-cols-12 relative">
      <SideBar className="hidden" />
      <div className="col-span-9 bg-[url('../assets/svg/bg.svg')] lg:p-10 p-5 overflow-hidden relative">
        <WaterMark />
        <div className="flex justify-between">
          <p className="page-head">Overview</p>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-2 mt-7 gap-x-2 gap-y-5">
          <div className=" py-8 bg-secondary py-[35px] rounded-[10px] flex-col lg:flex-row justify-center lg:inline-flex items-center flex w-full text-white">
            <p className="font-bold text-[32px]">{approved}</p>
            <p className="font-light text-base lg:ml-4">Approved</p>
          </div>
          <div className=" py-8 bg-[#FF9400] py-[35px] rounded-[10px] flex-col lg:flex-row justify-center lg:inline-flex items-center flex w-full text-white">
            <p className="font-bold text-[32px]">
              {stat?.overall_statistics?.total_pending_memos || 0}
            </p>
            <p className="font-light text-base lg:ml-4">Pending</p>
          </div>
          <div className=" py-8 bg-[#FF331C] py-[35px] rounded-[10px] flex-col lg:flex-row justify-center lg:inline-flex items-center flex w-full text-white">
            <p className="font-bold text-[32px]">{rejected}</p>
            <p className="font-light text-base lg:ml-4">Rejected</p>
          </div>
          <div className=" py-8 bg-ash py-[35px] rounded-[10px] flex-col lg:flex-row justify-center lg:inline-flex items-center flex w-full text-black">
            <p className="font-bold text-[32px]">
              {stat?.overall_statistics?.total_memos_sent || 0}
            </p>
            <p className="font-light text-base lg:ml-4">Memos Sent</p>
          </div>
          <div className=" py-8 bg-ash py-[35px] rounded-[10px] flex-col lg:flex-row justify-center lg:inline-flex items-center flex w-full text-black">
            <p className="font-bold text-[32px]">
              {" "}
              {stat?.overall_statistics?.total_memos_received || 0}
            </p>
            <p className="font-light text-base lg:ml-4">Memos Received</p>
          </div>
          <div className=" py-8 bg-ash py-[35px] rounded-[10px] flex-col lg:flex-row justify-center lg:inline-flex items-center flex w-full text-black">
            <p className="font-bold text-[32px]">
              {stat?.overall_statistics?.total_memos_sent + drafts || 0}
            </p>
            <p className="font-light text-base lg:ml-4">Memos Created</p>
          </div>
        </div>
        <div className="bg-primary py-8 rounded-[10px] mt-10 pb-28 h-[400px]">
          <p className="font-bold text-[32px] px-8">Memo Analytics</p>
          <ResponsiveContainer className="w-full mt-10 pr-5">
            <BarChart data={stat.monthly_statistics} type="monotone">
              {/* {console.log(stat.monthly_statistics)} */}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total_memos_sent" fill="#023D00" />
              <Bar dataKey="total_drafts" fill="#FF9400" />
              <Bar dataKey="total_memos_received" fill="#025C00" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:grid grid-cols-7 gap-6 mt-[52px] ">
          <div className="col-span-3 space-y-5">
            <a href="./compose">
              {" "}
              <div className="bg-secondary rounded py-[14px] px-4 inline-flex items-center w-full">
                <img src={Email} className="w-5 h-5" />
                <p className="text-white ml-2 text-xl font-normal">Compose</p>
              </div>
            </a>

            <button
              className="bg-[#f6f6f6] rounded-lg py-[14px] px-4 flex justify-between items-center w-full ring-1 ring-[#595959]"
              onClick={() => handleItemClick("Inbox")}
            >
              <p className="ml-2 text-xl font-normal text-black">Inbox</p>

              <div className="bg-[#FDAD00] rounded">
                <p className="px-3 py-0.5 text-white">{inbox}</p>
              </div>
            </button>
            <button
              className="bg-[#f6f6f6] rounded-lg py-[14px] px-4 flex justify-between items-center w-full ring-1 ring-[#595959]"
              onClick={() => handleItemClick("Draft")}
            >
              <p className="ml-2 text-xl font-normal text-black">Draft</p>
              <div className="bg-[#FDAD00] rounded">
                <p className="px-3 py-0.5 text-white">{drafts}</p>
              </div>
            </button>
            <div className="bg-[#f6f6f6] rounded-lg py-[14px] px-4 flex justify-between items-center w-full ring-1 ring-[#595959]">
              <p className="ml-2 text-xl font-normal text-black">Pending</p>
              <div className="bg-[#FDAD00] rounded">
                <p className="px-3 py-0.5 text-white">
                  {stat?.overall_statistics?.total_pending_memos || 0}
                </p>
              </div>
            </div>

            <button
              className="bg-[#f6f6f6] rounded-lg py-[14px] px-4 flex justify-between items-center w-full ring-1 ring-[#595959]"
              onClick={() => handleItemClick("Favourite")}
            >
              <p className="ml-2 text-xl font-normal text-black">Favourite</p>
              <div className="bg-[#FDAD00] rounded">
                <p className="px-3 py-0.5 text-white">{starred}</p>
              </div>
            </button>
            <button
              className="bg-[#f6f6f6] rounded-lg py-[14px] px-4 flex justify-between items-center w-full ring-1 ring-[#595959]"
              onClick={() => handleItemClick("Archived")}
            >
              <p className="ml-2 text-xl font-normal text-black">Archive</p>
              <div className="bg-[#FDAD00] rounded">
                <p className="px-3 py-0.5 text-white">{archived}</p>
              </div>
            </button>
          </div>
          <div className="col-span-4 ring-1 ring-tertiary bg-primary rounded-[10px] px-6 py-11 lg:mt-0 mt-5">
            <div className="flex justify-between">
              <p className="font-bold text-base">Recent Memos</p>
              <button
                onClick={() => handleItemClick("Inbox")}
                className="text-base font-normal opacity-50"
              >
                See all
              </button>
            </div>
            <div className="pt-7 space-y-3">
              {/* {loading || memos.length < 1 ? (
                <div className="space-y-2">
                  <div className="bg-white py-2 px-4 w-full ring-1 ring-[#00000030] rounded-[10px]">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-40" />
                  </div>
                  <div className="bg-white py-2 px-4 w-full ring-1 ring-[#00000030] rounded-[10px]">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-40" />
                  </div>
                  <div className="bg-white py-2 px-4 w-full ring-1 ring-[#00000030] rounded-[10px]">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-40" />
                  </div>
                  <div className="bg-white py-2 px-4 w-full ring-1 ring-[#00000030] rounded-[10px]">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-40" />
                  </div>
                </div>
              ) : (
                <></>
              )} */}
              {memos.length > 0 ? (
                memos.slice(-4).map((memo) => (
                  <a href={`./message/${memo.id}`} key={memo.id}>
                    <div className="bg-white py-2 px-4 w-full ring-1 ring-[#00000030] rounded-[10px] mb-2">
                      <p className="font-medium text-[15px]">
                        {memo.memo_subject}
                      </p>
                      <p className="font-light text-[14px] text-[#595959]">
                        From - {memo.sender_position}
                      </p>
                    </div>
                  </a>
                ))
              ) : memos.length < 1 ? (
                <p className="flex justify-center ">{error}</p>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* <div className="col-span-5 ring-1 ring-tertiary bg-primary rounded-[10px] pl-7 pr-12 py-7 lg:mt-0 mt-5">
            <p className="font-medium text-sm">Notification</p>
            <div className="pt-4 space-y-6">
              <div>
                <hr className="border-t-1 border-tertiary" />
                <p className="text-sm font-light pt-2">
                  Lorem ipsum dolor sit amet consectetur. At risus nunc mauris
                  in aliquam mauris. Faucibus amet cursus leo
                </p>
                <p className="text-gray-500 text-xs mt-2">12th June, 2023</p>
              </div>
              <div>
                <hr className="border-t-1 border-tertiary" />
                <p className="text-sm font-light pt-2">
                  Lorem ipsum dolor sit amet consectetur. At risus nunc mauris
                  in aliquam mauris. Faucibus amet cursus leo
                </p>
                <p className="text-gray-500 text-xs mt-2">12th June, 2023</p>
              </div>
              <div>
                <hr className="border-t-1 border-tertiary" />
                <p className="text-sm font-light pt-2">
                  Lorem ipsum dolor sit amet consectetur. At risus nunc mauris
                  in aliquam mauris. Faucibus amet cursus leo
                </p>
                <p className="text-gray-500 text-xs mt-2">12th June, 2023</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Overview;
