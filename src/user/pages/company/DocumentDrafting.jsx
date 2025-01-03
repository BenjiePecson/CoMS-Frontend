import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Link, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import DataTable, { createTheme } from "react-data-table-component";
import { showToast } from "../../../assets/global";
import axios from "axios";
import {
  appointeeState,
  fetchAllRecords,
  fetchRecords,
  stockholderState,
} from "../../store/documentdrafting/DocumentDraftingSlice";
import moment from "moment";
import Swal from "sweetalert2";
import CGRForm from "./DocumentDrafting/forms/CGRForm";
import SPAForm from "./DocumentDrafting/forms/SPAForm";
import PreEmptiveRightsForm from "./DocumentDrafting/forms/PreEmptiveRightsForm";
import NoDisputeForm from "./DocumentDrafting/forms/NoDisputeForm";
import ListOfStockholdersForm from "./DocumentDrafting/forms/ListOfStockholdersForm";
import ForAuthorizationForm from "./DocumentDrafting/forms/ForAuthorizationForm";
import AffidavitForm from "./DocumentDrafting/forms/AffidavitForm";

const DocumentDrafting = () => {
  const { companyId } = useParams();
  const selectedCompany = useSelector((state) => state.company.selectedCompany);
  const currentUser = useSelector((state) => state.user.user);

  const getAllCompanyRecords = useSelector(
    (state) => state.DocumentDrafting.get_all_company_records
  );

  const getRecord = useSelector((state) => state.DocumentDrafting.get_record);

  const [formData, setFormData] = useState(getRecord);
  const [errors, setErrors] = useState({});

  const [officers, setOfficers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [documents, setDocuments] = useState([
    "Certificate of Gross Sales/Receipts",
    "SPA - Business Renewal",
    "SECCERT - Waiver of Preemptive Rights",
    "SECCERT - No Dispute",
    "SECCERT - List of Stockholders",
    "SECCERT - For Authorization",
    "Affidavit of Loss",
  ]);

  const [listOfStockholder, setlistOfStockholder] = useState([]);

  const dispatch = useDispatch();

  const columns = [
    {
      name: "Document Name",
      selector: (row) => row.form_name,
      sortable: true,
      width: "30%",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Last Modified",
      cell: (row) => {
        let modified_by = "";
        let date_modified = "";
        if (row.updated_at != null && row.updated_at != "") {
          let format =
            moment(row.updated_at).format("MMM") != "May"
              ? `MMM. DD, yyyy`
              : `MMM DD, yyyy`;
          date_modified = moment(row.updated_at).format(format);
        }
        if (row.modified_by != null && row.modified_by != "") {
          let fullname = row.modified_by.split(" ");

          if (fullname.length == 1 && fullname[0] != undefined) {
            modified_by = fullname[0];
          } else if (
            fullname.length == 2 &&
            fullname[0] != undefined &&
            fullname[1][0] != undefined
          ) {
            modified_by = `${fullname[0]} ${fullname[1][0]}`;
          } else if (fullname.length > 2 && fullname[0] != undefined) {
            if (fullname[fullname.length - 1][0] != undefined) {
              modified_by = `${fullname[0]} ${
                fullname[fullname.length - 1][0]
              }`;
            } else if (fullname[fullname.length - 2][0] != undefined) {
              modified_by = `${fullname[0]} ${
                fullname[fullname.length - 2][0]
              }`;
            } else {
              modified_by = `${fullname[0]}`;
            }
          }
        }
        return (
          <div className="flex flex-col justify-evenly h-full">
            <span>{date_modified}</span>
            <span>{modified_by}</span>
          </div>
        );
      },
    },
    {
      name: "Actions",
      cell: (row) => {
        let goto = "view";
        if (row.status === "Reverted") {
          goto = "create";
        }

        let showGDrive = false;

        if (
          row.folder_id != "" &&
          row.folder_id != null //&&
          // row.status == "Completed"
        ) {
          showGDrive = true;
        }

        return (
          <div className="flex flex-row  gap-2 items-center justify-end w-full">
            {showGDrive && (
              <img
                src={gdriveIcon}
                alt=""
                className="cursor-pointer"
                onClick={() => {
                  setRecordData(row);
                  document.getElementById("gdrive").showModal();
                }}
              />
            )}
            <div>
              <Link
                to={`/company/${companyId}/document-drafting/${goto}/${row.document_id}`}
              >
                <button>
                  <svg
                    width="44"
                    height="37"
                    viewBox="0 0 44 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="44" height="37" rx="10" fill="#273069" />
                    <path
                      d="M22.0003 20C23.1048 20 24.0003 19.1046 24.0003 18C24.0003 16.8954 23.1048 16 22.0003 16C20.8957 16 20.0003 16.8954 20.0003 18C20.0003 19.1046 20.8957 20 22.0003 20Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.458 18C13.7323 13.9429 17.5226 11 22.0002 11C26.4778 11 30.2681 13.9429 31.5424 18C30.2682 22.0571 26.4778 25 22.0002 25C17.5226 25 13.7323 22.0571 12.458 18ZM26.0003 18C26.0003 20.2091 24.2094 22 22.0003 22C19.7911 22 18.0003 20.2091 18.0003 18C18.0003 15.7909 19.7911 14 22.0003 14C24.2094 14 26.0003 15.7909 26.0003 18Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </Link>
            </div>
            <div>
              <button
                onClick={() => {
                  toggleDelete(row.document_id);
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
          </div>
        );
      },
    },
  ];

  const toggleDelete = (id) => {
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
            `/document-drafting/${companyId}/${id}`
          );

          if (response.status === 204) {
            dispatch(fetchRecords(companyId));
            status = "success";
            message = "Record deleted successfully!";
          }
        } catch (error) {
          console.error("Error deleting a record: ", error);
        } finally {
          showToast(status, message);
        }
      }
    });
  };

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

  const openDialogAddForm = () => {
    document.getElementById("addDocumentModal").showModal();
  };

  const handleSubmit = async (e, isEdit) => {
    e.preventDefault();

    if (await isFormValid()) {
      let status = "error";
      let message = "Error updating the record.";

      let newForm = { ...formData };

      newForm.status = "Sent for Approval";
      const name = `${currentUser.first_name} ${currentUser.last_name}`;

      newForm.modified_by = name;

      try {
        let response = await axios.post(
          `/document-drafting/${companyId}`,
          newForm
        );

        if (response.status === 201) {
          dispatch(fetchRecords(companyId));
          status = "success";
          message = "Record added successfully!";
        }
      } catch (error) {
        status = "error";
        message = "Error updating the record.";
        console.error("Error updating the record.: ", error);
      } finally {
        showToast(status, message);
        document.getElementById("addDocumentModal").close();
      }
    }
  };

  const handleOnChange = async (e, fieldName) => {
    const { name, value } = e.target;

    const data = formData.form_data;

    if (
      name == "revenue_q1" ||
      name == "revenue_q2" ||
      name == "revenue_q3" ||
      name == "revenue_q4"
    ) {
      let sum = 0;
      let q1 = Number(data.revenue_q1);
      let q2 = Number(data.revenue_q2);
      let q3 = Number(data.revenue_q3);
      let q4 = Number(data.revenue_q4);
      let newValue = Number(value);

      if (name == "revenue_q1") {
        sum = newValue + q2 + q3 + q4;
      }
      if (name == "revenue_q2") {
        sum = newValue + q1 + q3 + q4;
      }
      if (name == "revenue_q3") {
        sum = newValue + q2 + q1 + q4;
      }
      if (name == "revenue_q4") {
        sum = newValue + q2 + q3 + q1;
      }
      setFormData({
        ...formData,
        form_data: {
          ...formData.form_data,
          [name]: newValue,
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

  const handleOnGenerate = async () => {
    try {
      setIsLoading(true);
      let response = await axios.get("/document-drafting-generate", {
        params: {
          formData: formData,
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

  const isFormValid = async () => {
    let newErrors = {};

    // if (formData.form_data.type == "New") {
    //   if (formData.form_data.official_email_address == "") {
    //     newErrors.official_email_address = "Official Email Address is Required";
    //   }
    //   if (formData.form_data.official_mobile_number == "") {
    //     newErrors.official_mobile_number = "Official Mobile Number is Required";
    //   }
    //   if (formData.form_data.alternative_email_address == "") {
    //     newErrors.alternative_email_address =
    //       "Alternate Email Address is Required";
    //   }
    //   if (formData.form_data.alternative_mobile_number == "") {
    //     newErrors.alternative_mobile_number =
    //       "Alternate Mobile Number is Required";
    //   }
    // }

    setErrors({ ...errors, ...newErrors });
    return Object.keys(newErrors).length == 0;
  };

  const dialogComponents = () => {
    return (
      <>
        <dialog id="addDocumentModal" className="modal">
          <div className="modal-box w-2/3 max-w-full">
            <div className="flex flex-row justify-between">
              <h3 className="font-bold text-lg">Add New Document</h3>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                  ✕
                </button>
              </form>
            </div>
            <div className="flex flex-col">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Document Type</span>
                  </div>
                  <select
                    className="select select-bordered"
                    name="type"
                    onChange={(e) => {
                      handleOnChange(e, "Document Type");
                    }}
                  >
                    {documents.map((document, index) => {
                      return (
                        <option key={`document-${index}`}>{document}</option>
                      );
                    })}
                  </select>
                </label>
              </div>
              <div className="divider">{formData.form_data.type}</div>
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

              <div className="flex flex-row justify-end mt-4">
                {/* <button
                  onClick={(e) => {
                    handleOnGenerate();
                  }}
                  className="btn btn-outline text-primary"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Generate
                </button> */}

                <button
                  onClick={(e) => {
                    handleSubmit(e, false);
                  }}
                  className="btn bg-primary text-white"
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

  const formDefault = () => {
    if (selectedCompany.companyId != "") {
      let newFormData = { ...formData };

      let new_form_data = { ...formData.form_data };

      if (Object.keys(selectedCompany.latestGIS).length != 0) {
        new_form_data.corporate_name = selectedCompany.latestGIS.corporate_name;
        new_form_data.office_address =
          selectedCompany.latestGIS.complete_principal_office_address;

        if (selectedCompany.latestGIS.directors_or_officers.length != 0) {
          let officer = selectedCompany.latestGIS.directors_or_officers[0];
          new_form_data.officer_name = officer.name;
          new_form_data.officer_position = officer.officer;
          new_form_data.officer_nationality = officer.nationality;
        }

        let officers = selectedCompany.latestGIS.directors_or_officers.filter(
          (officer) => {
            if (officer.officer.toLowerCase().includes("secretary")) {
              new_form_data.corp_sec = officer.name;
              new_form_data.corp_sec_address = officer.current_residual_address;
            }
            return officer.officer != "N/A";
          }
        );

        const stockholder =
          selectedCompany.latestGIS.stock_holders_information.information.map(
            (stockholder) => {
              let setStockholder = {
                ...stockholderState,
                name: stockholder.name,
                nationality: stockholder.nationality,
                no_of_subscribed_shares: stockholder.number,
                amount_of_subscribed_shares: stockholder.amount,
                paidup_capital: stockholder.amount_paid,
                amount_of_paid_APIC: "-",
                total_amount_paid: stockholder.amount_paid,
              };

              return setStockholder;
            }
          );
        new_form_data.stockholders_data = stockholder;

        setOfficers(officers);
      }
      const name = `${currentUser.first_name} ${currentUser.last_name}`;

      newFormData.modified_by = name;
      newFormData.company_id = selectedCompany.companyId;

      newFormData.form_data = new_form_data;

      setFormData(newFormData);
    }
  };

  useEffect(() => {
    formDefault();
  }, [selectedCompany]);

  useEffect(() => {
    dispatch(fetchRecords(companyId));
  }, []);

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
            { goto: "/", text: "Document Drafting" },
          ]}
        />
      </div>
      <div className="pb-5">
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-row gap-5 justify-between w-full items-center">
            <div className="poppins-bold text-color-2 text-[24px] flex items-center">
              Document Drafting
            </div>
            <div className="flex flex-row gap-2">
              <button
                className="btn btn-md bg-[#273069] border-none text-white flex flex-row justify-center items-center rounded-[15px]"
                onClick={openDialogAddForm}
              >
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
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="py-5">
          <DataTable
            columns={columns}
            data={getAllCompanyRecords}
            persistTableHead={true}
            customStyles={customStyles}
            theme="customized"
          />
        </div>

        {dialogComponents()}
      </div>
    </>
  );
};

export default DocumentDrafting;
