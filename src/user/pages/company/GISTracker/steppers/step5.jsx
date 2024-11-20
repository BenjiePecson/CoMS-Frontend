import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filipinoPaidUpCapitalState,
  filipinoSubscribeCapitalState,
  foreignPaidUpCapitalState,
  foreignSubscribeCapitalState,
  paidUpCapitalState,
  setFormData,
  setStockHoldersInformation,
  stockholdersInformationState,
  subscribeCapitalState,
} from "../../../../store/GIS/GISFormSlice";
import InputComponent from "../../../../components/InputComponent";
import DataTable, { createTheme } from "react-data-table-component";
import { showToast } from "../../../../../assets/global";

const step5 = () => {
  const formData = useSelector((state) => state.formGIS.formData);
  const dispatch = useDispatch();

  const [stockHoldersData, setStockHoldersData] = useState(
    formData.stock_holders_information.information
  );

  const [formStep5, setformStep5] = useState(formData);

  const [stockHoldersFormData, setStockHoldersFormData] = useState(
    stockholdersInformationState
  );

  const [selectedIndex, setSelectedIndex] = useState(null);

  // Function to format number with comma for thousands and above
  const formatNumberWithComma = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Function Definitions
  const formatIntegerWithComma = (integerPart) => {
    return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatDecimalPlaces = (decimalPart) => {
    // if (decimalPart === undefined) {
    //   return "00";
    // } else if (decimalPart.length === 1) {
    //   return `${decimalPart}0`;
    // } else if (decimalPart.length > 2) {
    //   return decimalPart;
    // } else {
    //   return decimalPart.padEnd(2, "0");
    // }

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
    if (number == null || number == "") return "";
    const numStr = number.toString();
    const [integerPart, decimalPart] = numStr.split(".");
    const formattedIntegerPart = formatIntegerWithComma(integerPart);
    const formattedDecimalPart = formatDecimalPlaces(decimalPart);
    return `${formattedIntegerPart}.${formattedDecimalPart}`;
  };

  const formatNumberWithCommaOnly = (number) => {
    if (number == null || number == "") return "";
    const numStr = number.toString();
    const [integerPart, decimalPart] = numStr.split(".");
    if (decimalPart != undefined) {
      const formattedInteger = formatIntegerWithComma(integerPart);
      const formattedDecimal = decimalPart.substring(0, 4);
      return `${formattedInteger}.${formattedDecimal}`;
    }
    return formatIntegerWithComma(integerPart);
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
      selector: (row) => formatNumberWithCommaOnly(row.number),
    },
    {
      name: "Amount",
      selector: (row) => formatNumberWithCommaAndDecimal(row.amount),
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
        return formatNumberWithCommaAndDecimal(amount_paid);
      },
    },
    {
      name: "Tax Identification Number",
      selector: (row) => row.tax_id_number,
    },
  ];

  const editStockHoldersInformationColumn_old = [
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

  const editStockHoldersInformationColumn = [
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
      selector: (row) => formatNumberWithCommaOnly(row.number),
    },
    {
      name: "Amount",
      selector: (row) => formatNumberWithCommaAndDecimal(row.amount),
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
        return formatNumberWithCommaAndDecimal(amount_paid);
      },
    },
    {
      name: "Tax Identification Number",
      selector: (row) => row.tax_id_number,
    },
    {
      name: "",
      cell: (row, rowIndex) => {
        return (
          <>
            <div className="flex flex-row gap-2">
              <button
                onClick={(e) => {
                  setStockHoldersFormData(row);
                  setSelectedIndex(rowIndex);
                  document.getElementById("editStockholder").showModal();
                }}
              >
                {editIconSVG}
              </button>
              <button
                onClick={(e) => {
                  const updatedTable =
                    formStep5.stock_holders_information.information.filter(
                      (_, index) => index !== rowIndex
                    );
                  updatedFormStep5(updatedTable);
                }}
              >
                {removeIconSVG}
              </button>
            </div>
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

  const editIconSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4 mx-auto"
    >
      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
    </svg>
  );

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setformStep5({
      ...formStep5,
      [name]: value,
    });
  };

  const handleOnChangeStockHolder = (e) => {
    const { name, value } = e.target;

    setStockHoldersFormData({
      ...stockHoldersFormData,
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

  const updatedFormStep5 = (stockholders) => {
    const updated = updateStockHoldersData(stockholders);
    setformStep5(updated);
  };

  const updateStockHoldersData = (stockholders) => {
    let total_amount = 0;
    let total_amount_paid = 0;

    let number_of_stockholders_with_more_shares_each = 0;

    stockholders.forEach((stockholder) => {
      if (Number(stockholder.number) >= 100) {
        number_of_stockholders_with_more_shares_each++;
      }
      total_amount += Number(stockholder.amount);
      total_amount_paid += Number(stockholder.amount_paid);
    });

    const newStockHoldersData = stockholders.map((stockholder) => {
      let percent_of_ownership = stockholder.percent_of_ownership;
      let type = stockholder.type.toUpperCase();

      percent_of_ownership = (
        (stockholder.amount / total_amount) *
        100
      ).toFixed(4);

      return {
        ...stockholder,
        percent_of_ownership: percent_of_ownership,
        type,
      };
    });

    const updatedCapitalStructure = updateCapitalStructure(newStockHoldersData);

    const newFormStep5 = {
      ...formStep5,
      stock_holders_information: {
        ...formStep5.stock_holders_information,
        information: newStockHoldersData,
      },
      subscribe_capital: updatedCapitalStructure.subscribe_capital,
      paid_up_capital: updatedCapitalStructure.paid_up_capital,
      total_number_of_stockholders: stockholders.length,
      number_of_stockholders_with_more_shares_each,
    };

    return newFormStep5;
  };

  const updateCapitalStructure = (stockholders) => {
    if (formData.auth_capital_stock.capital_stocks.length != 0) {
      const par_or_stated_value = Number(
        formData.auth_capital_stock.capital_stocks[0].par_or_stated_value
      );

      let subscribedCapital = { ...subscribeCapitalState };
      let paidUpCapital = { ...paidUpCapitalState };

      let subscribedCapitalFilipino = [];
      let subscribedCapitalForeign = [];

      let paidUpCapitalFilipino = [];
      let paidUpCapitalForeign = [];

      stockholders.forEach((stockholder) => {
        let subscribedCapitalFilipinoState = {
          ...filipinoSubscribeCapitalState,
        };

        let subscribedCapitalForeignState = {
          ...foreignSubscribeCapitalState,
        };

        let paidUpCapitalFilipinoState = {
          ...filipinoPaidUpCapitalState,
        };

        let paidUpCapitalForeignState = {
          ...foreignPaidUpCapitalState,
        };

        if (stockholder.nationality.toUpperCase() == "FILIPINO") {
          //Filipino

          //Subscribed Capital
          subscribedCapital.sub_total_amount_filipino += Number(
            stockholder.amount
          );
          subscribedCapital.sub_total_number_of_shares_filipino += Number(
            stockholder.number
          );

          subscribedCapitalFilipinoState.number_of_stock_holders++;
          subscribedCapitalFilipinoState.amount = Number(stockholder.amount);
          subscribedCapitalFilipinoState.number_of_shares = Number(
            stockholder.number
          );
          subscribedCapitalFilipinoState.par_or_stated_value =
            par_or_stated_value;

          subscribedCapitalFilipinoState.types_of_shares =
            stockholder.type.toUpperCase();

          let isSameNationality = false;
          subscribedCapitalFilipino.forEach((subscribe) => {
            isSameNationality = true;
            subscribe.number_of_stock_holders++;
            subscribe.amount += Number(stockholder.amount);
            subscribe.number_of_shares += Number(stockholder.number);
            subscribe.types_of_shares = stockholder.type.toUpperCase();
          });

          if (!isSameNationality) {
            subscribedCapitalFilipino.push(subscribedCapitalFilipinoState);
          }

          //Paid Up Capital
          paidUpCapital.sub_total_amount_filipino += Number(
            stockholder.amount_paid
          );
          paidUpCapital.sub_total_number_of_shares_filipino += Number(
            stockholder.number
          );

          paidUpCapitalFilipinoState.number_of_stock_holders++;
          paidUpCapitalFilipinoState.amount = Number(stockholder.amount_paid);
          paidUpCapitalFilipinoState.number_of_shares = Number(
            stockholder.number
          );
          paidUpCapitalFilipinoState.par_or_stated_value = par_or_stated_value;

          paidUpCapitalFilipinoState.types_of_shares =
            stockholder.type.toUpperCase();

          isSameNationality = false;

          paidUpCapitalFilipino.forEach((subscribe) => {
            isSameNationality = true;
            subscribe.number_of_stock_holders++;
            subscribe.amount += Number(stockholder.amount_paid);
            subscribe.number_of_shares += Number(stockholder.number);
            subscribe.types_of_shares = stockholder.type.toUpperCase();
          });

          if (!isSameNationality) {
            paidUpCapitalFilipino.push(paidUpCapitalFilipinoState);
          }
        } else {
          //Foreign

          //Subscribed Capital
          subscribedCapital.sub_total_amount_foreign += Number(
            stockholder.amount
          );
          subscribedCapital.sub_total_number_of_shares_foreign += Number(
            stockholder.number
          );

          subscribedCapitalForeignState.nationality = stockholder.nationality;
          subscribedCapitalForeignState.number_of_stock_holders++;
          subscribedCapitalForeignState.amount = Number(stockholder.amount);
          subscribedCapitalForeignState.number_of_shares = Number(
            stockholder.number
          );
          subscribedCapitalForeignState.par_or_stated_value =
            par_or_stated_value;

          subscribedCapitalForeignState.types_of_shares =
            stockholder.type.toUpperCase();

          let isSameNationality = false;
          subscribedCapitalForeign.forEach((subscribe) => {
            if (
              subscribe.nationality.toUpperCase() ==
              stockholder.nationality.toUpperCase()
            ) {
              isSameNationality = true;
              subscribe.number_of_stock_holders++;
              subscribe.amount += Number(stockholder.amount);
              subscribe.number_of_shares += Number(stockholder.number);
              subscribe.types_of_shares = stockholder.type.toUpperCase();
            }
          });

          if (!isSameNationality) {
            subscribedCapitalForeign.push(subscribedCapitalForeignState);
          }

          //Paid Up Capital
          paidUpCapital.sub_total_amount_foreign += Number(
            stockholder.amount_paid
          );
          paidUpCapital.sub_total_number_of_shares_foreign += Number(
            stockholder.number
          );

          paidUpCapitalForeignState.nationality = stockholder.nationality;
          paidUpCapitalForeignState.number_of_stock_holders++;
          paidUpCapitalForeignState.amount = Number(stockholder.amount_paid);
          paidUpCapitalForeignState.number_of_shares = Number(
            stockholder.number
          );
          paidUpCapitalForeignState.par_or_stated_value = par_or_stated_value;

          paidUpCapitalForeignState.types_of_shares =
            stockholder.type.toUpperCase();

          isSameNationality = false;
          paidUpCapitalForeign.forEach((subscribe) => {
            if (
              subscribe.nationality.toUpperCase() ==
              stockholder.nationality.toUpperCase()
            ) {
              isSameNationality = true;
              subscribe.number_of_stock_holders++;
              subscribe.amount += Number(stockholder.amount_paid);
              subscribe.number_of_shares += Number(stockholder.number);
              subscribe.types_of_shares = stockholder.type.toUpperCase();
            }
          });

          if (!isSameNationality) {
            paidUpCapitalForeign.push(paidUpCapitalForeignState);
          }
        }

        //Subscribed Capital
        subscribedCapital.total_amount += Number(stockholder.amount);
        subscribedCapital.total_number_of_shares += Number(stockholder.number);

        //Paid Up Capital
        paidUpCapital.total_amount += Number(stockholder.amount_paid);
        paidUpCapital.total_number_of_shares += Number(stockholder.number);
      });

      //Computation for Percent of ownership

      let subscribed_sub_total_ownership_filipino = 0;
      let subscribed_sub_total_ownership_foreign = 0;

      subscribedCapitalFilipino = subscribedCapitalFilipino.map((subscribe) => {
        subscribe.percent_of_ownership =
          (subscribe.amount / subscribedCapital.total_amount) * 100;
        subscribed_sub_total_ownership_filipino +=
          subscribe.percent_of_ownership;
        return subscribe;
      });

      subscribedCapitalForeign = subscribedCapitalForeign.map((subscribe) => {
        subscribe.percent_of_ownership =
          (subscribe.amount / subscribedCapital.total_amount) * 100;
        subscribed_sub_total_ownership_foreign +=
          subscribe.percent_of_ownership;
        return subscribe;
      });

      let paid_up_sub_total_ownership_filipino = 0;
      let paid_up_sub_total_ownership_foreign = 0;

      paidUpCapitalFilipino = paidUpCapitalFilipino.map((paidup) => {
        paidup.percent_of_ownership =
          (paidup.amount / subscribedCapital.total_amount) * 100;

        paid_up_sub_total_ownership_filipino += paidup.percent_of_ownership;

        return paidup;
      });

      paidUpCapitalForeign = paidUpCapitalForeign.map((paidup) => {
        paidup.percent_of_ownership =
          (paidup.amount / subscribedCapital.total_amount) * 100;

        paid_up_sub_total_ownership_foreign += paidup.percent_of_ownership;

        return paidup;
      });

      subscribedCapital.filipino = subscribedCapitalFilipino;
      subscribedCapital.foreign = subscribedCapitalForeign;
      subscribedCapital.sub_total_ownership_filipino =
        subscribed_sub_total_ownership_filipino;
      subscribedCapital.sub_total_ownership_foreign =
        subscribed_sub_total_ownership_foreign;
      subscribedCapital.total_percent_of_ownership =
        subscribedCapital.sub_total_ownership_filipino +
        subscribedCapital.sub_total_ownership_foreign;

      paidUpCapital.filipino = paidUpCapitalFilipino;
      paidUpCapital.foreign = paidUpCapitalForeign;
      paidUpCapital.sub_total_ownership_filipino =
        paid_up_sub_total_ownership_filipino;
      paidUpCapital.sub_total_ownership_foreign =
        paid_up_sub_total_ownership_foreign;
      paidUpCapital.total_percent_of_ownership =
        paidUpCapital.sub_total_ownership_filipino +
        paidUpCapital.sub_total_ownership_foreign;

      return {
        subscribe_capital: subscribedCapital,
        paid_up_capital: paidUpCapital,
      };
    } else {
      console.log("No par stated value");
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <h1 className="poppins-bold text-sm">Stockholders Information</h1>
          <button
            className="btn btn-outline btn-sm"
            onClick={(e) => {
              if (formData.auth_capital_stock.capital_stocks.length != 0) {
                if (
                  formData.auth_capital_stock.capital_stocks[0]
                    .par_or_stated_value == ""
                ) {
                  showToast("error", "Please add Par/Stated Value first.");
                  return;
                }
              }
              setformStep5(formData);
              document.getElementById("newStockHoldersTable").showModal();
            }}
          >
            Update Details
          </button>
        </div>

        <div className="grid grid-cols-1 w-full">
          <div className="overflow-x-auto">
            {/* Stockholders Information */}
            <div className="flex flex-col gap-5">
              <div className=" max-w-sm">
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
              <DataTable
                customStyles={tableCustomStyles}
                columns={stockHoldersInformationColumn}
                data={formData.stock_holders_information.information}
                persistTableHead={true}
              />
            </div>
          </div>
        </div>
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
                  value={formStep5.number_of_stockholders_with_more_shares_each}
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

      <dialog id={"newStockHoldersTable"} className="modal">
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
                className="btn btn-outline btn-sm"
                onClick={(e) => {
                  setStockHoldersFormData(stockholdersInformationState);
                  document.getElementById("addStockholder").showModal();
                }}
              >
                Add row
              </button>
            </div>

            <DataTable
              columns={editStockHoldersInformationColumn}
              data={formStep5.stock_holders_information.information}
              persistTableHead={true}
              customStyles={tableCustomStyles}
            />
          </div>

          <div className="flex flex-row justify-between mt-10">
            <button
              onClick={(e) => {
                document.getElementById("newStockHoldersTable").close();
              }}
              className="btn"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                // dispatch(setFormData(formStep5));

                console.log(formStep5);

                // document.getElementById("newStockHoldersTable").close();
              }}
              className="btn bg-primary text-white"
            >
              Save
            </button>
          </div>
        </div>
      </dialog>

      <dialog id={"addStockholder"} className="modal">
        <div className="modal-box w-full max-w-xl">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Add Stockholder</h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                ✕
              </button>
            </form>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col gap-2">
            <label className="form-control w-full">
              <div className="label text-start">
                <span className="label-text">
                  Name <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full input-sm"
                name="name"
                value={stockHoldersFormData.name}
                onChange={(e) => {
                  handleOnChangeStockHolder(e);
                }}
              />
            </label>
            <label className="form-control w-full">
              <div className="label text-start">
                <span className="label-text">
                  Nationality <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full input-sm"
                name="nationality"
                value={stockHoldersFormData.nationality}
                onChange={(e) => {
                  handleOnChangeStockHolder(e);
                }}
              />
            </label>
            <label className="form-control w-full">
              <div className="label text-start">
                <span className="label-text">
                  Address <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full input-sm"
                name="current_residual_address"
                value={stockHoldersFormData.current_residual_address}
                onChange={(e) => {
                  handleOnChangeStockHolder(e);
                }}
              />
            </label>
            <label className="form-control w-full">
              <div className="label text-start">
                <span className="label-text">
                  Type of Shares <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full input-sm"
                name="type"
                list="data"
                value={stockHoldersFormData.type}
                onChange={(e) => {
                  handleOnChangeStockHolder(e);
                }}
              />
              <datalist id="data">
                <option value={"COMMON"} />
              </datalist>
            </label>
            <label className="form-control w-full">
              <div className="label text-start">
                <span className="label-text">
                  Number of Shares <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="number"
                placeholder=""
                className="input input-bordered w-full input-sm"
                name="number"
                value={stockHoldersFormData.number}
                onChange={(e) => {
                  handleOnChangeStockHolder(e);
                }}
              />
            </label>
            <label className="form-control w-full">
              <div className="label text-start">
                <span className="label-text">
                  Amount <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="number"
                placeholder=""
                className="input input-bordered w-full input-sm"
                name="amount"
                value={stockHoldersFormData.amount}
                onChange={(e) => {
                  handleOnChangeStockHolder(e);
                }}
              />
            </label>
            <label className="form-control w-full">
              <div className="label text-start">
                <span className="label-text">
                  Amount Paid (PhP) <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full input-sm"
                name="amount_paid"
                value={stockHoldersFormData.amount_paid}
                onChange={(e) => {
                  handleOnChangeStockHolder(e);
                }}
              />
            </label>
            <label className="form-control w-full">
              <div className="label text-start">
                <span className="label-text">
                  Tax Identification Number{" "}
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full input-sm"
                name="tax_id_number"
                value={stockHoldersFormData.tax_id_number}
                onChange={(e) => {
                  handleOnChangeStockHolder(e);
                }}
              />
            </label>
          </div>

          <div className="flex flex-row justify-end mt-10">
            <button
              onClick={(e) => {
                updatedFormStep5([
                  ...formStep5.stock_holders_information.information,
                  stockHoldersFormData,
                ]);

                setStockHoldersFormData(stockholdersInformationState);
                document.getElementById("addStockholder").close();
              }}
              className="btn bg-primary text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>

      <dialog id={"editStockholder"} className="modal">
        <div className="modal-box w-full max-w-xl">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Edit Stockholder</h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                ✕
              </button>
            </form>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col gap-2">
            <label className="form-control w-full">
              <div className="label text-start">
                <span className="label-text">
                  Name <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full input-sm"
                name="name"
                value={stockHoldersFormData.name}
                onChange={(e) => {
                  handleOnChangeStockHolder(e);
                }}
              />
            </label>
            <label className="form-control w-full">
              <div className="label text-start">
                <span className="label-text">
                  Nationality <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full input-sm"
                name="nationality"
                value={stockHoldersFormData.nationality}
                onChange={(e) => {
                  handleOnChangeStockHolder(e);
                }}
              />
            </label>
            <label className="form-control w-full">
              <div className="label text-start">
                <span className="label-text">
                  Address <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full input-sm"
                name="current_residual_address"
                value={stockHoldersFormData.current_residual_address}
                onChange={(e) => {
                  handleOnChangeStockHolder(e);
                }}
              />
            </label>
            <label className="form-control w-full">
              <div className="label text-start">
                <span className="label-text">
                  Type of Shares <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full input-sm"
                name="type"
                list="data"
                value={stockHoldersFormData.type}
                onChange={(e) => {
                  handleOnChangeStockHolder(e);
                }}
              />
              <datalist id="data">
                <option value={"COMMON"} />
              </datalist>
            </label>
            <label className="form-control w-full">
              <div className="label text-start">
                <span className="label-text">
                  Number of Shares <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="number"
                placeholder=""
                className="input input-bordered w-full input-sm"
                name="number"
                value={stockHoldersFormData.number}
                onChange={(e) => {
                  handleOnChangeStockHolder(e);
                }}
              />
            </label>
            <label className="form-control w-full">
              <div className="label text-start">
                <span className="label-text">
                  Amount <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="number"
                placeholder=""
                className="input input-bordered w-full input-sm"
                name="amount"
                value={stockHoldersFormData.amount}
                onChange={(e) => {
                  handleOnChangeStockHolder(e);
                }}
              />
            </label>
            <label className="form-control w-full">
              <div className="label text-start">
                <span className="label-text">
                  Amount Paid (PhP) <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full input-sm"
                name="amount_paid"
                value={stockHoldersFormData.amount_paid}
                onChange={(e) => {
                  handleOnChangeStockHolder(e);
                }}
              />
            </label>
            <label className="form-control w-full">
              <div className="label text-start">
                <span className="label-text">
                  Tax Identification Number{" "}
                  <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full input-sm"
                name="tax_id_number"
                value={stockHoldersFormData.tax_id_number}
                onChange={(e) => {
                  handleOnChangeStockHolder(e);
                }}
              />
            </label>
          </div>

          <div className="flex flex-row justify-end mt-10">
            <button
              onClick={(e) => {
                const newList =
                  formStep5.stock_holders_information.information.map(
                    (information, index) => {
                      if (selectedIndex == index) {
                        return stockHoldersFormData;
                      }
                      return information;
                    }
                  );
                updatedFormStep5(newList);

                setSelectedIndex(null);
                document.getElementById("editStockholder").close();
              }}
              className="btn bg-primary text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default step5;
