import React, { useState, useEffect } from "react";
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

const Overview = () => {
  auth();
  const navigate = useNavigate();
  const [inbox, setInbox] = useState(0);
  const [drafts, setDrafts] = useState(0);
  const [archived, setArchived] = useState(0);
  const [starred, setStarred] = useState(0);
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleItemClick = (activeItem) => {
    navigate("/messages", { state: { activeItem } });
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const fetchedInbox = await allInbox();
      setInbox(fetchedInbox.length);
      if (fetchedInbox) {
        setLoading(false);
        // console.log(fetchedInbox);
        setMemos(fetchedInbox);
      } else {
        setError("No memo Available");
      }
      const fetchedDraft = await AllDrafts();
      setDrafts(fetchedDraft.length);
      const fetchedArchived = await AllArchived();
      setArchived(fetchedArchived.length);
      const fetchedStarred = await AllStar();
      setStarred(fetchedStarred.length);
    };

    fetchAll();
  }, []);

  return (
    <div className="grid grid-cols-12 bgscreen">
      <SideBar />
      <div className="col-span-9 bg-[url('../assets/svg/bg.svg')] p-10">
        <div className="flex justify-between">
          <p className="page-head">Overview</p>
        </div>
        <div className="grid grid-cols-3 mt-7 gap-x-0.5 gap-y-5">
          <div className="pl-16 py-8 bg-secondary py-[35px] rounded-[10px] inline-flex items-center w-full text-white">
            <p className="font-bold text-[32px]">4</p>
            <p className="font-light text-base ml-4">Approved</p>
          </div>
          <div className="pl-16 py-8 bg-[#FF9400] py-[35px] rounded-[10px] inline-flex items-center w-full text-white">
            <p className="font-bold text-[32px]">16</p>
            <p className="font-light text-base ml-4">Pending</p>
          </div>
          <div className="pl-16 py-8 bg-[#FF331C] py-[35px] rounded-[10px] inline-flex items-center w-full text-white">
            <p className="font-bold text-[32px]">10</p>
            <p className="font-light text-base ml-4">Rejected</p>
          </div>
          <div className="pl-16 py-8 bg-ash py-[35px] rounded-[10px] inline-flex items-center w-full text-black">
            <p className="font-bold text-[32px]">4</p>
            <p className="font-light text-base ml-4">Memos Sent</p>
          </div>
          <div className="pl-16 py-8 bg-ash py-[35px] rounded-[10px] inline-flex items-center w-full text-black">
            <p className="font-bold text-[32px]">30</p>
            <p className="font-light text-base ml-4">Memos Received</p>
          </div>
          <div className="pl-16 py-8 bg-ash py-[35px] rounded-[10px] inline-flex items-center w-full text-black">
            <p className="font-bold text-[32px]">50</p>
            <p className="font-light text-base ml-4">Memos Created</p>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 mt-[52px] ">
          <div className="col-span-3 space-y-5">
            <div className="bg-secondary rounded py-[14px] px-4 inline-flex items-center w-full">
              <img src={Email} className="w-5 h-5" />
              <p className="text-white ml-2 text-xl font-normal">Compose</p>
            </div>
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
                <p className="px-3 py-0.5 text-white">9</p>
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
              onClick={() => handleItemClick("Archive")}
            >
              <p className="ml-2 text-xl font-normal text-black">Archive</p>
              <div className="bg-[#FDAD00] rounded">
                <p className="px-3 py-0.5 text-white">{archived}</p>
              </div>
            </button>
          </div>
          <div className="col-span-4 ring-1 ring-[#595959] bg-primary rounded-[10px] px-6 py-11">
            <div className="flex justify-between">
              <p className="font-bold text-base">Recent Memos</p>
              <button
                onClick={() => handleItemClick("Archive")}
                className="text-base font-normal opacity-50"
              >
                See all
              </button>
            </div>
            <div className="pt-7 space-y-3">
              {loading ? (
                <div className="bg-white py-2 px-4 w-full ring-1 ring-[#00000030] rounded-[10px]">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-40" />
                </div>
              ) : (
                <></>
              )}
              {memos.length > 0 ? (
                memos.map((memo) => (
                  <a href={`./message/${memo.id}`} key={memo.id}>
                    <div className="bg-white py-2 px-4 w-full ring-1 ring-[#00000030] rounded-[10px]">
                      <p className="font-medium text-[15px]">
                        {memo.memo_subject}
                      </p>
                      <p className="font-light text-[14px] text-[#595959] mb-3">
                        Name - {memo.sender_position}
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
          <div className="col-span-5 ring-1 ring-[#595959] bg-primary rounded-[10px] pl-7 pr-12 py-7">
            <p className="font-medium text-sm">Notification</p>
            <div className="pt-4 space-y-6">
              <div>
                <hr className="border-t-1 border-[#595959]" />
                <p className="text-sm font-light pt-2">
                  Lorem ipsum dolor sit amet consectetur. At risus nunc mauris
                  in aliquam mauris. Faucibus amet cursus leo
                </p>
                <p className="text-gray-500 text-xs mt-2">12th June, 2023</p>
              </div>
              <div>
                <hr className="border-t-1 border-[#595959]" />
                <p className="text-sm font-light pt-2">
                  Lorem ipsum dolor sit amet consectetur. At risus nunc mauris
                  in aliquam mauris. Faucibus amet cursus leo
                </p>
                <p className="text-gray-500 text-xs mt-2">12th June, 2023</p>
              </div>
              <div>
                <hr className="border-t-1 border-[#595959]" />
                <p className="text-sm font-light pt-2">
                  Lorem ipsum dolor sit amet consectetur. At risus nunc mauris
                  in aliquam mauris. Faucibus amet cursus leo
                </p>
                <p className="text-gray-500 text-xs mt-2">12th June, 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
