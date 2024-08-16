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
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const step4 = () => {
  const { companyId } = useParams();
  const formData = useSelector((state) => state.formGIS.formData);
  const dispatch = useDispatch();

  const [directorsOrOfficersData, setDirectorsOrOfficersData] = useState([]);

  const [formDirector, setFormDirector] = useState(directorsOrOfficersState);

  const [errors, setErrors] = useState({});

  const directorsOrOfficersColumn = [
    {
      name: "Name",
      selector: (row) => row.name,
      width: "15%",
    },
    {
      name: "Current Residential Address",
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
      name: "Current Residential Address",
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
  const [listOfIndividuals, setListOfIndividuals] = useState([]);
  const [isDoneFetchIndividual, setIsDoneFetchIndividual] = useState(false);
  const [isDoneFetchDirectors, setIsDoneFetchDirectors] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

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
          <div className="flex flex-row gap-2">
            <button
              type="button"
              onClick={(e) => {
                setSelectedIndex(index);
                setFormDirector({ ...formDirector, ...director });
                document.getElementById("editRowModal").showModal();
              }}
            >
              {editIconSVG}
            </button>
            <button
              type="button"
              onClick={(e) => {
                const listOfDirectorsUpdated = listOfDirectors.filter(
                  (_) => _.id != id
                );
                setListOfDirectors(listOfDirectorsUpdated);
              }}
            >
              {removeIconSVG}
            </button>
          </div>
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

  const extractDirectorDetails = (individual) => {
    const {
      given_name,
      middle_name,
      surname,
      ext_name,
      address,
      individuals_id,
      nationality,
      tax_identification_no,
    } = individual;

    const middlename =
      middle_name != "" ? `${middle_name[0].toUpperCase()}.` : "";
    const name = `${given_name} ${middlename} ${surname} ${ext_name}`;

    return {
      name,
      current_residual_address: address,
      individuals_id,
      nationality,
      tax_id_number: tax_identification_no,
    };
  };

  const isFormValid = async (isEdit) => {
    let newErrors = {};

    if (formDirector.incorporator == "") {
      newErrors.incorporator = "Incorporator is required";
    }

    if (formDirector.board == "") {
      newErrors.board = "Board is required";
    }

    if (formDirector.gender == "") {
      newErrors.gender = "Gender is required";
    }

    if (formDirector.stock_holder == "") {
      newErrors.stock_holder = "Stockholder is required";
    }

    if (formDirector.officer == "") {
      newErrors.officer = "Officer is required";
    }

    if (formDirector.executive_committe == "") {
      newErrors.executive_committe = "Executive Committee is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length != 0;
  };

  const formatString = (input) => {
    // Replace underscores with spaces
    let formatted = input.replace(/_/g, " ");

    // Capitalize the first letter of each word
    formatted = formatted.replace(/\b\w/g, (char) => char.toUpperCase());

    return formatted;
  };

  const handleOnChange = (ev) => {
    const { name, value } = ev.target;

    setFormDirector({
      ...formDirector,
      [name]: value,
    });

    if (value == "") {
      setErrors({ ...errors, [name]: `${formatString(name)} is Required` });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  useEffect(() => {
    let fetchListOfIndividuals = async () => {
      let response = await axios.get(`/individuals/${companyId}`);
      setListOfIndividuals(response.data);
      if (formData.directors_or_officers.length > 0) {
        const updateDirectorsDetails = formData.directors_or_officers.map(
          (director) => {
            const director_in_list = response.data.filter(
              (u) => u.individuals_id == director.individuals_id
            );
            if (director_in_list.length > 0) {
              return {
                ...director,
                ...extractDirectorDetails(director_in_list[0]),
              };
            }
            return director;
          }
        );
        setDirectorsOrOfficersData(updateDirectorsDetails);
        dispatch(setDirectorsOrOfficers(updateDirectorsDetails));
      }
    };

    fetchListOfIndividuals();
  }, []);

  // useEffect(() => {
  //   // console.log(formData.directors_or_officers);
  //   console.log(formData.directors_or_officers);
  // }, [formData.directors_or_officers]);

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
                    if (listOfIndividuals.length != 0) {
                      const extractedDirector = extractDirectorDetails(
                        listOfIndividuals[0]
                      );
                      setFormDirector({
                        ...extractedDirector,
                        incorporator: "Y",
                        stock_holder: "Y",
                        gender: "M",
                        board: "C",
                        officer: "N/A",
                        executive_committe: "N/A",
                      });
                    }
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
                          <th className="w-[20%]">
                            Current Residential Address
                          </th>
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

        {/* Add Row Modal*/}
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
                  <span className="label-text">
                    Director/Officer<span className="text-red-500">*</span>
                  </span>
                </div>
                <select
                  className="select select-bordered"
                  onChange={(ev) => {
                    const individual = listOfIndividuals.filter(
                      (u) => u.individuals_id == ev.target.value
                    );
                    const director = extractDirectorDetails(individual[0]);
                    console.log({ ...formDirector, director });
                    setFormDirector({ ...formDirector, ...director });
                  }}
                  value={formDirector.individuals_id}
                >
                  {listOfIndividuals.map((individual) => {
                    return (
                      <option
                        key={individual.individuals_id}
                        value={individual.individuals_id}
                      >{`${individual.given_name} ${individual.middle_name} ${individual.surname} ${individual.ext_name} - ${individual.address}`}</option>
                    );
                  })}
                </select>
                {listOfIndividuals.length == 0 && (
                  <span className="text-[12px] text-start pt-1">
                    <span className="font-bold"> Note: </span>
                    Please check if there is an existing record in the List of
                    Individuals. If not, please add a record to the List of
                    Individuals in the{" "}
                    <Link
                      to={`/company/${companyId}/settings`}
                      className="font-bold underline"
                    >
                      Company Setting Page.
                    </Link>
                  </span>
                )}
              </label>

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
                  disabled
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
                    Current Residential Address
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
                  disabled
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
                  disabled
                />
                {errors.nationality && (
                  <span className="text-[12px] text-red-500">
                    {errors.nationality}
                  </span>
                )}
              </label>

              <div className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Incorporator
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <div className="flex flex-row gap-5">
                  <div className="flex flex-row gap-2">
                    <input
                      type="radio"
                      name="incorporator"
                      className="radio"
                      checked={formDirector.incorporator == "Y"}
                      onChange={(e) => {
                        setFormDirector({
                          ...formDirector,
                          incorporator: "Y",
                        });
                      }}
                    />
                    Yes
                  </div>
                  <div className="flex flex-row gap-2">
                    <input
                      type="radio"
                      name="incorporator"
                      className="radio"
                      checked={formDirector.incorporator == "N"}
                      onChange={(e) => {
                        setFormDirector({
                          ...formDirector,
                          incorporator: "N",
                        });
                      }}
                    />
                    No
                  </div>
                </div>

                {errors.incorporator && (
                  <span className="text-[12px] text-red-500 text-start">
                    {errors.incorporator}
                  </span>
                )}
              </div>
              <div className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Stockholder
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <div className="flex flex-row gap-5">
                  <div className="flex flex-row gap-2">
                    <input
                      type="radio"
                      name="stock_holder"
                      className="radio"
                      checked={formDirector.stock_holder == "Y"}
                      onChange={(e) => {
                        setFormDirector({
                          ...formDirector,
                          stock_holder: "Y",
                        });
                      }}
                    />
                    Yes
                  </div>
                  <div className="flex flex-row gap-2">
                    <input
                      type="radio"
                      name="stock_holder"
                      className="radio"
                      checked={formDirector.stock_holder == "N"}
                      onChange={(e) => {
                        setFormDirector({
                          ...formDirector,
                          stock_holder: "N",
                        });
                      }}
                    />
                    No
                  </div>
                </div>

                {errors.stockholder && (
                  <span className="text-[12px] text-red-500 text-start">
                    {errors.stockholder}
                  </span>
                )}
              </div>
              <div className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Gender
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <div className="flex flex-row gap-5">
                  <div className="flex flex-row gap-2">
                    <input
                      type="radio"
                      name="gender"
                      className="radio"
                      checked={formDirector.gender == "M"}
                      onChange={(e) => {
                        setFormDirector({
                          ...formDirector,
                          gender: "M",
                        });
                      }}
                    />
                    Male
                  </div>
                  <div className="flex flex-row gap-2">
                    <input
                      type="radio"
                      name="gender"
                      className="radio"
                      checked={formDirector.gender == "F"}
                      onChange={(e) => {
                        setFormDirector({
                          ...formDirector,
                          gender: "F",
                        });
                      }}
                    />
                    Female
                  </div>
                </div>

                {errors.gender && (
                  <span className="text-[12px] text-red-500 text-start">
                    {errors.gender}
                  </span>
                )}
              </div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Board<span className="text-red-500">*</span>
                  </span>
                </div>
                <select
                  className="select select-bordered"
                  onChange={(ev) => {
                    setFormDirector({
                      ...formDirector,
                      board: ev.target.value,
                    });
                  }}
                  value={formDirector.board}
                >
                  <option value="C">Chairman</option>
                  <option value="M">Member</option>
                  <option value="I">Independent Director</option>
                </select>
              </label>
              {/* <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Officer<span className="text-red-500">*</span>
                  </span>
                </div>
                <select
                  className="select select-bordered"
                  onChange={(ev) => {
                    setFormDirector({
                      ...formDirector,
                      officer: ev.target.value,
                    });
                  }}
                  value={formDirector.officer}
                >
                  <option value="PRESIDENT">PRESIDENT</option>
                  <option value="CORPORATE SECRETARY">
                    CORPORATE SECRETARY
                  </option>
                  <option value="TREASURER">TREASURER</option>
                  <option value="N/A">N/A</option>
                </select>
              </label> */}
              {/* <div className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Gender
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <div className="flex flex-row gap-5">
                  <div className="flex flex-row gap-2">
                    <input
                      type="radio"
                      name="gender"
                      className="radio"
                      checked={formDirector.gender == "M"}
                      onChange={(e) => {
                        setFormDirector({
                          ...formDirector,
                          gender: "M",
                        });
                      }}
                    />
                    Male
                  </div>
                  <div className="flex flex-row gap-2">
                    <input
                      type="radio"
                      name="gender"
                      className="radio"
                      checked={formDirector.gender == "F"}
                      onChange={(e) => {
                        setFormDirector({
                          ...formDirector,
                          gender: "F",
                        });
                      }}
                    />
                    Female
                  </div>
                </div>

                {errors.stockholder && (
                  <span className="text-[12px] text-red-500 text-start">
                    {errors.stockholder}
                  </span>
                )}
              </div> */}
              {/* <label className="form-control w-full">
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
                  onChange={handleOnChange}
                />
                {errors.board && (
                  <span className="text-[12px] text-red-500 text-start">
                    {errors.board}
                  </span>
                )}
              </label> */}
              {/* <label className="form-control w-full">
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
                  onChange={handleOnChange}
                />
                {errors.gender && (
                  <span className="text-[12px] text-red-500 text-start">
                    {errors.gender}
                  </span>
                )}
              </label> */}
              {/* <label className="form-control w-full">
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
                  onChange={handleOnChange}
                />
                {errors.stock_holder && (
                  <span className="text-[12px] text-red-500 text-start">
                    {errors.stock_holder}
                  </span>
                )}
              </label> */}
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
                  onChange={handleOnChange}
                />
                {errors.officer && (
                  <span className="text-[12px] text-red-500 text-start">
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
                  onChange={handleOnChange}
                />
                {errors.executive_committe && (
                  <span className="text-[12px] text-red-500 text-start">
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
                  disabled
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
                  if (!(await isFormValid())) {
                    const director = {
                      id: listOfDirectors.length + 1,
                      ...formDirector,
                    };
                    setListOfDirectors([...listOfDirectors, director]);
                    document.getElementById("addRowModal").close();
                  }
                }}
              >
                Add
              </button>
            </div>
          </div>
        </dialog>

        {/* Edit Row Modal*/}
        <dialog id="editRowModal" className="modal">
          <div className="modal-box">
            <div className="flex flex-row justify-between py-4">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                  ✕
                </button>
              </form>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="poppins-semibold text-md">Edit Director</h1>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Director/Officer<span className="text-red-500">*</span>
                  </span>
                </div>
                <select
                  className="select select-bordered"
                  onChange={(ev) => {
                    const individual = listOfIndividuals.filter(
                      (u) => u.individuals_id == ev.target.value
                    );
                    const director = extractDirectorDetails(individual[0]);
                    console.log({ ...formDirector, director });
                    setFormDirector({ ...formDirector, ...director });
                  }}
                  value={formDirector.individuals_id}
                >
                  {listOfIndividuals.map((individual) => {
                    return (
                      <option
                        key={individual.individuals_id}
                        value={individual.individuals_id}
                      >{`${individual.given_name} ${individual.middle_name} ${individual.surname} ${individual.ext_name} - ${individual.address}`}</option>
                    );
                  })}
                </select>
                {listOfIndividuals.length == 0 && (
                  <span className="text-[12px] text-start pt-1">
                    <span className="font-bold"> Note: </span>
                    Please check if there is an existing record in the List of
                    Individuals. If not, please add a record to the List of
                    Individuals in the{" "}
                    <Link
                      to={`/company/${companyId}/settings`}
                      className="font-bold underline"
                    >
                      Company Setting Page.
                    </Link>
                  </span>
                )}
              </label>

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
                  disabled
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
                    Current Residential Address
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
                  disabled
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
                  disabled
                />
                {errors.nationality && (
                  <span className="text-[12px] text-red-500">
                    {errors.nationality}
                  </span>
                )}
              </label>

              <div className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Incorporator
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <div className="flex flex-row gap-5">
                  <div className="flex flex-row gap-2">
                    <input
                      type="radio"
                      name="incorporator_edit"
                      className="radio"
                      checked={formDirector.incorporator == "Y"}
                      value={formDirector.incorporator}
                      onChange={(e) => {
                        setFormDirector({
                          ...formDirector,
                          incorporator: "Y",
                        });
                      }}
                    />
                    Yes
                  </div>
                  <div className="flex flex-row gap-2">
                    <input
                      type="radio"
                      name="incorporator_edit"
                      className="radio"
                      checked={formDirector.incorporator == "N"}
                      value={"N"}
                      onChange={(e) => {
                        setFormDirector({
                          ...formDirector,
                          incorporator: "N",
                        });
                      }}
                    />
                    No
                  </div>
                </div>

                {errors.incorporator && (
                  <span className="text-[12px] text-red-500 text-start">
                    {errors.incorporator}
                  </span>
                )}
              </div>
              <div className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Stockholder
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <div className="flex flex-row gap-5">
                  <div className="flex flex-row gap-2">
                    <input
                      type="radio"
                      name="stock_holder_edit"
                      className="radio"
                      checked={formDirector.stock_holder == "Y"}
                      onChange={(e) => {
                        setFormDirector({
                          ...formDirector,
                          stock_holder: "Y",
                        });
                      }}
                    />
                    Yes
                  </div>
                  <div className="flex flex-row gap-2">
                    <input
                      type="radio"
                      name="stock_holder_edit"
                      className="radio"
                      checked={formDirector.stock_holder == "N"}
                      onChange={(e) => {
                        setFormDirector({
                          ...formDirector,
                          stock_holder: "N",
                        });
                      }}
                    />
                    No
                  </div>
                </div>

                {errors.stockholder && (
                  <span className="text-[12px] text-red-500 text-start">
                    {errors.stockholder}
                  </span>
                )}
              </div>
              <div className="form-control w-full">
                <div className="label">
                  <span className="poppins-regular text-[12px]">
                    Gender
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <div className="flex flex-row gap-5">
                  <div className="flex flex-row gap-2">
                    <input
                      type="radio"
                      name="gender_edit"
                      className="radio"
                      checked={formDirector.gender == "M"}
                      onChange={(e) => {
                        setFormDirector({
                          ...formDirector,
                          gender: "M",
                        });
                      }}
                    />
                    Male
                  </div>
                  <div className="flex flex-row gap-2">
                    <input
                      type="radio"
                      name="gender_edit"
                      className="radio"
                      checked={formDirector.gender == "F"}
                      onChange={(e) => {
                        setFormDirector({
                          ...formDirector,
                          gender: "F",
                        });
                      }}
                    />
                    Female
                  </div>
                </div>

                {errors.stockholder && (
                  <span className="text-[12px] text-red-500 text-start">
                    {errors.stockholder}
                  </span>
                )}
              </div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Board<span className="text-red-500">*</span>
                  </span>
                </div>
                <select
                  className="select select-bordered"
                  onChange={(ev) => {
                    setFormDirector({
                      ...formDirector,
                      board: ev.target.value,
                    });
                  }}
                  value={formDirector.board}
                >
                  <option value="C">Chairman</option>
                  <option value="M">Member</option>
                  <option value="I">Independent Director</option>
                </select>
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
                  onChange={handleOnChange}
                />
                {errors.officer && (
                  <span className="text-[12px] text-red-500 text-start">
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
                  onChange={handleOnChange}
                />
                {errors.executive_committe && (
                  <span className="text-[12px] text-red-500 text-start">
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
                  disabled
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
                  if (!(await isFormValid())) {
                    const newList = listOfDirectors.map((director, index) => {
                      if (selectedIndex == index) {
                        return formDirector;
                      }
                      return director;
                    });
                    setListOfDirectors(newList);
                    setSelectedIndex(null);
                    document.getElementById("editRowModal").close();
                  }
                }}
              >
                Update
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default step4;
