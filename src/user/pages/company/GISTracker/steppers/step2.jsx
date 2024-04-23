import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../../../store/GIS/GISFormSlice";

const step2 = () => {
  const formData = useSelector((state) => state.formGIS.formData);

  const [formStep2, setformStep2] = useState(formData);

  const [isUnderAMLA, setIsUnderAMLA] = useState(formData.is_under_amla);
  const [hasCompiled, setHasCompiled] = useState(
    formData.has_complied_with_the_requirements
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setformStep2(formData);
  }, []);

  useEffect(() => {
    setformStep2({ ...formStep2, is_under_amla: isUnderAMLA });
  }, [isUnderAMLA]);

  useEffect(() => {
    setformStep2({
      ...formStep2,
      has_complied_with_the_requirements: hasCompiled,
    });
  }, [hasCompiled]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setformStep2({
      ...formStep2,
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
            setformStep2(formData);
            setIsUnderAMLA(formData.is_under_amla);
            setHasCompiled(formData.has_complied_with_the_requirements);

            document.getElementById("step2FormModal").showModal();
          }}
        >
          {editSVG} Update Details
        </button>
      </div>
      <div className="flex flex-col w-[70%] mx-auto gap-10 my-5">
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                Describe nature of business{" "}
                <span className="text-red-500">*</span>
              </span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full input-sm"
              name="nature_of_business"
              value={formData.nature_of_business}
              disabled={true}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </label>
        </div>
        <div className="flex flex-row gap-10">
          <h1 className="w-[60%] text-start">
            Is the Corporation a covered person under the Anti Money Laundering
            Act (AMLA), as amended? (Rep. Acts.
          </h1>
          <div className="flex flex-row gap-5">
            <div className="form-control">
              <label className="label cursor-pointer flex gap-5">
                <span className="label-text">Yes</span>
                <input
                  type="radio"
                  name="radio-10-1"
                  className="radio checked:bg-blue-500"
                  value={true}
                  checked={formData.is_under_amla === true}
                  disabled={true}
                  onChange={(e) => {
                    // setIsUnderAMLA(true);
                  }}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer flex gap-5">
                <span className="label-text">No</span>
                <input
                  type="radio"
                  name="radio-10-1"
                  className="radio checked:bg-blue-500"
                  value={false}
                  checked={formData.is_under_amla === false}
                  disabled={true}
                  onChange={(e) => {
                    // setIsUnderAMLA(false);
                  }}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-10">
          <h1 className="w-[60%] text-start">
            Has the Corporation complied with the requirements on Customer Due
            Diligence (CDD) or Know Your Customer (KYC), record-keeping, and
            submission of reports under the AMLA, as amended, since the last
            filing of its GIS?
          </h1>
          <div className="flex flex-row gap-5">
            <div className="form-control">
              <label className="label cursor-pointer flex gap-5">
                <span className="label-text">Yes</span>
                <input
                  type="radio"
                  name="radio-11-1"
                  className="radio checked:bg-blue-500"
                  value={true}
                  checked={formData.has_complied_with_the_requirements === true}
                  disabled={true}
                  onChange={(e) => {
                    // setHasCompiled(true);
                  }}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer flex gap-5">
                <span className="label-text">No</span>
                <input
                  type="radio"
                  name="radio-11-1"
                  className="radio checked:bg-blue-500"
                  value={false}
                  checked={formData.has_complied_with_the_requirements === false}
                  disabled={true}
                  onChange={(e) => {
                    // setHasCompiled(false);
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <dialog id="step2FormModal" className="modal">
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
          <div className="flex flex-col gap-2">
            <div className="flex flex-col w-[70%] mx-auto gap-10 my-5">
              <div>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">
                      Describe nature of business{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full input-sm"
                    name="nature_of_business"
                    value={formStep2.nature_of_business}
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                  />
                </label>
              </div>
              <div className="flex flex-row gap-10">
                <h1 className="w-[60%] text-start">
                  Is the Corporation a covered person under the Anti Money
                  Laundering Act (AMLA), as amended? (Rep. Acts.
                </h1>
                <div className="flex flex-row gap-5">
                  <div className="form-control">
                    <label className="label cursor-pointer flex gap-5">
                      <span className="label-text">Yes</span>
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio checked:bg-blue-500"
                        value={true}
                        checked={isUnderAMLA === true}
                        onChange={(e) => {
                          setIsUnderAMLA(true);
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
                        checked={isUnderAMLA === false}
                        onChange={(e) => {
                          setIsUnderAMLA(false);
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-10">
                <h1 className="w-[60%] text-start">
                  Has the Corporation complied with the requirements on Customer
                  Due Diligence (CDD) or Know Your Customer (KYC),
                  record-keeping, and submission of reports under the AMLA, as
                  amended, since the last filing of its GIS?
                </h1>
                <div className="flex flex-row gap-5">
                  <div className="form-control">
                    <label className="label cursor-pointer flex gap-5">
                      <span className="label-text">Yes</span>
                      <input
                        type="radio"
                        name="radio-11"
                        className="radio checked:bg-blue-500"
                        value={true}
                        checked={hasCompiled === true}
                        onChange={(e) => {
                          setHasCompiled(true);
                        }}
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer flex gap-5">
                      <span className="label-text">No</span>
                      <input
                        type="radio"
                        name="radio-11"
                        className="radio checked:bg-blue-500"
                        value={false}
                        checked={hasCompiled === false}
                        onChange={(e) => {
                          setHasCompiled(false);
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="divider"></div>

          <div className="flex flex-row justify-between">
            <button
              onClick={(e) => {
                document.getElementById("step2FormModal").close();
              }}
              className="btn"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                dispatch(setFormData(formStep2));
                document.getElementById("step2FormModal").close();
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

export default step2;
