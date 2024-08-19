import React, { useState, useEffect } from "react";
import Select from "react-select";
import options from "./workflow";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

const SubdataRow = ({
  subIndex,
  subdata,
  handleSubdataChange,
  removeSubdataRow,
}) => {
  return (
    <div key={subIndex} className="my-1 flex items-center">
      <input
        type="text"
        name="subTask"
        placeholder="Subtask"
        value={subdata.subTask}
        onChange={(event) => handleSubdataChange(event, subIndex)}
        className="input input-bordered input-xs w-full"
      />
      <input
        type="checkbox"
        name="subTaskStatus"
        checked={subdata.subTaskStatus}
        onChange={(event) => handleSubdataChange(event, subIndex)}
        style={{ display: "none" }}
      />
      <button
        type="button"
        className="mx-2"
        onClick={() => removeSubdataRow(subIndex)}
      >
        <div className="badge badge-error my-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

const DataRow = ({
  dataIndex,
  data,
  handleDataChange,
  handleSubdataChange,
  addSubdataRow,
  removeSubdataRow,
  removeDataRow,
  handleAssigneeChange,
  handleStatusChange,
  handleDateChange,
}) => {
  const [users, setUsers] = useState([]);
  // Fetch users from the API
  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.get("/users");
  //     // Transform user data into options format expected by react-select, excluding users with empty slackId

  //     // Filter users with empty slackId and log them
  //     // response.data.forEach((user) => {
  //     //   if (!user.slackId) {
  //     //     console.log(
  //     //       `User with empty slackId: ${user.first_name} ${user.last_name}`
  //     //     );
  //     //   }
  //     // });

  //     const usersOptions = response.data
  //       // .filter((user) => user.slackId) // Filter out users with empty slackId
  //       .map((user) => ({
  //         value: user.user_id,
  //         label: user.first_name + " " + user.last_name,
  //       }));

  //     setUsers(usersOptions);
  //   } catch (err) {
  //     setError(err);
  //   }
  // };

  // const assigneeOptions = users;
  //console.log("asdasdadsd", assigneeOptions);
  const assigneeOptions = [
    { value: "Michael Angelo", label: "Michael Angelo" },
    { value: "Benjie", label: "Benjie" },
    { value: "Marla", label: "Marla" },
  ];

  const statusOptions = [
    { value: "To Do", label: "To Do" },
    { value: "Draft", label: "Draft" },
    { value: "In Progress", label: "In Progress" },
    { value: "For Review", label: "For Review" },
    { value: "Approved", label: "Approved" },
    { value: "On Hold", label: "On Hold" },
    { value: "Done", label: "Done" },
  ];

  return (
    <div
      key={dataIndex}
      className="card card-compact bg-base-100 w-full shadow-xl my-3"
    >
      <div className="card-body">
        <div className="flex flex-row justify-between">
          <kbd className="kbd">{dataIndex + 1}</kbd>

          <button type="button" onClick={() => removeDataRow(dataIndex)}>
            <kbd className="kbd">
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
            </kbd>
          </button>
        </div>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Task Name</span>
          </div>
          <input
            type="text"
            name="taskName"
            className="input input-bordered input-sm w-full"
            value={data.taskName}
            onChange={(event) => handleDataChange(event, dataIndex)}
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Task Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            name="taskDescription"
            placeholder="Task Description"
            value={data.taskDescription}
            onChange={(event) => handleDataChange(event, dataIndex)}
          ></textarea>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Select Assignee</span>
          </div>
          <Select
            options={assigneeOptions}
            onChange={(selectedOptions) =>
              handleAssigneeChange(selectedOptions, dataIndex)
            }
            placeholder="Select Assignee"
            value={data.assignees.map((assignee) =>
              assigneeOptions.find((option) => option.value === assignee)
            )}
            isMulti
            closeMenuOnSelect={false}
          />
        </label>

        <div className="flex flex-row">
          <label className="form-control w-full mx-1">
            <div className="label">
              <span className="label-text">Status</span>
            </div>
            <Select
              options={statusOptions}
              onChange={(selectedOption) =>
                handleStatusChange(selectedOption, dataIndex)
              }
              placeholder="Select Status"
              value={{ value: data.status, label: data.status }}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Target Date</span>
            </div>
            <input
              className="input input-bordered input-sm w-full p-[18px]"
              type="date"
              name="targetDate"
              value={data.targetDate}
              onChange={(event) => handleDateChange(event, dataIndex)}
            />
          </label>
        </div>
        <div className="my-5">
          <div className="flex flex-row">
            {" "}
            <h4 className="font-bold font-sm mx-1">Sub Task:</h4>{" "}
            <button type="button" onClick={() => addSubdataRow(dataIndex)}>
              <div className="badge badge-primary badge-outline">
                Add SubTask
              </div>
            </button>
          </div>

          {data.subdata.map((subdata, subIndex) => (
            <SubdataRow
              key={subIndex}
              subIndex={subIndex}
              subdata={subdata}
              handleSubdataChange={(event, subIndex) =>
                handleSubdataChange(event, dataIndex, subIndex)
              }
              removeSubdataRow={(subIndex) =>
                removeSubdataRow(dataIndex, subIndex)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
const AddServiceAgreement = () => {
  const user = useSelector((state) => state.user.user);

  // Highlighted: Priority options for react-select
  const priorityOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];
  const [selectedData, setSelectedData] = useState([]);
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const [agreementName, setAgreementName] = useState("");
  const [googleFileLink, setGoogleFileLink] = useState("");
  const [workFlowName, setWorkFlowName] = useState("");

  const [priorityLevel, setPriorityLevel] = useState(null);

  const selectedCompany = useSelector((state) => state.company.selectedCompany);

  const { companyId } = useParams();

  const handleChange = (event) => {
    const selectedOption = options.find(
      (option) => option.value === event.target.value
    );
    if (selectedOption && selectedOption.value === "other") {
      setIsOtherSelected(true);
      setSelectedData([
        {
          taskName: "",
          taskDescription: "",
          assignees: [],
          status: "",
          targetDate: "",
          subdata: [{ subTask: "", subTaskStatus: false }],
          assignedBy: user.user_id, // Set assignedBy to current user
        },
      ]);
    } else {
      setIsOtherSelected(false);
      setWorkFlowName(selectedOption ? selectedOption.label : "");
      setSelectedData(
        selectedOption
          ? selectedOption.data.map((task) => ({
              ...task,
              assignedBy: user.user_id, // Set assignedBy to current user
            }))
          : []
      );
    }
  };

  const handleDataChange = (event, dataIndex) => {
    const { name, value } = event.target;
    const updatedData = selectedData.map((data, i) =>
      i === dataIndex ? { ...data, [name]: value } : data
    );
    setSelectedData(updatedData);
  };

  const handleSubdataChange = (event, dataIndex, subIndex) => {
    const { name, type, checked, value } = event.target;
    const updatedValue = type === "checkbox" ? checked : value;
    const updatedData = selectedData.map((data, i) => {
      if (i === dataIndex) {
        const updatedSubdata = data.subdata.map((subdata, j) =>
          j === subIndex ? { ...subdata, [name]: updatedValue } : subdata
        );
        return { ...data, subdata: updatedSubdata };
      }
      return data;
    });
    setSelectedData(updatedData);
  };

  const handleAssigneeChange = (selectedOptions, dataIndex) => {
    if (selectedOptions.length <= 2) {
      const assignees = selectedOptions.map((option) => option.value);
      const updatedData = selectedData.map((data, i) =>
        i === dataIndex ? { ...data, assignees } : data
      );
      setSelectedData(updatedData);
    }
  };

  // Highlighted: Handle priority level change
  const handlePriorityChange = (selectedOption) => {
    setPriorityLevel(selectedOption);
  };

  const handleStatusChange = (selectedOption, dataIndex) => {
    const status = selectedOption.value;
    const updatedData = selectedData.map((data, i) =>
      i === dataIndex ? { ...data, status } : data
    );
    setSelectedData(updatedData);
  };

  const handleDateChange = (event, dataIndex) => {
    const { value } = event.target;
    const updatedData = selectedData.map((data, i) =>
      i === dataIndex ? { ...data, targetDate: value } : data
    );
    setSelectedData(updatedData);
  };

  const addDataRow = () => {
    setSelectedData([
      ...selectedData,
      {
        taskName: "",
        taskDescription: "",
        assignees: [],
        status: "",
        targetDate: "",
        subdata: [],
        assignedBy: user.user_id, // Set assignedBy to current user
      },
    ]);
  };

  const addSubdataRow = (dataIndex) => {
    const updatedData = selectedData.map((data, i) => {
      if (i === dataIndex) {
        const updatedSubdata = [
          ...data.subdata,
          { subTask: "", subTaskStatus: false },
        ];
        return { ...data, subdata: updatedSubdata };
      }
      return data;
    });
    setSelectedData(updatedData);
  };

  const removeDataRow = (dataIndex) => {
    const updatedData = selectedData.filter((_, i) => i !== dataIndex);
    setSelectedData(updatedData);
  };

  const removeSubdataRow = (dataIndex, subIndex) => {
    const updatedData = selectedData.map((data, i) => {
      if (i === dataIndex) {
        const updatedSubdata = data.subdata.filter((_, j) => j !== subIndex);
        return { ...data, subdata: updatedSubdata };
      }
      return data;
    });
    setSelectedData(updatedData);
  };

  const addWorkFlow = (formData) => {
    return axios.post(`/workflow/${companyId}`, formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      workFlowName,
      agreementName,
      googleFileLink,
      data: selectedData,
      priorityLevel: priorityLevel ? priorityLevel.value : null, // Highlighted: Include priority level in form dataata,
    };

    try {
      console.log(formData);
      await addWorkFlow(formData);
      // setTasksList((prevTasks) => [...prevTasks, task]);
      // setGetAllWorkFlow({ ...getAllWorkFlow, formData });
      getAllWorkFlow;
    } catch (error) {
      console.log(error);
    } finally {
      document.getElementById("addAgreement").close();
    }
    // Send formData to your backend server here using fetch or axios
    console.log("Form Data Submitted: ", formData);
    logAssignees();
  };

  const logAssignees = () => {
    selectedData.forEach((data, dataIndex) => {
      console.log(`Task ${dataIndex + 1}: ${data.assignees.join(", ")}`);
    });
  };

  const [getWorkFlows, setGetAllWorkFlow] = useState([]);

  //get all task
  const getAllWorkFlow = () => {
    return axios.get(`/workflow/${companyId}`);
  };

  // Fetch workflows
  const fetchWorkflow = async () => {
    try {
      const response = await getAllWorkFlow();
      setGetAllWorkFlow(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Effect to fetch data on component mount
  useEffect(() => {
    fetchWorkflow();
  }, []);

  // Effect to log data when it changes
  useEffect(() => {
    console.log(getWorkFlows);
  }, [getWorkFlows]);

  return (
    <div>
      <div className="flex justify-end my-3">
        <button
          className="btn bg-primary text-white"
          onClick={() => {
            document.getElementById("addAgreement").showModal();
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
      </div>
      <dialog id="addAgreement" className="modal">
        <div className="modal-box w-1/2 max-w-5xl">
          <h3 className="text-lg font-bold">Add Service Agreement</h3>

          <label className="input input-bordered flex items-center gap-2 my-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6  mx-1 text-[#868686]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
              />
            </svg>

            <input
              type="text"
              name="agreementName"
              placeholder="Service Agreement"
              value={agreementName}
              className="grow"
              onChange={(event) => setAgreementName(event.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 my-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6  mx-1 text-[#868686]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
              />
            </svg>

            <input
              type="text"
              className="grow"
              name="googlFileLink"
              placeholder="Google Link"
              value={googleFileLink}
              onChange={(event) => setGoogleFileLink(event.target.value)}
            />
          </label>

          {/* Highlighted: Priority Level select input */}
          <label className="my-5">
            <span className="block text-sm font-medium mb-1">
              Priority Level
            </span>
            <Select
              options={priorityOptions} // Highlighted: Options for the priority level
              value={priorityLevel} // Highlighted: Current priority level
              onChange={handlePriorityChange} // Highlighted: Handler for priority level change
              placeholder="Select priority level"
            />
          </label>

          {/* <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Workflow Type</span>
                </div>
                <select
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select an option</option>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label> */}
          <form onSubmit={handleSubmit}>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Workflow Type</span>
              </div>
              <select
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select Workflow</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            {isOtherSelected && ( // Conditionally render Workflow Name input
              <div className="form-control w-full">
                <div className="label">
                  <span className="label-text">Workflow Name</span>
                </div>
                <input
                  type="text"
                  name="workFlowName"
                  className="input input-bordered w-full"
                  value={workFlowName}
                  onChange={(event) => setWorkFlowName(event.target.value)}
                />
              </div>
            )}

            {(isOtherSelected || selectedData.length > 0) && (
              <div>
                <div className="flex flex-row justify-between my-3">
                  <h3 className="my-3 font-bold">Task List:</h3>
                  <button type="button" onClick={addDataRow}>
                    <kbd className="kbd">Add Task</kbd>
                  </button>
                </div>

                {selectedData.map((data, dataIndex) => (
                  <DataRow
                    key={dataIndex}
                    dataIndex={dataIndex}
                    data={data}
                    handleDataChange={handleDataChange}
                    handleSubdataChange={handleSubdataChange}
                    handleAssigneeChange={handleAssigneeChange}
                    handleStatusChange={handleStatusChange}
                    handleDateChange={handleDateChange}
                    addSubdataRow={addSubdataRow}
                    removeSubdataRow={removeSubdataRow}
                    removeDataRow={removeDataRow}
                  />
                ))}
              </div>
            )}

            <div className="flex flex-row justify-end">
              <button className="btn btn-primary mt-6 mx-3" type="submit">
                Submit
              </button>
              <div className="modal-action">
                <button
                  className="btn"
                  type="button"
                  onClick={() => {
                    document.getElementById("addAgreement").close();
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
  );
};

export default AddServiceAgreement;
