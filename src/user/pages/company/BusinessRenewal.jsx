import React, { useState } from "react";

const BusinessRenewal = () => {
  // Custom labels mapping
  const labelMapping = {
    brgyClearance: "Brgy. Clearance (with Brgy. Clearance OR)  ",
    cedula: "CEDULA",
    billingAssesment: "Billing Assessment (Billing Assessment O.R.)",
    businessPermit:
      "Business Permit with (Business Permit O.R. / Billing Assessment O.R.)",
    sanitaryPermit: "Sanitary Permit",
    insurance: "Insurance Certificate",
    fireSafetyInspectionCertificate:
      "Fire Safety Inspection Certificate or Fire Extinguisher OR",
    secDocuments:
      "SEC Documents (Latest AFS and Latest SEC Certificate, AOI and By-Laws)",
    vatFillings:
      "VAT Fillings OR Previous Percentage Tax Fillings OR Affidavit of Non-operation (2550Q/2550M)",
    annualFinancialStatement: "AFS",
    certificateOfGrossReceipts: "Certificate Gross Reciepts (If applicable)",
    contractOfLeaseAndTaxDeclarations:
      "Contract of Lease (If Renting) or Tax Declaration (If Owned)",
    secCertAuthorizationorSPA:
      "Authorization to process Secretary's Certficiate-Authorization OR SPA",
    affidavitOfLoss: "Affidavit of Loss (If Needed)",
    listOfRegularEmployees: "List of Regular Employees",
  };

  const initialData = [
    {
      year: 2024,
      brgyClearance: "link to file",
      cedula: "link to file",
      billingAssesment: "link to file",
      businessPermit: "link to file",
      sanitaryPermit: "link to file",
      insurance: "link to file",
      fireSafetyInspectionCertificate: "link to file",
      secDocuments: "link to file",
      vatFillings: "link to file",
      annualFinancialStatement: "link to file",
      certificateOfGrossReceipts: "link to file",
      contractOfLeaseAndTaxDeclarations: "link to file",
      secCertAuthorizationorSPA: "link to file",
      affidavitOfLoss: "link to File",
      listOfRegularEmployees: "link to file",
    },
    {
      year: 2023,
      brgyClearance: "link to file",
      cedula: "link to file",
      billingAssesment: "link to file",
      businessPermit: "link to file",
      sanitaryPermit: "link to file",
      insurance: "link to file",
      fireSafetyInspectionCertificate: "link to file",
      secDocuments: "link to file",
      vatFillings: "link to file",
      annualFinancialStatement: "link to file",
      certificateOfGrossReceipts: "link to file",
      contractOfLeaseAndTaxDeclarations: "link to file",
      secCertAuthorizationorSPA: "link to file",
      affidavitOfLoss: "link to File",
      listOfRegularEmployees: "link to file",
    },
  ];

  const [data, setData] = useState(initialData);
  const [activeTab, setActiveTab] = useState(data[0].year);
  const [editState, setEditState] = useState({});
  const [editValues, setEditValues] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newData, setNewData] = useState({
    year: "",
    brgyClearance: "",
    cedula: "",
    billingAssesment: "",
    businessPermit: "",
    sanitaryPermit: "",
    insurance: "",
    fireSafetyInspectionCertificate: "",
    secDocuments: "",
    vatFillings: "",
    annualFinancialStatement: "",
    certificateOfGrossReceipts: "",
    contractOfLeaseAndTaxDeclarations: "",
    secCertAuthorizationorSPA: "",
    affidavitOfLoss: "",
    listOfRegularEmployees: "",
  });

  const handleTabClick = (year) => {
    setActiveTab(year);
    setEditState({});
  };

  const handleEditClick = (fieldKey, activeData) => {
    setEditState((prevState) => ({ ...prevState, [fieldKey]: true }));
    setEditValues({ ...editValues, [fieldKey]: activeData[fieldKey] });
  };

  const handleFieldChange = (fieldKey, value) => {
    setEditValues((prevValues) => ({ ...prevValues, [fieldKey]: value }));
  };

  const handleSaveClick = (fieldKey, year) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.year === year
          ? { ...item, [fieldKey]: editValues[fieldKey] }
          : item
      )
    );
    setEditState((prevState) => ({ ...prevState, [fieldKey]: false }));
  };

  const handleNewDataChange = (key, value) => {
    setNewData((prevValues) => ({ ...prevValues, [key]: value }));
  };

  const handleAddNewData = () => {
    setData((prevData) => [
      ...prevData,
      { ...newData, year: Number(newData.year) },
    ]);
    setShowModal(false);
    setNewData({
      year: "",
      brgyClearance: "",
      cedula: "",
      billingAssesment: "",
      businessPermit: "",
      sanitaryPermit: "",
      insurance: "",
      fireSafetyInspectionCertificate: "",
      secDocuments: "",
      vatFillings: "",
      annualFinancialStatement: "",
      certificateOfGrossReceipts: "",
      contractOfLeaseAndTaxDeclarations: "",
      secCertAuthorizationorSPA: "",
      affidavitOfLoss: "",
      listOfRegularEmployees: "",
    });
  };

  const handleViewFile = (url) => {
    if (url && url.trim() !== "") {
      const parts = url.split("/");
      if (parts[parts.length - 1].startsWith("www")) {
        const validUrl = "http://" + parts.slice(parts.length - 1).join("/");
        window.open(validUrl, "_blank");
      } else {
        window.open(url, "_blank");
      }
    }
  };

  const activeData = data.find((item) => item.year === activeTab);

  const getFieldLabel = (fieldKey) => {
    return labelMapping[fieldKey] || fieldKey;
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
        {/* Header and Tab Navigation */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Document Management
            </h2>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center"
            >
              <span className="mr-2">+</span> Add New Year
            </button>
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            {data.map((item) => (
              <button
                key={item.year}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  activeTab === item.year
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => handleTabClick(item.year)}
              >
                {item.year}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Grid */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Documents for {activeData.year}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(activeData).map((key) => {
              if (key !== "year") {
                return (
                  <div
                    key={key}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    {editState[key] ? (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          {getFieldLabel(key)}:
                        </label>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={editValues[key]}
                            onChange={(e) =>
                              handleFieldChange(key, e.target.value)
                            }
                            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button
                            onClick={() =>
                              handleSaveClick(key, activeData.year)
                            }
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-700">
                            {getFieldLabel(key)}
                          </h4>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewFile(activeData[key])}
                              className="px-3 py-1 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 flex items-center"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleEditClick(key, activeData)}
                              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                        <p
                          className="text-sm text-gray-600 truncate"
                          title={activeData[key]}
                        >
                          {activeData[key]}
                        </p>
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Add New Year
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year:
                </label>
                <input
                  type="number"
                  value={newData.year}
                  onChange={(e) => handleNewDataChange("year", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {Object.keys(newData).map((key) =>
                key !== "year" ? (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {getFieldLabel(key)}:
                    </label>
                    <input
                      type="text"
                      value={newData[key]}
                      onChange={(e) => handleNewDataChange(key, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ) : null
              )}
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewData}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Add Year
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessRenewal;
