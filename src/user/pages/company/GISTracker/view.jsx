import React from "react";
import { useNavigate } from "react-router-dom";

const view = () => {
  const navigate = useNavigate();
  return (
    <div>
      View GIS
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back
      </button>
      
    </div>
  );
};

export default view;
