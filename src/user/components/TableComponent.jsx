import React from "react";
import DataTable, { createTheme } from "react-data-table-component";

const TableComponent = ({
  id,
  tableName,
  setTable,
  setAddTable,
  column,
  data,
  tableData,
  editColumn,
  addFunction,
}) => {
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
    <div className="w-full p-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between items-center">
          <h1 className="poppins-semibold text-[15px] text-black">
            {tableName}
          </h1>
          <button
            className="btn btn-outline btn-primary btn-sm"
            onClick={(e) => {
              setTable();
              document.getElementById(id).showModal();
            }}
          >
            {editSVG} Update Table
          </button>
        </div>
        <DataTable
          customStyles={tableCustomStyles}
          columns={column}
          data={data}
          persistTableHead={true}
        />
      </div>

      <dialog id={id} className="modal">
        <div className="modal-box w-full max-w-7xl">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Update Table Details</h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                ✕
              </button>
            </form>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <h1 className="poppins-semibold text-[15px] text-black">
                {tableName}
              </h1>
              <button
                className="btn btn-outline btn-primary btn-sm"
                onClick={(e) => {
                  setAddTable();
                }}
              >
                Add row
              </button>
            </div>

            <DataTable
              columns={editColumn}
              data={tableData}
              persistTableHead={true}
              customStyles={tableCustomStyles}
            />
          </div>

          <div className="flex flex-row justify-between mt-10">
            <button
              onClick={(e) => {
                document.getElementById(id).close();
              }}
              className="btn"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                addFunction();
                document.getElementById(id).close();
              }}
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TableComponent;
