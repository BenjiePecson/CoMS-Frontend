import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../../assets/global";
import axios from "axios";
import Swal from "sweetalert2";
import Breadcrumbs from "../../components/Breadcrumbs";
import moment from "moment";
import DataTable, { createTheme } from "react-data-table-component";
import FrameWrapper from "./DashboardComponents/FrameWrapper.jsx";

import gdriveIcon from "/gdrive.svg";
import {
  addNewRecord,
  deleteRecord,
  fetchAllRecords,
  fetchRecords,
  MC28FormDataState,
} from "../../store/MC28Form/MC28FormSlice.js";
import { fetchCompany } from "../../store/company/CompanySlice.js";

const MC28Form = () => {
  const { companyId } = useParams();
  const selectedCompany = useSelector((state) => state.company.selectedCompany);
  const currentUser = useSelector((state) => state.user.user);

  const MC28Forms = useSelector(
    (state) => state.MC28Form.get_all_company_records
  );
  const MC28FormState = useSelector((state) => state.MC28Form.get_record);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState(MC28FormState);
  const [errors, setErrors] = useState({});

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

  //toggle button for submit
  const handleSubmit = async (e, isEdit) => {
    e.preventDefault();

    if (await isFormValid()) {
      let status = "error";
      let message = "Error updating the record.";

      let newFormData = { ...formData };

      let new_form_data = { ...formData.form_data };

      if (new_form_data.new_email1 != "" && new_form_data.new_email1 != "N/A") {
        new_form_data.is_official_email1 = true;
      }
      if (
        new_form_data.new_phone_number1 != "" &&
        new_form_data.new_phone_number1 != "N/A"
      ) {
        new_form_data.is_official_phone_number1 = true;
      }

      if (
        new_form_data.new_phone_number2 != "" &&
        new_form_data.new_phone_number2 != "N/A"
      ) {
        new_form_data.is_alternate_phone_number2 = true;
      }

      newFormData.form_data = new_form_data;

      const name = `${currentUser.first_name} ${currentUser.last_name}`;

      newFormData.modified_by = name;

      try {
        let response = await axios.post(`/mc28forms/${companyId}`, newFormData);

        if (response.status === 201) {
          dispatch(fetchRecords(companyId));
          status = "success";
          message = "Record updated successfully!";
        }
      } catch (error) {
        status = "error";
        message = "Error updating the record.";
        console.error("Error updating the record.: ", error);
      } finally {
        showToast(status, message);
        document.getElementById("addMC28FormModal").close();
      }
    }
  };

  //on change event for inputs
  const handleOnChange = async (e, fieldName) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      form_data: {
        ...formData.form_data,
        [name]: value,
      },
    });

    if (value == "") {
      setErrors({
        ...errors,
        [name]: `${fieldName} is required.`,
      });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleGenerate = async () => {
    if (await isFormValid()) {
      let response = await axios.get("/record/generate-mc28form", {
        params: {
          formData: formData,
        },
      });

      const newWindow = window.open("", "_blank", "width=1280,height=720");

      if (newWindow) {
        newWindow.document.write(response.data);
        newWindow.document.close(); // Ensure the document is rendered
      }
    }
  };

  const isFormValid = async () => {
    let newErrors = {};

    if (formData.form_data.type == "New") {
      if (formData.form_data.official_email_address == "") {
        newErrors.official_email_address = "Official Email Address is Required";
      }
      if (formData.form_data.official_mobile_number == "") {
        newErrors.official_mobile_number = "Official Mobile Number is Required";
      }
      if (formData.form_data.alternative_email_address == "") {
        newErrors.alternative_email_address =
          "Alternate Email Address is Required";
      }
      if (formData.form_data.alternative_mobile_number == "") {
        newErrors.alternative_mobile_number =
          "Alternate Mobile Number is Required";
      }
    }

    setErrors({ ...errors, ...newErrors });
    return Object.keys(newErrors).length == 0;
  };

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
          let response = await axios.delete(`/mc28forms/${companyId}/${id}`);

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

  const columns = [
    {
      name: "MC28 Form",
      selector: (row) => row.form_name,
      // cell: (row, rowIndex) => {
      //   const btnRename = (
      //     <button
      //       onClick={() => {
      //         setFormData(row);
      //         document.getElementById("renameModal").showModal();
      //       }}
      //     >
      //       {editSVG}
      //     </button>
      //   );

      //   return (
      //     <div
      //       className="flex flex-row gap-2"
      //       onMouseEnter={() => {
      //         setSelectedIndex(rowIndex);
      //       }}
      //       onMouseLeave={() => {
      //         setSelectedIndex(null);
      //       }}
      //     >
      //       <div>{row.recordName}</div>
      //       <div className={`${selectedIndex == rowIndex ? "" : "hidden"}`}>
      //         {btnRename}
      //       </div>
      //     </div>
      //   );
      // },
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
                to={`/company/${companyId}/mc28form/${goto}/${row.form_id}`}
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
                  toggleDelete(row.form_id);
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

  const folderIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
    >
      <path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"></path>
    </svg>
  );

  const openDialogAddForm = () => {
    document.getElementById("addMC28FormModal").showModal();
    formDefault();
  };

  const dialogComponents = () => {
    const annexDForm = (
      <>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Official Email Address
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="email"
            className={`input input-bordered w-full ${
              errors.official_email_address && `input-error`
            }`}
            name="official_email_address"
            value={formData.form_data.official_email_address}
            onChange={(e) => {
              handleOnChange(e, "Official Email Address");
            }}
          />
          {errors.official_email_address && (
            <span className="text-[12px] text-red-500">
              {errors.official_email_address}
            </span>
          )}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Official Mobile Number
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className={`input input-bordered w-full ${
              errors.official_mobile_number && `input-error`
            }`}
            name="official_mobile_number"
            value={formData.form_data.official_mobile_number}
            onChange={(e) => {
              handleOnChange(e, "Official Mobile Number");
            }}
          />
          {errors.official_mobile_number && (
            <span className="text-[12px] text-red-500">
              {errors.official_mobile_number}
            </span>
          )}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Alternate Email Address
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="email"
            className={`input input-bordered w-full ${
              errors.alternative_email_address && `input-error`
            }`}
            name="alternative_email_address"
            value={formData.form_data.alternative_email_address}
            onChange={(e) => {
              handleOnChange(e, "Alternate Email Address");
            }}
          />
          {errors.alternative_email_address && (
            <span className="text-[12px] text-red-500">
              {errors.alternative_email_address}
            </span>
          )}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Alternate Mobile Number
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className={`input input-bordered w-full ${
              errors.alternative_mobile_number && `input-error`
            }`}
            name="alternative_mobile_number"
            value={formData.form_data.alternative_mobile_number}
            onChange={(e) => {
              handleOnChange(e, "Alternate Mobile Number");
            }}
          />
          {errors.alternative_mobile_number && (
            <span className="text-[12px] text-red-500">
              {errors.alternative_mobile_number}
            </span>
          )}
        </label>
      </>
    );

    const annexGForm = (
      <>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Official Email Address to be replaced
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="email"
            className={`input input-bordered w-full ${
              errors.old_email1 && `input-error`
            }`}
            name="old_email1"
            value={formData.form_data.old_email1}
            onChange={(e) => {
              handleOnChange(e, "Official Email Address to be replaced");
            }}
          />
          {errors.old_email1 && (
            <span className="text-[12px] text-red-500">
              {errors.old_email1}
            </span>
          )}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              New Official Email Address
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="email"
            className={`input input-bordered w-full ${
              errors.new_email1 && `input-error`
            }`}
            name="new_email1"
            value={formData.form_data.new_email1}
            onChange={(e) => {
              handleOnChange(e, "New Official Email Address");
            }}
          />
          {errors.new_email1 && (
            <span className="text-[12px] text-red-500">
              {errors.new_email1}
            </span>
          )}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Alternate Email Address to be replaced
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="email"
            className={`input input-bordered w-full ${
              errors.old_email2 && `input-error`
            }`}
            name="old_email2"
            value={formData.form_data.old_email2}
            onChange={(e) => {
              handleOnChange(e, "Alternate Email Address to be replaced");
            }}
          />
          {errors.old_email2 && (
            <span className="text-[12px] text-red-500">
              {errors.old_email2}
            </span>
          )}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              New Alternate Email Address
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="email"
            className={`input input-bordered w-full ${
              errors.new_email2 && `input-error`
            }`}
            name="new_email2"
            value={formData.form_data.new_email2}
            onChange={(e) => {
              handleOnChange(e, "New Alternate Email Address");
            }}
          />
          {errors.new_email2 && (
            <span className="text-[12px] text-red-500">
              {errors.new_email2}
            </span>
          )}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Official Mobile Number to be replaced
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className={`input input-bordered w-full ${
              errors.old_phone_number1 && `input-error`
            }`}
            name="old_phone_number1"
            value={formData.form_data.old_phone_number1}
            onChange={(e) => {
              handleOnChange(e, "Official Mobile Number to be replaced");
            }}
          />
          {errors.old_phone_number1 && (
            <span className="text-[12px] text-red-500">
              {errors.old_phone_number1}
            </span>
          )}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              New Official Mobile Number
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className={`input input-bordered w-full ${
              errors.new_phone_number1 && `input-error`
            }`}
            name="new_phone_number1"
            value={formData.form_data.new_phone_number1}
            onChange={(e) => {
              handleOnChange(e, "New Official Mobile Number");
            }}
          />
          {errors.new_phone_number1 && (
            <span className="text-[12px] text-red-500">
              {errors.new_phone_number1}
            </span>
          )}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Alternate Mobile Number to be replaced
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className={`input input-bordered w-full ${
              errors.old_phone_number2 && `input-error`
            }`}
            name="old_phone_number2"
            value={formData.form_data.old_phone_number2}
            onChange={(e) => {
              handleOnChange(e, "Alternate Mobile Number to be replaced");
            }}
          />
          {errors.old_phone_number2 && (
            <span className="text-[12px] text-red-500">
              {errors.old_phone_number2}
            </span>
          )}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              New Alternate Mobile Number
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className={`input input-bordered w-full ${
              errors.new_phone_number2 && `input-error`
            }`}
            name="new_phone_number2"
            value={formData.form_data.new_phone_number2}
            onChange={(e) => {
              handleOnChange(e, "New Alternate Mobile Number");
            }}
          />
          {errors.new_phone_number2 && (
            <span className="text-[12px] text-red-500">
              {errors.new_phone_number2}
            </span>
          )}
        </label>

        {/* <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Alternate Email Address
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="email"
            className={`input input-bordered w-full ${
              errors.alternative_email_address && `input-error`
            }`}
            name="alternative_email_address"
            value={formData.form_data.alternative_email_address}
            onChange={(e) => {
              handleOnChange(e, "Alternate Email Address");
            }}
          />
          {errors.alternative_email_address && (
            <span className="text-[12px] text-red-500">
              {errors.alternative_email_address}
            </span>
          )}
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Alternate Mobile Number
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className={`input input-bordered w-full ${
              errors.alternative_mobile_number && `input-error`
            }`}
            name="alternative_mobile_number"
            value={formData.form_data.alternative_mobile_number}
            onChange={(e) => {
              handleOnChange(e, "Alternate Mobile Number");
            }}
          />
          {errors.alternative_mobile_number && (
            <span className="text-[12px] text-red-500">
              {errors.alternative_mobile_number}
            </span>
          )}
        </label> */}
      </>
    );

    return (
      <>
        <dialog id="addMC28FormModal" className="modal">
          <div className="modal-box">
            <div className="flex flex-row justify-between">
              <h3 className="font-bold text-lg">Add MC28 Form</h3>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                  ✕
                </button>
              </form>
            </div>
            <div className="flex flex-col">
              <div className="form-control w-full my-2">
                <div className="label">
                  <span className="label-text">
                    Type<span className="text-red-500">*</span>
                  </span>
                </div>
                <div className="flex flex-row justify-between w-full gap-2">
                  <div className="flex flex-row w-full gap-2">
                    <span className="label-text">Annex D (New)</span>
                    <input
                      type="radio"
                      name="type"
                      value={"New"}
                      className="radio checked:bg-primary"
                      checked={formData.form_data.type === "New"}
                      onChange={(e) => {
                        handleOnChange(e, "Type");
                      }}
                    />
                  </div>
                  <div className="flex flex-row w-full gap-2">
                    <span className="label-text">Annex G (Amendment)</span>
                    <input
                      type="radio"
                      name="type"
                      value={"Amendment"}
                      className="radio checked:bg-primary"
                      checked={formData.form_data.type === "Amendment"}
                      onChange={(e) => {
                        handleOnChange(e, "Type");
                      }}
                    />
                  </div>
                </div>
              </div>

              {formData.form_data.type === "New" ? annexDForm : annexGForm}

              <div className="divider">Authorization</div>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Corporate Secretary
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.auth_name && `input-error`
                  }`}
                  name="auth_name"
                  value={formData.form_data.auth_name}
                  onChange={handleOnChange}
                />
                {errors.auth_name && (
                  <span className="text-[12px] text-red-500">
                    {errors.auth_name}
                  </span>
                )}
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Office Address
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.office_address && `input-error`
                  }`}
                  name="office_address"
                  value={formData.form_data.office_address}
                  onChange={handleOnChange}
                />
                {errors.office_address && (
                  <span className="text-[12px] text-red-500">
                    {errors.office_address}
                  </span>
                )}
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Date of Resolution
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="date"
                  className={`input input-bordered w-full ${
                    errors.date_of_resolution && `input-error`
                  }`}
                  name="date_of_resolution"
                  value={formData.form_data.date_of_resolution}
                  onChange={handleOnChange}
                />
                {errors.date_of_resolution && (
                  <span className="text-[12px] text-red-500">
                    {errors.date_of_resolution}
                  </span>
                )}
              </label>

              <div className="flex flex-row justify-end mt-2">
                {/* <button
                  onClick={(e) => {
                    // handleSubmit(e, true);
                    handleGenerate();
                  }}
                  className="btn btn-outline"
                >
                  Generate File
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

        {/* <dialog id="renameModal" className="modal">
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
              <h1>GIS File Naming Convention</h1>
              <kbd className="kbd kbd-sm">
                CompanyName GIS YEAR TypeOfMeeting DateOfMeeting
              </kbd>
              <div className="text-xs mx-3">
                <ol className="list-decimal">
                  <li>
                    <strong> CompanyName:</strong> Abbreviation of the company's
                    name (e.g., ESPH).
                  </li>
                  <li>
                    {" "}
                    <strong>GIS:</strong> Keep this as "GIS".
                  </li>
                  <li>
                    {" "}
                    <strong>YEAR: </strong>Four-digit year (e.g., 2024).
                  </li>
                  <li>
                    {" "}
                    <strong>TypeOfMeeting:</strong>Use ANNUAL for regular
                    meetings, AMENDMENT if the meeting is special..
                  </li>
                  <li>
                    {" "}
                    <strong>DateOfMeeting: </strong>In MMDDYYYY format (e.g.,
                    09182024)..
                  </li>
                </ol>
                <div className="my-3">
                  <h1 className="font-bold">EXAMPLE:</h1>
                  <p>ESPH GIS 2024 ANNUAL 09182024</p>
                </div>
              </div>
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
        </dialog> */}

        {/* <dialog id="gdrive" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <div className="flex flex-row justify-between py-4 items-center">
              
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-4">
                  ✕
                </button>
              </form>
            </div>
            <div className="flex flex-col">
              {viewGdrive({
                title: "Attached Files",
                gdrivefolder: recordData.folder_id,
              })}
            </div>
          </div>
        </dialog> */}

        {/* <dialog id="changedriveID" className="modal">
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
                    let record = { ...recordData, folder_id: gdrivefolders };

                    let response = await axios.patch(
                      `/record/record/${record.recordId}`,
                      {
                        recordId: record.recordId,
                        folder_id: record.folder_id,
                      }
                    );

                    if (response.status === 200) {
                      setRecordData(record);
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
        </dialog> */}
      </>
    );
  };

  const formDefault = () => {
    if (selectedCompany.companyId != "") {
      let newRecord = { ...MC28FormState };
      let form_data = { ...MC28FormState.form_data };

      const name = `${currentUser.first_name} ${currentUser.last_name}`;

      newRecord.modified_by = name;
      newRecord.created_by = name;
      newRecord.status = "Sent for Approval";
      newRecord.company_id = selectedCompany.companyId;

      form_data.sec_registration_number = selectedCompany.secNumber;
      form_data.corporate_name = selectedCompany.companyName;

      if (Object.keys(selectedCompany.latestGIS).length != 0) {
        form_data.auth_name = selectedCompany.latestGIS.corporate_secretary;
        form_data.office_address =
          selectedCompany.latestGIS.complete_principal_office_address;
        form_data.date_of_resolution =
          selectedCompany.latestGIS.actual_date_of_annual_meeting;

        form_data.old_email1 = selectedCompany.latestGIS.official_email_address;
        form_data.old_email2 =
          selectedCompany.latestGIS.alternate_email_address;

        form_data.old_phone_number1 =
          selectedCompany.latestGIS.official_mobile_number;
        form_data.old_phone_number2 =
          selectedCompany.latestGIS.alternate_phone_number;
      }

      newRecord.form_data = form_data;

      setFormData(newRecord);
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
            { goto: "/", text: "MC28 Form" },
          ]}
        />
      </div>
      <div className="pb-5">
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-row gap-5 justify-between w-full items-center">
            <div className="poppins-bold text-color-2 text-[24px] flex items-center">
              MC28 Forms
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
            data={MC28Forms}
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

export default MC28Form;
