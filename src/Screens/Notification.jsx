import React from "react";
import SideBar from "../Components/SideBar";
import Success from "../assets/svg/icons/success.svg";
import Error from "../assets/svg/icons/error.svg";
import Warning from "../assets/svg/icons/warning.svg";
import auth from "../Utils/auth";
import WaterMark from "../Components/WaterMark";

const Notification = () => {
  auth();
  return (
    <div className="lg:grid grid-cols-12 ">
      <SideBar />
      <div className="col-span-9 bg-[url('../assets/svg/bg.svg')] lg:p-20 p-5 overflow-hidden relative">
        <WaterMark />

        <div className="flex flex-col lg:flex-row lg:justify-between">
          <p className="page-head">Notification</p>
          <p className="go-back">
            Dashboard / <span className="text-secondary">Notifications</span>
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-custom-shadow lg:pt-10 lg:pl-20 lg:pr-10 p-3 mt-10 space-y-5 pb-20 relative overflow-hidden">
          <WaterMark />

          <div className="bg-secondary max-w-[756px]">
            <div className="bg-primary max-w-[752px] ml-2 py-6 lg:pl-8 px-3">
              <div className="inline-flex">
                <img src={Success} className="" />

                <div className="pl-4">
                  <p className="notify-head text-secondary">
                    Message Sent Successfully
                  </p>
                  <p className="notify-text mt-2">
                    Lorem ipsum dolor sit amet consectetur. Dolor pellentesque
                    diam amet
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Error */}
          <div className="bg-[#ff0000] max-w-[756px]">
            <div className="bg-[#FCE1E2] max-w-[752px] ml-2 py-6 lg:pl-8 px-3">
              <div className="inline-flex">
                <img src={Error} className="" />

                <div className="pl-4">
                  <p className="notify-head text-[#ff0000]">
                    Message Sent Successfully
                  </p>
                  <p className="notify-text mt-2">
                    Lorem ipsum dolor sit amet consectetur. Dolor pellentesque
                    diam amet
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-[#FFC700] max-w-[756px]">
            <div className="bg-[#FFF6D5] max-w-[752px] ml-2 py-6 lg:pl-8 px-3">
              <div className="inline-flex">
                <img src={Warning} className="" />

                <div className="pl-4">
                  <p className="notify-head text-[#6C5400]">
                    Message Sent Successfully
                  </p>
                  <p className="notify-text mt-2">
                    Lorem ipsum dolor sit amet consectetur. Dolor pellentesque
                    diam amet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
