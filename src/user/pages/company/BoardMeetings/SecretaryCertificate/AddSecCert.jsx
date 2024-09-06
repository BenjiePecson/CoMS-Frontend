import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { PDFViewer } from "@react-pdf/renderer";
import PDFViewerSecCert from "./PDFViewerSecCert";
import { showToast } from "../../../../../assets/global";
import {
  addSecretaryCertificate,
  secretaryCertificateState,
} from "../../../../store/boardmeetings/SecretaryCertificateSlice";
import moment from "moment";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";

const AddSecCert = () => {
  const { companyId } = useParams();
  const selectedCompany = useSelector((state) => state.company.selectedCompany);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const dispatch = useDispatch();
  const [editFolderID, setEditFolderID] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedSecCertType, setSelectedSecCertType] = useState(
    "Secretary Certificate Waiver of Pre-emptive rights"
  );

  const appointeeInfo = {
    name: "Juana Change",
    position: "IT Officer",
  };
  // const [appointeeData, setAppointeeData] = useState(appointeeInfo);
  // const [resolutionData, setResolutionData] = useState("");

  // const reso =
  //   "RESOLVED, as it resolved that the Board of Directors hereby appoint << Name >>, << Position >> as the Point of Contact to transact, apply, submit, receive, sign for on behalf of the company in all Converge related transactions.";
  // const initialData = {
  //   name: "",
  //   address: "",
  //   nationality: "",
  //   company: "",
  //   meeting_date: "",
  //   place_of_meeting: "",
  //   increase_from: "", //"ONE MILLION PESOS (PHP 1,000,000)",
  //   divided_into: "", //"ONE MILLION SHARES (1,000,000)",
  //   par_value_of: "", //"ONE PESO (PHP1.00)",
  //   par_value_to: "", //"FIVE MILLION PESOS (PHP5,000,000.00)",
  //   par_value_divided_into: "", //"FIVE MILLION SHARES (5,000,000)",
  //   par_value_each_of: "", //"ONE PESO (PHP1.00)",
  //   principal_office: "",
  //   as_of: "",
  //   stockHoldersInfo: [],
  //   offices: "Converge",
  //   appointees: [],
  //   board_meeting_date: "",
  //   board_resolutions: [reso],
  //   tax_id_number: "", //"123-456-789-000",
  // };

  const [formData, setFormData] = useState(secretaryCertificateState.details);
  const [previewData, setPreviewData] = useState(
    secretaryCertificateState.details
  );

  const handleOnChange = (ev) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
  };

  const getForm = (
    type = "Secretary Certificate Waiver of Pre-emptive rights"
  ) => {
    if (type == "Secretary Certificate of no Dispute") {
      return noDisputeForm();
    }
    if (type == "Secretary Certificate for List of Stockholders") {
      return listOfStockholdersForm();
    }
    if (type == "Secretary Certificate for Authorization") {
      return authorizationForm();
    }

    return preEmptiveRightsForm();
  };

  const preEmptiveRightsForm = () => {
    return (
      <div className="flex flex-col">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Meeting Date <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="date"
            className="input input-bordered w-full"
            value={formData.meeting_date}
            name="meeting_date"
            onChange={handleOnChange}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Meeting Place <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.place_of_meeting}
            name="place_of_meeting"
            onChange={handleOnChange}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Increase From <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.increase_from}
            name="increase_from"
            onChange={handleOnChange}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Divided Into <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.divided_into}
            name="divided_into"
            onChange={handleOnChange}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Par Value of <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.par_value_of}
            name="par_value_of"
            onChange={handleOnChange}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Par Value Each to <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.par_value_to}
            name="par_value_to"
            onChange={handleOnChange}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Par Value Each divided into{" "}
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.par_value_divided_into}
            name="par_value_divided_into"
            onChange={handleOnChange}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Par Value Each Of <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.par_value_each_of}
            name="par_value_each_of"
            onChange={handleOnChange}
          />
        </label>
      </div>
    );
  };

  const noDisputeForm = () => {
    return (
      <>
        {/* <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Pricipal Office <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.principal_office}
            name="principal_office"
            onChange={handleOnChange}
          />
        </label> */}
      </>
    );
  };

  const listOfStockholdersForm = () => {
    return (
      <>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              As of <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="date"
            className="input input-bordered w-full"
            value={formData.as_of}
            name="as_of"
            onChange={handleOnChange}
          />
        </label>
      </>
    );
  };

  const authorizationForm = () => {
    return (
      <>
        <div className="flex flex-row gap-2 items-end w-full">
          <div className="w-full">
            <div className="flex flex-row items-center w-full justify-between py-2">
              <span>Board Resolutions</span>
              <button
                className="btn btn-sm bg-primary text-white"
                onClick={() => {
                  setFormData({
                    ...formData,
                    board_resolutions: [...formData.board_resolutions, ""],
                  });
                }}
              >
                Add
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {formData.board_resolutions.map((reso, index) => {
                return (
                  <label className="form-control w-full" key={`reso ${index}`}>
                    <div className="label">
                      <span className="label-text">
                        Resolution #{index + 1}{" "}
                        <span className="text-red-500">*</span>
                      </span>
                    </div>
                    <textarea
                      className="textarea textarea-bordered w-full"
                      rows={10}
                      cols={10}
                      onChange={(ev) => {
                        let boardreso = [...formData.board_resolutions];
                        boardreso[index] = ev.target.value;
                        setFormData({
                          ...formData,
                          board_resolutions: boardreso,
                        });
                      }}
                      defaultValue={reso}
                    ></textarea>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col gap-2">
          {formData.appointees.map((appointee, index) => {
            return (
              <div
                key={`appointee-${index}`}
                className="flex flex-row gap-2 w-full justify-between items-center"
              >
                <div className="flex flex-row gap-2">
                  <div>{index + 1}.</div>
                  <div>{appointee.name}</div>
                  <div>-</div>
                  <div>{appointee.position}</div>
                </div>
                <div
                  className="p-2 cursor-pointer"
                  onClick={() => {
                    let updatedAppointees = formData.appointees.filter(
                      (_, idx) => index != idx
                    );
                    setFormData({ ...formData, appointees: updatedAppointees });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 text-red-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div> */}
        {/* <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Pricipal Office <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            value={formData.offices}
            name="offices"
            onChange={handleOnChange}
          />
        </label> */}
      </>
    );
  };

  const dialogComponents = () => {
    return (
      <>
        {/* Preview PDF Modal */}
        <dialog id="previewModal" className="modal">
          <div className="modal-box w-11/12 max-w-5xl p-2 rounded-sm">
            <PDFViewerSecCert
              formData={formData}
              previewData={previewData}
              selectedSecCertType={selectedSecCertType}
            />

            <div className="pt-5 flex flex-row justify-end">
              <button
                className="btn bg-primary text-white"
                onClick={() => {
                  toggleCompleted();
                  document.getElementById("previewModal").close();
                }}
              >
                Mark as Drafted
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {/* Mark as Completed Modal*/}
        <dialog id="setSecCertCompleted" className="modal">
          <div className="modal-box">
            <div className="flex flex-row justify-between py-4">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                  ✕
                </button>
              </form>
            </div>
            <div className="flex flex-col gap-5">
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
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </dialog>
      </>
    );
  };

  const toggleCompleted = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to proceed to the next step?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#273069",
      confirmButtonText: "Yes, proceed!",
      cancelButtonColor: "#CDCDCD",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let status = "error";
        let message = "Failed to update the record.";
        try {
          let newData = {
            details: formData,
            type: selectedSecCertType,
            companyId: companyId,
            gdrivefolder_id: editFolderID,
            status: "Drafted",
          };

          let response = await axios.post(
            `/secretary-certificate/${companyId}`,
            newData
          );
          if (response.data.success) {
            status = "success";
            message = "Record was added successfully.";

            navigate(`/company/${companyId}/secretary-certificate`);
          }
        } catch (error) {
          console.log(error);
        } finally {
          showToast(status, message);
        }
        ///
      }
    });
  };

  const options = [
    {
      value: "Secretary Certificate Waiver of Pre-emptive rights",
      label: "Secretary Certificate Waiver of Pre-emptive rights",
    },
    {
      value: "Secretary Certificate of no Dispute",
      label: "Secretary Certificate of no Dispute",
    },
    {
      value: "Secretary Certificate for List of Stockholders",
      label: "Secretary Certificate for List of Stockholders",
    },
    {
      value: "Secretary Certificate for Authorization",
      label: "Secretary Certificate for Authorization",
    },
  ];

  useEffect(() => {
    if (selectedCompany.companyId != "") {
      // let companyName = removeTrailingPeriod(selectedCompany.companyName);
      let companyName = selectedCompany.companyName;

      if (selectedCompany.latestGIS != undefined) {
        if (selectedCompany.latestGIS.length != 0) {
          if (selectedCompany.latestGIS.directors_or_officers.length != 0) {
            let corp_sec =
              selectedCompany.latestGIS.directors_or_officers.filter((_) =>
                _.officer.toLowerCase().includes("secretary")
              );

            let stockHolders = [];

            if (
              selectedCompany.latestGIS.stock_holders_information.information
                .length > 0
            ) {
              stockHolders =
                selectedCompany.latestGIS.stock_holders_information.information.map(
                  (stockholder) => {
                    return {
                      name: stockholder.name,
                      nationality: stockholder.nationality,
                      no_of_subscribed_shares: stockholder.number,
                      amount_of_subscribed_shares: stockholder.amount_paid,
                      paidup_capital: stockholder.amount_paid,
                      amount_of_paid_APIC: "-",
                      total_amount_paid: stockholder.amount_paid,
                    };
                  }
                );
            }

            if (corp_sec.length != 0) {
              let newData = {
                company: companyName,
                name: corp_sec[0].name,
                address: corp_sec[0].current_residual_address,
                nationality: corp_sec[0].nationality,
                tax_id_number: corp_sec[0].tax_id_number,
                principal_office:
                  selectedCompany.latestGIS.complete_principal_office_address,
                stockHoldersInfo: stockHolders,
                board_meeting_date:
                  selectedCompany.latestGIS.actual_date_of_annual_meeting,
              };

              setFormData({
                ...formData,
                ...newData,
              });
              setPreviewData({
                ...previewData,
                ...newData,
              });
            }
          }
        }
      }
    }
  }, [selectedCompany]);

  return (
    <>
      <div className="flex flex-col flex-1">
        <div>
          <Breadcrumbs
            lists={[
              { goto: "/", text: "Home" },
              {
                goto: `/company/${selectedCompany.companyId}`,
                text: `${selectedCompany.companyName}`,
              },
              {
                goto: `/company/${selectedCompany.companyId}/secretary-certificate`,
                text: "Secretary Certificate",
              },
              { goto: "/", text: "Create" },
            ]}
          />
        </div>
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-col sm:flex-row justify-between w-full gap-2 items-start md:items-center">
            <div className="poppins-bold text-color-2 text-[24px] flex items-center">
              Create New Secretary Certificate
            </div>
            <div>
              <Link
                to={`/company/${companyId}/secretary-certificate/`}
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

        <div className="flex flex-col md:flex-row gap-2 py-5 items-start flex-1">
          <div className="flex flex-col w-full md:w-[40%] bg-white p-5 rounded-lg gap-5 shadow-lg">
            <div>
              <Select
                options={options}
                onChange={(option) => {
                  setSelectedSecCertType(option.value);
                }}
                defaultValue={options[0]}
              />
            </div>
            {/* <div>{preEmptiveRightsForm()}</div> */}
            <div>{getForm(selectedSecCertType)}</div>
            <div className="">
              <button
                className="btn bg-primary text-white w-full"
                onClick={(ev) => {
                  setPreviewData(formData);
                  document.getElementById("previewModal").showModal();
                }}
              >
                Preview
              </button>
            </div>
          </div>
          <PDFViewerSecCert
            formData={formData}
            previewData={previewData}
            selectedSecCertType={selectedSecCertType}
          />
        </div>
      </div>

      {dialogComponents()}
    </>
  );
};

export default AddSecCert;
