import React from "react";

const Preview = () => {
  return (
    <div className="grid grid-cols-12 bgscreen">
      <SideBar />
      <div className="col-span-9 bg-[url('../assets/svg/bg.svg')] p-10">
        <div className="flex justify-between">
          <p className="page-head">Compose Memo</p>
          <p className="go-back">
            Dashboard / <span className="text-secondary">Form layout</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preview;
