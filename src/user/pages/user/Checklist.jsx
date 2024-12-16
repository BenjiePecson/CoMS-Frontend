import React, { useState } from "react";

const Checklist = () => {
  // Sample workflow data
  const workflowData = [
    {
      id: "WF001",
      name: "GIS",
      links: "www.example.com",
      checklists: [
        {
          name: "GIS",
          statuses: [
            "Drafted",
            "Pending for Approval",
            "Approved",
            "Routed for Signature",
            "Notarized",
            "Filed with SEC",
            "Completed",
          ],
        },
      ],
    },
    {
      id: "WF002",
      name: "Business Permit Renewal",
      links:
        "https://docs.google.com/document/d/1zCKFCCSDwkHOCBGE7PreAw_z1_BIgYAat-JOqu5j8-4/edit?tab=t.0",
      checklists: [
        {
          name: "Checklist 1",
          statuses: ["status1", "status2", "status3"],
        },
        {
          name: "Checklist 2",
          statuses: ["status1", "status2", "status3"],
        },
        {
          name: "Checklist 2",
          statuses: ["status1", "status2", "status3"],
        },
        {
          name: "Checklist 2",
          statuses: ["status1", "status2", "status3"],
        },
        {
          name: "Checklist 2",
          statuses: ["status1", "status2", "status3"],
        },
      ],
    },
  ];

  const [name, setName] = useState("");
  const [links, setLinks] = useState("");
  const [checklists, setChecklists] = useState([
    { name: "", statuses: [{ status: "" }] },
  ]);

  const addChecklist = () => {
    setChecklists([...checklists, { name: "", statuses: [{ status: "" }] }]);
  };

  const removeChecklist = (indexToRemove) => {
    setChecklists(checklists.filter((_, index) => index !== indexToRemove));
  };

  const updateChecklistName = (index, newName) => {
    const updatedChecklists = [...checklists];
    updatedChecklists[index].name = newName;
    setChecklists(updatedChecklists);
  };

  const addStatus = (checklistIndex) => {
    const updatedChecklists = [...checklists];
    updatedChecklists[checklistIndex].statuses.push({ status: "" });
    setChecklists(updatedChecklists);
  };

  const updateStatus = (checklistIndex, statusIndex, newStatus) => {
    const updatedChecklists = [...checklists];
    updatedChecklists[checklistIndex].statuses[statusIndex].status = newStatus;
    setChecklists(updatedChecklists);
  };

  const removeStatus = (checklistIndex, statusIndex) => {
    const updatedChecklists = [...checklists];
    updatedChecklists[checklistIndex].statuses.splice(statusIndex, 1);
    setChecklists(updatedChecklists);
  };

  const handleSubmit = () => {
    console.log({
      name,
      links,
      checklists,
    });
    window.location.reload();
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-row justify-between my-3">
        <h1 className="font-bold text-[24px]">Services</h1>
        <button
          className="flex flex-row justify-center items-center gap-1 bg-[#667A8A] text-white rounded-xl px-5 py-2 "
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          <svg
            width="13"
            height="10"
            viewBox="0 0 13 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0418 4.33337H7.29183V0.333374H5.7085V4.33337H0.958496V5.66671H5.7085V9.66671H7.29183V5.66671H12.0418V4.33337Z"
              fill="white"
            />
          </svg>
          Add Workflow
        </button>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg">
              <div className="p-6">
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    Add Services
                  </h2>
                  <button
                    className="mb-5"
                    onClick={() =>
                      document.getElementById("my_modal_3").close()
                    }
                  >
                    ✕
                  </button>
                </div>

                {/* Main GIS Information */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Workflow Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Workflow Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Links
                    </label>
                    <input
                      type="text"
                      value={links}
                      onChange={(e) => setLinks(e.target.value)}
                      placeholder="Enter Links"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Checklists */}
                {checklists.map((checklist, checklistIndex) => (
                  <div
                    key={checklistIndex}
                    className="border rounded-lg p-4 mb-4 bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Checklist Name
                      </label>
                      {checklists.length > 1 && (
                        <button
                          onClick={() => removeChecklist(checklistIndex)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={checklist.name}
                      onChange={(e) =>
                        updateChecklistName(checklistIndex, e.target.value)
                      }
                      placeholder="Enter Checklist Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Statuses */}
                    {checklist.statuses.map((statusObj, statusIndex) => (
                      <div
                        key={statusIndex}
                        className="flex space-x-2 mb-2 items-center"
                      >
                        <input
                          type="text"
                          value={statusObj.status}
                          onChange={(e) =>
                            updateStatus(
                              checklistIndex,
                              statusIndex,
                              e.target.value
                            )
                          }
                          placeholder="Enter Status"
                          className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {checklist.statuses.length > 1 && (
                          <button
                            onClick={() =>
                              removeStatus(checklistIndex, statusIndex)
                            }
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      onClick={() => addStatus(checklistIndex)}
                      className="w-full mt-2 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
                    >
                      Add Status
                    </button>
                  </div>
                ))}

                <button
                  onClick={addChecklist}
                  className="w-full mb-4 px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Add Another Checklist
                </button>

                <button
                  onClick={handleSubmit}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit Service Information
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </div>

      <table className="w-full border-collapse bg-white">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-3 text-left font-semibold text-gray-700"></th>
            <th className="p-3 text-left font-semibold text-gray-700">
              Workflow Name
            </th>
            <th className="p-3 text-left font-semibold text-gray-700">
              Checklists
            </th>
            <th className="p-3 text-left font-semibold text-gray-700">Link</th>
            <th className="p-3 text-left font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {workflowData.map((workflow, index) => (
            <tr key={workflow.id} className="hover:bg-gray-50 border-b">
              <td className="p-3 text-gray-700">{index + 1}</td>
              <td className="p-3 text-gray-700">{workflow.name}</td>
              <td className="p-3">
                <div className="space-y-2">
                  {workflow.checklists.map((checklist, index) => (
                    <div key={index} className="bg-blue-50 p-2 rounded-md">
                      <div className="font-medium text-blue-800">
                        {checklist.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {checklist.statuses.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </td>
              <td className="p-3 text-gray-700">
                <a
                  href={
                    workflow.links.startsWith("http")
                      ? workflow.links
                      : `https://${workflow.links}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6Zm-5.03 4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.25a.75.75 0 0 0 0 1.5h10.94l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
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
  );
};

export default Checklist;
