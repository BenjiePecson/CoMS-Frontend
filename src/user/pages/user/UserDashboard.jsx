import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useSelector } from "react-redux";
import axios from "axios";
import { showAlert } from "../../../assets/global";
import Select from "react-select";
import DataTable from "react-data-table-component";
import moment from "moment/moment";

const statusOptions = [
  { value: "To Do", label: "To Do" },
  { value: "Draft", label: "Draft" },
  { value: "In Progress", label: "In Progress" },
  { value: "For Review", label: "For Review" },
  { value: "Approved", label: "Approved" },
  { value: "On Hold", label: "On Hold" },
  { value: "Done", label: "Done" },
];

const UserDashboard = () => {
  const columns = [
    {
      name: "Company",
      selector: (row) => row.companyName,
      cell: (row) => <div className="p-2">{row.companyName}</div>,
    },
    {
      name: "Task",
      cell: (row) => row.taskDescription,
    },
    {
      name: "Date Created",
      selector: (row) => row.created_at,
      cell: (row) => moment(row.created_at).format("YYYY-MM-DD"),
    },
    {
      name: "Target Date",
      selector: (row) => row.targetDate,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Assignee",
      cell: (row) => {
        return row.assigneeDetails
          .map((obj) => `${obj.first_name} ${obj.last_name}`)
          .join(", ");
      },
    },
    {
      name: "Remarks",
      selector: (row) => row.remarks,
      cell: (row) => row.remarks,
    },
    {
      name: "Update Status",
      selector: (row) => row.year,
      cell: (row) => {
        return (
          <button
            className="mx-1"
            onClick={() => {
              handleEdit(task.companyId, task.taskId);
              document.getElementById("editModal").showModal();
            }}
          >
            <svg
              width="44"
              height="37"
              viewBox="0 0 44 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="44" height="37" rx="10" fill="#273069" />
              <path
                d="M15 26H30M22.6849 13.357L25.042 11L29.1667 15.1248L26.8097 17.4818M22.6849 13.357L18.0127 18.0292C17.8564 18.1855 17.7686 18.3975 17.7686 18.6185V22.398H21.5483C21.7693 22.398 21.9812 22.3103 22.1375 22.154L26.8097 17.4818M22.6849 13.357L26.8097 17.4818"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        );
      },
    },
  ];

  const [tasks, setTasks] = useState([]);

  const [companyData, setCompanyData] = useState({});

  const [users, setUsers] = useState([]);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      // Transform user data into options format expected by react-select
      const usersOptions = response.data.map((user) => ({
        value: user.first_name + " " + user.last_name,
        label: user.first_name + " " + user.last_name,
      }));

      setUsers(usersOptions);
    } catch (err) {}
  };

  const assigneeOptions = users;

  const [task, setTask] = useState({
    status: "",
  });

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingCompanyId, setCompanyId] = useState(null);

  const [selectedTab, setSelectedTab] = useState("My Tasks");
  const [loadingTable, setLoadingTable] = useState(false);
  const [filteredTable, setFilteredTable] = useState([]);

  const userSlice = useSelector((state) => state.user.user);
  const assignee = `${userSlice.first_name} ${userSlice.last_name}`;

  const fetchTasks = async () => {
    try {
      const tasksResponse = await axios.get(`/tasks/${assignee}`);
      setTasks(tasksResponse.data);

      const uniqueCompanyIds = Array.from(
        new Set(tasksResponse.data.map((task) => task.companyId))
      );

      const companyDataPromises = uniqueCompanyIds.map(async (companyId) => {
        try {
          const companyResponse = await axios.get(`/company/${companyId}`);
          if (companyResponse.data && companyResponse.data.length > 0) {
            const company = companyResponse.data[0];
            const companyName = company.companyName;
            setCompanyData((prevCompanyData) => ({
              ...prevCompanyData,
              [companyId]: companyName,
            }));
          } else {
            console.error(`No valid company name found for ID ${companyId}`);
          }
        } catch (error) {
          console.error(
            `Error fetching company with ID ${companyId}:`,
            error.message
          );
        }
      });

      await Promise.all(companyDataPromises);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const fetchAllTasks = async () => {
    let tasks = [];
    try {
      const tasksResponse = await axios.get(`/tasks`);
      tasks = tasksResponse.data;
    } catch (error) {
      console.log(error);
    } finally {
      return tasks;
    }
  };

  // useEffect(() => {
  //   fetchUsers();
  //   fetchTasks();
  // }, [assignee]);

  const handleTaskAddChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setTask({ ...task, [name]: selectedOption ? selectedOption.value : "" });
  };

  const handleMultiSelectChange = (selectedOptions) => {
    if (selectedOptions.length <= 2) {
      setTask({
        ...task,
        assignee: selectedOptions
          ? selectedOptions.map((option) => option.value)
          : [],
      });
    }
  };

  const getTask = async (companyId, id) => {
    try {
      const response = await axios.get(`/task/${companyId}/${id}`);
      return response.data;
    } catch (err) {
      console.error("Error fetching task:", err);
      throw err;
    }
  };

  const handleEdit = async (companyId, taskId) => {
    try {
      console.log(companyId);
      const taskData = await getTask(companyId, taskId); // Ensure companyId is defined somewhere
      setTask(taskData);
      setEditingTaskId(taskId);
      setCompanyId(companyId);
    } catch (err) {
      console.error("Error fetching task:", err);
      alert("Error fetching task");
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      await axios.patch(`/task/${editingCompanyId}/${taskId}`, updatedTask);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    let status = "success";
    let message = "Record was updated successfully.";
    try {
      await updateTask(editingTaskId, task);
      showAlert(status, message); // Assuming showAlert is defined somewhere
      fetchTasks();
      document.getElementById("editModal").close();
      resetForm();
    } catch (error) {
      console.error("Error updating task:", error);
      showAlert("error", "Failed to update record.");
    }
  };

  const resetForm = () => {
    setTask({
      status: "",
    });
  };

  const filteredTasks = async (selectedTab) => {
    setLoadingTable(true);
    let allTasks = await fetchAllTasks();
    try {
      switch (selectedTab) {
        case "My Tasks":
          let myTasks = allTasks.filter((task) =>
            task.assignee.includes(userSlice.slackId)
          );
          setFilteredTable(myTasks);
          break;
        case "Users Tasks":
          let userTasks = allTasks.filter(
            (task) => !task.assignee.includes(userSlice.slackId)
          );
          setFilteredTable(userTasks);
          break;
        default:
          setFilteredTable(allTasks);
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log(allTasks);
      setLoadingTable(false);
    }
  };

  useEffect(() => {
    if (userSlice.user_id) {
      filteredTasks(selectedTab);
    }
  }, [userSlice]);

  return (
    <>
      <div>
        <Breadcrumbs
          lists={[
            { goto: "/", text: "Home" },
            { goto: "/users-task", text: "Users Task" },
          ]}
        />
      </div>
      {/*edit modal*/}
      <dialog id="editModal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Update Status</h3>
          <form onSubmit={handleEditSubmit}>
            <div className="flex flex-row">
              <label className="form-control w-full max-w-xs mt-1">
                <div className="label">
                  <span className="label-text">Status</span>
                </div>
                <Select
                  name="status"
                  value={statusOptions.find(
                    (option) => option.value === task.status
                  )}
                  onChange={handleSelectChange}
                  menuPortalTarget={document.getElementById("editModal")}
                  options={statusOptions}
                />
              </label>
              <div className="flex flex-row justify-end mt-2">
                <button
                  className="btn btn-active btn-success mx-2 mt-6"
                  type="submit"
                >
                  Update
                </button>

                <div className="modal-action">
                  <button
                    className="btn"
                    type="button"
                    onClick={() => {
                      document.getElementById("editModal").close();
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </dialog>

      <div className="poppins-bold text-color-2 text-[24px] flex items-center">
        My Tasks
      </div>

      {/* <div className="m-1 bg-base-200 mt-2 z-0">
        <div className="text-xl  bg-[#FFFFFF] p-2 flex flex-row justify-between">
          <table className="table table-xs table-pin-rows table-pin-cols z-1">
            <thead>
              <tr>
                <td className="w-[10%]">Company</td>
                <td className="w-[20%]">Task</td>
                <td className="w-[10%]">Date Created</td>
                <td className="w-[10%]">Target Date</td>
                <td className="w-[10%]">Status</td>
                <td className="w-[10%]">Assignee</td>
                <td className="w-[10%]">Remarks</td>
                <td className="w-[10%]">Update Status</td>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <p>No tasks found for this assignee.</p>
              ) : (
                tasks.map((task) => (
                  <tr key={task.taskId}>
                    <td>{companyData[task.companyId] || "Loading..."}</td>
                    <td>{task.taskDescription}</td>
                    <td>{task.created_at}</td>
                    <td>{task.targetDate}</td>
                    <td>{task.status}</td>
                    <td>{task.assignee.join(", ")}</td>
                    <td>{task.remarks}</td>
                    <td className="flex justify-center">
                      <button
                        className="mx-1"
                        onClick={() => {
                          handleEdit(task.companyId, task.taskId);
                          document.getElementById("editModal").showModal();
                        }}
                      >
                        <svg
                          width="44"
                          height="37"
                          viewBox="0 0 44 37"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="44" height="37" rx="10" fill="#273069" />
                          <path
                            d="M15 26H30M22.6849 13.357L25.042 11L29.1667 15.1248L26.8097 17.4818M22.6849 13.357L18.0127 18.0292C17.8564 18.1855 17.7686 18.3975 17.7686 18.6185V22.398H21.5483C21.7693 22.398 21.9812 22.3103 22.1375 22.154L26.8097 17.4818M22.6849 13.357L26.8097 17.4818"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div> */}

      <div className="flex flex-col gap-5 rounded-lg p-5 bg-white mt-5">
        <div className="flex flex-row items-end gap-2">
          <div className="w-full  max-w-lg">
            <label className="input input-bordered input-sm flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <input type="text" className="grow" placeholder="Search" />
            </label>
          </div>
          <div
            className={`w-full flex flex-row items-end gap-1 ${
              userSlice.permissions.includes("View Users Tasks") ? "" : "hidden"
            }`}
          >
            <div
              className={`w-full text-center text-sm p-2 cursor-pointer hover:border-b-2 hover:border-black ${
                selectedTab == "All" && "border-b-2 border-black"
              }`}
              onClick={() => {
                if (selectedTab != "All") {
                  filteredTasks("All");
                }
                setSelectedTab("All");
              }}
            >
              All
            </div>
            <div
              className={`w-full text-center text-sm p-2 cursor-pointer hover:border-b-2 hover:border-black ${
                selectedTab == "My Tasks" && "border-b-2 border-black"
              }`}
              onClick={() => {
                if (selectedTab != "My Tasks") {
                  filteredTasks("My Tasks");
                }
                setSelectedTab("My Tasks");
              }}
            >
              My Tasks
            </div>
            <div
              className={`w-full text-center text-sm p-2 cursor-pointer hover:border-b-2 hover:border-black ${
                selectedTab == "User Tasks" && "border-b-2 border-black"
              }`}
              onClick={() => {
                if (selectedTab != "User Tasks") {
                  filteredTasks("User Tasks");
                }
                setSelectedTab("User Tasks");
              }}
            >
              User Tasks
            </div>
          </div>
        </div>
        <div className="">
          <DataTable
            columns={columns}
            data={filteredTable}
            progressPending={loadingTable}
          ></DataTable>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
