import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Breadcrumbs from "../../../../components/Breadcrumbs";

import { useDispatch, useSelector } from "react-redux";
import PDFViewerNOM from "./PDFViewerNOM";
import { showToast } from "../../../../../assets/global";
import axios from "axios";
import {
  fetchNoticeOfMeeting,
  other_details,
  selectNoticeOfMeeting,
} from "../../../../store/boardmeetings/NoticeOfMeetingSlice";

const ViewNOMPage = () => {
  const { companyId, nomId } = useParams();

  const companyRecords = useSelector((state) => state.records.records);
  const selectedCompany = useSelector((state) => state.company.selectedCompany);
  const selectedNoticeOfMeeting = useSelector(
    (state) => state.noticeOfMeeting.selectednoticeOfMeeting
  );
  const noticeOfMeetingState = useSelector(
    (state) => state.noticeOfMeeting.noticeOfMeetingState
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isGrid, setIsGrid] = useState(false);
  const [isLoadingGdrive, setIsLoadingGdrive] = useState(true);
  const [errors, setErrors] = useState({});
  const [listOfDirectors, setListOfDirectors] = useState([]);
  const [editFolderID, setEditFolderID] = useState("");
  const [agenda, setAgenda] = useState("");

  const [formData, setFormData] = useState(noticeOfMeetingState);

  const list_of_agendas = [
    // "Call to Order",
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
    // "Adjournment",
  ];

  const [listOfAgendas, setListOfAgendas] = useState(list_of_agendas);
  const [listOfCustomAgendas, setListOfCustomAgendas] = useState([]);

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
      let newData = formData;

      if (selectedNoticeOfMeeting.status == "Drafted") {
        newData.status = "Sent";
      }

      if (selectedNoticeOfMeeting.status == "Sent") {
        newData.status = "Notice Completed";
      }

      try {
        setLoading(true);
        let response = await axios.patch(
          `/notice-of-meeting/${companyId}`,
          newData
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
    }
  }, [selectedCompany]);

  useEffect(() => {
    dispatch(fetchNoticeOfMeeting({ companyId, nomId }));
  }, []);

  useEffect(() => {
    if (selectedNoticeOfMeeting.nomId != "") {
      let others = noticeOfMeetingState.others;
      if (selectedNoticeOfMeeting.others != null) {
        others = selectedNoticeOfMeeting.others;
      }
      setFormData({
        ...formData,
        companyId: selectedNoticeOfMeeting.companyId,
        nomId: selectedNoticeOfMeeting.nomId,
        others: others,
        status: selectedNoticeOfMeeting.status,
        type_of_meeting: selectedNoticeOfMeeting.typeOfMeeting,
        folder_id: selectedNoticeOfMeeting.folder_id,
      });
      let customAgendas = selectedNoticeOfMeeting.others.agendas.filter(
        (agenda) =>
          !listOfAgendas.includes(agenda) &&
          agenda != "Call to order" &&
          agenda != "Adjournment"
      );

      setListOfCustomAgendas(customAgendas);
    }
    setIsPageLoading(false);
  }, [selectedNoticeOfMeeting]);

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
          <li
            className={`step ${
              (selectedNoticeOfMeeting.status == "Drafted" ||
                selectedNoticeOfMeeting.status == "Sent" ||
                selectedNoticeOfMeeting.status == "Notice Completed") &&
              "step-primary"
            }`}
            data-content=""
          >
            Drafted
          </li>
          <li
            className={`step ${
              (selectedNoticeOfMeeting.status == "Sent" ||
                selectedNoticeOfMeeting.status == "Notice Completed") &&
              "step-primary"
            }`}
            data-content=""
          >
            Sent
          </li>
          <li
            className={`step ${
              selectedNoticeOfMeeting.status == "Notice Completed" &&
              "step-primary"
            }`}
            data-content=""
          >
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

  const btnSubmit = (status) => {
    return (
      <button type="submit" className="btn bg-primary text-white mt-2">
        {loading && <span className="loading loading-spinner"></span>}
        Mark as {status}
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
                {/* <label className="form-control w-full">
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
                </label> */}

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

          <div className="flex flex-col gap-2  items-start pt-5">
            <div className="form-control w-full">
              <div className="flex flex-row justify-between">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Agendas <span className="text-red-500">*</span>
                  </span>
                </div>
                <div className="label">
                  <button
                    type="button"
                    className="btn btn-outline btn-sm text-[12px]"
                    onClick={() => {
                      document.getElementById("addAgendaModal").showModal();
                    }}
                  >
                    Add New Agenda
                  </button>
                </div>
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
                  <div
                    className="flex flex-row gap-3 items-center"
                    // key={`agenda-${index}`}
                  >
                    <input
                      type="checkbox"
                      className="checkbox"
                      value={"Call to order"}
                      name={"Call to order"}
                      checked={formData.others.agendas.includes(
                        "Call to order"
                      )}
                      onChange={(ev) => {
                        if (ev.target.checked) {
                          // setSelectedAgendas([...selectedAgendas, agenda]);
                          let update_others = {
                            ...formData.others,
                            agendas: [
                              ...formData.others.agendas,
                              "Call to order",
                            ],
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
                    <span className="label-text">{"Call to Order"}</span>
                  </div>
                  {listOfAgendas.map((agenda, index) => {
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
                  {listOfCustomAgendas.map((agenda, index) => {
                    return (
                      <div
                        className="flex flex-row gap-3 items-center"
                        key={`custom-agenda-${index}`}
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
                  <div
                    className="flex flex-row gap-3 items-center"
                    // key={`agenda-${index}`}
                  >
                    <input
                      type="checkbox"
                      className="checkbox"
                      value={"Adjournment"}
                      name={"Adjournment"}
                      checked={formData.others.agendas.includes("Adjournment")}
                      onChange={(ev) => {
                        if (ev.target.checked) {
                          // setSelectedAgendas([...selectedAgendas, agenda]);
                          let update_others = {
                            ...formData.others,
                            agendas: [
                              ...formData.others.agendas,
                              "Adjournment",
                            ],
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
                    <span className="label-text">{"Adjournment"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            {btnPreview()}
            {selectedNoticeOfMeeting.status == "Drafted" && btnSubmit("Sent")}
            {/* {selectedNoticeOfMeeting.status == "Sent" && btnSubmit("Completed")} */}

            {selectedNoticeOfMeeting.status == "Sent" && (
              <button
                onClick={(ev) => {
                  ev.preventDefault();
                  setEditFolderID("");
                  document.getElementById("setNoticeCompeleted").showModal();
                }}
                className="btn bg-primary text-white mt-2"
              >
                {loading && <span className="loading loading-spinner"></span>}
                Mark as Completed
              </button>
            )}

            {selectedNoticeOfMeeting.status == "Notice Completed" && (
              <button
                onClick={(ev) => {
                  ev.preventDefault();
                  document.getElementById("gdrive").showModal();
                }}
                className="btn bg-primary text-white mt-2"
              >
                Google Drive Preview
              </button>
            )}
          </div>
        </form>
      </>
    );
  };

  const dialogComponents = () => {
    return (
      <>
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

        {/* Preview Gdrive Modal*/}
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

        {/* Preview Change Google Drive ID*/}
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
                      `/notice-of-meeting/${companyId}`,
                      formData
                    );

                    if (response.data.success) {
                      dispatch(fetchNoticeOfMeeting({ companyId, nomId }));
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

        {/* Preview Change Google Drive ID*/}
        <dialog id="setNoticeCompeleted" className="modal">
          <div className="modal-box">
            <div className="flex flex-row justify-between py-4">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                  ✕
                </button>
              </form>
            </div>
            <div className="flex flex-col gap-5">
              {/* <h1 className="poppins-semibold text-md">
                Update Google Drive Folder ID
              </h1> */}

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

                    if (e.target.value == "") {
                      setErrors({
                        ...errors,
                        set_folder_id: "Folder ID is required",
                      });
                    } else {
                      setErrors({ ...errors, set_folder_id: "" });
                    }
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
                  if (editFolderID == "") {
                    setErrors({
                      ...errors,
                      set_folder_id: "Folder ID is required",
                    });
                    return;
                  }
                  let status = "error";
                  let message = "Failed to update the record.";
                  try {
                    formData.folder_id = editFolderID;
                    formData.status = "Notice Completed";

                    let response = await axios.patch(
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

                    document.getElementById("setNoticeCompeleted").close();
                  }
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </dialog>

        {/* Add Agenda Modal*/}
        <dialog id="addAgendaModal" className="modal">
          <div className="modal-box">
            <div className="flex flex-row justify-between py-4">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                  ✕
                </button>
              </form>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="poppins-semibold text-md">Add New Agenda</h1>

              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Agenda
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.agenda && `input-error`
                  }`}
                  name="set_folder_id"
                  value={agenda}
                  onChange={(e) => {
                    setAgenda(e.target.value);

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
                {errors.agenda && (
                  <span className="text-[12px] text-red-500">
                    {errors.agenda}
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
                  // try {
                  //   formData.folder_id = editFolderID;

                  //   let response = await axios.patch(
                  //     `/notice-of-meeting/${companyId}`,
                  //     formData
                  //   );

                  //   if (response.data.success) {
                  //     dispatch(fetchNoticeOfMeeting({ companyId, nomId }));
                  //   }
                  // } catch (error) {
                  //   console.log(error);
                  // } finally {
                  //   document.getElementById("changedriveID").close();
                  // }
                  setListOfAgendas([...listOfAgendas, agenda]);
                  document.getElementById("addAgendaModal").close();
                }}
              >
                Add
              </button>
            </div>
          </div>
        </dialog>
      </>
    );
  };

  const noRecord = (
    <>
      <div className="flex flex-col mx-auto gap-5">
        <svg
          className="w-[100%]"
          viewBox="0 0 364 355"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1345_14028)">
            <path
              d="M231.082 79.8384H133C130.765 79.8411 128.622 80.7294 127.042 82.3085C125.461 83.8876 124.572 86.0285 124.569 88.2617V306.061L123.445 306.403L99.3842 313.765C98.2438 314.112 97.0122 313.994 95.9595 313.435C94.9068 312.875 94.1192 311.922 93.7695 310.783L22.1986 77.2047C21.8503 76.0653 21.9691 74.8344 22.5287 73.7825C23.0883 72.7306 24.0431 71.9437 25.1831 71.5947L62.2613 60.2513L169.752 27.3779L206.83 16.0345C207.394 15.861 207.987 15.8004 208.575 15.8561C209.163 15.9118 209.734 16.0828 210.255 16.3593C210.777 16.6357 211.239 17.0122 211.614 17.4672C211.99 17.9221 212.272 18.4467 212.445 19.0108L230.739 78.7152L231.082 79.8384Z"
              fill="#F2F2F2"
            />
            <path
              d="M252.484 78.7151L230.435 6.75747C230.069 5.55853 229.469 4.44355 228.671 3.47626C227.872 2.50897 226.891 1.70832 225.783 1.12007C224.675 0.531819 223.462 0.167485 222.213 0.0479027C220.963 -0.0716796 219.703 0.0558329 218.503 0.423141L166.374 16.3657L58.8886 49.2447L6.75905 65.1928C4.33739 65.9358 2.3097 67.6084 1.12105 69.8435C-0.0675936 72.0787 -0.320078 74.6937 0.419028 77.1146L75.7779 323.036C76.3783 324.99 77.5898 326.701 79.2346 327.917C80.8794 329.133 82.8709 329.79 84.9169 329.792C85.8639 329.792 86.8055 329.65 87.7101 329.371L123.445 318.443L124.569 318.095V316.921L123.445 317.263L87.3786 328.298C85.241 328.949 82.9323 328.726 80.9588 327.679C78.9853 326.631 77.5082 324.845 76.8515 322.71L1.49838 76.7833C1.17301 75.7259 1.05961 74.6147 1.16467 73.5134C1.26973 72.4121 1.59118 71.3423 2.11063 70.3653C2.63008 69.3883 3.33733 68.5233 4.19186 67.8197C5.04639 67.1162 6.03142 66.588 7.09055 66.2654L59.2201 50.3173L166.706 17.4439L218.835 1.49572C219.638 1.25077 220.474 1.12587 221.314 1.12509C223.116 1.12914 224.87 1.70976 226.318 2.78192C227.767 3.85407 228.833 5.36142 229.362 7.08319L251.31 78.7151L251.658 79.8382H252.828L252.484 78.7151Z"
              fill="#3F3D56"
            />
            <path
              d="M68.9519 71.7783C67.8686 71.7775 66.8141 71.4299 65.943 70.7865C65.072 70.143 64.4302 69.2376 64.1119 68.203L56.8726 44.5774C56.6781 43.9428 56.6106 43.2761 56.674 42.6154C56.7373 41.9547 56.9304 41.313 57.242 40.7269C57.5537 40.1407 57.9778 39.6217 58.4903 39.1993C59.0028 38.777 59.5935 38.4596 60.2287 38.2654L159.114 8.018C160.397 7.6269 161.783 7.76028 162.967 8.38889C164.152 9.01749 165.038 10.0899 165.432 11.3709L172.671 34.9967C173.062 36.2784 172.929 37.6628 172.3 38.8462C171.671 40.0295 170.597 40.9153 169.315 41.309L70.4297 71.5565C69.9509 71.7033 69.4528 71.7781 68.9519 71.7783Z"
              fill="#273069"
            />
            <path
              d="M106.875 25.2445C113.083 25.2445 118.116 20.2162 118.116 14.0134C118.116 7.81068 113.083 2.78235 106.875 2.78235C100.667 2.78235 95.6338 7.81068 95.6338 14.0134C95.6338 20.2162 100.667 25.2445 106.875 25.2445Z"
              fill="#273069"
            />
            <path
              d="M106.874 21.1252C110.806 21.1252 113.992 17.9411 113.992 14.0134C113.992 10.0856 110.806 6.90149 106.874 6.90149C102.943 6.90149 99.7563 10.0856 99.7563 14.0134C99.7563 17.9411 102.943 21.1252 106.874 21.1252Z"
              fill="white"
            />
            <path
              d="M338.708 326.922H148.737C147.471 326.921 146.256 326.417 145.361 325.523C144.465 324.628 143.961 323.415 143.96 322.149V94.7195C143.961 93.454 144.465 92.2407 145.361 91.3459C146.256 90.451 147.471 89.9477 148.737 89.9463H338.708C339.975 89.9477 341.189 90.4511 342.085 91.3459C342.98 92.2408 343.484 93.454 343.486 94.7195V322.149C343.484 323.415 342.98 324.628 342.085 325.523C341.189 326.417 339.975 326.921 338.708 326.922Z"
              fill="#E6E6E6"
            />
            <path
              d="M251.31 78.7152H133C130.467 78.7188 128.039 79.7257 126.248 81.5153C124.457 83.3048 123.449 85.7309 123.445 88.2616V317.264L124.569 316.921V88.2616C124.572 86.0285 125.461 83.8875 127.042 82.3085C128.622 80.7294 130.765 79.841 133 79.8383H251.659L251.31 78.7152ZM354.445 78.7152H133C130.467 78.7188 128.039 79.7257 126.248 81.5153C124.457 83.3048 123.449 85.7309 123.445 88.2616V345.454C123.449 347.984 124.457 350.41 126.248 352.2C128.039 353.989 130.467 354.996 133 355H354.445C356.978 354.996 359.407 353.989 361.198 352.2C362.989 350.41 363.997 347.984 364 345.454V88.2616C363.997 85.7309 362.989 83.3048 361.198 81.5153C359.407 79.7257 356.978 78.7188 354.445 78.7152ZM362.876 345.454C362.873 347.687 361.984 349.828 360.404 351.407C358.823 352.986 356.68 353.874 354.445 353.877H133C130.765 353.874 128.622 352.986 127.042 351.407C125.461 349.828 124.572 347.687 124.569 345.454V88.2616C124.572 86.0285 125.461 83.8875 127.042 82.3085C128.622 80.7294 130.765 79.841 133 79.8383H354.445C356.68 79.841 358.823 80.7294 360.404 82.3085C361.984 83.8875 362.873 86.0285 362.876 88.2616V345.454Z"
              fill="#3F3D56"
            />
            <path
              d="M295.431 103.424H192.014C190.673 103.422 189.388 102.889 188.439 101.942C187.491 100.994 186.958 99.7096 186.956 98.3697V73.6613C186.958 72.3214 187.491 71.0367 188.439 70.0892C189.388 69.1418 190.673 68.6088 192.014 68.6073H295.431C296.772 68.6088 298.057 69.1418 299.006 70.0892C299.954 71.0367 300.487 72.3214 300.489 73.6613V98.3697C300.487 99.7096 299.954 100.994 299.006 101.942C298.057 102.889 296.772 103.422 295.431 103.424Z"
              fill="#273069"
            />
            <path
              d="M243.723 70.2919C249.931 70.2919 254.964 65.2636 254.964 59.0608C254.964 52.858 249.931 47.8297 243.723 47.8297C237.515 47.8297 232.482 52.858 232.482 59.0608C232.482 65.2636 237.515 70.2919 243.723 70.2919Z"
              fill="#273069"
            />
            <path
              d="M243.723 65.9017C247.504 65.9017 250.569 62.8389 250.569 59.0609C250.569 55.2828 247.504 52.2201 243.723 52.2201C239.941 52.2201 236.876 55.2828 236.876 59.0609C236.876 62.8389 239.941 65.9017 243.723 65.9017Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_1345_14028">
              <rect width="364" height="355" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <h1 className="text-center">Invalid Notice of Meeting ID</h1>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="btn btn-outline btn-primary"
        >
          Go back
        </button>
      </div>
    </>
  );

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
              { goto: "/", text: "View" },
            ]}
          />
        </div>

        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-col sm:flex-row justify-between w-full gap-2">
            <div className="poppins-bold text-color-2 text-[24px] flex items-center">
              View Notice of Meeting
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

        {isPageLoading ? (
          <>Loading</>
        ) : selectedNoticeOfMeeting.nomId != "" ? (
          <div className="flex flex-col-reverse md:flex-row gap-2 py-5 items-start">
            <div className="flex flex-col w-full bg-white p-5 rounded-lg gap-5">
              {formsComponent()}
            </div>
            {progressMap()}
          </div>
        ) : (
          <div className="flex flex-colgap-2 py-5 items-start">
            <div className="flex flex-col w-full bg-white p-5 rounded-lg gap-5">
              {noRecord}
            </div>
          </div>
        )}
      </div>

      {dialogComponents()}
    </>
  );
};

export default ViewNOMPage;
