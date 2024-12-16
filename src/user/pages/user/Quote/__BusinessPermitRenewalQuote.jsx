import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewRecord } from "../../../store/quotes/QuotesSlice";
import { useNavigate } from "react-router-dom";

export const BusinessPermitRenewalQuote = ({ selectedDocument }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quote_record = useSelector((state) => state.quotes.get_record);
  const all_quotes = useSelector((state) => state.quotes.get_all_quotes);
  const [data, setData] = useState({ ...quote_record.form_data, service_type: selectedDocument });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newRecord = {
      ...quote_record,
      form_data: data,
    };

    newRecord.quote_number = "VIA-00001";
    newRecord.quote_name = `${data.recipient_company} ${data.service_type}`;
    newRecord.quote_id = 1;

    dispatch(addNewRecord(newRecord));
    navigate("/quote");
  };

  useEffect(() => {
    console.log(all_quotes);
  }, [all_quotes]);

  return (
    <>
      <div className="divider">Business Permit Renewal</div>
      <form
        className="container lg:flex lg:flex-wrap lg:gap-4 lg:box-border lg:ml-[5%]"
        onSubmit={handleSubmit}
      >
        <label htmlFor="recipient_company" className="form-control">
          <div className="label">
            <span className="label-text">Recipient Company</span>
          </div>

          <input
            type="text"
            name="recipient_company"
            value={data.recipient_company}
            onChange={handleOnChange}
            className="input input-bordered w-full"
            required
          />
        </label>

        <label htmlFor="recipient_name" className="form-control">
          <div className="label">
            <span className="label-text">Recipient Name</span>
          </div>

          <input
            type="text"
            name="recipient_name"
            value={data.recipient_name}
            onChange={handleOnChange}
            className="input input-bordered w-full"
            required
          />
        </label>

        <label htmlFor="recipient_address" className="form-control">
          <div className="label">
            <span className="label-text">Recipient Address</span>
          </div>

          <input
            type="text"
            name="recipient_address"
            value={data.recipient_address}
            onChange={handleOnChange}
            className="input input-bordered w-full"
            required
          />
        </label>

        <label htmlFor="service_fee" className="form-control">
          <div className="label">
            <span className="label-text">Service Fee</span>
          </div>

          <input
            type="number"
            name="service_fee"
            value={data.service_fee}
            onChange={handleOnChange}
            className="input input-bordered w-full"
            required
          />
        </label>

        <label htmlFor="out_of_pocket_expenses" className="form-control">
          <div className="label">
            <span className="label-text">Out of Pocket Expenses</span>
          </div>

          <input
            type="number"
            name="out_of_pocket_expenses"
            value={data.out_of_pocket_expenses}
            onChange={handleOnChange}
            className="input input-bordered w-full"
            required
          />
        </label>

        <label htmlFor="due_date" className="form-control">
          <div className="label">
            <span className="label-text">Due Date</span>
          </div>

          <input
            type="date"
            name="due_date"
            value={data.due_date}
            onChange={handleOnChange}
            className="input input-bordered w-full lg:w-[13rem]"
            required
          />
        </label>

        <label htmlFor="service_provider" className="form-control">
          <div className="label">
            <span className="label-text">Service Provider</span>
          </div>

          <input
            type="text"
            name="service_provider"
            value={data.service_provider}
            onChange={handleOnChange}
            className="input input-bordered w-full"
            required
          />
        </label>

        <label htmlFor="service_provider_position" className="form-control">
          <div className="label">
            <span className="label-text">Service Provider Position</span>
          </div>

          <input
            type="text"
            name="service_provider_position"
            value={data.service_provider_position}
            onChange={handleOnChange}
            className="input input-bordered w-full"
            required
          />
        </label>

        <label htmlFor="scope_of_work" className="form-control">
          <div className="label">
            <span className="label-text">Scope of Work</span>
          </div>

          <input
            type="text"
            name="scope_of_work"
            value={data.scope_of_work}
            onChange={handleOnChange}
            className="input input-bordered w-full"
            required
          />
        </label>

        <label htmlFor="company" className="form-control">
          <div className="label">
            <span className="label-text">Company</span>
          </div>

          <select
            className="select select-bordered lg:w-[13rem]"
            name="company"
            value={data.company}
            onChange={handleOnChange}
            required
          >
            <option>Select a Company</option>
            <option value="Viascari, Inc.">Viascari, Inc.</option>
            <option value="Offshore Concept BPO Services, Inc.">
              Offshore Concept BPO Services, Inc.
            </option>
          </select>
        </label>

        <div className="mt-3 w-full flex justify-end lg:mr-20">
          <button
            className="btn btn-md bg-primary border-none text-white flex flex-row justify-center items-center rounded-[15px]"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
