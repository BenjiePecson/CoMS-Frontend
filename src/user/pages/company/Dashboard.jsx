import React, { useEffect } from "react";
import Header from "../../components/Header";

const Dashboard = () => {
  return (
    <div>
      <div className="flex flex-row w-full justify-between items-center">
        <div className="poppins-bold text-color-2 text-[24px]">Dashboard</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5">
        <div className="card w-full aspect-square bg-base-100 shadow-xl cursor-pointer">
          <div className="flex flex-col items-center justify-center my-auto py-5 gap-2 w-full">
            <h1 className="poppins-semibold text-[20px]">Draft GIS</h1>
            <svg
              viewBox="0 0 33 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-7"
            >
              <path
                d="M32.888 21.12H20.792V33.536H12.344V21.12H0.248V13.312H12.344V0.896H20.792V13.312H32.888V21.12Z"
                fill="#1F384C"
              />
            </svg>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Dashboard;
