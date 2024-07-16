import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import gdriveIcon from "/gdrive.svg";
import { showAlert } from "../../../assets/global";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useSelector } from "react-redux";

const customStyles = {
  zIndex: 99,
};

const statusOptions = [
  { value: "To Do", label: "To Do" },
  { value: "Draft", label: "Draft" },
  { value: "In Progress", label: "In Progress" },
  { value: "For Review", label: "For Review" },
  { value: "Approved", label: "Approved" },
  { value: "On Hold", label: "On Hold" },
  { value: "Done", label: "Done" },
];

const serviceAgreementOptions = [
  { value: "qwert", label: "qwert" },
  { value: "asdfg", label: "asdfg" },
  { value: "zxcvb", label: "zxcvb" },
];

// const assigneeOptions = [
//   { value: "Michael Angelo", label: "Michael Angelo" },
//   { value: "Leonardo da Vinci", label: "Leonardo da Vinci" },
//   { value: "Pablo Picasso", label: "Pablo Picasso" },
// ];

const Tasks = () => {
  const [loading, setLoading] = useState(false);

  const selectedCompany = useSelector((state) => state.company.selectedCompany);

  const { companyId } = useParams();

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
    } catch (err) {
      setError(err);
    }
  };

  const assigneeOptions = users;

  const addTask = (task) => {
    return axios.post(`/task/${companyId}`, task);
  };
  const [tasksList, setTasksList] = useState([]);

  const [task, setTask] = useState({
    taskDescription: "",
    targetDate: "",
    serviceAgreement: "",
    serviceAgreementFileLink: "",
    status: "",
    remarks: "",
    assignee: [],
  });

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

  const handleAddSubmit = async (e) => {
    let status = "success";
    let message = "Record was added successfully.";
    e.preventDefault();
    try {
      await addTask(task);

      // setTasksList((prevTasks) => [...prevTasks, task]);
    } catch (error) {
      console.log(error);
    } finally {
      showAlert(status, message);
      document.getElementById("addModal").close();
      fetchTasks();
    }
  };

  //delete task
  const deleteTask = (id) => {
    return axios.delete(`/task/${companyId}/${id}`);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTask(id);
          Swal.fire(
            "Deleted!",
            "Your service agreement has been deleted.",
            "success"
          );
          fetchTasks(); // Refresh the list after deletion
        } catch (error) {
          console.log(error);
          Swal.fire(
            "Error!",
            "There was an error deleting the service agreement.",
            "error"
          );
          console.error("Error deleting service agreement", error);
        }
      }
    });
  };
  //get task
  const [editingTaskId, setEditingTaskId] = useState(null);
  const getTask = (id) => {
    return axios.get(`/task/${companyId}/${id}`);
  };

  const handleEdit = async (taskId) => {
    try {
      const response = await getTask(taskId);
      const taskData = response.data;
      console.log(taskData);
      setTask(taskData);
      setEditingTaskId(taskId);
    } catch (err) {
      console.error("Error fetching task:", err);
      alert("Error fetching task");
    }
  };

  //edit patch task

  const updateTask = (taskId, updatedTask) => {
    return axios.patch(`/task/${companyId}/${taskId}`, updatedTask);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    let status = "success";
    let message = "Record was updated successfully.";
    try {
      await updateTask(editingTaskId, task);
    } catch (error) {
      console.log(error);
    } finally {
      showAlert(status, message);
      document.getElementById("editModal").close();
      fetchTasks();
      resetForm();
    }
  };

  const resetForm = () => {
    setTask({
      taskDescription: "",
      targetDate: "",
      serviceAgreement: "",
      serviceAgreementFileLink: "",
      status: "",
      remarks: "",
      assignee: [],
    });
  };

  //get all task

  const getAllTasks = () => {
    return axios.get(`/task/${companyId}`);
  };
  const fetchTasks = async () => {
    try {
      const response = await getAllTasks();
      setTasksList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  function mapTasksByAgreement(tasksList) {
    const mappedTasks = {};

    tasksList.forEach((task) => {
      const key = `${task.serviceAgreement}_${task.serviceAgreementFileLink}`;

      if (!mappedTasks[key]) {
        mappedTasks[key] = {
          serviceAgreement: task.serviceAgreement,
          serviceAgreementFileLink: task.serviceAgreementFileLink,
          tasksList: [],
        };
      }

      mappedTasks[key].tasksList.push(task);
    });

    return Object.values(mappedTasks);
  }

  const mappedTasks = mapTasksByAgreement(tasksList);
  console.log(mappedTasks);

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

      <div className="flex flex-row w-full justify-between items-center mt-5">
        <div className="flex flex-row justify-between w-full">
          <div className="poppins-bold text-color-2 text-[24px] flex items-center">
            Tasks
          </div>
          <div>
            {/* The button to open modal */}

            <button
              className="btn bg-primary text-white"
              onClick={() => {
                document.getElementById("addServiceAgreement").showModal();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
              Add Service Agreement
            </button>

            {/* add service agreement*/}

            <dialog id="addServiceAgreement" className="modal">
              <div className="modal-box w-1/2 max-w-5xl">
                <h3 className="text-lg font-bold">Add Service Agreement</h3>
                <form onSubmit={handleAddSubmit}>
                  <div className="flex flex-row">
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="label-text">Service Agreement</span>
                      </div>
                      <input
                        type="text"
                        name="serviceAgreement"
                        value={task.serviceAgreement}
                        onChange={handleTaskAddChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </label>
                    <label className="form-control w-full mx-2 max-w-xs">
                      <div className="label">
                        <span className="label-text">File Link</span>
                      </div>
                      <input
                        type="text"
                        name="serviceAgreementFileLink"
                        value={task.serviceAgreementFileLink}
                        onChange={handleTaskAddChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </label>
                  </div>

                  <div className="flex flex-row">
                    <label className="form-control w-full max-w-xs mr-2">
                      <div className="label">
                        <span className="label-text">Target Date</span>
                      </div>
                      <input
                        type="date"
                        name="targetDate"
                        value={task.targetDate}
                        onChange={handleTaskAddChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </label>

                    <label className="form-control w-full max-w-xs mt-1">
                      <div className="label">
                        <span className="label-text">Status</span>
                      </div>
                      <Select
                        name="status"
                        value={statusOptions.find(
                          (option) => option.value === task.status
                        )}
                        menuPortalTarget={document.getElementById(
                          "addServiceAgreement"
                        )}
                        onChange={handleSelectChange}
                        options={statusOptions}
                      />
                    </label>
                  </div>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Assignee</span>
                    </div>
                    <Select
                      styles={customStyles}
                      isMulti
                      name="assignee"
                      value={assigneeOptions.filter((option) =>
                        task.assignee.includes(option.value)
                      )}
                      menuPortalTarget={document.getElementById(
                        "addServiceAgreement"
                      )}
                      onChange={handleMultiSelectChange}
                      options={assigneeOptions}
                    />
                  </label>
                  <div className="flex flex-row ">
                    <label className="form-control w-full max-w-xs mr-2">
                      <div className="label">
                        <span className="label-text">Task</span>
                      </div>
                      <input
                        type="text"
                        name="taskDescription"
                        value={task.taskDescription}
                        onChange={handleTaskAddChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </label>
                    <label className="form-control w-full max-w-xs mr-2">
                      <div className="label">
                        <span className="label-text">Remarks</span>
                      </div>
                      <input
                        type="text"
                        name="remarks"
                        value={task.remarks}
                        onChange={handleTaskAddChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </label>
                  </div>

                  <div className="flex flex-row justify-end">
                    <button
                      className="btn btn-active btn-primary mx-2 mt-6"
                      type="submit"
                    >
                      Submit
                    </button>

                    <div className="modal-action">
                      <button
                        className="btn"
                        type="button"
                        onClick={() => {
                          document
                            .getElementById("addServiceAgreement")
                            .close();
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </dialog>

            {/*edit modal*/}
            <dialog id="editModal" className="modal">
              <div className="modal-box w-1/2 max-w-5xl">
                <h3 className="text-lg font-bold">Add Task</h3>
                <form onSubmit={handleEditSubmit}>
                  <div className="flex flex-row">
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="label-text">Service Agreement</span>
                      </div>
                      <input
                        type="text"
                        name="serviceAgreement"
                        value={task.serviceAgreement}
                        onChange={handleTaskAddChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </label>
                    <label className="form-control w-full mx-2 max-w-xs">
                      <div className="label">
                        <span className="label-text">File Link</span>
                      </div>
                      <input
                        type="text"
                        name="serviceAgreementFileLink"
                        value={task.serviceAgreementFileLink}
                        onChange={handleTaskAddChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </label>
                  </div>

                  <div className="flex flex-row">
                    <label className="form-control w-full max-w-xs mr-2">
                      <div className="label">
                        <span className="label-text">Target Date</span>
                      </div>
                      <input
                        type="date"
                        name="targetDate"
                        value={task.targetDate}
                        onChange={handleTaskAddChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </label>

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
                  </div>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Assignee</span>
                    </div>
                    <Select
                      styles={customStyles}
                      isMulti
                      name="assignee"
                      value={assigneeOptions.filter((option) =>
                        task.assignee.includes(option.value)
                      )}
                      menuPortalTarget={document.getElementById("editModal")}
                      onChange={handleMultiSelectChange}
                      options={assigneeOptions}
                    />
                  </label>
                  <div className="flex flex-row ">
                    <label className="form-control w-full max-w-xs mr-2">
                      <div className="label">
                        <span className="label-text">Task</span>
                      </div>
                      <input
                        type="text"
                        name="taskDescription"
                        value={task.taskDescription}
                        onChange={handleTaskAddChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </label>
                    <label className="form-control w-full max-w-xs mr-2">
                      <div className="label">
                        <span className="label-text">Remarks</span>
                      </div>
                      <input
                        type="text"
                        name="remarks"
                        value={task.remarks}
                        onChange={handleTaskAddChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </label>
                  </div>

                  <div className="flex flex-row justify-end">
                    <button
                      className="btn btn-active btn-primary mx-2 mt-6"
                      type="submit"
                    >
                      Submit
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
                </form>
              </div>
            </dialog>
          </div>
        </div>
      </div>
      {mappedTasks.map((item, index) => (
        <div key={index} className="bg-base-200 mt-2 z-0">
          <div className="text-xl font-semibold bg-[#FFFFFF] p-2 flex flex-row justify-between">
            <div className="flex flex-row">
              <a
                href={item.serviceAgreementFileLink}
                className="flex flex-row mt-2"
              >
                {item.serviceAgreement}
              </a>
              <img className="" src={gdriveIcon} />
            </div>
            <button
              className="btn btn-outline btn-primary"
              onClick={() => {
                document.getElementById("addTask").showModal();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
              Add Task
            </button>
            <dialog id="addTask" className="modal">
              <div className="modal-box w-1/2 max-w-5xl">
                <h3 className="text-lg font-bold">Add Task</h3>
                <form onSubmit={handleAddSubmit}>
                  <div className="flex flex-row">
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="label-text">Service Agreement</span>
                      </div>
                      <input
                        type="text"
                        name="serviceAgreement"
                        value={item.serviceAgreement}
                        onChange={handleTaskAddChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                        disabled
                      />
                    </label>
                    <label className="form-control w-full mx-2 max-w-xs">
                      <div className="label">
                        <span className="label-text">File Link</span>
                      </div>
                      <input
                        type="text"
                        name="serviceAgreementFileLink"
                        value={item.serviceAgreementFileLink}
                        onChange={handleTaskAddChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                        disabled
                      />
                    </label>
                  </div>

                  <div className="flex flex-row">
                    <label className="form-control w-full max-w-xs mr-2">
                      <div className="label">
                        <span className="label-text">Target Date</span>
                      </div>
                      <input
                        type="date"
                        name="targetDate"
                        value={task.targetDate}
                        onChange={handleTaskAddChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </label>

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
                        options={statusOptions}
                      />
                    </label>
                  </div>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Assignee</span>
                    </div>
                    <Select
                      styles={customStyles}
                      isMulti
                      name="assignee"
                      value={assigneeOptions.filter((option) =>
                        task.assignee.includes(option.value)
                      )}
                      onChange={handleMultiSelectChange}
                      options={assigneeOptions}
                    />
                  </label>
                  <div className="flex flex-row ">
                    <label className="form-control w-full max-w-xs mr-2">
                      <div className="label">
                        <span className="label-text">Task</span>
                      </div>
                      <input
                        type="text"
                        name="taskDescription"
                        value={task.taskDescription}
                        onChange={handleTaskAddChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </label>
                    <label className="form-control w-full max-w-xs mr-2">
                      <div className="label">
                        <span className="label-text">Remarks</span>
                      </div>
                      <input
                        type="text"
                        name="remarks"
                        value={task.remarks}
                        onChange={handleTaskAddChange}
                        className="input input-bordered w-full max-w-xs"
                        required
                      />
                    </label>
                  </div>

                  <div className="flex flex-row justify-end">
                    <button
                      className="btn btn-active btn-primary mx-2 mt-6"
                      type="submit"
                    >
                      Submit
                    </button>

                    <div className="modal-action">
                      <button
                        className="btn"
                        type="button"
                        onClick={() => {
                          document.getElementById("addTask").close();
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </dialog>
          </div>
          <div className="m-1">
            <div className="">
              <table className="table table-xs table-pin-rows table-pin-cols z-1">
                <thead>
                  <tr>
                    <td className="w-[25%]">TASK</td>
                    <td className="w-[11%]">DATE CREATED</td>
                    <td className="w-[11%]">TARGET DATE</td>
                    <td className="w-[20%]">STATUS</td>
                    <td className="w-[11%]">ASSIGNEE</td>
                    <td className="w-[11%]">REMARKS</td>
                    <td className="w-[11%]"></td>
                  </tr>
                </thead>
                <tbody>
                  {item.tasksList.map((task) => (
                    <tr key={task.taskId}>
                      <td>{task.taskDescription}</td>
                      <td>{task.created_at}</td>
                      <td>{task.targetDate}</td>
                      <td>
                        <Select
                          styles={{
                            zIndex: 1,
                          }}
                          options={statusOptions}
                          value={statusOptions.find(
                            (option) => option.value === task.status
                          )}
                          isDisabled
                        />
                      </td>
                      <td>{task.assignee.join(", ")}</td>
                      <td>{task.remarks}</td>
                      <td>
                        <div className="flex flex-row">
                          <button
                            className="mx-1"
                            onClick={() => {
                              handleEdit(task.taskId);
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
                              <rect
                                width="44"
                                height="37"
                                rx="10"
                                fill="#273069"
                              />
                              <path
                                d="M15 26H30M22.6849 13.357L25.042 11L29.1667 15.1248L26.8097 17.4818M22.6849 13.357L18.0127 18.0292C17.8564 18.1855 17.7686 18.3975 17.7686 18.6185V22.398H21.5483C21.7693 22.398 21.9812 22.3103 22.1375 22.154L26.8097 17.4818M22.6849 13.357L26.8097 17.4818"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          {/* delete button */}
                          <button
                            className="mx-1"
                            onClick={() => handleDelete(task.taskId)}
                          >
                            <svg
                              width="44"
                              height="37"
                              viewBox="0 0 44 37"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="44"
                                height="37"
                                rx="10"
                                fill="#CF0404"
                              />
                              <path
                                d="M28.3333 17.667V25.5003C28.3333 25.7765 28.1095 26.0003 27.8333 26.0003H17.1667C16.8905 26.0003 16.6667 25.7765 16.6667 25.5003V17.667M20.8333 22.667V17.667M24.1667 22.667V17.667M30 14.3333H25.8333M25.8333 14.3333V11.5C25.8333 11.2239 25.6095 11 25.3333 11H19.6667C19.3905 11 19.1667 11.2239 19.1667 11.5V14.3333M25.8333 14.3333H19.1667M15 14.3333H19.1667"
                                stroke="white"
                                strokeWidth="1.95694"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="divider"></div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
