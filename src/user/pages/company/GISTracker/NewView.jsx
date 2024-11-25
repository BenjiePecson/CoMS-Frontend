import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRecord } from "../../../store/GIS/GISRecordSlice";
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

const getName = (fullName) => {
  if (!fullName) return;

  const [firstName, ...lastNameParts] = fullName.split(" ");

  const lastNameInitial = lastNameParts[lastNameParts.length - 1].charAt(0);

  return `${firstName} ${lastNameInitial}.`;
};

const handleUpdateButton = () => {};

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
              {timestamps.length != 0 ? (
                <button
                  className="btn btn-outline btn-sm rounded-full"
                  onClick={() => {
                    document.getElementById("statusDialog").showModal();
                  }}
                >
                  {timestamps[0].status}
                </button>
              ) : (
                <button className="btn btn-sm rounded-2xl btn-outline">
                  {selectedRecord.status}
                </button>
              )}
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
      return (
        <>
          <div className="mx-auto text-center">There are no attachments.</div>
        </>
      );
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
  const STATUS_DIALOG = "statusDialog";
  const PROCEED_DIALOG = "proceedDialog";

  const statusDialog = (
    timeStamps = [],
    setListOfTimeStamps,
    STATUSES,
    timestamp,
    setTimeStamp
  ) => {
    const currentUser = useSelector((state) => state.user.user);

    const listOfTimeStampComponent = (
      index,
      status,
      datetime,
      modified_by,
      remarks,
      btnContent
    ) => {
      return (
        <li className="mb-10 ms-4" key={`status-${index}`}>
          <div
            className={`absolute w-3 h-3 border-primary bg-primary rounded-full -start-1.5 border  dark:border-gray-900 dark:bg-gray-700 mt-2`}
          ></div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {status}
          </h3>

          <time className="mb-1 text-sm font-normal leading-none text-gray-500 dark:text-gray-500">
            {moment(datetime).format("MMMM DD, YYYY hh:ss A")}
          </time>
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            {modified_by}
          </p>

          <p className="text-sm poppins-normal mt-2 text-gray-500">{remarks}</p>

          <div className="flex mt-5 gap-2">{btnContent}</div>
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
                {timeStamps.map((timestamp, index) => {
                  let btnContent = <></>;
                  let nextStep = "";

                  switch (timestamp.status) {
                    case STATUSES.pending_for_approval:
                      if (timeStamps.length == 2) {
                        nextStep = "Mark as Approved";
                        status = STATUSES.approved;
                      }
                      break;
                    case STATUSES.approved:
                      if (timeStamps.length == 3) {
                        nextStep = "Mark as Routed for Signature";
                        status = STATUSES.routed_for_signature;
                      }
                      break;
                    case STATUSES.routed_for_signature:
                      if (timeStamps.length == 4) {
                        nextStep = "Mark as Notarized";
                        status = STATUSES.notarized;
                      }
                      break;
                    case STATUSES.notarized:
                      if (timeStamps.length == 5) {
                        nextStep = "Mark as Filed with SEC";
                        status = STATUSES.filed_with_sec;
                      }
                      break;
                    case STATUSES.filed_with_sec:
                      if (timeStamps.length == 6) {
                        nextStep = "Mark as Completed";
                        status = STATUSES.completed;
                      }
                      break;
                    default:
                      btnContent = <></>;
                      break;
                  }

                  btnContent = getButton(nextStep, () => {
                    setTimeStamp({ ...timestamp, status: nextStep });
                    document.getElementById(PROCEED_DIALOG).showModal();
                  });

                  return listOfTimeStampComponent(
                    index,
                    timestamp.status,
                    timestamp.datetime,
                    timestamp.modified_by,
                    timestamp.remarks,
                    btnContent
                  );
                })}
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
                <h1 className="poppins-bold text-[15px]">Are you sure?</h1>
                <h6>You want to proceed to the next step?</h6>
                <label className="form-control w-full">
                  <div className="label w-full">
                    <span className="label-text">Remarks</span>
                  </div>
                  <textarea
                    className={`textarea textarea-bordered h-24 ${
                      false && " textarea-error"
                    }`}
                  ></textarea>
                  {false && <span className="text-[12px] text-red-500"></span>}
                </label>
              </div>
              <div className="flex flex-row gap-10 items-center justify-center">
                <button
                  onClick={(e) => {
                    console.log(timestamp);
                    // modified_by = "";
                    let modified_by = getName(
                      `${currentUser.first_name} ${currentUser.last_name}`
                    );
                    setListOfTimeStamps([timestamp, ...timeStamps]);
                    showToast("success", "Record updated successfully!");
                    document.getElementById(PROCEED_DIALOG).close();
                    document.getElementById(STATUS_DIALOG).close();
                  }}
                  className="btn bg-primary text-white mt-2"
                >
                  Yes, proceed!
                </button>
                <button
                  onClick={(e) => {
                    document.getElementById(PROCEED_DIALOG).close();
                  }}
                  className="btn bg-[#CDCDCD] text-black mt-2"
                >
                  Cancel
                </button>
              </div>
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

  const [listOfTimeStamps, setListOfTimeStamps] = useState([
    {
      status: "Pending for Approval",
      modified_by: "Hannah A.",
      remarks:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ea praesentium ducimus, deserunt exercitationem quibusdam perspiciatis eaque vitae aliquid omnis. Autem praesentium consectetur unde ipsa impedit dolores rem quod fugiat?",

      datetime: new Date(),
    },
    {
      status: "Drafted",
      modified_by: "Hannah A.",
      remarks: "",
      datetime: new Date(),
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    dispatch(fetchUser(token));
    dispatch(fetchRecord(recordId));
  }, []);

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
