import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select/base";
import { GISDraftingQuote } from "./GISDraftingQuote";
import { BusinessPermitRenewalQuote } from "./BusinessPermitRenewalQuote";
import { useDispatch, useSelector } from "react-redux";
import { updateRecord } from "../../../store/quotes/QuotesSlice";

export const AddNewQuote = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //type of quotes
  const [quotes, setQuotes] = useState([
    "Business Permit Renewal",
    "GIS Drafting",
  ]);

  const [selectedDocument, setSelectedDocument] = useState(null);
  const handleOnChange = (e) => {
    setSelectedDocument(e.target.value);
  };

  return (
    <>
      <div className="card bg-base-100 shadow-xl flex flex-col">
        <div className="card-body flex flex-col">
          <button
            className="text-red-500 flex w-fit justify-end"
            onClick={() => {
              navigate(`/quote`);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <h2 className="card-title justify-center">Company Details</h2>

          <form className="container">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Document Type</span>
              </div>
              <select
                className="select select-bordered"
                name="type"
                onChange={handleOnChange}
              >
                <option value="">Select Document</option>
                {quotes.map((document, index) => {
                  return <option key={`document-${index}`} value={document}>{document}</option>;
                })}
              </select>
            </label>
          </form>

          {selectedDocument === "GIS Drafting" && <GISDraftingQuote selectedDocument={selectedDocument}/>}
          {selectedDocument === "Business Permit Renewal" && <BusinessPermitRenewalQuote selectedDocument={selectedDocument} />}
        </div>
      </div>
    </>
  );
};

export default AddNewQuote;
