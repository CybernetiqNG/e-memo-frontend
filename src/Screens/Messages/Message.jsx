import React, { useState, useEffect, useRef } from "react";
import SideBar from "../../Components/SideBar";
import Logo from "../../assets/svg/logo2.svg";
import Back from "../../assets/svg/icons/back.svg";
import ApproveIcon from "../../assets/svg/approved.svg";
import DispproveIcon from "../../assets/svg/disapproved.svg";
import { useParams } from "react-router-dom";
import singleMemo from "../../Lib/SingleMemo";
import formatDate from "../../Utils/formatDate";
import auth from "../../Utils/auth";
import WaterMark from "../../Components/WaterMark";
import { useNavigate } from "react-router-dom";
import { HiPaperAirplane } from "react-icons/hi2";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import axios from "axios";
import debounce from "lodash/debounce";
import budget from "../../Lib/Budget";
import BudgetBar from "../../Components/BudgetBar";
import Recipient from "../../Lib/Recipient";
import Approve from "../../Lib/Approve";

const Message = () => {
  auth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [memo, setMemo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minutes, setMinutes] = useState([]);
  const [comment, setComment] = useState();
  const [sending, setSending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinute, setIsMinute] = useState(false);
  const [minuting, setMinuting] = useState(false);
  const [isBudget, setIsBudget] = useState(false);
  const [isForward, setIsForward] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [options, setOptions] = useState([]);
  const [recipient, setRecipient] = useState([]);
  const [note, setNote] = useState("");
  const [isApprove, setIsApprove] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [minuteSent, setMinuteSent] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMinute = () => setIsMinute(false);
  const openMinute = () => setIsMinute(true);
  const closeBudget = () => setIsBudget(false);
  const openBudget = () => setIsBudget(true);
  const closeForward = () => setIsForward(false);
  const openForward = () => setIsForward(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedMemo = await singleMemo(id);

        if (fetchedMemo) {
          setMemo(fetchedMemo);
          console.log(fetchedMemo);
          setMinutes(fetchedMemo.minutes);

          const mda = fetchedMemo.sender_mda_id;

          const getBudget = await budget(mda);
          setBudgets(getBudget);
          // console.log("Budgets:", getBudget);
        } else {
          navigate("/error");
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const token = localStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  //Handle Sending Minute
  const handleCreate = async () => {
    setSending(true);
    if (comment === "") {
      setError("Minute cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/memo/forward-memo/2`,
        {
          recipient_emails: [memo.sender_email],
          memo_subject: memo.memo_subject,
          minute: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response);
      // console.log(response.status);

      if (response.status === 201) {
        // console.log("Tghissss");
        setSending(false);
        setMinuting(false);
        setMinuteSent(true);
      } else {
        setSending(false);
        setError(response.message);
      }
    } catch (err) {
      setSending(false);
      // console.log(err);
      // const errorMessage = err.response.data.message;
      // if (errorMessage.includes("Recipient user or position not found")) {
      //   setError(
      //     "Recipient or position not found. Please check the entered details."
      //   );
      // } else {
      //   setError("An error occurred while sending the memo. Please try again.");
      // }
      setSending(false);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user.name);
  let governor;
  if (user.role === "governor") {
    governor = true;
  }

  const handleOptionClick = (option) => {
    // Check if the option is already selected
    if (!recipient.includes(option)) {
      // Add new recipient to the array
      setRecipient([...recipient, option]);
    }
    setShowDropdown(false);
  };

  // Function to remove a recipient
  const removeRecipient = (index) => {
    const updatedRecipients = recipient.filter((_, i) => i !== index);
    setRecipient(updatedRecipients);
  };

  useEffect(() => {
    const FetchDropdown = async () => {
      const fetchedOptions = await Recipient();
      setOptions(fetchedOptions);
    };
    FetchDropdown();
  }, []);

  // console.log("Recipient Emails:", recipient);

  //Forward Memo Function
  const handleForward = async () => {
    setSending(true);
    // console.log("Recipient Emails:", recipient);
    const recipients = recipient.map((rec) => rec.email);
    try {
      const response = await axios.post(
        `${baseUrl}/memo/forward-memo/2`,
        {
          recipient_emails: recipients,
          memo_subject: memo.memo_subject,
          minute: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComment("");
      // console.log(response);
      // console.log(response.status);
      // const id = response.data.memo.id;
      // console.log(id, "dcejhcej");
      if (response.status === 201) {
        // console.log("got here");
        window.location.href = `/message/${id}`;
        setNote("Forwarded Succressfully");
      } else {
        setSending(false);
        setError(response.message);
      }
    } catch (err) {
      setSending(false);
      // console.log(err);
      const errorMessage = err.response;
      if (errorMessage.includes("Recipient user or position not found")) {
        setError(
          "Recipient or position not found. Please check the entered details."
        );
      } else {
        setError("An error occurred while sending the memo. Please try again.");
      }
      setSending(false);
    }
  };

  const approveMemo = async (approve) => {
    // console.log(id);
    await Approve(approve, id);
  };

  const handleConfirm = async () => {
    setConfirming(true);
    let choice;
    isApprove ? (choice = 1) : (choice = -1);
    const response = await approveMemo(choice);
    setConfirming(false);
    setIsConfirm(false);
    setConfirmed(true);
    // console.log(response);
  };

  return (
    <div className="lg:grid grid-cols-12 ">
      <SideBar />
      <div className="col-span-9 bg-[url('../assets/svg/bg.svg')] lg:p-10 p-5 text-clip overflow-hidden relative">
        <WaterMark />

        <div className="flex lg:flex-row flex-col justify-between">
          <div className="inline-flex">
            <div className="w-12 h-12 bg-[#CFFFEF] rounded-lg items-center justify-center flex cursor-pointer">
              <img
                src={Back}
                className="h-4"
                alt="Go Back"
                onClick={() => {
                  navigate(-1);
                }}
              />
            </div>
            <p className="page-head ml-4">Message</p>
          </div>

          <p className="go-back">
            Dashboard / <span className="text-secondary">View memo</span>
          </p>
        </div>

        <div className="relative bg-primary shadow-custom-shadow pt-7 lg:px-20 px-5 pb-16 rounded-lg mt-10 min-h-[450px] overflow-hidden">
          <WaterMark />
          <img src={Logo} className="flex m-auto w-16 h-16" />
          <p className="text-secondary text-base text-center font-bold mt-4 uppercase">
            {memo.sender_mda_name}
          </p>
          <p className="text-secondary text-center font-normal text-base">
            INTERNAL MEMO
          </p>
          {loading ? (
            <div className="my-5 flex justify-center items-center">
              <div className="loader-two "></div>
            </div>
          ) : (
            <>
              <div className="mt-11">
                <p className="preview-details">To: {memo.recipient_position}</p>
                <p className="preview-details">From: {memo.sender_position}</p>
                <p className="preview-details">Ref: {memo.ref_no}</p>
                <p className="preview-details">
                  Date: {formatDate(memo.date_sent)}
                </p>
                <p className="preview-details">Subject: {memo.memo_subject}</p>
              </div>

              <hr className="mt-4 border-t-1 border-[#000000]" />
              <div className="mt-11">
                <p
                  className="preview-text"
                  dangerouslySetInnerHTML={{ __html: memo.memo_content }}
                ></p>
              </div>
              <div className="mt-7">
                <p className="preview-foot">
                  {memo.sender_name} | {memo.sender_position}
                </p>
                <p className="preview-foot">{memo.sender_mda_name}</p>
              </div>
              {minutes && Object.keys(minutes).length > 0 ? (
                <>
                  <hr className="mt-10 border-t-1 border-[#000000]" />
                  <p className="text-secondary text-base text-left font-bold mt-4">
                    MINUTES
                  </p>
                </>
              ) : null}

              {minutes.length > 0 ? (
                minutes.map((memomin) => (
                  <div>
                    <hr className="mt-4 border-t-1 border-[#000000]" />
                    <p className="preview-details mt-5">
                      Munite by: {memomin.sender_position} |{" "}
                      {formatDate(memomin.date_forwarded)}
                    </p>
                    <p className="preview-details">Minute: {memomin.minute}</p>
                  </div>
                ))
              ) : (
                <></>
              )}
            </>
          )}
        </div>
        {memo.recipient_name != user.name && (
          <div className="lg:justify-items-end lg:flex lg:flex-row-reverse lg:gap-3 mt-7 w-full">
            <div className="flex gap-3 w-full lg:w-96 lg:flex-row">
              <button
                className="bg-[#FF0000] py-4 w-1/2 lg:w-80 text-white rounded-md"
                onClick={() => {
                  setIsApprove(false);
                  setIsConfirm(true);
                }}
              >
                Disapprove
              </button>
              <div className="relative lg:w-full w-1/2">
                <button
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  className="bg-[#74978B] py-4 w-full lg:w-40 text-white rounded-md flex items-center justify-center"
                >
                  More
                  <div>
                    {isOpen ? (
                      <FaAngleUp className="ml-7" />
                    ) : (
                      <FaAngleDown className="ml-7" />
                    )}
                  </div>
                </button>
                {isOpen && (
                  <>
                    {governor ? (
                      <div className="absolute -top-[136px] w-full flex-col gap-3">
                        <button
                          className="bg-[#909090] py-4 w-full mb-3 lg:w-40 text-white rounded-md"
                          onClick={() => {
                            openBudget(), setIsOpen(!isOpen);
                          }}
                        >
                          View Budget
                        </button>
                        <button
                          className="bg-[#909090] py-4 w-full mb-3 lg:w-40 text-white rounded-md"
                          onClick={() => {
                            openForward(), setIsOpen(!isOpen);
                          }}
                        >
                          Forward
                        </button>
                      </div>
                    ) : (
                      <div className="absolute -top-[68px] w-full flex-col gap-3">
                        <button
                          className="bg-[#909090] py-4 w-full mb-3 lg:w-40 text-white rounded-md"
                          onClick={() => {
                            openForward(), setIsOpen(!isOpen);
                          }}
                        >
                          Forward
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-3 w-full lg:w-auto lg:flex-row mt-3 lg:mt-0">
              <button
                className="bg-secondary py-4 w-1/2 lg:w-40 text-white rounded-md"
                onClick={() => {
                  setIsApprove(true);
                  setIsConfirm(true);
                }}
              >
                Approve
              </button>

              <button
                className="bg-[#FFC700] py-4 w-1/2 lg:w-40 text-white rounded-md "
                onClick={() => {
                  openMinute(), setIsOpen(!isOpen);
                }}
              >
                Minute
              </button>
            </div>
          </div>
        )}

        {isMinute && (
          <div
            id="popup-modal"
            className="flex overflow-y-auto overflow-x-hidden fixed bg-black bg-opacity-50 backdrop-blur-sm top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full"
          >
            <div className="relative p-4 w-full lg:max-w-[1000px] max-w-[500px] max-h-full">
              <div className="relative bg-white rounded-lg shadow ">
                <button
                  onClick={closeMinute}
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
                <div className="py-10 lg:px-14 px-5 text-center">
                  <h3 className="mb-5 font-semibold font-normal text-left text-black text-2xl">
                    Minute
                  </h3>

                  <div className="inline-flex gap-2 flex w-full justify-center flex items-center">
                    {minuting ? (
                      <div className="lg:mt-10 mt-5 w-full items-end">
                        <div className="bg-transparent ring-2 ring-secondary rounded-3xl py-5 px-5 mr-3 w-full h-40">
                          <p className="text-left">{comment}</p>
                        </div>

                        <div className="grid grid-cols-10 gap-5 mt-10 text-[18px]">
                          <button
                            className="col-span-4 py-6 w-full text-red-500 rounded-md"
                            onClick={() => setMinuting(false)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-secondary col-span-6 py-6 w-full text-white rounded-[15.25px]"
                            onClick={handleCreate}
                          >
                            Confirm
                          </button>
                        </div>
                        {note}
                      </div>
                    ) : minuteSent ? (
                      <div className="flex flex-col">
                        <img
                          src={ApproveIcon}
                          alt="approveIcon"
                          className="m-auto"
                        />

                        <p className="mt-10 font-semibold text-3xl px-10">
                          Sent Successfully!
                        </p>
                      </div>
                    ) : (
                      <div className="lg:mt-10 mt-5 w-full items-end">
                        <textarea
                          className="bg-transparent ring-2 ring-secondary rounded-3xl py-3 px-4 mr-3 focus:outline-none resize-none w-full"
                          placeholder="Type here..."
                          onChange={(e) => setComment(e.target.value)}
                          value={comment}
                          rows="5"
                        ></textarea>

                        <div className="col-span-2 w-full h-12 flex items-center justify-center rounded-3xl">
                          {sending ? (
                            <div className="col-span-2 bg-secondary w-full h-12 flex items-center justify-center rounded-lg">
                              <div className="lds-hourglass"></div>
                            </div>
                          ) : (
                            <div
                              className="col-span-2 bg-secondary w-full h-12 flex items-center justify-center rounded-3xl cursor-pointer"
                              onClick={() => setMinuting(true)}
                            >
                              <button className="text-white">Send</button>
                            </div>
                          )}
                        </div>
                        {note}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isBudget && (
          <div
            id="popup-modal"
            className="flex overflow-y-auto overflow-x-hidden fixed bg-black bg-opacity-50 backdrop-blur-sm top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full"
          >
            <div className="relative p-4 w-full lg:max-w-[1000px] max-w-[500px] max-h-full">
              <div className="relative bg-white rounded-lg shadow ">
                <button
                  onClick={closeBudget}
                  className="absolute top-3 end-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                <div className="text-center ">
                  <div className="py-10 bg-secondary">
                    <p className="text-3xl font-semibold font-normal text-left text-black text-white text-center lg:px-40 p-5 uppercase">
                      {budgets[0].mda_name}
                    </p>
                  </div>
                  <div className="overflow-y-auto max-h-[60vh]">
                    {budgets.map((data) => (
                      <div className="gap-2 w-full justify-center items-center p-7 ">
                        <div className="lg:grid grid-cols-2 gap-5 w-full">
                          <div className="bg-[#F7F6F6] flex text-left flex-col justify-center lg:pl-12 pl-5 rounded-[15px] py-4 lg:py-0">
                            <p className="text-2xl font-normal">Total Budget</p>
                            <p className="font-bold text-4xl">
                              {data.total_budget}
                            </p>
                          </div>
                          <div className="bg-primary flex-col justify-center text-left lg:pl-12 pl-5 pr-5 py-5 rounded-[15px] mt-4 lg:mt-0">
                            <p className="text-2xl font-normal text-[#484848]">
                              Spent Budget
                            </p>
                            <p className="font-medium text-2xl mt-3">
                              {data.total_budget - data.budget_balance} /{" "}
                              {data.total_budget}
                            </p>
                            <BudgetBar
                              total={data.total_budget}
                              // spent="2000000"
                              spent={data.total_budget - data.budget_balance}
                            />
                          </div>
                        </div>
                        <div className="mt-5 text-left">
                          <div className="lg:justify-between lg:flex">
                            <div>
                              <p className="uppercase font-bold text-secondary text-2xl">
                                description
                              </p>
                              <p className="text-2xl font-light">
                                {data.project_description}
                              </p>
                            </div>
                            <div className="lg:text-right lg:mt-0 mt-5">
                              <p className="uppercase font-bold text-secondary text-2xl ">
                                Budget code
                              </p>
                              <p className="text-2xl font-light">
                                {data.ipsas_code}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isForward && (
          <div
            id="popup-modal"
            className="flex overflow-y-auto overflow-x-hidden fixed bg-black bg-opacity-50 backdrop-blur-sm top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full"
          >
            <div className="relative p-4 w-full lg:max-w-[1000px] max-w-[500px] max-h-full">
              <div className="relative bg-white rounded-lg shadow ">
                <button
                  onClick={closeForward}
                  className="absolute top-8 end-2.5 text-secondary bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg font-bold w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                <div className="py-10 lg:px-14 px-5 text-center">
                  <h3 className="mb-5 font-semibold font-normal text-left text-black text-2xl">
                    Forward
                  </h3>
                  <div className="">
                    <div className="relative mt-4">
                      <input
                        value={recipient.map((r) => r.fullname).join(", ")} // Display selected recipients
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
                            options.map((option, index) => (
                              <div
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                              >
                                {option.fullname} ({option.position_name})
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>

                    {/* Display selected recipients with the option to remove */}
                    <div className="flex flex-wrap mt-2">
                      {recipient.map((rec, index) => (
                        <div
                          key={index}
                          className="bg-gray-200 px-3 py-1 rounded-full flex items-center mr-2 mb-2"
                        >
                          <span>
                            {rec.fullname} ({rec.position_name})
                          </span>
                          <button
                            onClick={() => removeRecipient(index)}
                            className="ml-2 text-red-500"
                          >
                            x
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="inline-flex gap-2 flex w-full justify-center flex items-center">
                      <div className="grid grid-cols-10 lg:mt-10 mt-5 w-full">
                        <textarea
                          className="bg-transparent text-secondary col-span-8 ring-2 ring-secondary rounded-3xl py-3 px-4 mb-3 mr-3 focus:outline-none rows-5 resize-none"
                          placeholder="Type here..."
                          onChange={(e) => setComment(e.target.value)}
                          value={comment}
                          rows="1"
                        ></textarea>
                        <div className="col-span-2 w-full h-12 flex items-center justify-center rounded-3xl">
                          {sending ? (
                            <div className="col-span-2 bg-secondary w-full h-12 flex cursor-pointer items-center justify-center rounded-3xl">
                              <div className="lds-hourglass"></div>
                            </div>
                          ) : (
                            <div className="col-span-2 bg-secondary w-full h-12 flex cursor-pointer items-center justify-center rounded-3xl">
                              <HiPaperAirplane
                                className="text-white text-3xl"
                                onClick={handleForward}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <p>{note}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isConfirm && (
          <div
            id="popup-modal"
            className="flex overflow-y-auto overflow-x-hidden fixed bg-black bg-opacity-50 backdrop-blur-sm top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full"
          >
            <div className="relative p-4 w-full lg:max-w-[500px] max-w-[500px] max-h-full">
              <div className="relative bg-white rounded-3xl shadow ">
                <button
                  onClick={() => setIsConfirm(false)}
                  className="absolute top-8 end-2.5 text-secondary bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg font-bold w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                <div className="py-7  px-7 text-center">
                  <div className="justify-center flex flex-col">
                    {isApprove ? (
                      <img
                        src={ApproveIcon}
                        alt="approveIcon"
                        className="m-auto"
                      />
                    ) : (
                      <img
                        src={DispproveIcon}
                        alt="approveIcon"
                        className="m-auto"
                      />
                    )}

                    <p className="mt-10 font-semibold text-3xl px-10">
                      {isApprove ? "Approve as recommended" : "Disapprove"}
                    </p>
                  </div>
                  <div className="grid grid-cols-10 gap-5 mt-10 text-[18px]">
                    <button
                      className=" col-span-4 py-6 w-full text-red-500 rounded-md"
                      onClick={() => {
                        setIsConfirm(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-secondary col-span-6 py-6 w-full  text-white rounded-[15.25px]"
                      onClick={handleConfirm}
                    >
                      {confirming ? (
                        <div className=" flex justify-center">
                          <div className="loader "></div>
                        </div>
                      ) : (
                        "Confirm"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {confirmed && (
          <div
            id="popup-modal"
            className="flex overflow-y-auto overflow-x-hidden fixed bg-black bg-opacity-50 backdrop-blur-sm top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full"
          >
            <div className="relative p-4 w-full lg:max-w-[500px] max-w-[500px] max-h-full">
              <div className="relative bg-white rounded-3xl shadow ">
                <button
                  onClick={() => setConfirmed(false)}
                  className="absolute top-8 end-2.5 text-secondary bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg font-bold w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                <div className="py-7  px-7 text-center">
                  <div className="justify-center flex flex-col">
                    {isApprove ? (
                      <img
                        src={ApproveIcon}
                        alt="approveIcon"
                        className="m-auto"
                      />
                    ) : (
                      <img
                        src={DispproveIcon}
                        alt="approveIcon"
                        className="m-auto"
                      />
                    )}

                    <p className="mt-10 font-semibold text-3xl px-10">
                      {isApprove ? "Approved as recommended!" : "Disapproved!"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
