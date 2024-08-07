import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header";
import { showAlert } from "../../../../assets/global";
import axios from "axios";
import Breadcrumbs from "../../../components/Breadcrumbs";
import gdriveIcon from "/gdrive.svg";
import DataTable, { createTheme } from "react-data-table-component";

const MinutesOfMeetings = () => {
  const { companyId } = useParams();
  const companyRecords = useSelector((state) => state.records.records);
  const selectedCompany = useSelector((state) => state.company.selectedCompany);

  const minutesOfMeeting = {
    notice_date: "",
    type_of_meeting: "",
    place_of_meeting: "",
    quorum: "",
    folder_id: "",
  };
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState(minutesOfMeeting);
  const [records, setRecords] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();
  const [files, setFiles] = useState([]);

  const [isGrid, setIsGrid] = useState(false);
  const [isLoadingGdrive, setIsLoadingGdrive] = useState(true);

  const [editFolderID, setEditFolderID] = useState("");

  const table = (
    <>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Board Meeting Date</th>
            <th>Type of Meeting</th>
            <th>Place of Meeting</th>
            <th>Quorum</th>
            {/* <th>Attached Files</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.length !== 0 ? (
            records.map((record, index) => {
              return (
                <tr key={index}>
                  <td>{record.notice_date}</td>
                  <td>{record.type_of_meeting}</td>
                  <td>{record.place_of_meeting}</td>
                  <td>{record.quorum}</td>
                  {/* <td>
                    <div className="flex flex-row items-center gap-2">
                      {record.files.length > 0 && (
                        <div
                          className="px-2 py-2 rounded-full bg-neutral text-white text-xs cursor-pointer"
                          onClick={() => {
                            setFiles(record.files);

                            document
                              .getElementById("attachedFileModal")
                              .showModal();
                          }}
                        >
                          <p className="line-clamp-1">
                            {record.files[0].fileName}
                          </p>
                        </div>
                      )}
                      {record.files.length > 1 && (
                        <div
                          className="px-3 py-2 rounded-full bg-neutral text-white text-xs cursor-pointer"
                          onClick={() => {
                            setFiles(record.files);
                            document
                              .getElementById("attachedFileModal")
                              .showModal();
                          }}
                        >
                          {record.files.length - 1}+
                        </div>
                      )}
                    </div>
                  </td> */}
                  <td>
                    <div className="flex flex-row justify-start items-center gap-2">
                      <img
                        src={gdriveIcon}
                        onClick={() => {
                          setSelectedIndex(index);
                          setFormData(record);
                          // setErrors([]);
                          document.getElementById("gdrive").showModal();
                        }}
                        alt=""
                        className="cursor-pointer"
                      />
                      {/* <button
                       
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
                            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                          />
                        </svg>
                      </button> */}
                      <button
                        onClick={() => {
                          setSelectedIndex(index);
                          setFormData(record);
                          setErrors([]);
                          document.getElementById("editModal").showModal();
                        }}
                      >
                        <svg
                          width="44"
                          height="37"
                          viewBox="0 0 44 37"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="44" height="37" rx="10" fill="#273069" />
                          <path
                            d="M15 26H30M22.6849 13.357L25.042 11L29.1667 15.1248L26.8097 17.4818M22.6849 13.357L18.0127 18.0292C17.8564 18.1855 17.7686 18.3975 17.7686 18.6185V22.398H21.5483C21.7693 22.398 21.9812 22.3103 22.1375 22.154L26.8097 17.4818M22.6849 13.357L26.8097 17.4818"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="text-center">
              <td colSpan={5}>No records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );

  const handleSubmit = async (e, isEdit = false) => {
    if (await isFormValid()) {
      if (isEdit) {
        //for edit function

        let status = "error";
        let message = "Failed to update the record.";

        try {
          let response = await axios.patch(
            `/minutes-of-meeting/${companyId}`,
            formData
          );
          let data = response.data.data[0];

          if (response.data.success) {
            let updatedRecords = records.map((record, index) => {
              if (record.nomId === data.nomId) {
                record = {
                  ...record,
                  proposed_meeting_date: formData.proposed_meeting_date,
                  type_of_meeting: formData.type_of_meeting,
                  place_of_meeting: formData.place_of_meeting,
                  quorum: formData.quorum,
                };
              }
              return record;
            });
            setRecords(updatedRecords);
            status = "success";
            message = "Record was added successfully.";
          }
        } catch (error) {
          console.log(error);
        } finally {
          showAlert(status, message);
          setFormData(minutesOfMeeting);
          document.getElementById("editModal").close();
        }
      } else {
        //for add function
        // let status = "error";
        // let message = "Failed to save the record.";
        // try {
        //   // let response = await axios.post(`/board-meetings/notice-of-meeting/${companyId}`, formData);
        //   setRecords([...records, formData]);
        //   status = "success";
        //   message = "Record was added successfully.";
        // } catch (error) {
        //   console.log(error);
        // } finally {
        //   showAlert(status, message);
        //   setFormData(noticeOfMeeting);
        //   document.getElementById("addModal").close();
        // }
      }
    } else {
      console.log("Invalid");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let error = "";
    if (name == "proposed_meeting_date") {
      if (value == "") {
        error = "Board Meeting Date is required";
        setErrors({
          ...errors,
          proposed_meeting_date: error,
        });
      } else {
        setErrors({ ...errors, proposed_meeting_date: "" });
      }
    }

    if (name == "type_of_meeting") {
      if (value == "") {
        error = "Type of Meeting is required";
        setErrors({
          ...errors,
          type_of_meeting: error,
        });
      } else {
        setErrors({ ...errors, type_of_meeting: "" });
      }
    }

    if (name == "place_of_meeting") {
      if (value == "") {
        error = "Place of Meeting is required";
        setErrors({
          ...errors,
          place_of_meeting: error,
        });
      } else {
        setErrors({ ...errors, place_of_meeting: "" });
      }
    }

    if (name == "quorum") {
      if (value == "") {
        error = "Quorum is required";
        setErrors({
          ...errors,
          quorum: error,
        });
      } else {
        setErrors({ ...errors, quorum: "" });
      }
    }
  };

  const isFormValid = async (isEdit) => {
    let newErrors = {};

    if (formData.proposed_meeting_date == "") {
      newErrors.proposed_meeting_date = "Board Meeting Date is required";
    }

    if (formData.type_of_meeting == "") {
      newErrors.type_of_meeting = "Type of Meeting is required";
    }

    if (formData.place_of_meeting == "") {
      newErrors.place_of_meeting = "Place of Meeting is required";
    }

    if (formData.quorum == "") {
      newErrors.quorum = "Quorum is required";
    }

    setErrors({ ...errors, ...newErrors });

    return Object.keys(newErrors).length == 0;
  };

  const fetchRecords = async () => {
    try {
      let response = await axios.get(`/minutes-of-meeting/${companyId}`);
      setRecords(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const dialogComponents = () => {
    return (
      <>
        <dialog id="editModal" className="modal">
          <div className="modal-box">
            <div className="flex flex-row justify-between">
              <h3 className="font-bold text-lg">Edit Minutes of Meeting</h3>
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
                    Board Meeting Date <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="date"
                  className={`input input-bordered w-full ${
                    errors.notice_date && `input-error`
                  }`}
                  name="notice_date"
                  value={formData.notice_date}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
                {errors.notice_date && (
                  <span className="text-[12px] text-red-500">
                    {errors.notice_date}
                  </span>
                )}
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Type of Meeting <span className="text-red-500">*</span>
                  </span>
                </div>
                <select
                  className="select select-bordered"
                  name="type_of_meeting"
                  value={formData.type_of_meeting}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                >
                  <option>Regular</option>
                  <option>Special</option>=
                </select>
                {errors.type_of_meeting && (
                  <span className="text-[12px] text-red-500">
                    {errors.type_of_meeting}
                  </span>
                )}
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Place of Meeting <span className="text-red-500">*</span>
                  </span>
                </div>
                <textarea
                  className={`textarea textarea-bordered h-24 w-full ${
                    errors.place_of_meeting && `textarea-error`
                  }`}
                  name="place_of_meeting"
                  value={formData.place_of_meeting}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                ></textarea>
                {errors.place_of_meeting && (
                  <span className="text-[12px] text-red-500">
                    {errors.place_of_meeting}
                  </span>
                )}
              </label>

              <div className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Quorum <span className="text-red-500">*</span>
                  </span>
                </div>

                <div className="flex flex-row gap-5">
                  <div className="flex flex-row gap-2">
                    <span>Yes</span>
                    <input
                      type="radio"
                      name="quorum"
                      className="radio radio-primary"
                      value={"Yes"}
                      checked={formData.quorum == "Yes"}
                      onChange={(e) => {
                        handleOnChange(e);
                      }}
                    />
                  </div>
                  <div className="flex flex-row gap-2">
                    <span>No</span>
                    <input
                      type="radio"
                      name="quorum"
                      className="radio radio-primary"
                      value={"No"}
                      checked={formData.quorum == "No"}
                      onChange={(e) => {
                        handleOnChange(e);
                      }}
                    />
                  </div>
                </div>

                {errors.quorum && (
                  <span className="text-[12px] text-red-500">
                    {errors.quorum}
                  </span>
                )}
              </div>

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

        <dialog id="attachedFileModal" className="modal">
          <div className="modal-box">
            <div className="flex flex-row justify-between">
              <h3 className="font-bold text-lg">Attached Files</h3>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                  ✕
                </button>
              </form>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full pt-5">
              {files.map((file, index) => {
                return (
                  <div key={index}>
                    <div className="p-2">
                      <a href={file.fileLink} target="_blank">
                        <div
                          className="px-4 py-2 bg-neutral rounded-full text-white tooltip"
                          data-tip={file.fileName}
                        >
                          <p className="line-clamp-1 text-sm tooltip">
                            {file.fileName}
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                );
              })}
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
                      setEditFolderID(formData.folder_id);
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
                <div>
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
                </div>
              </div>
              <hr />
              <div className={`w-full max-w-5xl max-h-96 h-96`}>
                {formData.folder_id != undefined && formData.folder_id != "" ? (
                  <iframe
                    className={`w-full max-w-5xl max-h-96 h-96 ${
                      isLoadingGdrive ? "hidden" : ""
                    }`}
                    onLoad={() => {
                      setIsLoadingGdrive(false);
                    }}
                    src={`https://drive.google.com/embeddedfolderview?id=${
                      formData.folder_id
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
              {formData.folder_id != undefined && formData.folder_id != "" && (
                <a
                  className="btn btn-primary btn-outline"
                  target="_blank"
                  href={`https://drive.google.com/drive/folders/${formData.folder_id}`}
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
                  name="set_folder_id"
                  value={editFolderID}
                  onChange={(e) => {
                    setEditFolderID(e.target.value);

                    // if (e.target.value == "") {
                    //   setErrors({
                    //     ...errors,
                    //     set_folder_id: "Folder ID is required",
                    //   });
                    // } else {
                    //   setErrors({ ...errors, set_folder_id: "" });
                    // }
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
                  // if (editFolderID == "") {
                  //   setErrors({
                  //     ...errors,
                  //     set_folder_id: "Folder ID is required",
                  //   });
                  //   return;
                  // }
                  try {
                    formData.folder_id = editFolderID;

                    let response = await axios.patch(
                      `/minutes-of-meeting/${companyId}`,
                      formData
                    );

                    let updated = response.data.data[0];

                    if (response.data.success) {
                      // setFormData(noticeOfMeeting);

                      let formrecord = {};

                      let updatedData = records.map((record, index) => {
                        if (record.nomId == updated.nomId) {
                          record = {
                            ...record,
                            notice_date: updated.noticeDate,
                            proposed_meeting_date: updated.proposedMeetingDate,
                            type_of_meeting: updated.typeOfMeeting,
                            files: updated.files,
                            status: updated.status,
                            folder_id: updated.folder_id,
                          };
                          formrecord = record;
                        }

                        return record;
                      });
                      setRecords(updatedData);
                      setFormData(formrecord);
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
      </>
    );
  };

  const columns = [
    {
      name: "Board Meeting Date",
      selector: (row) => {
        if (row.others == undefined) return null;
        //26 July 2024, at 10AM
        return moment(row.others.actual_meeting).format(
          "DD MMMM YYYY, hh:mm A"
        );
      },
      cell: (row) => {
        if (row.others == undefined) return null;
        //26 July 2024, at 10AM
        return moment(row.others.actual_meeting).format(
          "DD MMMM YYYY, hh:mm A"
        );
      },
      sortable: true,
    },
    {
      name: "Type of Meeting",
      selector: (row) => row.type_of_meeting,
      cell: (row) => row.type_of_meeting,

      sortable: true,
    },
    {
      name: "Place of Meeting",

      selector: (row) => {
        if (row.others == undefined) return null;
        return row.others.place_of_meeting;
      },
      cell: (row) => {
        if (row.others == undefined) return null;
        return row.others.place_of_meeting;
      },
      sortable: true,
    },
    {
      name: "Quorum",
      selector: (row) => row.status,
      cell: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="flex flex-row items-center justify-end gap-2">
            {row.status === "Notice Completed" && (
              <Link to={`/company/${companyId}/minutes-of-meeting`}>
                <div className="tooltip" data-tip="Go to Minutes of Meeting">
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
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                    />
                  </svg>
                </div>
              </Link>
            )}
            {row.status === "Notice Completed" && (
              <img
                src={gdriveIcon}
                alt=""
                className="cursor-pointer"
                onClick={() => {
                  setErrors([]);
                  if (row.others == null) {
                    setFormData({ ...row, others: other_details });
                  } else {
                    setFormData(row);
                  }
                  document.getElementById("gdrive").showModal();
                }}
              />
            )}

            <button
              onClick={() => {
                dispatch(selectNoticeOfMeeting(row));
                navigate(
                  `/company/${companyId}/notice-of-meeting/view/${row.nomId}`
                );
              }}
            >
              <svg
                width="44"
                height="37"
                viewBox="0 0 44 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="44" height="37" rx="10" fill="#273069" />
                <path
                  d="M22.0001 20.6429C23.1576 20.6429 24.096 19.6835 24.096 18.5C24.096 17.3165 23.1576 16.3571 22.0001 16.3571C20.8425 16.3571 19.9041 17.3165 19.9041 18.5C19.9041 19.6835 20.8425 20.6429 22.0001 20.6429Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 18.5C13.3354 14.1531 17.3075 11 22 11C26.6925 11 30.6646 14.1531 32 18.5C30.6646 22.8469 26.6925 26 22 26C17.3075 26 13.3354 22.8469 12 18.5ZM26.192 18.5C26.192 20.8669 24.3152 22.7857 22.0001 22.7857C19.6849 22.7857 17.8081 20.8669 17.8081 18.5C17.8081 16.1331 19.6849 14.2143 22.0001 14.2143C24.3152 14.2143 26.192 16.1331 26.192 18.5Z"
                  fill="white"
                />
              </svg>
            </button>

            <button
              onClick={() => {
                toggleDelete(row.nomId);
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

  const conditionalRowStyles = [
    {
      when: (row) => row.status == "Notice Completed",
      style: {
        filter: "grayscale(100%)",
        backgroundColor: "#D8D8D8",
      },
    },
  ];

  useEffect(() => {
    fetchRecords();
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
            { goto: "/", text: "Minutes of Meetings" },
          ]}
        />
      </div>
      <div>
        <div className="flex flex-row w-full justify-between items-center mt-5">
          <div className="flex flex-row justify-between w-full">
            <div className="poppins-bold text-color-2 text-[24px] flex items-center">
              Minutes of Meeting
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">{table}</div>

        {/* <div className="pb-5">
          <DataTable
            columns={columns}
            data={[]}
            persistTableHead={true}
            customStyles={customStyles}
            theme="customized"
            conditionalRowStyles={conditionalRowStyles}
          />
        </div> */}
      </div>

      {dialogComponents()}
    </>
  );
};
export default MinutesOfMeetings;
