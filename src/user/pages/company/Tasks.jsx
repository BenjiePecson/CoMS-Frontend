import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";

const statusOptions = [
  { value: "To Do", label: "To Do" },
  { value: "Draft", label: "Draft" },
  { value: "In Progress", label: "In Progress" },
  { value: "For Review", label: "For Review" },
  { value: "Approved", label: "Approved" },
  { value: "On Hold", label: "On Hold" },
  { value: "Done", label: "Done" },
];

const showAlert = (status, title) => {
  Swal.fire({
    icon: status,
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
};

const Tasks = () => {
  const { companyId } = useParams();

  //getl all

  const [serviceAgreements, setServiceAgreements] = useState([]);
  const [serviceAgreementDetails, setServiceAgreementDetails] = useState(null);
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [selectedAssignees, setSelectedAssignees] = useState({}); // To manage the selected assignees for each task

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/task/${companyId}`);
      setServiceAgreements(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //

  const records = [];
  const [users, setUsers] = useState([]);

  useEffect(() => {
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

    fetchUsers();
  }, []);

  const openDetails = async (agreementId) => {
    try {
      const response = await axios.get(`/task/${companyId}/${agreementId}`);
      setServiceAgreementDetails(response.data);
      setSelectedAgreement(agreementId);
      // Initialize selectedAssignees based on fetched data
      const initialSelectedAssignees = {};
      response.data.tasks.forEach((task, index) => {
        initialSelectedAssignees[index] = task.assignees.map((assignee) => {
          const parsedAssignee = JSON.parse(assignee.assigneeName);
          return {
            value: parsedAssignee.assigneeName,
            label: parsedAssignee.assigneeName,
          };
        });
      });
      setSelectedAssignees(initialSelectedAssignees);
    } catch (error) {
      console.error("Error fetching service agreement details:", error);
      // Handle error (e.g., show error message to the user)
    }
  };

  const handleAssigneeChange = (taskIndex, selectedOption) => {
    setSelectedAssignees((prev) => ({
      ...prev,
      [taskIndex]: selectedOption,
    }));
  };

  const assigneeOptions = users;

  const [formData, setFormData] = useState({
    agreementName: "",

    fileLink: "",
    tasks: [
      {
        task: "",
        targetDate: "",
        status: "",
        assignees: [],
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTaskChange = (index, e) => {
    const { name, value } = e.target;
    const tasks = [...formData.tasks];
    tasks[index][name] = value;
    setFormData({ ...formData, tasks });
  };

  const handleStatusChange = (index, selectedOption) => {
    const tasks = [...formData.tasks];
    tasks[index].status = selectedOption.value;
    setFormData({ ...formData, tasks });
  };

  const handleAssigneesChange = (index, selectedOptions) => {
    const tasks = [...formData.tasks];
    tasks[index].assignees = selectedOptions;
    setFormData({ ...formData, tasks });
  };

  const addTask = () => {
    setFormData({
      ...formData,
      tasks: [
        ...formData.tasks,
        { task: "", targetDate: "", status: "", assignees: [] },
      ],
    });
  };

  const removeTask = (index) => {
    const tasks = [...formData.tasks];
    tasks.splice(index, 1);
    setFormData({ ...formData, tasks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      tasks: formData.tasks.map((task) => ({
        ...task,
        assignees: task.assignees.map((assignee) => ({
          assigneeName: assignee.value,
        })),
      })),
    };

    try {
      console.log(formattedData);
      await axios.post(`/task/${companyId}`, formattedData);

      Swal.fire({
        title: "Success!",
        text: "Service Agreement submitted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
      fetchData();
    } catch (error) {
      console.error("Error submitting data", error);

      Swal.fire({
        title: "Error!",
        text: "Failed to submit Service Agreement",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDelete = (id) => {
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
          await axios.delete(`/task/${companyId}/${id}`);
          Swal.fire(
            "Deleted!",
            "Your service agreement has been deleted.",
            "success"
          );
          fetchData(); // Refresh the list after deletion
        } catch (error) {
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

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      // await axios.put(
      //   `/serviceAgreement/${selectedServiceAgreementId}`,
      //   formData
      // )
      Swal.fire({
        title: "Success!",
        text: "Service Agreement updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        document.getElementById("editModal").close();
      });
    } catch (error) {
      console.error("Error submitting data", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update Service Agreement",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <div className="flex flex-row w-full justify-between items-center mt-5">
        <div className="flex flex-row justify-between w-full">
          <div className="poppins-bold text-color-2 text-[24px] flex items-center">
            Tasks
          </div>
          <div>
            {/* The button to open modal */}
            <label htmlFor="my_modal_7" className="btn bg-primary text-white">
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
            </label>

            {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
              <div className="modal-box w-11/12 h-[85%] max-w-5xl">
                <h3 className="font-bold text-lg">Service Agreement Form</h3>

                <form onSubmit={handleSubmit}>
                  <div className="flex flex-row">
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="label-text">Agreement Name</span>
                      </div>
                      <input
                        type="text"
                        name="agreementName"
                        value={formData.agreementName}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full max-w-xs"
                      />
                    </label>
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="label-text">File Link</span>
                      </div>
                      <input
                        type="text"
                        name="fileLink"
                        value={formData.fileLink}
                        onChange={handleChange}
                        required
                        className="input input-bordered mx-2 w-full max-w-xs"
                      />
                    </label>
                  </div>

                  <div className="flex flex-row justify-between">
                    {" "}
                    <h3 className="font-bold text-lg my-5">
                      List of Tasks
                    </h3>{" "}
                    <button
                      className="btn btn-outline btn-primary my-3"
                      type="button"
                      onClick={addTask}
                    >
                      Add Task
                    </button>
                  </div>

                  {formData.tasks.map((task, index) => (
                    <div key={index} className="">
                      <div className="flex flex-row">
                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Task Description</span>
                          </div>
                          <input
                            type="text"
                            name="task"
                            value={task.task}
                            onChange={(e) => handleTaskChange(index, e)}
                            required
                            className="input input-bordered mx-2 w-full max-w-xs"
                          />
                        </label>
                        <label className="form-control mx-2 w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Target Date</span>
                          </div>
                          <input
                            type="date"
                            name="targetDate"
                            value={task.targetDate}
                            onChange={(e) => handleTaskChange(index, e)}
                            required
                            className="input input-bordered mx-2 w-full max-w-xs"
                          />
                        </label>
                        <label className="form-control mt-1 mx-2 w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Status</span>
                          </div>

                          <Select
                            options={statusOptions}
                            value={statusOptions.find(
                              (option) => option.value === task.status
                            )}
                            onChange={(selectedOption) =>
                              handleStatusChange(index, selectedOption)
                            }
                            required
                          />
                        </label>
                        <label className="form-control mt-1 mx-2 w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Assignee</span>
                          </div>
                          <Select
                            styles={{
                              zIndex: 2,
                            }}
                            isMulti
                            options={assigneeOptions}
                            value={task.assignees}
                            onChange={(selectedOptions) =>
                              handleAssigneesChange(index, selectedOptions)
                            }
                          />
                        </label>
                        <button
                          className="btn btn-outline btn-error btn-sm mt-[42px]"
                          type="button"
                          onClick={() => removeTask(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="flex flex-row">
                        {/* <label>Status</label>
                        <input
                          type="text"
                          name="status"
                          value={task.status}
                          onChange={(e) => handleTaskChange(index, e)}
                          required
                        /> */}
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-center my-5">
                    {" "}
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <label className="modal-backdrop" htmlFor="my_modal_7">
                Close
              </label>
            </div>

            {/* edit */}

            <dialog className="modal" role="dialog" id="editModal">
              <div className="modal-box w-11/12 h-[85%] max-w-5xl">
                <h3 className="font-bold text-lg">
                  Edit Service Agreement Form
                </h3>
                {serviceAgreementDetails && (
                  <form onSubmit={handleEditSubmit}>
                    <div className="flex flex-row">
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">Agreement Name</span>
                        </div>
                        <input
                          type="text"
                          name="agreementName"
                          value={serviceAgreementDetails.agreementName || ""}
                          onChange={handleChange}
                          required
                          className="input input-bordered w-full max-w-xs"
                        />
                      </label>
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">File Link</span>
                        </div>
                        <input
                          type="text"
                          name="fileLink"
                          value={serviceAgreementDetails.fileLink || ""}
                          onChange={handleChange}
                          required
                          className="input input-bordered mx-2 w-full max-w-xs"
                        />
                      </label>
                    </div>

                    <div className="flex flex-row justify-between">
                      {" "}
                      <h3 className="font-bold text-lg my-5">
                        List of Tasks
                      </h3>{" "}
                      <button
                        className="btn btn-outline btn-primary my-3"
                        type="button"
                        onClick={addTask}
                      >
                        Add Task
                      </button>
                    </div>

                    {serviceAgreementDetails.tasks.map((task, index) => (
                      <div key={index} className="">
                        <div className="flex flex-row">
                          <label className="form-control w-full max-w-xs">
                            <div className="label">
                              <span className="label-text">
                                Task Description
                              </span>
                            </div>
                            <input
                              type="text"
                              name="task"
                              value={task.task}
                              onChange={(e) => handleTaskChange(index, e)}
                              required
                              className="input input-bordered mx-2 w-full max-w-xs"
                            />
                          </label>
                          <label className="form-control mx-2 w-full max-w-xs">
                            <div className="label">
                              <span className="label-text">Target Date</span>
                            </div>
                            <input
                              type="date"
                              name="targetDate"
                              value={task.targetDate}
                              onChange={(e) => handleTaskChange(index, e)}
                              required
                              className="input input-bordered mx-2 w-full max-w-xs"
                            />
                          </label>
                          <label className="form-control mt-1 mx-2 w-full max-w-xs">
                            <div className="label">
                              <span className="label-text">Status</span>
                            </div>

                            <Select
                              options={statusOptions}
                              value={statusOptions.find(
                                (option) => option.value === task.status
                              )}
                              onChange={(selectedOption) =>
                                handleStatusChange(index, selectedOption)
                              }
                              required
                            />
                          </label>
                          <label className="form-control mt-1 mx-2 w-full max-w-xs">
                            <div className="label">
                              <span className="label-text">Assignee</span>
                            </div>
                            <Select
                              styles={{
                                zIndex: 2,
                              }}
                              options={task.assignees.map((assignee) => {
                                const parsedAssignee = JSON.parse(
                                  assignee.assigneeName
                                );
                                return {
                                  value: parsedAssignee.assigneeName,
                                  label: parsedAssignee.assigneeName,
                                };
                              })}
                              value={selectedAssignees[index]}
                              onChange={(selectedOption) =>
                                handleAssigneeChange(index, selectedOption)
                              }
                              isMulti
                            />
                          </label>
                          <button
                            className="btn btn-outline btn-error btn-sm mt-[42px]"
                            type="button"
                            onClick={() => removeTask(index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="flex flex-row">
                          {/* <label>Status</label>
                        <input
                          type="text"
                          name="status"
                          value={task.status}
                          onChange={(e) => handleTaskChange(index, e)}
                          required
                        /> */}
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-center my-5">
                      {" "}
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
                      <div className="modal-action mx-3 mb-6">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </dialog>
          </div>
        </div>
      </div>

      {serviceAgreements.map((agreement, index) => (
        <div key={index} className="bg-base-200 mt-2 z-0">
          <div className="text-xl font-semibold bg-[#FFFFFF] p-2 flex flex-row justify-between">
            <div className="flex flex-row">
              <a href={agreement.fileLink} className="flex flex-row">
                {agreement.agreementName}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 ml-1 mt-1"
                >
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path
                    fillRule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 ml-1"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex flex-row">
              <button
                className="mx-1"
                onClick={() => {
                  openDetails(agreement.serviceAgreementId);
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
              {/* delete button */}
              <button
                className="mx-1"
                onClick={() => {
                  handleDelete(agreement.serviceAgreementId);
                }}
              >
                <svg
                  width="44"
                  height="37"
                  viewBox="0 0 44 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="44" height="37" rx="10" fill="#CF0404" />
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
          </div>
          <div className="m-1">
            <div className="">
              <table className="table table-xs table-pin-rows table-pin-cols z-0">
                <thead>
                  <tr>
                    <td className="w-[25%]">TASK</td>
                    <td className="w-[25%]">TARGET DATE</td>
                    <td className="w-[25%]">STATUS</td>
                    <td className="w-[25%]">ASSIGNEE</td>
                  </tr>
                </thead>
                <tbody>
                  {agreement.tasks.map((task, taskIndex) => (
                    <tr key={taskIndex}>
                      <td>{task.task}</td>
                      <td>{task.targetDate}</td>
                      <td>
                        {" "}
                        <Select
                          options={statusOptions}
                          value={statusOptions.find(
                            (option) => option.value === task.status
                          )}
                          onChange={(selectedOption) =>
                            handleStatusChange(index, selectedOption)
                          }
                          required
                        />
                      </td>
                      <td>
                        {task.assignees.map((assignee, assigneeIndex) => (
                          <div key={assigneeIndex} className="flex flex-col">
                            <button className="btn btn-outline btn-sm m-1">
                              {JSON.parse(assignee.assigneeName).assigneeName}
                            </button>
                          </div>
                        ))}
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
