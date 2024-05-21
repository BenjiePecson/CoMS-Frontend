import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { fetchRecords } from "../../../store/GIS/GISRecordSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header";
import { showAlert } from "../../../../assets/global";
import axios from "axios";

const BoardResolutions = () => {
  const { companyId } = useParams();
  const companyRecords = useSelector((state) => state.records.records);
  const dispatch = useDispatch();

  const boardResolution = {
    type_of_meeting: "",
    board_meeting_date: "",
    resolution_id: "",
    description: "",
  };

  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState(boardResolution);
  const [boardMeetingDates, setBoardMeetingDates] = useState([]);

  const table = (
    <>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Type</th>
            <th>Resolution ID</th>
            <th>Board Meeting Date</th>
            <th>Description</th>
            <th className="w-[10%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.length !== 0 ? (
            records.map((record, index) => {
              return (
                <tr key={index}>
                  <td>{record.type_of_meeting}</td>
                  <td>{record.resolution_id}</td>
                  <td>{record.board_meeting_date}</td>
                  <td>{record.description}</td>
                  <td>
                    <div className="flex flex-row gap-2">
                      <button
                        onClick={() => {
                          console.log("Edit");
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
                      <button
                        onClick={() => {
                          console.log("delete");
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
    setLoading(true);
    if (await isFormValid(isEdit)) {
      if (isEdit) {
        //for edit function
        return;
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
        let message = "Failed to add the record.";

        try {
          // let response = await axios.post(
          //   `/board-resolution/${companyId}`,
          //   formData
          // );

          // console.log(response.data);
          // if (response.data.success) {
          //   let data = response.data;
          //   console.log(data);
          //   formData.nomId = data.data[0].nomId;
          //   formData.files = data.files;

          //   console.log(formData);
          //   setRecords([...records, formData]);
          //   setFormData(noticeOfMeeting);
          //   status = "success";
          //   message = "Record was added successfully.";
          // }
          status = "success";
          message = "Record was added successfully.";
          setRecords([...records, formData]);
        } catch (error) {
          console.log(error);
        } finally {
          showAlert(status, message);
          setFormData(boardResolution);
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
    if (name == "resolution_id") {
      if (value == "") {
        error = "Resolution ID is required";
        setErrors({
          ...errors,
          resolution_id: error,
        });
      } else {
        setErrors({ ...errors, resolution_id: "" });
      }
    }

    if (name == "board_meeting_date") {
      if (value == "") {
        error = "Board Meeting Date is required";
        setErrors({
          ...errors,
          board_meeting_date: error,
        });
      } else {
        setErrors({ ...errors, board_meeting_date: "" });
      }
    }

    if (name == "description") {
      if (value == "") {
        error = "Description is required";
        setErrors({
          ...errors,
          description: error,
        });
      } else {
        setErrors({ ...errors, description: "" });
      }
    }
  };

  const isFormValid = async (isEdit) => {
    let newErrors = {};

    if (formData.type_of_meeting == "") {
      newErrors.type_of_meeting = "Type of Meeting is required";
    }

    if (formData.resolution_id == "") {
      newErrors.resolution_id = "Resolution ID is required";
    }

    if (formData.board_meeting_date == "") {
      newErrors.board_meeting_date = "Board Meeting Date is required";
    }

    if (formData.description == "") {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length == 0;
  };

  const fetchBoardMeetingDates = async () => {
    try {
      let response = await axios.get(`/board-resolutions/${companyId}`);
      console.log(response.data);
      let dates = [];

      response.data.map((date, index) => {
        dates.push(date.proposed_meeting_date);
      });
      console.log(dates);
      setBoardMeetingDates(dates);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchRecords(companyId));
    fetchBoardMeetingDates();
    console.log();
  }, []);

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex flex-row w-full justify-between items-center mt-5">
        <div className="flex flex-row justify-between w-full">
          <div className="poppins-bold text-color-2 text-[24px] flex items-center">
            Board Resolutions
          </div>
          <div className="flex flex-row items-center gap-5">
            <button
              className="btn bg-primary text-white"
              onClick={(e) => {
                setFormData({
                  ...formData,
                  type_of_meeting: "Regular",
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
              Add Board Resolution
            </button>

            <button
              className="btn btn-primary btn-outline text-white"
              onClick={(e) => {
                document.getElementById("previewDialog").showModal();
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
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                />
              </svg>
              Generate
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">{table}</div>

      <dialog id="addModal" className="modal">
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Add Board Resolution</h3>
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
                  Resolution ID <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                className={`input input-bordered w-full ${
                  errors.resolution_id && `input-error`
                }`}
                value={formData.resolution_id}
                name="resolution_id"
                onChange={(e) => {
                  handleOnChange(e);
                }}
              ></input>
              {errors.resolution_id && (
                <span className="text-[12px] text-red-500">
                  {errors.resolution_id}
                </span>
              )}
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  Board Meeting Date <span className="text-red-500">*</span>
                </span>
              </div>
              <select
                className={`select select-bordered w-full ${
                  errors.board_meeting_date && `select-error`
                }`}
                name="board_meeting_date"
                value={formData.board_meeting_date}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              >
                <option value={""} disabled>
                  Please select a date
                </option>
                {boardMeetingDates.map((date, index) => {
                  return (
                    <option key={index} value={date}>
                      {date}
                    </option>
                  );
                })}
              </select>
              {errors.board_meeting_date && (
                <span className="text-[12px] text-red-500">
                  {errors.board_meeting_date}
                </span>
              )}
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  Description <span className="text-red-500">*</span>
                </span>
              </div>
              <textarea
                className={`textarea textarea-bordered h-24 w-full ${
                  errors.description && `textarea-error`
                }`}
                value={formData.description}
                name="description"
                onChange={(e) => {
                  handleOnChange(e);
                }}
              ></textarea>
              {errors.description && (
                <span className="text-[12px] text-red-500">
                  {errors.description}
                </span>
              )}
            </label>

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

      <dialog id="previewDialog" className="modal">
        <div className="modal-box  w-11/12 max-w-5xl">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Secretary Certificate Preview</h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                ✕
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-2 h-96 items-end justify-end">
            <button
              onClick={(e) => {
                // handleSubmit(e);
              }}
              className="btn bg-primary text-white mt-2"
              disabled={loading}
            >
              {loading && <span className="loading loading-spinner"></span>}
              Download Secretary Certificate
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BoardResolutions;
