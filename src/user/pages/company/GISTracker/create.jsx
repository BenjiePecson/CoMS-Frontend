import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { showAlert, showToast } from "../../../../assets/global";
import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  PDFDownloadLink,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import axios from "axios";

// import ComponentStep3 from "./steppers/step3";
import imagePage1 from "../../../../assets/images/page1.jpg";

import Step1 from "./steppers/step1";
import Step2 from "./steppers/step2";
import Step3 from "./steppers/step3";
import Step4 from "./steppers/step4";
import Step5 from "./steppers/step5";
import Step6 from "./steppers/step6";
import Step7 from "./steppers/step7";

import { setFormData } from "../../../store/GIS/GISFormSlice";
import { gdrivefoldersState } from "../../../store/GIS/GISRecordSlice";
import { fetchUser } from "../../../store/user/UserSlice";

const create = () => {
  const { companyId, recordId } = useParams();

  const record = useSelector((state) => state.records.record);
  const selectedCompany = useSelector((state) => state.company.selectedCompany);
  const formData = useSelector((state) => state.formGIS.formData);
  const currentUser = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formRecord, setFormRecord] = useState(record);

  const [GDriveFolders, setGDriveFolders] = useState(gdrivefoldersState);

  const defaultState = {
    date_filed: "",
    // gdrivefolders: gdrivefoldersState,
    folder_id: "",
  };
  const [errors, setErrors] = useState(defaultState);
  const [formPublish, setFormPublish] = useState(defaultState);

  //#region Functions in Object Form Data

  // Function to update authCapitalStock in formData
  const updateAuthCapitalStock = (index, key, value) => {
    setFormData((prevState) => {
      const updatedCapitalStocks =
        prevState.auth_capital_stock.capital_stocks.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              [key]:
                key === "number_of_shares" || key === "amount"
                  ? parseFloat(value)
                  : value,
            };
          }
          return item;
        });

      const totalNumberOfShares = updatedCapitalStocks.reduce(
        (total, item) => total + parseFloat(item.number_of_shares || 0),
        0
      );

      const totalAmount = updatedCapitalStocks.reduce(
        (total, item) => total + parseFloat(item.amount || 0),
        0
      );

      return {
        ...prevState,
        auth_capital_stock: {
          ...prevState.auth_capital_stock,
          capital_stocks: updatedCapitalStocks,
          total_number_of_shares: totalNumberOfShares,
          total_amount: totalAmount,
        },
      };
    });
  };

  // Function to update subscribe_capital (filipino) in formData
  const updateSubscribeCapitalFilipino = (index, key, value) => {
    setFormData((prevState) => {
      // Update the filipino array
      const updatedFilipino = prevState.subscribe_capital.filipino.map(
        (item, i) => {
          if (i === index) {
            return {
              ...item,
              [key]: value,
            };
          }
          return item;
        }
      );

      // Recalculate subtotal and total values
      const subTotalNumberOfSharesFilipino = updatedFilipino.reduce(
        (total, item) => total + parseFloat(item.number_of_shares || 0),
        0
      );
      const subTotalAmountFilipino = updatedFilipino.reduce(
        (total, item) => total + parseFloat(item.amount || 0),
        0
      );
      const subTotalOwnershipFilipino = updatedFilipino.reduce(
        (total, item) => total + parseFloat(item.percent_of_ownership || 0),
        0
      );

      return {
        ...prevState,
        subscribe_capital: {
          ...prevState.subscribe_capital,
          filipino: updatedFilipino,
          sub_total_number_of_shares_filipino: subTotalNumberOfSharesFilipino,
          sub_total_amount_filipino: subTotalAmountFilipino,
          sub_total_ownership_filipino: subTotalOwnershipFilipino,
          // Recalculate total values based on the updated filipino array
          total_number_of_shares:
            subTotalNumberOfSharesFilipino +
            prevState.subscribe_capital.sub_total_number_of_shares_foreign,
          total_amount:
            subTotalAmountFilipino +
            prevState.subscribe_capital.sub_total_amount_foreign,
          total_percent_of_ownership:
            subTotalOwnershipFilipino +
            prevState.subscribe_capital.sub_total_ownership_foreign,
        },
      };
    });
  };

  // Function to update subscribe_capital (foreign) in formData
  const updateSubscribeCapitalForeign = (index, key, value) => {
    setFormData((prevState) => {
      // Update the filipino array
      const updatedForeign = prevState.subscribe_capital.foreign.map(
        (item, i) => {
          if (i === index) {
            return {
              ...item,
              [key]: value,
            };
          }
          return item;
        }
      );

      // Recalculate subtotal and total values
      const subTotalNumberOfSharesForeign = updatedForeign.reduce(
        (total, item) => total + parseFloat(item.number_of_shares || 0),
        0
      );
      const subTotalAmountForeign = updatedForeign.reduce(
        (total, item) => total + parseFloat(item.amount || 0),
        0
      );
      const subTotalOwnershipForeign = updatedForeign.reduce(
        (total, item) => total + parseFloat(item.percent_of_ownership || 0),
        0
      );

      return {
        ...prevState,
        subscribe_capital: {
          ...prevState.subscribe_capital,
          foreign: updatedForeign,
          sub_total_number_of_shares_foreign: subTotalNumberOfSharesForeign,
          sub_total_amount_foreign: subTotalAmountForeign,
          sub_total_ownership_foreign: subTotalOwnershipForeign,
          // Recalculate total values based on the updated filipino array
          total_number_of_shares:
            subTotalNumberOfSharesForeign +
            prevState.subscribe_capital.sub_total_number_of_shares_filipino,
          total_amount:
            subTotalAmountForeign +
            prevState.subscribe_capital.sub_total_amount_filipino,
          total_percent_of_ownership:
            subTotalOwnershipForeign +
            prevState.subscribe_capital.sub_total_ownership_filipino,
        },
      };
    });
  };

  // Function to update paid_up_capital (filipino) in formData
  const updatePaidUpCapitalFilipino = (index, key, value) => {
    setFormData((prevState) => {
      // Update the filipino array
      const updatedFilipino = prevState.paid_up_capital.filipino.map(
        (item, i) => {
          if (i === index) {
            return {
              ...item,
              [key]: value,
            };
          }
          return item;
        }
      );

      // Recalculate subtotal and total values
      const subTotalNumberOfSharesFilipino = updatedFilipino.reduce(
        (total, item) => total + parseFloat(item.number_of_shares || 0),
        0
      );
      const subTotalAmountFilipino = updatedFilipino.reduce(
        (total, item) => total + parseFloat(item.amount || 0),
        0
      );
      const subTotalOwnershipFilipino = updatedFilipino.reduce(
        (total, item) => total + parseFloat(item.percent_of_ownership || 0),
        0
      );

      return {
        ...prevState,
        paid_up_capital: {
          ...prevState.paid_up_capital,
          filipino: updatedFilipino,
          sub_total_number_of_shares_filipino: subTotalNumberOfSharesFilipino,
          sub_total_amount_filipino: subTotalAmountFilipino,
          sub_total_ownership_filipino: subTotalOwnershipFilipino,
          // Recalculate total values based on the updated filipino array
          total_number_of_shares:
            subTotalNumberOfSharesFilipino +
            prevState.paid_up_capital.sub_total_number_of_shares_foreign,
          total_amount:
            subTotalAmountFilipino +
            prevState.paid_up_capital.sub_total_amount_foreign,
          total_percent_of_ownership:
            subTotalOwnershipFilipino +
            prevState.paid_up_capital.sub_total_ownership_foreign,
        },
      };
    });
  };

  // Function to update subscribe_capital (foreign) in formData
  const updatePaidUpCapitalForeign = (index, key, value) => {
    setFormData((prevState) => {
      // Update the filipino array
      const updatedForeign = prevState.paid_up_capital.foreign.map(
        (item, i) => {
          if (i === index) {
            return {
              ...item,
              [key]: value,
            };
          }
          return item;
        }
      );

      // Recalculate subtotal and total values
      const subTotalNumberOfSharesForeign = updatedForeign.reduce(
        (total, item) => total + parseFloat(item.number_of_shares || 0),
        0
      );
      const subTotalAmountForeign = updatedForeign.reduce(
        (total, item) => total + parseFloat(item.amount || 0),
        0
      );
      const subTotalOwnershipForeign = updatedForeign.reduce(
        (total, item) => total + parseFloat(item.percent_of_ownership || 0),
        0
      );

      return {
        ...prevState,
        paid_up_capital: {
          ...prevState.paid_up_capital,
          foreign: updatedForeign,
          sub_total_number_of_shares_foreign: subTotalNumberOfSharesForeign,
          sub_total_amount_foreign: subTotalAmountForeign,
          sub_total_ownership_foreign: subTotalOwnershipForeign,
          // Recalculate total values based on the updated filipino array
          total_number_of_shares:
            subTotalNumberOfSharesForeign +
            prevState.paid_up_capital.sub_total_number_of_shares_filipino,
          total_amount:
            subTotalAmountForeign +
            prevState.paid_up_capital.sub_total_amount_filipino,
          total_percent_of_ownership:
            subTotalOwnershipForeign +
            prevState.paid_up_capital.sub_total_ownership_filipino,
        },
      };
    });
  };

  // Function to update directors_or_officers in formData
  const updateDirectorsOrOfficers = (index, key, value) => {
    setFormData((prevState) => {
      const updatedDirectorsOrOfficers = prevState.directors_or_officers.map(
        (item, i) => {
          if (i === index) {
            return {
              ...item,
              [key]: value,
            };
          }
          return item;
        }
      );

      return {
        ...prevState,
        directors_or_officers: updatedDirectorsOrOfficers,
      };
    });
  };

  // Function to update stock_holders_information in formData
  const updateStockHoldersInformation = (index, key, value) => {
    setFormData((prevState) => {
      const updatedStockHoldersInformation =
        prevState.stock_holders_information.information.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              [key]: value,
            };
          }
          return item;
        });

      return {
        ...prevState,
        stock_holders_information: {
          ...prevState.stock_holders_information.information,
          information: updatedStockHoldersInformation,
          // total_amount: 0,
          // total_percent_of_ownership: 0,
        },
      };
    });
  };

  // Function to update beneficial_ownership_declaration in formData
  const updateBeneficialOwnershipDeclaration = (index, key, value) => {
    setFormData((prevState) => {
      const updatedBeneficialOwnershipDeclaration =
        prevState.beneficial_ownership_declaration.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              [key]: value,
            };
          }
          return item;
        });

      return {
        ...prevState,
        beneficial_ownership_declaration: updatedBeneficialOwnershipDeclaration,
      };
    });
  };

  // Function to format number with comma for thousands and above
  const formatNumberWithComma = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  //#endregion

  //#region Other functions
  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const stepStyle = (stepNumber) => {
    if (step >= stepNumber) {
      return "step step-primary";
    }
    return "step";
  };

  const btnCancelText = () => {
    if (step == 1) return "Cancel";
    return "Back";
  };

  const btnNextText = () => {
    if (step == 7) return "Publish";
    return "Next";
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

  const updateFormData = async () => {
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
  //#endregion

  //#region toggle functions
  const toggleDownloadPDF = () => {
    console.log("Download PDF");
  };

  const toggleSaveAsDraft = async () => {
    let status = "error";
    let message = "Failed to save as draft. Please try again.";

    try {
      let form = formRecord;
      form.status = "Saved as Draft";
      let response = await axios.post(`/record/`, form);

      const data = response.data;
      status = "success";
      message = "Saved as Draft.";
      navigate(`/company/${companyId}/gis-tracker`);
    } catch (error) {
      console.log(error);
    } finally {
      showAlert(status, message);
    }
  };

  const toggleSubmit = () => {
    if (step >= 1 && step < 7) {
      setStep(step + 1);
      scrollToTop();
    }

    setFormRecord({ ...formRecord, draftingInput: formData });

    if (step === 7) {
      setFormPublish({ ...formPublish, folder_id: formRecord.folder_id });
      document.getElementById("publishModal").showModal();
    }
  };
  //#endregion

  const handlePublishButton = async (ev) => {
    ev.preventDefault();
    let status = "error";
    let message = "Failed to update the record.";
    try {
      let form = formRecord;
      form.status = "Completed";
      form.date_filed = formPublish.date_filed;
      form.folder_id = formPublish.folder_id;
      // form.gdrivefolders = formPublish.gdrivefolders;

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

  const handleOnChange = (ev) => {
    const { name, value } = ev.target;
    if (name != "date_filed" && name != "folder_id") {
      let gdrivefolders = { ...formPublish.gdrivefolders, [name]: value };
      setFormPublish({ ...formPublish, gdrivefolders });
    } else {
      setFormPublish({ ...formPublish, [name]: value });
    }
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
      </>
    );
  };

  //#region use effects

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    dispatch(fetchUser(token));
  }, []);

  useEffect(() => {
    //setformrecord
    if (recordId !== undefined) {
      //record exists
      updateFormData();
    } else {
      //record does not exists
      setFormRecord({
        ...formRecord,
        companyId: companyId,
        createdBy: `${currentUser.first_name} ${currentUser.last_name}`,
        draftingInput: formData,
      });

      if (formData.corporate_name === "") {
        dispatch(
          setFormData({
            ...formData,
            ...selectedCompany.latestGIS,
            // corporate_name: selectedCompany.companyName,
            // sec_registration_number: selectedCompany.secNumber,
            // corporate_tin: selectedCompany.corporateTin,
            // date_registered: selectedCompany.dateRegistered,
          })
        );
      }
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (formRecord.companyId !== "") {
      setFormRecord({ ...formRecord, draftingInput: formData });
    }
  }, [formData]);
  //#endregion

  return (
    <>
      <div className="flex flex-col my-5">
        <div className="bg-white w-full rounded-xl shadow-lg">
          <div className="flex flex-col items-center justify-center py-5">
            <ul className="steps steps-horizontal w-full z-0">
              <li
                className={stepStyle(1)}
                onClick={() => {
                  setStep(1);
                }}
              ></li>
              <li
                className={stepStyle(2)}
                onClick={() => {
                  setStep(2);
                }}
              ></li>
              <li
                className={stepStyle(3)}
                onClick={() => {
                  setStep(3);
                }}
              ></li>
              <li
                className={stepStyle(4)}
                onClick={() => {
                  setStep(4);
                }}
              ></li>
              <li
                className={stepStyle(5)}
                onClick={() => {
                  setStep(5);
                }}
              ></li>
              <li
                className={stepStyle(6)}
                onClick={() => {
                  setStep(6);
                }}
              ></li>
              <li
                className={stepStyle(7)}
                onClick={() => {
                  setStep(7);
                }}
              ></li>
            </ul>
          </div>
          <hr />
          <div className="p-5 text-center">
            {step <= 6 && (
              <div>
                <h1 className="poppins-semibold text-[20px]">
                  General Information Sheet
                </h1>
              </div>
            )}

            <div className="w-full flex-col items-center justify-center my-5">
              {step === 1 && <Step1 />}
              {step === 2 && <Step2 />}
              {step === 3 && <Step3 />}
              {step === 4 && <Step4 />}
              {step === 5 && <Step5 />}
              {step === 6 && <Step6 />}
              {step === 7 && <Step7 />}
            </div>

            <div className="w-full flex justify-between">
              <button
                onClick={() => {
                  if (step == 1) {
                    navigate(-1);
                  } else {
                    if (step >= 1 && step <= 7) {
                      setStep(step - 1);
                      scrollToTop();
                    }
                  }
                }}
                className="btn btn-error text-white"
              >
                {btnCancelText()}
              </button>
              <div className="flex flex-row gap-10">
                {/* <PDFDownloadLink
                className={
                  `btn bg-primary text-white ` + (step != 7 && "hidden")
                }
                fileName={`${formData.corporate_name} GIS ${formData.year}`}
                document={GISFormDocument}
              >
                Download PDF
              </PDFDownloadLink> */}
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
                  onClick={() => {
                    toggleSubmit();
                  }}
                >
                  {btnNextText()}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {dialogComponents()}
    </>
  );
};

export default create;
