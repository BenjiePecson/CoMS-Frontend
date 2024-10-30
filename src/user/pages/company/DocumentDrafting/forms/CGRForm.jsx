import React from "react";

const CGRForm = ({ formData, officers, handleOnChange, setFormData }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Year</span>
          </div>
          <input
            type="text"
            value={formData.form_data.year}
            onChange={(e) => {
              handleOnChange(e, "Year");
            }}
            name="year"
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Date From</span>
          </div>
          <input
            type="date"
            className="input input-bordered w-full"
            name="date_from"
            onChange={(e) => {
              handleOnChange(e, "Date From");
            }}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Date To</span>
          </div>
          <input
            type="date"
            className="input input-bordered w-full"
            name="date_to"
            onChange={(e) => {
              handleOnChange(e, "Date To");
            }}
          />
        </label>
      </div>

      <div className="divider">Revenue Generated</div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Q1 {formData.form_data.year}</span>
          </div>
          <input
            type="text"
            name="revenue_q1"
            onChange={(e) => {
              handleOnChange(e, "Q1 Revenue");
            }}
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Q2 {formData.form_data.year}</span>
          </div>
          <input
            type="text"
            name="revenue_q2"
            onChange={(e) => {
              handleOnChange(e, "Q2 Revenue");
            }}
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Q3 {formData.form_data.year}</span>
          </div>
          <input
            type="text"
            name="revenue_q3"
            onChange={(e) => {
              handleOnChange(e, "Q3 Revenue");
            }}
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Q4 {formData.form_data.year}</span>
          </div>
          <input
            type="text"
            name="revenue_q4"
            onChange={(e) => {
              handleOnChange(e, "Q4 Revenue");
            }}
            className="input input-bordered w-full"
          />
        </label>
      </div>

      <div className="flex w-full my-2 justify-end">
        {formData.form_data.total_revenue != "" &&
          formData.form_data.total_revenue != undefined && (
            <span>
              <span className="font-bold">Total Revenue: </span>
              <span>
                Php {Number(formData.form_data.total_revenue).toFixed(2)}
              </span>
            </span>
          )}
      </div>

      <div className="divider">Signatory</div>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Officer</span>
        </div>
        <select
          className="select select-bordered"
          name="officer"
          onChange={(e) => {
            let name = officers[e.target.value].name;
            let position = officers[e.target.value].officer;

            setFormData({
              ...formData,
              form_data: {
                ...formData.form_data,
                officer_name: name,
                officer_position: position,
              },
            });
          }}
        >
          {officers.map((officer, index) => {
            const value = `${officer.name}-${officer.officer}`;
            return (
              <option key={`officer-${index}`} value={index}>
                {value}
              </option>
            );
          })}
        </select>
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Officer Name</span>
        </div>
        <input
          type="text"
          className="input input-bordered w-full"
          name="officer_name"
          value={formData.form_data.officer_name}
          onChange={(e) => {
            handleOnChange(e, "Officer Name");
          }}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Officer Position</span>
        </div>
        <input
          type="text"
          className="input input-bordered w-full"
          name="officer_position"
          value={formData.form_data.officer_position}
          onChange={(e) => {
            handleOnChange(e, "Officer Position");
          }}
        />
      </label>
    </div>
  );
};

export default CGRForm;
