import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { fetchRecords } from "../../../store/GIS/GISRecordSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header";

const MinutesOfMeetings = () => {
  const { companyId } = useParams();
  const companyRecords = useSelector((state) => state.records.records);
  const minutesOfMeeting = {
    board_meeting_date: "",
    type_of_meeting: "",
    place_of_meeting: "",
    qourum: "",
  };
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState(minutesOfMeeting);
  const [records, setRecords] = useState([
    {
      board_meeting_date: "2024-05-01",
      type_of_meeting: "Regular",
      place_of_meeting: "",
      qourum: "",
    },
  ]);
  const [selectedIndex, setSelectedIndex] = useState();

  const dispatch = useDispatch();

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
                  <td>{record.board_meeting_date}</td>
                  <td>{record.type_of_meeting}</td>
                  <td>{record.place_of_meeting}</td>
                  <td>{record.qourum}</td>
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

  useEffect(() => {
    dispatch(fetchRecords(companyId));
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
                  errors.board_meeting_date && `input-error`
                }`}
                name="notice_date"
                value={formData.board_meeting_date}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
              {errors.board_meeting_date && (
                <span className="text-[12px] text-red-500">
                  {errors.board_meeting_date}
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
              <textarea className="textarea textarea-bordered h-24"></textarea>
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
                    name="radio-2"
                    className="radio radio-primary"
                    value={"Yes"}
                    onChange={(e)=>{
                      console.log(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-row gap-2">
                  <span>No</span>
                  <input
                    type="radio"
                    name="radio-2"
                    className="radio radio-primary"
                    value={"No"}
                    onChange={(e)=>{
                      console.log(e.target.value);
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
``
export default MinutesOfMeetings;
