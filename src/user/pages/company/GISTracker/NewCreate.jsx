import React, { useEffect, useState } from "react";

import Step1 from "./steppers/step1";
import Step2 from "./steppers/step2";
import Step3 from "./steppers/step3";
import Step4 from "./steppers/step4";
import Step5 from "./steppers/step5";
import Step6 from "./steppers/step6";
import Step7 from "./steppers/step7";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../store/user/UserSlice";
import { useNavigate, useParams } from "react-router-dom";
import { setFormData } from "../../../store/GIS/GISFormSlice";
import axios from "axios";
import { showAlert } from "../../../../assets/global";

const warningSVG = (
  <svg
    width="91"
    height="91"
    viewBox="0 0 91 91"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M45.6423 23.8995V50.18M45.6423 67.7447L45.6861 67.6961M45.6422 89.6016C69.8546 89.6016 89.4829 69.9911 89.4829 45.8008C89.4829 21.6103 69.8546 2 45.6422 2C21.4297 2 1.80151 21.6103 1.80151 45.8008C1.80151 69.9911 21.4297 89.6016 45.6422 89.6016Z"
      stroke="#F38F33"
      strokeWidth="2.62921"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NewCreate = () => {
  const listOfSteps = [
    "General Information",
    "Capital Structure",
    "Beneficial Ownership Declaration",
    "Preview",
  ];
  const { companyId, recordId } = useParams();

  const [stepSelected, setStepSelected] = useState(0);

  const record = useSelector((state) => state.records.record);
  const formData = useSelector((state) => state.formGIS.formData);
  const selectedCompany = useSelector((state) => state.company.selectedCompany);
  const currentUser = useSelector((state) => state.user.user);

  const [formRecord, setFormRecord] = useState(record);

  const defaultState = {
    date_filed: "",
    // gdrivefolders: gdrivefoldersState,
    folder_id: "",
  };
  const [errors, setErrors] = useState(defaultState);
  const [formPublish, setFormPublish] = useState(defaultState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePublishButton = async (ev) => {
    ev.preventDefault();
    let status = "error";
    let message = "Failed to update the record.";
    try {
      // let form = formRecord;
      // form.status = "Completed";
      // form.date_filed = formPublish.date_filed;
      // form.folder_id = formPublish.folder_id;
      // // form.gdrivefolders = formPublish.gdrivefolders;

      // console.log(form);

      let form = formRecord;
      form.status = "Completed";
      form.draftingInput = formData;
      form.date_filed = formPublish.date_filed;
      form.folder_id = formPublish.folder_id;
      // form.gdrivefolders = formPublish.gdrivefolders;
      const name = `${currentUser.first_name} ${currentUser.last_name}`;
      form.modified_by = name;

      let response = await axios.post(`/record`, form);
      if (response.status === 200) {
        status = "success";
        message = "Submitted Successfully.";
        navigate(`/company/${companyId}/gis-tracker`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      showToast(status, message);
      document.getElementById("publishModal").close();
    }
  };

  const toggleSaveAsDraft = async () => {
    let status = "error";
    let message = "Failed to save as draft. Please try again.";

    try {
      let form = formRecord;
      form.status = "Saved as Draft";

      const name = `${currentUser.first_name} ${currentUser.last_name}`;
      form.modified_by = name;

      let response = await axios.post(`/record/`, form);

      if (response.status === 200) {
        status = "success";
        message = "Saved as Draft.";
        navigate(`/company/${companyId}/gis-tracker`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      showAlert(status, message);
    }
  };

  const handleOnChange = (ev) => {
    const { name, value } = ev.target;
    if (name != "date_filed" && name != "folder_id") {
      let gdrivefolders = { ...formPublish.gdrivefolders, [name]: value };
      setFormPublish({ ...formPublish, gdrivefolders });
    } else {
      setFormPublish({ ...formPublish, [name]: value });
    }
  };

  const handleNextBtn = () => {
    if (stepSelected >= 0 && stepSelected < listOfSteps.length - 1) {
      setStepSelected(stepSelected + 1);
    }

    if (stepSelected === listOfSteps.length - 1) {
      document.getElementById("confirmationModal").showModal();
      return;
    }

    scrollToTop();
  };

  const handleBackBtn = () => {
    if (stepSelected > 0 && stepSelected < listOfSteps.length) {
      setStepSelected(stepSelected - 1);
    }

    if (stepSelected == 0) {
      navigate(`/company/${companyId}/gis-tracker/`);
    }
    scrollToTop();
  };

  const steppersComponent = () => {
    const divider = (isDone = false) => {
      return (
        <div
          className={`h-[2px] ${
            isDone ? "bg-primary" : "bg-gray-300"
          } rounded-full  w-10`}
        ></div>
      );
    };

    const div = listOfSteps.map((step, index) => {
      // Create a step div with the current step
      const stepDiv = (
        <div
          key={`steps-${index}`}
          className="flex flex-col items-center h-full justify-center gap-2 cursor-pointer"
          onClick={() => {
            setStepSelected(index);
            scrollToTop();
          }}
        >
          {stepSelected == index ? (
            <div className="avatar placeholder">
              <div className="rounded-full bg-primary text-neutral-content w-6">
                <span className="text-xs">{index + 1}</span>
              </div>
            </div>
          ) : stepSelected > index ? (
            <div className="avatar placeholder">
              <div className="rounded-full bg-primary text-neutral-content w-6">
                <span className="text-xs">✓</span>
              </div>
            </div>
          ) : (
            <div className="avatar placeholder">
              <div className="rounded-full border border-primary text-primary w-6">
                <span className="text-xs">{index + 1}</span>
              </div>
            </div>
          )}
          <span
            className={`whitespace-nowrap ${
              stepSelected == index && "font-bold"
            }`}
          >
            {step}
          </span>
        </div>
      );

      // If it's not the last item, return the step with a divider
      if (index < listOfSteps.length - 1) {
        return (
          <>
            {stepDiv}
            {divider(stepSelected > index)}
          </>
        );
      }

      return stepDiv;
    });

    return div;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const informationComponent = (step) => {
    return (
      <div className="flex flex-col px-2 py-5 lg:p-5 gap-5 w-full h-full">
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-1 w-full gap-3">
            <div className="flex flex-col mb-5">
              <h1 className="poppins-normal text-sm">STEP ONE</h1>
              <h1 className="poppins-bold text-lg">{listOfSteps[step]}</h1>
            </div>

            <div className="flex flex-col gap-5">
              <Step1 />

              <div className="divider"></div>

              <Step2 />

              <div className="divider"></div>

              <Step4 />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const capitalStructureComponent = (step) => {
    return (
      <>
        <div className="flex flex-col px-2 py-5 lg:p-5 gap-5 w-full h-full">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-1 w-full">
              <div className="flex flex-col mb-5">
                <h1 className="poppins-normal text-sm">STEP TWO</h1>
                <h1 className="poppins-bold text-lg">{listOfSteps[step]}</h1>
              </div>

              <div className="flex flex-col gap-5">
                <Step3 />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const bodComponent = (step) => {
    return (
      <>
        <div className="flex flex-col px-2 py-5 lg:p-5 gap-5 w-full h-full">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-1 w-full gap-3">
              <div>
                <h1 className="poppins-normal text-sm">STEP THREE</h1>
                <h1 className="poppins-bold text-lg">{listOfSteps[step]}</h1>
              </div>

              <div className="flex flex-col gap-5">
                <Step6 />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const previewComponent = (step) => {
    return (
      <>
        <div className="flex flex-col px-2 py-5 lg:p-5 gap-5 w-full h-full">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-1 w-full gap-3">
              <div>
                <h1 className="poppins-normal text-sm">STEP FOUR</h1>
                <h1 className="poppins-bold text-lg">{listOfSteps[step]}</h1>
              </div>

              <div className="flex flex-col gap-5">
                <Step7 />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const displayComponent = (step) => {
    if (step == 1) {
      return capitalStructureComponent(step);
    }
    if (step == 2) {
      return bodComponent(step);
    }
    if (step == 3) {
      return previewComponent(step);
    }
    return informationComponent(step);
  };

  const dialogComponents = () => {
    return (
      <>
        {/* Publish Modal */}
        <dialog id="publishModal" className="modal">
          <div className="modal-box">
            <div className="flex flex-row justify-between py-4">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                  ✕
                </button>
              </form>
            </div>
            <form onSubmit={handlePublishButton}>
              <div className="flex flex-col gap-5">
                {/* <h1 className="poppins-semibold text-md">
                Update Google Drive Folder ID
              </h1> */}
                {/* 
                <label className="form-control w-full">
                  <div className="label">
                    <span className="poppins-regular text-[12px]">
                      Drafted GIS File Folder ID{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.gdrivefolders.drafted && `input-error`
                    }`}
                    name="drafted"
                    value={formPublish.gdrivefolders.drafted}
                    onChange={handleOnChange}
                  />
                  {errors.gdrivefolders.drafted && (
                    <span className="text-[12px] text-red-500">
                      {errors.gdrivefolders.drafted}
                    </span>
                  )}
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="poppins-regular text-[12px]">
                      Signed GIS File Folder ID{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.gdrivefolders.signed && `input-error`
                    }`}
                    name="signed"
                    value={formPublish.gdrivefolders.signed}
                    onChange={handleOnChange}
                  />
                  {errors.gdrivefolders.signed && (
                    <span className="text-[12px] text-red-500">
                      {errors.gdrivefolders.signed}
                    </span>
                  )}
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="poppins-regular text-[12px]">
                      Notarized GIS File Folder ID{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.gdrivefolders.notarized && `input-error`
                    }`}
                    name="notarized"
                    value={formPublish.gdrivefolders.notarized}
                    onChange={handleOnChange}
                  />
                  {errors.gdrivefolders.notarized && (
                    <span className="text-[12px] text-red-500">
                      {errors.gdrivefolders.notarized}
                    </span>
                  )}
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="poppins-regular text-[12px]">
                      SEC Filed GIS Folder ID{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.gdrivefolders.filed && `input-error`
                    }`}
                    name="filed"
                    value={formPublish.gdrivefolders.filed}
                    onChange={handleOnChange}
                  />
                  {errors.gdrivefolders.filed && (
                    <span className="text-[12px] text-red-500">
                      {errors.gdrivefolders.filed}
                    </span>
                  )}
                </label>

                 */}

                <label className="form-control w-full">
                  <div className="label">
                    <span className="poppins-regular text-[12px]">
                      SEC Filed GIS Folder ID{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    className={`input input-bordered w-full ${
                      errors.folder_id && `input-error`
                    }`}
                    name="folder_id"
                    value={formPublish.folder_id}
                    onChange={handleOnChange}
                  />
                  {errors.folder_id && (
                    <span className="text-[12px] text-red-500">
                      {errors.folder_id}
                    </span>
                  )}
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="poppins-regular text-[12px]">
                      Date Filed
                      <span className="text-red-500">*</span>
                    </span>
                  </div>
                  <input
                    type="date"
                    className={`input input-bordered w-full ${
                      errors.date_filed && `input-error`
                    }`}
                    name="date_filed"
                    value={formPublish.date_filed}
                    onChange={handleOnChange}
                  />
                  {errors.date_filed && (
                    <span className="text-[12px] text-red-500">
                      {errors.date_filed}
                    </span>
                  )}
                </label>

                <button className="btn bg-primary text-white" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </dialog>

        {/* Confirmation Modal */}
        <dialog id="confirmationModal" className="modal">
          <div className="modal-box w-full md:w-1/2 lg:w-1/3  max-w-5xl">
            <div className="flex flex-col gap-5 items-center">
              {warningSVG}

              <h1 className="poppins-bold text-[20px]">Are you sure?</h1>

              <p className="poppins-regular text-[15px]">
                You want to proceed to the next step?
              </p>

              <div className="flex flex-row gap-10">
                <button
                  className="btn bg-primary text-white btn-sm py-5 flex flex-col justify-center items-center"
                  onClick={async (e) => {
                    let status = "error";
                    let message = "Failed to publish the record.";
                    try {
                      let form = formRecord;
                      form.status = "Pending for Approval";
                      form.draftingInput = formData;
                      const name = `${currentUser.first_name} ${currentUser.last_name}`;
                      form.modified_by = name;

                      let response = await axios.post(`/record`, form);
                      if (response.status === 200) {
                        status = "success";
                        message = "Submitted Successfully.";
                        navigate(`/company/${companyId}/gis-tracker`);
                      }
                    } catch (error) {
                      console.log(error);
                    } finally {
                      showToast(status, message);
                    }
                  }}
                >
                  Yes, proceed!
                </button>

                <button
                  className="btn bg-[#CDCDCD] btn-sm py-5 flex flex-col justify-center items-center px-5"
                  onClick={(e) => {
                    document.getElementById("confirmationModal").close();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </>
    );
  };

  const extractDirectorDetails = (individual) => {
    const {
      given_name,
      middle_name,
      surname,
      ext_name,
      address,
      individuals_id,
      nationality,
      tax_identification_no,
    } = individual;

    const middlename =
      middle_name != "" ? `${middle_name[0].toUpperCase()}.` : "";
    const name = `${given_name} ${middlename} ${surname} ${ext_name}`;

    return {
      name,
      current_residual_address: address,
      individuals_id,
      nationality,
      tax_id_number: tax_identification_no,
    };
  };

  const updateFormData = async (selected_company) => {
    try {
      let response = await axios.get(`/record/record/${recordId}`);
      const data = response.data;
      let individuals = await axios.get(`/individuals/${companyId}`);
      const updateDirectorsDetails =
        data.draftingInput.directors_or_officers.map((director) => {
          const director_in_list = individuals.data.filter(
            (u) => u.individuals_id == director.individuals_id
          );
          if (director_in_list.length > 0) {
            return {
              ...director,
              ...extractDirectorDetails(director_in_list[0]),
            };
          } else {
            return { ...director, individuals_id: "" };
          }
        });

      let newFormData = {
        ...data.draftingInput,
        date_registered: selected_company.dateRegistered,
        directors_or_officers: updateDirectorsDetails,
      };

      if (data.draftingInput.affiliations != undefined) {
        newFormData = {
          ...newFormData,
          affiliations: data.draftingInput.affiliations,
        };
      } else {
        newFormData = {
          ...newFormData,
          affiliations: formData.affiliations,
        };
      }

      dispatch(setFormData(newFormData));

      setFormRecord({
        ...formRecord,
        ...data,
        draftingInput: newFormData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    dispatch(fetchUser(token));
  }, []);

  useEffect(() => {
    //setformrecord
    if (recordId !== undefined) {
      //record exists
      updateFormData(selectedCompany);
    } else {
      //record does not exists
      setFormRecord({
        ...formRecord,
        companyId: companyId,
        createdBy: `${currentUser.first_name} ${currentUser.last_name}`,
        draftingInput: formData,
      });

      if (formData.corporate_name === "") {
        if (Object.keys(selectedCompany.latestGIS).length > 0) {
          let { date_registered, ...rest } = selectedCompany.latestGIS;

          dispatch(
            setFormData({
              ...formData,
              ...rest,
              corporate_name: selectedCompany.companyName,
              sec_registration_number: selectedCompany.secNumber,
              corporate_tin: selectedCompany.corporateTin,
              date_registered: selectedCompany.dateRegistered,
            })
          );
        } else {
          dispatch(
            setFormData({
              ...formData,
              corporate_name: selectedCompany.companyName,
              sec_registration_number: selectedCompany.secNumber,
              corporate_tin: selectedCompany.corporateTin,
              date_registered: selectedCompany.dateRegistered,
            })
          );
        }
      }
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (formRecord.companyId !== "") {
      setFormRecord({ ...formRecord, draftingInput: formData });
    }
    console.log(formData);
  }, [formData]);

  return (
    <>
      <div className="grid grid-cols-1 w-full place-items-start gap-5 h-full pb-5">
        <div className="flex flex-col rounded-2xl w-full bg-white shadow-sm border h-full">
          <div className="border-b-2">
            <div className="overflow-x-auto mx-10 ">
              <div className="flex flex-row gap-5 py-5 rounded-t-2xl items-center justify-start md:justify-center w-full text-sm">
                {steppersComponent()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center justify-center w-full place-items-center h-full">
            {displayComponent(stepSelected)}
          </div>
          <div className="border-t-2">
            <div className="grid grid-cols-1">
              <div className="flex flex-row justify-between p-3">
                <button
                  className="btn btn-ghost hover:bg-red-300"
                  onClick={handleBackBtn}
                >
                  {stepSelected == 0 ? "Cancel" : "Back"}
                </button>
                <div className="flex flex-row gap-10">
                  <button
                    className={`btn bg-primary text-white ${
                      stepSelected === listOfSteps.length - 1 &&
                      formData.year < 2023
                        ? ""
                        : "hidden"
                    }`}
                    onClick={() => {
                      // toggleSubmit();
                      document.getElementById("publishModal").showModal();
                    }}
                  >
                    Mark as Completed
                  </button>
                  <button
                    // className={
                    //   `btn bg-primary text-white ` + (step != 7 && "hidden")
                    // }
                    className={`btn bg-primary text-white `}
                    onClick={() => {
                      toggleSaveAsDraft();
                    }}
                  >
                    Save as Draft
                  </button>
                  <button
                    className="btn bg-primary text-white"
                    onClick={handleNextBtn}
                  >
                    {listOfSteps.length - 1 == stepSelected
                      ? "Publish"
                      : "Next"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {dialogComponents()}
    </>
  );
};

export default NewCreate;
