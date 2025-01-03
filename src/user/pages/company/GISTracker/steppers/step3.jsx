import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authCapitalStockState,
  filipinoSubscribeCapitalState,
  setAuthCapitalStock,
  setSubscribeCapital,
  foreignSubscribeCapitalState,
  setPaidUpCapital,
  filipinoPaidUpCapitalState,
  foreignPaidUpCapitalState,
  setFormData,
} from "../../../../store/GIS/GISFormSlice";
import InputComponent from "../../../../components/InputComponent";
import TableComponent from "../../../../components/TableComponent";
import Step5 from "./step5";
import { showToast } from "../../../../../assets/global";

const step3 = () => {
  const formData = useSelector((state) => state.formGIS.formData);
  const dispatch = useDispatch();

  const [authCapitalStockData, setAuthCapitalStockData] = useState(
    formData.auth_capital_stock.capital_stocks
  );

  const [subscribeCapitalFilipinoData, setSubscribeCapitalFilipinoData] =
    useState(formData.subscribe_capital.filipino);

  const [subscribeCapitalForeignData, setSubscribeCapitalForeignData] =
    useState(formData.subscribe_capital.foreign);

  const [paidUpCapitalFilipinoData, setPaidUpCapitalFilipinoData] = useState(
    formData.paid_up_capital.filipino
  );

  const [paidUpCapitalForeignData, setPaidUpCapitalForeignData] = useState(
    formData.paid_up_capital.foreign
  );

  const [formStep3, setFormStep3] = useState(authCapitalStockState);

  const handleOnChangeAuthCapital = (e) => {
    const { name, value } = e.target;

    let amount = 0;

    if (name == "number_of_shares") {
      amount = Number(formStep3.par_or_stated_value) * Number(value);
    }
    if (name == "par_or_stated_value") {
      amount = Number(formStep3.number_of_shares) * Number(value);
    }

    if (name == "par_or_stated_value" || name == "number_of_shares") {
      setFormStep3({ ...formStep3, [name]: value, amount });
    } else {
      setFormStep3({ ...formStep3, [name]: value });
    }
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

  const authCapitalStockColumn = [
    {
      name: "Type of Shares",
      selector: (row) => row.type_of_shares,
    },
    {
      name: "Number of Shares",
      selector: (row) => formatNumberWithCommaOnly(row.number_of_shares),
    },
    {
      name: "Par/Stated Value",
      selector: (row) => row.par_or_stated_value,
    },
    {
      name: "Amount (PhP)",
      // selector: (row) => {
      //   let amount = row.amount;
      //   amount = Number(amount);
      //   return formatNumberWithComma(amount.toFixed(2));
      // },
      selector: (row) => formatNumberWithCommaAndDecimal(row.amount),
    },
  ];

  const editAuthCapitalStockColumn = [
    {
      name: "Type of Shares",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.type_of_shares}
            name={"type_of_shares"}
            rowIndex={rowIndex}
            state={authCapitalStockData}
            setState={setAuthCapitalStockData}
          />
        );
      },
    },
    {
      name: "Number of Shares",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.number_of_shares}
            name={"number_of_shares"}
            rowIndex={rowIndex}
            state={authCapitalStockData}
            setState={setAuthCapitalStockData}
          />
        );
      },
    },
    {
      name: "Par/Stated Value",
      selector: (row) => row.par_or_stated_value,
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.par_or_stated_value}
            name={"par_or_stated_value"}
            rowIndex={rowIndex}
            state={authCapitalStockData}
            setState={setAuthCapitalStockData}
          />
        );
      },
    },
    {
      name: "Amount (PhP)",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.amount}
            name={"amount"}
            rowIndex={rowIndex}
            state={authCapitalStockData}
            setState={setAuthCapitalStockData}
            disabled={true}
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
                const updatedTable = authCapitalStockData.filter(
                  (_, index) => index !== rowIndex
                );
                setAuthCapitalStockData(updatedTable);
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

  const subscribedCapitalFilipinoColumn = [
    {
      name: "Filipino",
      selector: (row) => {},
    },
    {
      name: "Number of Stockholders",
      selector: (row) => row.number_of_stock_holders,
    },
    {
      name: "Types of Shares",
      selector: (row) => row.types_of_shares,
    },
    {
      name: "Number of Shares",
      selector: (row) => row.number_of_shares,
      // cell: (row) => {
      //   let number_of_shares = row.number_of_shares;
      //   number_of_shares = Number(number_of_shares);
      //   return formatNumberWithComma(number_of_shares);
      // },
      cell: (row) => formatNumberWithCommaOnly(row.number_of_shares),
    },
    {
      name: "Number of Shares in the Hands of the Public",
      selector: (row) => row.number_of_shares_in_hands,
    },
    {
      name: "Par/Stated Value",
      selector: (row) => row.par_or_stated_value,
    },
    {
      name: "Amount (PhP)",
      selector: (row) => row.amount,
      // selector: (row) => {
      //   let amount = row.amount;
      //   amount = Number(amount);
      //   return formatNumberWithComma(amount);
      // },
      cell: (row) => formatNumberWithCommaAndDecimal(row.amount),
    },
    {
      name: "% of Ownership",
      selector: (row) => `${row.percent_of_ownership}%`,
    },
  ];

  const editSubscribedCapitalFilipinoColumn = [
    {
      name: "Filipino",
      selector: (row) => {},
    },
    {
      name: "Number of Stockholders",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.number_of_stock_holders}
            name={"number_of_stock_holders"}
            rowIndex={rowIndex}
            state={subscribeCapitalFilipinoData}
            setState={setSubscribeCapitalFilipinoData}
          />
        );
      },
    },
    {
      name: "Types of Shares",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.types_of_shares}
            name={"types_of_shares"}
            rowIndex={rowIndex}
            state={subscribeCapitalFilipinoData}
            setState={setSubscribeCapitalFilipinoData}
          />
        );
      },
    },
    {
      name: "Number of Shares",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.number_of_shares}
            name={"number_of_shares"}
            rowIndex={rowIndex}
            state={subscribeCapitalFilipinoData}
            setState={setSubscribeCapitalFilipinoData}
          />
        );
      },
    },
    {
      name: "Number of Shares in the Hands of the Public",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.number_of_shares_in_hands}
            name={"number_of_shares_in_hands"}
            rowIndex={rowIndex}
            state={subscribeCapitalFilipinoData}
            setState={setSubscribeCapitalFilipinoData}
          />
        );
      },
    },
    {
      name: "Par/Stated Value",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.par_or_stated_value}
            name={"par_or_stated_value"}
            rowIndex={rowIndex}
            state={subscribeCapitalFilipinoData}
            setState={setSubscribeCapitalFilipinoData}
          />
        );
      },
    },
    {
      name: "Amount (PhP)",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.amount}
            name={"amount"}
            rowIndex={rowIndex}
            state={subscribeCapitalFilipinoData}
            setState={setSubscribeCapitalFilipinoData}
            disabled={true}
          />
        );
      },
    },
    {
      name: "% of Ownership",
      cell: (row, rowIndex) => {
        return (
          <>
            <div className="flex flex-row justify-center items-center gap-2">
              <InputComponent
                type={"number"}
                value={row.percent_of_ownership}
                name={"percent_of_ownership"}
                rowIndex={rowIndex}
                state={subscribeCapitalFilipinoData}
                setState={setSubscribeCapitalFilipinoData}
              />
              %
            </div>
          </>
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
                const updatedTable = subscribeCapitalFilipinoData.filter(
                  (_, index) => index !== rowIndex
                );

                setSubscribeCapitalFilipinoData(updatedTable);
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

  const subscribedCapitalForeignColumn = [
    {
      name: "Foreign",
      selector: (row) => {},
    },
    {
      name: "Number of Stockholders",
      selector: (row) => row.number_of_stock_holders,
    },
    {
      name: "Types of Shares",
      selector: (row) => row.types_of_shares,
    },
    {
      name: "Number of Shares",
      selector: (row) => row.number_of_shares,
      // cell: (row) => {
      //   let number_of_shares = row.number_of_shares;
      //   number_of_shares = Number(number_of_shares);
      //   return formatNumberWithComma(number_of_shares);
      // },
      cell: (row) => formatNumberWithCommaOnly(row.number_of_shares),
    },
    {
      name: "Number of Shares in the Hands of the Public",
      selector: (row) => row.number_of_shares_in_hands,
    },
    {
      name: "Par/Stated Value",
      selector: (row) => row.par_or_stated_value,
    },
    {
      name: "Amount (PhP)",
      selector: (row) => (row) => row.amount,
      // selector: (row) => {
      //   let amount = row.amount;
      //   amount = Number(amount);
      //   return formatNumberWithComma(amount);
      // },
      cell: (row) => formatNumberWithCommaAndDecimal(row.amount),
    },
    {
      name: "% of Ownership",
      selector: (row) => `${row.percent_of_ownership}%`,
    },
  ];

  const editSubscribedCapitalForeignColumn = [
    {
      name: "Foreign",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.nationality}
            name={"nationality"}
            rowIndex={rowIndex}
            state={subscribeCapitalForeignData}
            setState={setSubscribeCapitalForeignData}
          />
        );
      },
    },
    {
      name: "Number of Stockholders",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.number_of_stock_holders}
            name={"number_of_stock_holders"}
            rowIndex={rowIndex}
            state={subscribeCapitalForeignData}
            setState={setSubscribeCapitalForeignData}
          />
        );
      },
    },
    {
      name: "Types of Shares",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.types_of_shares}
            name={"types_of_shares"}
            rowIndex={rowIndex}
            state={subscribeCapitalForeignData}
            setState={setSubscribeCapitalForeignData}
          />
        );
      },
    },
    {
      name: "Number of Shares",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.number_of_shares}
            name={"number_of_shares"}
            rowIndex={rowIndex}
            state={subscribeCapitalForeignData}
            setState={setSubscribeCapitalForeignData}
          />
        );
      },
    },
    {
      name: "Number of Shares in the Hands of the Public",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.number_of_shares_in_hands}
            name={"number_of_shares_in_hands"}
            rowIndex={rowIndex}
            state={subscribeCapitalForeignData}
            setState={setSubscribeCapitalForeignData}
          />
        );
      },
    },
    {
      name: "Par/Stated Value",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.par_or_stated_value}
            name={"par_or_stated_value"}
            rowIndex={rowIndex}
            state={subscribeCapitalForeignData}
            setState={setSubscribeCapitalForeignData}
          />
        );
      },
    },
    {
      name: "Amount (PhP)",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.amount}
            name={"amount"}
            rowIndex={rowIndex}
            state={subscribeCapitalForeignData}
            setState={setSubscribeCapitalForeignData}
            disabled={true}
          />
        );
      },
    },
    {
      name: "% of Ownership",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.percent_of_ownership}
            name={"percent_of_ownership"}
            rowIndex={rowIndex}
            state={subscribeCapitalForeignData}
            setState={setSubscribeCapitalForeignData}
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
                const updatedTable = subscribeCapitalForeignData.filter(
                  (_, index) => index !== rowIndex
                );

                setSubscribeCapitalForeignData(updatedTable);
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

  const paidUpCapitalFilipinoColumn = [
    {
      name: "Filipino",
      selector: (row) => {},
    },
    {
      name: "Number of Stockholders",
      selector: (row) => row.number_of_stock_holders,
    },
    {
      name: "Types of Shares",
      selector: (row) => row.types_of_shares,
    },
    {
      name: "Number of Shares",
      selector: (row) => row.number_of_shares,
      cell: (row) => formatNumberWithCommaOnly(row.number_of_shares),
    },
    {
      name: "Par/Stated Value",
      selector: (row) => row.par_or_stated_value,
    },
    {
      name: "Amount (PhP)",
      selector: (row) => row.amount,
      // selector: (row) => {
      //   let amount = row.amount;
      //   amount = Number(amount);
      //   return formatNumberWithComma(amount.toFixed(2));
      // },
      cell: (row) => formatNumberWithCommaAndDecimal(row.amount),
    },
    {
      name: "% of Ownership",
      selector: (row) => `${row.percent_of_ownership}%`,
    },
  ];

  const editPaidUpCapitalFilipinoColumn = [
    {
      name: "Filipino",
      selector: (row) => {},
    },
    {
      name: "Number of Stockholders",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.number_of_stock_holders}
            name={"number_of_stock_holders"}
            rowIndex={rowIndex}
            state={paidUpCapitalFilipinoData}
            setState={setPaidUpCapitalFilipinoData}
          />
        );
      },
    },
    {
      name: "Types of Shares",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.types_of_shares}
            name={"types_of_shares"}
            rowIndex={rowIndex}
            state={paidUpCapitalFilipinoData}
            setState={setPaidUpCapitalFilipinoData}
          />
        );
      },
    },
    {
      name: "Number of Shares",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.number_of_shares}
            name={"number_of_shares"}
            rowIndex={rowIndex}
            state={paidUpCapitalFilipinoData}
            setState={setPaidUpCapitalFilipinoData}
          />
        );
      },
    },
    {
      name: "Par/Stated Value",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.par_or_stated_value}
            name={"par_or_stated_value"}
            rowIndex={rowIndex}
            state={paidUpCapitalFilipinoData}
            setState={setPaidUpCapitalFilipinoData}
          />
        );
      },
    },
    {
      name: "Amount (PhP)",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.amount}
            name={"amount"}
            rowIndex={rowIndex}
            state={paidUpCapitalFilipinoData}
            setState={setPaidUpCapitalFilipinoData}
            disabled={true}
          />
        );
      },
    },
    {
      name: "% of Ownership",
      cell: (row, rowIndex) => {
        return (
          <>
            <div className="flex flex-row justify-center items-center gap-2">
              <InputComponent
                type={"number"}
                value={row.percent_of_ownership}
                name={"percent_of_ownership"}
                rowIndex={rowIndex}
                state={paidUpCapitalFilipinoData}
                setState={setPaidUpCapitalFilipinoData}
              />
              %
            </div>
          </>
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
                const updatedTable = paidUpCapitalFilipinoData.filter(
                  (_, index) => index !== rowIndex
                );

                setPaidUpCapitalFilipinoData(updatedTable);
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

  const paidUpCapitalForeignColumn = [
    {
      name: "Foreign",
      selector: (row) => row.nationality,
    },
    {
      name: "Number of Stockholders",
      selector: (row) => row.number_of_stock_holders,
    },
    {
      name: "Types of Shares",
      selector: (row) => row.types_of_shares,
    },
    {
      name: "Number of Shares",
      selector: (row) => row.number_of_shares,
      cell: (row) => formatNumberWithCommaOnly(row.number_of_shares),
    },
    {
      name: "Par/Stated Value",
      selector: (row) => row.par_or_stated_value,
    },
    {
      name: "Amount (PhP)",
      selector: (row) => row.amount,
      // selector: (row) => {
      //   let amount = row.amount;
      //   amount = Number(amount);
      //   return formatNumberWithComma(amount.toFixed(2));
      // },
      cell: (row) => formatNumberWithCommaAndDecimal(row.amount),
    },
    {
      name: "% of Ownership",
      selector: (row) => {
        let percent_of_ownership = row.percent_of_ownership;
        percent_of_ownership = Number(percent_of_ownership);
        // `${row.percent_of_ownership}%`
        return `${percent_of_ownership.toFixed(2)}%`;
      },
    },
  ];

  const editPaidUpCapitalForeignColumn = [
    {
      name: "Foreign",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.nationality}
            name={"nationality"}
            rowIndex={rowIndex}
            state={paidUpCapitalForeignData}
            setState={setPaidUpCapitalForeignData}
          />
        );
      },
    },
    {
      name: "Number of Stockholders",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.number_of_stock_holders}
            name={"number_of_stock_holders"}
            rowIndex={rowIndex}
            state={paidUpCapitalForeignData}
            setState={setPaidUpCapitalForeignData}
          />
        );
      },
    },
    {
      name: "Types of Shares",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.types_of_shares}
            name={"types_of_shares"}
            rowIndex={rowIndex}
            state={paidUpCapitalForeignData}
            setState={setPaidUpCapitalForeignData}
          />
        );
      },
    },
    {
      name: "Number of Shares",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.number_of_shares}
            name={"number_of_shares"}
            rowIndex={rowIndex}
            state={paidUpCapitalForeignData}
            setState={setPaidUpCapitalForeignData}
          />
        );
      },
    },
    {
      name: "Par/Stated Value",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.par_or_stated_value}
            name={"par_or_stated_value"}
            rowIndex={rowIndex}
            state={paidUpCapitalForeignData}
            setState={setPaidUpCapitalForeignData}
          />
        );
      },
    },
    {
      name: "Amount (PhP)",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.amount}
            name={"amount"}
            rowIndex={rowIndex}
            state={paidUpCapitalForeignData}
            setState={setPaidUpCapitalForeignData}
            disabled={true}
          />
        );
      },
    },
    {
      name: "% of Ownership",
      cell: (row, rowIndex) => {
        return (
          <>
            <div className="flex flex-row justify-center items-center gap-2">
              <InputComponent
                type={"number"}
                value={row.percent_of_ownership}
                name={"percent_of_ownership"}
                rowIndex={rowIndex}
                state={paidUpCapitalForeignData}
                setState={setPaidUpCapitalForeignData}
              />
              %
            </div>
          </>
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
                const updatedTable = paidUpCapitalForeignData.filter(
                  (_, index) => index !== rowIndex
                );

                setPaidUpCapitalForeignData(updatedTable);
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

  const old_divs = () => {
    return (
      <div>
        {/* Subscribed Capital */}
        <div>
          {/* Subscribed Capital Filipino */}
          <div>
            <TableComponent
              id={"subscribedCapitalFilipinoTable"}
              tableName={"Subscribed Capital"}
              setTable={() => {
                setSubscribeCapitalFilipinoData(
                  formData.subscribe_capital.filipino
                );
              }}
              setAddTable={() => {
                setSubscribeCapitalFilipinoData([
                  ...subscribeCapitalFilipinoData,
                  filipinoSubscribeCapitalState,
                ]);
              }}
              column={subscribedCapitalFilipinoColumn}
              data={formData.subscribe_capital.filipino}
              tableData={subscribeCapitalFilipinoData}
              tableDataState={filipinoSubscribeCapitalState}
              editColumn={editSubscribedCapitalFilipinoColumn}
              addFunction={() => {
                // Recalculate subtotal and total values
                const subTotalNumberOfSharesFilipino =
                  subscribeCapitalFilipinoData.reduce(
                    (total, item) =>
                      total + parseFloat(item.number_of_shares || 0),
                    0
                  );
                const subTotalAmountFilipino =
                  subscribeCapitalFilipinoData.reduce(
                    (total, item) => total + parseFloat(item.amount || 0),
                    0
                  );
                const subTotalOwnershipFilipino =
                  subscribeCapitalFilipinoData.reduce(
                    (total, item) =>
                      total + parseFloat(item.percent_of_ownership || 0),
                    0
                  );

                dispatch(
                  setSubscribeCapital({
                    ...formData.subscribe_capital,
                    filipino: subscribeCapitalFilipinoData,
                    sub_total_number_of_shares_filipino:
                      subTotalNumberOfSharesFilipino,
                    sub_total_amount_filipino: subTotalAmountFilipino,
                    sub_total_ownership_filipino: subTotalOwnershipFilipino,
                    // Recalculate total values based on the updated filipino array
                    total_number_of_shares:
                      subTotalNumberOfSharesFilipino +
                      formData.subscribe_capital
                        .sub_total_number_of_shares_foreign,
                    total_amount:
                      subTotalAmountFilipino +
                      formData.subscribe_capital.sub_total_amount_foreign,
                    total_percent_of_ownership:
                      subTotalOwnershipFilipino +
                      formData.subscribe_capital.sub_total_ownership_foreign,
                  })
                );
              }}
            />
            <div className="flex flex-row justify-start gap-5 text-start px-5">
              <div className="flex flex-col">
                <h1>Total Number of Shares:</h1>
                <h1>Total Amount (PhP):</h1>
                <h1>Total % of Ownership:</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="poppins-semibold">
                  {formatNumberWithCommaOnly(
                    formData.subscribe_capital
                      .sub_total_number_of_shares_filipino
                  )}
                </h1>
                <h1 className="poppins-semibold">
                  {formatNumberWithCommaAndDecimal(
                    formData.subscribe_capital.sub_total_amount_filipino
                  )}
                </h1>
                <h1 className="poppins-semibold">
                  {formatNumberWithComma(
                    formData.subscribe_capital.sub_total_ownership_filipino.toFixed(
                      2
                    )
                  )}
                  %
                </h1>
              </div>
            </div>
          </div>

          {/* Subscribed Capital Foreign */}
          <div>
            <TableComponent
              id={"subscribedCapitalForeignTable"}
              setTable={() => {
                setSubscribeCapitalForeignData(
                  formData.subscribe_capital.foreign
                );
              }}
              setAddTable={() => {
                setSubscribeCapitalForeignData([
                  ...subscribeCapitalForeignData,
                  foreignSubscribeCapitalState,
                ]);
              }}
              column={subscribedCapitalForeignColumn}
              data={formData.subscribe_capital.foreign}
              tableData={subscribeCapitalForeignData}
              tableDataState={foreignSubscribeCapitalState}
              editColumn={editSubscribedCapitalForeignColumn}
              addFunction={() => {
                // Recalculate subtotal and total values
                const subTotalNumberOfSharesForeign =
                  subscribeCapitalForeignData.reduce(
                    (total, item) =>
                      total + parseFloat(item.number_of_shares || 0),
                    0
                  );
                const subTotalAmountForeign =
                  subscribeCapitalForeignData.reduce(
                    (total, item) => total + parseFloat(item.amount || 0),
                    0
                  );
                const subTotalOwnershipForeign =
                  subscribeCapitalForeignData.reduce(
                    (total, item) =>
                      total + parseFloat(item.percent_of_ownership || 0),
                    0
                  );

                dispatch(
                  setSubscribeCapital({
                    ...formData.subscribe_capital,
                    foreign: subscribeCapitalForeignData,
                    sub_total_number_of_shares_foreign:
                      subTotalNumberOfSharesForeign,
                    sub_total_amount_foreign: subTotalAmountForeign,
                    sub_total_ownership_foreign: subTotalOwnershipForeign,
                    // Recalculate total values based on the updated filipino array
                    total_number_of_shares:
                      subTotalNumberOfSharesForeign +
                      formData.subscribe_capital
                        .sub_total_number_of_shares_filipino,
                    total_amount:
                      subTotalAmountForeign +
                      formData.subscribe_capital.sub_total_amount_filipino,
                    total_percent_of_ownership:
                      subTotalOwnershipForeign +
                      formData.subscribe_capital.sub_total_ownership_filipino,
                    percentage_of_foreign_equity: subTotalOwnershipForeign,
                  })
                );
              }}
            />
            <div className="flex flex-row justify-start gap-5 text-start px-5">
              <div className="flex flex-col">
                <h1>Total Number of Shares:</h1>
                <h1>Total Amount (PhP):</h1>
                <h1>Total % of Ownership:</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="poppins-semibold">
                  {formatNumberWithCommaOnly(
                    formData.subscribe_capital
                      .sub_total_number_of_shares_foreign
                  )}
                  {/* {formatNumberWithComma(
              formData.subscribe_capital.sub_total_number_of_shares_foreign
            )} */}
                </h1>
                <h1 className="poppins-semibold">
                  {/* {formatNumberWithComma(
              formData.subscribe_capital.sub_total_amount_foreign.toFixed(2)
            )} */}
                  {formatNumberWithCommaAndDecimal(
                    formData.subscribe_capital.sub_total_amount_foreign
                  )}
                </h1>
                <h1 className="poppins-semibold">
                  {formatNumberWithComma(
                    formData.subscribe_capital.sub_total_ownership_foreign.toFixed(
                      2
                    )
                  )}
                  %
                </h1>
              </div>
            </div>

            <div className="flex flex-row justify-start gap-5 text-start px-5 mt-5">
              <div className="flex flex-col">
                <h1>Percentage of Foreign Equity:</h1>
                <h1>Total Subscribed:</h1>
                <h1>Total % of Ownership:</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="poppins-semibold">
                  {formatNumberWithComma(
                    formData.subscribe_capital.percentage_of_foreign_equity.toFixed(
                      3
                    )
                  )}
                  %
                </h1>
                <h1 className="poppins-semibold">
                  {/* {formatNumberWithComma(
              formData.subscribe_capital.total_amount.toFixed(2)
            )} */}
                  {formatNumberWithCommaAndDecimal(
                    formData.subscribe_capital.total_amount
                  )}
                </h1>
                <h1 className="poppins-semibold">
                  {formatNumberWithComma(
                    formData.subscribe_capital.total_percent_of_ownership.toFixed(
                      2
                    )
                  )}
                  %
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        {/* Paid-Up Capital */}
        <div>
          {/* Paid-Up Capital Filipino */}
          <div>
            <TableComponent
              id={"paidUpCapitalFilipinoTable"}
              tableName={"Paid-Up Capital"}
              setTable={() => {
                setPaidUpCapitalFilipinoData(formData.paid_up_capital.filipino);
              }}
              setAddTable={() => {
                setPaidUpCapitalFilipinoData([
                  ...paidUpCapitalFilipinoData,
                  filipinoPaidUpCapitalState,
                ]);
              }}
              column={paidUpCapitalFilipinoColumn}
              data={formData.paid_up_capital.filipino}
              tableData={paidUpCapitalFilipinoData}
              tableDataState={filipinoPaidUpCapitalState}
              editColumn={editPaidUpCapitalFilipinoColumn}
              addFunction={() => {
                const subTotalNumberOfSharesFilipino =
                  paidUpCapitalFilipinoData.reduce(
                    (total, item) =>
                      total + parseFloat(item.number_of_shares || 0),
                    0
                  );
                const subTotalAmountFilipino = paidUpCapitalFilipinoData.reduce(
                  (total, item) => total + parseFloat(item.amount || 0),
                  0
                );
                const subTotalOwnershipFilipino =
                  paidUpCapitalFilipinoData.reduce(
                    (total, item) =>
                      total + parseFloat(item.percent_of_ownership || 0),
                    0
                  );

                dispatch(
                  setPaidUpCapital({
                    ...formData.paid_up_capital,
                    filipino: paidUpCapitalFilipinoData,
                    sub_total_number_of_shares_filipino:
                      subTotalNumberOfSharesFilipino,
                    sub_total_amount_filipino: subTotalAmountFilipino,
                    sub_total_ownership_filipino: subTotalOwnershipFilipino,
                    // Recalculate total values based on the updated filipino array
                    total_number_of_shares:
                      subTotalNumberOfSharesFilipino +
                      formData.paid_up_capital
                        .sub_total_number_of_shares_foreign,
                    total_amount:
                      subTotalAmountFilipino +
                      formData.paid_up_capital.sub_total_amount_foreign,
                    total_percent_of_ownership:
                      subTotalOwnershipFilipino +
                      formData.paid_up_capital.sub_total_ownership_foreign,
                  })
                );
              }}
            />

            <div className="flex flex-row justify-start gap-5 text-start px-5">
              <div className="flex flex-col">
                <h1>Total Number of Shares:</h1>
                <h1>Total Amount (PhP):</h1>
                <h1>Total % of Ownership:</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="poppins-semibold">
                  {formatNumberWithCommaOnly(
                    formData.paid_up_capital.sub_total_number_of_shares_filipino
                  )}
                  {/* {formatNumberWithComma(
              formData.paid_up_capital.sub_total_number_of_shares_filipino
            )} */}
                </h1>
                <h1 className="poppins-semibold">
                  {/* {formatNumberWithComma(
              formData.paid_up_capital.sub_total_amount_filipino.toFixed(2)
            )} */}
                  {formatNumberWithCommaAndDecimal(
                    formData.paid_up_capital.sub_total_amount_filipino
                  )}
                </h1>
                <h1 className="poppins-semibold">
                  {formatNumberWithComma(
                    formData.paid_up_capital.sub_total_ownership_filipino.toFixed(
                      2
                    )
                  )}
                  %
                </h1>
              </div>
            </div>
          </div>
          {/* Paid-Up Capital Foreign */}
          <div>
            <TableComponent
              id={"paidUpCapitalForeignTable"}
              tableName={""}
              setTable={() => {
                setPaidUpCapitalForeignData(formData.paid_up_capital.foreign);
              }}
              setAddTable={() => {
                setPaidUpCapitalForeignData([
                  ...paidUpCapitalForeignData,
                  foreignPaidUpCapitalState,
                ]);
              }}
              column={paidUpCapitalForeignColumn}
              data={formData.paid_up_capital.foreign}
              tableData={paidUpCapitalForeignData}
              tableDataState={foreignPaidUpCapitalState}
              editColumn={editPaidUpCapitalForeignColumn}
              addFunction={() => {
                // Recalculate subtotal and total values
                const subTotalNumberOfSharesForeign =
                  paidUpCapitalForeignData.reduce(
                    (total, item) =>
                      total + parseFloat(item.number_of_shares || 0),
                    0
                  );
                const subTotalAmountForeign = paidUpCapitalForeignData.reduce(
                  (total, item) => total + parseFloat(item.amount || 0),
                  0
                );
                const subTotalOwnershipForeign =
                  paidUpCapitalForeignData.reduce(
                    (total, item) =>
                      total + parseFloat(item.percent_of_ownership || 0),
                    0
                  );

                dispatch(
                  setPaidUpCapital({
                    ...formData.paid_up_capital,
                    foreign: paidUpCapitalForeignData,
                    sub_total_number_of_shares_foreign:
                      subTotalNumberOfSharesForeign,
                    sub_total_amount_foreign: subTotalAmountForeign,
                    sub_total_ownership_foreign: subTotalOwnershipForeign,
                    // Recalculate total values based on the updated filipino array
                    total_number_of_shares:
                      subTotalNumberOfSharesForeign +
                      formData.paid_up_capital
                        .sub_total_number_of_shares_filipino,
                    total_amount:
                      subTotalAmountForeign +
                      formData.paid_up_capital.sub_total_amount_filipino,
                    total_percent_of_ownership:
                      subTotalOwnershipForeign +
                      formData.paid_up_capital.sub_total_ownership_filipino,
                  })
                );
              }}
            />
            <div className="flex flex-row justify-start gap-5 text-start px-5">
              <div className="flex flex-col">
                <h1>Total Number of Shares:</h1>
                <h1>Total Amount (PhP):</h1>
                <h1>Total % of Ownership:</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="poppins-semibold">
                  {/* {formatNumberWithComma(
              formData.paid_up_capital.sub_total_number_of_shares_foreign
            )} */}
                  {formatNumberWithCommaOnly(
                    formData.paid_up_capital.sub_total_number_of_shares_foreign
                  )}
                </h1>
                <h1 className="poppins-semibold">
                  {formatNumberWithCommaAndDecimal(
                    formData.paid_up_capital.sub_total_amount_foreign
                  )}
                </h1>
                <h1 className="poppins-semibold">
                  {formatNumberWithComma(
                    formData.paid_up_capital.sub_total_ownership_foreign.toFixed(
                      2
                    )
                  )}
                  %
                </h1>
              </div>
            </div>

            <div className="flex flex-row justify-start gap-5 text-start px-5 mt-5">
              <div className="flex flex-col">
                <h1>Total Paid-Up:</h1>
                <h1>Total % of Ownership:</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="poppins-semibold">
                  {formatNumberWithComma(
                    formData.paid_up_capital.total_amount.toFixed(2)
                  )}
                </h1>
                <h1 className="poppins-semibold">
                  {formatNumberWithComma(
                    formData.paid_up_capital.total_percent_of_ownership.toFixed(
                      2
                    )
                  )}
                  %
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const old_auth_capital = () => {
    return (
      <>
        {/* Authorized Capital Stock */}
        <div>
          <TableComponent
            id={"authCapitalTable"}
            tableName={"Authorized Capital Stock"}
            setTable={() => {
              setAuthCapitalStockData(
                formData.auth_capital_stock.capital_stocks
              );
            }}
            setAddTable={() => {
              setAuthCapitalStockData([
                ...authCapitalStockData,
                authCapitalStockState,
              ]);
            }}
            column={authCapitalStockColumn}
            data={formData.auth_capital_stock.capital_stocks}
            tableData={authCapitalStockData}
            tableDataState={authCapitalStockState}
            editColumn={editAuthCapitalStockColumn}
            addFunction={() => {
              const totalNumberOfShares = authCapitalStockData.reduce(
                (total, item) => total + parseFloat(item.number_of_shares || 0),
                0
              );

              const totalAmount = authCapitalStockData.reduce(
                (total, item) => total + parseFloat(item.amount || 0),
                0
              );

              dispatch(
                setAuthCapitalStock({
                  ...formData.auth_capital_stock,
                  capital_stocks: authCapitalStockData,
                  total_number_of_shares: totalNumberOfShares,
                  total_amount: totalAmount,
                })
              );
            }}
          />
          <div className="flex flex-row justify-start gap-5 text-start px-5">
            <div className="flex flex-col">
              <h1>Total Number of Shares:</h1>
              <h1>Total Amount (PhP):</h1>
            </div>
            <div className="flex flex-col">
              <h1 className="poppins-semibold">
                {/* {formatNumberWithComma(
                formData.auth_capital_stock.total_number_of_shares
              )} */}
                {formatNumberWithCommaOnly(
                  formData.auth_capital_stock.total_number_of_shares
                )}
              </h1>
              <h1 className="poppins-semibold">
                {/* {formatNumberWithComma(
                formData.auth_capital_stock.total_amount.toFixed(2)
              )} */}
                {formatNumberWithCommaAndDecimal(
                  formData.auth_capital_stock.total_amount
                )}
              </h1>
            </div>
          </div>
        </div>
      </>
    );
  };

  const capitalStock = (name, stocks, isSubscribed = true) => {
    return (
      <>
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-between">
            <h1 className="poppins-bold text-sm">{name}</h1>
          </div>
          <div className="grid grid-cols-1 w-full">
            <div className="grid grid-cols-1 w-full">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-black bg-gray-100  text-nowrap font-bold text-xs">
                      <td className="text-center">Filipino</td>
                      <td className="text-center">Number of Stockholders</td>
                      <td className="text-center">Type of Shares</td>
                      <td className="text-end">Number of Shares</td>
                      {isSubscribed && (
                        <td className="text-center">
                          Number of Shares in the Hand of the Public
                        </td>
                      )}
                      <td className="text-end">Par/Stated Value</td>
                      <td className="text-end">Amount</td>
                      <td className="text-end">Percent of Ownership</td>
                    </tr>
                    {stocks.filipino.length == 0 ? (
                      <tr>
                        <td
                          className="text-center"
                          colSpan={isSubscribed ? 8 : 7}
                        >
                          There are no records to display
                        </td>
                      </tr>
                    ) : (
                      stocks.filipino.map((stock, index) => {
                        return (
                          <tr key={`${name}_${index}`}>
                            <td></td>
                            <td className="text-center py-6">
                              {stock.number_of_stock_holders}
                            </td>
                            <td className="text-center">
                              {stock.types_of_shares}
                            </td>
                            <td className="text-end">
                              {formatNumberWithCommaOnly(
                                stock.number_of_shares
                              )}
                            </td>
                            {isSubscribed && <td className="text-center"></td>}
                            <td className="text-end">
                              {formatNumberWithCommaAndDecimal(
                                stock.par_or_stated_value
                              )}
                            </td>
                            <td className="text-end">
                              {formatNumberWithCommaAndDecimal(stock.amount)}
                            </td>
                            <td className="text-end">
                              {Number(stock.percent_of_ownership).toFixed(4)}%
                            </td>
                          </tr>
                        );
                      })
                    )}
                    <tr>
                      <td></td>
                      <td></td>
                      <td className="font-bold text-sm text-end">TOTAL</td>
                      <td className="text-end">
                        {formatNumberWithCommaOnly(
                          stocks.sub_total_number_of_shares_filipino
                        )}
                      </td>
                      {isSubscribed && <td></td>}
                      <td className="font-bold text-sm text-end">TOTAL P</td>
                      <td className="text-end">
                        {formatNumberWithCommaAndDecimal(
                          stocks.sub_total_amount_filipino
                        )}
                      </td>
                      <td className="text-end">
                        {stocks.sub_total_ownership_filipino.toFixed(4)}%
                      </td>
                    </tr>

                    <tr className="text-black bg-gray-100 text-nowrap font-bold text-xs">
                      <td className="text-center">Foreign</td>
                      <td className="text-center">Number of Stockholders</td>
                      <td className="text-center">Type of Shares</td>
                      <td className="text-end">Number of Shares</td>
                      {isSubscribed && (
                        <td className="text-center">
                          Number of Shares in the Hand of the Public
                        </td>
                      )}
                      <td className="text-end">Par/Stated Value</td>
                      <td className="text-end">Amount</td>
                      <td className="text-end">Percent of Ownership</td>
                    </tr>

                    {stocks.foreign.length == 0 ? (
                      <tr>
                        <td
                          className="text-center"
                          colSpan={isSubscribed ? 8 : 7}
                        >
                          There are no records to display
                        </td>
                      </tr>
                    ) : (
                      stocks.foreign.map((stock, index) => {
                        return (
                          <tr key={`subscribed_foreign_${index}`}>
                            <td className="text-center py-6">
                              {stock.nationality}
                            </td>
                            <td className="text-center">
                              {stock.number_of_stock_holders}
                            </td>
                            <td className="text-center">
                              {stock.types_of_shares}
                            </td>
                            <td className="text-end">
                              {formatNumberWithCommaOnly(
                                stock.number_of_shares
                              )}
                            </td>
                            {isSubscribed && <td></td>}
                            <td className="text-end">
                              {formatNumberWithCommaAndDecimal(
                                stock.par_or_stated_value
                              )}
                            </td>
                            <td className="text-end">
                              {formatNumberWithCommaAndDecimal(stock.amount)}
                            </td>
                            <td className="text-end">
                              {Number(stock.percent_of_ownership).toFixed(4)}%
                            </td>
                          </tr>
                        );
                      })
                    )}
                    <tr>
                      <td></td>
                      <td></td>
                      <td className="font-bold text-sm text-end">TOTAL</td>
                      <td className="text-end">
                        {formatNumberWithCommaOnly(
                          stocks.sub_total_number_of_shares_foreign
                        )}
                      </td>
                      {isSubscribed && <td></td>}
                      <td className="font-bold text-sm text-end">TOTAL P</td>
                      <td className="text-end">
                        {formatNumberWithCommaAndDecimal(
                          stocks.sub_total_amount_foreign
                        )}
                      </td>
                      <td className="text-end">
                        {stocks.sub_total_ownership_foreign.toFixed(4)}%
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      {isSubscribed && <td></td>}
                      <td className="font-bold text-sm text-end" colSpan={2}>
                        TOTAL {isSubscribed ? "SUBSCRIBED" : "PAID-UP"} P
                      </td>
                      <td className="text-end">
                        {formatNumberWithCommaAndDecimal(stocks.total_amount)}
                      </td>
                      <td className="text-end">
                        {stocks.total_percent_of_ownership.toFixed(4)}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const authCapitalStockComponent = () => {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <h1 className="poppins-bold text-sm pt-5">
            Authorized Capital Stock
          </h1>
          <button
            className="btn btn-outline btn-sm"
            onClick={(e) => {
              if (formData.auth_capital_stock.capital_stocks.length != 0) {
                setFormStep3(formData.auth_capital_stock.capital_stocks[0]);
              }
              document.getElementById("updateAuthCapital").showModal();
            }}
          >
            Update Details
          </button>
        </div>

        <div className="grid grid-cols-1 w-full">
          <div className="grid grid-cols-1 w-full">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-black bg-gray-100  text-nowrap font-bold text-xs">
                    <td className="text-center">Type of Shares</td>
                    <td className="text-end">Number of Shares</td>
                    <td className="text-end">Par/Stated Value</td>
                    <td className="text-end">Amount</td>
                  </tr>
                  {formData.auth_capital_stock.capital_stocks.length == 0 ? (
                    <tr>
                      <td className="text-center" colSpan={4}>
                        There are no records to display
                      </td>
                    </tr>
                  ) : (
                    formData.auth_capital_stock.capital_stocks.map(
                      (stock, index) => {
                        return (
                          <tr key={`auth_capital_stock_${index}`}>
                            <td className="text-center py-6">
                              {stock.type_of_shares}
                            </td>
                            <td className="text-end">
                              {formatNumberWithCommaOnly(
                                stock.number_of_shares
                              )}
                            </td>
                            <td className="text-end">
                              {formatNumberWithCommaAndDecimal(
                                stock.par_or_stated_value
                              )}
                            </td>
                            <td className="text-end">
                              {formatNumberWithCommaAndDecimal(stock.amount)}
                            </td>
                          </tr>
                        );
                      }
                    )
                  )}

                  {formData.auth_capital_stock.capital_stocks.length != 0 && (
                    <tr>
                      <td className="font-bold text-sm text-end">TOTAL</td>
                      <td className="font-bold text-sm text-end">
                        {formatNumberWithCommaOnly(
                          formData.auth_capital_stock.total_number_of_shares
                        )}
                      </td>
                      <td className="font-bold text-sm text-end">TOTAL P</td>
                      <td className="font-bold text-sm text-end">
                        {formatNumberWithCommaAndDecimal(
                          formData.auth_capital_stock.total_amount
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {authCapitalStockComponent()}

      <div className="divider"></div>

      <Step5 />

      <div className="divider"></div>

      {capitalStock("Subscribed Capital", formData.subscribe_capital, true)}

      <div className="divider"></div>

      {capitalStock("Paid Up Capital", formData.paid_up_capital, false)}

      <dialog id={"updateAuthCapital"} className="modal">
        <div className="modal-box w-full max-w-xl">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">
              Update Authorized Capital Stock
            </h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                ✕
              </button>
            </form>
          </div>
          <div className="divider"></div>
          <div className="grid grid-cols-1">
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
                name="type_of_shares"
                value={formStep3.type_of_shares}
                onChange={(e) => {
                  handleOnChangeAuthCapital(e);
                }}
              />
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
                name="number_of_shares"
                value={formStep3.number_of_shares}
                onChange={(e) => {
                  handleOnChangeAuthCapital(e);
                }}
              />
            </label>

            <label className="form-control w-full">
              <div className="label text-start">
                <span className="label-text">
                  Par/Stated Value <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full input-sm"
                name="par_or_stated_value"
                value={formStep3.par_or_stated_value}
                onChange={(e) => {
                  handleOnChangeAuthCapital(e);
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
                type="text"
                placeholder=""
                className="input input-bordered w-full input-sm"
                name="amount"
                value={formStep3.amount}
                onChange={(e) => {
                  handleOnChangeAuthCapital(e);
                }}
                disabled
              />
            </label>
          </div>

          <div className="flex flex-row justify-between mt-10">
            <button
              onClick={(e) => {
                document.getElementById("updateAuthCapital").close();
              }}
              className="btn"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                try {
                  let total_amount =
                    Number(formStep3.number_of_shares) *
                    Number(formStep3.par_or_stated_value);
                  let total_number_of_shares = Number(
                    formStep3.number_of_shares
                  );

                  dispatch(
                    setFormData({
                      ...formData,
                      auth_capital_stock: {
                        ...formData.auth_capital_stock,
                        capital_stocks: [formStep3],
                        total_amount: total_amount,
                        total_number_of_shares: total_number_of_shares,
                      },
                    })
                  );
                } catch (error) {
                  console.log(error);
                }
                document.getElementById("updateAuthCapital").close();
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

export default step3;
