import { useState, useEffect } from "react";
import Select from "react-select";

const Quote = () => {
  const [data, setData] = useState(
    Array.from({ length: 0 }, (_, index) => ({
      id: index + 1,
      name: `Item ${index + 1}`,
      description: `Description for item ${index + 1}`,
      extra: `Extra info for item ${index + 1}`,
    }))
  );

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    extra: "",
  });

  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    companyAddress: "",
    representativeName: "",
    position: "",
    billingAccount: "",
    agreementValidUntil: "",
    subject: "",
  });

  const [currency, setCurrency] = useState("");

  const handleCompanyDetailsChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.description) {
      setData((prev) => [...prev, { id: prev.length + 1, ...newItem }]);
      setNewItem({ name: "", description: "", extra: "" });
    }
  };

  const handleRemoveItem = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCurrencyChange = (selectedOption) => {
    setCurrency(selectedOption.value);
  };

  const handleSubmit = () => {
    const formData = {
      ...companyDetails,
      currency,
      services: data,
    };

    console.log("Submitted Data: ", formData);
    // You can now send formData to your backend API or handle it as needed
  };
  return (
    <div>
      <div className="flex flex-row w-full justify-between items-center mt-5">
        <div className="poppins-bold text-color-2 text-[24px]">Quote</div>
      </div>

      <div className="card bg-base-100 shadow-xl flex flex-col">
        <div className="card-body flex flex-col">
          <div className="flex flex-col lg:flex-row">
            <div className="container">
              <h2 className="card-title">Company Details</h2>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Company Name</span>
                </div>
                <input
                  type="text"
                  name="companyName"
                  value={companyDetails.companyName}
                  onChange={handleCompanyDetailsChange}
                  placeholder="Type here"
                  className="input input-bordered input-sm w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Company Address</span>
                </div>
                <input
                  type="text"
                  name="companyAddress"
                  value={companyDetails.companyAddress}
                  onChange={handleCompanyDetailsChange}
                  placeholder="Type here"
                  className="input input-bordered input-sm w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Representative Name</span>
                </div>
                <input
                  type="text"
                  name="representativeName"
                  value={companyDetails.representativeName}
                  onChange={handleCompanyDetailsChange}
                  placeholder="Type here"
                  className="input input-bordered input-sm w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Position</span>
                </div>
                <input
                  type="text"
                  name="position"
                  value={companyDetails.position}
                  onChange={handleCompanyDetailsChange}
                  placeholder="Type here"
                  className="input input-bordered input-sm w-full max-w-xs"
                />
              </label>
            </div>
            <div className="">
              <div className="mx-auto lg:p-4">
                <div className="flex justify-end">
                  <label className="form-control w-full max-w-xs my-2">
                    <Select
                      options={[
                        { value: "$", label: "USD" },
                        { value: "PHP", label: "PHP" },
                      ]}
                      onChange={handleCurrencyChange}
                      placeholder="Select Currency"
                    />
                  </label>
                </div>
                <div className="mb-4 flex flex-col lg:flex-row lg:space-x-2">
                  <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    onChange={handleInputChange}
                    placeholder="Enter Service"
                    className="input input-bordered input-sm"
                  />
                  <input
                    type="number"
                    name="description"
                    value={newItem.description}
                    onChange={handleInputChange}
                    placeholder="Enter SF"
                    className="input input-bordered input-sm"
                  />

                  <input
                    type="number"
                    name="extra"
                    value={newItem.extra}
                    onChange={handleInputChange}
                    placeholder="Enter OOP"
                    className="input input-bordered input-sm"
                  />
                  <button
                    onClick={handleAddItem}
                    className="btn btn-sm "
                    disabled={!newItem.name || !newItem.description}
                  >
                    +
                  </button>
                </div>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <div className="flex text-sm text-left text-gray-500">
                    <div className="lg:w-48 flex-shrink-0">
                      <div className="bg-gray-100 px-4 py-3 text-xs font-medium text-gray-700 uppercase">
                        Services
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="bg-gray-100 px-4 py-3 text-xs font-medium text-gray-700 uppercase">
                        SF
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="bg-gray-100 px-4 py-3 text-xs font-medium text-gray-700 uppercase">
                        OOP
                      </div>
                    </div>
                    <div className="w-24 flex-shrink-0">
                      <div className="bg-gray-100 px-4 py-3 text-xs font-medium text-gray-700 uppercase">
                        ACTION
                      </div>
                    </div>
                  </div>
                  <div
                    className="overflow-y-auto"
                    style={{ maxHeight: "150px" }}
                  >
                    {data.map((item) => (
                      <div
                        key={item.id}
                        className="flex text-sm text-gray-500 border-t border-gray-200 hover:bg-gray-50"
                      >
                        <div className="w-48 flex-shrink-0 px-4 py-3 break-words">
                          {item.name}
                        </div>
                        <div className="flex-grow px-4 py-3 ">
                          {item.description}
                        </div>
                        <div className="flex-grow px-4 py-3">
                          {item.extra || "-"}
                        </div>
                        <div className="w-24 flex-shrink-0 px-4 py-3">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="btn btn-sm"
                          >
                            x
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row">
              <div className="w-[35%]">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Billing Account</span>
                  </div>
                  <input
                    type="text"
                    name="billingAccount"
                    value={companyDetails.billingAccount}
                    onChange={handleCompanyDetailsChange}
                    placeholder="Type here"
                    className="input input-bordered input-sm w-full"
                  />
                </label>
              </div>
              <div className="flex flex-col lg:flex-row my-9">
                <p className="w-full my-1">This agreement is valid until</p>
                <input
                  type="date"
                  name="agreementValidUntil"
                  value={companyDetails.agreementValidUntil}
                  onChange={handleCompanyDetailsChange}
                  className="input input-bordered input-sm mx-2 lg:px-[120px]"
                />
              </div>
            </div>
            <div className="flex flex-row">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Subject</span>
                </div>
                <input
                  type="text"
                  name="subject"
                  value={companyDetails.subject}
                  onChange={handleCompanyDetailsChange}
                  placeholder="Type here"
                  className="input input-bordered input-sm w-full"
                />
              </label>
              <button className="btn btn-sm my-9 mx-3" onClick={handleSubmit}>
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
