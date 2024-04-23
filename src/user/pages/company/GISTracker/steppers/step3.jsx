import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authCapitalStockState,
  filipinoSubscribeCapitalState,
  setAuthCapitalStock,
  setSubscribeCapital,
  foreignSubscribeCapitalState,
  setPaidUpCapital,
} from "../../../../store/GIS/GISFormSlice";
import InputComponent from "../../../../components/InputComponent";
import TableComponent from "../../../../components/TableComponent";

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

  const authCapitalStockColumn = [
    {
      name: "Type of Shares",
      selector: (row) => row.type_of_shares,
    },
    {
      name: "Number of Shares",
      selector: (row) => row.number_of_shares,
    },
    {
      name: "Par/Stated Value",
      selector: (row) => row.par_or_stated_value,
    },
    {
      name: "Amount (PhP)",
      selector: (row) => row.amount,
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
      name: "Number of Shares in the Hands of the Public",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.number_of_shares_in_hands}
            name={"number_of_shares_in_hands"}
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
    },
    {
      name: "% of Ownership",
      selector: (row) => `${row.percent_of_ownership}%`,
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
      name: "Number of Shares in the Hands of the Public",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"number"}
            value={row.number_of_shares_in_hands}
            name={"number_of_shares_in_hands"}
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

  return (
    <>
      {/* Authorized Capital Stock */}
      <div>
        <TableComponent
          id={"authCapitalTable"}
          tableName={"Authorized Capital Stock"}
          setTable={() => {
            setAuthCapitalStockData(formData.auth_capital_stock.capital_stocks);
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
      </div>

      <div className="divider"></div>

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
              const subTotalAmountForeign = subscribeCapitalForeignData.reduce(
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
                })
              );
            }}
          />
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
                filipinoSubscribeCapitalState,
              ]);
            }}
            column={paidUpCapitalFilipinoColumn}
            data={formData.paid_up_capital.filipino}
            tableData={paidUpCapitalFilipinoData}
            tableDataState={filipinoSubscribeCapitalState}
            editColumn={editPaidUpCapitalFilipinoColumn}
            addFunction={() => {
              console.log(paidUpCapitalFilipinoData);
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
                    formData.paid_up_capital.sub_total_number_of_shares_foreign,
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
                foreignSubscribeCapitalState,
              ]);
            }}
            column={paidUpCapitalForeignColumn}
            data={formData.paid_up_capital.foreign}
            tableData={paidUpCapitalForeignData}
            tableDataState={foreignSubscribeCapitalState}
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
              const subTotalOwnershipForeign = paidUpCapitalForeignData.reduce(
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
        </div>
      </div>
    </>
  );
};

export default step3;
