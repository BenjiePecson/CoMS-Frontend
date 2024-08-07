import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Breadcrumbs from "../../../../components/Breadcrumbs";

import { useDispatch, useSelector } from "react-redux";
import PDFViewerNOM from "./PDFViewerNOM";
import { showToast } from "../../../../../assets/global";
import axios from "axios";

const CreateNOM = () => {
  const { companyId } = useParams();
  const companyRecords = useSelector((state) => state.records.records);
  const selectedCompany = useSelector((state) => state.company.selectedCompany);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const other_details = {
    actual_meeting: "", //moment().format("yyyy-MM-DDThh:mm")
    confirmation_meeting: "",
    notice_meeting: "",
    place_of_meeting: "Video Conference",
    agendas: [],
    director: "",
    email: "",
  };

  const noticeOfMeeting = {
    notice_date: "",
    type_of_meeting: "Regular",
    proposed_meeting_date: "",
    // actual_meeting_date: "",
    status: "Drafted",
    folder_id: "",
    files: [],
    others: other_details,
  };
  const [formData, setFormData] = useState(noticeOfMeeting);
  const [errors, setErrors] = useState({});
  const [listOfDirectors, setListOfDirectors] = useState([]);
  const [selectedDirector, setSelectedDirector] = useState("");

  const list_of_agendas = [
    "Call to order",
    "Certification of Notice and quorum of the Meeting",
    "Approval of Authorized Representative to Transact with the Government Agencies",
    "Approval of Authorized Representative to Transact with the Banks",
    "Approval of Authorized Representative to Transact with the Telecommunications Company",
    "Approval of Authorized Signatories for Government Agencies",
    "Approval of Authorized Signatories for Banks",
    "Approval of Authorized Signatories for Telecommunications Company",
    "Resignation and Replacement of Officers",
    "Resignation and Replacement of Board of Director",
    "Election of New Officers",
    "Election of New Board of Directors",
    "Transfer of Shares of Stock",
    "Annual submission of AFS",
    "Annual submission of GIS",
    "Appointment of a Tax Representative",
    "Declaration of Dividends out of the (YEAR) Unrestricted Retained Earnings",
    "Adjournment",
  ];

  const filteredListOfDirectors = listOfDirectors.map((director) => {
    return {
      name: director.name,
      position: director.officer,
    };
  });

  const directors_options = filteredListOfDirectors.map((director, index) => {
    return `${director.name} - ${director.position}`;
  });

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

    if (name == "folder_id") {
      if (value == "") {
        error = "Folder ID is required";
        setErrors({
          ...errors,
          folder_id: error,
        });
      } else {
        setErrors({ ...errors, folder_id: "" });
      }
    }
  };

  const isFormValid = async (isEdit) => {
    let newErrors = {};

    // if (formData.notice_date == "") {
    //   newErrors.notice_date = "Notice Date is required";
    // }

    // if (formData.type_of_meeting == "") {
    //   newErrors.type_of_meeting = "Type of Meeting is required";
    // }

    // if (formData.proposed_meeting_date == "") {
    //   newErrors.proposed_meeting_date = "Proposed Meeting Date is required";
    // }

    // if (formData.status == "") {
    //   newErrors.status = "Status is required";
    // }

    if (formData.folder_id == "" && formData.status == "Notice Completed") {
      newErrors.folder_id = "Folder ID is required";
    }

    // if (formData.files.length === 0 && formData.status == "Notice Completed") {
    //   newErrors.files = "Please attach a file";
    // }

    if (formData.others.actual_meeting == "") {
      newErrors.actual_meeting = "Actual Meeting Date and Time is required";
    }

    if (formData.others.agendas.length == 0) {
      newErrors.agendas = "Please select agenda";
    }

    if (formData.others.director == "") {
      newErrors.director = "Director is required";
    }

    if (formData.others.confirmation_meeting == "") {
      newErrors.confirmation_meeting =
        "Confirmation Meeting Date and Time is required";
    }

    if (formData.others.notice_meeting == "") {
      newErrors.notice_meeting =
        "Proxy Notice Meeting Date and Time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length == 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (await isFormValid()) {
      //for edit function

      let status = "error";
      let message = "Failed to update the record.";

      try {
        setLoading(true);
        let response = await axios.post(
          `/notice-of-meeting/${companyId}`,
          formData
        );
        if (response.data.success) {
          status = "success";
          message = "Record was added successfully.";
          navigate(`/company/${companyId}/notice-of-meeting/`);
        }
      } catch (error) {
        console.log(error);
      } finally {
        showToast(status, message);
        // setFormData(noticeOfMeeting);
        setLoading(false);
      }
    } else {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (Object.keys(selectedCompany.latestGIS).length) {
      setListOfDirectors(selectedCompany.latestGIS.directors_or_officers);
      if (selectedCompany.latestGIS.directors_or_officers.length != 0) {
        let director_name = `${selectedCompany.latestGIS.directors_or_officers[0].name} - ${selectedCompany.latestGIS.directors_or_officers[0].officer}`;
        other_details.director = director_name;
        setFormData({ ...noticeOfMeeting, others: other_details });
        setSelectedDirector(director_name);
      }
    }
  }, [selectedCompany]);

  const progressMap = () => {
    return (
      <div className="flex flex-col w-full md:w-[30%] p-5 rounded-lg gap-2">
        <div className="text-lg font-bold w-full">
          <div className="flex flex-row gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd"
              />
            </svg>
            Progress Map
          </div>
        </div>
        <hr />
        <ul className="steps steps-horizontal md:steps-vertical p-2 text-sm">
          <li className="step step-primary" data-content="">
            In Process
          </li>
          <li className="step" data-content="">
            Drafted
          </li>
          <li className="step" data-content="">
            Sent
          </li>
          <li className="step" data-content="">
            Notice Completed
          </li>
        </ul>
      </div>
    );
  };

  const btnPreview = () => {
    return (
      <button
        type="button"
        onClick={async (e) => {
          document.getElementById("previewModal").showModal();
        }}
        className="btn btn-outline mt-2"
      >
        Preview File
      </button>
    );
  };

  const btnSubmit = () => {
    return (
      <button type="submit" className="btn bg-primary text-white mt-2">
        {loading && <span className="loading loading-spinner"></span>}
        Mark as Drafted
      </button>
    );
  };

  const formsComponent = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            <label className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  Actual Meeting Date and Time{" "}
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="datetime-local"
                className={`input input-bordered w-full ${
                  errors.actual_meeting && `input-error`
                }`}
                value={formData.others.actual_meeting}
                onChange={(ev) => {
                  if (ev.target.value != "") {
                    let update_others = {
                      ...formData.others,
                      actual_meeting: ev.target.value,
                    };
                    setFormData({
                      ...formData,
                      others: update_others,
                    });
                    setErrors({
                      ...errors,
                      actual_meeting: "",
                    });
                  } else {
                    setErrors({
                      ...errors,
                      actual_meeting: "Actual Meeting is required",
                    });
                  }
                }}
              />
              {errors.actual_meeting && (
                <span className="text-[12px] text-red-500">
                  {errors.actual_meeting}
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
                <option>Special</option>
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
                  Director <span className="text-red-500">*</span>
                </span>
              </div>
              <select
                className={`select select-bordered w-full ${
                  errors.director && `select-error`
                }`}
                name="type_of_meeting"
                value={formData.others.director}
                onChange={(ev) => {
                  if (ev.target.value != "") {
                    let update_others = {
                      ...formData.others,
                      director: ev.target.value,
                    };
                    setFormData({
                      ...formData,
                      others: update_others,
                    });
                    setErrors({
                      ...errors,
                      director: "",
                    });
                  } else {
                    setErrors({
                      ...errors,
                      director: "Director is required",
                    });
                  }
                }}
              >
                {directors_options.map((value, index) => {
                  return (
                    <option value={value} key={`options-${index}`}>
                      {value}
                    </option>
                  );
                })}
              </select>
              {errors.director && (
                <>
                  <span className="text-[12px] text-red-500">
                    {errors.director}
                  </span>
                  <span className="text-[12px]">
                    <span className="font-bold"> Note: </span>
                    Please check if there is an existing GIS File with a list of
                    directors.
                  </span>
                </>
              )}
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  Place of Meeting <span className="text-red-500">*</span>
                </span>
              </div>
              <select
                className={`select select-bordered w-full ${
                  errors.place_of_meeting && `select-error`
                }`}
                name="type_of_meeting"
                value={formData.others.place_of_meeting}
                onChange={(ev) => {
                  if (ev.target.value != "") {
                    let value = "";
                    if (ev.target.value != "Physical Address") {
                      value = ev.target.value;
                    }
                    let update_others = {
                      ...formData.others,
                      place_of_meeting: value,
                    };
                    setFormData({
                      ...formData,
                      others: update_others,
                    });
                    setErrors({
                      ...errors,
                      place_of_meeting: "",
                    });
                  } else {
                    setErrors({
                      ...errors,
                      place_of_meeting: "Place of Meeting is required",
                    });
                  }
                }}
              >
                <option>Physical Address</option>
                <option>Video Conference</option>
                <option>Teleconference</option>
              </select>
              {errors.type_of_meeting && (
                <span className="text-[12px] text-red-500">
                  {errors.type_of_meeting}
                </span>
              )}
            </label>

            {formData.others.place_of_meeting != "Video Conference" &&
              formData.others.place_of_meeting != "Teleconference" && (
                <label className="form-control w-full col-span-2">
                  <div className="label">
                    <span className="poppins-regular text-[12px]">
                      Physical Address <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    className={`input input-bordered w-full`}
                    placeholder="Please input the address"
                    value={formData.others.place_of_meeting}
                    onChange={(ev) => {
                      if (ev.target.value != "") {
                        let update_others = {
                          ...formData.others,
                          place_of_meeting: ev.target.value,
                        };
                        setFormData({
                          ...formData,
                          others: update_others,
                        });
                        setErrors({
                          ...errors,
                          place_of_meeting: "",
                        });
                      } else {
                        setErrors({
                          ...errors,
                          place_of_meeting: "Place of Meeting is required",
                        });
                      }
                    }}
                  />
                </label>
              )}

            <label className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  Confirmation Meeting Date and Time{" "}
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="datetime-local"
                className={`input input-bordered w-full ${
                  errors.confirmation_meeting && `input-error`
                }`}
                value={formData.others.confirmation_meeting}
                onChange={(ev) => {
                  if (ev.target.value != "") {
                    let update_others = {
                      ...formData.others,
                      confirmation_meeting: ev.target.value,
                    };
                    setFormData({
                      ...formData,
                      others: update_others,
                    });
                    setErrors({
                      ...errors,
                      confirmation_meeting: "",
                    });
                  } else {
                    setErrors({
                      ...errors,
                      confirmation_meeting:
                        "Confirmation Meeting Date and Time is required",
                    });
                  }
                }}
              />
              {errors.confirmation_meeting && (
                <span className="text-[12px] text-red-500">
                  {errors.confirmation_meeting}
                </span>
              )}
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  Proxy Notice Meeting Date and Time{" "}
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="datetime-local"
                className={`input input-bordered w-full ${
                  errors.notice_meeting && `input-error`
                }`}
                value={formData.others.notice_meeting}
                onChange={(ev) => {
                  if (ev.target.value != "") {
                    let update_others = {
                      ...formData.others,
                      notice_meeting: ev.target.value,
                    };
                    setFormData({
                      ...formData,
                      others: update_others,
                    });
                    setErrors({
                      ...errors,
                      notice_meeting: "",
                    });
                  } else {
                    setErrors({
                      ...errors,
                      notice_meeting:
                        "Proxy Notice Meeting Date and Time is required",
                    });
                  }
                }}
              />
              {errors.notice_meeting && (
                <span className="text-[12px] text-red-500">
                  {errors.notice_meeting}
                </span>
              )}
            </label>

            {/* <label className="form-control w-full">
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
                </label> */}

            {formData.status == "Notice Completed" && (
              <div>
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
                      errors.folder_id && `input-error`
                    }`}
                    name="folder_id"
                    value={formData.folder_id}
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                  />
                  {errors.folder_id && (
                    <span className="text-[12px] text-red-500">
                      {errors.folder_id}
                    </span>
                  )}
                </label>

                {/* <label className="form-control w-full">
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
                </div> */}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2  items-start">
            <div className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  Agendas <span className="text-red-500">*</span>
                </span>
              </div>

              {errors.agendas && (
                <div className="flex flex-row gap-2 items-center text-[12px] text-red-500 pb-4">
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
                  {errors.agendas}
                </div>
              )}

              <div className="flex flex-col gap-2 form-control">
                <div className="grid grip-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 w-full">
                  {list_of_agendas.map((agenda, index) => {
                    return (
                      <div
                        className="flex flex-row gap-3 items-center"
                        key={`agenda-${index}`}
                      >
                        <input
                          type="checkbox"
                          className="checkbox"
                          value={agenda}
                          name={agenda}
                          checked={formData.others.agendas.includes(agenda)}
                          onChange={(ev) => {
                            if (ev.target.checked) {
                              // setSelectedAgendas([...selectedAgendas, agenda]);
                              let update_others = {
                                ...formData.others,
                                agendas: [...formData.others.agendas, agenda],
                              };
                              setFormData({
                                ...formData,
                                others: update_others,
                              });
                              if (update_others.agendas.length == 0) {
                                setErrors({
                                  ...errors,
                                  agendas: "Please select agenda",
                                });
                              } else {
                                setErrors({
                                  ...errors,
                                  agendas: "",
                                });
                              }
                            } else {
                              const selected_agendas =
                                formData.others.agendas.filter(
                                  (val) => val != ev.target.value
                                );
                              const update_others = {
                                ...formData.others,
                                agendas: selected_agendas,
                              };
                              if (update_others.agendas.length == 0) {
                                setErrors({
                                  ...errors,
                                  agendas: "Please select agenda",
                                });
                              } else {
                                setErrors({
                                  ...errors,
                                  agendas: "",
                                });
                              }
                              setFormData({
                                ...formData,
                                others: update_others,
                              });
                            }
                          }}
                        />
                        <span className="label-text">{agenda}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            {btnPreview()}
            {btnSubmit()}
          </div>
        </form>
      </>
    );
  };

  const dialogComponents = () => {
    return (
      <>
        {/* Preview PDF Modal */}
        <dialog id="previewModal" className="modal">
          <div className="modal-box w-11/12 max-w-5xl p-0 rounded-none">
            <PDFViewerNOM
              selectedCompany={selectedCompany}
              formData={formData}
            />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col">
        <div>
          <Breadcrumbs
            lists={[
              { goto: "/", text: "Home" },
              {
                goto: `/company/${selectedCompany.companyId}`,
                text: `${selectedCompany.companyName}`,
              },
              {
                goto: `/company/${selectedCompany.companyId}/notice-of-meeting`,
                text: "Notice of Meetings",
              },
              { goto: "/", text: "Create New" },
            ]}
          />
        </div>

        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-col sm:flex-row justify-between w-full gap-2">
            <div className="poppins-bold text-color-2 text-[24px] flex items-center">
              Create New Notice of Meeting
            </div>
            <div>
              <Link
                to={`/company/${companyId}/notice-of-meeting/`}
                className="btn btn-outline text-primary w-full flex flex-row btn-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
                Go back
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-2 py-5 items-start">
          <div className="flex flex-col w-full bg-white p-5 rounded-lg gap-5 shadow-lg">
            {formsComponent()}
          </div>
          {progressMap()}
        </div>
      </div>

      {dialogComponents()}
    </>
  );
};

export default CreateNOM;
