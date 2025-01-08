import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import SideBar from "../../Components/SideBar";
import EmailIcon from "../../assets/svg/email.svg";
import ApprovedIcon from "../../assets/svg/icons/approved.svg";
import ArchiveIcon from "../../assets/svg/icons/archive2.svg";
import DraftIcon from "../../assets/svg/icons/draft.svg";
import InboxIcon from "../../assets/svg/icons/Inbox.svg";
import SentIcon from "../../assets/svg/icons/sent.svg";
import FavouriteIcon from "../../assets/svg/icons/favourite.svg";
import PendingIcon from "../../assets/svg/icons/pending.svg";
import RejectedIcon from "../../assets/svg/icons/rejected.svg";
import { IoMailUnreadSharp } from "react-icons/io5";

// Import all components
import Inbox from "./Inbox";
import Unread from "./Unread";
import Drafts from "./Drafts";
import Approved from "./Approved";
import Rejected from "./Rejected";
import Pending from "./Pending";
import Favourite from "./Favourite";
import Archived from "./Archived";
import Sent from "./Sent";
import auth from "../../Utils/auth";
import WaterMark from "../../Components/WaterMark";
import MobileWarning from "../../Components/MobileWarning";

const Messages = () => {
  auth();
  const location = useLocation(); // Hook to access the location state
  const [activeItem, setActiveItem] = useState("Inbox"); // Set default active item

  useEffect(() => {
    if (location.state?.activeItem) {
      setActiveItem(location.state.activeItem);
    }
  }, [location.state]);

  const items = [
    { id: "Inbox", icon: InboxIcon, label: "Inbox" },
    { id: "Unread", icon: InboxIcon, label: "Unread" },
    { id: "Sent", icon: SentIcon, label: "Sent" },
    { id: "Draft", icon: DraftIcon, label: "Draft" },
    { id: "Approved", icon: ApprovedIcon, label: "Approved" },
    { id: "Rejected", icon: RejectedIcon, label: "Rejected" },
    { id: "Pending", icon: PendingIcon, label: "Pending" },
    { id: "Favourite", icon: FavouriteIcon, label: "Favourite" },
    { id: "Archived", icon: ArchiveIcon, label: "Archived" },
  ];

  const renderComponent = () => {
    switch (activeItem) {
      case "Inbox":
        return <Inbox />;
      case "Unread":
        return <Unread />;
      case "Draft":
        return <Drafts />;
      case "Approved":
        return <Approved />;
      case "Rejected":
        return <Rejected />;
      case "Pending":
        return <Pending />;
      case "Favourite":
        return <Favourite />;
      case "Archived":
        return <Archived />;
      case "Sent":
        return <Sent />;
      default:
        return <Inbox />;
    }
  };

  return (
    <div className="lg:grid grid-cols-12 ">
      <MobileWarning>
        <SideBar />
        <div className="col-span-9 bg-[url('../assets/svg/bg.svg')] lg:p-10 p-5 overflow-hidden relative">
          <WaterMark />
          <div className="flex lg:flex-row flex-col justify-between">
            <p className="page-head">Messages</p>
            <p className="go-back">
              Dashboard / <span className="text-secondary">{activeItem}</span>
            </p>
          </div>

          <div className="bg-primary shadow-custom-shadow rounded-lg mt-10 flex relative overflow-hidden">
            <WaterMark />

            <div className="w-fit border-r-[1px] p-5 pb-16 border-[#000000]">
              <div className="bg-secondary rounded py-3 px-4 inline-flex items-center">
                <img src={EmailIcon} className="w-5 h-5" alt="Compose icon" />
                <a href="/compose">
                  <p className="text-white ml-2 text-xl font-normal">Compose</p>
                </a>
              </div>
              <div className="mt-10 space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-l-md cursor-pointer ${
                      activeItem === item.id ? "bg-btn" : "bg-primary"
                    }`}
                    onClick={() => setActiveItem(item.id)}
                  >
                    <div
                      className={`rounded-l-md py-3 px-5 ml-2 inline-flex items-center w-full ${
                        activeItem === item.id ? "bg-white" : "bg-primary"
                      }`}
                    >
                      {item.label === "Unread" ? (
                        <IoMailUnreadSharp className="w-5 h-5" />
                      ) : (
                        <img
                          src={item.icon}
                          className="w-5 h-5"
                          alt={`${item.label} icon`}
                        />
                      )}

                      <p className="ml-4 text-xl text-black">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full">{renderComponent()}</div>
          </div>
        </div>
      </MobileWarning>
    </div>
  );
};

export default Messages;
