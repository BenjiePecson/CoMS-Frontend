import React from "react";

export const CoverSheetForm = ({
  formData,
  officers,
  handleOnChange,
  setFormData,
}) => {

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col w-full">
        <span className="label-text">SEC Registration Number</span>
        <input
          type="text"
          className="input input-bordered w-full"
          disabled
          name="sec_registration_number"
          value={formData.form_data.sec_registration_number}
          onChange={(e) => {
            handleOnChange(e, "SEC Registration Number");
          }}
        />

        <span className="label-text">Company Name</span>
        <input
          type="text"
          className="input input-bordered w-full"
          disabled
          name="company_name"
          value={formData.form_data.corporate_name}
          onChange={(e) => {
            handleOnChange(e, "Company Name");
          }}
        />

        <span className="label-text">Principal Office</span>
        <input
          type="text"
          className="input input-bordered w-full"
          disabled
          name="principal_office"
          value={formData.form_data.office_address}
          onChange={(e) => {
            handleOnChange(e, "Principal Office");
          }}
        />

        <span className="label-text">Form Type</span>
        <input
          type="text"
          disabled
          className="input input-bordered w-full"
          name="form_type"
          value="AAFS"
          placeholder="AAFS"
        />

        <span className="label-text">Department Requiring the Report</span>
        <select
          className="select select-bordered"
          name="department"
          value={formData.form_data.department}
          onChange={(e) => {
            handleOnChange(e, "Department");
          }}
        >
          <option value={"CRMD"}>CRMD</option>
          <option value={"CED"}>CED</option>
          <option value={"CFD"}>CFD</option>
          <option value={"MFD"}>MFD</option>
        </select>

        <span className="label-text">Secondary License</span>
        <input
          type="text"
          className="input input-bordered w-full"
          name="secondary_license"
          value={formData.form_data.secondary_license}
          onChange={(e) => {
            handleOnChange(e, "Secondary License");
          }}
        />

        <div className="divider">Company Information</div>
        <span className="label-text">Email Address</span>
        <input
          type="email"
          className="input input-bordered w-full"
          disabled
          name="official_email_address"
          value={formData.form_data.official_email_address}
          onChange={(e) => {
            handleOnChange(e, "Email Address");
          }}
        />

        <span className="label-text">Telephone Number</span>
        <input
          type="text"
          className="input input-bordered w-full"
          name="telephone_number"
          value={formData.form_data.telephone_number}
          onChange={(e) => {
            handleOnChange(e, "Telephone Number");
          }}
        />

        <span className="label-text">Mobile Number</span>
        <input
          type="text"
          className="input input-bordered w-full"
          name="official_mobile_number"
          value={formData.form_data.official_mobile_number}
          onChange={(e) => {
            handleOnChange(e, "Mobile Number");
          }}
        />

        <span className="label-text">Number of Shareholders</span>
        <input
          type="number"
          className="input input-bordered w-full"
          name="number_of_shareholders"
          value={formData.form_data.total_number_of_stockholders}
          onChange={(e) => {
            handleOnChange(e, "Number of Shareholders");
          }}
        />

        <span className="label-text">Annual Meeting</span>
        <input
          type="input"
          className="input input-bordered w-full"
          disabled
          name="date_of_annual_meeting"
          value={formData.form_data.date_of_annual_meeting}
          onChange={(e) => {
            handleOnChange(e, "Annual Meeting");
          }}
        />

        <span className="label-text">Fiscal Year</span>
        <input
          type="input"
          className="input input-bordered w-full"
          disabled
          name="fiscal_year_end"
          value={formData.form_data.fiscal_year_end}
          onChange={(e) => {
            handleOnChange(e, "Fiscal Year");
          }}
        />

        <div className="divider">Contact Person Information</div>

        <span className="label-text">Name</span>
        <input
          type="text"
          className="input input-bordered w-full"
          name="contact_person_name"
          value={formData.form_data.contact_person_name}
          onChange={(e) => {
            handleOnChange(e, "Name");
          }}
        />

        <span className="label-text">Email</span>
        <input
          type="email"
          className="input input-bordered w-full"
          disabled
          name="contact_person_email"
          value={formData.form_data.official_email_address}
        />

        <span className="label-text">Telephone Number</span>
        <input
          type="text"
          className="input input-bordered w-full"
          name="contact_person_telephone_number"
          value={formData.form_data.contact_person_telephone_number}
          onChange={(e) => {
            handleOnChange(e, "Telephone Number");
          }}
        />

        <span className="label-text">Mobile Number</span>
        <input
          type="text"
          className="input input-bordered w-full"
          name="contact_person_mobile_number"
          value={formData.form_data.contact_person_mobile_number}
          onChange={(e) => {
            handleOnChange(e, "Mobile Number");
          }}
        />

        <span className="label-text">Address</span>
        <input
          type="text"
          className="input input-bordered w-full"
          name="contact_person_address"
          value={formData.form_data.contact_person_address}
          onChange={(e) => {
            handleOnChange(e, "Address");
          }}
        />
      </div>
    </div>
  );
};

export default CoverSheetForm;
