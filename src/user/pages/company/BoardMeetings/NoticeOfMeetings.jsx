import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header";
import { convertBase64, showAlert, showToast } from "../../../../assets/global";
import axios from "axios";
import Swal from "sweetalert2";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoticeOfMeetings = () => {
  const { companyId } = useParams();
  const companyRecords = useSelector((state) => state.records.records);
  const file = {
    fileId: "",
    file: "",
    fileName: "",
    fileLink: "",
  };
  const noticeOfMeeting = {
    notice_date: "",
    type_of_meeting: "",
    proposed_meeting_date: "",
    actual_meeting_date: "",
    status: "",
    folder_id: "",
    files: [],
  };

  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState(noticeOfMeeting);
  const [records, setRecords] = useState([]);

  const [files, setFiles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();

  const [loading, setLoading] = useState(false);

  const [isGrid, setIsGrid] = useState(false);
  const [isLoadingGdrive, setIsLoadingGdrive] = useState(true);

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
            <th>Attached Files</th>
            <th>Link to Minutes of Meeting</th>
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
                  </td>
                  <td>
                    {record.status === "Notice Completed" && (
                      <div className="flex flex-row items-center justify-center">
                        <Link to={`/company/${companyId}/minutes-of-meeting`}>
                          <div>
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
                      </div>
                    )}
                  </td>
                  <td>
                    {/* {record.status != "Notice Completed" && ( */}
                    <div className="flex flex-row justify-between gap-2">
                      {/* <button
                        onClick={() => {
                          setSelectedIndex(index);
                          setFormData(record);
                          // setErrors([]);
                          document.getElementById("gdrive").showModal();
                        }}
                        // disabled={record.status != "Notice Completed"}
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
                            toggleDelete(record.nomId);
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
              <td colSpan={7}>No records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );

  const handleSubmit = async (e, isEdit = false) => {
    setLoading(true);
    if (await isFormValid(isEdit)) {
      if (isEdit) {
        //for edit function

        let status = "error";
        let message = "Failed to update the record.";

        // if (formData.status === "Notice Completed") {
        //   toggleCompleted();
        //   return;
        // }

        try {
          let response = await axios.patch(
            `/notice-of-meeting/${companyId}`,
            formData
          );

          console.log(response.data);

          let updated = response.data.data[0];

          if (response.data.success) {
            status = "success";
            message = "Record was added successfully.";
            setFormData(noticeOfMeeting);

            let updatedData = records.map((record, index) => {
              if (record.nomId == updated.nomId) {
                record = {
                  ...record,
                  notice_date: updated.noticeDate,
                  proposed_meeting_date: updated.proposedMeetingDate,
                  type_of_meeting: updated.typeOfMeeting,
                  files: updated.files,
                  status: updated.status,
                };
              }
              return record;
            });
            setRecords(updatedData);
          }
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
          let response = await axios.post(
            `/notice-of-meeting/${companyId}`,
            formData
          );

          console.log(response.data);
          if (response.data.success) {
            let data = response.data;
            formData.nomId = data.data[0].nomId;
            formData.files = data.files;

            console.log(formData);
            setRecords([...records, formData]);
            setFormData(noticeOfMeeting);
            status = "success";
            message = "Record was added successfully.";
          }
        } catch (error) {
          console.log(error);
        } finally {
          showAlert(status, message);
          setFormData(noticeOfMeeting);
          document.getElementById("addModal").close();
        }
      }
    }
    setLoading(false);
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

    if (formData.files.length === 0 && formData.status == "Notice Completed") {
      newErrors.files = "Please attach a file";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length == 0;
  };

  const toggleDelete = (nomId) => {
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
          console.log(nomId);
          let response = await axios.delete(
            `/notice-of-meeting/${companyId}/${nomId}`
          );
          if (response.data.success) {
            status = "success";
            message = "Record deleted successfully!";
            setRecords((data) => data.filter((u) => u.nomId !== nomId));
          }
        } catch (error) {
          console.error("Error deleting a record: ", error);
        } finally {
          showAlert(status, message);
        }
      }
    });
  };

  const toggleCompleted = (index) => {
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You won't be able to revert this!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#CF0404",
    //   confirmButtonText: "Yes, delete it!",
    //   cancelButtonColor: "#B4B4B8",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     let status = "";
    //     let message = "";
    //     try {
    //       status = "success";
    //       message = "Record deleted successfully!";
    //       // setRecords((data) => data.filter((u, idx) => idx !== index));
    //     } catch (error) {
    //       status = "error";
    //       message = "Failed to delete record";
    //       console.error("Error deleting a record: ", error);
    //     } finally {
    //       showAlert(status, message);
    //     }
    //   }
    // });
  };

  const fetchRecords = async () => {
    try {
      let response = await axios.get(`/notice-of-meeting/${companyId}`);
      setRecords(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRecords();
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
                    files: [],
                    type_of_meeting: "Regular",
                    status: "In Process",
                    folder_id: "",
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

            {formData.status == "Notice Completed" && (
              <div>
                {/* <label className="form-control w-full">
                  <div className="label">
                    <span className="poppins-regular text-[12px]">
                      Google Drive Folder ID
                    </span>
                  </div>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.folder_id && `input-error`
                    }`}
                    name="folder_id"
                    value={formData.folder_id}
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                  />
                  {errors.notice_date && (
                    <span className="text-[12px] text-red-500">
                      {errors.folder_id}
                    </span>
                  )}
                </label> */}

                <label className="form-control w-full">
                  <div className="label">
                    <span className="poppins-regular text-[12px]">
                      Attach Files
                    </span>
                  </div>
                  <div className="flex flex-col w-full h-20 border border-dashed rounded-lg  justify-center items-center hover:border-primary text-gray-400 hover:text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <h1 className="">Add files here</h1>
                  </div>
                  <input
                    type="file"
                    hidden
                    name="file"
                    multiple
                    onChange={async (e) => {
                      const { name, value, files } = e.target;

                      for (let i = 0; i < files.length; i++) {
                        if (files[i].size > 5 * 1024 * 1024) {
                          setErrors({
                            ...errors,
                            files: `${files[i].name} file size exceeds 5MB. Please choose a smaller file.`,
                          });
                          return;
                        } else {
                          let file = {
                            file: await convertBase64(files[i]),
                            fileName: files[i].name,
                          };
                          formData.files.push(file);
                        }
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
                    <span className="text-[12px] text-red-500">
                      {errors.files}
                    </span>
                  )}
                </label>
                <div className="flex flex-col gap-2">
                  {formData.files.map((file, index) => {
                    return (
                      <div key={`file ${index}`}>
                        <div className="flex flex-row items-center gap-2">
                          <div className="px-5 py-2 rounded-full bg-neutral text-white text-xs">
                            {file.fileName}
                          </div>
                          <button
                            onClick={() => {
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
              </div>
            )}

            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className="btn bg-primary text-white mt-2"
              disabled={loading}
            >
              {loading && <span className="loading loading-spinner"></span>}
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
                value={formData.type_of_meeting}
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
                  Actual Meeting Date <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="date"
                className={`input input-bordered w-full ${
                  errors.actual_meeting_date && `input-error`
                }`}
                name="actual_meeting_date"
                value={formData.actual_meeting_date}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
              {errors.actual_meeting_date && (
                <span className="text-[12px] text-red-500">
                  {errors.actual_meeting_date}
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
                value={formData.status}
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

            {formData.status == "Notice Completed" && (
              <div>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="poppins-regular text-[12px]">
                      Attach Files
                    </span>
                  </div>
                  <div className="flex flex-col w-full h-20 border border-dashed rounded-lg  justify-center items-center hover:border-primary text-gray-400 hover:text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <h1>Add files here</h1>
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
                    <span className="text-[12px] text-red-500">
                      {errors.files}
                    </span>
                  )}
                </label>
                <div className="flex flex-col gap-2">
                  {formData.files.map((file, index) => {
                    return (
                      <div key={`file ${index}`}>
                        <div className="flex flex-row items-center gap-2">
                          <div className="px-5 py-2 rounded-full bg-neutral text-white text-xs">
                            {file.fileName}
                          </div>
                          <button
                            onClick={() => {
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
              </div>
            )}
            <button
              onClick={(e) => {
                handleSubmit(e, true);
              }}
              className="btn bg-primary text-white mt-2"
              disabled={loading}
            >
              {loading && <span className="loading loading-spinner"></span>}
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
              <h3 className="font-bold text-lg">Attached Files</h3>
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
              <iframe
                className={`w-full max-w-5xl max-h-96 h-96 ${
                  isLoadingGdrive ? "hidden" : ""
                }`}
                onLoad={() => {
                  setIsLoadingGdrive(false);
                }}
                src={`https://drive.google.com/embeddedfolderview?id=${
                  formData.folder_id == ""
                    ? "1wkoVU5i-w-Ll3MoSD65bvn4RMu0lG36Y"
                    : formData.folder_id
                }#${isGrid ? "grid" : "list"}`}
                // style="width:100%; height:600px; border:0;"
              ></iframe>
            </div>
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
          </div>
        </div>
      </dialog>
    </>
  );
};

export default NoticeOfMeetings;
