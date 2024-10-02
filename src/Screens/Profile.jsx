import React from "react";
import SideBar from "../Components/SideBar";
import Bg from "../assets/svg/profilebg.svg";
import Border from "../assets/svg/border.svg";
import Person from "../assets/svg/person.svg";
import Camera from "../assets/svg/camera.svg";
import auth from "../Utils/auth";

const Profile = () => {
  auth();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="grid grid-cols-12 bgscreen">
      <SideBar />
      <div className="col-span-9 bg-[url('../assets/svg/bg.svg')] p-10">
        <div className="flex justify-between">
          <p className="page-head">Profile</p>
          <p className="go-back">
            Dashboard / <span className="text-secondary">Profile</span>
          </p>
        </div>
        <div className="mt-10 bg-primary relative rounded-[10px] shadow-custom-shadow">
          <img
            src={Bg}
            className="mix-blend-luminosity -pl-5 -pr-5 w-full -pt-10"
          />

          <div className="absolute top-40 left-1/2 transform -translate-x-1/2">
            <div className="relative items-center flex justify-center">
              <img
                src={Border}
                alt="Background"
                className="w-[258px] h-auto object-cover"
              />

              <img
                src={Person}
                alt="Centered"
                className="absolute inset-0 m-auto w-[258px] h-auto object-contain"
              />
              <div className="bg-secondary absolute p-2 rounded-full right-3 bottom-6">
                <img src={Camera} />
              </div>
            </div>
          </div>

          <div className="pt-32 pb-52">
            <p className="profile-name">{user.name}</p>
            <p className="designation">{user.position_name}</p>
            <p className="profile-mail">{user.email}</p>
            <p className="profile-mail">{user.phone_number}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
