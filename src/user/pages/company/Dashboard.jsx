import React, { useEffect, useRef, useState } from "react";
import FinalDocuments from "./DashboardComponents/FinalDocuments";
import DirectorsTable from "./DashboardComponents/DirectorsTable";
import axios from "axios";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { companyId } = useParams();

  const [directors, setDirectors] = useState([]);

  const fetchDirectors = async () => {
    try {
      let response = await axios.get(`/record/current/${companyId}`);

      setDirectors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDirectors();
  }, []);

  return (
    <div className="flex flex-col py-5">
      <div className="flex flex-col w-full justify-between items-left">
        <div className="poppins-bold text-color-2 text-[24px]">Dashboard</div>
      </div>

      <FinalDocuments />
      <DirectorsTable directors={directors} />
    </div>
  );
};

export default Dashboard;
