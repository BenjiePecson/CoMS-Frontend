import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header.jsx";
import Company from "../../components/Company.jsx";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import {
  addCompany,
  updateCompany,
  changeCompanyStatus,
  deleteCompanyTest,
  fetchCompanies,
} from "../../store/company/CompanySlice.js";

import {
  checkCompanyLogo,
  checkCompanyName,
  checkSECCert,
  showAlert,
  checkDateRegistered,
} from "../../../assets/global.js";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../store/user/UserSlice.js";
import Breadcrumbs from "../../components/Breadcrumbs.jsx";

const SelectCompany = () => {
  // const [companies, setCompanies] = useState(data);
  const companies = useSelector((state) => state.company.companies);
  const company = useSelector((state) => state.company.company);
  const status = useSelector((state) => state.company.status);
  const error = useSelector((state) => state.company.error);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState(company);
  const [logo, setLogo] = useState(null);
  const [errors, setErrors] = useState(company);
  const addInputFile = useRef(null);
  const editInputFile = useRef(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const toggleAdd = () => {
    setFormData(company);
    addInputFile.current.value = null;
    document.getElementById("addModal").showModal();
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
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCompany(id);
        Swal.fire({
          title: "Success!",
          text: "The record has been deleted successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const toggleEdit = (company) => {
    setFormData(company);
    editInputFile.current.value = null;
    // setFormData({
    //   ...formData,
    //   companyId: company.companyId,
    //   logo: company.logo,
    //   companyName: company.companyName,
    //   secNumber: company.secNumber,
    //   status: company.status,
    // });
    document.getElementById("editModal").showModal();
  };

  const toggleStatus = (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to change its status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#273069",
      confirmButtonText: "Yes, change it!",
      cancelButtonColor: "#B4B4B8",
    }).then((result) => {
      if (result.isConfirmed) {
        changeStatus(id, status);
      }
    });
  };

  //toggle button for submit
  const handleSubmit = async (e, isEdit) => {
    e.preventDefault();

    //checks if the form is valid
    if (await isFormValid(isEdit)) {
      if (isEdit) {
        //update function

        let status = "";
        let message = "";

        try {
          const form = new FormData();
          form.append("companyName", formData.companyName);
          form.append("secNumber", formData.secNumber);
          form.append("corporateTin", formData.corporateTin);
          form.append("dateRegistered", formData.dateRegistered);
          form.append("logo", logo);

          let response = await axios.patch(
            `/company/${formData.companyId}`,
            form,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.status === 200) {
            let data = response.data;

            let newCompany = {
              companyId: data.companyId,
              logo: data.logo,
              companyName: data.companyName,
              corporateTin: data.corporateTin,
              dateRegistered: data.dateRegistered,
              secNumber: data.secNumber,
            };

            dispatch(updateCompany(newCompany));
            setFormData(company);

            status = "success";
            message = "Record updated successfully!";
          }
        } catch (error) {
          status = "error";
          message = "Error updating company";
          console.error("Error updating company: ", error);
        } finally {
          showAlert(status, message);
          document.getElementById("editModal").close();
        }
      } else {
        let status = "";
        let message = "";

        let form = new FormData();
        form.append("companyName", formData.companyName);
        form.append("secNumber", formData.secNumber);
        form.append("corporateTin", formData.corporateTin);
        form.append("dateRegistered", formData.dateRegistered);
        form.append("logo", logo);

        try {
          let response = await axios.post("/company", form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.status === 200) {
            let data = response.data;

            let newData = {
              companyId: data.companyId,
              logo: data.logo,
              companyName: data.companyName,
              secNumber: data.secNumber,
              corporateTin: data.corporateTin,
              dateRegistered: data.dateRegistered,
              status: data.status,
            };

            dispatch(addCompany(newData));
            setFormData(company);
            status = "success";
            message = "Company was added successfully.";
          } else {
            status = "error";
            message = "Error adding company";
          }
        } catch (error) {
          status = "error";
          message = "Error adding company";
          console.error("Error adding company: ", error);
        } finally {
          document.getElementById("addModal").close();
          showAlert(status, message);
        }
      }
    } else {
      console.log("invalid");
    }
  };

  //on change event for inputs
  const handleOnChange = async (e) => {
    const { name, value } = e.target;

    console.log(name);
    console.log(value);

    if (name === "logo") {
      setLogo(e.target.files[0]);
      // setFormData({
      //   ...formData,
      //   [name]: "",
      // });

      if (checkCompanyLogo(value) != "") {
        setErrors({
          ...errors,
          logo: checkCompanyLogo(value),
        });
      } else {
        setErrors({ ...errors, logo: "" });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    //sets error message for company name input
    if (name == "companyName") {
      if (checkCompanyName(value) != "") {
        setErrors({
          ...errors,
          companyName: checkCompanyName(value),
        });
      } else {
        setErrors({ ...errors, companyName: "" });
      }
    }

    if (name == "secNumber") {
      if (checkSECCert(value) != "") {
        setErrors({
          ...errors,
          secNumber: checkSECCert(value),
        });
      } else {
        setErrors({ ...errors, secNumber: "" });
      }
    }

    if (name == "dateRegistered") {
      if (checkDateRegistered(value) != "") {
        setErrors({
          ...errors,
          dateRegistered: checkDateRegistered(value),
        });
      } else {
        setErrors({ ...errors, dateRegistered: "" });
      }
    }
  };

  const isFormValid = async (isEdit) => {
    let newErrors = {};

    if (checkCompanyName(formData.companyName) != "") {
      newErrors.companyName = checkCompanyName(formData.companyName);
    }

    if (checkSECCert(formData.secNumber) != "") {
      newErrors.secNumber = checkSECCert(formData.secNumber);
    }

    // if (checkCompanyLogo(logo) != "" && !isEdit) {
    if (checkCompanyLogo(logo) != "") {
      newErrors.logo = checkCompanyLogo(logo);
    }

    setErrors({ ...errors, ...newErrors });

    return Object.keys(newErrors).length == 0;
  };

  const deleteCompany = async (id) => {
    let status = "";
    let message = "";
    try {
      // const token = getToken();
      // response = await axios.delete(
      //   `http://localhost:3000/account/remove/${recordID}`,
      //   {
      //     headers: {
      //       Authorization: token,
      //     },
      //   }
      // );

      // if (response.status === 200) {
      //   // getAccounts();
      //   setDataTable((data) => data.filter((u) => u.id !== recordID));
      //   status = "success";
      //   message = "Record deleted successfully!";
      // } else {
      //   status = "error";
      //   message = "Failed to delete record";
      //   console.error("Failed to delete record");
      // }
      status = "success";
      message = "Record deleted successfully!";
      // setCompanies((data) => data.filter((u) => u.id !== id));
      dispatch(deleteCompanyTest({ id: id }));
    } catch (error) {
      status = "error";
      message = "Failed to delete record";
      console.error("Error viewing accounts: ", error);
    } finally {
      showAlert(status, message);
    }
  };

  const changeStatus = async (id, status) => {
    let statusSwal = "";
    let message = "";
    try {
      let response = await axios.patch(`/company/${id}/changeStatus`, {
        companyId: id,
        status: status,
      });

      if (response.status === 200) {
        dispatch(
          changeCompanyStatus({
            companyId: id,
            status: status,
          })
        );
        statusSwal = "success";
        message = "Status changed successfully!";
      } else {
        statusSwal = "error";
        message = "Failed to update the status";
      }
    } catch (error) {
      statusSwal = "error";
      message = "Failed to update the status";
      console.error("Error updating status: ", error);
    } finally {
      showAlert(statusSwal, message);
    }
  };

  const elements = companies
    .filter((company) => {
      if (search == "") {
        return company;
      } else if (
        company.companyName
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        company.secNumber
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
      ) {
        return company;
      }
    })
    .map(function (company, index) {
      return (
        <Company
          key={`${company.companyName}${index}`}
          company={company}
          toggleDelete={toggleDelete}
          toggleEdit={toggleEdit}
          toggleStatus={toggleStatus}
        />
      );
    });

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

        <h1 className="text-center">No Company was found.</h1>
        <button
          onClick={() => {
            toggleAdd();
          }}
          className="btn btn-outline btn-primary"
        >
          Add New Company
        </button>
      </div>
    </>
  );

  const table = (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="w-[5%]"></th>
              <th className="w-[10%] text-center">Logo</th>
              <th className="w-[40%]">
                <div className="mx-10">Company Name</div>
              </th>
              <th className="w-[30%]">SEC Certificate #</th>
              <th className="w-[10%]">Status</th>
              <th className="w-[5%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {elements.length > 0 ? (
              elements
            ) : (
              <>
                <tr>
                  <td className="text-center" colSpan={6}>
                    No records found.
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );

  const addButton = (
    <button
      onClick={() => {
        toggleAdd();
      }}
      className="flex flex-row justify-center items-center gap-1 bg-[#667A8A] text-white rounded-xl px-5 py-2 "
    >
      <svg
        width="13"
        height="10"
        viewBox="0 0 13 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.0418 4.33337H7.29183V0.333374H5.7085V4.33337H0.958496V5.66671H5.7085V9.66671H7.29183V5.66671H12.0418V4.33337Z"
          fill="white"
        />
      </svg>
      Add
    </button>
  );

  const searchInput = (
    <input
      type="text"
      placeholder="Search"
      className="input input-bordered w-full text-[12px] h-10"
      onChange={(e) => {
        setSearch(e.target.value);
      }}
    />
  );

  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);

  return (
    <>
      <div>
        <Breadcrumbs
          lists={[
            { goto: "/", text: "Home" },
            { goto: "/", text: "Company" },
          ]}
        />
      </div>
      <div>
        {/* <div className="flex flex-col mb-5">
          <Header />
        </div> */}

        <div className="flex flex-col md:flex-row w-full gap-3 justify-between mt-5">
          <div className="flex flex-row w-full">
            <h1 className="poppins-bold text-color-2 text-[24px]">Companies</h1>
            <div className="flex w-full justify-end md:hidden">{addButton}</div>
          </div>
          <div className="flex w-full justify-center">{searchInput}</div>
          <div className="hidden md:flex w-full justify-end">{addButton}</div>
        </div>

        {/* bg-white p-5 md:p-10 rounded-[20px] shadow-lg */}
        <div className="flex flex-col w-full mt-5">
          {status === "pending"
            ? "Loading..."
            : companies.length > 0
            ? table
            : noRecord}
        </div>
      </div>

      <dialog id="addModal" className="modal">
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Add New Company</h3>
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
                  Company Name <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  errors.companyName && `input-error`
                }`}
                name="companyName"
                value={formData.companyName}
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
            <label className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  SEC Certificate <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  errors.secNumber && `input-error`
                }`}
                name="secNumber"
                value={formData.secNumber}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
              {errors.secNumber && (
                <span className="text-[12px] text-red-500">
                  {errors.secNumber}
                </span>
              )}
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  Date Registered <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="date"
                className={`input input-bordered w-full ${
                  errors.dateRegistered && `input-error`
                }`}
                name="dateRegistered"
                value={formData.dateRegistered}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
              {errors.companyName && (
                <span className="text-[12px] text-red-500">
                  {errors.dateRegistered}
                </span>
              )}
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  Corporate Tax Identification Number (TIN)
                </span>
              </div>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  errors.corporateTin && `input-error`
                }`}
                name="corporateTin"
                value={formData.corporateTin}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
              {errors.corporateTin && (
                <span className="text-[12px] text-red-500">
                  {errors.corporateTin}
                </span>
              )}
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  Company Logo <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="file"
                ref={addInputFile}
                className={`file-input file-input-bordered w-full ${
                  errors.logo && `file-input-error`
                }`}
                name="logo"
                onChange={(e) => {
                  handleOnChange(e);
                }}
                accept="image/*"
              />
              {errors.logo && (
                <span className="text-[12px] text-red-500">{errors.logo}</span>
              )}
            </label>

            <button
              onClick={(e) => {
                handleSubmit(e, false);
              }}
              className="btn bg-primary text-white mt-2"
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>

      <dialog id="editModal" className="modal">
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Edit Company</h3>
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
                  Company Name <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  errors.companyName && `input-error`
                }`}
                name="companyName"
                value={formData.companyName}
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
            <label className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  SEC Certificate <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  errors.secNumber && `input-error`
                }`}
                name="secNumber"
                value={formData.secNumber}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
              {errors.secNumber && (
                <span className="text-[12px] text-red-500">
                  {errors.secNumber}
                </span>
              )}
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  Date Registered
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="date"
                className={`input input-bordered w-full ${
                  errors.dateRegistered && `input-error`
                }`}
                name="dateRegistered"
                value={formData.dateRegistered}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
              {errors.dateRegistered && (
                <span className="text-[12px] text-red-500">
                  {errors.dateRegistered}
                </span>
              )}
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  Corporate Tax Identification Number (TIN){" "}
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  errors.corporateTin && `input-error`
                }`}
                name="corporateTin"
                value={formData.corporateTin}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
              {errors.corporateTin && (
                <span className="text-[12px] text-red-500">
                  {errors.corporateTin}
                </span>
              )}
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="poppins-regular text-[12px]">
                  Company Logo <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="file"
                className={`file-input file-input-bordered w-full ${
                  errors.logo && `file-input-error`
                }`}
                name="logo"
                onChange={(e) => {
                  const logoFile = e.target.files[0];
                  setLogo(logoFile);
                  setFormData({
                    ...formData,
                    logo: logoFile,
                  });
                }}
                accept="image/*"
                ref={editInputFile}
              />
              {errors.logo && (
                <span className="text-[12px] text-red-500">{errors.logo}</span>
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
      </dialog>
    </>
  );
};

export default SelectCompany;
