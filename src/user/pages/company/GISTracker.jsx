import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link, useParams } from "react-router-dom";

import {
  deleteRecord,
  fetchRecords,
  renameRecordName,
} from "../../store/GIS/GISRecordSlice";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../../assets/global";
import axios from "axios";
import Swal from "sweetalert2";
import Breadcrumbs from "../../components/Breadcrumbs";
import moment from "moment";
import DataTable, { createTheme } from "react-data-table-component";

import gdriveIcon from "/gdrive.svg";

const GISTracker = () => {
  const { companyId } = useParams();
  const companyRecords = useSelector((state) => state.records.records);
  const selectedCompany = useSelector((state) => state.company.selectedCompany);
  const record = useSelector((state) => state.records.record);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [formData, setFormData] = useState(record);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [recordData, setRecordData] = useState(record);

  const [isGrid, setIsGrid] = useState(false);
  const [isLoadingGdrive, setIsLoadingGdrive] = useState(true);

  const [editFolderID, setEditFolderID] = useState("");

  const editSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
    </svg>
  );

  const table = (
    <>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>GIS Name</th>
            <th>Status</th>
            <th>Type of Meeting</th>
            <th>Files</th>
            <th>Date Created</th>
            <th className="w-[10%]">View Process</th>
          </tr>
        </thead>
        <tbody>
          {companyRecords.length !== 0 ? (
            companyRecords.map((record, index) => {
              let goto = "view";
              if (record.status === "Saved as Draft") {
                goto = "create";
              }
              return (
                <tr key={index}>
                  <td className="flex flex-row gap-2">
                    {record.recordName}{" "}
                    <button
                      onClick={() => {
                        setFormData(record);
                        document.getElementById("renameModal").showModal();
                      }}
                    >
                      {editSVG}
                    </button>
                  </td>
                  <td>{record.status}</td>
                  <td>
                    {record.draftingInput.isSpecialMeeting != undefined
                      ? record.draftingInput.isSpecialMeeting
                        ? "Special"
                        : "Annual"
                      : ""}
                  </td>
                  <td></td>
                  <td>
                    {moment(record.created_at).format("MM/DD/YYYY, HH:mm:ss")}
                  </td>
                  <td>
                    <div className="flex flex-row  gap-2 items-center justify-center">
                      <div>
                        <Link
                          to={`/company/${companyId}/gis-tracker/${goto}/${record.recordId}`}
                        >
                          <button>
                            <svg
                              width="44"
                              height="37"
                              viewBox="0 0 44 37"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="44"
                                height="37"
                                rx="10"
                                fill="#273069"
                              />
                              <path
                                d="M22.0003 20C23.1048 20 24.0003 19.1046 24.0003 18C24.0003 16.8954 23.1048 16 22.0003 16C20.8957 16 20.0003 16.8954 20.0003 18C20.0003 19.1046 20.8957 20 22.0003 20Z"
                                fill="white"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.458 18C13.7323 13.9429 17.5226 11 22.0002 11C26.4778 11 30.2681 13.9429 31.5424 18C30.2682 22.0571 26.4778 25 22.0002 25C17.5226 25 13.7323 22.0571 12.458 18ZM26.0003 18C26.0003 20.2091 24.2094 22 22.0003 22C19.7911 22 18.0003 20.2091 18.0003 18C18.0003 15.7909 19.7911 14 22.0003 14C24.2094 14 26.0003 15.7909 26.0003 18Z"
                                fill="white"
                              />
                            </svg>
                          </button>
                        </Link>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            toggleDelete(record.recordId);
                          }}
                        >
                          <svg
                            width="44"
                            height="37"
                            viewBox="0 0 44 37"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="44"
                              height="37"
                              rx="10"
                              fill="#CF0404"
                            />
                            <path
                              d="M28.3333 17.667V25.5003C28.3333 25.7765 28.1095 26.0003 27.8333 26.0003H17.1667C16.8905 26.0003 16.6667 25.7765 16.6667 25.5003V17.667M20.8333 22.667V17.667M24.1667 22.667V17.667M30 14.3333H25.8333M25.8333 14.3333V11.5C25.8333 11.2239 25.6095 11 25.3333 11H19.6667C19.3905 11 19.1667 11.2239 19.1667 11.5V14.3333M25.8333 14.3333H19.1667M15 14.3333H19.1667"
                              stroke="white"
                              strokeWidth="1.95694"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="text-center">
              <td colSpan={4}>No records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );

  //toggle button for submit
  const handleSubmit = async (e, isEdit) => {
    e.preventDefault();

    let status = "error";
    let message = "";

    try {
      status = "success";
      message = "Error updating the record.";

      let response = await axios.patch(`/record/${formData.recordId}`, {
        recordName: formData.recordName,
      });

      if (response.status === 200) {
        dispatch(renameRecordName(formData));
        setFormData(record);
        status = "success";
        message = "Record updated successfully!";
      }
    } catch (error) {
      status = "error";
      message = "Error updating the record.";
      console.error("Error updating the record.: ", error);
    } finally {
      showAlert(status, message);
      document.getElementById("renameModal").close();
    }
  };

  //on change event for inputs
  const handleOnChange = async (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    return;

    if (name === "logo") {
      setLogo(e.target.files[0]);
      // setFormData({
      //   ...formData,
      //   [name]: "",
      // });

      if (checkCompanyLogo(value) != "") {
        setErrors({
          ...errors,
          logo: checkCompanyLogo(value),
        });
      } else {
        setErrors({ ...errors, logo: "" });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    //sets error message for company name input
    if (name == "companyName") {
      if (checkCompanyName(value) != "") {
        setErrors({
          ...errors,
          companyName: checkCompanyName(value),
        });
      } else {
        setErrors({ ...errors, companyName: "" });
      }
    }

    if (name == "secNumber") {
      if (checkSECCert(value) != "") {
        setErrors({
          ...errors,
          secNumber: checkSECCert(value),
        });
      } else {
        setErrors({ ...errors, secNumber: "" });
      }
    }

    if (name == "dateRegistered") {
      if (checkDateRegistered(value) != "") {
        setErrors({
          ...errors,
          dateRegistered: checkDateRegistered(value),
        });
      } else {
        setErrors({ ...errors, dateRegistered: "" });
      }
    }
  };

  const toggleDelete = (recordId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CF0404",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#B4B4B8",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let status = "error";
        let message = "Failed to delete record";
        try {
          let response = await axios.delete(`/record/${recordId}`);
          console.log(response.data);

          if (response.status === 200) {
            dispatch(deleteRecord(recordId));
            status = "success";
            message = "Record deleted successfully!";
          }
        } catch (error) {
          console.error("Error deleting a record: ", error);
        } finally {
          showAlert(status, message);
        }
      }
    });
  };

  const columns = [
    {
      name: "GIS Name",
      selector: (row) => row.recordName,
      cell: (row, rowIndex) => {
        const btnRename = (
          <button
            onClick={() => {
              setFormData(row);
              document.getElementById("renameModal").showModal();
            }}
          >
            {editSVG}
          </button>
        );

        return (
          <div
            className="flex flex-row gap-2"
            onMouseEnter={() => {
              setSelectedIndex(rowIndex);
            }}
            onMouseLeave={() => {
              setSelectedIndex(null);
            }}
          >
            <div>{row.recordName}</div>
            <div className={`${selectedIndex == rowIndex ? "" : "hidden"}`}>
              {btnRename}
            </div>
          </div>
        );
      },
      sortable: true,
      width: "40%",
    },
    {
      name: "Date Filed",
      selector: (row) => null,
      sortable: true,
      width: "20%",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "20%",
    },
    {
      name: "Type of Meeting",
      selector: (row) => {
        return row.draftingInput.isSpecialMeeting != undefined
          ? row.draftingInput.isSpecialMeeting
            ? "Special"
            : "Annual"
          : "";
      },
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        let goto = "view";
        if (row.status === "Saved as Draft") {
          goto = "create";
        }
        return (
          <div className="flex flex-row  gap-2 items-center justify-center">
            <img
              src={gdriveIcon}
              alt=""
              className="cursor-pointer w-full"
              onClick={() => {
                setRecordData(row);
                document.getElementById("gdrive").showModal();
              }}
            />
            <div>
              <Link
                to={`/company/${companyId}/gis-tracker/${goto}/${row.recordId}`}
              >
                <button>
                  <svg
                    width="44"
                    height="37"
                    viewBox="0 0 44 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="44" height="37" rx="10" fill="#273069" />
                    <path
                      d="M22.0003 20C23.1048 20 24.0003 19.1046 24.0003 18C24.0003 16.8954 23.1048 16 22.0003 16C20.8957 16 20.0003 16.8954 20.0003 18C20.0003 19.1046 20.8957 20 22.0003 20Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.458 18C13.7323 13.9429 17.5226 11 22.0002 11C26.4778 11 30.2681 13.9429 31.5424 18C30.2682 22.0571 26.4778 25 22.0002 25C17.5226 25 13.7323 22.0571 12.458 18ZM26.0003 18C26.0003 20.2091 24.2094 22 22.0003 22C19.7911 22 18.0003 20.2091 18.0003 18C18.0003 15.7909 19.7911 14 22.0003 14C24.2094 14 26.0003 15.7909 26.0003 18Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </Link>
            </div>
            <div>
              <button
                onClick={() => {
                  toggleDelete(row.recordId);
                }}
              >
                <svg
                  width="44"
                  height="37"
                  viewBox="0 0 44 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="44" height="37" rx="10" fill="#CF0404" />
                  <path
                    d="M28.3333 17.667V25.5003C28.3333 25.7765 28.1095 26.0003 27.8333 26.0003H17.1667C16.8905 26.0003 16.6667 25.7765 16.6667 25.5003V17.667M20.8333 22.667V17.667M24.1667 22.667V17.667M30 14.3333H25.8333M25.8333 14.3333V11.5C25.8333 11.2239 25.6095 11 25.3333 11H19.6667C19.3905 11 19.1667 11.2239 19.1667 11.5V14.3333M25.8333 14.3333H19.1667M15 14.3333H19.1667"
                    stroke="white"
                    strokeWidth="1.95694"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
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

  useEffect(() => {
    dispatch(fetchRecords(companyId));
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
            { goto: "/", text: "GIS Tracker" },
          ]}
        />
      </div>
      <div className="pb-5">
        {/* <div>
          <Header />
        </div> */}
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-row gap-5">
            <div className="poppins-bold text-color-2 text-[24px] flex items-center">
              GIS Tracker
            </div>
            <Link to={`/company/${companyId}/gis-tracker/create`}>
              <button className="btn btn-md bg-[#273069] border-none text-white flex flex-row justify-center items-center rounded-[15px]">
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 2.7C10.5523 2.7 11 3.10294 11 3.6V8.1H16C16.5523 8.1 17 8.50294 17 9C17 9.49705 16.5523 9.9 16 9.9H11V14.4C11 14.8971 10.5523 15.3 10 15.3C9.44772 15.3 9 14.8971 9 14.4V9.9H4C3.44772 9.9 3 9.49705 3 9C3 8.50294 3.44772 8.1 4 8.1L9 8.1V3.6C9 3.10294 9.44772 2.7 10 2.7Z"
                    fill="#FCFCFC"
                  />
                </svg>
                FILE NEW GIS
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-full mt-5">
          <div className="flex flex-row w-full gap-5 items-center">
            <div className="flex flex-row bg-white rounded-[14px] justify-center items-center gap-2 h-[32px]">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-5"
              >
                <circle
                  cx="7.79183"
                  cy="7.79165"
                  r="4.95834"
                  stroke="#33363F"
                  strokeWidth="2"
                />
                <path
                  d="M14.1665 14.1667L12.0415 12.0417"
                  stroke="#33363F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <input className="mr-5" type="text" placeholder="Search File" />
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <div>Filtering</div>
              <div>
                <select
                  className="select select-bordered select-xs"
                  name=""
                  id=""
                >
                  <option value="">All</option>
                </select>
              </div>
            </div>
            <div className="badge">Done</div>
            <div className="badge">Pending</div>
          </div>
        </div>

        {/* <div className="overflow-x-auto">{table}</div> */}

        <div className="py-5">
          {/* <div className="bg-white p-2 rounded-lg"> */}
          <DataTable
            columns={columns}
            data={companyRecords}
            persistTableHead={true}
            customStyles={customStyles}
            theme="customized"
          />
          {/* </div> */}
        </div>

        <dialog id="renameModal" className="modal">
          <div className="modal-box">
            <div className="flex flex-row justify-between">
              <h3 className="font-bold text-lg">Rename GIS Record</h3>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                  ✕
                </button>
              </form>
            </div>
            <div className="flex flex-col gap-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Record Name <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.recordName && `input-error`
                  }`}
                  name="recordName"
                  value={formData.recordName}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
                {errors.companyName && (
                  <span className="text-[12px] text-red-500">
                    {errors.companyName}
                  </span>
                )}
              </label>

              <button
                onClick={(e) => {
                  handleSubmit(e, true);
                }}
                className="btn bg-primary text-white mt-2"
              >
                Save
              </button>
            </div>
          </div>
        </dialog>

        <dialog id="gdrive" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <div className="flex flex-row justify-between py-4">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                  ✕
                </button>
              </form>
            </div>
            <div className="">
              <div className="flex flex-row gap-2 justify-between items-center p-2">
                <div className="flex flex-row gap-2 items-center">
                  <h3 className="font-bold text-lg">Attached Files</h3>
                  <div
                    className="tooltip cursor-pointer"
                    data-tip="Change Google Drive Folder ID"
                    onClick={() => {
                      setEditFolderID(recordData.folder_id);
                      document.getElementById("changedriveID").showModal();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                    </svg>
                  </div>
                </div>

                {/* <div>
                  <button
                    className={`btn ${
                      isGrid ? "bg-white" : ""
                    } shadow-none border-none`}
                    onClick={() => {
                      setIsGrid(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </button>

                  <button
                    className={`btn ${
                      isGrid ? "" : "bg-white"
                    } shadow-none border-none`}
                    onClick={() => {
                      setIsGrid(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                      />
                    </svg>
                  </button>
                </div> */}
              </div>
              <hr />
              <div className={`w-full max-w-5xl max-h-96 h-96`}>
                {recordData.folder_id != undefined &&
                recordData.folder_id != "" ? (
                  <iframe
                    className={`w-full max-w-5xl max-h-96 h-96 ${
                      isLoadingGdrive ? "hidden" : ""
                    }`}
                    onLoad={() => {
                      setIsLoadingGdrive(false);
                    }}
                    src={`https://drive.google.com/embeddedfolderview?id=${
                      recordData.folder_id
                    }#${isGrid ? "grid" : "list"}`}
                    // style="width:100%; height:600px; border:0;"
                  ></iframe>
                ) : (
                  <>
                    <div className="flex flex-col items-center gap-2 pt-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <h1 className="font-bold text-lg">
                        No folder ID specified.
                      </h1>
                      <p className="text-sm">
                        Please provide the Google Drive folder ID.
                      </p>

                      <div
                        className="py-2"
                        onClick={() => {
                          document.getElementById("changedriveID").showModal();
                        }}
                      >
                        <button className="btn btn-outline btn-sm">
                          Set Folder ID
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {recordData.folder_id != undefined &&
                recordData.folder_id != "" && (
                  <a
                    className="btn btn-primary btn-outline"
                    target="_blank"
                    href={`https://drive.google.com/drive/folders/${recordData.folder_id}`}
                  >
                    <div className="flex flex-row gap-2 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                        />
                      </svg>
                      Go to Google Drive
                    </div>
                  </a>
                )}
            </div>
          </div>
        </dialog>

        <dialog id="changedriveID" className="modal">
          <div className="modal-box">
            <div className="flex flex-row justify-between py-4">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                  ✕
                </button>
              </form>
            </div>
            <div className="flex flex-col gap-5">
              <h1 className="poppins-semibold text-md">
                Update Google Drive Folder ID
              </h1>

              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Google Drive Folder ID{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.set_folder_id && `input-error`
                  }`}
                  name="folder_id"
                  value={editFolderID}
                  onChange={(e) => {
                    setEditFolderID(e.target.value);
                  }}
                />
                {errors.set_folder_id && (
                  <span className="text-[12px] text-red-500">
                    {errors.set_folder_id}
                  </span>
                )}
              </label>

              <button
                className="btn bg-primary text-white"
                onClick={async (e) => {
                  try {
                    let response = await axios.patch(
                      `/record/${recordData.recordId}`,
                      { folder_id: editFolderID }
                    );

                    if (response.status === 200) {
                      setRecordData({ ...recordData, folder_id: editFolderID });
                    }
                  } catch (error) {
                    console.log(error);
                  } finally {
                    document.getElementById("changedriveID").close();
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default GISTracker;
