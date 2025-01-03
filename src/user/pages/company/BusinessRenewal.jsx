import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import {
  fetchChecklist,
  createBusinessRenewal,
} from "../../store/businessRenewal/businessRenewalSlice";
// import BusinessRenewalDocsHeader from "../../components/BusinessRenewalDocsHeader";

const BusinessRenewal = () => {
  const { companyId } = useParams();
  const dispatch = useDispatch();

  // Add loading state for create operation
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [createSuccess, setCreateSuccess] = useState(false);

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

  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [editState, setEditState] = useState({});
  const [editValues, setEditValues] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  // Add validation function
  const validateNewData = (data) => {
    if (!data.year) return "Year is required";
    if (isNaN(data.year) || data.year < 1900 || data.year > 2100)
      return "Invalid year";
    return null;
  };

  // Modified handleAddNewData with backend integration
  const handleAddNewData = async () => {
    const validationError = validateNewData(newData);
    if (validationError) {
      setCreateError(validationError);
      return;
    }

    setCreateLoading(true);
    setCreateError(null);
    setCreateSuccess(false);

    try {
      // Prepare the data for the backend
      const businessRenewalData = {
        companyId: companyId,
        year: Number(newData.year),
        brgyClearance: newData.brgyClearance,
        cedula: newData.cedula,
        billingAssesment: newData.billingAssesment,
        businessPermit: newData.businessPermit,
        sanitaryPermit: newData.sanitaryPermit,
        insurance: newData.insurance,
        fireSafetyInspectionCertificate:
          newData.fireSafetyInspectionCertificate,
        secDocuments: newData.secDocuments,
        vatFillings: newData.vatFillings,
        annualFinancialStatement: newData.annualFinancialStatement,
        certificateOfGrossReceipts: newData.certificateOfGrossReceipts,
        contractOfLeaseAndTaxDeclarations:
          newData.contractOfLeaseAndTaxDeclarations,
        secCertAuthorizationorSPA: newData.secCertAuthorizationorSPA,
        affidavitOfLoss: newData.affidavitOfLoss,
        listOfRegularEmployees: newData.listOfRegularEmployees,
      };

      const resultAction = await dispatch(
        createBusinessRenewal(businessRenewalData)
      );

      if (createBusinessRenewal.fulfilled.match(resultAction)) {
        setShowModal(false);
        setCreateSuccess(true);

        // Reset the form
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

        // Refresh the data
        window.location.reload();
      } else if (resultAction.error) {
        throw new Error(resultAction.error.message);
      }
    } catch (err) {
      setCreateError(err.message || "Failed to create business renewal");
    } finally {
      setCreateLoading(false);
    }
  };

  // Add success message component
  const SuccessMessage = () => (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
      Business renewal created successfully!
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!companyId) {
        setError("Company ID is required");
        setLoading(false);
        return;
      }

      try {
        const action = await dispatch(fetchChecklist(companyId));
        if (action.payload) {
          setData(action.payload);
          // Only set activeTab if we have data
          if (action.payload.length > 0) {
            // Sort the payload by year in descending order and pick the latest year
            const latestYear = [...action.payload].sort(
              (a, b) => b.year - a.year
            )[0].year;

            setActiveTab(latestYear);
          }
        } else if (action.error) {
          setError("Failed to fetch checklist data");
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, companyId]);

  // Early return for loading and error states
  // if (loading) return <div className="p-4">Loading...</div>;
  // if (error) return <div className="p-4 text-red-500">{error}</div>;
  // if (!data || data.length === 0)
  //   // return <div className="p-4">No data available</div>;
  //   return <BusinessRenewalDocsHeader />;

  // Get active data safely
  const activeData = data.find((item) => item.year === activeTab) || data[0];

  // Rest of your component functions stay the same
  const handleTabClick = (year) => {
    setActiveTab(year);
    setEditState({});
  };

  const handleEditClick = (fieldKey, activeData) => {
    setEditState((prevState) => ({ ...prevState, [fieldKey]: true }));
    setEditValues((prevValues) => ({
      ...prevValues,
      [fieldKey]: activeData[fieldKey],
    }));
  };

  const handleFieldChange = (fieldKey, value) => {
    setEditValues((prevValues) => ({ ...prevValues, [fieldKey]: value }));
  };

  const handleSaveClick = async (fieldKey, year, id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.year === year
          ? { ...item, [fieldKey]: editValues[fieldKey] }
          : item
      )
    );
    setEditState((prevState) => ({ ...prevState, [fieldKey]: false }));

    // Prepare update data
    const updateData = {
      [fieldKey]: editValues[fieldKey],
    };

    // Make API call to update the document
    const response = await axios.put(`/checklist-update/${id}`, updateData);

    window.location.reload();
  };

  const handleNewDataChange = (key, value) => {
    setNewData((prevValues) => ({ ...prevValues, [key]: value }));
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
              Business Renewal Documents
            </h2>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center"
            >
              <span className="mr-2">+</span> Add New Year
            </button>
          </div>
          {loading ? (
            <div className="p-4">Loading...</div>
          ) : error ? (
            <div className="p-4 text-red-500">{error}</div>
          ) : !data || data.length === 0 ? (
            <div className="p-4">No data available</div>
          ) : (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {data
                .slice() // Creates a shallow copy of the array to avoid mutating the original `data`.
                .sort((a, b) => b.year - a.year) // Sorts the array in descending order.
                .map((item) => (
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
          )}
        </div>

        {/* Documents Grid */}
        {activeData && (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              Documents for {activeData.year}
            </h3>
            <div className="divider">Barangay</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex flex-col">
              {Object.keys(activeData)
                .slice(2, 16)
                .map((key) => {
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
                                  handleSaveClick(
                                    key,
                                    activeData.year,
                                    activeData.businessChecklistId
                                  )
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
                                  onClick={() =>
                                    handleViewFile(activeData[key])
                                  }
                                  className="px-3 py-1 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200 flex items-center"
                                >
                                  View
                                </button>
                                <button
                                  onClick={() =>
                                    handleEditClick(key, activeData)
                                  }
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

            <div className="divider">LGU</div>

            <div className="divider">SEC</div>

            <div className="divider">BIR</div>
          </div>
        )}
      </div>

      {/* Modified Modal with loading and error states */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Add New Year
              </h3>
            </div>

            {createError && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                {createError}
              </div>
            )}

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
                disabled={createLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewData}
                className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center ${
                  createLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={createLoading}
              >
                {createLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  "Add Year"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success message */}
      {createSuccess && <SuccessMessage />}
    </div>
  );
};

export default BusinessRenewal;
