import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../../../store/GIS/GISFormSlice";

const step1 = () => {
  const formData = useSelector((state) => state.formGIS.formData);

  const [formStep1, setformStep1] = useState(formData);

  const dispatch = useDispatch();

  useEffect(() => {
    setformStep1(formData);
  }, []);

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

  return (
    <>
      <div className="text-end">
        <button
          className="btn btn-outline btn-primary btn-sm"
          onClick={(e) => {
            setformStep1(formData);
            document.getElementById("step1FormModal").showModal();
          }}
        >
          {editSVG} Update Details
        </button>
      </div>
      <div className="flex flex-row w-full">
        <div className="form-control">
          <label className="label cursor-pointer flex-row justify-start gap-5">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={
                formData.isAmmended == undefined ? false : formData.isAmmended
              }
              onChange={(e) => {}}
              disabled={true}
            />
            <span className="label-text">Is Ammended?</span>
          </label>
          <label className="label cursor-pointer flex-row justify-start gap-5">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={
                formData.isAmmended == undefined ? false : formData.isAmmended
              }
              onChange={(e) => {}}
              disabled={true}
            />
            <span className="label-text">Is Special Meeting?</span>
          </label>
        </div>
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
              Actual Date of Annual Meeting{" "}
              <span className="text-red-500">*</span>
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
            <div className="form-control">
              <label className="label cursor-pointer flex-row justify-start gap-5">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  value={
                    formStep1.isAmmended == undefined
                      ? false
                      : formStep1.isAmmended
                  }
                  onChange={(e) => {
                    let val =
                      formStep1.isAmmended == undefined
                        ? false
                        : formStep1.isAmmended;
                    setformStep1({ ...formStep1, isAmmended: !val });
                  }}
                />
                <span className="label-text">Is Ammended?</span>
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
            </div>
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
                    Actual Date of Annual Meeting{" "}
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
                console.log(formStep1);
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
