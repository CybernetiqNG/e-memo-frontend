import React, { useState } from "react";
import SideBar from "../Components/SideBar";
import Logo from "../assets/svg/logo2.svg";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import todayDate from "../Utils/todayDate";
import axios from "axios";
import auth from "../Utils/auth";

const Compose = () => {
  auth();
  const [preview, showPreview] = useState(false);

  // State to control modal visibility
  const [isOpen, setIsOpen] = useState(false);

  // Function to close the modal
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const date = todayDate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleCreate = async () => {
    if (subject === "") {
      setError("Subject can't be empty");
      return;
    } else if (message === "") {
      setError("Message can't be empty");
      return;
    } else if (recipient === "") {
      setError("Recipient can't be empty");
    }
    setLoading(true);

    try {
      const response = await axios.post(
        `${baseUrl}/memo/send-memo`,
        {
          recipient_email: recipient,
          memo_subject: subject,
          memo_content: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      console.log(response.status);
      const id = response.data.memo.id;
      if (response.status === 201) {
        window.location.href = `/message/${id}`;
      } else {
        setLoading(false);
        setError(response.message);
      }
    } catch (err) {
      console.log(err);
      const errorMessage = err.response.data.message; // Adjust this based on the actual structure of your error response
      if (errorMessage.includes("Recipient user or position not found")) {
        setError(
          "Recipient or position not found. Please check the entered details."
        );
      } else {
        setError("An error occurred while sending the memo. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-12 bgscreen">
      <SideBar />
      {!preview ? (
        <div className="col-span-9 bg-[url('../assets/svg/bg.svg')] p-10">
          <div className="flex justify-between">
            <p className="page-head">Compose Memo</p>
            <p className="go-back">
              Dashboard / <span className="text-secondary">Form layout</span>
            </p>
          </div>
          <div className="bg-primary rounded-[10px] mt-10 shadow-custom-shadow">
            <p className="pt-5 pl-9 text-lg font-medium">COMPOSE NEW MEMO</p>
            <hr className="mt-4 border-t-1 border-[#00000030]" />
            <div className="px-14 pt-5 pb-16 space-y-7">
              <div className="">
                <label
                  htmlFor="price"
                  className="block font-normal text-sm text-gray-900"
                >
                  From
                </label>
                <div className="relative mt-4 ">
                  <input
                    type="text"
                    placeholder="Enter your MDA, Department or Office"
                    className="block w-full rounded-[7px] border-0 py-5 px-10 text-gray-900 ring-1 ring-tertiary placeholder:text-grey focus:ring-0 focus:ring-0 focus:ring-secondary"
                  />
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="price"
                  className="block font-normal text-sm text-gray-900"
                >
                  To
                </label>
                <div className="relative mt-4 ">
                  <input
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    type="text"
                    placeholder="Enter Recipient MDA, Department or Office"
                    className="block w-full rounded-[7px] border-0 py-5 px-10 text-gray-900 ring-1 ring-tertiary placeholder:text-grey focus:ring-0 focus:ring-0 focus:ring-secondary"
                  />
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="price"
                  className="block font-normal text-sm text-gray-900"
                >
                  Subject
                </label>
                <div className="relative mt-4 ">
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    type="text"
                    placeholder="Pillars of bios Administartion"
                    className="block w-full rounded-[7px] border-0 py-5 px-10 text-gray-900 ring-1 ring-tertiary placeholder:text-grey focus:ring-0 focus:ring-0 focus:ring-secondary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 ">
                <div className="">
                  <label
                    htmlFor="price"
                    className="block font-normal text-sm text-gray-900"
                  >
                    Reference No
                  </label>
                  <div className="relative mt-4 ">
                    <input
                      type="text"
                      placeholder="Enter reference number"
                      className="block w-full rounded-[7px] border-0 py-5 px-10 text-gray-900 ring-1 ring-tertiary placeholder:text-grey focus:ring-0 focus:ring-0 focus:ring-secondary"
                    />
                  </div>
                </div>
                <div className="">
                  <label
                    htmlFor="price"
                    className="block font-normal text-sm text-gray-900"
                  >
                    Add Signature
                  </label>
                  <div className="relative mt-4 ">
                    <input
                      type="text"
                      placeholder="Signature"
                      className="block w-full rounded-[7px] border-0 py-5 px-10 text-gray-900 ring-1 ring-tertiary placeholder:text-grey focus:ring-0 focus:ring-0 focus:ring-secondary"
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="price"
                  className="block font-normal text-sm text-gray-900"
                >
                  Message
                </label>
                <div className="relative mt-4 h-80 mb-20">
                  <ReactQuill
                    theme="snow"
                    value={message}
                    onChange={setMessage}
                    type="text"
                    placeholder="Enter Message"
                    className="block w-full rounded-[7px] border-0 text-gray-900 placeholder:text-grey h-full"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 mt-5 -mb-5">{error}</p>}
              <div className="grid grid-cols-2 gap-2">
                <button
                  className="py-5 bg-[#FDAD00] text-white rounded-[7px]"
                  onClick={() => showPreview(true)}
                >
                  Preview Memo
                </button>
                <button
                  onClick={handleCreate}
                  className="text-center justify-center flex items-center w-full bg-secondary p-7 rounded-[7px] text-white hover:bg-primary hover:ring-2 hover:text-btn ring-btn item-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
                >
                  {loading ? <div className="loader"></div> : "Create Memo"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {preview ? (
        <div className="col-span-9 bg-[url('../assets/svg/bg.svg')] p-10">
          <div className="flex justify-between">
            <p className="page-head">Preview Memo</p>
            <p className="go-back">
              Dashboard / <span className="text-secondary">Form layout</span>
            </p>
          </div>
          <div className="bg-primary shadow-custom-sm rounded-[10px] mt-10">
            <div className="bg-white mr-6 p-20">
              <div className="bg-primary shadow-custom-shadow pt-7 px-12 pb-16 rounded-lg">
                <img src={Logo} className="flex m-auto w-16 h-16" />
                <p className="text-secondary text-base text-center font-bold mt-4">
                  OFFICE OF THE GOVERNOR
                </p>
                <p className="text-secondary text-center font-normal text-base">
                  INTERNAL MEMO
                </p>
                <div className="mt-11">
                  <p className="preview-details">To: {recipient}</p>
                  <p className="preview-details">From: {user.name} </p>
                  <p className="preview-details">Ref:</p>
                  <p className="preview-details">Date: {date}</p>
                  <p className="preview-details">Subject: {subject}</p>
                </div>
                <hr className="mt-4 border-t-1 border-[#000000]" />
                <div className="mt-11">
                  <p
                    className="preview-text"
                    dangerouslySetInnerHTML={{ __html: message }}
                  ></p>
                </div>
                <div className="mt-7">
                  <p className="preview-foot">
                    {user.name} | {user.position_name}
                  </p>
                  <p className="preview-foot">
                    {user.email} | {user.phone_number}
                  </p>
                </div>
              </div>
              <div className="justify-end flex mt-7 gap-4">
                <button
                  className="bg-[#909090] py-4 w-40 text-white rounded-md"
                  onClick={() => showPreview(false)}
                >
                  Edit Memo
                </button>
                <button
                  onClick={openModal}
                  className="bg-secondary py-4 w-40 text-white rounded-md"
                  data-modal-target="popup-modal"
                  data-modal-toggle="popup-modal"
                >
                  Send Memo
                </button>
              </div>
            </div>
          </div>
          {/* Modal Structure */}
          {isOpen && (
            <div
              id="popup-modal"
              className="flex overflow-y-auto overflow-x-hidden fixed bg-black bg-opacity-50 backdrop-blur-sm top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full"
            >
              <div className="relative p-4 w-full max-w-[500px] max-h-full">
                <div className="relative bg-white rounded-lg shadow ">
                  <button
                    onClick={closeModal}
                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>

                  {/* Modal Content */}
                  <div className="py-10 px-14 text-center">
                    <h3 className="mb-5 font-semibold font-normal text-left text-black text-2xl">
                      Are you sure you want to send the Memo?
                    </h3>

                    <div className="inline-flex gap-2 flex w-full justify-center flex items-center">
                      <button
                        onClick={closeModal}
                        className="text-white bg-[#FDBD00] hover:bg-[#FDAD30] focus:ring-4 focus:outline-none font-semibold rounded-lg text-2xl px-5 py-2.5 flex justify-center items-center flex-1"
                      >
                        Not Yet
                      </button>

                      <button
                        onClick={handleCreate}
                        className="text-white bg-secondary hover:bg-[#FDAD30] focus:ring-4 focus:outline-none font-semibold rounded-lg text-2xl px-5 py-2.5 flex justify-center items-center flex-1"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Compose;
