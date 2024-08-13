import React, { useEffect, useRef, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { convertBase64, showToast } from "../../../assets/global";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  addListOfIndividuals,
  fetchCompany,
  individualState,
  removeIndividual,
  updateLetterHeader,
} from "../../store/company/CompanySlice";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

const AccordionComponent = () => {
  const { companyId } = useParams();
  const selectedCompany = useSelector((state) => state.company.selectedCompany);
  const [isOnHoverCompany, setIsOnHoverCompany] = useState(false);
  const [openAccordion, setOpenAccordion] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [individualForm, setIndividualForm] = useState({
    ...individualState,
    companyId: companyId,
  });

  const dispatch = useDispatch();

  const [listOfIndividuals, setListOfIndividuals] = useState(
    selectedCompany.listOfIndividuals
  );

  const accordionState = {
    icon: <></>,
    title: "",
    content: <></>,
  };

  const companyProfile = {
    ...accordionState,
    title: "Company Profile",
    icon: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z"
            clipRule="evenodd"
          />
        </svg>
      </>
    ),
    content: (
      <>
        <div className="flex flex-col gap-5 pt-3">
          <div className="flex flex-col gap-2 items-center">
            <div className="w-full md:w-[75%] gap-2 flex flex-col">
              <div
                className="flex flex-col gap-5 text-center justify-center items-center bg-white p-5 rounded-lg"
                onMouseEnter={() => {
                  setIsOnHoverCompany(true);
                }}
                onMouseLeave={() => {
                  setIsOnHoverCompany(false);
                }}
              >
                <div className="relative w-full">
                  <div className="absolute w-full flex justify-end">
                    <button className={`${!isOnHoverCompany && "hidden"}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-center items-center">
                  <img
                    className="w-24 aspect-square object-contain rounded-full border p-2"
                    src={selectedCompany.logo}
                    alt=""
                  />
                  <h1 className="poppins-bold text-[20px]">
                    {selectedCompany.companyName}
                  </h1>
                  <p className="poppins-medium text-[15px]">
                    {selectedCompany.secNumber}
                  </p>

                  <p className="poppins-medium text-[12px]">
                    {selectedCompany.dateRegistered}
                  </p>
                </div>

                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                    <h1 className="font-bold">Tin ID</h1>
                    <h1> {selectedCompany.corporateTin}</h1>
                  </div>
                  <div className="flex flex-row justify-between">
                    <h1 className="font-bold">HDMF</h1>
                    <h1>{selectedCompany.hdmf}</h1>
                  </div>
                  <div className="flex flex-row justify-between">
                    <h1 className="font-bold">SSS</h1>
                    <h1>{selectedCompany.sss}</h1>
                  </div>
                  <div className="flex flex-row justify-between">
                    <h1 className="font-bold">PhilHealth</h1>
                    <h1>{selectedCompany.philHealth}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  };

  const companyLetterHead = {
    ...accordionState,
    title: "Company Letter Head",
    icon: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
          <path
            fillRule="evenodd"
            d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
            clipRule="evenodd"
          />
        </svg>
      </>
    ),
    content: (
      <>
        <div className="flex flex-col gap-5 pt-3">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-end">
              <button
                className="btn bg-primary text-white"
                onClick={() => {
                  document.getElementById("updateLetterHeader").showModal();
                }}
              >
                Update Letter Header
              </button>
            </div>
            <div className="flex flex-col bg-white min-h-40 justify-center items-center">
              {selectedCompany.letterHeader != "" &&
              selectedCompany.letterHeader != null &&
              selectedCompany.letterHeader != undefined ? (
                <img
                  className="w-full"
                  src={selectedCompany.letterHeader}
                  alt="Letter Header"
                />
              ) : (
                <span> No Letter Header found.</span>
              )}
            </div>
          </div>
        </div>
      </>
    ),
  };

  const column = [
    {
      name: "Complete Name (Surname, Given Name, Middle Name, Name Extension (i.e., Jr., Sr., III)",
      selector: (row) =>
        `${row.surname}, ${row.given_name} ${row.middle_name} ${row.ext_name}`,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Nationality",
      selector: (row) => row.nationality,
    },
    {
      name: "Actions",
      cell: (row) => {
        const editSVG = (
          <svg
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
          </svg>
        );

        const deleteSVG = (
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
        );
        return (
          <div className="flex flex-row gap-2 items-center">
            <div
              className="cursor-pointer"
              onClick={() => {
                // toggleDelete(row.individuals_id);
                console.log(row);
              }}
            >
              {editSVG}
            </div>

            <div
              className="cursor-pointer"
              onClick={() => {
                toggleDelete(row.individuals_id);
              }}
            >
              {deleteSVG}
            </div>
          </div>
        );
      },
    },
  ];

  const companyListOfIndividuals = {
    ...accordionState,
    title: "List of Individuals",
    icon: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
            clipRule="evenodd"
          />
          <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
        </svg>
      </>
    ),
    content: (
      <>
        <div className="w-full overflow-auto">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-row justify-end w-full">
              <button
                className="btn bg-primary text-white"
                onClick={() => {
                  setErrors({});
                  const {
                    created_at,
                    updated_at,
                    individuals_id,
                    ...newIndividiualState
                  } = individualState;

                  setIndividualForm(newIndividiualState);
                  document.getElementById("addIndividualModal").showModal();
                }}
              >
                Add
              </button>
            </div>

            <div className="overflow-x-auto">
              <div>
                <DataTable
                  columns={column}
                  data={listOfIndividuals}
                  persistTableHead
                ></DataTable>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  };

  const accordions = [
    companyProfile,
    companyLetterHead,
    companyListOfIndividuals,
  ];

  const handleOnChange = (ev) => {
    const { name, value } = ev.target;
    setIndividualForm({ ...individualForm, [name]: value });

    if (value != "") {
      setErrors({ ...errors, [name]: "" });
    } else {
      let errorMessage = "";
      switch (name) {
        case "surname":
          errorMessage = "Surname is Required";
          break;
        case "given_name":
          errorMessage = "Given Name is Required";
          break;
        case "address":
          errorMessage = "Address is Required";
          break;
        case "nationality":
          errorMessage = "Nationality is Required";
          break;
        case "date_of_birth":
          errorMessage = "Date of Birth is Required";
          break;
        case "tax_identification_no":
          errorMessage = "Tax Identification Number is Required";
          break;
      }
      setErrors({
        ...errors,
        [name]: errorMessage,
      });
    }
  };

  const handleOnSubmit = async (ev, isEdit) => {
    ev.preventDefault();

    if (await isFormValid(isEdit)) {
      setLoading(true);
      let message = "Failed to add record.";
      let type = "error";
      if (isEdit) {
      } else {
        console.log(individualForm);
        try {
          let response = await axios.post(
            `/individuals/${companyId}`,
            individualForm
          );
          if (response.status === 201) {
            message = "Record was added successfully.";
            type = "success";
            dispatch(addListOfIndividuals(response.data));
          }
        } catch (error) {
          console.log(error);
        } finally {
          document.getElementById("addIndividualModal").close();
          showToast(type, message);
          setLoading(false);
        }
      }
    }
  };

  const isFormValid = async (isEdit) => {
    let newErrors = {};

    if (individualForm.surname == "") {
      newErrors.surname = "Surname is Required";
    }
    if (individualForm.given_name == "") {
      newErrors.given_name = "Given Name is Required";
    }
    if (individualForm.address == "") {
      newErrors.address = "Address is Required";
    }
    if (individualForm.nationality == "") {
      newErrors.nationality = "Nationality is Required";
    }
    if (individualForm.date_of_birth == "") {
      newErrors.date_of_birth = "Date of Birth is Required";
    }
    if (individualForm.tax_identification_no == "") {
      newErrors.tax_identification_no = "Tax Identification Number is Required";
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
        let type = "error";
        let message = "Failed to delete the record.";
        try {
          const response = await axios.delete(
            `/individuals/${companyId}/${id}`
          );
          if (response.status === 204) {
            dispatch(removeIndividual(id));
            type = "success";
            message = "The record has been deleted successfully.";
          }
        } catch (error) {
          console.log(error);
        } finally {
          showToast(type, message);
        }
      }
    });
  };

  const dialogComponents = () => {
    return (
      <>
        <dialog id="addIndividualModal" className="modal">
          <div className="modal-box">
            <div className="flex flex-row justify-between">
              <h3 className="font-bold text-lg">Add New Individual</h3>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                  ✕
                </button>
              </form>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <form
                onSubmit={(ev) => handleOnSubmit(ev, false)}
                className="flex flex-col gap-2"
              >
                <label className="form-control w-full">
                  <span>
                    Surname <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.surname && `input-error`
                    }`}
                    errormessage="Permission is Required"
                    name="surname"
                    value={individualForm.surname}
                    onChange={handleOnChange}
                  />
                  {errors.surname && (
                    <span className="text-[12px] text-red-500">
                      {errors.surname}
                    </span>
                  )}
                </label>

                <label className="form-control w-full">
                  <span>
                    Given Name <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.given_name && `input-error`
                    }`}
                    name="given_name"
                    value={individualForm.given_name}
                    onChange={handleOnChange}
                  />
                  {errors.given_name && (
                    <span className="text-[12px] text-red-500">
                      {errors.given_name}
                    </span>
                  )}
                </label>

                <label className="form-control w-full">
                  <span>Middle Name</span>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.middle_name && `input-error`
                    }`}
                    name="middle_name"
                    value={individualForm.middle_name}
                    onChange={handleOnChange}
                  />
                  {errors.middle_name && (
                    <span className="text-[12px] text-red-500">
                      {errors.middle_name}
                    </span>
                  )}
                </label>

                <label className="form-control w-full">
                  <span>Extension Name (i.e., Jr., Sr., III)</span>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.ext_name && `input-error`
                    }`}
                    name="ext_name"
                    value={individualForm.ext_name}
                    onChange={handleOnChange}
                  />
                  {errors.ext_name && (
                    <span className="text-[12px] text-red-500">
                      {errors.ext_name}
                    </span>
                  )}
                </label>

                <label className="form-control w-full">
                  <span>
                    Address <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.address && `input-error`
                    }`}
                    name="address"
                    value={individualForm.address}
                    onChange={handleOnChange}
                  />
                  {errors.address && (
                    <span className="text-[12px] text-red-500">
                      {errors.address}
                    </span>
                  )}
                </label>

                <label className="form-control w-full">
                  <span>
                    Nationality <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.nationality && `input-error`
                    }`}
                    name="nationality"
                    value={individualForm.nationality}
                    onChange={handleOnChange}
                  />
                  {errors.nationality && (
                    <span className="text-[12px] text-red-500">
                      {errors.nationality}
                    </span>
                  )}
                </label>

                <label className="form-control w-full">
                  <span>
                    Date of Birth <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="date"
                    className={`input input-bordered w-full ${
                      errors.date_of_birth && `input-error`
                    }`}
                    name="date_of_birth"
                    value={individualForm.date_of_birth}
                    onChange={handleOnChange}
                  />
                  {errors.date_of_birth && (
                    <span className="text-[12px] text-red-500">
                      {errors.date_of_birth}
                    </span>
                  )}
                </label>

                <label className="form-control w-full">
                  <span>
                    Tax Identification Number{" "}
                    <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.tax_identification_no && `input-error`
                    }`}
                    name="tax_identification_no"
                    value={individualForm.tax_identification_no}
                    onChange={handleOnChange}
                  />
                  {errors.tax_identification_no && (
                    <span className="text-[12px] text-red-500">
                      {errors.tax_identification_no}
                    </span>
                  )}
                </label>

                <button
                  type="submit"
                  className="btn bg-primary text-white mt-2"
                  disabled={loading}
                >
                  {loading && (
                    <span className="loading loading-spinner loading-sm"></span>
                  )}
                  Submit
                </button>
              </form>
            </div>
          </div>
        </dialog>

        <dialog id="editIndividualModal" className="modal">
          <div className="modal-box">
            <div className="flex flex-row justify-between">
              <h3 className="font-bold text-lg">Edit Individual</h3>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                  ✕
                </button>
              </form>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <form
                onSubmit={(ev) => handleOnSubmit(ev, true)}
                className="flex flex-col gap-2"
              >
                <label className="form-control w-full">
                  <span>
                    Surname <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.surname && `input-error`
                    }`}
                    errormessage="Permission is Required"
                    name="surname"
                    value={individualForm.surname}
                    onChange={handleOnChange}
                  />
                  {errors.surname && (
                    <span className="text-[12px] text-red-500">
                      {errors.surname}
                    </span>
                  )}
                </label>

                <label className="form-control w-full">
                  <span>
                    Given Name <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.given_name && `input-error`
                    }`}
                    name="given_name"
                    value={individualForm.given_name}
                    onChange={handleOnChange}
                  />
                  {errors.given_name && (
                    <span className="text-[12px] text-red-500">
                      {errors.given_name}
                    </span>
                  )}
                </label>

                <label className="form-control w-full">
                  <span>Middle Name</span>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.middle_name && `input-error`
                    }`}
                    name="middle_name"
                    value={individualForm.middle_name}
                    onChange={handleOnChange}
                  />
                  {errors.middle_name && (
                    <span className="text-[12px] text-red-500">
                      {errors.middle_name}
                    </span>
                  )}
                </label>

                <label className="form-control w-full">
                  <span>Extension Name (i.e., Jr., Sr., III)</span>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.ext_name && `input-error`
                    }`}
                    name="ext_name"
                    value={individualForm.ext_name}
                    onChange={handleOnChange}
                  />
                  {errors.ext_name && (
                    <span className="text-[12px] text-red-500">
                      {errors.ext_name}
                    </span>
                  )}
                </label>

                <label className="form-control w-full">
                  <span>
                    Address <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.address && `input-error`
                    }`}
                    name="address"
                    value={individualForm.address}
                    onChange={handleOnChange}
                  />
                  {errors.address && (
                    <span className="text-[12px] text-red-500">
                      {errors.address}
                    </span>
                  )}
                </label>

                <label className="form-control w-full">
                  <span>
                    Nationality <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.nationality && `input-error`
                    }`}
                    name="nationality"
                    value={individualForm.nationality}
                    onChange={handleOnChange}
                  />
                  {errors.nationality && (
                    <span className="text-[12px] text-red-500">
                      {errors.nationality}
                    </span>
                  )}
                </label>

                <label className="form-control w-full">
                  <span>
                    Date of Birth <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="date"
                    className={`input input-bordered w-full ${
                      errors.date_of_birth && `input-error`
                    }`}
                    name="date_of_birth"
                    value={individualForm.date_of_birth}
                    onChange={handleOnChange}
                  />
                  {errors.date_of_birth && (
                    <span className="text-[12px] text-red-500">
                      {errors.date_of_birth}
                    </span>
                  )}
                </label>

                <label className="form-control w-full">
                  <span>
                    Tax Identification Number{" "}
                    <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.tax_identification_no && `input-error`
                    }`}
                    name="tax_identification_no"
                    value={individualForm.tax_identification_no}
                    onChange={handleOnChange}
                  />
                  {errors.tax_identification_no && (
                    <span className="text-[12px] text-red-500">
                      {errors.tax_identification_no}
                    </span>
                  )}
                </label>

                <button
                  type="submit"
                  className="btn bg-primary text-white mt-2"
                  disabled={loading}
                >
                  {loading && (
                    <span className="loading loading-spinner loading-sm"></span>
                  )}
                  Submit
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </>
    );
  };

  useEffect(() => {
    if (selectedCompany.companyId != "") {
      setListOfIndividuals(selectedCompany.listOfIndividuals);
    }
  }, [selectedCompany]);

  return (
    <>
      <div className="flex flex-col w-full justify-between items-center">
        {accordions.map((accordion, index) => {
          return (
            <div
              key={`accordion-${index}`}
              className={`collapse collapse-arrow z-0 ${
                openAccordion == accordion.title
                  ? "collapse-open"
                  : "collapse-close"
              }`}
            >
              <input
                type="radio"
                name="my-accordion-2"
                className="cursor-pointer"
                onClick={(ev) => {
                  if (openAccordion == accordion.title) {
                    setOpenAccordion("");
                  } else {
                    setOpenAccordion(accordion.title);
                  }
                }}
              />
              <div className="collapse-title text-md font-semibold bg-[#FFFFFF] m-2 flex flex-row items-center gap-3">
                {accordion.icon}
                {accordion.title}
              </div>
              <div className="collapse-content">{accordion.content}</div>
            </div>
          );
        })}
      </div>

      {dialogComponents()}
    </>
  );
};

const CompanySetting = () => {
  const { companyId } = useParams();

  const selectedCompany = useSelector((state) => state.company.selectedCompany);

  const [errors, setErrors] = useState({});
  const [fakePath, setFakePath] = useState("");
  const letterHeaderRef = useRef();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const dialogComponents = () => {
    return (
      <>
        <dialog id="updateLetterHeader" className="modal">
          <div className="modal-box">
            <div className="flex flex-row justify-between">
              <h3 className="font-bold text-lg">
                Update Company Letter Header
              </h3>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                  ✕
                </button>
              </form>
            </div>
            <div className="flex flex-col gap-2">
              <label className="form-control w-full">
                <div className="label">
                  <div className="poppins-regular">
                    Letter Header <span className="text-red-500">*</span>
                  </div>
                </div>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  accept="image/*"
                  ref={letterHeaderRef}
                  onChange={async (e) => {
                    let base64 = await convertBase64(e.target.files[0]);
                    setFakePath(base64);
                  }}
                />
                {errors.letterHeader && (
                  <span className="text-[12px] text-red-500">
                    {errors.letterHeader}
                  </span>
                )}
              </label>
              {fakePath == "" ? (
                selectedCompany.letterHeader == null ? (
                  <>No Preview Available</>
                ) : (
                  <img
                    className="w-full"
                    src={selectedCompany.letterHeader}
                    alt="Letter Header"
                  />
                )
              ) : (
                <img className="w-full" src={fakePath} alt="Letter Header" />
              )}

              <button
                onClick={async (e) => {
                  setLoading(true);
                  let message = "Failed to update letter header.";
                  let type = "error";
                  try {
                    let response = await axios.patch(
                      `/company/${companyId}/updateLetterHeader`,
                      {
                        letterHeader: fakePath,
                        companyName: selectedCompany.companyName,
                      }
                    );
                    if (response.status === 200) {
                      message = "Letter Header was updated successfully";
                      type = "success";

                      dispatch(
                        updateLetterHeader({
                          companyId,
                          letterHeader: response.data.letterHeader,
                        })
                      );
                    }
                  } catch (error) {
                    console.log(error);
                  } finally {
                    document.getElementById("updateLetterHeader").close();
                    showToast(type, message);
                    setLoading(false);
                  }
                }}
                className="btn bg-primary text-white mt-2"
                disabled={loading}
              >
                {loading && (
                  <span className="loading loading-spinner loading-sm"></span>
                )}
                Submit
              </button>
            </div>
          </div>
        </dialog>
      </>
    );
  };

  return (
    <div>
      <Breadcrumbs
        lists={[
          { goto: "/", text: "Home" },
          {
            goto: `/company/${selectedCompany.companyId}`,
            text: `${selectedCompany.companyName}`,
          },

          { goto: "/", text: "Settings" },
        ]}
      />

      <div className="flex flex-col gap-5">
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-row justify-between w-full">
            <div className="poppins-bold text-color-2 text-[24px] flex items-center">
              Company Settings
            </div>
          </div>
        </div>
      </div>
      {AccordionComponent()}
      {dialogComponents()}
    </div>
  );
};

export default CompanySetting;
