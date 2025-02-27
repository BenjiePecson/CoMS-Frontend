import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { showToast } from "../../../../assets/global";
import axios from "axios";
import { fetchRecord } from "../../../store/documentdrafting/DocumentDraftingSlice";
import moment from "moment";
import ForAuthorizationForm from "./forms/ForAuthorizationForm";
import AffidavitForm from "./forms/AffidavitForm";
import ListOfStockholdersForm from "./forms/ListOfStockholdersForm";
import NoDisputeForm from "./forms/NoDisputeForm";
import PreEmptiveRightsForm from "./forms/PreEmptiveRightsForm";
import SPAForm from "./forms/SPAForm";
import CGRForm from "./forms/CGRForm";
import AffidavitOfNonOperationForm from "./forms/AffidavitOfNonOperationForm";

const ViewDocumentDrafting = () => {
  const { companyId, document_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.user);
  const [isEditHidden, setIsEditHidden] = useState(true);
  const [isGenerate, setIsGenerate] = useState(false);

  const getRecord = useSelector((state) => state.DocumentDrafting.get_record);
  const selectedCompany = useSelector((state) => state.company.selectedCompany);

  const [listOfTimeStamps, setListOfTimeStamps] = useState([]);

  const [formData, setFormData] = useState(getRecord);
  const [officers, setOfficers] = useState([]);
  const [errors, setErrors] = useState({});

  const statuses = [
    "Drafted",
    "Sent for Approval",
    "For Signature",
    "Filed with SEC",
    "For Verification",
    // (Reverted)
    "Completed",
  ];

  const [documents, setDocuments] = useState([
    "Certificate of Gross Sales/Receipts",
    "SPA - Business Renewal",
    "SECCERT - Waiver of Preemptive Rights",
    "SECCERT - No Dispute",
    "SECCERT - List of Stockholders",
    "SECCERT - For Authorization",
    "Affidavit of Loss",
    "Affidavit of Non-Operation",
    "Cover Sheet for Audited Financial Statements",
    "SMR - Statement of Management's Responsibility for Financial Statements",
  ]);

  const STATUS_DIALOG = "status-dialog";
  const EDIT_DIALOG = "edit-dialog";

  const STATUSES = {
    drafted: "Drafted",
    sent_for_approval: "Sent for Approval",
    for_signature: "For Signature",
    filed_with_sec: "Filed with SEC",
    for_verification: "For Verification",
    completed: "Completed",
  };

  const selectedRecord = useSelector(
    (state) => state.DocumentDrafting.selected_record
  );

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

  const toggleEdit = () => {
    document.getElementById(EDIT_DIALOG).showModal();
  };

  const handleEdit = async () => {
    let status = "error";
    let message = "Error updating the record.";

    let newForm = { ...formData };

    newForm.status = "Sent for Approval";
    const name = `${currentUser.first_name} ${currentUser.last_name}`;

    newForm.modified_by = name;

    try {
      let response = await axios.patch(
        `/document-drafting/:company_id/${newForm.document_id}`,
        newForm
      );

      if (response.status === 200) {
        dispatch(fetchRecord({ companyId, document_id }));
        status = "success";
        message = "Record added successfully!";
      }
    } catch (error) {
      status = "error";
      message = "Error updating the record.";
      console.error("Error updating the record.: ", error);
    } finally {
      showToast(status, message);
      document.getElementById(EDIT_DIALOG).close();
    }
  };

  const handleOnGenerate = async () => {
    try {
      setIsLoading(true);

      let response = await axios.get("/document-drafting-generate", {
        params: {
          company_id: selectedRecord.company_id,
          document_id: selectedRecord.document_id,
        },
      });

      const newWindow = window.open("", "_blank", "width=1280,height=720");

      if (newWindow) {
        newWindow.document.write(response.data);
        newWindow.document.close(); // Ensure the document is rendered
      }
    } catch (error) {
      console.log(error);
      showToast("error", "Failed to generate the record.");
    } finally {
      setIsLoading(false);
    }
  };

  const tableData = (listOfRow) => {
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

        <div className="text-end mt-5">
          <button
            className="btn bg-primary text-white"
            onClick={handleOnGenerate}
            disabled={isGenerate}
          >
            {isGenerate && <span className="loading loading-spinner"></span>}
            Generate File
          </button>
        </div>
      </div>
    );
  };

  const content = () => {
    let listOfRow = [];

    if (selectedRecord.form_data.type === documents[0]) {
      // Certificate of Gross Sales/Receipts
      listOfRow = [
        { col1: "Type", col2: selectedRecord.form_data.type },
        { col1: "Year", col2: selectedRecord.form_data.year },
        {
          col1: "Office Address",
          col2: selectedRecord.form_data.office_address,
        },
        {
          col1: "Revenue Generated",
          col2: (
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-flex gap-1 w-full justify-between">
                <div className="font-bold">
                  Q1 {selectedRecord.form_data.year}
                </div>
                <div>
                  Php{" "}
                  {formatNumberWithCommaAndDecimal(
                    selectedRecord.form_data.revenue_q1
                  )}
                </div>
              </div>
              <div className="flex flex-flex gap-1 w-full justify-between">
                <div className="font-bold">
                  Q2 {selectedRecord.form_data.year}
                </div>
                <div>
                  Php{" "}
                  {formatNumberWithCommaAndDecimal(
                    selectedRecord.form_data.revenue_q2
                  )}
                </div>
              </div>
              <div className="flex flex-flex gap-1 w-full justify-between">
                <div className="font-bold">
                  Q3 {selectedRecord.form_data.year}
                </div>
                <div>
                  Php{" "}
                  {formatNumberWithCommaAndDecimal(
                    selectedRecord.form_data.revenue_q3
                  )}
                </div>
              </div>
              <div className="flex flex-flex gap-1 w-full justify-between">
                <div className="font-bold">
                  Q4 {selectedRecord.form_data.year}
                </div>
                <div>
                  Php{" "}
                  {formatNumberWithCommaAndDecimal(
                    selectedRecord.form_data.revenue_q4
                  )}
                </div>
              </div>
              <div className="flex flex-flex gap-1 w-full justify-between">
                <div>Total Revenue</div>
                <div className="font-bold">
                  Php{" "}
                  {formatNumberWithCommaAndDecimal(
                    selectedRecord.form_data.total_revenue
                  )}
                </div>
              </div>
            </div>
          ),
        },
        {
          col1: "Signatory",
          col2: (
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col gap-1">
                <div className="font-bold">
                  {selectedRecord.form_data.officer_name}
                </div>
                <div>{selectedRecord.form_data.officer_position}</div>
              </div>
            </div>
          ),
        },
      ];
    } else if (selectedRecord.form_data.type === documents[1]) {
      // SPA - Business Renewal
      listOfRow = [
        {
          col1: "Type",
          col2: selectedRecord.form_data.type,
        },
        {
          col1: "Year",
          col2: selectedRecord.form_data.year,
        },
        {
          col1: "Appointees",
          col2: (
            <>
              <div className="flex flex-col gap-3 w-full">
                {selectedRecord.form_data.appointees.map((appointee, index) => {
                  return (
                    <div
                      key={`appointees-${index + 1}`}
                      className="flex flex-col gap-1"
                    >
                      <div className="font-bold">{appointee.name}</div>
                      <div>{appointee.id_no}</div>
                      <div>{appointee.date_place_issued}</div>
                    </div>
                  );
                })}
              </div>
            </>
          ),
        },
        {
          col1: "Signatory",
          col2: (
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col gap-1">
                <div className="font-bold">
                  {selectedRecord.form_data.officer_name}
                </div>
                <div>{selectedRecord.form_data.officer_position}</div>
                <div>{selectedRecord.form_data.officer_nationality}</div>
              </div>
            </div>
          ),
        },
      ];
    } else if (selectedRecord.form_data.type === documents[2]) {
      // SECCERT - Waiver of Preemptive Rights
      listOfRow = [
        {
          col1: "Type",
          col2: selectedRecord.form_data.type,
        },
        {
          col1: "Year",
          col2: selectedRecord.form_data.year,
        },
        {
          col1: "Meeting Date",
          col2: selectedRecord.form_data.meeting_date,
        },
        {
          col1: "Meeting Place",
          col2: selectedRecord.form_data.meeting_place,
        },
        {
          col1: "Authorized Capital Stock",
          col2: (
            <div className="grid grid-cols-2 gap-2 w-full">
              <div className="flex flex-col">
                <p className="font-bold">From</p>
                <div className="flex flex-col gap-2">
                  <div>{selectedRecord.form_data.from}</div>
                  <div>{selectedRecord.form_data.from_divided_into}</div>
                  <div>{selectedRecord.form_data.from_par_value}</div>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="font-bold">To</p>
                <div className="flex flex-col gap-2">
                  <div>{selectedRecord.form_data.to}</div>
                  <div>{selectedRecord.form_data.to_divided_into}</div>
                  <div>{selectedRecord.form_data.to_par_value}</div>
                </div>
              </div>
            </div>
          ),
        },
        {
          col1: "Appointees",
          col2: (
            <>
              <div className="flex flex-col gap-3 w-full">
                {selectedRecord.form_data.appointees.map((appointee, index) => {
                  return (
                    <div
                      key={`appointees-${index + 1}`}
                      className="flex flex-col gap-1"
                    >
                      <div className="font-bold">{appointee.name}</div>
                      <div>{appointee.id_no}</div>
                      <div>{appointee.date_place_issued}</div>
                    </div>
                  );
                })}
              </div>
            </>
          ),
        },
        {
          col1: "Corporate Secretary",
          col2: (
            <>
              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col gap-1">
                  <div className="font-bold">
                    {selectedRecord.form_data.officer_name}
                  </div>
                  <div>{selectedRecord.form_data.office_address}</div>
                </div>
              </div>
            </>
          ),
        },
      ];
    } else if (selectedRecord.form_data.type === documents[3]) {
      // SECCERT - No Dispute
      listOfRow = [
        {
          col1: "Type",
          col2: selectedRecord.form_data.type,
        },
        {
          col1: "Appointees",
          col2: (
            <>
              <div className="flex flex-col gap-3 w-full">
                {selectedRecord.form_data.appointees.map((appointee, index) => {
                  return (
                    <div
                      key={`appointees-${index + 1}`}
                      className="flex flex-col gap-1"
                    >
                      <div className="font-bold">{appointee.name}</div>
                      <div>{appointee.id_no}</div>
                      <div>{appointee.date_place_issued}</div>
                    </div>
                  );
                })}
              </div>
            </>
          ),
        },
        {
          col1: "Corporate Secretary",
          col2: (
            <>
              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col gap-1">
                  <div className="font-bold">
                    {selectedRecord.form_data.officer_name}
                  </div>
                  <div>{selectedRecord.form_data.office_address}</div>
                </div>
              </div>
            </>
          ),
        },
      ];
    } else if (selectedRecord.form_data.type === documents[4]) {
      // SECCERT - List of Stockholders
      listOfRow = [
        {
          col1: "Type",
          col2: selectedRecord.form_data.type,
        },
        {
          col1: "List of Stockholders",
          col2: selectedRecord.form_data.as_of,
        },
        {
          col1: "List of Stockholders",
          col2: <></>,
        },
        {
          col1: "Appointees",
          col2: (
            <>
              <div className="flex flex-col gap-3 w-full">
                {selectedRecord.form_data.appointees.map((appointee, index) => {
                  return (
                    <div
                      key={`appointees-${index + 1}`}
                      className="flex flex-col gap-1"
                    >
                      <div className="font-bold">{appointee.name}</div>
                      <div>{appointee.id_no}</div>
                      <div>{appointee.date_place_issued}</div>
                    </div>
                  );
                })}
              </div>
            </>
          ),
        },
        {
          col1: "Corporate Secretary",
          col2: (
            <>
              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col gap-1">
                  <div className="font-bold">
                    {selectedRecord.form_data.officer_name}
                  </div>
                  <div>{selectedRecord.form_data.office_address}</div>
                </div>
              </div>
            </>
          ),
        },
      ];
    } else if (selectedRecord.form_data.type === documents[5]) {
      // SECCERT - For Authorization
      listOfRow = [
        {
          col1: "Type",
          col2: selectedRecord.form_data.type,
        },
        {
          col1: "Meeting Date",
          col2: selectedRecord.form_data.meeting_date,
        },
        {
          col1: "Resolutions",
          col2: (
            <>
              <div className="flex flex-col gap-3 w-full">
                {selectedRecord.form_data.resolutions.map(
                  (resolution, index) => {
                    return (
                      <div key={`resolution-${index + 1}`}>{resolution}</div>
                    );
                  }
                )}
              </div>
            </>
          ),
        },
        {
          col1: "Appointees",
          col2: (
            <>
              <div className="flex flex-col gap-3 w-full">
                {selectedRecord.form_data.appointees.map((appointee, index) => {
                  return (
                    <div
                      key={`appointees-${index + 1}`}
                      className="flex flex-col gap-1"
                    >
                      <div className="font-bold">{appointee.name}</div>
                      <div>{appointee.id_no}</div>
                      <div>{appointee.date_place_issued}</div>
                    </div>
                  );
                })}
              </div>
            </>
          ),
        },
        {
          col1: "Corporate Secretary",
          col2: (
            <>
              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col gap-1">
                  <div className="font-bold">
                    {selectedRecord.form_data.officer_name}
                  </div>
                  <div>{selectedRecord.form_data.office_address}</div>
                </div>
              </div>
            </>
          ),
        },
      ];
    } else if (selectedRecord.form_data.type === documents[6]) {
      // Affidavit of Loss
      listOfRow = [
        {
          col1: "Type",
          col2: selectedRecord.form_data.type,
        },
        {
          col1: "Items",
          col2: (
            <>
              <div className="flex flex-col gap-3 w-full">
                {selectedRecord.form_data.list_items.map((item, index) => {
                  return <div key={`item-${index + 1}`}>{item}</div>;
                })}
              </div>
            </>
          ),
        },
        {
          col1: "Appointees",
          col2: (
            <>
              <div className="flex flex-col gap-3 w-full">
                {selectedRecord.form_data.appointees.map((appointee, index) => {
                  return (
                    <div
                      key={`appointees-${index + 1}`}
                      className="flex flex-col gap-1"
                    >
                      <div className="font-bold">{appointee.name}</div>
                      <div>{appointee.id_no}</div>
                      <div>{appointee.date_place_issued}</div>
                    </div>
                  );
                })}
              </div>
            </>
          ),
        },
        {
          col1: "Corporate Secretary",
          col2: (
            <>
              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col gap-1">
                  <div className="font-bold">
                    {selectedRecord.form_data.officer_name}
                  </div>
                  <div>{selectedRecord.form_data.office_address}</div>
                </div>
              </div>
            </>
          ),
        },
      ];
    } else if (selectedRecord.form_data.type === documents[7]) {
      // Affidavit of Loss
      listOfRow = [
        {
          col1: "Type",
          col2: selectedRecord.form_data.type,
        },
        {
          col1: "Appointees",
          col2: (
            <>
              <div className="flex flex-col gap-3 w-full">
                {selectedRecord.form_data.appointees.map((appointee, index) => {
                  return (
                    <div
                      key={`appointees-${index + 1}`}
                      className="flex flex-col gap-1"
                    >
                      <div className="font-bold">{appointee.name}</div>
                      <div>{appointee.id_no}</div>
                      <div>{appointee.date_place_issued}</div>
                    </div>
                  );
                })}
              </div>
            </>
          ),
        },
        {
          col1: "Corporate Secretary",
          col2: (
            <>
              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col gap-1">
                  <div className="font-bold">
                    {selectedRecord.form_data.officer_name}
                  </div>
                  <div>{selectedRecord.form_data.office_address}</div>
                </div>
              </div>
            </>
          ),
        },
      ];
    } else if (selectedRecord.form_data.type === documents[8]) {
      // Cover Sheet for Audited Financial Statements
      listOfRow = [
        {
          col1: "Type",
          col2: selectedRecord.form_data.type,
        },
        {
          col1: "SEC Registration Number",
          col2: selectedRecord.form_data.sec_registration_number,
        },
        {
          col1: "Company Name",
          col2: selectedRecord.form_data.corporate_name,
        },
        {
          col1: "Principal Office",
          col2: selectedRecord.form_data.office_address,
        },
        {
          col1: "Form Type",
          col2: selectedRecord.form_data.form_type,
        },
        {
          col1: "Department Requiring the Report",
          col2: selectedRecord.form_data.department,
        },
        {
          col1: "Secondary License",
          col2: selectedRecord.form_data.secondary_license || "N/A",
        },
        {
          col1: "Official Email Address",
          col2: selectedRecord.form_data.official_email_address,
        },
        {
          col1: "Official Telephone Number",
          col2: selectedRecord.form_data.official_telephone_number || "N/A",
        },
        {
          col1: "Official Mobile Number",
          col2: selectedRecord.form_data.official_mobile_number || "N/A",
        },
        {
          col1: "Number of Shareholders",
          col2: selectedRecord.form_data.number_of_shareholders,
        },
        {
          col1: "Date of Annual Meeting",
          col2: selectedRecord.form_data.date_of_annual_meeting,
        },
        {
          col1: "Fiscal Year End",
          col2: selectedRecord.form_data.fiscal_year_end,
        },
        {
          col1: "Contact Person Name",
          col2: selectedRecord.form_data.contact_person_name,
        },
        {
          col1: "Contact Person Telephone Number",
          col2: selectedRecord.form_data.contact_person_telephone_number || "N/A",
        },
        {
          col1: "Contact Person Mobile Number",
          col2: selectedRecord.form_data.contact_person_mobile_number || "N/A",
        },
        {
          col1: "Contact Person Address",
          col2: selectedRecord.form_data.contact_person_address || "N/A",
        },

      ];
    } else if (selectedRecord.form_data.type === documents[9]) {
      // SMR
      listOfRow = [
        {
          col1: "Type",
          col2: selectedRecord.form_data.type,
        },
        {
          col1: "Company Name",
          col2: selectedRecord.form_data.corporate_name,
        },
        {
          col1: "Audited Years In Question",
          col2: selectedRecord.form_data.audited_years_in_question,
        },
        {
          col1: "Principal Office",
          col2: selectedRecord.form_data.office_address,
        },
        {
          col1: "President Name",
          col2: selectedRecord.form_data.president_name,
        },
        {
          col1: "Treasurer Name",
          col2: selectedRecord.form_data.treasurer_name,
        },
        {
          col1: "RDO Number",
          col2: selectedRecord.form_data.rdo_number,
        },
        {
          col1: "RDO Address",
          col2: selectedRecord.form_data.rdo_address,
        },
        {
          col1: "RDO City",
          col2: selectedRecord.form_data.rdo_city,
        },
      ];
    }

    return tableData(listOfRow);
  };

  // useEffect(() => {   
  //   console.log(selectedRecord);
  // }, [selectedRecord]);

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
          className={`absolute w-3 h-3  ${status == "Reverted"
            ? "bg-error border-error"
            : "bg-primary border-primary"
            } rounded-full -start-1.5 border  dark:border-gray-900 dark:bg-gray-700 mt-2`}
        ></div>
        <h3
          className={`text-lg font-semibold ${status == "Reverted" ? "text-error" : "text-gray-900"
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
          className={`text-sm poppins-normal text-gray-500 mt-2 ${remarks != "" && "border-l-4 border-gray-200 p-2"
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

  const getName = (fullName) => {
    if (!fullName) return;

    const [firstName, ...lastNameParts] = fullName.split(" ");

    const lastNameInitial = lastNameParts[lastNameParts.length - 1].charAt(0);

    return `${firstName} ${lastNameInitial}.`;
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
                  case STATUSES.modified:
                    if (index == 0) {
                      nextStep = "Mark as Approved";
                      status = STATUSES.approved;
                    }
                    break;
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

  const handleOnChange = async (e, fieldName) => {
    const { name, value } = e.target;

    const data = formData.form_data;

    let sum = 0;

    if (
      name == "revenue_q1" ||
      name == "revenue_q2" ||
      name == "revenue_q3" ||
      name == "revenue_q4"
    ) {
      let newValue = parseFloat(value);

      let q1 = Number(data.revenue_q1);
      let q2 = Number(data.revenue_q2);
      let q3 = Number(data.revenue_q3);
      let q4 = Number(data.revenue_q4);

      if (name == "revenue_q1") {
        sum = newValue + q2 + q3 + q4;
      }

      if (name == "revenue_q2") {
        sum = q1 + newValue + q3 + q4;
      }

      if (name == "revenue_q3") {
        sum = q1 + q2 + newValue + q4;
      }

      if (name == "revenue_q4") {
        sum = q1 + q2 + q3 + newValue;
      }

      setFormData({
        ...formData,
        form_data: {
          ...formData.form_data,
          [name]: value,
          total_revenue: sum,
        },
      });
    } else {
      setFormData({
        ...formData,
        form_data: {
          ...formData.form_data,
          [name]: value,
        },
      });
    }

    if (value == "") {
      setErrors({
        ...errors,
        [name]: `${fieldName} is required.`,
      });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleOnChangeAppointees = async (e, index) => {
    const { name, value } = e.target;

    let newFormData = { ...formData };
    let new_form_data = { ...formData.form_data };
    let new_appointees = [...new_form_data.appointees];
    new_form_data.appointees = new_appointees.map((appointee, _index) => {
      if (index == _index) {
        return { ...appointee, [name]: value };
      }
      return appointee;
    });
    newFormData.form_data = new_form_data;
    setFormData(newFormData);
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

        <dialog id={EDIT_DIALOG} className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col w-full items-center justify-center gap-2">
                <div className="flex w-full justify-between">
                  <h1 className="poppins-semibold text-start w-full mb-3">
                    Update Details
                  </h1>
                  <button
                    className="text-red-500"
                    onClick={(e) => {
                      document.getElementById(EDIT_DIALOG).close();
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
                        d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div className="w-full">
                  {formData.form_data.type == documents[0] && (
                    <CGRForm
                      formData={formData}
                      officers={officers}
                      handleOnChange={(e) => {
                        handleOnChange(e);
                      }}
                      setFormData={setFormData}
                    />
                  )}
                  {formData.form_data.type == documents[1] && (
                    <SPAForm
                      formData={formData}
                      officers={officers}
                      setFormData={setFormData}
                      handleOnChange={handleOnChange}
                      handleOnChangeAppointees={handleOnChangeAppointees}
                    />
                  )}
                  {formData.form_data.type == documents[2] && (
                    <PreEmptiveRightsForm
                      formData={formData}
                      officers={officers}
                      setFormData={setFormData}
                      handleOnChange={handleOnChange}
                      handleOnChangeAppointees={handleOnChangeAppointees}
                    />
                  )}
                  {formData.form_data.type == documents[3] && (
                    <NoDisputeForm
                      formData={formData}
                      officers={officers}
                      setFormData={setFormData}
                      handleOnChange={handleOnChange}
                      handleOnChangeAppointees={handleOnChangeAppointees}
                    />
                  )}
                  {formData.form_data.type == documents[4] && (
                    <ListOfStockholdersForm
                      formData={formData}
                      officers={officers}
                      setFormData={setFormData}
                      handleOnChange={handleOnChange}
                      handleOnChangeAppointees={handleOnChangeAppointees}
                    />
                  )}
                  {formData.form_data.type == documents[5] && (
                    <ForAuthorizationForm
                      formData={formData}
                      officers={officers}
                      setFormData={setFormData}
                      handleOnChange={handleOnChange}
                      handleOnChangeAppointees={handleOnChangeAppointees}
                    />
                  )}

                  {formData.form_data.type == documents[6] && (
                    <AffidavitForm
                      formData={formData}
                      selectedCompany={selectedCompany}
                      setFormData={setFormData}
                      handleOnChange={handleOnChange}
                      handleOnChangeAppointees={handleOnChangeAppointees}
                    />
                  )}

                  {formData.form_data.type == documents[7] && (
                    <AffidavitOfNonOperationForm
                      formData={formData}
                      selectedCompany={selectedCompany}
                      setFormData={setFormData}
                      handleOnChange={handleOnChange}
                      handleOnChangeAppointees={handleOnChangeAppointees}
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-row gap-10 items-center justify-between">
                <button
                  onClick={(e) => {
                    document.getElementById(EDIT_DIALOG).close();
                  }}
                  className="btn bg-[#CDCDCD] text-black mt-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEdit}
                  className="btn bg-primary text-white mt-2"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </>
    );
  };

  useEffect(() => {
    dispatch(fetchRecord({ companyId, document_id }));
  }, []);

  useEffect(() => {
    if (selectedRecord.document_id != "") {
      const status = statuses.indexOf(selectedRecord.status);
      setSelectedStatus(status);

      setListOfTimeStamps([
        {
          status: selectedRecord.status,
          datetime: selectedRecord.updated_at,
          modified_by: selectedRecord.modified_by,
          remarks: "",
        },
      ]);
      setFormData(selectedRecord);
    }
  }, [selectedRecord]);

  useEffect(() => {
    if (selectedCompany.companyId != "") {
      if (Object.keys(selectedCompany.latestGIS).length != 0) {
        let officers = selectedCompany.latestGIS.directors_or_officers.filter(
          (officer) => {
            return officer.officer != "N/A";
          }
        );
        setOfficers(officers);
      }
    }
  }, [selectedCompany]);

  return (
    <div className="flex flex-col w-full h-screen">
      <button
        onClick={() => {
          navigate(-1);
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

      <div className="mb-5">
        <div className="flex flex-row w-full justify-between items-center ">
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
                  {selectedRecord.form_name}
                </span>
                {/* <span className="poppins-bold text-[18px]">{selectedRecord.recordName}</span> */}
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="col-span-2">
          <div
            className="card bg-white py-5 text-start"
            onMouseEnter={() => setIsEditHidden(false)}
            onMouseLeave={() => setIsEditHidden(true)}
          >
            <div className="px-10">
              <div className="flex justify-end w-full">
                {!isEditHidden ? (
                  <div
                    className="cursor-pointer flex flex-row gap-2 items-center"
                    onClick={toggleEdit}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                    </svg>{" "}
                    Update Details
                  </div>
                ) : (
                  <div className=" flex flex-row gap-2 items-center text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                    </svg>{" "}
                    Update Details
                  </div>
                )}
              </div>
              {/* <div>{tableData()}</div> */}
              <div>{content()}</div>
            </div>
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
              <div className="px-10 w-full">
                <div className=" w-full">
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
                  <span className="font-semibold">Note: </span>Please ensure
                  that all details are correct before downloading the file for
                  the client's signature.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {dialogComponents()}
    </div>
  );
};

export default ViewDocumentDrafting;
