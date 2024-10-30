import React from "react";
import { appointeeState } from "../../../../store/documentdrafting/DocumentDraftingSlice";

const NoDisputeForm = ({
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

export default NoDisputeForm;
