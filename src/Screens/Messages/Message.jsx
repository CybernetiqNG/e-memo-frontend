import React, { useState, useEffect } from "react";
import SideBar from "../../Components/SideBar";
import Logo from "../../assets/svg/logo2.svg";
import { useParams } from "react-router-dom";
import singleMemo from "../../Lib/SingleMemo";
import formatDate from "../../Utils/formatDate";
import auth from "../../Utils/auth";

const Message = () => {
  auth();
  const { id } = useParams();
  const [memo, setMemo] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const fetchedMemo = await singleMemo(id);
      if (fetchedMemo) {
        setLoading(false);
        setMemo(fetchedMemo);
      }
    };

    fetchData();
  }, []);

  // console.log(memo);
  return (
    <div className="grid grid-cols-12 bgscreen">
      <SideBar />
      <div className="col-span-9 bg-[url('../assets/svg/bg.svg')] p-10">
        <div className="flex justify-between">
          <p className="page-head">Message</p>
          <p className="go-back">
            Dashboard / <span className="text-secondary">Inbox</span>
          </p>
        </div>

        <div className="bg-primary shadow-custom-shadow pt-7 px-20 pb-16 rounded-lg mt-10 min-h-[450px]">
          <img src={Logo} className="flex m-auto w-16 h-16" />
          <p className="text-secondary text-base text-center font-bold mt-4">
            OFFICE OF THE GOVERNOR
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
                <p className="preview-foot">Name | {memo.sender_position}</p>
                <p className="preview-foot">
                  {memo.sender_email} | (+234) 234 465 7891
                </p>
              </div>
            </>
          )}
        </div>
        <div className="justify-end flex mt-7 gap-3">
          <button className="bg-secondary py-4 w-40 text-white rounded-md">
            Approve
          </button>
          <button className="bg-[#909090] py-4 w-40 text-white rounded-md">
            Minutes
          </button>
          <button className="bg-[#FF0000] py-4 w-40 text-white rounded-md">
            Disapprove
          </button>
          <button className="bg-[#FFC700] py-4 w-40 text-white rounded-md">
            Pending
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
