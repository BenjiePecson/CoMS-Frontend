import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  setStockHoldersInformation,
  stockholdersInformationState,
} from "../../../../store/GIS/GISFormSlice";
import InputComponent from "../../../../components/InputComponent";
import DataTable, { createTheme } from "react-data-table-component";

const step5 = () => {
  const formData = useSelector((state) => state.formGIS.formData);
  const dispatch = useDispatch();

  const [stockHoldersData, setStockHoldersData] = useState(
    formData.stock_holders_information.information
  );

  const [formStep5, setformStep5] = useState(formData);

  // Function to format number with comma for thousands and above
  const formatNumberWithComma = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const stockHoldersInformationColumn = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Nationality",
      selector: (row) => row.nationality,
    },
    {
      name: "Current Residential Address",
      selector: (row) => row.current_residual_address,
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Number",
      selector: (row) => formatNumberWithComma(row.number),
    },
    {
      name: "Amount",
      selector: (row) => formatNumberWithComma(row.amount),
    },
    {
      name: "% of Ownership",
      selector: (row) => `${row.percent_of_ownership}%`,
    },
    {
      name: "Amount Paid in (PhP)",
      selector: (row) => {
        let amount_paid = row.amount_paid;
        if (amount_paid != "") {
          amount_paid = Number(row.amount_paid);
        } else {
          amount_paid = 0;
        }
        return formatNumberWithComma(amount_paid.toFixed(2));
      },
    },
    {
      name: "Tax Identification Number",
      selector: (row) => row.tax_id_number,
    },
  ];

  const editStockHoldersInformationColumn = [
    {
      name: "Name",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.name}
            name={"name"}
            rowIndex={rowIndex}
            state={stockHoldersData}
            setState={setStockHoldersData}
          />
        );
      },
      width: "15%",
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
            state={stockHoldersData}
            setState={setStockHoldersData}
          />
        );
      },
    },
    {
      name: "Current Residential Address",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.current_residual_address}
            name={"current_residual_address"}
            rowIndex={rowIndex}
            state={stockHoldersData}
            setState={setStockHoldersData}
          />
        );
      },
      width: "20%",
    },
    {
      name: "Type",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.type}
            name={"type"}
            rowIndex={rowIndex}
            state={stockHoldersData}
            setState={setStockHoldersData}
          />
        );
      },
      width: "10%",
    },
    {
      name: "Number",
      selector: (row) => row.number,
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.number}
            name={"number"}
            rowIndex={rowIndex}
            state={stockHoldersData}
            setState={setStockHoldersData}
          />
        );
      },
    },
    {
      name: "Amount",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.amount}
            name={"amount"}
            rowIndex={rowIndex}
            state={stockHoldersData}
            setState={setStockHoldersData}
          />
        );
      },
    },
    {
      name: "% of Ownership",
      cell: (row, rowIndex) => {
        return (
          <>
            <div className="flex flex-row gap-2 items-center">
              <InputComponent
                type={"text"}
                value={row.percent_of_ownership}
                name={"percent_of_ownership"}
                rowIndex={rowIndex}
                state={stockHoldersData}
                setState={setStockHoldersData}
              />
              %
            </div>
          </>
        );
      },
      width: "15%",
    },
    {
      name: "Amount Paid",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.amount_paid}
            name={"amount_paid"}
            rowIndex={rowIndex}
            state={stockHoldersData}
            setState={setStockHoldersData}
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
            state={stockHoldersData}
            setState={setStockHoldersData}
          />
        );
      },
      width: "15%",
    },
    {
      name: "",
      cell: (row, rowIndex) => {
        return (
          <>
            <button
              onClick={(e) => {
                const updatedTable = stockHoldersData.filter(
                  (_, index) => index !== rowIndex
                );
                setStockHoldersData(updatedTable);
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

    setformStep5({
      ...formStep5,
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
      <div className="flex flex-row justify-between items-center">
        <h1 className="poppins-semibold text-[15px] text-black"></h1>
        <button
          className="btn btn-outline btn-primary btn-sm"
          onClick={(e) => {
            setStockHoldersData(formData.stock_holders_information.information);
            setformStep5(formData);
            document.getElementById("stockHoldersTable").showModal();
          }}
        >
          {editSVG} Update Details
        </button>
      </div>
      <div className="p-5 max-w-sm">
        {/* <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Total Number of Stockholders{" "}
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full input-sm"
            name="total_number_of_stockholders"
            value={formData.total_number_of_stockholders}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label> */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              No. of Stockholders with 100 or More Shares Each{" "}
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full input-sm"
            name="number_of_stockholders_with_more_shares_each"
            value={formData.number_of_stockholders_with_more_shares_each}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>
        <label className="form-control w-full">
          <div className="label text-start">
            <span className="label-text">
              Total Assets Based on Latest Audited Financial Statements{" "}
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full input-sm"
            name="total_assets_based_on_latest_audited"
            value={formData.total_assets_based_on_latest_audited}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>
      </div>

      {/* Stockholders Information */}
      <div className="w-full p-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row justify-between items-center">
            <h1 className="poppins-semibold text-[15px] text-black">
              {"Stockholders Information"}
            </h1>
          </div>
          <DataTable
            customStyles={tableCustomStyles}
            columns={stockHoldersInformationColumn}
            data={formData.stock_holders_information.information}
            persistTableHead={true}
          />
        </div>

        <dialog id={"stockHoldersTable"} className="modal">
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
                {/* <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">
                      Total Number of Stockholders{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full input-sm"
                    name="total_number_of_stockholders"
                    value={formStep5.total_number_of_stockholders}
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                  />
                </label> */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">
                      No. of Stockholders with 100 or More Shares Each{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full input-sm"
                    name="number_of_stockholders_with_more_shares_each"
                    value={
                      formStep5.number_of_stockholders_with_more_shares_each
                    }
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label text-start">
                    <span className="label-text">
                      Total Assets Based on Latest Audited Financial Statements{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full input-sm"
                    name="total_assets_based_on_latest_audited"
                    value={formStep5.total_assets_based_on_latest_audited}
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                  />
                </label>
              </div>

              <div className="flex flex-row justify-between mt-5">
                <h1 className="poppins-semibold text-[15px] text-black">
                  {"Stockholders Information"}
                </h1>
                <button
                  className="btn btn-outline btn-primary btn-sm"
                  onClick={(e) => {
                    setStockHoldersData([
                      ...stockHoldersData,
                      stockholdersInformationState,
                    ]);
                  }}
                >
                  Add row
                </button>
              </div>

              <DataTable
                columns={editStockHoldersInformationColumn}
                data={stockHoldersData}
                persistTableHead={true}
                customStyles={tableCustomStyles}
              />
            </div>

            <div className="flex flex-row justify-between mt-10">
              <button
                onClick={(e) => {
                  document.getElementById("stockHoldersTable").close();
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
                      stock_holders_information: {
                        information: stockHoldersData,
                        total_amount: 0,
                        total_percent_of_ownership: 0,
                      },
                      total_number_of_stockholders: stockHoldersData.length,
                      number_of_stockholders_with_more_shares_each:
                        formStep5.number_of_stockholders_with_more_shares_each,
                      total_assets_based_on_latest_audited:
                        formStep5.total_assets_based_on_latest_audited,
                    })
                  );
                  document.getElementById("stockHoldersTable").close();
                }}
                className="btn btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default step5;
