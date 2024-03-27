import React from "react";
import { useNavigate } from "react-router-dom";

const create = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      Create New GIS
      <div>
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default create;
