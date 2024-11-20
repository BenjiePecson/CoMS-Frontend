import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  directorsOrOfficersState,
  setDirectorsOrOfficers,
  beneficialOwnershipDeclarationState,
} from "../../../../store/GIS/GISFormSlice";
import InputComponent from "../../../../components/InputComponent";
import DataTable, { createTheme } from "react-data-table-component";
import moment from "moment";

const step6 = () => {
  const formData = useSelector((state) => state.formGIS.formData);
  const dispatch = useDispatch();

  const [beneficialOwnershipDeclaration, setBeneficialOwnershipDeclaration] =
    useState(formData.beneficial_ownership_declaration);

  const [formStep6, setFormStep6] = useState(formData);

  const beneficialOwnershipDeclarationColumn = [
    {
      name: "Complete Name (Surname, Given Name, Middle Name, Name Extension(i.e. Jr., Sr., III))",
      selector: (row) => row.complete_name,
    },
    {
      name: "Specific Residential Address",
      selector: (row) => row.specific_residual_address,
    },
    {
      name: "Nationality",
      selector: (row) => row.nationality,
    },
    {
      name: "Date of Birth",
      selector: (row) => {
        let dateOfBirth = row.date_of_birth;

        return moment(dateOfBirth).format("MMMM DD, YYYY");
      },
    },
    {
      name: "Tax Identification Number",
      selector: (row) => row.tax_id_number,
    },
    {
      name: "% of Ownership / % of Voting Rights",
      selector: (row) => row.percent_of_ownership,
    },
    {
      name: "Type of Beneficial Owner [Direct (D) or Indirect (I)]",
      selector: (row) => row.type_of_beneficial_owner,
    },
    {
      name: "Category of Beneficial Ownership",
      selector: (row) => row.category_of_beneficial_ownership,
    },
  ];
  const editBeneficialOwnershipDeclarationColumn = [
    {
      name: "Complete Name (Surname, Given Name, Middle Name, Name Extension(i.e. Jr., Sr., III))",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.complete_name}
            name={"complete_name"}
            rowIndex={rowIndex}
            state={beneficialOwnershipDeclaration}
            setState={setBeneficialOwnershipDeclaration}
          />
        );
      },
    },
    {
      name: "Specific Residential Address",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.specific_residual_address}
            name={"specific_residual_address"}
            rowIndex={rowIndex}
            state={beneficialOwnershipDeclaration}
            setState={setBeneficialOwnershipDeclaration}
          />
        );
      },
    },
    {
      name: "Nationality",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.nationality}
            name={"nationality"}
            rowIndex={rowIndex}
            state={beneficialOwnershipDeclaration}
            setState={setBeneficialOwnershipDeclaration}
          />
        );
      },
    },
    {
      name: "Date of Birth",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"date"}
            value={row.date_of_birth}
            name={"date_of_birth"}
            rowIndex={rowIndex}
            state={beneficialOwnershipDeclaration}
            setState={setBeneficialOwnershipDeclaration}
          />
        );
      },
    },
    {
      name: "Tax Identification Number",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.tax_id_number}
            name={"tax_id_number"}
            rowIndex={rowIndex}
            state={beneficialOwnershipDeclaration}
            setState={setBeneficialOwnershipDeclaration}
          />
        );
      },
    },
    {
      name: "% of Ownership / % of Voting Rights",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.percent_of_ownership}
            name={"percent_of_ownership"}
            rowIndex={rowIndex}
            state={beneficialOwnershipDeclaration}
            setState={setBeneficialOwnershipDeclaration}
          />
        );
      },
    },
    {
      name: "Type of Beneficial Owner [Direct (D) or Indirect (I)]",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.type_of_beneficial_owner}
            name={"type_of_beneficial_owner"}
            rowIndex={rowIndex}
            state={beneficialOwnershipDeclaration}
            setState={setBeneficialOwnershipDeclaration}
          />
        );
      },
    },
    {
      name: "Category of Beneficial Ownership",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.category_of_beneficial_ownership}
            name={"category_of_beneficial_ownership"}
            rowIndex={rowIndex}
            state={beneficialOwnershipDeclaration}
            setState={setBeneficialOwnershipDeclaration}
          />
        );
      },
    },
    {
      name: "",
      cell: (row, rowIndex) => {
        return (
          <>
            <button
              onClick={(e) => {
                const updatedTable = beneficialOwnershipDeclaration.filter(
                  (_, index) => index !== rowIndex
                );
                setBeneficialOwnershipDeclaration(updatedTable);
              }}
            >
              {removeIconSVG}
            </button>
          </>
        );
      },
      width: "65px",
    },
  ];

  // Function to format number with comma for thousands and above
  const formatNumberWithComma = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const removeIconSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 mx-auto text-[#ff5858]"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormStep6({
      ...formStep6,
      [name]: value,
    });
  };

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

  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: "12px",
        fontWeight: "bold",
        backgroundColor: "#F7F7F7",
      },
    },
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-end">
          <button
            className="btn btn-outline btn-sm"
            onClick={(e) => {
              setBeneficialOwnershipDeclaration(
                formData.beneficial_ownership_declaration
              );
              document
                .getElementById("beneficialOwnershipDeclarationTable")
                .showModal();
            }}
          >
            Update Details
          </button>
        </div>

        <div className="grid grid-cols-1 w-full">
          <div className="grid grid-cols-1 w-full gap-5">
            <div className="max-w-sm">
              <label className="form-control w-full">
                <div className="label text-start">
                  <span className="label-text">
                    Corporate Secretary <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full input-sm"
                  name="corporate_secretary"
                  value={formData.corporate_secretary}
                  disabled={true}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>
            </div>

            {/* Beneficial Ownership Declaration */}
            <div className="w-full">
              <div className="flex flex-col">
                <DataTable
                  customStyles={tableCustomStyles}
                  columns={beneficialOwnershipDeclarationColumn}
                  data={formData.beneficial_ownership_declaration}
                  persistTableHead={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog id={"beneficialOwnershipDeclarationTable"} className="modal">
        <div className="modal-box w-full max-w-7xl">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Update Details</h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                ✕
              </button>
            </form>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col gap-2">
            <div className="max-w-sm">
              <label className="form-control w-full">
                <div className="label text-start">
                  <span className="label-text">
                    Corporate Secretary <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full input-sm"
                  name="corporate_secretary"
                  value={formStep6.corporate_secretary}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>
            </div>

            <div className="flex flex-row justify-between mt-5">
              <h1 className="poppins-semibold text-[15px] text-black">
                Beneficial Ownership Declaration
              </h1>
              <button
                className="btn btn-outline btn-sm"
                onClick={(e) => {
                  setBeneficialOwnershipDeclaration([
                    ...beneficialOwnershipDeclaration,
                    beneficialOwnershipDeclarationState,
                  ]);
                }}
              >
                Add row
              </button>
            </div>

            <DataTable
              columns={editBeneficialOwnershipDeclarationColumn}
              data={beneficialOwnershipDeclaration}
              persistTableHead={true}
              customStyles={tableCustomStyles}
            />
          </div>

          <div className="flex flex-row justify-between mt-10">
            <button
              onClick={(e) => {
                document
                  .getElementById("beneficialOwnershipDeclarationTable")
                  .close();
              }}
              className="btn"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                dispatch(
                  setFormData({
                    ...formData,
                    corporate_secretary: formStep6.corporate_secretary,
                    beneficial_ownership_declaration:
                      beneficialOwnershipDeclaration,
                  })
                );
                document
                  .getElementById("beneficialOwnershipDeclarationTable")
                  .close();
              }}
              className="btn bg-primary text-white"
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default step6;
