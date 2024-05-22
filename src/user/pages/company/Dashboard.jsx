import React, { useRef } from "react";
import FinalDocuments from "./DashboardComponents/FinalDocuments";
import DirectorsTable from "./DashboardComponents/DirectorsTable";

const records = [];

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col w-full justify-between items-left">
        <div className="poppins-bold text-color-2 text-[24px]">Dashboard</div>
      </div>

      <FinalDocuments />
      <DirectorsTable />
    </>
  );
};

export default Dashboard;
