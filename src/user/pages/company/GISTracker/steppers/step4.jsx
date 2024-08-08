import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  directorsOrOfficersState,
  setDirectorsOrOfficers,
} from "../../../../store/GIS/GISFormSlice";
import InputComponent from "../../../../components/InputComponent";
import TableComponent from "../../../../components/TableComponent";

import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DataTable from "react-data-table-component";

const step4 = () => {
  const formData = useSelector((state) => state.formGIS.formData);
  const dispatch = useDispatch();

  const [directorsOrOfficersData, setDirectorsOrOfficersData] = useState(
    formData.directors_or_officers
  );

  const [formDirector, setFormDirector] = useState(directorsOrOfficersState);

  const [errors, setErrors] = useState({});

  const directorsOrOfficersColumn = [
    {
      name: "Name",
      selector: (row) => row.name,
      width: "15%",
    },
    {
      name: "Current Residual Address",
      selector: (row) => row.current_residual_address,
      width: "20%",
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
      width: "15%",
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
      width: "15%",
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
      width: "20%",
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
      width: "15%",
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

  const [listOfDirectors, setListOfDirectors] = useState([]);

  const getTaskPos = (id) =>
    listOfDirectors.findIndex((director) => director.id === id);

  const handleDragEnd = (ev) => {
    const { active, over } = ev;
    console.log(active);

    if (active.id === over.id) return;

    setListOfDirectors((directors) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(directors, originalPos, newPos);
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

  const Director = ({
    id,
    director,
    listOfDirectors,
    setListOfDirectors,
    index,
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      fontSize: "12px",
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
        <td ref={setNodeRef} {...attributes} {...listeners} style={style}>
          <div className="w-[150px]">{director.name}</div>
        </td>
        <td ref={setNodeRef} {...attributes} {...listeners} style={style}>
          <div className="w-[150px]">{director.current_residual_address}</div>
        </td>
        <td ref={setNodeRef} {...attributes} {...listeners} style={style}>
          <div className="w-[150px]">{director.nationality}</div>
        </td>
        <td ref={setNodeRef} {...attributes} {...listeners} style={style}>
          <div className="w-[150px]">{director.incorporator}</div>
        </td>
        <td ref={setNodeRef} {...attributes} {...listeners} style={style}>
          <div className="w-[150px]">{director.board}</div>
        </td>
        <td ref={setNodeRef} {...attributes} {...listeners} style={style}>
          <div className="w-[150px]">{director.gender}</div>
        </td>
        <td ref={setNodeRef} {...attributes} {...listeners} style={style}>
          <div className="w-[150px]">{director.stock_holder}</div>
        </td>
        <td ref={setNodeRef} {...attributes} {...listeners} style={style}>
          <div className="w-[150px]">{director.officer}</div>
        </td>
        <td ref={setNodeRef} {...attributes} {...listeners} style={style}>
          <div className="w-[150px]">{director.executive_committe}</div>
        </td>
        <td ref={setNodeRef} {...attributes} {...listeners} style={style}>
          <div className="w-[150px]">{director.tax_id_number}</div>
        </td>
        <td>
          <button
            type="button"
            onClick={(e) => {
              console.log(id);
              const listOfDirectorsUpdated = listOfDirectors.filter(
                (_) => _.id != id
              );
              setListOfDirectors(listOfDirectorsUpdated);
            }}
          >
            {removeIconSVG}
          </button>
        </td>
      </>
    );
  };

  const Column = ({ directors, setListOfDirectors }) => {
    return (
      <SortableContext items={directors} strategy={verticalListSortingStrategy}>
        {directors.map((director, index) => {
          return (
            <tr key={director.id} className="w-full">
              <Director
                id={director.id}
                director={director}
                listOfDirectors={directors}
                index={index}
                setListOfDirectors={setListOfDirectors}
              />
            </tr>
          );
        })}
      </SortableContext>
    );
  };

  return (
    <>
      {/* Directors/Officers */}
      {/* <div>
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
      </div> */}

      <div className="w-full p-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row justify-between items-center">
            <h1 className="poppins-semibold text-[15px] text-black">
              {"Directors/Officers"}
            </h1>
            <button
              className="btn btn-outline btn-primary btn-sm"
              onClick={(e) => {
                let directorsList = formData.directors_or_officers.map(
                  (director, index) => {
                    return { id: index + 1, ...director };
                  }
                );

                setListOfDirectors(directorsList);
                document.getElementById("addModal").showModal();
              }}
            >
              {editSVG} Update Table
            </button>
          </div>
          <DataTable
            customStyles={tableCustomStyles}
            columns={directorsOrOfficersColumn}
            data={formData.directors_or_officers}
            persistTableHead={true}
          />
        </div>

        <dialog id={"addModal"} className="modal">
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
                  {"Directors/Officers"}
                </h1>
                <button
                  className="btn btn-outline btn-primary btn-sm"
                  onClick={(e) => {
                    setFormDirector(directorsOrOfficersState);
                    document.getElementById("addRowModal").showModal();
                  }}
                >
                  Add row
                </button>
              </div>
              <div>
                <DndContext
                  onDragEnd={handleDragEnd}
                  collisionDetection={closestCorners}
                >
                  <div className="overflow-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th className="w-[20%]">Current Residual Address</th>
                          <th className="w-[20%]">Nationality</th>
                          <th className="w-[20%]">Incorporator</th>
                          <th className="w-[20%]">Board</th>
                          <th className="w-[20%]">Gender</th>
                          <th className="w-[20%]">Stockholder</th>
                          <th className="w-[20%]">Officer</th>
                          <th className="w-[20%]">Executive</th>
                          <th className="w-[20%]">Tax Identification Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listOfDirectors.length == 0 ? (
                          <tr>
                            <td colSpan={10} className="text-center">
                              There are no records to display
                            </td>
                          </tr>
                        ) : (
                          <Column
                            directors={listOfDirectors}
                            setListOfDirectors={setListOfDirectors}
                          ></Column>
                        )}
                      </tbody>
                    </table>
                  </div>
                </DndContext>
              </div>
            </div>

            <div className="flex flex-row justify-between mt-10">
              <button
                onClick={(e) => {
                  document.getElementById("addModal").close();
                }}
                className="btn"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  // addFunction();

                  let list_of_directors = listOfDirectors.map(
                    ({ id, ...rest }) => rest
                  );

                  dispatch(setDirectorsOrOfficers(list_of_directors));

                  document.getElementById("addModal").close();
                }}
                className="btn btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </dialog>

        {/* Add Agenda Modal*/}
        <dialog id="addRowModal" className="modal">
          <div className="modal-box">
            <div className="flex flex-row justify-between py-4">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                  ✕
                </button>
              </form>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="poppins-semibold text-md">Add Director</h1>
              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Name
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.name && `input-error`
                  }`}
                  name="name"
                  value={formDirector.name}
                  onChange={(e) => {
                    setFormDirector({ ...formDirector, name: e.target.value });
                  }}
                />
                {errors.name && (
                  <span className="text-[12px] text-red-500">
                    {errors.name}
                  </span>
                )}
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Current Residual Address
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.current_residual_address && `input-error`
                  }`}
                  name="current_residual_address"
                  value={formDirector.current_residual_address}
                  onChange={(e) => {
                    setFormDirector({
                      ...formDirector,
                      current_residual_address: e.target.value,
                    });
                  }}
                />
                {errors.current_residual_address && (
                  <span className="text-[12px] text-red-500">
                    {errors.current_residual_address}
                  </span>
                )}
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Nationality
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.nationality && `input-error`
                  }`}
                  name="nationality"
                  value={formDirector.nationality}
                  onChange={(e) => {
                    setFormDirector({
                      ...formDirector,
                      nationality: e.target.value,
                    });
                  }}
                />
                {errors.nationality && (
                  <span className="text-[12px] text-red-500">
                    {errors.nationality}
                  </span>
                )}
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Incorporator
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.incorporator && `input-error`
                  }`}
                  name="incorporator"
                  value={formDirector.incorporator}
                  onChange={(e) => {
                    setFormDirector({
                      ...formDirector,
                      incorporator: e.target.value,
                    });
                  }}
                />
                {errors.incorporator && (
                  <span className="text-[12px] text-red-500">
                    {errors.incorporator}
                  </span>
                )}
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Board
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.board && `input-error`
                  }`}
                  name="board"
                  value={formDirector.board}
                  onChange={(e) => {
                    setFormDirector({ ...formDirector, board: e.target.value });
                  }}
                />
                {errors.board && (
                  <span className="text-[12px] text-red-500">
                    {errors.board}
                  </span>
                )}
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Gender
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.gender && `input-error`
                  }`}
                  name="gender"
                  value={formDirector.gender}
                  onChange={(e) => {
                    setFormDirector({
                      ...formDirector,
                      gender: e.target.value,
                    });
                  }}
                />
                {errors.gender && (
                  <span className="text-[12px] text-red-500">
                    {errors.gender}
                  </span>
                )}
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Stockholder
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.stock_holder && `input-error`
                  }`}
                  name="stock_holder"
                  value={formDirector.stock_holder}
                  onChange={(e) => {
                    setFormDirector({
                      ...formDirector,
                      stock_holder: e.target.value,
                    });
                  }}
                />
                {errors.stock_holder && (
                  <span className="text-[12px] text-red-500">
                    {errors.stock_holder}
                  </span>
                )}
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Officer
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.officer && `input-error`
                  }`}
                  name="officer"
                  value={formDirector.officer}
                  onChange={(e) => {
                    setFormDirector({
                      ...formDirector,
                      officer: e.target.value,
                    });
                  }}
                />
                {errors.officer && (
                  <span className="text-[12px] text-red-500">
                    {errors.officer}
                  </span>
                )}
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Executive Committee
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.executive_committe && `input-error`
                  }`}
                  name="executive_committe"
                  value={formDirector.executive_committe}
                  onChange={(e) => {
                    setFormDirector({
                      ...formDirector,
                      executive_committe: e.target.value,
                    });
                  }}
                />
                {errors.executive_committe && (
                  <span className="text-[12px] text-red-500">
                    {errors.executive_committe}
                  </span>
                )}
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Tax Identification Number
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.tax_id_number && `input-error`
                  }`}
                  name="tax_id_number"
                  value={formDirector.tax_id_number}
                  onChange={(e) => {
                    setFormDirector({
                      ...formDirector,
                      tax_id_number: e.target.value,
                    });
                  }}
                />
                {errors.tax_id_number && (
                  <span className="text-[12px] text-red-500">
                    {errors.tax_id_number}
                  </span>
                )}
              </label>

              <button
                className="btn bg-primary text-white"
                onClick={async (e) => {
                  const director = {
                    id: listOfDirectors.length + 1,
                    ...formDirector,
                  };
                  setListOfDirectors([...listOfDirectors, director]);
                  document.getElementById("addRowModal").close();
                }}
              >
                Add
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default step4;
