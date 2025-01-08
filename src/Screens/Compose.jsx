import React, { useState, useEffect } from "react";
import SideBar from "../Components/SideBar";
import Logo from "../assets/svg/logo2.svg";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import todayDate from "../Utils/todayDate";
import axios from "axios";
import auth from "../Utils/auth";
import WaterMark from "../Components/WaterMark";
import Recipient from "../Lib/Recipient";
import debounce from "lodash/debounce";
import Signature from "../Lib/Signature";
import Back from "../assets/svg/icons/back.svg";

const Compose = () => {
  auth();

  const [preview, showPreview] = useState(false);

  // State to control modal visibility
  const [isOpen, setIsOpen] = useState(false);

  // Function to close the modal
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  // State to control modal visibility
  const [isSignature, setIsSignature] = useState(false);

  // Function to close the modal
  const closeSignature = () => setIsSignature(false);
  const openSignature = () => setIsSignature(true);

  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loadingDraft, setLoadingDraft] = useState(false);
  const [loadingMemo, setLoadingMemo] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [signature, setSignature] = useState(false);
  const [signing, setSigning] = useState(false);
  const [err, setErr] = useState("");

  const date = todayDate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const sign_data = `
  <div class="mt-[30px] font-medium ">
  <p class="mb-[10px] underline"> Signature </p>
    <img src="${user.staff_signature}" alt="Staff_signature" class="h-20 object-contain" />
  </div>`;

  const handleCreate = async (choice) => {
    // console.log(choice);
    if (subject === "") {
      setError("Subject can't be empty");
      return;
    } else if (message === "") {
      setError("Message can't be empty");
      return;
    } else if (recipient === "") {
      setError("Recipient can't be empty");
      return;
    } else if (signature === false) {
      setError("Please sign the document");
      return;
    } else {
      choice === "send-memo" ? setLoadingMemo(true) : setLoadingDraft(true);
    }

    let memo_content;
    if (signature) {
      memo_content = message + sign_data;
    } else {
      memo_content = message;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/memo/${choice}`,
        {
          recipient_email: recipient,
          memo_subject: subject,
          memo_content: memo_content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response);
      // console.log(response.status);
      const id = response.data.memo.id;
      if (response.status === 201) {
        window.location.href = `/message/${id}`;
      } else {
        setLoadingDraft(false);
        setLoadingMemo(false);
        setError(response.message);
      }
    } catch (err) {
      // console.log(err);
      const errorMessage = err.response.data.message; // Adjust this based on the actual structure of your error response
      if (errorMessage.includes("Recipient user or position not found")) {
        setError(
          "Recipient or position not found. Please check the entered details."
        );
      } else {
        setError("An error occurred while sending the memo. Please try again.");
      }
      setLoadingDraft(false);
      setLoadingMemo(false);
    }
  };

  const handleOptionClick = (option) => {
    setRecipient(option.email);
    setShowDropdown(false);
  };

  const handleSignature = async () => {
    setSigning(true);
    try {
      const result = await Signature(user.email, password);
      // console.log(result);
      if (result === true) {
        setSigning(false);
        setSignature(true);
        closeSignature();
      } else {
        setSigning(false);
        setErr("Wrong Password");
      }
    } catch (error) {
      setErr("Network Error. Please try again");
    }
  };

  // console.log(signature);

  const fetchOptions = async () => {
    setLoading(true);
    const fetchedOptions = await Recipient();
    setOptions(fetchedOptions);
    setLoading(false);
  };

  // Debounce the input to limit API calls
  const debouncedFetchOptions = debounce(() => {
    fetchOptions();
  }, 500);

  useEffect(() => {
    if (showDropdown) {
      debouncedFetchOptions();
    }
    // Cleanup on unmount
    return () => debouncedFetchOptions.cancel();
  }, [showDropdown]);

  return (
    <div className="lg:grid grid-cols-12 ">
      <SideBar />
      {!preview ? (
        <div className="col-span-9 bg-[url('../assets/svg/bg.svg')] lg:p-10 p-5 relative overflow-hidden">
          <WaterMark />
          <div className="flex lg:flex-row flex-col justify-between">
            <p className="page-head">Compose Memo</p>
            <p className="go-back">
              Dashboard / <span className="text-secondary">Form layout</span>
            </p>
          </div>
          <div className="bg-primary rounded-[10px] mt-10 shadow-custom-shadow z-5 px-5 lg:px-0">
            <p className="pt-5 lg:pl-9 text-lg font-medium">COMPOSE NEW MEMO</p>
            <hr className="mt-4 border-t-1 border-[#00000030]" />
            <div className="lg:px-14 pt-5 pb-16 space-y-7">
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
                    value={user.position_name}
                    readOnly
                    disabled
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
                <div className="relative mt-4">
                  <input
                    value={recipient}
                    readOnly
                    onClick={() => setShowDropdown(true)}
                    type="text"
                    placeholder="Choose Recipient MDA, Department or Office"
                    className="block w-full rounded-[7px] border-0 py-5 px-10 text-gray-900 ring-1 ring-tertiary placeholder:text-grey focus:ring-0 focus:ring-0 focus:ring-secondary"
                  />
                  {showDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-tertiary rounded-md shadow-lg">
                      {loading ? (
                        <div className="my-5 flex justify-center">
                          <div className="loader-two "></div>
                        </div>
                      ) : (
                        options?.map((option, index) => (
                          <div
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            {option.fullname} ({option.position_name})
                          </div>
                        ))
                      )}
                    </div>
                  )}
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
              {signature ? (
                <div className="text-center col-span-2 justify-center flex items-center w-full bg-secondary p-5 rounded-[7px] text-white  ring-btn item-center ">
                  Signed
                </div>
              ) : (
                <button
                  onClick={openSignature}
                  className="text-center col-span-2 justify-center flex items-center w-full bg-secondary p-5 rounded-[7px] text-white hover:bg-primary hover:ring-2 hover:text-btn ring-btn item-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102"
                >
                  Add Signature
                </button>
              )}

              {error && <p className="text-red-500 mt-5 -mb-5">{error}</p>}
              <div className="lg:grid grid-cols-2 gap-2 pt-10 space-y-3 lg:space-y-0">
                <button
                  className="text-center justify-center flex items-center w-full bg-[#FDAD00] p-7 rounded-[7px] text-white hover:bg-primary ring-1 hover:ring-2 hover:text-[#FDAD00] ring-[#FDAD00] item-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102"
                  onClick={() => showPreview(true)}
                >
                  Preview Memo
                </button>
                {loadingDraft ? (
                  <button className="text-center justify-center flex items-center w-full bg-transaprent p-7 rounded-[7px] hover:text-white hover:bg-secondary ring-1 text-secondary ring-secondary item-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102">
                    <div className="loader"></div>
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      setLoadingDraft(true);
                      await handleCreate("save-draft");
                      setLoadingDraft(false);
                    }}
                    className="text-center justify-center flex items-center w-full bg-transaprent p-7 rounded-[7px] hover:text-white hover:bg-secondary ring-1 text-secondary ring-secondary item-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102"
                  >
                    Save to Drafts
                  </button>
                )}

                {loadingMemo ? (
                  <button className="text-center col-span-2 justify-center flex items-center w-full bg-secondary p-7 rounded-[7px] text-white hover:bg-primary ring-1 hover:ring-2 hover:text-btn ring-btn item-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102">
                    <div className="loader"></div>
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      setLoadingMemo(true);
                      await handleCreate("send-memo");
                      setLoadingMemo(false);
                    }}
                    className="text-center col-span-2 justify-center flex items-center w-full bg-secondary p-7 rounded-[7px] text-white hover:bg-primary ring-1 hover:ring-2 hover:text-btn ring-btn item-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-102"
                  >
                    Send Memo
                  </button>
                )}
              </div>
            </div>
          </div>
          {isSignature && (
            <div
              id="popup-modal"
              className="flex overflow-y-auto overflow-x-hidden fixed bg-black bg-opacity-50 backdrop-blur-sm top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full"
            >
              <div className="relative p-4 w-full max-w-[500px] max-h-full">
                <div className="relative bg-white rounded-lg shadow ">
                  <button
                    onClick={closeSignature}
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
                  <div className="py-10 px-5 lg:px-14 text-center">
                    <h3 className="mb-5 font-semibold font-normal text-left text-black text-2xl">
                      Confirm Password
                    </h3>
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="block w-full rounded-[7px] border-0 py-2.5 px-10 text-gray-900 ring-1 ring-secondary placeholder:text-grey focus:ring-0 focus:ring-0 focus:ring-secondary"
                    />
                    <p className="text-left mt-3 text-red-500">{err}</p>
                    <div className="inline-flex gap-2 mt-8 flex w-full justify-center flex items-center">
                      <button
                        onClick={closeSignature}
                        className="text-secondary bg-transparent hover:bg-secondary focus:ring-1 ring-1 ring-secondary hover:bg-secondary hover:text-white focus:outline-none font-medium rounded-lg text-2xl px-5 py-2.5 flex justify-center items-center flex-1"
                      >
                        Go back
                      </button>
                      {signing ? (
                        <button className="text-white bg-secondary hover:bg-transparent hover:text-secondary ring-secondary ring-1 focus:outline-none font-medium rounded-lg text-2xl px-5 py-2.5 flex justify-center items-center flex-1">
                          <div className="loader"></div>
                        </button>
                      ) : (
                        <button
                          onClick={handleSignature}
                          className="text-white bg-secondary hover:bg-transparent hover:text-secondary ring-secondary ring-1 focus:outline-none font-medium rounded-lg text-2xl px-5 py-2.5 flex justify-center items-center flex-1"
                        >
                          Confirm
                        </button>
                      )}
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
      {preview ? (
        <div className="col-span-9 bg-[url('../assets/svg/bg.svg')] lg:p-10 p-5 relative overflow-hidden">
          <WaterMark />

          <div className="flex lg:flex-row flex-col justify-between">
            <div className="inline-flex">
              <div className="w-12 h-12 bg-[#CFFFEF] rounded-lg items-center justify-center flex cursor-pointer">
                <img
                  src={Back}
                  className="h-4"
                  alt="Go Back"
                  onClick={() => {
                    showPreview(false);
                  }}
                />
              </div>
              <p className="page-head ml-4">Preview Memo</p>
            </div>
            <p className="go-back">
              Dashboard / <span className="text-secondary">Form layout</span>
            </p>
          </div>
          <div className="bg-primary shadow-custom-sm rounded-[10px] mt-10">
            <div className="bg-white lg:mr-6 lg:p-20 p-5">
              <div className="bg-primary shadow-custom-shadow pt-7 lg:px-12 px-5 pb-16 rounded-lg">
                <img src={Logo} className="flex m-auto w-16 h-16" />
                <p className="text-secondary text-base text-center font-bold mt-4 uppercase">
                  {user.mda_name}
                </p>
                <p className="text-secondary text-center font-normal text-base">
                  INTERNAL MEMO
                </p>
                <div className="mt-11">
                  <p className="preview-details">To: {recipient}</p>
                  <p className="preview-details">From: {user.name} </p>
                  <p className="preview-details">Date: {date}</p>
                  <p className="preview-details">Subject: {subject}</p>
                </div>
                <hr className="mt-4 border-t-1 border-[#000000]" />
                <div className="mt-11">
                  <p
                    className="preview-text"
                    dangerouslySetInnerHTML={{ __html: message + sign_data }}
                  ></p>
                </div>
                <div className="mt-7">
                  <p className="preview-foot">
                    {user.name} | {user.position_name}
                  </p>
                  <p className="preview-foot">{user.mda_name}</p>
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
                      {loadingMemo ? (
                        <button className="text-white bg-secondary hover:bg-[#FDAD30] focus:ring-4 focus:outline-none font-semibold rounded-lg text-2xl px-5 py-2.5 flex justify-center items-center flex-1">
                          <div className="loader"></div>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            handleCreate("send-memo");
                          }}
                          className="text-white bg-secondary hover:bg-[#FDAD30] focus:ring-4 focus:outline-none font-semibold rounded-lg text-2xl px-5 py-2.5 flex justify-center items-center flex-1"
                        >
                          Send
                        </button>
                      )}
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
