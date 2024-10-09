import React, { useEffect, useRef, useState } from "react";
import Notarization from "./MainDashboard/Notarization.jsx";
import Drafted from "./MainDashboard/Drafted.jsx";
import PendingforApproval from "./MainDashboard/PendingforApproval.jsx";
import Approved from "./MainDashboard/Approved.jsx";
import RoutedforSignature from "./MainDashboard/RoutedforSignature.jsx";
import FiledwithSEC from "./MainDashboard/FiledwithSec.jsx";
import Completed from "./MainDashboard/Completed.jsx";

const MainDashboard = () => {
  return (
    <>
      <div>
        <div className="flex flex-col md flex-row w-full gap-3 justify-between mt-5">
          <div className="flex flex-row w-full">
            <h1 className="poppins-bold text-color-2 text-[24px]">Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center justify-center flex-wrap w-full mt-5">
          <Drafted />
          <PendingforApproval />
          <Approved />
          <RoutedforSignature />
          <Notarization />
          <FiledwithSEC />
          <Completed />
        </div>
      </div>
    </>
  );
};

export default MainDashboard;
