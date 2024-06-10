import React, { useEffect, useRef, useState } from "react";
import FinalDocuments from "./DashboardComponents/FinalDocuments";
import DirectorsTable from "./DashboardComponents/DirectorsTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const { companyId } = useParams();

  const [directors, setDirectors] = useState([]);
  const selectedCompany = useSelector((state) => state.company.selectedCompany);
  const dispatch = useDispatch();

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
    <>
      <div>
        <Breadcrumbs
          lists={[
            { goto: "/", text: "Home" },
            {
              goto: `/company/${selectedCompany.companyId}`,
              text: `${selectedCompany.companyName}`,
            },
            { goto: "/", text: "Dashboard" },
          ]}
        />
      </div>
      <div className="flex flex-col pb-5">
        <div className="flex flex-col w-full justify-between items-left">
          <div className="poppins-bold text-color-2 text-[24px]">Dashboard</div>
        </div>

        <FinalDocuments />
        <DirectorsTable directors={directors} />
      </div>
    </>
  );
};

export default Dashboard;
