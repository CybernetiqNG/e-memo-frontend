import React, { useState, useEffect } from "react";

import { NavLink, Link } from "react-router-dom";
import Logo from "../assets/svg/logo.svg";
import Border from "../assets/svg/border.svg";
import Person from "../assets/svg/person.svg";
import { FaAngleDown, FaBell } from "react-icons/fa6";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);

  return (
    <>
      <nav
        className={`top-0 z-10 block w-full max-w-full lg:px-[90px] px-5 py-[35px] bg-primary h-[119px] ${
          isScrolled
            ? "sticky bg-opacity-50 backdrop-blur-2xl backdrop-saturate-200  rounded-none shadow-md h-max "
            : ""
        }`}
      >
        <div className="flex items-center justify-between ">
          <a
            href="/"
            className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-primary antialiased"
          >
            <img src={Logo} />
          </a>
          <div className="flex items-center">
            <div className=" items-center gap-x-1">
              <div className="bg-white inline-flex items-center rounded-md py-2 px-6 h-[53px]">
                <div className="relative">
                  <img
                    src={Border}
                    alt="Background"
                    className="w-full h-full object-cover"
                  />
                  {user.profile_image ? (
                    <img
                      src={user.profile_image}
                      alt="Centered"
                      className="absolute inset-0 m-auto rounded-full p-0.5"
                    />
                  ) : (
                    <img
                      src={Person}
                      alt="Centered"
                      className="absolute inset-0 m-auto rounded-full p-0.5"
                    />
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="font-light text-[7px]">{user.position_name}</p>
                </div>
                <FaAngleDown className="ml-4" />
              </div>
            </div>
            <div>
              <FaBell className="w-7 h-7 ml-2.5" style={{ color: "red" }} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
