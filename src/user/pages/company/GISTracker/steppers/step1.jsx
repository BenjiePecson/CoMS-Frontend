import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  affiliationsState,
  setFormData,
} from "../../../../store/GIS/GISFormSlice";

const step1 = () => {
  const formData = useSelector((state) => state.formGIS.formData);

  const [formStep1, setformStep1] = useState(formData);
  const [isSpecialMeeting, setIsSpecialMeeting] = useState(
    formData.isSpecialMeeting
  );
  const [isAmended, setIsAmended] = useState(formData.isAmended);

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setformStep1({
      ...formStep1,
      [name]: value,
    });
  };

  const editSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
    </svg>
  );

  useEffect(() => {
    setformStep1(formData);
  }, []);

  useEffect(() => {
    setformStep1(formData);
    setIsAmended(formData.isAmended);
    setIsSpecialMeeting(formData.isSpecialMeeting);
  }, [formData]);

  useEffect(() => {
    setformStep1({ ...formStep1, isSpecialMeeting: isSpecialMeeting });
  }, [isSpecialMeeting]);

  useEffect(() => {
    setformStep1({
      ...formStep1,
      isAmended: isAmended,
    });
  }, [isAmended]);

  return (
    <>
      <div className="text-end">
        <button
          className="btn btn-outline btn-primary btn-sm"
          onClick={(e) => {
            setformStep1(formData);
            setIsAmended(formData.isAmended);
            setIsSpecialMeeting(formData.isSpecialMeeting);

            document.getElementById("step1FormModal").showModal();
          }}
        >
          {editSVG} Update Details
        </button>
      </div>
      <div className="flex flex-row w-full">
        <div>
          <div className="flex flex-col">
            <h1 className="w-[60%] text-start">
              Type of Meeting <span className="text-red-500">*</span>
            </h1>
            <div className="flex flex-row gap-5">
              <div className="form-control">
                <label className="label cursor-pointer flex gap-5">
                  <span className="label-text">Special</span>
                  <input
                    type="radio"
                    name="radio-special"
                    className="radio checked:bg-blue-500"
                    value={true}
                    checked={formData.isSpecialMeeting === true}
                    onChange={(e) => {}}
                    disabled
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-5">
                  <span className="label-text">Annual</span>
                  <input
                    type="radio"
                    name="radio-special"
                    className="radio checked:bg-blue-500"
                    value={false}
                    checked={formData.isSpecialMeeting === false}
                    onChange={(e) => {}}
                    disabled
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="w-[60%] text-start">
              For Amendment <span className="text-red-500">*</span>
            </h1>
            <div className="flex flex-row gap-12">
              <div className="form-control">
                <label className="label cursor-pointer flex gap-5">
                  <span className="label-text">Yes</span>
                  <input
                    type="radio"
                    name="radio-annual"
                    className="radio checked:bg-blue-500"
                    value={true}
                    checked={formData.isAmended === true}
                    onChange={(e) => {}}
                    disabled
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer flex gap-5">
                  <span className="label-text">No</span>
                  <input
                    type="radio"
                    name="radio-annual"
                    className="radio checked:bg-blue-500"
                    value={false}
                    checked={formData.isAmended === false}
                    onChange={(e) => {}}
                    disabled
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="form-control">
          <label className="label cursor-pointer flex-row justify-start gap-5">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={
                formData.isAmended == undefined ? false : formData.isAmended
              }
              onChange={(e) => {}}
              disabled={true}
            />
            <span className="label-text">Is Amended?</span>
          </label>
          <label className="label cursor-pointer flex-row justify-start gap-5">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={
                formData.isSpecialMeeting == undefined
                  ? false
                  : formData.isSpecialMeeting
              }
              onChange={(e) => {}}
              disabled={true}
            />
            <span className="label-text">Is Special Meeting?</span>
          </label>
        </div> */}
      </div>
      <div className="grid grip-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              SEC Registration Number <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full input-sm"
            name="sec_registration_number"
            value={formData.sec_registration_number}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Corporate Tax Identification Number (TIN){" "}
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full input-sm"
            name="corporate_tin"
            value={formData.corporate_tin}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Date Registered <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="date"
            className="input input-bordered w-full input-sm"
            name="date_registered"
            value={formData.date_registered}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Year <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="number"
            className="input input-bordered w-full input-sm"
            name="year"
            value={formData.year}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Corporate Name <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full input-sm"
            name="corporate_name"
            value={formData.corporate_name}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Fiscal Year End <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full input-sm"
            name="fiscal_year_end"
            value={formData.fiscal_year_end}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Business / Trade Name</span>
          </div>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full input-sm"
            name="business_or_trade_name"
            value={formData.business_or_trade_name}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Official Email Address <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="email"
            placeholder=""
            className="input input-bordered w-full input-sm"
            name="official_email_address"
            value={formData.official_email_address}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Alternate Email Address</span>
          </div>
          <input
            type="email"
            placeholder=""
            className="input input-bordered w-full input-sm"
            name="alternate_email_address"
            value={formData.alternate_email_address}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Complete Principal Office Address{" "}
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full input-sm"
            name="complete_principal_office_address"
            value={formData.complete_principal_office_address}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Official Mobile Number <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="number"
            placeholder=""
            className="input input-bordered w-full input-sm"
            name="official_mobile_number"
            value={formData.official_mobile_number}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Alternate Phone Number</span>
          </div>
          <input
            type="tel"
            placeholder=""
            className="input input-bordered w-full input-sm"
            name="alternate_phone_number"
            value={formData.alternate_phone_number}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Date of Annual Meeting Per By-Laws{" "}
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full input-sm"
            name="date_of_annual_meeting"
            value={formData.date_of_annual_meeting}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Actual Date of {formData.isSpecialMeeting ? "Special" : "Annual"}{" "}
              Meeting <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="date"
            className="input input-bordered w-full input-sm"
            name="actual_date_of_annual_meeting"
            value={formData.actual_date_of_annual_meeting}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Telephone Number</span>
          </div>
          <input
            type="tel"
            placeholder=""
            className="input input-bordered w-full input-sm"
            name="telephone_number"
            value={formData.telephone_number}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>
        <label className="form-control w-full">
          <div className="label text-start">
            <span className="label-text">
              Name of External Auditor & Signing Partner
              <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full input-sm"
            name="name_of_external_auditor"
            value={formData.name_of_external_auditor}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Industry Classification <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full input-sm"
            name="industry_classification"
            value={formData.industry_classification}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Fax Number</span>
          </div>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full input-sm"
            name="fax_number"
            value={formData.fax_number}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              SEC Accreditation Number(if applicable)
            </span>
          </div>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full input-sm"
            name="sec_accreditation_number"
            value={formData.sec_accreditation_number}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Website URL Address</span>
          </div>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full input-sm"
            name="website_url_address"
            value={formData.website_url_address}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Geographical Code</span>
          </div>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full input-sm"
            name="geographical_code"
            value={formData.geographical_code}
            disabled={true}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />
        </label>
        <label className="form-control w-full text-start">
          <div className="label">
            <span className="label-text">
              Primary Purpose/Activity/Industry Presently Engaged In
            </span>
          </div>
          <textarea
            className="textarea textarea-bordered"
            disabled
            value={formData.primary_purpose}
          ></textarea>
        </label>
      </div>

      <div className="w-full pt-10 pb-3">
        <h1 className=" poppins-semibold text-[20px]">
          Intercompany Affiliations
        </h1>
        <hr />
      </div>
      <div className="grid grip-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Parent Company <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full input-sm"
            name="name"
            value={formData.affiliations.parent.name}
            disabled={true}
            // onChange={(e) => {
            //   // handleOnChange(e);
            // }}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              SEC Registration No. <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full input-sm"
            name="sec_no"
            value={formData.affiliations.parent.sec_no}
            disabled={true}
            // onChange={(e) => {
            //   handleOnChange(e);
            // }}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Address <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full input-sm"
            name="address"
            value={formData.affiliations.parent.address}
            disabled={true}
            // onChange={(e) => {
            //   handleOnChange(e);
            // }}
          />
        </label>

        {/* <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Subsidiary/Affiliate <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full input-sm"
            name="subsidiary_affiliate"
            value={"N/A"}
            disabled={true}
            // onChange={(e) => {
            //   handleOnChange(e);
            // }}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              SEC Registration No. <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full input-sm"
            name="sec_reg_no"
            value={"N/A"}
            disabled={true}
            // onChange={(e) => {
            //   handleOnChange(e);
            // }}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">
              Address <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full input-sm"
            name="address"
            value={"N/A"}
            disabled={true}
            // onChange={(e) => {
            //   handleOnChange(e);
            // }}
          />
        </label> */}
      </div>

      <div className="pt-5">
        {/* <div className="w-full flex flex-row justify-between">
          <h1 className="poppins-semibold text-[15px] text-black">
            Subsidiary/Affiliate
          </h1>
          <button
            className="btn btn-outline btn-sm"
            type="button"
            onClick={() => {
              // console.log(formData.affiliations);
              // console.log(affiliationsState);

              let affiliations = {
                ...formData.affiliations,
                subsidiary_affiliate: [
                  ...formData.affiliations.subsidiary_affiliate,
                  affiliationsState,
                ],
              };
              dispatch(setFormData({ ...formData, affiliations: affiliations }))
            }}
          >
            Add row
          </button>
        </div> */}
        <table className="table w-full">
          <thead>
            <tr>
              <th>Subsidiary/Affiliate</th>
              <th>SEC Registration No.</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {formData.affiliations.subsidiary_affiliate.map(
              (affiliate, index) => {
                return (
                  <tr key={`row-${index}`}>
                    <td>
                      <label className="form-control w-full">
                        <input
                          type="text"
                          className="input input-bordered w-full input-sm"
                          name="name"
                          value={affiliate.name}
                          disabled={true}
                          onChange={(e) => {
                            // handleOnChange(e);
                          }}
                        />
                      </label>
                    </td>
                    <td>
                      <label className="form-control w-full">
                        <input
                          type="text"
                          className="input input-bordered w-full input-sm"
                          name="sec_no"
                          value={affiliate.sec_no}
                          disabled={true}
                          onChange={(e) => {
                            // handleOnChange(e);
                          }}
                        />
                      </label>
                    </td>
                    <td>
                      <label className="form-control w-full">
                        <input
                          type="text"
                          className="input input-bordered w-full input-sm"
                          name="address"
                          value={affiliate.address}
                          disabled={true}
                          onChange={(e) => {
                            // handleOnChange(e);
                          }}
                        />
                      </label>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>

      <dialog id="step1FormModal" className="modal">
        <div className="modal-box w-full max-w-7xl">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg">Update Details</h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                ✕
              </button>
            </form>
          </div>
          <div className="divider"></div>
          <div className="flex flex-row w-full">
            <div>
              <div className="flex flex-col">
                <h1 className="w-[60%] text-start">
                  Type of Meeting <span className="text-red-500">*</span>
                </h1>
                <div className="flex flex-row gap-5">
                  <div className="form-control">
                    <label className="label cursor-pointer flex gap-5">
                      <span className="label-text">Special</span>
                      <input
                        type="radio"
                        name="radio-11"
                        className="radio checked:bg-blue-500"
                        value={true}
                        checked={isSpecialMeeting === true}
                        onChange={(e) => {
                          setIsSpecialMeeting(true);
                        }}
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer flex gap-5">
                      <span className="label-text">Annual</span>
                      <input
                        type="radio"
                        name="radio-11"
                        className="radio checked:bg-blue-500"
                        value={false}
                        checked={isSpecialMeeting === false}
                        onChange={(e) => {
                          setIsSpecialMeeting(false);
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="w-[60%] text-start">
                  For Amendment <span className="text-red-500">*</span>
                </h1>
                <div className="flex flex-row gap-12">
                  <div className="form-control">
                    <label className="label cursor-pointer flex gap-5">
                      <span className="label-text">Yes</span>
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio checked:bg-blue-500"
                        value={true}
                        checked={isAmended === true}
                        onChange={(e) => {
                          setIsAmended(true);
                        }}
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer flex gap-5">
                      <span className="label-text">No</span>
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio checked:bg-blue-500"
                        value={false}
                        checked={isAmended === false}
                        onChange={(e) => {
                          setIsAmended(false);
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="form-control">
              <label className="label cursor-pointer flex-row justify-start gap-5">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  value={
                    formStep1.isAmended == undefined
                      ? false
                      : formStep1.isAmended
                  }
                  onChange={(e) => {
                    let val =
                      formStep1.isAmended == undefined
                        ? false
                        : formStep1.isAmended;
                    setformStep1({ ...formStep1, isAmended: !val });
                  }}
                />
                <span className="label-text">Is Amended?</span>
              </label>
              <label className="label cursor-pointer flex-row justify-start gap-5">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  value={
                    formStep1.isSpecialMeeting == undefined
                      ? false
                      : formStep1.isSpecialMeeting
                  }
                  onChange={(e) => {
                    let val =
                      formStep1.isSpecialMeeting == undefined
                        ? false
                        : formStep1.isSpecialMeeting;
                    setformStep1({ ...formStep1, isSpecialMeeting: !val });
                  }}
                />
                <span className="label-text">Is Special Meeting?</span>
              </label>
            </div> */}
          </div>
          <div className="flex flex-col gap-2">
            <div className="grid grip-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 w-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    SEC Registration Number{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full input-sm"
                  name="sec_registration_number"
                  value={formStep1.sec_registration_number}
                  disabled={true}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Corporate Tax Identification Number (TIN){" "}
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full input-sm"
                  name="corporate_tin"
                  value={formStep1.corporate_tin}
                  disabled={true}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Date Registered <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="date"
                  className="input input-bordered w-full input-sm"
                  name="date_registered"
                  value={formStep1.date_registered}
                  disabled={true}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Year <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="number"
                  className="input input-bordered w-full input-sm"
                  name="year"
                  value={formStep1.year}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Corporate Name <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full input-sm"
                  name="corporate_name"
                  value={formStep1.corporate_name}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Fiscal Year End <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full input-sm"
                  name="fiscal_year_end"
                  value={formStep1.fiscal_year_end}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Business / Trade Name</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full input-sm"
                  name="business_or_trade_name"
                  value={formStep1.business_or_trade_name}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Official Email Address{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="email"
                  placeholder=""
                  className="input input-bordered w-full input-sm"
                  name="official_email_address"
                  value={formStep1.official_email_address}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Alternate Email Address</span>
                </div>
                <input
                  type="email"
                  placeholder=""
                  className="input input-bordered w-full input-sm"
                  name="alternate_email_address"
                  value={formStep1.alternate_email_address}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Complete Principal Office Address{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full input-sm"
                  name="complete_principal_office_address"
                  value={formStep1.complete_principal_office_address}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Official Mobile Number{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="number"
                  placeholder=""
                  className="input input-bordered w-full input-sm"
                  name="official_mobile_number"
                  value={formStep1.official_mobile_number}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Alternate Phone Number</span>
                </div>
                <input
                  type="tel"
                  placeholder=""
                  className="input input-bordered w-full input-sm"
                  name="alternate_phone_number"
                  value={formStep1.alternate_phone_number}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Date of Annual Meeting Per By-Laws{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full input-sm"
                  name="date_of_annual_meeting"
                  value={formStep1.date_of_annual_meeting}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Actual Date of{" "}
                    {formStep1.isSpecialMeeting ? "Special" : "Annual"} Meeting{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="date"
                  className="input input-bordered w-full input-sm"
                  name="actual_date_of_annual_meeting"
                  value={formStep1.actual_date_of_annual_meeting}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Telephone Number</span>
                </div>
                <input
                  type="tel"
                  placeholder=""
                  className="input input-bordered w-full input-sm"
                  name="telephone_number"
                  value={formStep1.telephone_number}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>
              <label className="form-control w-full">
                <div className="label text-start">
                  <span className="label-text">
                    Name of External Auditor & Signing Partner
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full input-sm"
                  name="name_of_external_auditor"
                  value={formStep1.name_of_external_auditor}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Industry Classification{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full input-sm"
                  name="industry_classification"
                  value={formStep1.industry_classification}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Fax Number</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full input-sm"
                  name="fax_number"
                  value={formStep1.fax_number}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    SEC Accreditation Number(if applicable)
                  </span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full input-sm"
                  name="sec_accreditation_number"
                  value={formStep1.sec_accreditation_number}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Website URL Address</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full input-sm"
                  name="website_url_address"
                  value={formStep1.website_url_address}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Geographical Code</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full input-sm"
                  name="geographical_code"
                  value={formStep1.geographical_code}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
              </label>
              <label className="form-control w-full text-start">
                <div className="label">
                  <span className="label-text">
                    Primary Purpose/Activity/Industry Presently Engaged In
                  </span>
                </div>
                <textarea
                  className="textarea textarea-bordered"
                  value={formStep1.primary_purpose}
                  name="primary_purpose"
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                ></textarea>
              </label>
            </div>
          </div>
          <div className="w-full pt-10 pb-3">
            <h1 className=" poppins-semibold text-[20px]">
              Intercompany Affiliations
            </h1>
            <hr />
          </div>
          <div className="grid grip-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">
                  Parent Company <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full input-sm"
                value={formStep1.affiliations.parent.name}
                onChange={(e) => {
                  let updated = {
                    ...formStep1.affiliations,
                    parent: {
                      ...formStep1.affiliations.parent,
                      name: e.target.value,
                    },
                  };
                  setformStep1({ ...formData, affiliations: updated });
                }}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">
                  SEC Registration No. <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full input-sm"
                value={formStep1.affiliations.parent.sec_no}
                onChange={(e) => {
                  let updated = {
                    ...formStep1.affiliations,
                    parent: {
                      ...formStep1.affiliations.parent,
                      sec_no: e.target.value,
                    },
                  };
                  setformStep1({ ...formData, affiliations: updated });
                }}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">
                  Address <span className="text-red-500">*</span>
                </span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full input-sm"
                value={formStep1.affiliations.parent.address}
                onChange={(e) => {
                  let updated = {
                    ...formStep1.affiliations,
                    parent: {
                      ...formStep1.affiliations.parent,
                      address: e.target.value,
                    },
                  };
                  setformStep1({ ...formData, affiliations: updated });
                }}
              />
            </label>
          </div>
          <div className="pt-5">
            <div className="w-full flex flex-row justify-between">
              <h1 className="poppins-semibold text-[15px] text-black">
                Subsidiary/Affiliate
              </h1>
              <button
                className="btn btn-outline btn-sm"
                type="button"
                onClick={() => {
                  let affiliations = {
                    ...formStep1.affiliations,
                    subsidiary_affiliate: [
                      ...formStep1.affiliations.subsidiary_affiliate,
                      affiliationsState,
                    ],
                  };
                  setformStep1({ ...formStep1, affiliations: affiliations });
                }}
              >
                Add row
              </button>
            </div>
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Subsidiary/Affiliate</th>
                  <th>SEC Registration No.</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {formStep1.affiliations.subsidiary_affiliate.map(
                  (affiliate, index) => {
                    return (
                      <tr key={`row-${index}`}>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={affiliate.name}
                              onChange={(e) => {
                                let updated =
                                  formStep1.affiliations.subsidiary_affiliate.map(
                                    (affiliate, idx) => {
                                      if (index == idx) {
                                        return {
                                          ...affiliate,
                                          name: e.target.value,
                                        };
                                      }
                                      return affiliate;
                                    }
                                  );
                                let affiliations = {
                                  ...formStep1.affiliations,
                                  subsidiary_affiliate: updated,
                                };
                                setformStep1({ ...formStep1, affiliations });
                              }}
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={affiliate.sec_no}
                              onChange={(e) => {
                                let updated =
                                  formStep1.affiliations.subsidiary_affiliate.map(
                                    (affiliate, idx) => {
                                      if (index == idx) {
                                        return {
                                          ...affiliate,
                                          sec_no: e.target.value,
                                        };
                                      }
                                      return affiliate;
                                    }
                                  );
                                let affiliations = {
                                  ...formStep1.affiliations,
                                  subsidiary_affiliate: updated,
                                };
                                setformStep1({ ...formStep1, affiliations });
                              }}
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={affiliate.address}
                              onChange={(e) => {
                                let updated =
                                  formStep1.affiliations.subsidiary_affiliate.map(
                                    (affiliate, idx) => {
                                      if (index == idx) {
                                        return {
                                          ...affiliate,
                                          address: e.target.value,
                                        };
                                      }
                                      return affiliate;
                                    }
                                  );
                                let affiliations = {
                                  ...formStep1.affiliations,
                                  subsidiary_affiliate: updated,
                                };
                                setformStep1({ ...formStep1, affiliations });
                              }}
                            />
                          </label>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
          <div className="divider"></div>

          <div className="flex flex-row justify-between">
            <button
              onClick={(e) => {
                document.getElementById("step1FormModal").close();
              }}
              className="btn"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                dispatch(setFormData(formStep1));
                document.getElementById("step1FormModal").close();
              }}
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default step1;
