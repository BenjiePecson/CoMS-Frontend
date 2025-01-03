import React from "react";
import { appointeeState } from "../../../../store/documentdrafting/DocumentDraftingSlice";

const PreEmptiveRightsForm = ({
  formData,
  officers,
  setFormData,
  handleOnChange,
  handleOnChangeAppointees,
}) => {
  const removeIconSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 mx-auto text-[#ff5858]"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 w-full">
          <label className="form-control w-full col-span-1">
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
          <label className="form-control w-full col-span-1">
            <div className="label">
              <span className="label-text">Meeting Date</span>
            </div>
            <input
              type="date"
              value={formData.form_data.meeting_date}
              onChange={(e) => {
                handleOnChange(e, "Meeting Date");
              }}
              name="meeting_date"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full col-span-1 lg:col-span-2">
            <div className="label">
              <span className="label-text">Meeting Place</span>
            </div>
            <input
              type="text"
              value={formData.form_data.meeting_place}
              onChange={(e) => {
                handleOnChange(e, "Year");
              }}
              name="meeting_place"
              className="input input-bordered w-full"
            />
          </label>
        </div>

        <div className="divider">Authorized Capital Stock</div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <label className="form-control w-full col-span-1">
            <div className="label">
              <span className="label-text">From (Pesos)</span>
            </div>
            <input
              type="text"
              value={formData.form_data.from}
              onChange={(e) => {
                handleOnChange(e, "From");
              }}
              name="from"
              placeholder="ONE MILLION PESOS (PHP 1,000,000)"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full col-span-1">
            <div className="label">
              <span className="label-text">Divided Into (Shares)</span>
            </div>
            <input
              type="text"
              value={formData.form_data.from_divided_into}
              onChange={(e) => {
                handleOnChange(e, "Divided Into");
              }}
              name="from_divided_into"
              placeholder="ONE MILLION SHARES (1,000,000)"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full col-span-1">
            <div className="label">
              <span className="label-text">Par Value</span>
            </div>
            <input
              type="text"
              value={formData.form_data.from_par_value}
              onChange={(e) => {
                handleOnChange(e, "Par Value");
              }}
              name="from_par_value"
              placeholder="ONE PESO (PHP1.00)"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full col-span-1">
            <div className="label">
              <span className="label-text">To (Pesos)</span>
            </div>
            <input
              type="text"
              value={formData.form_data.to}
              onChange={(e) => {
                handleOnChange(e, "Year");
              }}
              name="to"
              placeholder="FIVE MILLION PESOS (PHP5,000,000.00)"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full col-span-1">
            <div className="label">
              <span className="label-text">Divided Into (Shares)</span>
            </div>
            <input
              type="text"
              value={formData.form_data.to_divided_into}
              onChange={(e) => {
                handleOnChange(e, "Divided Into");
              }}
              name="to_divided_into"
              placeholder="FIVE MILLION SHARES (5,000,000)"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full col-span-1">
            <div className="label">
              <span className="label-text">Par Value</span>
            </div>
            <input
              type="text"
              value={formData.form_data.to_par_value}
              onChange={(e) => {
                handleOnChange(e, "Par Value");
              }}
              name="to_par_value"
              placeholder="ONE PESO (PHP1.00)"
              className="input input-bordered w-full"
            />
          </label>
        </div>

        <div className="divider">Appointees</div>

        <div className="w-full">
          <div className="form-control w-full">
            <div className="flex flex-row justify-between items-end">
              <span className="label-text">Appointees</span>
              <button
                className="btn btn-outline btn-primary btn-sm"
                onClick={() => {
                  setFormData({
                    ...formData,
                    form_data: {
                      ...formData.form_data,
                      appointees: [
                        ...formData.form_data.appointees,
                        appointeeState,
                      ],
                    },
                  });
                }}
              >
                Add row
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {formData.form_data.appointees.map((appointee, index) => {
                return (
                  <div
                    key={`appointee-${index}`}
                    className="flex flex-row gap-2 items-center"
                  >
                    <label className="form-control w-full">
                      {index == 0 && (
                        <div className="label font-bold">
                          <span className="label-text">Name</span>
                        </div>
                      )}
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        name="name"
                        value={appointee.name}
                        onChange={(e) => {
                          handleOnChangeAppointees(e, index);
                        }}
                      />
                    </label>

                    <label className="form-control w-full">
                      {index == 0 && (
                        <div className="label font-bold">
                          <span className="label-text line-clamp-1">
                            ID Number
                          </span>
                        </div>
                      )}
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        name="id_no"
                        value={appointee.id_no}
                        onChange={(e) => {
                          handleOnChangeAppointees(e, index);
                        }}
                      />
                    </label>

                    <label className="form-control w-full">
                      {index == 0 && (
                        <div className="label font-bold">
                          <span className="label-text line-clamp-1">
                            Date and Place Issued
                          </span>
                        </div>
                      )}
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        name="date_place_issued"
                        value={appointee.date_place_issued}
                        onChange={(e) => {
                          handleOnChangeAppointees(e, index);
                        }}
                      />
                    </label>

                    <button
                      className={`${index == 0 && "mt-8"} `}
                      onClick={(e) => {
                        const updatedAppointees =
                          formData.form_data.appointees.filter(
                            (_, _index) => index !== _index
                          );

                        setFormData({
                          ...formData,
                          form_data: {
                            ...formData.form_data,
                            appointees: updatedAppointees,
                          },
                        });
                      }}
                    >
                      {removeIconSVG}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="divider">Corporate Secretary</div>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            name="corp_sec"
            value={formData.form_data.corp_sec}
            onChange={(e) => {
              handleOnChange(e, "Name");
            }}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Address</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            name="corp_sec_address"
            value={formData.form_data.corp_sec_address}
            onChange={(e) => {
              handleOnChange(e, "Address");
            }}
          />
        </label>

        
      </div>
    </>
  );
};

export default PreEmptiveRightsForm;
