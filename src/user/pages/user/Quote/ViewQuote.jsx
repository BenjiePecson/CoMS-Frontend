import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRecord } from "../../../store/quotes/QuotesSlice";
import RecordNotFound from "../../../components/RecordNotFound";
import moment from "moment";
import axios from "axios";
import { showToast } from "../../../../assets/global";

export const ViewQuote = () => {
  const { quote_id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedRecord = useSelector((state) => state.quotes.get_record);
  const currentUser = useSelector((state) => state.user.user);

  const [isLoading, setIsLoading] = useState(true);
  const [isGenerate, setIsGenerate] = useState(false);

  const TIMESTAMP_STATE = {
    status: "",
    modified_by: "",
    remarks: "",
    datetime: new Date(),
  };

  const [timestamp, setTimeStamp] = useState(TIMESTAMP_STATE);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  const [listOfTimeStamps, setListOfTimeStamps] = useState([]);

  const STATUSES = {
    drafted: "Drafted",
    approved: "Approved",
    pending_signature: "Pending Signature",
    pending_payment: "Pending Payment",
    signed: "Signed",
    paid: "Paid",
    reverted: "Reverted",
    completed: "Completed",
  };

  const STATUS_DIALOG = "statusDialog";
  const PROCEED_DIALOG = "proceedDialog";
  const COMPLETE_DIAlOG = "completeDialog";

  const getName = (fullName) => {
    if (!fullName) return;

    const [firstName, ...lastNameParts] = fullName.split(" ");

    const lastNameInitial = lastNameParts[lastNameParts.length - 1].charAt(0);

    return `${firstName} ${lastNameInitial}.`;
  };

  // Function Definitions
  const formatIntegerWithComma = (integerPart) => {
    return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatDecimalPlaces = (decimalPart) => {
    if (decimalPart === undefined) {
      return "00"; // No decimal part, return "00"
    }

    // Truncate or round to a maximum of four decimal places
    let formattedDecimalPart = decimalPart.substring(0, 4);

    // Ensure exactly two decimal places
    if (formattedDecimalPart.length === 0) {
      return "00"; // No decimal part at all
    } else if (formattedDecimalPart.length === 1) {
      return `${formattedDecimalPart}0`; // One decimal place, append one zero
    } else if (formattedDecimalPart.length === 2) {
      return `${formattedDecimalPart}`; // Two decimal places
    } else if (formattedDecimalPart.length === 3) {
      return `${formattedDecimalPart}`; // Three decimal places
    } else {
      return formattedDecimalPart; // Four decimal places or more, no extra padding needed
    }
  };

  const formatNumberWithCommaAndDecimal = (number) => {
    if (number == null || number == "") return "0.00";
    const numStr = number.toString();
    const [integerPart, decimalPart] = numStr.split(".");
    const formattedIntegerPart = formatIntegerWithComma(integerPart);
    const formattedDecimalPart = formatDecimalPlaces(decimalPart);
    return `${formattedIntegerPart}.${formattedDecimalPart}`;
  };

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

  const handleProceedBtn = async (form) => {
    let type = "error";
    let message = "Failed to update this record.";
    try {
      form = { ...form, comments: form.remarks };
      let response = await axios.patch(`/quotes/${quote_id}`, form);
      if (response.status === 200) {
        type = "success";
        message = "Record updated successfully!";
        setListOfTimeStamps([form, ...listOfTimeStamps]);
        dispatch(fetchRecord(quote_id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      showToast(type, message);
      document.getElementById(PROCEED_DIALOG).close();
      document.getElementById(STATUS_DIALOG).close();
    }
  };

  const tableData = () => {
    const listOfRow = [
      {
        col1: "Quote Number",
        col2: selectedRecord.quote_number,
      },
      {
        col1: "Quote Name",
        col2: selectedRecord.quote_name,
      },
      {
        col1: "Folder ID",
        col2: selectedRecord.folder_id,
      },
      {
        col1: "Document ID",
        col2: selectedRecord.google_doc_id,
      },
      {
        col1: "Recipient Company",
        col2: selectedRecord.form_data.recipient_company,
      },
      {
        col1: "Recipient Address",
        col2: selectedRecord.form_data.recipient_address,
      },
      {
        col1: "Recipient Name",
        col2: selectedRecord.form_data.recipient_name,
      },
      {
        col1: "Recipient Email",
        col2: selectedRecord.form_data.recipient_email,
      },
      {
        col1: "Subject",
        col2: selectedRecord.form_data.service_type,
      },
      {
        col1: "Scope of Work",
        col2: (
          <div>
            {selectedRecord.form_data.scope_of_work.map((scope, index) => {
              const sign =
                selectedRecord.form_data.currency == "USD" ? "$" : "₱";
              let service_fee = formatNumberWithCommaAndDecimal(
                scope.service_fee
              );
              let oop_expenses = formatNumberWithCommaAndDecimal(
                scope.oop_expenses
              );
              let vat =
                selectedRecord.form_data.currency == "USD" ? "" : " + 12% VAT";

              let display_service_fee = `${sign}${service_fee}${vat}`;
              let display_oop_expenses = `${sign}${oop_expenses}`;
              return (
                <ul
                  key={`list-of-scope-${index}`}
                  className="list-disc pl-4 w-full mb-5"
                >
                  <li>
                    <span className="font-bold">{scope.task}</span>{" "}
                    <span>{scope.sub_task}</span>
                  </li>
                  <div className="font-bold">
                    Service Fee: {display_service_fee}
                  </div>
                  <div className="font-bold">
                    OOP Expenses: {display_oop_expenses}
                  </div>
                </ul>
              );
            })}
          </div>
        ),
      },
    ];

    return (
      <div className="w-full overflow-x-auto pb-5">
        <table className="table">
          <thead>
            <tr>
              <th className="w-[30%]"></th>
              <th className="w-full"></th>
            </tr>
          </thead>
          <tbody>
            {listOfRow.map((row, index) => {
              return (
                <tr key={`selected-record-row-${index}`}>
                  <td className="font-bold">{row.col1}</td>
                  <td className="flex items-end">{row.col2}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="text-end">
          <button
            className="btn bg-primary text-white"
            onClick={handleGenerate}
            disabled={isGenerate}
          >
            {isGenerate && <span className="loading loading-spinner"></span>}
            Generate File
          </button>
        </div>
      </div>
    );
  };

  const timestampComponent = () => {
    return (
      <ol className="relative border-s border-gray-400 dark:border-gray-700 w-full">
        {listOfTimeStamps.length != 0 && (
          <>
            {listOfTimeStamps.map((timestamp_record, index) => {
              let btnContent = <></>;
              let btnGenerate = <></>;
              let nextStep = "";
              let status = "";

              if (
                listOfTimeStamps.length != 0 &&
                listOfTimeStamps[0].status == timestamp_record.status
              ) {
                switch (timestamp_record.status) {
                  // case STATUSES.test:
                  //   nextStep = "Mark as Routed for Signature";
                  //   status = STATUSES.routed_for_signature;
                  //   btnGenerate = (
                  //     <button
                  //       className="btn btn-sm btn-outline"
                  //       disabled={isLoading}
                  //       onClick={async () => {
                  //         try {
                  //           setIsLoading(true);
                  //           let response = await axios.get(
                  //             `/record/generate/${selectedRecord.recordId}`,
                  //             {
                  //               params: {
                  //                 recordId: selectedRecord.recordId,
                  //               },
                  //             }
                  //           );
                  //           const newWindow = window.open(
                  //             "",
                  //             "_blank",
                  //             "width=1280,height=720"
                  //           );
                  //           if (newWindow) {
                  //             newWindow.document.write(response.data);
                  //             newWindow.document.close(); // Ensure the document is rendered
                  //           }
                  //         } catch (error) {
                  //           console.log(error);
                  //         } finally {
                  //           setIsLoading(false);
                  //         }
                  //       }}
                  //     >
                  //       {isLoading && (
                  //         <span className="loading loading-spinner loading-xs"></span>
                  //       )}
                  //       Generate
                  //     </button>
                  //   );
                  //   break;
                  case STATUSES.drafted:
                    nextStep = "Mark as Approved";
                    status = STATUSES.approved;
                    break;
                  case STATUSES.approved:
                    nextStep = "Mark as Pending Signature";
                    status = STATUSES.pending_signature;
                    break;
                  case STATUSES.pending_signature:
                    nextStep = "Mark as Pending Payment";
                    status = STATUSES.pending_payment;
                    break;
                  case STATUSES.pending_payment:
                    nextStep = "Mark as Signed";
                    status = STATUSES.signed;
                    break;
                  case STATUSES.signed:
                    nextStep = "Mark as Paid";
                    status = STATUSES.paid;
                    break;
                  case STATUSES.paid:
                    nextStep = "Mark as Completed";
                    status = STATUSES.completed;
                    break;
                  default:
                    btnContent = <></>;
                    break;
                }
              }

              btnContent = getButton(nextStep, () => {
                setTimeStamp({
                  ...timestamp,
                  status: status,
                  remarks: "",
                });
                document.getElementById(PROCEED_DIALOG).showModal();
              });

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
        )}
      </ol>
    );
  };

  const dialogComponents = () => {
    return (
      <>
        <dialog id={STATUS_DIALOG} className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="py-4 px-10">{timestampComponent()}</div>
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
      </>
    );
  };

  const handleGenerate = async () => {
    try {
      setIsGenerate(true);

      let response = await axios.get(`/quote-generate`, {
        params: {
          quote_id: selectedRecord.quote_id,
        },
      });

      const newWindow = window.open("", "_blank", "width=1280,height=720");

      if (newWindow) {
        newWindow.document.write(response.data);
        newWindow.document.close(); // Ensure the document is rendered
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsGenerate(false);
    }
  };

  useEffect(() => {
    dispatch(fetchRecord(quote_id));
  }, []);

  useEffect(() => {
    if (selectedRecord.quote_id != "") {
      setListOfTimeStamps(selectedRecord.timestamps);
      setIsLoading(false);
    }
  }, [selectedRecord]);

  if (isLoading) {
    return (
      <div className="w-full text-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row w-full justify-between mb-2">
        <button
          onClick={() => {
            navigate(`/quote`);
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

      <div className="mb-5">
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
                  {selectedRecord.quote_name}
                </span>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col text-end">
            <div className="border rounded-full border-black px-3 py-1 text-center text-sm font-semibold">
              {selectedRecord.timestamps.length > 0 &&
                selectedRecord.timestamps[0].status}
            </div>
          </div> */}
        </div>
        <hr />
      </div>

      <div className="text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="col-span-2">
            <div className="card bg-white py-5 text-start">
              <div className="px-10">{tableData()}</div>
            </div>
          </div>
          <div className="col-span-1 w-full">
            <div className="flex flex-col gap-5">
              <div
                className="card bg-white pt-5  text-start w-full cursor-pointer"
                onClick={() => {
                  document.getElementById(STATUS_DIALOG).showModal();
                }}
              >
                {/* <div className="px-10 w-full"> */}
                <div className="px-10 w-full">
                  {listOfTimeStamps.length != 0 && (
                    <ol className="relative border-s border-gray-400 dark:border-gray-700 w-full">
                      {listOfTimeStampComponent(
                        0,
                        listOfTimeStamps[0].status,
                        listOfTimeStamps[0].datetime,
                        listOfTimeStamps[0].modified_by,
                        listOfTimeStamps[0].remarks
                      )}
                    </ol>
                  )}
                </div>
              </div>
              <div className="card bg-white p-5 text-start w-full">
                <div className="flex flex-row gap-2">
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-8 text-orange-400"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="text-justify text-sm">
                    <span className="font-semibold">Note: </span>Please ensure that all details are
                    correct before downloading the file for the client's
                    signature.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {dialogComponents()}
    </>
  );
};
