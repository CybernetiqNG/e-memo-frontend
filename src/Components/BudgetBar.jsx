import React from "react";

const BudgetBar = ({ total, spent }) => {
  const width = (spent / total) * 100;
  //   console.log(width);
  return (
    <div className="h-4 bg-[#F1F1F1] rounded-lg lg:w-80 w-full mt-3 ring-[0.3px] ring-[#656565]">
      {spent > 0 && (
        <div
          className="bg-[#3CD69A] h-4 rounded-lg ring-[0.7px] ring-[#3CD69A]"
          style={{ width: width }}
        ></div>
      )}
    </div>
  );
};

export default BudgetBar;
