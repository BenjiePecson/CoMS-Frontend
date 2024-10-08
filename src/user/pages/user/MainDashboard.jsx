import React, { useEffect, useRef, useState } from "react";
import Notarization from "./MainDashboard/Notarization.jsx";

const MainDashboard = () => {
  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row w-full gap-3 justify-between mt-5">
          <div className="flex flex-row w-full">
            <h1 className="poppins-bold text-color-2 text-[24px]">Dashboard</h1>
          </div>
        </div>

        <div className="flex flex-col w-full mt-5">
          <Notarization />
        </div>
      </div>
    </>
  );
};

export default MainDashboard;
