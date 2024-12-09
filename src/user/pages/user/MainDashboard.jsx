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


        {/* <div className="w-full h-full grid grid-cols md:grid-cols-3 gap-2 p-[0.70rem] bg-red-200">
            <div className="bg-base-100 w-[83vw] md:w-full md:h-[11vh]  md:row-span-2 border border-blue-600 rounded-2xl shadow"><AverageDays /></div>
            <div className="bg-base-100 w-[83vw] md:w-full md:h-[11vh]  md:row-span-2 border border-blue-600 rounded-2xl shadow"><SummaryOfFindings /></div>
            <div className="bg-base-100 w-[83vw] md:w-full md:h-[11vh]  md:row-span-2 border border-blue-600 rounded-2xl shadow"><Notifs /></div>
            <div className="bg-base-100 w-[83vw] md:w-full md:h-[13vh]  md:row-span-2 border border-blue-600 rounded-2xl shadow md:col-span-2"><OpenItems /></div>
            <div className="bg-blue-500 w-[83vw] md:w-full md:h-[11vh]  md:row-span-2 border border-blue-600 rounded-2xl shadow"><DueDateCalendar /></div>
        </div> */}

        <div className="w-full h-full mt-6 flex flex-col gap-4">

          {/* for mobile screens */}
          <div className="flex flex-col gap-4 md:hidden">
            <div className="bg-base-100 border border-blue-600 rounded-2xl shadow"><AverageDays /></div>
            <div className="bg-base-100 border border-blue-600 rounded-2xl shadow"><SummaryOfFindings /></div>
            <div className="bg-base-100 border border-blue-600 rounded-2xl shadow"><Notifs /></div>
          </div>

          <div className="bg-base-100 md:hidden border border-blue-600 rounded-2xl shadow"><OpenItems /></div>
          <div className="bg-blue-500 md:hidden border border-blue-600 rounded-2xl shadow"><DueDateCalendar /></div>

          {/* for tablet screens */}
          <div className="hidden lg:hidden md:flex md:flex-wrap md:flex-row md:gap-2 2xl:hidden">
            <div className="bg-base-100 hidden lg:hidden md:flex md:w-[49.4%] border border-blue-600 rounded-2xl shadow"><AverageDays /></div>
            <div className="bg-blue-500 hidden lg:hidden md:flex md:w-[49.4%] border border-blue-600 rounded-2xl shadow"><DueDateCalendar /></div>
          </div>

          <div className="bg-base-100 hidden lg:hidden md:flex md:w-full md:h-[60%] border border-blue-600 rounded-2xl shadow"><SummaryOfFindings /></div>
          <div className="bg-base-100 hidden lg:hidden md:flex md:w-full md:h-[60%] border border-blue-600 rounded-2xl shadow"><Notifs /></div>
          <div className="bg-base-100 hidden lg:hidden md:flex md:w-full border border-blue-600 rounded-2xl shadow"><OpenItems /></div>
          
          {/* for laptop screens */}
          <div className="hidden 2xl:hidden lg:flex md:flex-wrap md:flex-row md:gap-2 2xl:hidden">
            <div className="bg-base-100 hidden 2xl:hidden lg:flex lg:w-[49%] border border-blue-600 rounded-2xl shadow"><AverageDays /></div>
            <div className="bg-blue-500 hidden 2xl:hidden lg:flex lg:w-[49.6%] border border-blue-600 rounded-2xl shadow"><DueDateCalendar /></div>
          </div>

          <div className="bg-base-100 hidden 2xl:hidden lg:flex lg:w-full lg:h-[60%] border border-blue-600 rounded-2xl shadow"><SummaryOfFindings /></div>
          <div className="bg-base-100 hidden 2xl:hidden lg:flex lg:w-full lg:h-[60%] border border-blue-600 rounded-2xl shadow"><Notifs /></div>
          <div className="bg-base-100 hidden 2xl:hidden lg:flex lg:w-full border border-blue-600 rounded-2xl shadow"><OpenItems /></div>
          
          {/* for large 4k screens */}
          <div className="hidden 2xl:flex 2xl:gap-2">
            <div className="bg-base-100 hidden 2xl:flex 2xl:w-[30%] border border-blue-600 rounded-2xl shadow"><AverageDays /></div>
            <div className="bg-base-100 hidden 2xl:flex 2xl:w-[70%] border border-blue-600 rounded-2xl shadow"><SummaryOfFindings /></div>
          </div>

          <div className="hidden 2xl:flex 2xl:gap-2">
            <div className="bg-base-100 hidden 2xl:flex 2xl:w-[70%] border border-blue-600 rounded-2xl shadow"><Notifs /></div>
            <div className="bg-base-500 hidden 2xl:flex 2xl:w-[30%] 2xl:justify-center border border-blue-600 rounded-2xl shadow"><DueDateCalendar /></div>
          </div>

          <div className="bg-base-100 hidden 2xl:flex 2xl:h-full border border-blue-600 rounded-2xl shadow"><OpenItems /></div>
        </div>
    </>
  );
};

export default MainDashboard;
