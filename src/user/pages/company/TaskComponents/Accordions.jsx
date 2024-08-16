import gdriveIcon from "/gdrive.svg";
import TaskCard from "./TaskCard";
import ServiceAgreementInfo from "./ServiceAgreementInfo";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

// const AccordionItem = ({ id, title, content, isOpen, toggleOpen }) => {
const AccordionItem = ({
  id,
  agreementName,
  workFlowName,
  googleFileLink,
  isOpen,
  toggleOpen,
  tasks,
}) => {
  return (
    <div className="collapse collapse-arrow join-item bg-base-200">
      <input type="checkbox" checked={isOpen} onChange={() => toggleOpen(id)} />
      <div
        className="collapse-title text-xl font-semibold bg-[#FFFFFF] p-2 border flex flex-row"
        onClick={() => toggleOpen(id)}
      >
        <h1 className="mt-2">{agreementName}</h1>
      </div>
      {isOpen && (
        <div className="collapse-content flex flex-col">
          <ServiceAgreementInfo
            agreementName={agreementName}
            workFlowName={workFlowName}
            googleFileLink={googleFileLink}
          />
          {/* <div className="flex flex-col lg:flex-row">
            <TaskCard content={content} />
            <TaskCard content={content} />
            <TaskCard content={content} />
          </div> */}

          <div className="flex flex-col lg:flex-row">
            {tasks.map((task) => (
              <TaskCard
                key={task.taskId}
                taskId={task.taskId}
                taskName={task.taskName}
                taskDescription={task.taskDescription}
                targetDate={task.targetDate}
                status={task.status}
                assignee={task.assignee}
                assignedByName={task.assignedByName}
                subTasks={task.subTasks}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Accordions = () => {
  const [getWorkFlows, setGetAllWorkFlow] = useState([]);

  const { companyId } = useParams();

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

  //Effect to log data when it changes
  useEffect(() => {
    console.log(getWorkFlows);
    console.log("Accordion");
  }, [getWorkFlows]);

  const [openItems, setOpenItems] = useState([]);

  const toggleOpen = (id) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(id)
        ? prevOpenItems.filter((itemId) => itemId !== id)
        : [...prevOpenItems, id]
    );
  };

  return (
    <div className="join join-vertical w-full">
      {getWorkFlows.map((workflow) => (
        <AccordionItem
          key={workflow.workFlowId}
          agreementName={workflow.agreementName}
          id={workflow.workFlowId}
          workFlowName={workflow.workFlowName}
          googleFileLink={workflow.googleFileLink}
          tasks={workflow.tasks}
          // title={item.title}
          // content={item.content}
          isOpen={openItems.includes(workflow.workFlowId)}
          toggleOpen={toggleOpen}
        />
      ))}
    </div>
  );
};

export default Accordions;
