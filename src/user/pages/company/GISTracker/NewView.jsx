import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchRecord,
  updateRecordGdriveFolders,
} from "../../../store/GIS/GISRecordSlice";
import { fetchUser } from "../../../store/user/UserSlice";
import { showToast } from "../../../../assets/global";

import Step1 from "./steppers/step1";
import Step2 from "./steppers/step2";
import Step3 from "./steppers/step3";
import Step4 from "./steppers/step4";
import Step5 from "./steppers/step5";
import Step6 from "./steppers/step6";
import Step7 from "./steppers/step7";
import { setFormData } from "../../../store/GIS/GISFormSlice";
import moment from "moment";
import axios from "axios";
import FrameWrapper from "../DashboardComponents/FrameWrapper";

const getName = (fullName) => {
  if (!fullName) return;

  const [firstName, ...lastNameParts] = fullName.split(" ");

  const lastNameInitial = lastNameParts[lastNameParts.length - 1].charAt(0);

  return `${firstName} ${lastNameInitial}.`;
};

const components = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedRecord = useSelector((state) => state.records.selectedRecord);

  const [collapseOpen, setCollapseOpen] = useState("General Information Sheet");

  const handleCollapseOpen = (accordionName) => {
    if (!accordionName || accordionName == collapseOpen) {
      setCollapseOpen("");
    } else {
      setCollapseOpen(accordionName);
    }
  };

  useEffect(() => {
    if (selectedRecord.recordId != "") {
      dispatch(setFormData(selectedRecord.draftingInput));
    }
  }, [selectedRecord]);

  const accordionComponent = (accordionName, content) => {
    return (
      <div
        className={`collapse collapse-arrow bg-white border hover:shadow-lg ${
          collapseOpen == accordionName ? "collapse-open" : "collapse-close"
        }`}
      >
        <input
          type="radio"
          name="my-accordion-2"
          className="cursor-pointer"
          onClick={() => {
            handleCollapseOpen(accordionName);
          }}
        />
        <div className="collapse-title text-md font-bold">{accordionName}</div>
        <div className="collapse-content border border-t-1">
          <div className="grid grid-cols-1 w-full mt-5">{content}</div>
        </div>
      </div>
    );
  };

  const head = (timestamps) => {
    const { companyId } = useParams();
    return (
      <>
        <div className="flex flex-row w-full justify-between">
          <button
            onClick={() => {
              navigate(`/company/${companyId}/gis-tracker`);
            }}
            className="flex flex-row gap-3 p-2 items-center w-32"
          >
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.14081 0.260609L0.588132 6.11787L6.44539 11.6705L7.82115 10.2193L3.41512 6.0424L7.59204 1.63637L6.14081 0.260609Z"
                fill="black"
              />
            </svg>
            <span className="poppins-regular text-[16px]">Back</span>
          </button>
        </div>

        <div className="mb-5 gap-5">
          <div className="flex flex-row w-full justify-between items-center mb-2">
            <div className="flex flex-row gap-4 justify-center items-center">
              <svg
                width="26"
                height="22"
                viewBox="0 0 26 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 4.00001H13.4137L10 0.586257C9.81487 0.399844 9.59458 0.252035 9.3519 0.1514C9.10922 0.050765 8.84897 -0.000693852 8.58625 7.06503e-06H2C1.46957 7.06503e-06 0.960859 0.210721 0.585786 0.585793C0.210714 0.960866 0 1.46957 0 2.00001V20.0775C0.000992028 20.5873 0.20403 21.0759 0.564625 21.4363C0.925219 21.7966 1.41396 21.9993 1.92375 22H24.1112C24.612 21.9993 25.092 21.8001 25.4461 21.4461C25.8001 21.092 25.9993 20.612 26 20.1113V6.00001C26 5.46957 25.7893 4.96087 25.4142 4.58579C25.0391 4.21072 24.5304 4.00001 24 4.00001ZM2 2.00001H8.58625L10.5863 4.00001H2V2.00001Z"
                  fill="#343330"
                />
              </svg>
              <div className="flex flex-col">
                <div className="flex flex-row gap-5">
                  <span className="poppins-bold text-[18px]">
                    {selectedRecord.recordName}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-end">
              <button
                className="btn btn-outline btn-sm rounded-full"
                onClick={() => {
                  document.getElementById("statusDialog").showModal();
                }}
              >
                {timestamps.length != 0
                  ? timestamps[0].status
                  : selectedRecord.status}
              </button>
            </div>
          </div>
          <hr />
        </div>
      </>
    );
  };

  const accordion = () => {
    const GISContent = () => {
      return (
        <>
          <div className="flex flex-col gap-5">
            <Step7 />
          </div>
        </>
      );
    };
    const attachmentsContent = () => {
      const googleDrivePreview = () => {
        return (
          <div className="flex flex-col">
            <div className="flex flex-row pb-5 items-center justify-between">
              <h1 className="poppins-semibold text-sm">Google Drive Preview</h1>
              <h1
                className="poppins-regular text-sm text-blue-500 cursor-pointer flex flex-row items-end"
                onClick={() => {
                  window.open(
                    `https://drive.google.com/drive/folders/${selectedRecord.folder_id}`,
                    "_blank"
                  );
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6Zm-5.03 4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.25a.75.75 0 0 0 0 1.5h10.94l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                Go to Drive
              </h1>
            </div>
            <FrameWrapper gdrivefolder={selectedRecord.folder_id} />
          </div>
        );
      };

      const noAttachment = () => {
        return (
          <div className="mx-auto text-center">There are no attachments.</div>
        );
      };

      if (selectedRecord.folder_id != "") {
        return googleDrivePreview();
      }
      return noAttachment();
    };

    return (
      <>
        <div className="flex flex-col gap-2 w-full">
          {accordionComponent("General Information Sheet", GISContent())}
          {accordionComponent("Attachments", attachmentsContent())}
        </div>
      </>
    );
  };

  return { head, accordion };
};

const dialogComponents = () => {
  const { companyId, recordId } = useParams();
  const selectedRecord = useSelector((state) => state.records.selectedRecord);

  const STATUS_DIALOG = "statusDialog";
  const PROCEED_DIALOG = "proceedDialog";
  const COMPLETE_DIAlOG = "completeDialog";
  const CHANGEDRIVE_DIALOG = "changedriveID";

  const statusDialog = (
    timeStamps = [],
    setListOfTimeStamps,
    STATUSES,
    timestamp,
    setTimeStamp
  ) => {
    const currentUser = useSelector((state) => state.user.user);

    const [isLoading, setIsLoading] = useState(false);

    const formState = {
      date_filed:
        selectedRecord.date_filed != "" && selectedRecord.date_filed != null
          ? selectedRecord.date_filed
          : "",
      folder_id:
        selectedRecord.folder_id != "" && selectedRecord.folder_id != null
          ? selectedRecord.folder_id
          : "",
    };

    const dispatch = useDispatch();

    const [formData, setFormData] = useState(formState);

    const [gdrivefolders, setgdrivefolders] = useState("");

    const [errors, setErrors] = useState({});

    const listOfTimeStampComponent = (
      index,
      status,
      datetime,
      modified_by,
      remarks,
      btnContent,
      btnGenerate
    ) => {
      return (
        <li className="mb-10 ms-4" key={`status-${index}`}>
          <div
            className={`absolute w-3 h-3  ${
              status == "Reverted"
                ? "bg-error border-error"
                : "bg-primary border-primary"
            } rounded-full -start-1.5 border  dark:border-gray-900 dark:bg-gray-700 mt-2`}
          ></div>
          <h3
            className={`text-lg font-semibold ${
              status == "Reverted" ? "text-error" : "text-gray-900"
            } dark:text-white`}
          >
            {status}
          </h3>

          <time className="mb-1 italic text-sm font-normal leading-none text-gray-500 dark:text-gray-500">
            {moment(datetime).format("MMMM DD, YYYY hh:mm A")}
          </time>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {getName(modified_by)}
          </p>

          <p
            className={`text-sm poppins-normal text-gray-500 mt-2 ${
              remarks != "" && "border-l-4 border-gray-200 p-2"
            }`}
          >
            {remarks}
          </p>

          <div className="flex mt-5 gap-2">
            {btnGenerate}
            {btnContent}
          </div>
        </li>
      );
    };

    const getButton = (text, onClick) => {
      if (!text) return <></>;
      return (
        <>
          <button className="btn btn-sm btn-outline" onClick={onClick}>
            {text}
          </button>
        </>
      );
    };

    const warningSVG = (
      <svg
        width="91"
        height="91"
        viewBox="0 0 91 91"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M45.6423 23.8995V50.18M45.6423 67.7447L45.6861 67.6961M45.6422 89.6016C69.8546 89.6016 89.4829 69.9911 89.4829 45.8008C89.4829 21.6103 69.8546 2 45.6422 2C21.4297 2 1.80151 21.6103 1.80151 45.8008C1.80151 69.9911 21.4297 89.6016 45.6422 89.6016Z"
          stroke="#F38F33"
          strokeWidth="2.62921"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    const handleProceedBtn = async (form) => {
      let type = "error";
      let message = "Failed to update this record.";
      try {
        form = { ...form, comments: form.remarks };
        let response = await axios.patch(`/record/record/${recordId}`, form);
        if (response.status === 200) {
          type = "success";
          message = "Record updated successfully!";
          setListOfTimeStamps([form, ...timeStamps]);
          dispatch(fetchRecord(recordId));
        }
      } catch (error) {
        console.log(error);
      } finally {
        showToast(type, message);
        document.getElementById(PROCEED_DIALOG).close();
        document.getElementById(STATUS_DIALOG).close();
      }
    };

    return (
      <>
        <dialog id={STATUS_DIALOG} className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="py-4 px-10">
              <ol className="relative border-s border-gray-400 dark:border-gray-700 w-full">
                {timeStamps.length != 0 ? (
                  <>
                    {timeStamps.map((timestamp_record, index) => {
                      let btnContent = <></>;
                      let btnGenerate = <></>;
                      let nextStep = "";
                      let status = "";

                      if (
                        timeStamps.length != 0 &&
                        timeStamps[0].status == timestamp_record.status
                      ) {
                        switch (timestamp_record.status) {
                          // case STATUSES.pending_for_approval:
                          //   nextStep = "Mark as Approved";
                          //   status = STATUSES.approved;
                          //   break;
                          case STATUSES.approved:
                            nextStep = "Mark as Routed for Signature";
                            status = STATUSES.routed_for_signature;
                            btnGenerate = (
                              <button
                                className="btn btn-sm btn-outline"
                                disabled={isLoading}
                                onClick={async () => {
                                  try {
                                    setIsLoading(true);
                                    let response = await axios.get(
                                      `/record/generate/${selectedRecord.recordId}`,
                                      {
                                        params: {
                                          recordId: selectedRecord.recordId,
                                        },
                                      }
                                    );

                                    const newWindow = window.open(
                                      "",
                                      "_blank",
                                      "width=1280,height=720"
                                    );

                                    if (newWindow) {
                                      newWindow.document.write(response.data);
                                      newWindow.document.close(); // Ensure the document is rendered
                                    }
                                  } catch (error) {
                                    console.log(error);
                                  } finally {
                                    setIsLoading(false);
                                  }
                                }}
                              >
                                {isLoading && (
                                  <span className="loading loading-spinner loading-xs"></span>
                                )}
                                Generate
                              </button>
                            );
                            break;
                          case STATUSES.routed_for_signature:
                            nextStep = "Mark as Notarized";
                            status = STATUSES.notarized;
                            break;
                          case STATUSES.notarized:
                            nextStep = "Mark as Filed with SEC";
                            status = STATUSES.filed_with_sec;
                            break;
                          case STATUSES.filed_with_sec:
                            nextStep = "Mark as Completed";
                            status = STATUSES.completed;
                            break;
                          default:
                            btnContent = <></>;
                            break;
                        }
                      }

                      if (status == STATUSES.completed) {
                        btnContent = getButton(nextStep, () => {
                          setTimeStamp({
                            ...timestamp,
                            status: status,
                            remarks: "",
                          });

                          setFormData(formState);
                          setErrors({});
                          document.getElementById(COMPLETE_DIAlOG).showModal();
                        });
                      } else {
                        btnContent = getButton(nextStep, () => {
                          setTimeStamp({
                            ...timestamp,
                            status: status,
                            remarks: "",
                          });
                          document.getElementById(PROCEED_DIALOG).showModal();
                        });
                      }

                      return listOfTimeStampComponent(
                        index,
                        timestamp_record.status,
                        timestamp_record.datetime,
                        timestamp_record.modified_by,
                        timestamp_record.remarks,
                        btnContent,
                        btnGenerate
                      );
                    })}
                  </>
                ) : (
                  listOfTimeStampComponent(
                    0,
                    selectedRecord.status,
                    selectedRecord.updated_at,
                    selectedRecord.modified_by,
                    ""
                  )
                )}
              </ol>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        <dialog id={PROCEED_DIALOG} className="modal">
          <div className="modal-box">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col w-full items-center justify-center gap-2">
                <svg
                  className="w-16 aspect-auto"
                  viewBox="0 0 55 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.3717 14.6853V29.9083M27.3717 40.0827L27.397 40.0545M27.3716 52.7433C41.3839 52.7433 52.7433 41.3839 52.7433 27.3716C52.7433 13.3593 41.3839 2 27.3716 2C13.3593 2 2 13.3593 2 27.3716C2 41.3839 13.3593 52.7433 27.3716 52.7433Z"
                    stroke="#F38F33"
                    strokeWidth="2.62921"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h1 className="poppins-bold text-[18px]">
                  {timestamp.status == STATUSES.completed
                    ? "Complete GIS File Process"
                    : "Are you sure?"}
                </h1>
                <span className="poppins-normal text-[15px]">
                  {timestamp.status == STATUSES.completed
                    ? "Are you sure you want to complete the GIS file process?"
                    : "You want to proceed to the next step?"}
                </span>

                {timestamp.status != STATUSES.completed && (
                  <label className="form-control w-full">
                    <div className="label w-full">
                      <span className="label-text">Remarks</span>
                    </div>
                    <textarea
                      className={`textarea textarea-bordered h-24`}
                      onChange={(e) => {
                        setTimeStamp({ ...timestamp, remarks: e.target.value });
                      }}
                      value={timestamp.remarks}
                    ></textarea>
                  </label>
                )}
              </div>
              <div className="flex flex-row gap-10 items-center justify-center mt-5">
                <button
                  onClick={(e) => {
                    document.getElementById(PROCEED_DIALOG).close();
                  }}
                  className="btn bg-[#CDCDCD] text-black mt-2"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => {
                    const modified_by = `${currentUser.first_name} ${currentUser.last_name}`;

                    let complete_form = { ...timestamp, modified_by };
                    if (timestamp.status == STATUSES.completed) {
                      complete_form = {
                        ...complete_form,
                        date_filed: formData.date_filed,
                        folder_id: formData.folder_id,
                      };
                    }

                    handleProceedBtn(complete_form);
                  }}
                  className="btn bg-primary text-white mt-2"
                >
                  Yes,{" "}
                  {timestamp.status == STATUSES.completed
                    ? "complete!"
                    : "proceed!"}
                </button>
              </div>
            </div>
          </div>
        </dialog>

        <dialog id={COMPLETE_DIAlOG} className="modal">
          <div className="modal-box">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col w-full items-center justify-center gap-2">
                <h1 className="poppins-semibold text-start w-full mb-3">
                  Mark as Completed
                </h1>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="poppins-regular text-[12px]">
                      Date Received <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="date"
                    className={`input input-bordered w-full ${
                      errors.date_filed && `input-error`
                    }`}
                    name="date_filed"
                    value={formData.date_filed}
                    onChange={(e) => {
                      setFormData({ ...formData, date_filed: e.target.value });

                      if (e.target.value == "") {
                        setErrors({
                          ...errors,
                          date_filed: "Date Received is required",
                        });
                      } else {
                        setErrors({
                          ...errors,
                          date_filed: "",
                        });
                      }
                    }}
                  />
                  {errors.date_filed && (
                    <span className="text-[12px] text-red-500">
                      {errors.date_filed}
                    </span>
                  )}
                </label>
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
                      setFormData({ ...formData, folder_id: e.target.value });

                      if (e.target.value == "") {
                        setErrors({ folder_id: "Folder ID is required" });
                      } else {
                        setErrors({ folder_id: "" });
                      }
                    }}
                  />
                  {errors.folder_id && (
                    <span className="text-[12px] text-red-500">
                      {errors.folder_id}
                    </span>
                  )}
                </label>

                <label className="form-control w-full">
                  <div className="label w-full">
                    <span className="label-text">Remarks</span>
                  </div>
                  <textarea
                    className={`textarea textarea-bordered h-24`}
                    onChange={(e) => {
                      setTimeStamp({ ...timestamp, remarks: e.target.value });
                    }}
                    value={timestamp.remarks}
                  ></textarea>
                </label>
              </div>
              <div className="flex flex-row gap-10 items-center justify-between">
                <button
                  onClick={(e) => {
                    document.getElementById(COMPLETE_DIAlOG).close();
                  }}
                  className="btn bg-[#CDCDCD] text-black mt-2"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => {
                    let newErrors = {};
                    if (formData.date_filed == "") {
                      newErrors.date_filed = "Date Received is required";
                    }

                    if (formData.folder_id == "") {
                      newErrors.folder_id = "Folder ID is required";
                    }

                    if (Object.keys(newErrors).length != 0) {
                      setErrors(newErrors);
                    } else {
                      document.getElementById(COMPLETE_DIAlOG).close();
                      document.getElementById(PROCEED_DIALOG).showModal();
                    }
                  }}
                  className="btn bg-primary text-white mt-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </dialog>

        <dialog id={CHANGEDRIVE_DIALOG} className="modal">
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
                    errors.gdrivefolders && `input-error`
                  }`}
                  name="gdrivefolders"
                  value={gdrivefolders}
                  onChange={(e) => {
                    setgdrivefolders(e.target.value);
                  }}
                />
                {errors.gdrivefolders && (
                  <span className="text-[12px] text-red-500">
                    {errors.gdrivefolders}
                  </span>
                )}
              </label>

              <button
                className="btn bg-primary text-white"
                onClick={async (e) => {
                  try {
                    let record = {
                      ...selectedRecord,
                      folder_id: gdrivefolders,
                    };

                    let response = await axios.patch(
                      `/record/record/${record.recordId}`,
                      {
                        recordId: record.recordId,
                        folder_id: record.folder_id,
                      }
                    );

                    if (response.status === 200) {
                      dispatch(
                        updateRecordGdriveFolders({
                          recordId: record.recordId,
                          folder_id: record.folder_id,
                        })
                      );
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

  return { statusDialog };
};

const NewView = () => {
  const { companyId, recordId } = useParams();
  const dispatch = useDispatch();

  const getComponents = components();
  const getDialogComponents = dialogComponents();

  const selectedRecord = useSelector((state) => state.records.selectedRecord);

  const STATUSES = {
    drafted: "Drafted",
    pending_for_approval: "Pending for Approval",
    approved: "Approved",
    routed_for_signature: "Routed for Signature",
    notarized: "Notarized",
    filed_with_sec: "Filed with SEC",
    completed: "Completed",
  };

  const TIMESTAMP_STATE = {
    status: "",
    modified_by: "",
    remarks: "",
    datetime: new Date(),
  };

  const [timestamp, setTimeStamp] = useState(TIMESTAMP_STATE);

  const [listOfTimeStamps, setListOfTimeStamps] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    dispatch(fetchUser(token));
    dispatch(fetchRecord(recordId));
  }, []);

  useEffect(() => {
    setListOfTimeStamps(selectedRecord.timestamps);
  }, [selectedRecord]);

  return (
    <>
      <div className="grid grid-cols-1 w-full">
        {getComponents.head(listOfTimeStamps)}
        {getComponents.accordion()}
      </div>

      {getDialogComponents.statusDialog(
        listOfTimeStamps,
        setListOfTimeStamps,
        STATUSES,
        timestamp,
        setTimeStamp
      )}
    </>
  );
};

export default NewView;
