import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
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
import axios from "axios";

const SideBar = () => {
  const [memos, openMemos] = useState(false);
  const [auth, openAuth] = useState(false);
  const location = useLocation(); // Get the current location

  const toggleVisibility = (setVisible, currentVisibility) => {
    setVisible(!currentVisibility);
  };

  const Logout = async () => {
    const token = localStorage.getItem("token");
    const baseUrl = import.meta.env.VITE_BASE_URL;

    if (token) {
      try {
        const response = await axios.post(
          `${baseUrl}/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Logout successful");

          localStorage.removeItem("token");
          localStorage.removeItem("user");

          window.location.href = "/sign-in";
        } else {
          console.log("Error logging out:", response.message);
        }
      } catch (err) {
        console.log(err);

        if (err.response && err.response.status === 401) {
          window.location.href = "/sign-in";
        }
      }
    } else {
      console.log("No token found, please log in.");
    }
  };

  return (
    <div className="bg-secondary col-span-3 flex py-[54px] px-[45px] h-full">
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

          {/* Notifications Link */}
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
          <Link
            // to="/favourites"
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
          </Link>

          {/* Archive Link */}
          <Link
            // to="/archive"
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
          </Link>

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
                onClick={Logout}
                className="w-full bg-white inline-flex py-2 px-5 rounded-md text-black cursor-pointer"
              >
                <p className="ml-10">Log Out</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
