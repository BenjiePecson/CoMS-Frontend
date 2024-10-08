import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecords, fetchRecords } from "../../store/GIS/GISRecordSlice";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import DataTable, { createTheme } from "react-data-table-component";
import moment from "moment";
import Unathorized from "../../components/Unathorized";
import axios from "axios";

const GISPage = () => {
  // const companyRecords = useSelector((state) => state.records.records);
  const records = useSelector((state) => state.records.records);
  const currentUser = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const columns = [
    {
      name: "Date",
      selector: (row) => moment(row.created_at).format("MMMM DD, YYYY"),
      cell: (row) => {
        if (row.created_at == null || row.created_at == "") {
          return;
        }
        return moment(row.created_at).format("MMMM DD, YYYY");
      },
      sortable: true,
    },
    {
      name: "Company",
      selector: (row) => row.companyName,
      sortable: true,
    },
    {
      name: "GIS Record",
      selector: (row) => row.recordName,
      sortable: true,
      width: "30%",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => {
        return (
          <div className="px-4 py-1 bg-[#3D4D6B] text-white rounded-2xl line-clamp-1 text-center  w-full">
            {row.status}
          </div>
        );
      },
      width: "25%",

      sortable: true,
    },
    {
      name: "Link to Record",
      selector: (row) => {
        return (
          <Link to={`/gis/${row.recordId}`}>
            <svg
              width="43"
              height="37"
              viewBox="0 0 43 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="42.24" height="37" rx="10" fill="#273069" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.3604 13C15.3604 11.8954 16.22 11 17.2804 11H21.6827C22.1919 11 22.6803 11.2107 23.0404 11.5858L26.318 15C26.6781 15.3751 26.8804 15.8838 26.8804 16.4142V25C26.8804 26.1046 26.0207 27 24.9604 27H17.2804C16.22 27 15.3604 26.1046 15.3604 25V13Z"
                fill="#F7F7F7"
              />
            </svg>
          </Link>
        );
      },
    },
  ];

  createTheme("customized", {
    text: {
      primary: "#000000",
    },
    background: {
      default: "transparent",
    },
  });

  const customStyles = {
    headCells: {
      style: {
        font: "bold",
      },
    },
  };

  const table_old = () => {
    return (
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Date</th>
              <th>Company</th>
              <th>Status</th>
              <th className="w-[10%]">Link to Record</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>October 2, 2024</th>
              <td>Offshore Concept BPO Services Inc.</td>
              <td>
                <div className="badge bg-[#3D4D6B] text-white px-8 py-3">
                  Pending for Approval
                </div>
              </td>
              <td className="flex flex-row justify-center items-center gap-2"></td>
            </tr>
            <tr>
              <th>October 2, 2024</th>
              <td>CloudEats Ph, Inc.</td>
              <td>
                <div className="badge bg-[#3D4D6B] text-white px-8 py-3">
                  Pending for Approval
                </div>
              </td>
              <td className="flex flex-row justify-center items-center gap-2">
                <Link to={`/gis/${2}`}>
                  <svg
                    width="43"
                    height="37"
                    viewBox="0 0 43 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="42.24" height="37" rx="10" fill="#273069" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.3604 13C15.3604 11.8954 16.22 11 17.2804 11H21.6827C22.1919 11 22.6803 11.2107 23.0404 11.5858L26.318 15C26.6781 15.3751 26.8804 15.8838 26.8804 16.4142V25C26.8804 26.1046 26.0207 27 24.9604 27H17.2804C16.22 27 15.3604 26.1046 15.3604 25V13Z"
                      fill="#F7F7F7"
                    />
                  </svg>
                </Link>
              </td>
            </tr>
            <tr>
              <th>October 2, 2024</th>
              <td>Teetalk.PH, Inc.</td>
              <td>
                <div className="badge bg-[#3D4D6B] text-white px-8 py-3">
                  Pending for Approval
                </div>
              </td>
              <td className="flex flex-row justify-center items-center gap-2">
                <Link to={`/gis/${3}`}>
                  <svg
                    width="43"
                    height="37"
                    viewBox="0 0 43 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="42.24" height="37" rx="10" fill="#273069" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.3604 13C15.3604 11.8954 16.22 11 17.2804 11H21.6827C22.1919 11 22.6803 11.2107 23.0404 11.5858L26.318 15C26.6781 15.3751 26.8804 15.8838 26.8804 16.4142V25C26.8804 26.1046 26.0207 27 24.9604 27H17.2804C16.22 27 15.3604 26.1046 15.3604 25V13Z"
                      fill="#F7F7F7"
                    />
                  </svg>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  useEffect(() => {
    dispatch(fetchAllRecords("Pending for Approval"));
  }, []);

  if (!currentUser.permissions.includes("View Permissions")) {
    return <Unathorized />;
  }

  return (
    <>
      {/* <div>
        <Breadcrumbs
          lists={[
            { goto: "/", text: "Home" },
            { goto: "/gis", text: "GIS" },
          ]}
        />
      </div> */}
      <div>
        {/* <div>
          <Header />
        </div> */}
        <div className="flex flex-row w-full justify-between items-center mt-5">
          <div className="poppins-bold text-color-2 text-[24px]">GIS</div>
        </div>
        <div className="flex flex-col w-full mt-5">
          <DataTable
            columns={columns}
            data={records}
            persistTableHead={true}
            customStyles={customStyles}
            theme="customized"
          />
        </div>
      </div>
    </>
  );
};

export default GISPage;
