import React, { useState, useRef, useEffect } from "react";

const Subtask = ({ initialSubtasks }) => {
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtaskName, setNewSubtaskName] = useState("");
  const labelRefs = useRef([]);

  useEffect(() => {
    setSubtasks(initialSubtasks);
    labelRefs.current = initialSubtasks.map(() => React.createRef());
  }, [initialSubtasks]);

  const handleClick = (index) => {
    const newSubtasks = subtasks.map((subtask, i) =>
      i === index
        ? { ...subtask, subTaskStatus: !subtask.subTaskStatus }
        : subtask
    );

    if (newSubtasks[index].subTaskStatus) {
      labelRefs.current[index].style.textDecoration = "line-through";
    } else {
      labelRefs.current[index].style.textDecoration = "none";
    }

    setSubtasks(newSubtasks);
  };

  const handleInputChange = (e) => {
    setNewSubtaskName(e.target.value);
  };

  const handleAddSubtask = () => {
    if (newSubtaskName.trim() === "") return; // Avoid adding empty subtasks

    const newSubtaskObj = {
      subTaskId: new Date().toISOString(), // Generate a unique ID
      subTaskName: newSubtaskName,
      subTaskStatus: false,
      taskId: "", // Set the taskId if needed
    };
    setSubtasks([...subtasks, newSubtaskObj]);
    setNewSubtaskName("");
    labelRefs.current.push(React.createRef());
  };

  return (
    <div>
      <h2 className="font-medium text-md">Subtask List</h2>
      {subtasks.map((subtask, index) => (
        <div key={subtask.subTaskId}>
          <input
            type="checkbox"
            id={`subtask-func-${index}`}
            name={`subtask-func-${index}`}
            checked={subtask.subTaskStatus}
            onChange={() => handleClick(index)}
            className="mr-3"
          />
          <label
            ref={(el) => (labelRefs.current[index] = el)}
            htmlFor={`subtask-func-${index}`}
          >
            {subtask.subTaskName}
          </label>
        </div>
      ))}
      <div className="flex flex-row">
        <input
          type="text"
          value={newSubtaskName}
          onChange={handleInputChange}
          placeholder="New subtask"
          className="input input-bordered input-xs w-full max-w-xs"
        />
        <button className="btn btn-xs mx-1" onClick={handleAddSubtask}>
          Add Subtask
        </button>
      </div>
    </div>
  );
};

export default Subtask;
