import React from "react";

const TaskActivityTable = () => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <td>Date</td>
              <td>Description</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>09/24/2024</td>
              <td>A new Task has been added</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TaskActivityTable;
