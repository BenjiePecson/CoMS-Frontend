import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { fetchRecords } from "../../../store/GIS/GISRecordSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header";
import { convertBase64, showAlert } from "../../../../assets/global";
import axios from "axios";
import Swal from "sweetalert2";

const NoticeOfMeetings = () => {
  const { companyId } = useParams();
  const companyRecords = useSelector((state) => state.records.records);
  const file = {
    file: "",
    fileName: "",
  };
  const noticeOfMeeting = {
    notice_date: "",
    type_of_meeting: "",
    proposed_meeting_date: "",
    status: "",
    files: [],
  };

  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState(noticeOfMeeting);
  const [records, setRecords] = useState([
    {
      notice_date: "2024-05-01",
      type_of_meeting: "Regular",
      proposed_meeting_date: "2024-05-01",
      status: "In Process",
      files: []
    },
  ]);
  const [selectedIndex, setSelectedIndex] = useState();

  const table = (
    <>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Notice Date</th>
            <th>Type of Meeting</th>
            <th>Proposed Meeting Date</th>
            <th>Status</th>
            <th>Attached File</th>
            <th className="w-[10%] text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.length !== 0 ? (
            records.map((record, index) => {
              return (
                <tr
                  key={index}
                  className={
                    record.status != "Notice Completed"
                      ? "hover:bg-gray-200"
                      : "grayscale bg-gray-200"
                  }
                >
                  <td>{record.notice_date}</td>
                  <td>{record.type_of_meeting}</td>
                  <td>{record.proposed_meeting_date}</td>
                  <td>{record.status}</td>
                  <td>
                    <div className="flex flex-row items-center gap-2">
                      {record.fileName}
                      <a href={`/${record.fileName}`} target="_blank">
                        <svg
                          width="20"
                          height="14"
                          viewBox="0 0 20 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.54225 9C10.6468 9 11.5422 8.10457 11.5422 7C11.5422 5.89543 10.6468 5 9.54225 5C8.43768 5 7.54225 5.89543 7.54225 7C7.54225 8.10457 8.43768 9 9.54225 9Z"
                            fill="#111827"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 7.00004C1.27425 2.94291 5.06455 0 9.54221 0C14.0198 0 17.8101 2.94288 19.0844 6.99996C17.8101 11.0571 14.0198 14 9.54219 14C5.06456 14 1.27428 11.0571 0 7.00004ZM13.5422 7C13.5422 9.20914 11.7514 11 9.54225 11C7.33311 11 5.54225 9.20914 5.54225 7C5.54225 4.79086 7.33311 3 9.54225 3C11.7514 3 13.5422 4.79086 13.5422 7Z"
                            fill="#111827"
                          />
                        </svg>
                      </a>
                    </div>
                  </td>
                  <td>
                    {/* {record.status != "Notice Completed" && ( */}
                    <div className="flex flex-row justify-between gap-2">
                      {/* <button>
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
                      </button> */}
                      <button
                        onClick={() => {
                          if (record.status != "Notice Completed") {
                            setSelectedIndex(index);
                            setFormData(record);
                            // setErrors([]);
                            document.getElementById("editModal").showModal();
                          }
                        }}
                        disabled={record.status == "Notice Completed"}
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

                      <button
                        onClick={() => {
                          if (record.status != "Notice Completed") {
                            toggleDelete(index);
                          }
                        }}
                        disabled={record.status == "Notice Completed"}
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
                    {/* )} */}
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

        if(formData.status === "Notice Completed"){
          toggleCompleted();
          return;
        }

        try {
          let updatedRecords = records.map((record, index) => {
            if (index === selectedIndex) {
              return {
                notice_date: formData.notice_date,
                type_of_meeting: formData.type_of_meeting,
                proposed_meeting_date: formData.proposed_meeting_date,
                status: formData.status,
                file: formData.file,
                fileName: formData.fileName,
              };
            }
            return record;
          });

          setRecords(updatedRecords);
          setFormData(noticeOfMeeting);
          status = "success";
          message = "Record was added successfully.";

          console.log("Save");
        } catch (error) {
          console.log(error);
        } finally {
          showAlert(status, message);
          setFormData(noticeOfMeeting);
          document.getElementById("editModal").close();
        }
      } else {
        //for add function

        let status = "error";
        let message = "Failed to save the record.";

        try {
          // let response = await axios.post(`/board-meetings/notice-of-meeting/${companyId}`, formData);

          setRecords([...records, formData]);
          status = "success";
          message = "Record was added successfully.";
        } catch (error) {
          console.log(error);
        } finally {
          showAlert(status, message);
          setFormData(noticeOfMeeting);
          document.getElementById("addModal").close();
        }
      }
    } else {
      console.log("Invalid");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let error = "";
    //sets error message for company name input
    if (name == "notice_date") {
      if (value == "") {
        error = "Notice Date is required";
        setErrors({
          ...errors,
          notice_date: error,
        });
      } else {
        setErrors({ ...errors, notice_date: "" });
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

    if (name == "proposed_meeting_date") {
      if (value == "") {
        error = "Proposed Meeting Date is required";
        setErrors({
          ...errors,
          proposed_meeting_date: error,
        });
      } else {
        setErrors({ ...errors, proposed_meeting_date: "" });
      }
    }

    if (name == "status") {
      if (value == "") {
        error = "Status is required";
        setErrors({
          ...errors,
          status: error,
        });
      } else {
        setErrors({ ...errors, status: "" });
      }
    }
  };

  const isFormValid = async (isEdit) => {
    let newErrors = {};

    if (formData.notice_date == "") {
      newErrors.notice_date = "Notice Date is required";
    }

    if (formData.type_of_meeting == "") {
      newErrors.type_of_meeting = "Type of Meeting is required";
    }

    if (formData.proposed_meeting_date == "") {
      newErrors.proposed_meeting_date = "Proposed Meeting Date is required";
    }

    if (formData.status == "") {
      newErrors.status = "Status is required";
    }

    if (formData.files.length === 0 && !isEdit) {
      newErrors.files = "Please attach a file";
    }

    setErrors({ ...errors, ...newErrors });

    return Object.keys(newErrors).length == 0;
  };

  const toggleDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CF0404",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#B4B4B8",
    }).then((result) => {
      if (result.isConfirmed) {
        let status = "";
        let message = "";
        try {
          status = "success";
          message = "Record deleted successfully!";
          setRecords((data) => data.filter((u, idx) => idx !== index));
        } catch (error) {
          status = "error";
          message = "Failed to delete record";
          console.error("Error deleting a record: ", error);
        } finally {
          showAlert(status, message);
        }
      }
    });
  };

  const toggleCompleted = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CF0404",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#B4B4B8",
    }).then((result) => {
      if (result.isConfirmed) {
        let status = "";
        let message = "";
        try {
          status = "success";
          message = "Record deleted successfully!";
          // setRecords((data) => data.filter((u, idx) => idx !== index));
        } catch (error) {
          status = "error";
          message = "Failed to delete record";
          console.error("Error deleting a record: ", error);
        } finally {
          showAlert(status, message);
        }
      }
    });
  };

  useEffect(() => {
    dispatch(fetchRecords(companyId));
  }, []);

  return (
    <>
      <div>
        <div>
          <Header />
        </div>
        <div className="flex flex-row w-full justify-between items-center mt-5">
          <div className="flex flex-col sm:flex-row justify-between w-full gap-2">
            <div className="poppins-bold text-color-2 text-[24px] flex items-center">
              Notice of Meetings
            </div>
            <div>
              <button
                className="btn bg-primary text-white w-full flex flex-row"
                onClick={() => {
                  setFormData({
                    ...formData,
                    notice_date: "",
                    proposed_meeting_date: "",
                    file: "",
                    fileName: "",
                    type_of_meeting: "Regular",
                    status: "In Process",
                  });
                  setErrors([]);
                  document.getElementById("addModal").showModal();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Notice of Meeting
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mt-5">{table}</div>
      </div>

      <dialog id="addModal" className="modal">
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Add Notice of Meeting</h3>
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
                  Notice Date <span className="text-red-500">*</span>
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
                className={`select select-bordered w-full ${
                  errors.type_of_meeting && `select-error`
                }`}
                name="type_of_meeting"
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
                  Proposed Meeting Date <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="date"
                className={`input input-bordered w-full ${
                  errors.proposed_meeting_date && `input-error`
                }`}
                name="proposed_meeting_date"
                value={formData.proposed_meeting_date}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
              {errors.proposed_meeting_date && (
                <span className="text-[12px] text-red-500">
                  {errors.proposed_meeting_date}
                </span>
              )}
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  Status <span className="text-red-500">*</span>
                </span>
              </div>
              <select
                className={`select select-bordered w-full ${
                  errors.status && `select-error`
                }`}
                name="status"
                onChange={(e) => {
                  handleOnChange(e);
                }}
              >
                <option>In Process</option>
                <option>Drafted</option>
                <option>Sent</option>
                <option>Notice Completed</option>=
              </select>
              {errors.status && (
                <span className="text-[12px] text-red-500">
                  {errors.status}
                </span>
              )}
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  Attach Files
                </span>
              </div>
              <div className="flex flex-col w-full h-20 border border-dashed rounded-lg  justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                <h1 className="text-gray-400">Add files here</h1>
              </div>
              <input
                type="file"
                hidden
                name="file"
                multiple
                onChange={async (e) => {
                  const { name, value, files } = e.target;

                  for (let i = 0; i < files.length; i++) {
                    let file = {
                      file: await convertBase64(files[i]),
                      fileName: files[i].name,
                    };
                    formData.files.push(file);
                  }

                  setFormData({
                    ...formData,
                    files: formData.files,
                  });

                  let error = "";

                  if (formData.files.length == 0) {
                    error = "Please attach a file";
                    setErrors({
                      ...errors,
                      files: error,
                    });
                  } else {
                    setErrors({ ...errors, files: "" });
                  }

                }}
              />
              {errors.files && (
                <span className="text-[12px] text-red-500">{errors.files}</span>
              )}
            </label>
            <div className="flex flex-col gap-2">
              {formData.files.map((file, index) => {
                return (
                  <div key={`file ${index}`}>
                    <div className="flex flex-row items-center gap-2">
                      <div className="badge badge-neutral">{file.fileName}</div>
                      <button
                        onClick={() => {
                          console.log(`remove file ${index} ${file.fileName}`);
                          setFormData({
                            ...formData,
                            files: formData.files.filter(
                              (u, idx) => idx !== index
                            ),
                          });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 text-red-400"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className="btn bg-primary text-white mt-2"
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>

      <dialog id="editModal" className="modal">
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Edit Notice of Meeting</h3>
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
                  Notice Date <span className="text-red-500">*</span>
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
                onChange={(e) => {
                  handleOnChange(e);
                }}
              >
                <option>Regular</option>
                <option>Special</option>=
              </select>
              {errors.notice_date && (
                <span className="text-[12px] text-red-500">
                  {errors.notice_date}
                </span>
              )}
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  Proposed Meeting Date <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="date"
                className={`input input-bordered w-full ${
                  errors.proposed_meeting_date && `input-error`
                }`}
                name="proposed_meeting_date"
                value={formData.proposed_meeting_date}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
              {errors.proposed_meeting_date && (
                <span className="text-[12px] text-red-500">
                  {errors.proposed_meeting_date}
                </span>
              )}
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  Status <span className="text-red-500">*</span>
                </span>
              </div>
              <select
                className="select select-bordered"
                name="status"
                onChange={(e) => {
                  handleOnChange(e);
                }}
              >
                <option>In Process</option>
                <option>Drafted</option>
                <option>Sent</option>
                <option>Notice Completed</option>=
              </select>
              {errors.status && (
                <span className="text-[12px] text-red-500">
                  {errors.status}
                </span>
              )}
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">File</span>
              </div>
              <input
                type="file"
                className={`file-input file-input-bordered w-full ${
                  errors.file && `file-input-error`
                }`}
                name="file"
                onChange={async (e) => {
                  const { name, value, files } = e.target;
                  setFormData({
                    ...formData,
                    file: await convertBase64(files[0]),
                    fileName: files[0].name,
                  });
                }}
              />
              {errors.files && (
                <span className="text-[12px] text-red-500">{errors.files}</span>
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
    </>
  );
};

export default NoticeOfMeetings;
