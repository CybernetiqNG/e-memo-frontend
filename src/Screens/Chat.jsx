import React, { useState, useEffect, useCallback } from "react";
import SideBar from "../Components/SideBar";
import WaterMark from "../Components/WaterMark";
import Search from "../assets/svg/icons/search2.svg";
import { FaAngleDown } from "react-icons/fa6";
import Star1 from "../assets/svg/under1.svg";
import Star2 from "../assets/svg/under2.svg";
import Person from "../assets/svg/logo2.svg";
import { IoMdArrowBack } from "react-icons/io";
import { HiPaperAirplane } from "react-icons/hi2";
import allChat from "../Lib/AllChats";
import formatDate from "../Utils/formatDate";
import chat from "../Lib/Chat";
import sendChat from "../Lib/SendChat";
import Skeleton from "react-loading-skeleton";
import { BsChatFill } from "react-icons/bs";
import auth from "../Utils/auth";
import debounce from "lodash/debounce";

const Chat = () => {
  auth();
  const [chats, setChats] = useState([]);
  const [id, setId] = useState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sender, setSender] = useState();
  const [image, setImage] = useState();
  const [message, setMessage] = useState();
  const [sending, setSending] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredChats, setFilteredChats] = useState([]);

  const user = JSON?.parse(localStorage?.getItem("user"));
  const userId = user?.id;

  // Load chats from local storage or API
  const loadChats = useCallback(async () => {
    const chatList = JSON?.parse(localStorage?.getItem("chatdata"));

    if (chatList) {
      // console.log(chatList);
      setChats(chatList);
    } else {
      const data = await allChat();
      setChats(data);
      // console.log(data);
      localStorage.setItem("chatdata", JSON.stringify(data));
    }
  }, []);

  const loadChat = async (id) => {
    setId(id);
    let data;
    if (id) {
      data = await chat(id);
      setMessages(data);
      // console.log(data);
      setLoading(false);
      setIsChatOpen(true);
    }
  };

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  useEffect(() => {
    const result = chats.filter((chat) =>
      chat.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredChats(result);
  }, [searchQuery, chats]);

  // Set up auto-refresh for messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (id) loadChat(id);
      setSending(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [id, sending]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendChat(userId, id, message);
      setSending(true);
      setMessage("");
    }
  };

  return (
    <div className="lg:grid grid-cols-12 ">
      <SideBar />
      <div className="col-span-9 bg-[url('../assets/svg/bg.svg')] p-5 lg:pr-10 overflow-hidden relative flex flex-col">
        {/* <WaterMark /> */}

        <div className="bg-primary p-3">
          <p className="ml-5 font-bold text-3xl">Chats</p>
        </div>

        <div className="grid grid-cols-6 mt-5 gap-5 flex-grow relative z-1 h-[80vh]">
          <div
            className={`col-span-12 md:col-span-2 border border-[#838383] border-[0.5px] p-4 bg-[#F4F4F4] rounded-[18px]  ${
              isChatOpen ? "hidden md:block" : "block"
            }`}
          >
            <div className="bg-white p-3 flex justify-between rounded items-center">
              <div className="inline-flex">
                <img src={Search} alt="Search" />
                <input
                  type="text"
                  placeholder="Search"
                  className="text-[20px] ml-5 w-full border-none ring-none outline-none box-shadow-none"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <FaAngleDown className="mr-3" />
            </div>

            <div className="mt-3 space-y-2 ">
              {filteredChats?.length > 0 ? (
                filteredChats.map((chat) => (
                  <div
                    className={`py-2 px-3 border border-[#9F9F9F] border-[0.2px] rounded cursor-pointer ${
                      id === chat.id ? "bg-primary" : "bg-white"
                    }`}
                    key={chat.id}
                    onClick={() => {
                      loadChat(chat.id);
                      setSender(chat.fullname);
                      setImage(chat.profile_image);
                      setLoading(true);
                    }}
                  >
                    <div className="grid grid-cols-12">
                      <div className="col-span-9 grid grid-cols-10">
                        <div className="relative col-span-2">
                          {id === chat.id ? (
                            <img src={Star1} className="h-10 w-10" />
                          ) : (
                            <img src={Star2} className="h-10 w-10" />
                          )}

                          <img
                            src={chat.profile_image || Person}
                            className="absolute top-1 left-1 w-[32px] h-[32px] rounded-full"
                          />
                        </div>
                        <div className="flex flex-col justify-center ml-3 col-span-8">
                          <p className="font-medium text-[12px]">
                            {chat.fullname}
                          </p>
                          <p className="text-[#595959] font-semibold text-[9px] text-left truncate overflow-hidden whitespace-nowrap">
                            {chat.last_message}
                          </p>
                        </div>
                      </div>
                      <p className="mt-5 text-[9px] text-[#595959] col-span-3 text-right">
                        {formatDate(chat.last_message_time)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-2">
                  <div className="py-2 px-3 border border-[#9F9F9F] border-[0.2px] rounded bg-white">
                    <div className="flex justify-between">
                      <div className="inline-flex">
                        <div className="relative">
                          <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                        <div className="flex flex-col justify-center ml-3">
                          <Skeleton className="h-3 w-20" />
                          <Skeleton className="h-3 w-40" />
                        </div>
                      </div>
                      <Skeleton className="h-3 w-7 mt-5" />
                    </div>
                  </div>
                  <div className="py-2 px-3 border border-[#9F9F9F] border-[0.2px] rounded bg-white">
                    <div className="flex justify-between">
                      <div className="inline-flex">
                        <div className="relative">
                          <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                        <div className="flex flex-col justify-center ml-3">
                          <Skeleton className="h-3 w-20" />
                          <Skeleton className="h-3 w-40" />
                        </div>
                      </div>
                      <Skeleton className="h-3 w-7 mt-5" />
                    </div>
                  </div>
                  <div className="py-2 px-3 border border-[#9F9F9F] border-[0.2px] rounded bg-white">
                    <div className="flex justify-between">
                      <div className="inline-flex">
                        <div className="relative">
                          <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                        <div className="flex flex-col justify-center ml-3">
                          <Skeleton className="h-3 w-20" />
                          <Skeleton className="h-3 w-40" />
                        </div>
                      </div>
                      <Skeleton className="h-3 w-7 mt-5" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className={`col-span-12 md:col-span-4 border border-[#838383] border-[0.5px] py-5 lg:px-9 px-3 bg-[#F4F4F4] rounded-[18px] flex flex-col  justify-between overflow-hidden  ${
              isChatOpen ? "block" : "hidden md:block"
            }`}
          >
            <WaterMark />
            {loading ? (
              <div className="flex m-auto">
                <div className="loader-two "></div>
              </div>
            ) : id ? (
              <>
                <div className="flex justify-between items-center py-3 px-6 bg-white rounded-lg border border-[#838383] border-[0.5px] relative">
                  <div className="inline-flex items-center">
                    <IoMdArrowBack
                      className="text-[#595959] w-5 h-5 cursor-pointer"
                      onClick={() => setIsChatOpen(false)} // Hide chat on small screens
                    />
                    <div className="inline-flex ml-5">
                      <div className="relative">
                        <img src={Star1} className="h-10 w-10" />
                        <img
                          src={image || Person}
                          className="absolute top-1 left-1 w-[32px] h-[32px] rounded-full"
                        />
                      </div>
                      <div className="flex flex-col justify-center ml-3">
                        <p className="font-medium text-[12px]">{sender}</p>
                        <p className="text-[#595959] font-semibold text-[9px] text-left">
                          online
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-y-scroll scrollbar-hidden space-y-1 py-5 flex flex-col-reverse space-y-reverse h-[60vh]">
                  {messages
                    .slice(0)
                    .reverse()
                    .map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          id === message.sender_id
                            ? "justify-start"
                            : "justify-end"
                        }`}
                      >
                        <div
                          className={`p-3 rounded-t-lg max-w-xs ${
                            id === message.sender_id
                              ? "bg-white text-black rounded-br-lg"
                              : "bg-primary text-black rounded-bl-lg"
                          }`}
                        >
                          <p className="text-[11px] font-normal">
                            {message.message}
                          </p>
                          <p
                            className={`text-[8px] text-gray-500 ${
                              id === message.sender_id
                                ? "text-left"
                                : "text-right"
                            }`}
                          >
                            {new Date(message.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex justify-between items-center py-3 px-6 bg-white rounded-lg border border-[#838383] border-[0.5px]  w-full">
                  <input
                    className="text-base font-light border-none ring-none outline-none box-shadow-none w-full"
                    placeholder="Send Message"
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    value={message}
                  />

                  {sending ? (
                    <div className="flex m-auto">
                      <div className="sending"></div>
                    </div>
                  ) : (
                    <HiPaperAirplane
                      className="ml-7 cursor-pointer text-secondary"
                      onClick={() => {
                        sendChat(userId, id, message);
                        setSending(true);
                        setMessage("");
                      }}
                    />
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center mt-60">
                <BsChatFill className="text-[#0E9F6E] w-28 h-28" />
                <p className="mt-3 text-2xl font-bold text-grey">Chats</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
