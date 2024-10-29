import React from "react";
const user = JSON.parse(localStorage.getItem("user"));
const WaterMark = () => {
  return (
    <div className="absolute inset-0 watermark">
      {Array(100)
        .fill(`${user?.name} `)
        .map((text, index) => (
          <p key={index} className="block text-clip overflow-hidden">
            {text.repeat(10)}
          </p>
        ))}
    </div>
  );
};

export default WaterMark;
