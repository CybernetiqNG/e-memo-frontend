import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Reload from "../assets/svg/icons/reload.svg";
import MenuH from "../assets/svg/icons/menu.svg";
import Tune from "../assets/svg/icons/tune.svg";
import Search from "../assets/svg/icons/search.svg";
import Star from "../assets/svg/icons/star2.svg";
import Star2 from "../assets/svg/icons/favourite.svg";
import Archive from "../assets/svg/icons/archive2.svg";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { MdOutlineUnarchive } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import formatDate from "../Utils/formatDate";
import StarMemo from "../Lib/StarMemo";
import ArchiveMemo from "../Lib/ArchiveMemo";
import axios from "axios";
import Unviewed from "../Lib/ViewedMemo";

const MemoList = ({ fetchMemos, pageTitle, starred }) => {
  const [memos, setMemos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMemos, setFilteredMemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [options, setOptions] = useState(false);
  const [selectedMemos, setSelectedMemos] = useState([]);
  const [page, setPage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const fetchedMemos = await fetchMemos();
      if (fetchedMemos) {
        setLoading(false);
        await setMemos(fetchedMemos);
      }
      console.log(fetchedMemos);
      const unviewed = await Unviewed();
      // console.log(unviewed);

      if (fetchedMemos.length === 0) {
        setError("No memo available");
      }
    };

    fetchData();
  }, [reloadKey]);

  useEffect(() => {
    const result = memos
      .slice()
      .reverse()
      .filter(
        (memo) =>
          memo.sender_position
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          memo.memo_subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    setFilteredMemos(result);
    // console.log(filteredMemos);
  }, [searchQuery, memos]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleReload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  const visibility = () => {
    setOptions(!options);
  };

  const handleCheckboxChange = (id) => {
    setSelectedMemos((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((memoId) => memoId !== id)
        : [...prevSelected, id]
    );
  };

  const handleArchive = async () => {
    setLoading(true);
    // console.log("======here2======");

    pageTitle === "Archived Memos"
      ? await ArchiveMemo("0", selectedMemos)
      : await ArchiveMemo("1", selectedMemos);
    setReloadKey((prevKey) => prevKey + 1);
  };

  const handleBulkStar = async () => {
    // console.log("======here1======");
    setLoading(true);
    pageTitle === "Starred Memos"
      ? await StarMemo("0", selectedMemos)
      : await StarMemo("1", selectedMemos);
    setReloadKey((prevKey) => prevKey + 1);
  };

  const handleStar = async (id) => {
    // console.log("======here3======");

    starred ? await StarMemo("0", [id]) : await StarMemo("1", [id]);

    setReloadKey((prevKey) => prevKey + 1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select all memos
      setSelectedMemos(memos.map((memo) => memo.id));
    } else {
      // Deselect all memos
      setSelectedMemos([]);
    }
  };

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const handleView = async (id) => {
    if (pageTitle === "Inbox Memos") {
      try {
        const response = await axios.post(
          `${baseUrl}/memo/view-memo`,
          {
            notify_status: 1,
            memo_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log("===========Got here=========");
        navigate(`/message/${id}`);
      } catch (err) {
        console.error("Error while viewing memo:", err);
      }
    } else {
      navigate(`/message/${id}`);
    }
  };

  return (
    <div className="col-span-2  w-full">
      <div className="flex justify-between items-center py-8 px-8 ">
        <div className="grid grid-cols-5 flex justify-center items-center w-full">
          <input
            type="checkbox"
            className="w-5 h-5 bg-primary border-[0.7px] rounded-[1.7px] border-black checked:bg-secondary checked:border-black appearance-none cursor-pointer"
            onChange={handleSelectAll}
            checked={selectedMemos.length === memos.length}
            indeterminate={
              selectedMemos.length > 0 && selectedMemos.length < memos.length
            }
            title="Select all"
          />
          <img
            src={Reload}
            className="w-6 h-6  cursor-pointer"
            onClick={() => {
              handleReload();
            }}
            title="Refresh"
          />
          {options ? (
            <>
              <BsThreeDotsVertical
                onClick={() => {
                  visibility();
                }}
                className="w-6 h-6 cursor-pointer"
                title="Expand"
              />

              <div
                onClick={() => {
                  {
                    handleArchive();
                  }
                }}
                className="w-6 h-6 cursor-pointer"
                title="Archive Memo"
              >
                {pageTitle === "Archived Memos" ? (
                  <MdOutlineUnarchive className="w-6 h-6" />
                ) : (
                  <img src={Archive} className="w-6 h-6" />
                )}
              </div>

              <div
                onClick={() => {
                  {
                    handleBulkStar();
                  }
                }}
                className="w-6 h-6 cursor-pointer"
                title="Add to favorite"
              >
                {pageTitle === "Starred Memos" ? (
                  <img src={Star} className="w-5 h-5  mt-0.5" />
                ) : (
                  <img src={Star2} className="w-5 h-5  mt-0.5" />
                )}
              </div>
            </>
          ) : (
            <img
              src={MenuH}
              onClick={() => {
                visibility();
              }}
              className="w-6 h-6 cursor-pointer"
              title="Close"
            />
          )}
        </div>
        <div className="inline-flex items-center">
          <img src={Search} className="w-[18px] h-[18px] mr-2" />
          <input
            type="text"
            placeholder="Search for user, email address..."
            className="w-56 bg-primary text-sm font-normal border-none ring-none outline-none box-shadow-none"
            value={searchQuery}
            onChange={handleSearch}
            title="Search"
          />

          {/* <img src={Tune} className="w-6 h-6 ml-5" />ß */}
        </div>
      </div>
      <hr className=" border-t-1 border-[#00000030]" />
      <div className="grid grid-cols-4 py-5 px-8 ">
        <div className="col-span-2 items-center">
          {/* <input
            type="checkbox"
            className="w-5 h-5 bg-primary border-[0.7px] rounded-[1.7px] border-black checked:bg-secondary checked:border-black appearance-none "
          /> */}

          <p className="ml-24 message-head">
            {pageTitle === "Sent Memos" ? "Recipient" : "Sender"}
          </p>
        </div>
        <p className="ml-5 message-head text-left">Subject</p>

        <p className="ml-5 message-head text-right">Date</p>
      </div>
      <hr className=" border-t-1 border-[#00000030]" />

      {loading ? (
        <div className="my-5 flex justify-center">
          <div className="loader-two "></div>
        </div>
      ) : (
        <div className="overflow-y-scroll scrollbar-hidden h-[60vh] cursor-pointer">
          {filteredMemos.length > 0 ? (
            filteredMemos.map((memo) => (
              <div
                // href={`./message/${memo.id}`}
                key={memo.id}
                onClick={(e) => {}}
              >
                <div
                  className={`grid grid-cols-4 py-5 px-8 ${
                    memo.notify_status === 0 && pageTitle === "Inbox Memos"
                      ? "font-bold"
                      : "font-normal"
                  }`}
                  onClick={() => handleView(memo.id)}
                >
                  <div className="col-span-2 grid grid-cols-7 items-center">
                    <input
                      type="checkbox"
                      className="col-span-1 w-5 h-5 mr-5 bg-primary border-[0.7px] rounded-[1.7px] border-black checked:bg-secondary checked:border-black appearance-none"
                      checked={selectedMemos.includes(memo.id)}
                      onChange={() => handleCheckboxChange(memo.id)}
                    />
                    {/* {console.log(memo.starred)} */}
                    <img
                      src={starred || memo.starred ? Star2 : Star}
                      className="w-4 h-4 col-sapn-1"
                      onClick={(e) => {
                        handleStar(memo.id), e.stopPropagation();
                        e.preventDefault();
                      }}
                    />
                    <div className="col-span-5 flex items-center">
                      {memo.sender_profile_image && (
                        <img
                          src={memo.sender_profile_image}
                          alt="sender_image"
                          className="w-10 rounded-full mr-4"
                        />
                      )}

                      <p className=" message-text line-clamp-2">
                        {memo.sender_position} |{" "}
                        {memo.sender_mda_acronym || memo.recipient_mda_acronym}
                      </p>
                    </div>
                  </div>
                  <p className="ml-5 message-text line-clamp-2">
                    {memo.memo_subject}
                  </p>
                  <p className="ml-5 message-text text-right">
                    {formatDate(memo.date_sent)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="flex justify-center py-10">{error}</p>
          )}
        </div>
      )}
      <hr className=" border-t-1 mb-10 border-[#00000030]" />
      {/* <div className="grid grid-cols-2 py-5 px-8 ">
        <p>1-5 of 30</p>
        <div className="inline-flex items-center justify-end">
          <div className="bg-white border-[1px] border-[#CCCCCC] w-8 h-8 items-center flex justify-center rounded-[3px]">
            <FaArrowLeft />
          </div>
          <div className="bg-secondary border-[1px] border-[#CCCCCC] w-8 h-8 items-center flex justify-center rounded-[3px] ml-5">
            <FaArrowRight />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MemoList;
