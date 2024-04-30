import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link, useParams } from "react-router-dom";

import { fetchRecords, renameRecordName } from "../../store/GIS/GISRecordSlice";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../../assets/global";
import axios from "axios";

const GISTracker = () => {
  const { companyId } = useParams();
  const companyRecords = useSelector((state) => state.records.records);
  const record = useSelector((state) => state.records.record);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState(record);

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
            <th>Files</th>
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
                  <td></td>
                  <td>
                    <Link
                      to={`/company/${companyId}/gis-tracker/${goto}/${record.recordId}`}
                    >
                      <button>
                        <svg
                          width="54"
                          height="38"
                          viewBox="0 0 54 38"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="54" height="38" rx="4" fill="#273069" />
                          <path
                            d="M27.0003 20C28.1048 20 29.0003 19.1046 29.0003 18C29.0003 16.8954 28.1048 16 27.0003 16C25.8957 16 25.0003 16.8954 25.0003 18C25.0003 19.1046 25.8957 20 27.0003 20Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M17.458 18C18.7323 13.9429 22.5226 11 27.0002 11C31.4778 11 35.2681 13.9429 36.5424 18C35.2682 22.0571 31.4778 25 27.0002 25C22.5226 25 18.7323 22.0571 17.458 18ZM31.0003 18C31.0003 20.2091 29.2094 22 27.0003 22C24.7911 22 23.0003 20.2091 23.0003 18C23.0003 15.7909 24.7911 14 27.0003 14C29.2094 14 31.0003 15.7909 31.0003 18Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                    </Link>
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

  useEffect(() => {
    dispatch(fetchRecords(companyId));
  }, []);

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex flex-row w-full justify-between items-center mt-5">
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

      <div className="overflow-x-auto">{table}</div>

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
    </div>
  );
};

export default GISTracker;
