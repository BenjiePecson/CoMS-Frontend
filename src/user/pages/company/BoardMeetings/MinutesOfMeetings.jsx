import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header";
import { showAlert } from "../../../../assets/global";
import axios from "axios";

const MinutesOfMeetings = () => {
  const { companyId } = useParams();
  const companyRecords = useSelector((state) => state.records.records);
  const minutesOfMeeting = {
    proposed_meeting_date: "",
    type_of_meeting: "",
    place_of_meeting: "",
    quorum: "",
  };
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState(minutesOfMeeting);
  const [records, setRecords] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();

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
            <th className="w-[10%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.length !== 0 ? (
            records.map((record, index) => {
              return (
                <tr key={index}>
                  <td>{record.proposed_meeting_date}</td>
                  <td>{record.type_of_meeting}</td>
                  <td>{record.place_of_meeting}</td>
                  <td>{record.quorum}</td>
                  <td>
                    <div className="flex flex-row justify-between gap-2">
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
          console.log(response.data);
          if (response.data.success) {
            let updatedRecords = records.map((record, index) => {
              if (index === selectedIndex) {
                return {
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

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex flex-row w-full justify-between items-center mt-5">
        <div className="flex flex-row justify-between w-full">
          <div className="poppins-bold text-color-2 text-[24px] flex items-center">
            Minutes of Meeting
          </div>
          <div></div>
        </div>
      </div>

      <div className="overflow-x-auto">{table}</div>

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
    </div>
  );
};
export default MinutesOfMeetings;
