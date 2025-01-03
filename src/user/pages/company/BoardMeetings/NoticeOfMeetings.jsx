import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header";
import { convertBase64, showAlert, showToast } from "../../../../assets/global";
import axios from "axios";
import Swal from "sweetalert2";

import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "../../../components/Breadcrumbs";

import gdriveIcon from "/gdrive.svg";
import DataTable, { createTheme } from "react-data-table-component";

// import { fetchNoticeOfMeetings } from "./";
import {
  deleteNoticeOfMeeting,
  fetchNoticeOfMeetings,
  selectNoticeOfMeeting,
} from "../../../store/boardmeetings/NoticeOfMeetingSlice.js";

import {
  Document,
  Font,
  Image,
  Line,
  PDFViewer,
  Page,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import moment from "moment/moment";

import ProximaNova from "/fonts/ProximaNova.ttf";
import ProximaNovaBlack from "/fonts/ProximaNovaSemiBold.ttf";

const NoticeOfMeetings = () => {
  const { companyId } = useParams();
  const companyRecords = useSelector((state) => state.records.records);
  const selectedCompany = useSelector((state) => state.company.selectedCompany);
  const noticeOfMeetingsRecord = useSelector(
    (state) => state.noticeOfMeeting.noticeOfMeetings
  );

  const file = {
    fileId: "",
    file: "",
    fileName: "",
    fileLink: "",
  };

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
    type_of_meeting: "",
    proposed_meeting_date: "",
    // actual_meeting_date: "",
    status: "",
    folder_id: "",
    files: [],
    others: other_details,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(noticeOfMeeting);
  const [records, setRecords] = useState([]);

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isGrid, setIsGrid] = useState(false);
  const [isLoadingGdrive, setIsLoadingGdrive] = useState(true);

  const [editFolderID, setEditFolderID] = useState("");

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

  const [listOfDirectors, setListOfDirectors] = useState([]);

  const filteredListOfDirectors = listOfDirectors.map((director) => {
    return {
      name: director.name,
      position: director.officer,
    };
  });

  const directors_options = filteredListOfDirectors.map((director, index) => {
    return `${director.name} - ${director.position}`;
  });

  const formatText = (inputString) => {
    // Split the string into words
    let words = inputString.toLowerCase().split(" ");

    // Capitalize the first letter of each word
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    // Join the words back into a single string and return
    return words.join(" ");
  };

  const extractDate = (datetime) => {
    const dateTime = new Date(datetime);

    return moment(dateTime).format("DD MMMM YYYY");
  };

  const extractTime = (datetime) => {
    const dateTime = new Date(datetime);
    return moment(dateTime).format("hA");
  };

  const extractDirectorName = (director) => {
    if (director != "" && director != undefined) {
      let extract = director.split("-")[0];
      return formatText(extract.substring(0, extract.length - 1, 0));
    }

    return formatText(director);
  };

  const extractDirectorPosition = (director) => {
    if (director != "" && director != undefined) {
      let extract = director.split("-")[1];
      if (extract.substring(1, extract.length, 0) == "N/A")
        return extract.substring(1, extract.length, 0);
      return formatText(extract.substring(1, extract.length, 0));
    }
    return formatText(director);
  };

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
                  folder_id: updated.folder_id,
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
          setLoading(false);
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

          if (response.data.success) {
            let data = response.data;
            formData.nomId = data.data[0].nomId;
            formData.files = data.files;

            console.log(formData);
            setRecords([formData, ...records]);
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
          setLoading(false);
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
          let response = await axios.delete(
            `/notice-of-meeting/${companyId}/${nomId}`
          );
          if (response.data.success) {
            status = "success";
            message = "Record deleted successfully!";
            dispatch(deleteNoticeOfMeeting(nomId));
          }
        } catch (error) {
          console.error("Error deleting a record: ", error);
        } finally {
          showToast(status, message);
        }
      }
    });
  };

  useEffect(() => {
    dispatch(fetchNoticeOfMeetings(companyId));
  }, []);

  // Register font
  Font.register({ family: "ProximaNova", src: ProximaNova });
  Font.register({ family: "ProximaNovaBlack", src: ProximaNovaBlack });

  // Reference font
  const styles = StyleSheet.create({
    view: {
      fontFamily: "ProximaNova",
      fontSize: "12px",
    },
    title: {
      textAlign: "center",
      fontSize: "14px",
      fontWeight: "black",
      padding: "0px 50px",
      margin: "20px 0px",
      fontFamily: "ProximaNovaBlack",
    },
  });

  const table = (
    <>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Notice Date</th>
            <th>Type of Meeting</th>
            <th>Place of Meeting</th>
            <th>Status</th>
            {/* <th>Attached Files</th> */}
            {/* <th>Link to Minutes of Meeting</th> */}
            <th className="text-center">Actions</th>
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
                  <td>
                    {record.others != null &&
                      `${extractDate(
                        record.others.actual_meeting
                      )} - ${extractTime(record.others.actual_meeting)}`}
                  </td>
                  <td>{record.type_of_meeting}</td>
                  <td>
                    {record.others != null && record.others.place_of_meeting}
                  </td>
                  <td>{record.status}</td>
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
                  {/* <td>
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
                  </td> */}
                  <td className="">
                    {/* {record.status != "Notice Completed" && ( */}
                    <div className="flex flex-row w-full items-center justify-end gap-2">
                      {/* <button
                        onClick={() => {
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
                      {record.status === "Notice Completed" && (
                        <Link to={`/company/${companyId}/minutes-of-meeting`}>
                          <div
                            className="tooltip"
                            data-tip="Go to Minutes of Meeting"
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
                                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                              />
                            </svg>
                          </div>
                        </Link>
                      )}
                      {record.status === "Notice Completed" && (
                        <img
                          src={gdriveIcon}
                          alt=""
                          className="cursor-pointer"
                          onClick={() => {
                            setErrors([]);
                            if (record.others == null) {
                              setFormData({ ...record, others: other_details });
                            } else {
                              setFormData(record);
                            }
                            document.getElementById("gdrive").showModal();
                          }}
                        />
                      )}

                      <button
                        // onClick={() => {
                        //   // if (record.status != "Notice Completed") {
                        //   setErrors([]);

                        //   if (record.others == null) {
                        //     other_details.director = selectedDirector;
                        //     setFormData({ ...record, others: other_details });
                        //   } else {
                        //     setFormData(record);
                        //   }

                        //   // // setErrors([]);
                        //   // // document.getElementById("editModal").showModal();
                        //   // document.getElementById("newEditModal").showModal();
                        //   // // }
                        // }}
                        onClick={() => {
                          navigate(
                            `/company/7d98c6f4-f03e-4f51-9296-3fb9a017e41c/notice-of-meeting/view/${record.nomId}`
                          );
                        }}
                        // disabled={record.status == "Notice Completed"}
                      >
                        {/* <svg
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
                        </svg> */}
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
                          // if (record.status != "Notice Completed") {
                          toggleDelete(record.nomId);
                          // }
                        }}
                        // disabled={record.status == "Notice Completed"}
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

  const columns = [
    {
      name: "Notice Date",
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
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="flex flex-row items-center justify-end gap-1 w-full">
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
            { goto: "/", text: "Notice of Meetings" },
          ]}
        />
      </div>
      <div>
        {/* <div> 
          <Header />
        </div> */}
        <div className="flex flex-row w-full justify-between items-center mt-5">
          <div className="flex flex-col sm:flex-row justify-between w-full gap-2">
            <div className="poppins-bold text-color-2 text-[24px] flex items-center">
              Notice of Meetings
            </div>
            <div>
              <Link
                to={`/company/${companyId}/notice-of-meeting/create`}
                className="btn bg-primary text-white w-full flex flex-row"
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
              </Link>
              {/* <button
                className="btn bg-primary text-white w-full flex flex-row"
                onClick={() => {
                  other_details.director = selectedDirector;
                  setFormData({
                    ...formData,
                    notice_date: "",
                    proposed_meeting_date: "",
                    files: [],
                    type_of_meeting: "Regular",
                    status: "In Process",
                    folder_id: "",
                    others: other_details,
                  });
                  setErrors([]);
                  document.getElementById("newAddModal").showModal();
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
              </button> */}
            </div>
          </div>
        </div>

        {/* <div className="overflow-x-auto mt-5">{table}</div> */}

        <div className="pb-5">
          <DataTable
            columns={columns}
            data={noticeOfMeetingsRecord}
            persistTableHead={true}
            customStyles={customStyles}
            theme="customized"
            conditionalRowStyles={conditionalRowStyles}
          />
        </div>
      </div>

      <dialog id="newAddModal" className="modal">
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
              <select
                className={`select select-bordered w-full ${
                  errors.place_of_meeting && `select-error`
                }`}
                name="type_of_meeting"
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
                <label className="form-control w-full">
                  <div className="label">
                    <span className="poppins-regular text-[12px]">
                      Physical Address <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    className={`input input-bordered w-full`}
                    placeholder="Please input the address"
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

            <div className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  Agendas <span className="text-red-500">*</span>
                </span>
              </div>

              <div className="flex flex-col gap-2 form-control">
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

              {errors.agendas && (
                <span className="text-[12px] text-red-500 pt-2">
                  {errors.agendas}
                </span>
              )}
            </div>

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
                <span className="text-[12px] text-red-500">
                  {errors.director}
                </span>
              )}
            </label>

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

            <div className="flex flex-row justify-between">
              <button
                onClick={async (e) => {
                  if (await isFormValid()) {
                    document.getElementById("previewModal").showModal();
                  }
                }}
                className="btn btn-outline mt-2"
              >
                Preview
              </button>
              <button
                onClick={async (e) => {
                  // handleSubmit(e);
                  if (await isFormValid()) {
                    let status = "error";
                    let message = "Failed to save the record.";
                    setLoading(false);

                    try {
                      let response = await axios.post(
                        `/notice-of-meeting/${companyId}`,
                        formData
                      );

                      if (response.data.success) {
                        let data = response.data;
                        formData.nomId = data.data[0].nomId;
                        formData.files = data.files;

                        setRecords([formData, ...records]);
                        setFormData(noticeOfMeeting);
                        status = "success";
                        message = "Record was added successfully.";
                      }
                    } catch (error) {
                      console.log(error);
                    } finally {
                      showAlert(status, message);
                      setFormData(noticeOfMeeting);
                      document.getElementById("newAddModal").close();
                      setLoading(false);
                    }
                  }
                }}
                className="btn bg-primary text-white mt-2"
              >
                {loading && <span className="loading loading-spinner"></span>}
                Submit
              </button>
            </div>
          </div>
        </div>
      </dialog>

      <dialog id="previewModal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="flex flex-row justify-between pb-5">
            <h3 className="font-bold text-lg">Preview</h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                ✕
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-2">
            <PDFViewer
              style={{
                position: "relative",
                height: "100vh",
                width: "100%",
              }}
            >
              <Document title={`${selectedCompany.companyName} NOM`}>
                <Page size={"A4"} style={styles.view}>
                  <View style={{ padding: "0px 50px" }}>
                    {selectedCompany.letterHeader != "" &&
                      selectedCompany.letterHeader != null && (
                        <View>
                          <Image
                            src={selectedCompany.letterHeader}
                            style={{
                              width: "100%",
                              display: "flex",
                              alignSelf: "center",
                            }}
                          ></Image>
                        </View>
                      )}

                    <View>
                      <Text style={styles.title}>
                        NOTICE OF 2023{" "}
                        {formData.type_of_meeting == "Regular"
                          ? "ANNUAL"
                          : "SPECIAL"}{" "}
                        STOCKHOLDERS' MEETING OF
                        {" " + selectedCompany.companyName.toUpperCase()}
                      </Text>
                      <Text
                        style={{
                          marginBottom: "15px",
                          fontFamily: "ProximaNovaBlack",
                        }}
                      >
                        To All Stockholders:
                      </Text>

                      <Text
                        style={{
                          width: "100%",
                          textAlign: "justify",
                          marginBottom: "20px",
                          fontFamily: "ProximaNova",
                        }}
                      >
                        <Text style={{ fontFamily: "ProximaNova" }}>
                          Please note that the{" "}
                          {formData.type_of_meeting == "Regular"
                            ? "Annual"
                            : "Special"}{" "}
                          Stockholders' Meeting of
                        </Text>
                        <Text
                          style={{
                            fontFamily: "ProximaNovaBlack",
                          }}
                        >
                          {" " +
                            selectedCompany.companyName.toUpperCase() +
                            " "}
                        </Text>
                        <Text>(the "Corporation") will be held on </Text>
                        <Text>{`${extractDate(
                          formData.others.actual_meeting
                        )}`}</Text>
                        <Text>, at </Text>
                        <Text style={{ fontFamily: "ProximaNovaBlack" }}>
                          {`${extractTime(formData.others.actual_meeting)}, `}
                        </Text>
                        <Text>
                          {formData.others.place_of_meeting ==
                            "Video Conference" ||
                          formData.others.place_of_meeting == "Teleconference"
                            ? `via ${formData.others.place_of_meeting}.`
                            : `in ${formData.others.place_of_meeting}.`}
                        </Text>
                      </Text>

                      <Text
                        style={{
                          marginBottom: "20px",
                          textDecoration: "underline",
                        }}
                      >
                        The Agenda:
                      </Text>
                      <View style={{ flexDirection: "column", width: 400 }}>
                        {formData.others.agendas.map((value, index) => {
                          return (
                            <View
                              key={index}
                              style={{ flexDirection: "row", marginBottom: 4 }}
                            >
                              <Text style={{ textAnchor: "10px" }}>
                                {index + 1 + ". "}
                              </Text>
                              <Text>{value}</Text>
                            </View>
                          );
                        })}
                      </View>
                      <Text> </Text>
                      <Text>
                        Stockholders intending to attend and vote in the meeting
                        should notify the Corporate Secretary by email on or
                        before
                        {` ${extractDate(
                          formData.others.confirmation_meeting
                        )}, ${extractTime(
                          formData.others.confirmation_meeting
                        )} (Philippine Time).`}
                      </Text>
                      <Text> </Text>
                      <Text style={{ marginBottom: "15px" }}>
                        Stockholders who cannot attend the meeting but would
                        like to be represented thereat should accomplish the
                        attached proxy form which has been emailed to them
                        together with this Notice, and return the same via email
                        on or before
                        {` ${extractDate(
                          formData.others.notice_meeting
                        )}, ${extractTime(
                          formData.others.notice_meeting
                        )} (Philippine Time).`}
                      </Text>

                      <Text style={{ margin: "30px 0px" }}>
                        FOR THE BOARD OF DIRECTORS:
                      </Text>

                      <Text style={{ fontFamily: "ProximaNovaBlack" }}>
                        {extractDirectorName(formData.others.director)}
                      </Text>
                      <Text>
                        {extractDirectorPosition(formData.others.director)}
                      </Text>
                      <Text>
                        {selectedCompany.latestGIS.official_email_address}
                      </Text>
                    </View>
                  </View>
                </Page>
                <Page size={"A4"} style={styles.view}>
                  <View style={{ padding: "0px 50px" }}>
                    {selectedCompany.letterHeader != "" &&
                      selectedCompany.letterHeader != null && (
                        <View>
                          <Image
                            src={selectedCompany.letterHeader}
                            style={{
                              width: "100%",
                              display: "flex",
                              alignSelf: "center",
                            }}
                          ></Image>
                        </View>
                      )}
                    <View>
                      <Text style={styles.title}>Proxy</Text>
                      <Text
                        style={{
                          marginBottom: "15px",
                          fontFamily: "ProximaNovaBlack",
                        }}
                      >
                        KNOW ALL MEN BY THESE PRESENTS:
                      </Text>
                      <Text
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          flexWrap: "wrap",
                          marginBottom: "20px",
                          textAlign: "justify",
                        }}
                      >
                        <Text>I/We the undersigned Stockholder(s) of</Text>
                        <Text
                          style={{
                            fontFamily: "ProximaNovaBlack",
                            marginTop: "1.8px",
                          }}
                        >
                          {" " +
                            selectedCompany.companyName.toUpperCase() +
                            " "}
                        </Text>
                        <Text>(the “Corporation”), </Text>
                        <Text>do hereby name and appoint:</Text>
                      </Text>
                      <View style={{ marginBottom: "30px" }}>
                        <Svg
                          height="10"
                          width="100%"
                          style={{ marginBottom: "10px" }}
                        >
                          <Line
                            x1="0"
                            y1="10"
                            x2="500"
                            y2="10"
                            strokeWidth={1}
                            stroke="rgb(0,0,0)"
                          />
                        </Svg>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            flexWrap: "wrap",
                            marginBottom: "20px",
                            textAlign: "justify",
                          }}
                        >
                          <Text>
                            or in his/her absence, the Chairman of the Meeting,
                            as my/our proxy to represent the undersigned and
                            vote all shares owned by and/ or registered in the
                            name of the undersigned in the books of the
                            Corporation at the Annual Stockholders' Meeting of
                            the Corporation to be held on
                          </Text>
                          <Text>{`${extractDate(
                            formData.others.actual_meeting
                          )}, at `}</Text>
                          <Text>{`${extractTime(
                            formData.others.actual_meeting
                          )}, `}</Text>
                          <Text>
                            {formData.others.place_of_meeting ==
                              "Video Conference" ||
                            formData.others.place_of_meeting == "Teleconference"
                              ? `via ${formData.others.place_of_meeting} `
                              : `in ${formData.others.place_of_meeting}, `}
                          </Text>
                          <Text>and at any postponement or </Text>
                          <Text>adjournment thereof.</Text>
                        </View>
                      </View>
                      <View>
                        <Svg height="10" width="100%">
                          <Line
                            x1="0"
                            y1="10"
                            x2="230"
                            y2="10"
                            strokeWidth={1}
                            stroke="rgb(0,0,0)"
                          />
                        </Svg>
                      </View>
                      <Text style={{ marginTop: "5px", marginBottom: "5px" }}>
                        Signature over Printed Name
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Text>Number of shares held:</Text>
                        <View
                          style={{
                            width: "100%",
                            marginLeft: "33px",
                            marginTop: "3px",
                          }}
                        >
                          <Svg height="10" width="100%">
                            <Line
                              x1="0"
                              y1="10"
                              x2="105"
                              y2="10"
                              strokeWidth={1}
                              stroke="rgb(0,0,0)"
                            />
                          </Svg>
                        </View>
                      </View>
                    </View>
                  </View>
                </Page>
              </Document>
            </PDFViewer>
          </div>
        </div>
      </dialog>

      <dialog id="newEditModal" className="modal">
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
                <label className="form-control w-full">
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

            <div className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  Agendas <span className="text-red-500">*</span>
                </span>
              </div>

              <div className="flex flex-col gap-2 form-control">
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

              {errors.agendas && (
                <span className="text-[12px] text-red-500 pt-2">
                  {errors.agendas}
                </span>
              )}
            </div>

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
                <span className="text-[12px] text-red-500">
                  {errors.director}
                </span>
              )}
            </label>

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

            <div className="flex flex-row justify-between">
              <button
                onClick={async (e) => {
                  if (await isFormValid()) {
                    document.getElementById("previewModal").showModal();
                  }
                }}
                className="btn btn-outline mt-2"
              >
                Preview
              </button>
              <button
                onClick={async (e) => {
                  // handleSubmit(e);
                  if (await isFormValid()) {
                    //for edit function

                    let status = "error";
                    let message = "Failed to update the record.";

                    try {
                      let response = await axios.patch(
                        `/notice-of-meeting/${companyId}`,
                        formData
                      );

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
                              proposed_meeting_date:
                                updated.proposedMeetingDate,
                              type_of_meeting: updated.typeOfMeeting,
                              files: updated.files,
                              status: updated.status,
                              folder_id: updated.folder_id,
                              others: updated.others,
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
                      document.getElementById("newEditModal").close();
                      setLoading(false);
                    }
                  }
                }}
                className="btn bg-primary text-white mt-2"
              >
                {loading && <span className="loading loading-spinner"></span>}
                Submit
              </button>
            </div>
          </div>
        </div>
      </dialog>

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
                  Google Drive Folder ID <span className="text-red-500">*</span>
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

export default NoticeOfMeetings;
