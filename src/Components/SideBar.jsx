import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import Account from "../assets/svg/icons/account.svg";
import Account2 from "../assets/svg/icons/account2.svg";
import Archive from "../assets/svg/icons/archive.svg";
import Archive2 from "../assets/svg/icons/archive2.svg";
import Auth from "../assets/svg/icons/auth.svg";
import Auth2 from "../assets/svg/icons/auth.svg";
import Chart2 from "../assets/svg/icons/chart.svg";
import Chart from "../assets/svg/icons/chart2.svg";
import Notification from "../assets/svg/icons/notification.svg";
import Notification2 from "../assets/svg/icons/notification2.svg";
import Overview from "../assets/svg/icons/overview.svg";
import Overview2 from "../assets/svg/icons/overview2.svg";
import Star from "../assets/svg/icons/star.svg";
import Star2 from "../assets/svg/icons/star.svg";
import Support from "../assets/svg/icons/support.svg";
import Support2 from "../assets/svg/icons/support2.svg";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { BsChatFill } from "react-icons/bs";
import Logout from "../Lib/LogOut";

const SideBar = () => {
  const [memos, openMemos] = useState(false);
  const [auth, openAuth] = useState(false);
  const location = useLocation();

  const toggleVisibility = (setVisible, currentVisibility) => {
    setVisible(!currentVisibility);
  };

  const LogoutNow = async () => {
    Logout();
  };

  const navigate = useNavigate();
  const handleItemClick = (activeItem) => {
    navigate("/messages", { state: { activeItem } });
  };

  return (
    <div className="bg-secondary col-span-3 flex py-[54px] px-[45px] h-screen lg:block hidden sticky top-20">
      <div className="w-full overflow-hidden">
        <div className="w-full">
          <p className="text-white text-left text-2xl font-light">MENU</p>
          <div className="mt-10 space-y-4">
            {/* Overview Link */}
            <Link
              to="/overview"
              className={`w-full ${
                location.pathname === "/overview"
                  ? "bg-primary text-black"
                  : "bg-btn text-white"
              } inline-flex py-2 px-5 rounded-md cursor-pointer`}
            >
              <img
                src={location.pathname === "/overview" ? Chart2 : Chart}
                alt="Overview Icon"
              />
              <p className="ml-3">Overview</p>
            </Link>

            {/* Memos Section */}
            <div className="space-y-1.5">
              <div
                className={`w-full ${
                  ["/memos", "/messages", "/compose", "/message"].includes(
                    location.pathname
                  )
                    ? "bg-primary text-black"
                    : "bg-btn text-white"
                } flex justify-between items-center py-2 px-5 rounded-md cursor-pointer`}
                onClick={() => toggleVisibility(openMemos, memos)}
              >
                <div className="inline-flex">
                  <img
                    src={
                      ["/memos", "/messages", "/compose", "/message"].includes(
                        location.pathname
                      )
                        ? Overview2
                        : Overview
                    }
                    alt="Memos Icon"
                  />
                  <p className="ml-3">Memos</p>
                </div>
                <div>{!memos ? <FaAngleDown /> : <FaAngleUp />}</div>
              </div>
              {memos && (
                <>
                  <Link
                    to="/compose"
                    className="w-full bg-white inline-flex py-2 px-5 rounded-md text-black cursor-pointer"
                  >
                    <p className="ml-10">Compose</p>
                  </Link>
                  <Link
                    to="/messages"
                    className="w-full bg-white inline-flex py-2 px-5 rounded-md text-black cursor-pointer"
                  >
                    <p className="ml-10">Messages</p>
                  </Link>
                </>
              )}
            </div>

            {/* Profile Link */}
            <Link
              to="/profile"
              className={`w-full ${
                location.pathname === "/profile"
                  ? "bg-primary text-black"
                  : "bg-btn text-white"
              } inline-flex py-2 px-5 rounded-md cursor-pointer`}
            >
              <img
                src={location.pathname === "/profile" ? Account2 : Account}
                alt="Profile Icon"
              />
              <p className="ml-3">Profile</p>
            </Link>

            {/* Chat Link */}
            <Link
              to="/chat"
              className={`w-full ${
                location.pathname === "/chat"
                  ? "bg-primary text-black"
                  : "bg-btn text-white"
              } inline-flex items-center py-2 px-5 rounded-md cursor-pointer`}
            >
              {location.pathname === "/chat" ? (
                <BsChatFill className="bg-[ #434343] w-5 h-5 ml-1" />
              ) : (
                <BsChatFill className="w-5 h-5 ml-1" />
              )}

              <p className="ml-3">Chat</p>
            </Link>

            {/* Notifications Link  */}
            <Link
              to="/notifications"
              className={`w-full ${
                location.pathname === "/notifications"
                  ? "bg-primary text-black"
                  : "bg-btn text-white"
              } inline-flex py-2 px-5 rounded-md cursor-pointer`}
            >
              <img
                src={
                  location.pathname === "/notifications"
                    ? Notification2
                    : Notification
                }
                alt="Notification Icon"
              />
              <p className="ml-3">Notification</p>
            </Link>

            {/* Favourite Link */}
            <div
              onClick={() => handleItemClick("Favourite")}
              className={`w-full ${
                location.pathname === "/favourites"
                  ? "bg-primary text-black"
                  : "bg-btn text-white"
              } inline-flex py-2 px-5 rounded-md cursor-pointer`}
            >
              <img
                src={location.pathname === "/favourites" ? Star2 : Star}
                alt="Favourite Icon"
              />
              <p className="ml-3">Favourite</p>
            </div>

            {/* Archive Link */}
            <div
              onClick={() => handleItemClick("Archived")}
              className={`w-full ${
                location.pathname === "/archive"
                  ? "bg-primary text-black"
                  : "bg-btn text-white"
              } inline-flex py-2 px-5 rounded-md cursor-pointer`}
            >
              <img
                src={location.pathname === "/archive" ? Archive2 : Archive}
                alt="Archive Icon"
              />
              <p className="ml-3">Archive</p>
            </div>

            {/* Help & Support Link */}
            <Link
              to="/help"
              className={`w-full ${
                location.pathname === "/help"
                  ? "bg-primary text-black"
                  : "bg-btn text-white"
              } inline-flex py-2 px-5 rounded-md cursor-pointer`}
            >
              <img
                src={location.pathname === "/help" ? Support2 : Support}
                alt="Help & Support Icon"
              />
              <p className="ml-3">Help & Support</p>
            </Link>

            {/* Authentication Section */}
            <div className="space-y-1.5">
              <div
                className={`w-full ${
                  location.pathname === "/logout"
                    ? "bg-primary text-black"
                    : "bg-btn text-white"
                } flex justify-between items-center py-2 px-5 rounded-md cursor-pointer`}
                onClick={() => toggleVisibility(openAuth, auth)}
              >
                <div className="inline-flex">
                  <img src={auth ? Auth2 : Auth} alt="Authentication Icon" />
                  <p className="ml-3">Authentication</p>
                </div>
                <div>{!auth ? <FaAngleDown /> : <FaAngleUp />}</div>
              </div>
              {auth && (
                <button
                  onClick={LogoutNow}
                  className="w-full bg-white inline-flex py-2 px-5 rounded-md text-black cursor-pointer"
                >
                  <p className="ml-10">Log Out</p>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
