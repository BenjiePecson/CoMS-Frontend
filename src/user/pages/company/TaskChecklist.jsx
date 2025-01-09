import React from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useSelector } from "react-redux";
import Select from "react-select";
import addTask from "../../components/addTask";

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

          { goto: "/", text: "Tasks" },
        ]}
      />
      <div className="overflow-x-auto">
        <div className="flex flex-row justify-between my-3">
          <h1 className="font-bold text-[24px]">Task</h1>
          <Link to={"/task-checklist/addtask"}>
            <button className="flex flex-row justify-center items-center gap-1 bg-[#667A8A] text-white rounded-xl px-5 py-2 ">
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
          </Link>
        </div>

        <table className="table border-collapse w-full">
          {/* head */}
          <thead>
            <tr className="font-bold text-[#1F384C] bg-[#FFFFFF] border-b-2 border-[#1F384C]">
              <th className="border border-[#1F384C] px-2 py-1"></th>
              <th rowSpan={2} className="border border-[#1F384C] px-2 py-1">
                Company
              </th>
              <th rowSpan={2} className="border border-[#1F384C] px-2 py-1">
                Task Name
              </th>
              <th
                colSpan={2}
                className="text-center border border-[#1F384C] px-2 py-1"
              >
                PROJECT
              </th>

              <th rowSpan={2} className="border border-[#1F384C] px-2 py-1">
                Remarks
              </th>
              <th className="border border-[#1F384C] px-2 py-1"></th>
            </tr>
            <tr className="font-bold text-[#1F384C] bg-[#FFFFFF] border-b-2 border-[#1F384C]">
              <th className="border border-[#1F384C] px-2 py-1"></th>
              <th className="border border-[#1F384C] px-2 py-1">Open</th>
              <th className="border border-[#1F384C] px-2 py-1">Closed</th>

              <th className="border border-[#1F384C] px-2 py-1"></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="text-[#868686] hover:bg-gray-50">
              <th>1</th>
              <th>OffSure BPO Services</th>
              <td>GIS 2024</td>
              <td></td>

              <td></td>
              <td>Remarks</td>

              <td>
                <div className="flex space-x-2">
                  <button className="btn btn-outline btn-primary btn-sm">
                    View
                  </button>
                  <button className="btn btn-outline btn-secondary btn-sm">
                    Edit
                  </button>
                  <button className="btn btn-outline btn-error btn-sm">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            <tr className="text-[#868686] hover:bg-gray-50">
              <th>2</th>
              <th>Half Sweet</th>
              <td>Business Permit Renewal 2024</td>

              <td></td>

              <td></td>
              <td>Remarks</td>

              <td>
                <div className="flex space-x-2">
                  <Link
                    to={"/project-management/123"}
                    className="btn btn-outline btn-primary btn-sm"
                  >
                    View
                  </Link>
                  <button className="btn btn-outline btn-secondary btn-sm">
                    Edit
                  </button>
                  <button className="btn btn-outline btn-error btn-sm">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
