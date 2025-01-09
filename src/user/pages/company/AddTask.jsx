import React, { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";

const AddTask = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Get the last year
  const lastYear = currentYear - 1;
  const [formData, setFormData] = useState({
    prerequisite: {
      gdriveDocs: "",
      boardMuniteResolution: "",
      latestGIS: "",
      secretaryCertificate: "",
    },
    taskInfo: {
      companyName: "",
      taskName: "",
      assignedTo: "",
      priorityLevel: "",
      targetDate: "",
      remarks: "",
    },
    selections: {
      selectedOption: "",
      gisOptions: [{ id: 1, value: "GIS" }],
      businessOptions: [
        { id: 4, value: `${currentYear} Business Permit (Photocopy)` },
        { id: 5, value: `${currentYear} Sanitary Permit (Photocopy)` },
        {
          id: 6,
          value: "Heal Certificate of employees registered with the LGU",
        },
        {
          id: 7,
          value: "Water Treatment Certificate (new, provided by the lessor)",
        },
        {
          id: 8,
          value: "Pest Control Certificate (new, provided by the lessor)",
        },
        { id: 9, value: "Certificate of Lease (Indicate if a Virtual Office)" },
        { id: 10, value: `${currentYear} Company Cedula (Photocopy)` },
        {
          id: 11,
          value: `Order of Payment for ${currentYear} Business Permit (Photocopy)`,
        },
        {
          id: 12,
          value: `OR for ${currentYear} Business Permit (Photocopy)`,
        },
        {
          id: 13,
          value: `${currentYear} Barangay Clearance (Photocopy with Official Receipt)`,
        },
        {
          id: 14,
          value: "Contract of Lease (new, if the current one has expired)",
        },
        {
          id: 15,
          value: "Fire Inspection Certificate (Photocopy)",
        },
        {
          id: 16,
          value: "Secretary Certificate",
        },
        {
          id: 17,
          value: `Certificate of Gross Receipts for ${currentYear}`,
        },
        {
          id: 18,
          value: `Audited Financial Statements (AFS) for ${lastYear} and ${currentYear}`,
        },
        {
          id: 19,
          value:
            "Certification of Non-Gaming Operations (from the building administration)",
        },
        {
          id: 20,
          value: "Insurance Policiy (new)",
        },
      ],
    },
  });

  const priorityLevel = [
    { value: "", label: "Select Priority Level" },
    { value: "1", label: "Urgent" },
    { value: "2", label: "Important" },
    { value: "3", label: "Low" },
    { value: "4", label: "Downtime" },
  ];

  const assignedTo = [
    { value: "", label: "Select an Assignee" },
    { value: "1", label: "Michael" },
    { value: "2", label: "Benjie" },
    { value: "3", label: "Anthony" },
  ];

  const handleInputChange = (step, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    const selectedData = {
      ...formData,
      selections: {
        selectedOption: formData.selections.selectedOption,
        // Only include the relevant options array
        ...(formData.selections.selectedOption === "GIS"
          ? { gisOptions: formData.selections.gisOptions }
          : { businessOptions: formData.selections.businessOptions }),
      },
    };
    console.log("Form submitted:", selectedData);
  };

  const updateFormData = (path, value) => {
    setFormData((prev) => {
      const newState = { ...prev };
      const pathArray = path.split(".");
      let current = newState;

      for (let i = 0; i < pathArray.length - 1; i++) {
        current = current[pathArray[i]];
      }
      current[pathArray[pathArray.length - 1]] = value;
      return newState;
    });
  };

  const addRow = (section) => {
    const options = section === "GIS" ? "gisOptions" : "businessOptions";
    const currentOptions = formData.selections[options];
    const newId =
      currentOptions.length > 0
        ? Math.max(...currentOptions.map((row) => row.id)) + 1
        : section === "GIS"
        ? 1
        : 4;

    const newOptions = [...currentOptions, { id: newId, value: "" }];

    updateFormData(`selections.${options}`, newOptions);
  };

  const removeRow = (section, id) => {
    const options = section === "GIS" ? "gisOptions" : "businessOptions";
    const filteredOptions = formData.selections[options].filter(
      (row) => row.id !== id
    );
    updateFormData(`selections.${options}`, filteredOptions);
  };

  const updateRowValue = (section, id, newValue) => {
    const options = section === "GIS" ? "gisOptions" : "businessOptions";
    const updatedOptions = formData.selections[options].map((row) =>
      row.id === id ? { ...row, value: newValue } : row
    );
    updateFormData(`selections.${options}`, updatedOptions);
  };

  const renderRow = (row, section) => (
    <div key={row.id} className="flex items-center gap-2 mb-2">
      <input
        type="text"
        value={row.value}
        onChange={(e) => updateRowValue(section, row.id, e.target.value)}
        className="flex-1 p-2 border rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => removeRow(section, row.id)}
        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        ×
      </button>
    </div>
  );

  const renderOptions = () => {
    if (formData.selections.selectedOption === "GIS") {
      return (
        <div className="mt-4">
          {formData.selections.gisOptions.map((row) => renderRow(row, "GIS"))}
          <button
            onClick={() => addRow("GIS")}
            className="w-full p-2 mt-2 border-2 border-dashed border-gray-300 rounded hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Add Subtask
          </button>
        </div>
      );
    } else if (formData.selections.selectedOption === "business") {
      return (
        <div className="mt-4">
          {formData.selections.businessOptions.map((row) =>
            renderRow(row, "business")
          )}
          <button
            onClick={() => addRow("business")}
            className="w-full p-2 mt-2 border-2 border-dashed border-gray-300 rounded hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Add Subtask
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <Breadcrumbs
        lists={[
          { goto: "/", text: "Home" },
          { goto: "/task-checklist", text: "Tasks" },
          { goto: "/task-checklist/addtask", text: "Add Tasks" },
        ]}
      />

      <div className="w-full max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 
                ${
                  currentStep >= step
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "border-gray-300 text-gray-300"
                }`}
                >
                  {step}
                </div>
                <span
                  className={`mt-2 text-sm ${
                    currentStep >= step ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  {step === 1
                    ? "Task Information"
                    : step === 2
                    ? "Pre-requisite"
                    : "Checklist"}
                </span>
              </div>
            ))}
          </div>
          <div className="relative pt-1">
            <div className="flex h-2 mb-4 overflow-hidden bg-gray-200 rounded">
              <div
                className="transition-all duration-500 bg-blue-500"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form Steps */}
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  value={formData.taskInfo.companyName}
                  onChange={(e) =>
                    handleInputChange("taskInfo", "companyName", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Task Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  value={formData.taskInfo.taskName}
                  onChange={(e) =>
                    handleInputChange("taskInfo", "taskName", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assigned To:
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white"
                  value={formData.taskInfo.assignedTo}
                  onChange={(e) =>
                    handleInputChange("taskInfo", "assignedTo", e.target.value)
                  }
                >
                  {assignedTo.map((assignee) => (
                    <option key={assignee.value} value={assignee.value}>
                      {assignee.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Priority Level
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white"
                  value={formData.taskInfo.priorityLevel}
                  onChange={(e) =>
                    handleInputChange(
                      "taskInfo",
                      "priorityLevel",
                      e.target.value
                    )
                  }
                >
                  {priorityLevel.map((priority) => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Target Date
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  value={formData.taskInfo.targetDate}
                  onChange={(e) =>
                    handleInputChange("taskInfo", "targetDate", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Remarks
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  value={formData.taskInfo.remarks}
                  onChange={(e) =>
                    handleInputChange("taskInfo", "remarks", e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="table table-bordered table-zebra">
                  {/* head */}
                  <tbody>
                    <tr>
                      <th className="border-2 border-gray-200">
                        Google Drive for Documents
                      </th>
                      <td className="border-2 border-gray-200">
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                          value={formData.prerequisite.gdriveDocs}
                          onChange={(e) =>
                            handleInputChange(
                              "prerequisite",
                              "gdriveDocs",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="border-2 border-gray-200">
                        Board Minutes that contain related resolution
                      </th>
                      <td className="border-2 border-gray-200">
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                          value={formData.prerequisite.boardMuniteResolution}
                          onChange={(e) =>
                            handleInputChange(
                              "prerequisite",
                              "boardMuniteResolution",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="border-2 border-gray-200">Latest GIS</th>
                      <td className="border-2 border-gray-200">
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                          value={formData.prerequisite.latestGIS}
                          onChange={(e) =>
                            handleInputChange(
                              "prerequisite",
                              "latestGIS",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="border-2 border-gray-200">
                        Secretary Certificate
                      </th>
                      <td className="border-2 border-gray-200">
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                          value={formData.prerequisite.secretaryCertificate}
                          onChange={(e) =>
                            handleInputChange(
                              "prerequisite",
                              "secretaryCertificate",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="w-full  p-6 bg-white rounded-lg shadow">
              <select
                onChange={(e) =>
                  updateFormData("selections.selectedOption", e.target.value)
                }
                value={formData.selections.selectedOption}
                className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Service</option>
                <option value="GIS">GIS</option>
                <option value="business">Business Permit Renewal</option>
              </select>
              {renderOptions()}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              className={`px-4 py-2 rounded ${
                currentStep === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
              disabled={currentStep === 1}
            >
              Previous
            </button>

            {currentStep === 3 ? (
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
