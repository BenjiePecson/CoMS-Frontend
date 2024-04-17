import React, { createContext, useContext, useState } from "react";
import DataTable from "react-data-table-component";


const step3 = ({
  subscribedCapitalFilipinoData,
  filipino,
  filipinoSubscribeCapital,
  setSubscribedCapitalFilipinotable,
  setFormData,
}) => {
  const subscribedCapitalFilipinoColumnEdit = [
    {
      name: "Filipino",
    },
    {
      name: "Number of Stock Holders",
      cell: (row, rowIndex) => {
        return (
          <>
            <div className="w-full rounded-lg">
              <input
                className="w-full text-[12px] h-full p-2 rounded-lg bg-gray-200"
                type="text"
                value={row.number_of_stock_holders}
                name="number_of_stock_holders"
                onChange={(e) => {
                  console.log(rowIndex);
                  editSubscribeCapitalFilipinohandleChange(
                    e.target.name,
                    e.target.value,
                    rowIndex
                  );
                }}
              />
            </div>
          </>
        );
      },
    },
    {
      name: "Types of Shares",
      cell: (row, rowIndex) => {
        return (
          <>
            <div className="w-full rounded-lg">
              <input
                className="w-full text-[12px] h-full p-2 rounded-lg bg-gray-200"
                type="text"
                value={row.types_of_shares}
                name="types_of_shares"
                onChange={(e) => {
                  editSubscribeCapitalFilipinohandleChange(
                    e.target.name,
                    e.target.value,
                    rowIndex
                  );
                }}
              />
            </div>
          </>
        );
      },
    },
    {
      name: "Number of Shares",
      selector: (row, rowIndex) => {
        return (
          <>
            {/* row.type */}
            <div className="w-full rounded-lg">
              <input
                className="w-full text-[12px] h-full p-2 rounded-lg bg-gray-200"
                type="text"
                value={row.number_of_shares}
                name="number_of_shares"
                onChange={(e) => {
                  editSubscribeCapitalFilipinohandleChange(
                    e.target.name,
                    e.target.value,
                    rowIndex
                  );
                }}
              />
            </div>
          </>
        );
      },
    },
    {
      name: "Number of Shares in the Hands of the Public",
      cell: (row, rowIndex) => {
        return (
          <>
            {/* row.type */}
            <div
              className="rounded-lg bg-blue-500 w-full grow"
              style={{ width: "100%" }}
            >
              <input
                className=" w-full text-[12px] p-2 rounded-lg bg-gray-200"
                type="text"
                value={row.number_of_shares_in_hands}
                name="number_of_shares_in_hands"
                onChange={(e) => {
                  editSubscribeCapitalFilipinohandleChange(
                    e.target.name,
                    e.target.value,
                    rowIndex
                  );
                }}
              />
            </div>
          </>
        );
      },
      width: "20%",
      wrap: true,
    },
    {
      name: "Par/Stated Value",
      cell: (row, rowIndex) => {
        return (
          <>
            <div className="w-full rounded-lg">
              <input
                className="w-full text-[12px] h-full p-2 rounded-lg bg-gray-200"
                type="text"
                value={row.par_or_stated_value}
                name="par_or_stated_value"
                onChange={(e) => {
                  editSubscribeCapitalFilipinohandleChange(
                    e.target.name,
                    e.target.value,
                    rowIndex
                  );
                }}
              />
            </div>
          </>
        );
      },
    },
    {
      name: "Amount (PhP)",
      cell: (row, rowIndex) => {
        return (
          <>
            {/* row.type */}
            <div className="w-full rounded-lg">
              <input
                className="w-full text-[12px] h-full p-2 rounded-lg bg-gray-200"
                type="text"
                value={row.amount}
                name="amount"
                onChange={(e) => {
                  editSubscribeCapitalFilipinohandleChange(
                    e.target.name,
                    e.target.value,
                    rowIndex
                  );
                }}
              />
            </div>
          </>
        );
      },
    },
    {
      name: "% of Ownership",
      cell: (row, rowIndex) => {
        return (
          <>
            <div className="flex flex-row justify-center items-center gap-2">
              <div className="w-full rounded-lg text-black">
                <input
                  className="w-full text-[12px] h-full p-2 rounded-lg bg-gray-200"
                  type="text"
                  value={row.percent_of_ownership}
                  name="percent_of_ownership"
                  onChange={(e) => {
                    editSubscribeCapitalFilipinohandleChange(
                      e.target.name,
                      e.target.value,
                      rowIndex
                    );
                  }}
                />
              </div>
              <span>%</span>
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
                const updatedTable = editSubscribedCapitalFilipinoTable.filter(
                  (_, index) => index !== rowIndex
                );

                setEditSubscribedCapitalFilipinoTable(updatedTable);
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

  const [subscribedCapitalFilipinoTable, setSubscribedCapitalFilipinoTable] =
    useState(filipino);

  const subscribedCapitalFilipinoTablehandleChange = (
    name,
    value,
    rowIndex
  ) => {
    // Create a new array with the updated object
    const updatedTable = subscribedCapitalFilipinoTable.map((item, index) => {
      if (index === rowIndex) {
        return {
          ...item,
          [name]: value, // Update the specific key with the new value
        };
      }
      return item;
    });

    // Update the state with the new array
    setSubscribedCapitalFilipinoTable(updatedTable);
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
      <div className="w-full p-5">
        <div className="flex flex-col gap-5">
          <div>
            <div className="p-5">
              <div className="flex flex-row justify-between">
                <h1>Auth Capital Stock</h1>
                <button
                  className="p-2 bg-blue-200 rounded-lg"
                  onClick={() => {
                    document
                      .getElementById("authCapitalStockModal")
                      .showModal();
                  }}
                >
                  Edit Table
                </button>
              </div>
              <DataTable
                columns={subscribedCapitalFilipinoData}
                data={filipino}
                persistTableHead={true}
              />
            </div>
          </div>

          <dialog id="authCapitalStockModal" className="modal">
            <div className="modal-box w-full max-w-7xl">
              <div className="flex flex-row justify-between">
                <h3 className="font-bold text-lg">Authorized Capital Stock</h3>
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                    ✕
                  </button>
                </form>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  className="bg-green-400 p-2 rounded-lg"
                  onClick={(e) => {
                    setSubscribedCapitalFilipinoTable([
                      ...subscribedCapitalFilipinoTable,
                      filipinoSubscribeCapital,
                    ]);

                    // setFormData((prevState) => ({
                    //   ...prevState,
                    //   subscribe_capital: {
                    //     ...prevState.subscribe_capital,
                    //     filipino: [
                    //       ...prevState.subscribe_capital.filipino,
                    //       filipinoSubscribeCapital,
                    //     ],
                    //   },
                    // }));
                  }}
                >
                  Add
                </button>
                <DataTable
                  title="Desserts - Conditional Cells"
                  columns={subscribedCapitalFilipinoColumnEdit}
                  data={subscribedCapitalFilipinoTable}
                  persistTableHead={true}
                />

                <button
                  onClick={(e) => {
                    // setFormData(
                    //   subscribedCapitalFilipinoTable
                    // );

                    document.getElementById("authCapitalStockModal").close();
                  }}
                  className="btn bg-green-200 text-white mt-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
};

export default step3;
