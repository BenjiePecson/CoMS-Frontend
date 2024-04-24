import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  directorsOrOfficersState,
  setDirectorsOrOfficers,
} from "../../../../store/GIS/GISFormSlice";
import InputComponent from "../../../../components/InputComponent";
import TableComponent from "../../../../components/TableComponent";

const step4 = () => {
  const formData = useSelector((state) => state.formGIS.formData);
  const dispatch = useDispatch();

  const [directorsOrOfficersData, setDirectorsOrOfficersData] = useState(
    formData.directors_or_officers
  );

  const directorsOrOfficersColumn = [
    {
      name: "Name",
      selector: (row) => row.name,
      width: "15%"
    },
    {
      name: "Current Residual Address",
      selector: (row) => row.current_residual_address,
      width: "20%"
    },
    {
      name: "Nationality",
      selector: (row) => row.nationality,
    },
    {
      name: "Incorporator",
      selector: (row) => row.incorporator,
    },
    {
      name: "Board",
      selector: (row) => row.board,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Stock Holder",
      selector: (row) => row.stock_holder,
    },
    {
      name: "Officer",
      selector: (row) => row.officer,
    },
    {
      name: "Executive Committe",
      selector: (row) => row.executive_committe,
    },
    {
      name: "Tax Identification Number",
      selector: (row) => row.tax_id_number,
      width: "15%"
    },
  ];

  const editDirectorsOrOfficersColumn = [
    {
      name: "Name",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.name}
            name={"name"}
            rowIndex={rowIndex}
            state={directorsOrOfficersData}
            setState={setDirectorsOrOfficersData}
          />
        );
      },
      width: "15%"
    },
    {
      name: "Current Residual Address",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.current_residual_address}
            name={"current_residual_address"}
            rowIndex={rowIndex}
            state={directorsOrOfficersData}
            setState={setDirectorsOrOfficersData}
          />
        );
      },
      width: "20%"
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
            state={directorsOrOfficersData}
            setState={setDirectorsOrOfficersData}
          />
        );
      },
    },
    {
      name: "Incorporator",
      selector: (row) => row.incorporator,
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.incorporator}
            name={"incorporator"}
            rowIndex={rowIndex}
            state={directorsOrOfficersData}
            setState={setDirectorsOrOfficersData}
          />
        );
      },
    },
    {
      name: "Board",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.board}
            name={"board"}
            rowIndex={rowIndex}
            state={directorsOrOfficersData}
            setState={setDirectorsOrOfficersData}
          />
        );
      },
    },
    {
      name: "Gender",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.gender}
            name={"gender"}
            rowIndex={rowIndex}
            state={directorsOrOfficersData}
            setState={setDirectorsOrOfficersData}
          />
        );
      },
    },
    {
      name: "Stock Holder",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.stock_holder}
            name={"stock_holder"}
            rowIndex={rowIndex}
            state={directorsOrOfficersData}
            setState={setDirectorsOrOfficersData}
          />
        );
      },
    },
    {
      name: "Officer",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.officer}
            name={"officer"}
            rowIndex={rowIndex}
            state={directorsOrOfficersData}
            setState={setDirectorsOrOfficersData}
          />
        );
      },
    },
    {
      name: "Executive Committe",
      cell: (row, rowIndex) => {
        return (
          <InputComponent
            type={"text"}
            value={row.executive_committe}
            name={"executive_committe"}
            rowIndex={rowIndex}
            state={directorsOrOfficersData}
            setState={setDirectorsOrOfficersData}
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
            state={directorsOrOfficersData}
            setState={setDirectorsOrOfficersData}
          />
        );
      },
      width: "15%"
    },
    {
      name: "",
      cell: (row, rowIndex) => {
        return (
          <>
            <button
              onClick={(e) => {
                const updatedTable = directorsOrOfficersData.filter(
                  (_, index) => index !== rowIndex
                );
                setDirectorsOrOfficersData(updatedTable);
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
      {/* Directors/Officers */}
      <div>
        <TableComponent
          id={"directorsOrOfficersTable"}
          tableName={"Directors/Officers"}
          setTable={() => {
            setDirectorsOrOfficersData(formData.directors_or_officers);
          }}
          setAddTable={() => {
            setDirectorsOrOfficersData([
              ...directorsOrOfficersData,
              directorsOrOfficersState,
            ]);
          }}
          column={directorsOrOfficersColumn}
          data={formData.directors_or_officers}
          tableData={directorsOrOfficersData}
          tableDataState={directorsOrOfficersState}
          editColumn={editDirectorsOrOfficersColumn}
          addFunction={() => {
            dispatch(setDirectorsOrOfficers(directorsOrOfficersData));
          }}
        />
      </div>
    </>
  );
};

export default step4;
