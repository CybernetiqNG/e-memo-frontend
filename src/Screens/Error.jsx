import React from "react";
import { useNavigate } from "react-router-dom";
import Img from "../assets/svg/error.svg";

const Error = () => {
  const navigate = useNavigate();

  const goToOverview = () => {
    navigate("/overview");
  };

  return (
    <div className="flex flex-col items-center justify-center lg:mt-20 mt-10 ">
      <p className="lg:text-4xl text-2xl font-semibold text-center">
        Opps... page not found
      </p>
      <div className="mt-7 flex flex-col justify-center items-center">
        <button
          className=" z-10 w-60  bg-secondary p-4 rounded-2xl text-white hover:bg-white hover:ring-2 hover:ring-btn hover:text-btn transition-transform duration-200 ease-in-out"
          aria-label="Go back"
          onClick={goToOverview}
        >
          Go home
        </button>
        <div className="relative">
          <p className="lg:text-[346px] md:text-[200px] text-[150px] font-bold text-[#D9FFF2] lg:-mt-10  relative">
            404
          </p>
          <img
            src={Img}
            alt="error"
            className="absolute w-96 lg:bottom-10 md:-bottom-60 -bottom-40 lg:right-40"
          />
        </div>
      </div>
    </div>
  );
};

export default Error;
