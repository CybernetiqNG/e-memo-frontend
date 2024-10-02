import React, { useState, useEffect } from "react";
import Reload from "../../assets/svg/icons/reload.svg";
import MenuH from "../../assets/svg/icons/menu.svg";
import Tune from "../../assets/svg/icons/tune.svg";
import Search from "../../assets/svg/icons/search.svg";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import formatDate from "../../Utils/formatDate";
import AllDrafts from "../../Lib/Drafts";

const Drafts = () => {
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const fetchedMemos = await AllDrafts();
      if (fetchedMemos) {
        setLoading(false);
        setMemos(fetchedMemos);
      }

      if (fetchedMemos.length === 0) {
        setError("No memo available");
      }
    };

    fetchData();
  }, []);

  // console.log(memos);
  return (
    <div className="col-span-5 ">
      <div className="flex justify-between items-center py-8 px-8 ">
        <div className="inline-flex items-center">
          <input type="checkbox" className="w-5 h-5 bg-primary" />
          <img src={Reload} className="w-6 h-6 ml-5" />
          <img src={MenuH} className="w-6 h-6 ml-5" />
        </div>
        <div className="inline-flex items-center">
          <img src={Search} className="w-[18px] h-[18px] mr-2" />
          <input
            type="text"
            placeholder="Search for user, email address..."
            className="w-56 bg-primary text-sm font-normal"
          />
          <img src={Tune} className="w-6 h-6 ml-5" />
        </div>
      </div>
      <hr className=" border-t-1 border-[#00000030]" />
      <div className="grid grid-cols-3 py-5 px-8 ">
        <div className="inline-flex items-center">
          <input type="checkbox" className="w-5 h-5 bg-primary" />
          <p className="ml-5 message-head">Sender</p>
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
        <></>
      )}

      {memos.length > 0 ? (
        memos.map((memo) => (
          <a href={`./message/${memo.id}`} key={memo.id}>
            <div className="grid grid-cols-3 py-5 px-8">
              <div className="inline-flex items-center">
                <input type="checkbox" className="w-5 h-5 bg-primary" />
                <p className="ml-5 message-text">{memo.sender_position}</p>
              </div>
              <p className="ml-5 message-text text-left">{memo.memo_subject}</p>
              <p className="ml-5 message-text text-right">
                {formatDate(memo.date_sent)}
              </p>
            </div>
          </a>
        ))
      ) : memos.length < 1 ? (
        <p className="flex justify-center py-10">{error}</p>
      ) : (
        <></>
      )}

      <hr className=" border-t-1 border-[#00000030]" />
      <div className="grid grid-cols-2 py-5 px-8 ">
        <p>1-5 of 30</p>
        <div className="inline-flex items-center justify-end">
          <div className="bg-white border-[1px] border-[#CCCCCC] w-8 h-8 items-center flex justify-center rounded-[3px]">
            <FaArrowLeft />
          </div>
          <div className="bg-secondary border-[1px] border-[#CCCCCC] w-8 h-8 items-center flex justify-center rounded-[3px] ml-5">
            <FaArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drafts;
