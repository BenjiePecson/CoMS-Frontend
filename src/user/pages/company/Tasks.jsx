import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { showAlert } from "../../../assets/global";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useSelector } from "react-redux";
import axios from "axios";
import Accordions from "./TaskComponents/Accordions";
import AddServiceAgreement from "./TaskComponents/AddServiceAgreement";

const statusOptions = [
  { value: "To Do", label: "To Do" },
  { value: "Draft", label: "Draft" },
  { value: "In Progress", label: "In Progress" },
  { value: "For Review", label: "For Review" },
  { value: "Approved", label: "Approved" },
  { value: "On Hold", label: "On Hold" },
  { value: "Done", label: "Done" },
];

const items = [
  { id: 1, title: "Click to open this one and close others", content: "hello" },
];

const Tasks = () => {
  const { companyId } = useParams();
  const selectedCompany = useSelector((state) => state.company.selectedCompany);
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
          <AddServiceAgreement />
        </div>
      </div>
      <Accordions />
    </div>
  );
};

export default Tasks;
