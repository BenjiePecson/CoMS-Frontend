import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";


const Tasks = () => {
  const { companyId } = useParams();
  const records = [];


  useEffect(() => {
  }, []);

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex flex-row w-full justify-between items-center mt-5">
        <div className="flex flex-row justify-between w-full">
          <div className="poppins-bold text-color-2 text-[24px] flex items-center">
            Tasks
          </div>
          <div>
            <button className="btn bg-primary text-white">
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
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">Test</div>
    </div>
  );
};

export default Tasks;
