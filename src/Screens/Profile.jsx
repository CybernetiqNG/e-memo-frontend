import React, { useState } from "react";
import SideBar from "../Components/SideBar";
import Bg from "../assets/svg/profilebg.svg";
import Border from "../assets/svg/border.svg";
import Camera from "../assets/svg/camera.svg";
import Logo from "../assets/svg/logo2.svg";
import auth from "../Utils/auth";
import WaterMark from "../Components/WaterMark";
import axios from "axios";

const Profile = () => {
  auth();

  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      uploadProfilePicture(file);
      setLoading(true);
    }
  };

  const uploadProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("profile_image", file, file.name);

    try {
      const response = await axios.post(
        `${baseUrl}/admin/profile-image`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const res = await axios.get(`${baseUrl}/admin/single-user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUser = res.data.user;

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setLoading(false);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="lg:grid grid-cols-12">
      <SideBar />
      <div className="col-span-9 bg-[url('../assets/svg/bg.svg')] p-10 overflow-hidden relative min-h-screen">
        <WaterMark />
        <div className="flex lg:flex-row flex-col justify-between">
          <p className="page-head">Profile</p>
          <p className="go-back">
            Dashboard / <span className="text-secondary">Profile</span>
          </p>
        </div>
        <div className="mt-10 bg-primary rounded-[10px] shadow-custom-shadow overflow-hidden">
          <WaterMark />
          <img
            src={Bg}
            className="mix-blend-luminosity -pl-5 -pr-5 w-full -pt-10"
            alt="Profile Background"
          />

          <div className="relative flex justify-center">
            <div className="items-center flex justify-center lg:-mt-[150px] -mt-16">
              <img
                src={Border}
                alt="Background Border"
                className="lg:w-[258px] w-32 h-auto object-cover"
              />
              <img
                src={user.profile_image ? user.profile_image : Logo}
                alt="Profile"
                className="absolute m-auto lg:w-[256px] rounded-full w-32 p-[5px] h-auto object-contain"
              />
              {loading ? (
                <div className="m-auto absolute">
                  <div className="loader-two "></div>
                </div>
              ) : (
                <></>
              )}

              <div
                className="bg-secondary absolute p-2 rounded-full right-1/2 bottom-1/2 lg:translate-x-32 translate-x-20 translate-y-1/2 cursor-pointer"
                onClick={triggerFileInput}
              >
                <img src={Camera} alt="Camera Icon" />
              </div>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="lg:pt-32 py-10 lg:pb-52 px-3 text-center">
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
