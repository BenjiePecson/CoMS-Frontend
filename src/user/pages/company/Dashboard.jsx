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
  const [isGridView, setIsGridView] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [warnings, setWarnings] = useState([]);
  const [isLoadingWarning, setIsLoadingWarning] = useState(true);

  const warningSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-8 text-orange-500"
    >
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const closeSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
    >
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const displayWarnings = () => {
    return (
      <ul className="list-disc">
        {warnings.map((warning, index) => {
          let message = "";
          switch (warning) {
            case "MC28Form":
              message = (
                <span>
                  The <span className="font-bold">MC28 form</span> for{" "}
                  {selectedCompany.companyName} has not yet been filed. Please
                  complete this filing as soon as possible.
                </span>
              );
              break;
            case "current GIS":
              message = (
                <span>
                  Please update and file the{" "}
                  <span className="font-bold">current year GIS</span> for{" "}
                  {selectedCompany.companyName} as soon as possible.
                </span>
              );
              break;
          }

          return <li key={`warning-${index}`}>{message}</li>;
        })}
      </ul>
    );
  };

  const alertMessageComponent = () => {
    if (isLoadingWarning)
      return (
        <div className="w-full flex flex-row justify-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      );
    if (!showAlert) return;
    if (warnings.length <= 0) return;
    return (
      <div className="flex flex-col w-full bg-orange-200 px-5 py-2 rounded-xl">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-8">
            <div className="flex flex-col items-center justify-center">
              {warningSVG}
            </div>
            <div className="flex flex-row items-center justify-center">
              {displayWarnings()}
            </div>
          </div>
          {/* <div className="flex flex-col items-center">
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowAlert(false);
              }}
            >
              {closeSVG}
            </div>
          </div> */}
        </div>
      </div>
    );
  };

  const fetchDirectors = async () => {
    try {
      let response = await axios.get(`/record/current/${companyId}`);

      setDirectors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWarnings = async () => {
    try {
      let response = await axios.get(`/check-warnings/${companyId}`);
      if (response.status === 200) {
        let warnings = [];

        if (response.data.MC28Form == "") {
          warnings.push("MC28Form");
        }
        if (response.data.current_year_GIS_count == 0) {
          warnings.push("current GIS");
        }
        // <span>
        //     The <span className="font-bold">MC28 form</span> for{" "}
        //     {selectedCompany.companyName} has not yet been filed. Please complete
        //     this filing as soon as possible.
        //   </span>,
        //   <span>
        //     Please update and file the{" "}
        //     <span className="font-bold">current year GIS</span> for{" "}
        //     {selectedCompany.companyName} as soon as possible.
        //   </span>,

        setWarnings(warnings);
        setIsLoadingWarning(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDirectors();
    fetchWarnings();
  }, []);

  return (
    <>
      {/* <div>
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
      </div> */}
      <div className="flex flex-col gap-5 pb-5">
        {alertMessageComponent()}
        <FinalDocuments isGridView={isGridView} setIsGridView={setIsGridView} />
        <DirectorsTable
          directors={directors}
          isGridView={isGridView}
          setIsGridView={setIsGridView}
        />
      </div>
    </>
  );
};

export default Dashboard;
