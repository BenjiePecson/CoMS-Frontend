import React from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useSelector } from "react-redux";
import Select from "react-select";

const Tasks = () => {
  const { companyId } = useParams();
  const selectedCompany = useSelector((state) => state.company.selectedCompany);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const colorOptions = [
    { value: "blue", label: "Business Renewal" },
    { value: "red", label: "GIS" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "purple", label: "Purple" },
    { value: "orange", label: "Orange" },
  ];
  return (
    <div>
      <Breadcrumbs
        lists={[
          { goto: "/", text: "Home" },
          {
            goto: `/company/${selectedCompany.companyId}`,
            text: `${selectedCompany.companyName}`,
          },

          { goto: "/", text: "Tasks" },
        ]}
      />
      <div className="overflow-x-auto">
        <div className="flex flex-row justify-between my-3">
          <h1 className="font-bold text-[24px]">Task</h1>
          <button
            className="flex flex-row justify-center items-center gap-1 bg-[#667A8A] text-white rounded-xl px-5 py-2 "
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            <svg
              width="13"
              height="10"
              viewBox="0 0 13 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0418 4.33337H7.29183V0.333374H5.7085V4.33337H0.958496V5.66671H5.7085V9.66671H7.29183V5.66671H12.0418V4.33337Z"
                fill="white"
              />
            </svg>
            Add Task
          </button>

          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Add Task</h3>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Task Name </span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered input-sm w-full"
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Task Description</span>
                </div>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Bio"
                ></textarea>
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Workflow </span>
                </div>{" "}
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={colorOptions[0]}
                  name="color"
                  options={colorOptions}
                />{" "}
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Checklist</span>
                </div>
                <Select
                  isMulti
                  name="colors"
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Target Date </span>
                </div>
                <input
                  type="date"
                  className="input input-bordered input-sm w-full"
                />
              </label>

              <div className="mt-5 flex justify-end">
                <button className="btn btn-sm bg-[#273069] text-white mx-1">
                  Add
                </button>

                <button className="btn btn-sm mx-1">Cancel</button>
              </div>
            </div>
          </dialog>
        </div>

        <table className="table">
          {/* head */}
          <thead>
            <tr className="font-bold text-[#1F384C] bg-[#FFFFFF]">
              <th></th>
              <th rowSpan={2} x>
                Company
              </th>
              <th rowSpan={2} x>
                Task Name
              </th>
              <th colSpan={2} className="text-center">
                PROJECT
              </th>
              <th colSpan={2} className="text-center">
                TASK
              </th>
              <th rowSpan={2}>Remarks</th>
              <th></th>
            </tr>
            <tr className="font-bold text-[#1F384C] bg-[#FFFFFF]">
              <th></th>

              <th>Open</th>
              <th>Closed</th>
              <th>Start</th>
              <th>End</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="text-[#868686]">
              <th>1</th>
              <th>OffSure BPO Services</th>
              <td>GIS 2024</td>
              <td>00/00/0000</td>
              <td>00/00/0000</td>
              <td>00/00/0000</td>
              <td>00/00/0000</td>
              <td>Remarks</td>

              <td>
                <button className="btn btn-success btn-sm mx-1">View</button>
                <button className="btn btn-success btn-sm mx-1">Edit</button>
                <button className="btn btn-success btn-sm mx-1">Delete</button>
              </td>
            </tr>
            <tr className="text-[#868686]">
              <th>2</th>
              <th>Half Sweet</th>
              <td>Business Permit Renewal 2024</td>
              <td>00/00/0000</td>
              <td>00/00/0000</td>
              <td>00/00/0000</td>
              <td>00/00/0000</td>
              <td>Remarks</td>

              <td>
                <Link
                  to={`/company/${companyId}/tasks-checklist/view`}
                  className="btn btn-success btn-sm mx-1"
                >
                  View
                </Link>
                <button className="btn btn-success btn-sm mx-1">Edit</button>
                <button className="btn btn-success btn-sm mx-1">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
