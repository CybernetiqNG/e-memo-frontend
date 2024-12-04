import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../assets/svg/logo.svg";
import Logo2 from "../assets/svg/logo2.svg";
import Logo3 from "../assets/svg/eMemo.svg";
import { useNavigate } from "react-router-dom";
import Border from "../assets/svg/border.svg";
import Person from "../assets/svg/person.svg";
import { FaAngleDown, FaAngleUp, FaBell } from "react-icons/fa6";
import Logout from "../Lib/LogOut";
import Bg from "../assets/svg/profilebg.svg";
import Camera from "../assets/svg/camera.svg";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "user") {
        setUser(JSON.parse(event.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const LogoutNow = async () => {
    Logout();
  };

  return (
    <>
      <nav
        className={`top-0 z-10 block w-full max-w-full lg:px-[90px] px-5 lg:py-[35px] py-5 bg-primary lg:h-[119px] ${
          isScrolled
            ? "sticky bg-opacity-50 backdrop-blur-2xl backdrop-saturate-200  rounded-none shadow-md h-max "
            : ""
        }`}
      >
        <div className="flex items-center justify-between ">
          <a
            href="/"
            className="mr-4 block inline-flex cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-primary antialiased"
          >
            <img src={Logo3} className="h-[46px] pr-2" />
            <img src={Logo} />
          </a>
          <div className="flex items-center">
            <div className=" items-center gap-x-1 lg:block hidden">
              <div className="relative ">
                <div
                  className="bg-white inline-flex items-center rounded-md py-2 px-6 h-[53px] cursor-pointer "
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                >
                  <div className="relative">
                    <img
                      src={Border}
                      alt="Background"
                      className="w-full h-full object-cover"
                    />

                    <img
                      src={user.profile_image ? user.profile_image : Logo}
                      alt="Centered"
                      className="absolute inset-0 m-auto rounded-full p-0.5"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold max-w-[200px] truncate">
                      {user.name}
                    </p>
                    <p className="font-light text-[7px]">
                      {user.position_name}
                    </p>
                  </div>
                  <div>
                    {isOpen ? (
                      <FaAngleUp className="ml-4" />
                    ) : (
                      <FaAngleDown className="ml-4" />
                    )}
                  </div>
                </div>

                {isOpen && (
                  <div
                    className="absolute flex-col w-full space-y-1"
                    style={{ top: "110%", zIndex: "10" }}
                  >
                    <a
                      className="flex justify-between items-center left-0 bg-white ring-1 ring-secondary text-center py-2 px-6 rounded-md text-black cursor-pointer h-[53px] w-full "
                      href="./profile"
                    >
                      <p className="">Profile</p>
                    </a>
                    <button
                      className="flex justify-between items-center left-0 bg-white ring-1 ring-secondary text-center py-2 px-6 rounded-md text-black cursor-pointer h-[53px] w-full "
                      onClick={() => {
                        LogoutNow();
                      }}
                    >
                      <p className="">Log Out</p>
                      {/* <FaAngleDown className="ml-4" /> */}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <a href="./profile" className="w-10 h-10 lg:hidden">
              <div className="relative items-center flex justify-center">
                <img
                  src={Border}
                  alt="Background"
                  className="w-[258px] h-auto object-cover"
                />

                <img
                  src={user.profile_image ? user.profile_image : Logo}
                  alt="Centered"
                  className="absolute inset-0 m-auto w-[258px] h-auto object-contain rounded-full p-0.5"
                />
              </div>
            </a>
            <div className="hidden lg:block">
              <FaBell className="w-7 h-7 ml-2.5" style={{ color: "red" }} />
            </div>
            <button
              onClick={toggleMobileMenu}
              className="relative ml-5 h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-primary transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
              type="button"
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                {/* Conditional rendering of icon */}
                {isMobileMenuOpen ? (
                  // Close icon when mobile menu is open
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_452_1195)">
                      <rect width="24" height="24" rx="7" fill="#025C00" />
                      <path
                        d="M16.0659 8.99517C16.3588 8.70228 16.3588 8.22741 16.0659 7.93451C15.773 7.64162 15.2981 7.64162 15.0052 7.93451L12 10.9397L8.99482 7.93451C8.70192 7.64162 8.22705 7.64162 7.93416 7.93451C7.64126 8.22741 7.64126 8.70228 7.93416 8.99517L10.9394 12.0004L7.93415 15.0056C7.64125 15.2985 7.64125 15.7733 7.93415 16.0662C8.22704 16.3591 8.70191 16.3591 8.99481 16.0662L12 13.061L15.0052 16.0662C15.2981 16.3591 15.773 16.3591 16.0659 16.0662C16.3588 15.7733 16.3588 15.2985 16.0659 15.0056L13.0607 12.0004L16.0659 8.99517Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_452_1195">
                        <rect width="24" height="24" rx="7" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                ) : (
                  // Menu icon when mobile menu is closed
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1081_1286)">
                      <path
                        d="M4 18H17C17.55 18 18 17.55 18 17C18 16.45 17.55 16 17 16H4C3.45 16 3 16.45 3 17C3 17.55 3.45 18 4 18ZM7 13H20C20.55 13 21 12.55 21 12C21 11.45 20.55 11 20 11H7C6.45 11 6 11.45 6 12C6 12.55 6.45 13 7 13ZM3 7C3 7.55 3.45 8 4 8H17C17.55 8 18 7.55 18 7C18 6.45 17.55 6 17 6H4C3.45 6 3 6.45 3 7Z"
                        fill="#025C00"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1081_1286">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                )}
              </span>
            </button>
            {isMobileMenuOpen && (
              <div className="lg:hidden z-20 flex justify-end absolute top-16 right-5">
                <ul className="bg-white border rounded-md shadow-md mt-2 overflow-y-auto p-2">
                  <li className="py-2 px-4 text-secondary">
                    <button onClick={() => setIsMobileMenuOpen(false)}>
                      <Link to="./overview" className="block text-sm">
                        Overview
                      </Link>
                    </button>
                  </li>
                  <li className="py-2 px-4 text-secondary">
                    <Link
                      to="./compose"
                      className="block text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Compose Memo
                    </Link>
                  </li>
                  <li className="py-2 px-4 text-secondary">
                    <Link
                      to="./messages"
                      className="block text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Messages
                    </Link>
                  </li>
                  <li className="py-2 px-4 text-secondary">
                    <Link
                      to="./chat"
                      className="block text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Chat
                    </Link>
                  </li>
                  <li className="py-2 px-4 text-secondary">
                    <Link
                      to="./notifications"
                      className="block text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Notifications
                    </Link>
                  </li>
                  <li className="py-2 px-4 text-secondary">
                    <Link
                      to="./help"
                      className="block text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Help
                    </Link>
                  </li>

                  <hr />
                  <li className="py-4 px-4 text-secondary">
                    <p
                      className="block text-sm"
                      onClick={() => {
                        LogoutNow();
                        setIsMobileMenuOpen(false); // Close the menu after logout
                      }}
                    >
                      Log out
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
