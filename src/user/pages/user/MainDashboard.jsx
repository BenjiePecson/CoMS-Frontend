import React, { useEffect, useRef, useState } from "react";
import CarouselofCards from "./MainDashboard/Cards/CarouselofCards";
import SummaryOfFindings from "./MainDashboard/Notification/SummaryOfFindings";
import AverageDays from "./MainDashboard/Charts/AverageDays";
import Notifs from "./MainDashboard/Notification/Notifs";
import OpenItems from "./MainDashboard/Notification/OpenItems";
import { DueDateCalendar } from "./MainDashboard/Charts/DueDateCalendar";


const MainDashboard = () => {
  return (
    <>
        <div className="flex p-2 flex-row justify-between items-center mb-2">
            <h1 className="poppins-bold text-color-2 text-[24px]">Dashboard</h1>
            {/* <select className="select select-primary w-full max-w-xs">
              <option disabled>Choose a module:</option>
              <option>All</option>
              <option>GIS</option>
              <option>MC28</option>
            </select> */}
        </div>

        <CarouselofCards />


        <div className="grid grid-cols-3 gap-2 p-[0.70rem]">
            <div className="bg-base-100 row-span-2 border border-blue-600 rounded-2xl shadow"><AverageDays /></div>
            <div className="bg-base-100 row-span-2 border border-blue-600 rounded-2xl shadow"><SummaryOfFindings /></div>
            <div className="bg-base-100 row-span-2 border border-blue-600 rounded-2xl shadow"><Notifs /></div>
            <div className="bg-base-100 row-span-2 border border-blue-600 rounded-2xl shadow col-span-2"><OpenItems /></div>
            <div className="bg-blue-500 row-span-2 border border-blue-600 rounded-2xl shadow"><DueDateCalendar /></div>
        </div>
    </>
  );
};

export default MainDashboard;
