import React, { useState } from "react";
import SideBar from "../Components/SideBar";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6"; // Import both icons
import auth from "../Utils/auth";
import WaterMark from "../Components/WaterMark";

const Help = () => {
  auth();
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    {
      question: "How do I create a memo?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hicfugit quibusdam suscipit necessitatibus nulla non, reprehenderit",
    },
    {
      question: "How do I edit a memo?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hicfugit quibusdam suscipit necessitatibus nulla non, reprehenderit",
    },
    {
      question: "How do I delete a memo?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hicfugit quibusdam suscipit necessitatibus nulla non, reprehenderit",
    },
    {
      question: "How do I share a memo?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hicfugit quibusdam suscipit necessitatibus nulla non, reprehenderit",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="lg:grid grid-cols-12 ">
      <SideBar />
      <div className="col-span-9 bg-[url('../assets/svg/bg.svg')] lg:p-20 p-5 overflow-hidden relative">
        <WaterMark />
        <div className="flex lg:flex-row flex-col justify-between">
          {/* <p className="page-head">FAQs</p> */}
          <p className="page-head">Help</p>

          <p className="go-back">
            Dashboard / <span className="text-secondary">Help & Support</span>
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-custom-shadow lg:py-11 lg:pl-11 lg:pr-10 lg:pr-14 p-5 mt-10 space-y-5">
          {/* {faqs.map((faq, index) => (
            <div key={index} className="bg-primary px-8 py-5">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <p className="faq-head text-btn ml-3">{faq.question}</p>
                {openIndex === index ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              {openIndex === index && (
                <p className="faq-text mt-3">{faq.answer}</p>
              )}
            </div>
          ))} */}

          {/* <div className="pt-16"> */}
          <div className="pt-3">
            <p className="text-2xl font-semibold">
              Contact Details for Technical Support
            </p>
            <div className="mt-4 text-xl font-light space-y-2">
              <p className="text-xl font-light">Super Admin (MISDE)</p>
              <p className="text-xl font-light">Phone No: 090123456789</p>
              <p className="text-xl font-light">
                Email Address: superadmin@ekitistategov.ng
              </p>
            </div>
            <div className="text-xl font-light mt-12 space-y-2">
              <p className="text-xl font-light">Admin (MyMDA)</p>
              <p className="text-xl font-light">Phone No: 090123456789</p>
              <p className="text-xl font-light">
                Email Address: superadmin@ekitistategov.ng
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
