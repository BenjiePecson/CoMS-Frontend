import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { showAlert } from "../../../../assets/global";
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
import Input from "../../../components/InputComponent";
import DataTable from "react-data-table-component";

// import ComponentStep3 from "./steppers/step3";
import imagePage1 from "../../../../assets/images/page1.jpg";

import Step1 from "./steppers/step1";
import Step2 from "./steppers/step2";
import Step3 from "./steppers/step3";
import Step4 from "./steppers/step4";
import Step5 from "./steppers/step5";
import Step6 from "./steppers/step6";

import { setFormData } from "../../../store/GIS/GISFormSlice";

// import { setFormData } from "../../../store/GIS/GISFormSlice";

const authCapitalStock = {
  type_of_shares: "",
  number_of_shares: "",
  par_or_stated_value: "",
  amount: "",
};

const filipinoSubscribeCapital = {
  number_of_stock_holders: "",
  types_of_shares: "",
  number_of_shares: "",
  number_of_shares_in_hands: "",
  par_or_stated_value: "",
  amount: "",
  percent_of_ownership: "",
};

const foreignSubscribeCapital = {
  nationality: "",
  number_of_stock_holders: "",
  types_of_shares: "",
  number_of_shares: "",
  number_of_shares_in_hands: "",
  par_or_stated_value: "",
  amount: "",
  percent_of_ownership: "",
};

const subscribeCapital = {
  filipino: [filipinoSubscribeCapital],
  foreign: [foreignSubscribeCapital],
  sub_total_number_of_shares_filipino: 0,
  sub_total_amount_filipino: 0,
  sub_total_ownership_filipino: 0,
  sub_total_number_of_shares_foreign: 0,
  sub_total_amount_foreign: 0,
  sub_total_ownership_foreign: 0,
  total_number_of_shares: 0,
  total_amount: 0,
  total_percent_of_ownership: 0,
  percentage_of_foreign_equity: 0,
};

const paidUpCapital = {
  filipino: [filipinoSubscribeCapital],
  foreign: [foreignSubscribeCapital],
  sub_total_number_of_shares_filipino: 0,
  sub_total_amount_filipino: 0,
  sub_total_ownership_filipino: 0,
  sub_total_number_of_shares_foreign: 0,
  sub_total_amount_foreign: 0,
  sub_total_ownership_foreign: 0,
  total_number_of_shares: 0,
  total_amount: 0,
  total_percent_of_ownership: 0,
};

const directorsOrOfficers = {
  name_or_current_residual_address: "",
  nationality: "",
  incorporator: "",
  board: "",
  gender: "",
  stock_holder: "",
  officer: "",
  executive_committe: "",
  tax_id_number: "",
};

const beneficialOwnershipDeclaration = {
  complete_name: "",
  specific_residual_address: "",
  nationality: "",
  date_of_birth: "",
  tax_id_number: "",
  percent_of_ownership: "",
  type_of_beneficial_owner: "",
  category_of_beneficial_ownership: "",
};

const stockholdersInformation = {
  name_etc: "",
  type: "",
  number: "",
  amount: "",
  percent_of_ownership: "",
  amount_paid: "",
  tax_id_number: "",
  total_number: 0,
  total_amount: 0,
};

const formDataInitial = {
  year: "",
  date_registered: "",
  official_email_address: "",
  corporate_name: "",
  fiscal_year_end: "",
  alternate_email_address: "",
  business_or_trade_name: "",
  corporate_tin: "",
  official_mobile_number: "",
  sec_registration_number: "",
  website_url_address: "N/A",
  name_of_external_auditor: "",
  date_of_annual_meeting: "",
  fax_number: "N/A",
  sec_accreditation_number: "",
  actual_date_of_annual_meeting: "",
  alternate_phone_number: "",
  industry_classification: "",
  complete_principal_office_address: "",
  telephone_number: "",
  geographical_code: "N/A",
  is_under_amla: false,
  has_complied_with_the_requirements: false,
  auth_capital_stock: {
    capital_stocks: [authCapitalStock],
    total_number_of_shares: 0,
    total_amount: 0,
  },
  subscribe_capital: subscribeCapital,
  paid_up_capital: paidUpCapital,
  directors_or_officers: [directorsOrOfficers],
  total_number_of_stockholders: "",
  number_of_stockholders_with_more_shares_each: "",
  total_assets_based_on_latest_audited: "",
  stock_holders_information: {
    information: [stockholdersInformation],
    total_amount: 0,
    total_percent_of_ownership: 0,
  },
  corporate_secretary: "",
  beneficial_ownership_declaration: [beneficialOwnershipDeclaration],
};

const create = () => {
  const { companyId } = useParams();
  const { recordId } = useParams();

  const record = useSelector((state) => state.records.record);
  const selectedCompany = useSelector((state) => state.company.selectedCompany);
  const formData = useSelector((state) => state.formGIS.formData);

  const dispatch = useDispatch();

  // const company = useSelector((state) => state.company.company);
  // const status = useSelector((state) => state.company.status);
  // const error = useSelector((state) => state.company.error);

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  // const [formData, setFormData] = useState(formDataInitial);
  const [isUnderAMLA, setIsUnderAMLA] = useState(formData.is_under_amla);
  const [hasCompiled, setHasCompiled] = useState(
    formData.has_complied_with_the_requirements
  );

  const [formRecord, setFormRecord] = useState(record);

  // const [isEnable, setIsEnable] = useState(true);
  const [formDataEnabled, setFormDataEnabled] = useState(formDataInitial);

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

  const subscribedCapitalFilipinoColumn = [
    {
      name: "Filipino",
      selector: (row) => {},
    },
    {
      name: "Number of Stock Holders",
      selector: (row) => row.number_of_stock_holders,
    },
    {
      name: "Types of Shares",
      selector: (row) => row.types_of_shares,
    },
    {
      name: "Number of Shares",
      selector: (row) => row.number_of_shares,
    },
    {
      name: "Number of Shares in the Hands of the Public",
      selector: (row) => row.number_of_shares_in_hands,
    },
    {
      name: "Par/Stated Value",
      selector: (row) => row.par_or_stated_value,
    },
    {
      name: "Amount (PhP)",
      selector: (row) => row.amount,
    },
    {
      name: "% of Ownership",
      selector: (row) => `${row.percent_of_ownership}%`,
    },
  ];

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

  const saveSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path
        fillRule="evenodd"
        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const isEnable = (input) => {
    if (typeof input == "string" || !input) return true;

    return false;
  };

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
    if (step == 7) return "Submit";
    return "Next";
  };

  const updateFormData = async () => {
    try {
      let response = await axios.get(`/record/${recordId}`);
      const data = response.data[0];
      dispatch(setFormData(data.draftingInput));
    } catch (error) {
      console.log(error);
    }
  };

  const handleIconButton = (key, isTrue) => {
    setFormDataEnabled({
      ...formDataEnabled,
      [key]: isTrue ? true : false,
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //#endregion

  //#region toggle functions
  const toggleDownloadPDF = () => {
    console.log("Download PDF");
  };
  const toggleSaveAsDraft = async () => {
    // setFormRecord();

    console.log(formData);
    return;

    let status = "error";
    let message = "Failed to save as draft. Please try again.";

    try {
      let form = formRecord;
      form.status = "Saved as Draft";
      let response = await axios.post(`/record`, form);

      const data = response.data;
      console.log(data);
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
      console.log("Submit");
    }
  };
  //#endregion

  //#region steps
  const step1_old = () => {
    return (
      <>
        <div className="grid grid-cols-3 gap-4 w-full">
          <div>
            <div className="label">
              <span className="label-text">
                SEC Registration Number <span className="text-red-500">*</span>
              </span>
            </div>
            <label className="input input-bordered flex items-center gap-2 input-sm">
              <input
                type="text"
                className="grow"
                disabled={isEnable(formDataEnabled.sec_registration_number)}
                name="sec_registration_number"
                value={formData.sec_registration_number}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
              <button
                onClick={() => {
                  let isTrue =
                    typeof formDataEnabled.sec_registration_number ==
                      "string" || !formDataEnabled.sec_registration_number;
                  handleIconButton("sec_registration_number", isTrue);
                }}
              >
                {isEnable(formDataEnabled.sec_registration_number)
                  ? editSVG
                  : saveSVG}
              </button>
            </label>
          </div>
          <div>
            <div className="label">
              <span className="label-text">
                Corporate Tax Identification Number (TIN){" "}
                <span className="text-red-500">*</span>
              </span>
            </div>
            <label className="input input-bordered flex items-center gap-2 input-sm">
              <input
                type="text"
                className="grow"
                disabled={isEnable(formDataEnabled.corporate_tin)}
                name="corporate_tin"
                value={formData.corporate_tin}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
              <button
                onClick={() => {
                  let isTrue =
                    typeof formDataEnabled.corporate_tin == "string" ||
                    !formDataEnabled.corporate_tin;

                  handleIconButton("corporate_tin", isTrue);
                }}
              >
                {isEnable(formDataEnabled.corporate_tin) ? editSVG : saveSVG}
              </button>
            </label>
          </div>
          <div>
            <div className="label">
              <span className="label-text">
                Date Registered <span className="text-red-500">*</span>
              </span>
            </div>
            <label className="input input-bordered flex items-center gap-2 input-sm">
              <input
                type="date"
                className="grow"
                disabled={isEnable(formDataEnabled.date_registered)}
                name="date_registered"
                value={formData.date_registered}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
              <button
                onClick={() => {
                  let isTrue =
                    typeof formDataEnabled.date_registered == "string" ||
                    !formDataEnabled.date_registered;
                  handleIconButton("date_registered", isTrue);
                }}
              >
                {isEnable(formDataEnabled.date_registered) ? editSVG : saveSVG}
              </button>
            </label>
          </div>
          <Input
            title="Year"
            type="number"
            name="year"
            required={true}
            disabled={isEnable(formDataEnabled.year)}
            value={formData.year}
            handleOnChange={(e) => {
              handleOnChange(e);
            }}
            handleIconButton={() => {
              let isTrue =
                typeof formDataEnabled.year == "string" ||
                !formDataEnabled.year;
              handleIconButton("year", isTrue);
            }}
          />
          <Input
            title="Corporate Name"
            type="text"
            name="corporate_name"
            required={true}
            disabled={isEnable(formDataEnabled.corporate_name)}
            value={formData.corporate_name}
            handleOnChange={(e) => {
              handleOnChange(e);
            }}
            handleIconButton={() => {
              let isTrue =
                typeof formDataEnabled.corporate_name == "string" ||
                !formDataEnabled.corporate_name;
              handleIconButton("corporate_name", isTrue);
            }}
          />

          {/* <label className="form-control w-full">
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
              // disabled={true}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}
          {/* <label className="form-control w-full">
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
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}
          {/* <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                Date Registered <span className="text-red-500">*</span>
              </span>
            </div>
            <input
              type="date"
              placeholder=""
              className="input input-bordered w-full input-sm"
              name="date_registered"
              value={formData.date_registered}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}
          {/* <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                Year <span className="text-red-500">*</span>
              </span>
            </div>
            <input
              type="number"
              placeholder=""
              className="input input-bordered w-full input-sm"
              name="year"
              value={formData.year}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}

          {/* <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                Corporate Name <span className="text-red-500">*</span>
              </span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full input-sm"
              name="corporate_name"
              value={formData.corporate_name}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}

          <Input
            title="Fiscal Year End"
            type="text"
            name="fiscal_year_end"
            required={true}
            disabled={isEnable(formDataEnabled.fiscal_year_end)}
            value={formData.fiscal_year_end}
            handleOnChange={(e) => {
              handleOnChange(e);
            }}
            handleIconButton={() => {
              let isTrue =
                typeof formDataEnabled.fiscal_year_end == "string" ||
                !formDataEnabled.fiscal_year_end;
              handleIconButton("fiscal_year_end", isTrue);
            }}
          />

          {/* <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                Fiscal Year End <span className="text-red-500">*</span>
              </span>
            </div>
            <input
              type="email"
              placeholder=""
              className="input input-bordered w-full input-sm"
              name="fiscal_year_end"
              value={formData.fiscal_year_end}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}

          <Input
            title="Business / Trade Name"
            type="text"
            name="business_or_trade_name"
            // required={true}
            disabled={isEnable(formDataEnabled.business_or_trade_name)}
            value={formData.business_or_trade_name}
            handleOnChange={(e) => {
              handleOnChange(e);
            }}
            handleIconButton={() => {
              let isTrue =
                typeof formDataEnabled.business_or_trade_name == "string" ||
                !formDataEnabled.business_or_trade_name;
              handleIconButton("business_or_trade_name", isTrue);
            }}
          />

          {/* <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Business / Trade Name</span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full input-sm"
              name="business_or_trade_name"
              value={formData.business_or_trade_name}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}

          <Input
            title="Official Email Address"
            type="email"
            name="official_email_address"
            required={true}
            disabled={isEnable(formDataEnabled.official_email_address)}
            value={formData.official_email_address}
            handleOnChange={(e) => {
              handleOnChange(e);
            }}
            handleIconButton={() => {
              let isTrue =
                typeof formDataEnabled.official_email_address == "string" ||
                !formDataEnabled.official_email_address;
              handleIconButton("official_email_address", isTrue);
            }}
          />

          {/* <label className="form-control w-full">
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
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}

          <Input
            title="Alternate Email Address"
            type="email"
            name="alternate_email_address"
            // required={true}
            disabled={isEnable(formDataEnabled.alternate_email_address)}
            value={formData.alternate_email_address}
            handleOnChange={(e) => {
              handleOnChange(e);
            }}
            handleIconButton={() => {
              let isTrue =
                typeof formDataEnabled.alternate_email_address == "string" ||
                !formDataEnabled.alternate_email_address;
              handleIconButton("alternate_email_address", isTrue);
            }}
          />

          {/* <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Alternate Email Address</span>
            </div>
            <input
              type="email"
              placeholder=""
              className="input input-bordered w-full input-sm"
              name="alternate_email_address"
              value={formData.alternate_email_address}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}

          <Input
            title="Complete Principal Office Address"
            type="text"
            name="complete_principal_office_address"
            required={true}
            disabled={isEnable(
              formDataEnabled.complete_principal_office_address
            )}
            value={formData.complete_principal_office_address}
            handleOnChange={(e) => {
              handleOnChange(e);
            }}
            handleIconButton={() => {
              let isTrue =
                typeof formDataEnabled.complete_principal_office_address ==
                  "string" ||
                !formDataEnabled.complete_principal_office_address;
              handleIconButton("complete_principal_office_address", isTrue);
            }}
          />

          {/* <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                Complete Principal Office Address{" "}
                <span className="text-red-500">*</span>
              </span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full input-sm"
              name="complete_principal_office_address"
              value={formData.complete_principal_office_address}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}

          <Input
            title="Official Mobile Number"
            type="text"
            name="official_mobile_number"
            required={true}
            disabled={isEnable(formDataEnabled.official_mobile_number)}
            value={formData.official_mobile_number}
            handleOnChange={(e) => {
              handleOnChange(e);
            }}
            handleIconButton={() => {
              let isTrue =
                typeof formDataEnabled.official_mobile_number == "string" ||
                !formDataEnabled.official_mobile_number;
              handleIconButton("official_mobile_number", isTrue);
            }}
          />

          {/* <label className="form-control w-full">
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
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}

          <Input
            title="Alternate Phone Number"
            type="tel"
            name="alternate_phone_number"
            // required={true}
            disabled={isEnable(formDataEnabled.alternate_phone_number)}
            value={formData.alternate_phone_number}
            handleOnChange={(e) => {
              handleOnChange(e);
            }}
            handleIconButton={() => {
              let isTrue =
                typeof formDataEnabled.alternate_phone_number == "string" ||
                !formDataEnabled.alternate_phone_number;
              handleIconButton("alternate_phone_number", isTrue);
            }}
          />

          {/* <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Alternate Phone Number</span>
            </div>
            <input
              type="tel"
              placeholder=""
              className="input input-bordered w-full input-sm"
              name="alternate_phone_number"
              value={formData.alternate_phone_number}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}

          <Input
            title="Date of Annual Meeting Per By-Laws"
            type="text"
            name="date_of_annual_meeting"
            required={true}
            disabled={isEnable(formDataEnabled.date_of_annual_meeting)}
            value={formData.date_of_annual_meeting}
            handleOnChange={(e) => {
              handleOnChange(e);
            }}
            handleIconButton={() => {
              let isTrue =
                typeof formDataEnabled.date_of_annual_meeting == "string" ||
                !formDataEnabled.date_of_annual_meeting;
              handleIconButton("date_of_annual_meeting", isTrue);
            }}
          />

          {/* <label className="form-control w-full">
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
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}

          <Input
            title="Actual Date of Annual Meeting"
            type="date"
            name="actual_date_of_annual_meeting"
            required={true}
            disabled={isEnable(formDataEnabled.actual_date_of_annual_meeting)}
            value={formData.actual_date_of_annual_meeting}
            handleOnChange={(e) => {
              handleOnChange(e);
            }}
            handleIconButton={() => {
              let isTrue =
                typeof formDataEnabled.actual_date_of_annual_meeting ==
                  "string" || !formDataEnabled.actual_date_of_annual_meeting;
              handleIconButton("actual_date_of_annual_meeting", isTrue);
            }}
          />

          {/* <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                Actual Date of Annual Meeting{" "}
                <span className="text-red-500">*</span>
              </span>
            </div>
            <input
              type="date"
              placeholder=""
              className="input input-bordered w-full input-sm"
              name="actual_date_of_annual_meeting"
              value={formData.actual_date_of_annual_meeting}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}

          <Input
            title="Telephone Number"
            type="tel"
            name="telephone_number"
            // required={true}
            disabled={isEnable(formDataEnabled.telephone_number)}
            value={formData.telephone_number}
            handleOnChange={(e) => {
              handleOnChange(e);
            }}
            handleIconButton={() => {
              let isTrue =
                typeof formDataEnabled.telephone_number == "string" ||
                !formDataEnabled.telephone_number;
              handleIconButton("telephone_number", isTrue);
            }}
          />

          {/* <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Telephone Number</span>
            </div>
            <input
              type="tel"
              placeholder=""
              className="input input-bordered w-full input-sm"
              name="telephone_number"
              value={formData.telephone_number}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}

          <Input
            title="Name of External Auditor & Signing Partner"
            type="text"
            name="name_of_external_auditor"
            required={true}
            disabled={isEnable(formDataEnabled.name_of_external_auditor)}
            value={formData.name_of_external_auditor}
            handleOnChange={(e) => {
              handleOnChange(e);
            }}
            handleIconButton={() => {
              let isTrue =
                typeof formDataEnabled.name_of_external_auditor == "string" ||
                !formDataEnabled.name_of_external_auditor;
              handleIconButton("name_of_external_auditor", isTrue);
            }}
          />

          {/* <label className="form-control w-full">
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
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}

          <Input
            title="Industry Classification"
            type="text"
            name="industry_classification"
            required={true}
            disabled={isEnable(formDataEnabled.industry_classification)}
            value={formData.industry_classification}
            handleOnChange={(e) => {
              handleOnChange(e);
            }}
            handleIconButton={() => {
              let isTrue =
                typeof formDataEnabled.industry_classification == "string" ||
                !formDataEnabled.industry_classification;
              handleIconButton("industry_classification", isTrue);
            }}
          />

          {/* <label className="form-control w-full">
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
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}

          <Input
            title="Fax Number"
            type="text"
            name="fax_number"
            // required={true}
            disabled={isEnable(formDataEnabled.fax_number)}
            value={formData.fax_number}
            handleOnChange={(e) => {
              handleOnChange(e);
            }}
            handleIconButton={() => {
              let isTrue =
                typeof formDataEnabled.fax_number == "string" ||
                !formDataEnabled.fax_number;
              handleIconButton("fax_number", isTrue);
            }}
          />

          {/* <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Fax Number</span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full input-sm"
              name="fax_number"
              value={formData.fax_number}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}

          <Input
            title="SEC Accreditation Number(if applicable)"
            type="text"
            name="sec_accreditation_number"
            // required={true}
            disabled={isEnable(formDataEnabled.sec_accreditation_number)}
            value={formData.sec_accreditation_number}
            handleOnChange={(e) => {
              handleOnChange(e);
            }}
            handleIconButton={() => {
              let isTrue =
                typeof formDataEnabled.sec_accreditation_number == "string" ||
                !formDataEnabled.sec_accreditation_number;
              handleIconButton("sec_accreditation_number", isTrue);
            }}
          />

          {/* <label className="form-control w-full">
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
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}

          <Input
            title="Website URL Address"
            type="text"
            name="website_url_address"
            // required={true}
            disabled={isEnable(formDataEnabled.website_url_address)}
            value={formData.website_url_address}
            handleOnChange={(e) => {
              handleOnChange(e);
            }}
            handleIconButton={() => {
              let isTrue =
                typeof formDataEnabled.website_url_address == "string" ||
                !formDataEnabled.website_url_address;
              handleIconButton("website_url_address", isTrue);
            }}
          />

          {/* <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Website URL Address</span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full input-sm"
              name="website_url_address"
              value={formData.website_url_address}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}

          <Input
            title="Geographical Code"
            type="text"
            name="geographical_code"
            // required={true}
            disabled={isEnable(formDataEnabled.geographical_code)}
            value={formData.geographical_code}
            handleOnChange={(e) => {
              handleOnChange(e);
            }}
            handleIconButton={() => {
              let isTrue =
                typeof formDataEnabled.geographical_code == "string" ||
                !formDataEnabled.geographical_code;
              handleIconButton("geographical_code", isTrue);
            }}
          />

          {/* <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Geographical Code</span>
            </div>
            <input
              type="text"
              placeholder=""
              className="input input-bordered w-full input-sm"
              name="geographical_code"
              value={formData.geographical_code}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData({
                  ...formData,
                  [name]: value,
                });
              }}
            />
          </label> */}
        </div>
      </>
    );
  };

  const step2_old = () => {
    return (
      <>
        <div className="flex flex-col w-[70%] mx-auto gap-10 my-5">
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
      </>
    );
  };

  const step3_old = () => {
    return (
      <>
        <div className="w-full p-5">
          <div className="flex flex-col gap-5">
            {/* <div>
              <div className="p-5">
                <div className="flex flex-row justify-between">
                  <h1>Auth Capital Stock</h1>
                  <button
                    className="p-2 bg-blue-200 rounded-lg"
                    onClick={() => {
                      document
                        .getElementById("authCapitalStockModal")
                        .showModal();
                    }}
                  >
                    Edit Table
                  </button>
                </div>
                <DataTable
                  columns={subscribedCapitalFilipinoData}
                  data={subscribedCapitalFilipinotable}
                  persistTableHead={true}
                />
              </div>
            </div> */}

            {/* <dialog id="authCapitalStockModal" className="modal">
              <div className="modal-box w-full max-w-7xl">
                <div className="flex flex-row justify-between">
                  <h3 className="font-bold text-lg">
                    Authorized Capital Stock
                  </h3>
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2">
                      ✕
                    </button>
                  </form>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    className="bg-green-400 p-2 rounded-lg"
                    onClick={(e) => {
                      setEditSubscribedCapitalFilipinoTable([
                        ...editSubscribedCapitalFilipinoTable,
                        filipinoSubscribeCapital,
                      ]);
                    }}
                  >
                    Add
                  </button>
                  <DataTable
                    title="Desserts - Conditional Cells"
                    columns={editSubscribedCapitalFilipinoData}
                    data={editSubscribedCapitalFilipinoTable}
                    persistTableHead={true}
                  />

                  <button
                    onClick={(e) => {
                      setSubscribedCapitalFilipinotable(
                        editSubscribedCapitalFilipinoTable
                      );

                      document.getElementById("authCapitalStockModal").close();
                    }}
                    className="btn bg-green-200 text-white mt-2"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </dialog> */}

            {/* Authorized Capital Stock */}
            <div className="flex flex-col  overflow-x-auto">
              <table className="table w-full card bg-[#f7f7f7]">
                <thead>
                  <tr>
                    <th colSpan={5}>
                      <div className="flex flex-row py-1 px-2 justify-between items-center text-start">
                        <h1 className="poppins-semibold text-[15px] text-black">
                          Authorized Capital Stock
                        </h1>
                        <button
                          onClick={() => {
                            // document.getElementById("addModal").showModal();
                            setFormData((prevState) => ({
                              ...prevState,
                              auth_capital_stock: {
                                ...prevState.auth_capital_stock,
                                capital_stocks: [
                                  ...prevState.auth_capital_stock
                                    .capital_stocks,
                                  authCapitalStock,
                                ],
                              },
                            }));
                          }}
                          className="btn btn-ghost btn-sm text-black"
                        >
                          + Add row Input
                        </button>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th>Type of Shares</th>
                    <th>Number of Shares</th>
                    <th>Par/Stated Value</th>
                    <th className="text-center">
                      AMOUNT (PhP) <br />
                      (No. of shares X Par/Stated Value)
                    </th>
                    <th className="w-[40px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.auth_capital_stock.capital_stocks.map(
                    (object, index) => (
                      <tr key={index}>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.type_of_shares}
                              onChange={(e) =>
                                updateAuthCapitalStock(
                                  index,
                                  "type_of_shares",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="number"
                              className="input input-bordered w-full input-sm"
                              value={
                                isNaN(object.number_of_shares)
                                  ? ""
                                  : object.number_of_shares
                              }
                              onChange={(e) =>
                                updateAuthCapitalStock(
                                  index,
                                  "number_of_shares",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.par_or_stated_value}
                              onChange={(e) =>
                                updateAuthCapitalStock(
                                  index,
                                  "par_or_stated_value",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="number"
                              className="input input-bordered w-full input-sm"
                              value={isNaN(object.amount) ? "" : object.amount}
                              onChange={(e) =>
                                updateAuthCapitalStock(
                                  index,
                                  "amount",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <button
                            onClick={(e) => {
                              setFormData((prevState) => {
                                const updatedCapitalStocks =
                                  prevState.auth_capital_stock.capital_stocks.filter(
                                    (prevItem, prevIndex) => prevIndex !== index
                                  );

                                const totalNumberOfShares =
                                  updatedCapitalStocks.reduce(
                                    (total, item) =>
                                      total +
                                      parseFloat(item.number_of_shares || 0),
                                    0
                                  );

                                const totalAmount = updatedCapitalStocks.reduce(
                                  (total, item) =>
                                    total + parseFloat(item.amount || 0),
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
                            }}
                          >
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
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                  <tr className="poppins-semibold text-[15px]">
                    <td></td>
                    <td>
                      <div className="flex flex-row justify-between">
                        <h1>Total</h1>
                        <span>
                          {formatNumberWithComma(
                            formData.auth_capital_stock.total_number_of_shares
                          )}
                        </span>
                      </div>
                    </td>
                    <td></td>
                    <td>
                      <div className="flex flex-row justify-between">
                        <h1>Total</h1>
                        <span>
                          {formatNumberWithComma(
                            formData.auth_capital_stock.total_amount.toFixed(2)
                          )}
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Subscribed Capital */}
            <div className="flex flex-col  overflow-x-auto">
              <div className="card bg-[#f7f7f7]">
                {/* Filipino */}
                <table className="table">
                  <thead>
                    <tr>
                      <th colSpan={9}>
                        <div className="flex flex-row py-5 px-2 justify-start items-center text-start">
                          <h1 className="poppins-semibold text-[15px] text-black">
                            Subscribed Capital
                          </h1>
                        </div>
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={9}>
                        <div className="flex flex-row py-1 px-2 justify-end items-center text-start">
                          <button
                            onClick={() => {
                              setFormData((prevState) => ({
                                ...prevState,
                                subscribe_capital: {
                                  ...prevState.subscribe_capital,
                                  filipino: [
                                    ...prevState.subscribe_capital.filipino,
                                    filipinoSubscribeCapital,
                                  ],
                                },
                              }));
                            }}
                            className="btn btn-ghost btn-sm text-black"
                          >
                            + Add row Input
                          </button>
                        </div>
                      </th>
                    </tr>

                    <tr>
                      <th className="w-[5%]  whitespace-normal">Filipino</th>
                      <th className="w-[5%]  whitespace-normal">
                        Number of Stock Holders
                      </th>
                      <th className="w-[20%] whitespace-normal">
                        Types of Shares
                      </th>
                      <th className="w-[20%] whitespace-normal">
                        Number of Shares
                      </th>
                      <th className="w-[20%] whitespace-normal">
                        Number of Shares in the Hands of the Public
                      </th>
                      <th className="w-[5%] whitespace-normal">
                        Par/Stated Value
                      </th>
                      <th className="w-[20%] whitespace-normal">
                        Amount (PhP)
                      </th>
                      <th className="w-[20%] whitespace-normal">
                        % of Ownership
                      </th>
                      <th className="w-[5%] whitespace-normal"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.subscribe_capital.filipino.map(
                      (object, index) => (
                        <tr key={index}>
                          <td></td>
                          <td>
                            <label className="form-control w-full">
                              <input
                                type="number"
                                className="input input-bordered w-full input-sm"
                                value={object.number_of_stock_holders}
                                onChange={(e) =>
                                  updateSubscribeCapitalFilipino(
                                    index,
                                    "number_of_stock_holders",
                                    e.target.value
                                  )
                                }
                              />
                            </label>
                          </td>
                          <td>
                            <label className="form-control w-full">
                              <input
                                type="text"
                                className="input input-bordered w-full input-sm"
                                value={object.types_of_shares}
                                onChange={(e) =>
                                  updateSubscribeCapitalFilipino(
                                    index,
                                    "types_of_shares",
                                    e.target.value
                                  )
                                }
                              />
                            </label>
                          </td>
                          <td>
                            <label className="form-control w-full">
                              <input
                                type="number"
                                className="input input-bordered w-full input-sm"
                                value={object.number_of_shares}
                                onChange={(e) =>
                                  updateSubscribeCapitalFilipino(
                                    index,
                                    "number_of_shares",
                                    e.target.value
                                  )
                                }
                              />
                            </label>
                          </td>
                          <td>
                            <label className="form-control w-full">
                              <input
                                type="number"
                                className="input input-bordered w-full input-sm"
                                value={object.number_of_shares_in_hands}
                                onChange={(e) =>
                                  updateSubscribeCapitalFilipino(
                                    index,
                                    "number_of_shares_in_hands",
                                    e.target.value
                                  )
                                }
                              />
                            </label>
                          </td>
                          <td>
                            <label className="form-control w-full">
                              <input
                                type="number"
                                className="input input-bordered w-full input-sm"
                                value={object.par_or_stated_value}
                                onChange={(e) =>
                                  updateSubscribeCapitalFilipino(
                                    index,
                                    "par_or_stated_value",
                                    e.target.value
                                  )
                                }
                              />
                            </label>
                          </td>
                          <td>
                            <label className="form-control w-full">
                              <input
                                type="number"
                                className="input input-bordered w-full input-sm"
                                value={object.amount}
                                onChange={(e) =>
                                  updateSubscribeCapitalFilipino(
                                    index,
                                    "amount",
                                    e.target.value
                                  )
                                }
                              />
                            </label>
                          </td>
                          <td>
                            <label className="form-control w-full">
                              <input
                                type="number"
                                className="input input-bordered w-full input-sm"
                                value={object.percent_of_ownership}
                                onChange={(e) =>
                                  updateSubscribeCapitalFilipino(
                                    index,
                                    "percent_of_ownership",
                                    e.target.value
                                  )
                                }
                              />
                            </label>
                          </td>
                          <td>
                            <button
                              onClick={(e) => {
                                setFormData((prevState) => {
                                  const updatedSubscribeCapital =
                                    prevState.subscribe_capital.filipino.filter(
                                      (prevItem, prevIndex) =>
                                        prevIndex !== index
                                    );

                                  const subTotalNumberOfSharesFilipino =
                                    updatedSubscribeCapital.reduce(
                                      (total, item) =>
                                        total +
                                        parseFloat(item.number_of_shares || 0),
                                      0
                                    );

                                  const subTotalAmountFilipino =
                                    updatedSubscribeCapital.reduce(
                                      (total, item) =>
                                        total + parseFloat(item.amount || 0),
                                      0
                                    );

                                  const subTotalOwnershipFilipino =
                                    updatedSubscribeCapital.reduce(
                                      (total, item) =>
                                        total +
                                        parseFloat(
                                          item.percent_of_ownership || 0
                                        ),
                                      0
                                    );

                                  return {
                                    ...prevState,
                                    subscribe_capital: {
                                      ...prevState.subscribe_capital,
                                      filipino: updatedSubscribeCapital,
                                      sub_total_number_of_shares_filipino:
                                        subTotalNumberOfSharesFilipino,
                                      sub_total_amount_filipino:
                                        subTotalAmountFilipino,
                                      sub_total_ownership_filipino:
                                        subTotalOwnershipFilipino,
                                      // Recalculate total values based on the updated filipino array
                                      total_number_of_shares:
                                        subTotalNumberOfSharesFilipino +
                                        prevState.subscribe_capital
                                          .sub_total_number_of_shares_foreign,
                                      total_amount:
                                        subTotalAmountFilipino +
                                        prevState.subscribe_capital
                                          .sub_total_amount_foreign,
                                      total_percent_of_ownership:
                                        subTotalOwnershipFilipino +
                                        prevState.subscribe_capital
                                          .sub_total_ownership_foreign,
                                    },
                                  };
                                });
                              }}
                            >
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
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                    <tr className="poppins-semibold text-[15px]">
                      <td colSpan={3} className="text-end">
                        <h1>Total</h1>
                      </td>
                      <td>
                        {formatNumberWithComma(
                          formData.subscribe_capital
                            .sub_total_number_of_shares_filipino
                        )}
                      </td>
                      <td colSpan={2} className="text-end">
                        Total P
                      </td>
                      <td>
                        {formatNumberWithComma(
                          formData.subscribe_capital.sub_total_amount_filipino.toFixed(
                            2
                          )
                        )}
                      </td>
                      <td colSpan={2}>
                        {formatNumberWithComma(
                          formData.subscribe_capital.sub_total_ownership_filipino.toFixed(
                            2
                          )
                        )}
                        %
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Foreign */}
                <table className="table">
                  <thead>
                    <tr>
                      <th colSpan={9}>
                        <div className="flex flex-row py-1 px-2 justify-end items-center text-start">
                          <button
                            onClick={() => {
                              setFormData((prevState) => ({
                                ...prevState,
                                subscribe_capital: {
                                  ...prevState.subscribe_capital,
                                  foreign: [
                                    ...prevState.subscribe_capital.foreign,
                                    foreignSubscribeCapital,
                                  ],
                                },
                              }));
                            }}
                            className="btn btn-ghost btn-sm text-black"
                          >
                            + Add row Input
                          </button>
                        </div>
                      </th>
                    </tr>

                    <tr>
                      <th className="w-[20%]  whitespace-normal">Foreign</th>
                      <th className="w-[5%]  whitespace-normal">
                        Number of Stock Holders
                      </th>
                      <th className="w-[20%] whitespace-normal">
                        Types of Shares
                      </th>
                      <th className="w-[20%] whitespace-normal">
                        Number of Shares
                      </th>
                      <th className="w-[20%] whitespace-normal">
                        Number of Shares in the Hands of the Public
                      </th>
                      <th className="w-[5%] whitespace-normal">
                        Par/Stated Value
                      </th>
                      <th className="w-[20%] whitespace-normal">
                        Amount (PhP)
                      </th>
                      <th className="w-[20%] whitespace-normal">
                        % of Ownership
                      </th>
                      <th className="w-[5%] whitespace-normal"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.subscribe_capital.foreign.map((object, index) => (
                      <tr key={index}>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.nationality}
                              onChange={(e) =>
                                updateSubscribeCapitalForeign(
                                  index,
                                  "nationality",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="number"
                              className="input input-bordered w-full input-sm"
                              value={object.number_of_stock_holders}
                              onChange={(e) =>
                                updateSubscribeCapitalForeign(
                                  index,
                                  "number_of_stock_holders",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.types_of_shares}
                              onChange={(e) =>
                                updateSubscribeCapitalForeign(
                                  index,
                                  "types_of_shares",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="number"
                              className="input input-bordered w-full input-sm"
                              value={object.number_of_shares}
                              onChange={(e) =>
                                updateSubscribeCapitalForeign(
                                  index,
                                  "number_of_shares",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="number"
                              className="input input-bordered w-full input-sm"
                              value={object.number_of_shares_in_hands}
                              onChange={(e) =>
                                updateSubscribeCapitalForeign(
                                  index,
                                  "number_of_shares_in_hands",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="number"
                              className="input input-bordered w-full input-sm"
                              value={object.par_or_stated_value}
                              onChange={(e) =>
                                updateSubscribeCapitalForeign(
                                  index,
                                  "par_or_stated_value",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="number"
                              className="input input-bordered w-full input-sm"
                              value={object.amount}
                              onChange={(e) =>
                                updateSubscribeCapitalForeign(
                                  index,
                                  "amount",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="number"
                              className="input input-bordered w-full input-sm"
                              value={object.percent_of_ownership}
                              onChange={(e) =>
                                updateSubscribeCapitalForeign(
                                  index,
                                  "percent_of_ownership",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <button
                            onClick={(e) => {
                              setFormData((prevState) => {
                                const updatedSubscribeCapital =
                                  prevState.subscribe_capital.foreign.filter(
                                    (prevItem, prevIndex) => prevIndex !== index
                                  );

                                const subTotalNumberOfSharesForeign =
                                  updatedSubscribeCapital.reduce(
                                    (total, item) =>
                                      total +
                                      parseFloat(item.number_of_shares || 0),
                                    0
                                  );

                                const subTotalAmountForeign =
                                  updatedSubscribeCapital.reduce(
                                    (total, item) =>
                                      total + parseFloat(item.amount || 0),
                                    0
                                  );

                                const subTotalOwnershipForeign =
                                  updatedSubscribeCapital.reduce(
                                    (total, item) =>
                                      total +
                                      parseFloat(
                                        item.percent_of_ownership || 0
                                      ),
                                    0
                                  );

                                return {
                                  ...prevState,
                                  subscribe_capital: {
                                    ...prevState.subscribe_capital,
                                    foreign: updatedSubscribeCapital,
                                    sub_total_number_of_shares_filipino:
                                      subTotalNumberOfSharesForeign,
                                    sub_total_amount_filipino:
                                      subTotalAmountForeign,
                                    sub_total_ownership_filipino:
                                      subTotalOwnershipForeign,
                                    // Recalculate total values based on the updated filipino array
                                    total_number_of_shares:
                                      subTotalNumberOfSharesForeign +
                                      prevState.subscribe_capital
                                        .sub_total_number_of_shares_filipino,
                                    total_amount:
                                      subTotalAmountForeign +
                                      prevState.subscribe_capital
                                        .sub_total_amount_filipino,
                                    total_percent_of_ownership:
                                      subTotalOwnershipForeign +
                                      prevState.subscribe_capital
                                        .sub_total_ownership_filipino,
                                  },
                                };
                              });
                            }}
                          >
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
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="poppins-semibold text-[15px]">
                      <td>Percentage of Foreign Equity:</td>
                      <td>0</td>
                      <td className="text-end">
                        <h1>Total</h1>
                      </td>
                      <td>
                        {formatNumberWithComma(
                          formData.subscribe_capital
                            .sub_total_number_of_shares_foreign
                        )}
                      </td>
                      <td colSpan={2} className="text-end">
                        Total P
                      </td>
                      <td>
                        {formatNumberWithComma(
                          formData.subscribe_capital.sub_total_amount_foreign.toFixed(
                            2
                          )
                        )}
                      </td>
                      <td colSpan={2}>
                        {formatNumberWithComma(
                          formData.subscribe_capital.sub_total_amount_foreign.toFixed(
                            2
                          )
                        )}
                      </td>
                    </tr>
                    <tr className="poppins-semibold text-[15px]">
                      <td colSpan={3} className="text-end"></td>
                      <td></td>
                      <td colSpan={2} className="text-end">
                        TOTAL SUBSCRIBE P
                      </td>
                      <td>
                        {formatNumberWithComma(
                          formData.subscribe_capital.total_amount.toFixed(2)
                        )}
                      </td>
                      <td colSpan={2}>
                        {formatNumberWithComma(
                          formData.subscribe_capital.total_percent_of_ownership.toFixed(
                            2
                          )
                        )}
                        %
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Paid-up Capital */}
            <div className="flex flex-col  overflow-x-auto">
              <div className="card bg-[#f7f7f7]">
                {/* Filipino */}
                <table className="table">
                  <thead>
                    <tr>
                      <th colSpan={8}>
                        <div className="flex flex-row py-5 px-2 justify-start items-center text-start">
                          <h1 className="poppins-semibold text-[15px] text-black">
                            Paid-Up Capital
                          </h1>
                        </div>
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={9}>
                        <div className="flex flex-row py-1 px-2 justify-end items-center text-start">
                          <button
                            onClick={() => {
                              setFormData((prevState) => ({
                                ...prevState,
                                paid_up_capital: {
                                  ...prevState.paid_up_capital,
                                  filipino: [
                                    ...prevState.paid_up_capital.filipino,
                                    filipinoSubscribeCapital,
                                  ],
                                },
                              }));
                            }}
                            className="btn btn-ghost btn-sm text-black"
                          >
                            + Add row Input
                          </button>
                        </div>
                      </th>
                    </tr>

                    <tr>
                      <th className="w-[5%]  whitespace-normal">Filipino</th>
                      <th className="w-[5%]  whitespace-normal">
                        Number of Stock Holders
                      </th>
                      <th className="w-[20%] whitespace-normal">
                        Types of Shares
                      </th>
                      <th className="w-[20%] whitespace-normal">
                        Number of Shares
                      </th>
                      <th className="w-[5%] whitespace-normal">
                        Par/Stated Value
                      </th>
                      <th className="w-[20%] whitespace-normal">
                        Amount (PhP)
                      </th>
                      <th className="w-[20%] whitespace-normal">
                        % of Ownership
                      </th>
                      <th className="w-[5%] whitespace-normal"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.paid_up_capital.filipino.map((object, index) => (
                      <tr key={index}>
                        <td></td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="number"
                              className="input input-bordered w-full input-sm"
                              value={object.number_of_stock_holders}
                              onChange={(e) =>
                                updatePaidUpCapitalFilipino(
                                  index,
                                  "number_of_stock_holders",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.types_of_shares}
                              onChange={(e) =>
                                updatePaidUpCapitalFilipino(
                                  index,
                                  "types_of_shares",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="number"
                              className="input input-bordered w-full input-sm"
                              value={object.number_of_shares}
                              onChange={(e) =>
                                updatePaidUpCapitalFilipino(
                                  index,
                                  "number_of_shares",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="number"
                              className="input input-bordered w-full input-sm"
                              value={object.par_or_stated_value}
                              onChange={(e) =>
                                updatePaidUpCapitalFilipino(
                                  index,
                                  "par_or_stated_value",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="number"
                              className="input input-bordered w-full input-sm"
                              value={object.amount}
                              onChange={(e) =>
                                updatePaidUpCapitalFilipino(
                                  index,
                                  "amount",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="number"
                              className="input input-bordered w-full input-sm"
                              value={object.percent_of_ownership}
                              onChange={(e) =>
                                updatePaidUpCapitalFilipino(
                                  index,
                                  "percent_of_ownership",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <button
                            onClick={(e) => {
                              setFormData((prevState) => {
                                const updatedSubscribeCapital =
                                  prevState.paid_up_capital.filipino.filter(
                                    (prevItem, prevIndex) => prevIndex !== index
                                  );

                                const subTotalNumberOfSharesFilipino =
                                  updatedSubscribeCapital.reduce(
                                    (total, item) =>
                                      total +
                                      parseFloat(item.number_of_shares || 0),
                                    0
                                  );

                                const subTotalAmountFilipino =
                                  updatedSubscribeCapital.reduce(
                                    (total, item) =>
                                      total + parseFloat(item.amount || 0),
                                    0
                                  );

                                const subTotalOwnershipFilipino =
                                  updatedSubscribeCapital.reduce(
                                    (total, item) =>
                                      total +
                                      parseFloat(
                                        item.percent_of_ownership || 0
                                      ),
                                    0
                                  );

                                return {
                                  ...prevState,
                                  paid_up_capital: {
                                    ...prevState.paid_up_capital,
                                    filipino: updatedSubscribeCapital,
                                    sub_total_number_of_shares_filipino:
                                      subTotalNumberOfSharesFilipino,
                                    sub_total_amount_filipino:
                                      subTotalAmountFilipino,
                                    sub_total_ownership_filipino:
                                      subTotalOwnershipFilipino,
                                    // Recalculate total values based on the updated filipino array
                                    total_number_of_shares:
                                      subTotalNumberOfSharesFilipino +
                                      prevState.paid_up_capital
                                        .sub_total_number_of_shares_foreign,
                                    total_amount:
                                      subTotalAmountFilipino +
                                      prevState.paid_up_capital
                                        .sub_total_amount_foreign,
                                    total_percent_of_ownership:
                                      subTotalOwnershipFilipino +
                                      prevState.paid_up_capital
                                        .sub_total_ownership_foreign,
                                  },
                                };
                              });
                            }}
                          >
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
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="poppins-semibold text-[15px]">
                      <td colSpan={3} className="text-end">
                        <h1>Total</h1>
                      </td>
                      <td>
                        {formatNumberWithComma(
                          formData.paid_up_capital
                            .sub_total_number_of_shares_filipino
                        )}
                      </td>
                      <td colSpan={1} className="text-end">
                        Total P
                      </td>
                      <td>
                        {formatNumberWithComma(
                          formData.paid_up_capital.sub_total_amount_filipino.toFixed(
                            2
                          )
                        )}
                      </td>
                      <td colSpan={2}>
                        {formatNumberWithComma(
                          formData.paid_up_capital.sub_total_ownership_filipino.toFixed(
                            2
                          )
                        )}
                        %
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Foreign */}
                <table className="table">
                  <thead>
                    <tr>
                      <th colSpan={8}>
                        <div className="flex flex-row py-1 px-2 justify-end items-center text-start">
                          <button
                            onClick={() => {
                              setFormData((prevState) => ({
                                ...prevState,
                                paid_up_capital: {
                                  ...prevState.paid_up_capital,
                                  foreign: [
                                    ...prevState.paid_up_capital.foreign,
                                    foreignSubscribeCapital,
                                  ],
                                },
                              }));
                            }}
                            className="btn btn-ghost btn-sm text-black"
                          >
                            + Add row Input
                          </button>
                        </div>
                      </th>
                    </tr>

                    <tr>
                      <th className="w-[20%]  whitespace-normal">Foreign</th>
                      <th className="w-[5%]  whitespace-normal">
                        Number of Stock Holders
                      </th>
                      <th className="w-[20%] whitespace-normal">
                        Types of Shares
                      </th>
                      <th className="w-[20%] whitespace-normal">
                        Number of Shares
                      </th>
                      <th className="w-[5%] whitespace-normal">
                        Par/Stated Value
                      </th>
                      <th className="w-[20%] whitespace-normal">
                        Amount (PhP)
                      </th>
                      <th className="w-[20%] whitespace-normal">
                        % of Ownership
                      </th>
                      <th className="w-[5%] whitespace-normal"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.paid_up_capital.foreign.map((object, index) => (
                      <tr key={index}>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.nationality}
                              onChange={(e) =>
                                updatePaidUpCapitalForeign(
                                  index,
                                  "nationality",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="number"
                              className="input input-bordered w-full input-sm"
                              value={object.number_of_stock_holders}
                              onChange={(e) =>
                                updatePaidUpCapitalForeign(
                                  index,
                                  "number_of_stock_holders",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.types_of_shares}
                              onChange={(e) =>
                                updatePaidUpCapitalForeign(
                                  index,
                                  "types_of_shares",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="number"
                              className="input input-bordered w-full input-sm"
                              value={object.number_of_shares_in_hands}
                              onChange={(e) =>
                                updatePaidUpCapitalForeign(
                                  index,
                                  "number_of_shares_in_hands",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="number"
                              className="input input-bordered w-full input-sm"
                              value={object.par_or_stated_value}
                              onChange={(e) =>
                                updatePaidUpCapitalForeign(
                                  index,
                                  "par_or_stated_value",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="number"
                              className="input input-bordered w-full input-sm"
                              value={object.amount}
                              onChange={(e) =>
                                updatePaidUpCapitalForeign(
                                  index,
                                  "amount",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="number"
                              className="input input-bordered w-full input-sm"
                              value={object.percent_of_ownership}
                              onChange={(e) =>
                                updatePaidUpCapitalForeign(
                                  index,
                                  "percent_of_ownership",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <button
                            onClick={(e) => {
                              setFormData((prevState) => {
                                const updatedSubscribeCapital =
                                  prevState.paid_up_capital.foreign.filter(
                                    (prevItem, prevIndex) => prevIndex !== index
                                  );

                                const subTotalNumberOfSharesForeign =
                                  updatedSubscribeCapital.reduce(
                                    (total, item) =>
                                      total +
                                      parseFloat(item.number_of_shares || 0),
                                    0
                                  );

                                const subTotalAmountForeign =
                                  updatedSubscribeCapital.reduce(
                                    (total, item) =>
                                      total + parseFloat(item.amount || 0),
                                    0
                                  );

                                const subTotalOwnershipForeign =
                                  updatedSubscribeCapital.reduce(
                                    (total, item) =>
                                      total +
                                      parseFloat(
                                        item.percent_of_ownership || 0
                                      ),
                                    0
                                  );

                                return {
                                  ...prevState,
                                  paid_up_capital: {
                                    ...prevState.paid_up_capital,
                                    foreign: updatedSubscribeCapital,
                                    sub_total_number_of_shares_filipino:
                                      subTotalNumberOfSharesForeign,
                                    sub_total_amount_filipino:
                                      subTotalAmountForeign,
                                    sub_total_ownership_filipino:
                                      subTotalOwnershipForeign,
                                    // Recalculate total values based on the updated filipino array
                                    total_number_of_shares:
                                      subTotalNumberOfSharesForeign +
                                      prevState.paid_up_capital
                                        .sub_total_number_of_shares_filipino,
                                    total_amount:
                                      subTotalAmountForeign +
                                      prevState.paid_up_capital
                                        .sub_total_amount_filipino,
                                    total_percent_of_ownership:
                                      subTotalOwnershipForeign +
                                      prevState.paid_up_capital
                                        .sub_total_ownership_filipino,
                                  },
                                };
                              });
                            }}
                          >
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
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="poppins-semibold text-[15px]">
                      <td></td>
                      <td></td>
                      <td className="text-end">
                        <h1>Total</h1>
                      </td>
                      <td>
                        {formatNumberWithComma(
                          formData.paid_up_capital
                            .sub_total_number_of_shares_foreign
                        )}
                      </td>
                      <td colSpan={1} className="text-end">
                        Total P
                      </td>
                      <td>
                        {formatNumberWithComma(
                          formData.paid_up_capital.sub_total_amount_foreign.toFixed(
                            2
                          )
                        )}
                      </td>
                      <td colSpan={2}>
                        {formatNumberWithComma(
                          formData.paid_up_capital.sub_total_ownership_foreign.toFixed(
                            2
                          )
                        )}
                        %
                      </td>
                    </tr>
                    <tr className="poppins-semibold text-[15px]">
                      <td colSpan={2} className="text-end"></td>
                      <td colSpan={3} className="text-end">
                        TOTAL SUBSCRIBE P
                      </td>
                      <td>
                        {formatNumberWithComma(
                          formData.paid_up_capital.total_amount.toFixed(2)
                        )}
                      </td>
                      <td colSpan={2}>
                        {formatNumberWithComma(
                          formData.paid_up_capital.total_percent_of_ownership.toFixed(
                            2
                          )
                        )}
                        %
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const step4 = () => {
    return (
      <>
        <div className="w-full p-5">
          <div className="flex flex-col gap-5">
            {/* Directors / Officers */}
            <div className="flex flex-col  overflow-x-auto">
              <table className="table w-full card bg-[#f7f7f7]">
                <thead>
                  <tr>
                    <th colSpan={10}>
                      <div className="flex flex-row py-1 px-2 justify-between items-center text-start">
                        <h1 className="poppins-semibold text-[15px] text-black">
                          Directors/Officers
                        </h1>
                        <button
                          onClick={() => {
                            setFormData((prevState) => ({
                              ...prevState,
                              directors_or_officers: [
                                ...prevState.directors_or_officers,
                                directorsOrOfficers,
                              ],
                            }));
                          }}
                          className="btn btn-ghost btn-sm text-black"
                        >
                          + Add row Input
                        </button>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th className="w-[30%]  whitespace-normal">
                      Name or Current Residual Address
                    </th>
                    <th className="w-[5%]  whitespace-normal">Nationality</th>
                    <th className="w-[5%]  whitespace-normal">Incorporator</th>
                    <th className="w-[5%]  whitespace-normal">Board</th>
                    <th className="w-[5%]  whitespace-normal">Gender</th>
                    <th className="w-[5%]  whitespace-normal">Stock Holder</th>
                    <th className="w-[5%]  whitespace-normal">Officer</th>
                    <th className="w-[5%]  whitespace-normal">
                      Executive Committe
                    </th>
                    <th className="w-[5%]  whitespace-normal">
                      Tax Identification Number
                    </th>
                    <th className="w-[5%]  whitespace-normal"></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.directors_or_officers.map((object, index) => (
                    <tr key={index}>
                      <td>
                        <label className="form-control w-full">
                          <input
                            type="text"
                            className="input input-bordered w-full input-sm"
                            value={object.name_or_current_residual_address}
                            onChange={(e) =>
                              updateDirectorsOrOfficers(
                                index,
                                "name_or_current_residual_address",
                                e.target.value
                              )
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <label className="form-control w-full">
                          <input
                            type="text"
                            className="input input-bordered w-full input-sm"
                            value={object.nationality}
                            onChange={(e) =>
                              updateDirectorsOrOfficers(
                                index,
                                "nationality",
                                e.target.value
                              )
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <label className="form-control w-full">
                          <input
                            type="text"
                            className="input input-bordered w-full input-sm"
                            value={object.incorporator}
                            onChange={(e) =>
                              updateDirectorsOrOfficers(
                                index,
                                "incorporator",
                                e.target.value
                              )
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <label className="form-control w-full">
                          <input
                            type="text"
                            className="input input-bordered w-full input-sm"
                            value={object.board}
                            onChange={(e) =>
                              updateDirectorsOrOfficers(
                                index,
                                "board",
                                e.target.value
                              )
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <label className="form-control w-full">
                          <input
                            type="text"
                            className="input input-bordered w-full input-sm"
                            value={object.gender}
                            onChange={(e) =>
                              updateDirectorsOrOfficers(
                                index,
                                "gender",
                                e.target.value
                              )
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <label className="form-control w-full">
                          <input
                            type="text"
                            className="input input-bordered w-full input-sm"
                            value={object.stock_holder}
                            onChange={(e) =>
                              updateDirectorsOrOfficers(
                                index,
                                "stock_holder",
                                e.target.value
                              )
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <label className="form-control w-full">
                          <input
                            type="text"
                            className="input input-bordered w-full input-sm"
                            value={object.officer}
                            onChange={(e) =>
                              updateDirectorsOrOfficers(
                                index,
                                "officer",
                                e.target.value
                              )
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <label className="form-control w-full">
                          <input
                            type="text"
                            className="input input-bordered w-full input-sm"
                            value={object.executive_committe}
                            onChange={(e) =>
                              updateDirectorsOrOfficers(
                                index,
                                "executive_committe",
                                e.target.value
                              )
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <label className="form-control w-full">
                          <input
                            type="text"
                            className="input input-bordered w-full input-sm"
                            value={object.tax_id_number}
                            onChange={(e) =>
                              updateDirectorsOrOfficers(
                                index,
                                "tax_id_number",
                                e.target.value
                              )
                            }
                          />
                        </label>
                      </td>
                      <td>
                        <button
                          onClick={(e) => {
                            setFormData((prevState) => {
                              const updatedDirectorsOrOfficers =
                                prevState.directors_or_officers.filter(
                                  (prevItem, prevIndex) => prevIndex !== index
                                );

                              return {
                                ...prevState,
                                directors_or_officers:
                                  updatedDirectorsOrOfficers,
                              };
                            });
                          }}
                        >
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
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  };

  const step5 = () => {
    return (
      <>
        <div className="w-full">
          <div className="flex gap-5">
            {/* Stockholders Information */}
            <div className="w-full card bg-[#f7f7f7] p-5 overflow-x-auto">
              <div className="py-1 px-2">
                <label className="form-control w-full md:w-1/3">
                  <div className="label">
                    <span className="label-text">
                      Total Number of Stockholders
                    </span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full input-sm"
                    value={formData.total_number_of_stockholders}
                    name="total_number_of_stockholders"
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setFormData({
                        ...formData,
                        [name]: value,
                      });
                    }}
                  />
                </label>
                <label className="form-control w-full md:w-1/3">
                  <div className="label">
                    <span className="label-text text-start">
                      No. of Stockholders with 100 or More Shares Each
                    </span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full input-sm"
                    value={
                      formData.number_of_stockholders_with_more_shares_each
                    }
                    name="number_of_stockholders_with_more_shares_each"
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setFormData({
                        ...formData,
                        [name]: value,
                      });
                    }}
                  />
                </label>
                <label className="form-control w-full md:w-1/3">
                  <div className="label">
                    <span className="label-text text-start">
                      Total Assets Based on Latest Audited Financial Statements
                    </span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full input-sm"
                    value={formData.total_assets_based_on_latest_audited}
                    name="total_assets_based_on_latest_audited"
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setFormData({
                        ...formData,
                        [name]: value,
                      });
                    }}
                  />
                </label>
              </div>
              <table className="table mt-2">
                <thead>
                  <tr>
                    <th colSpan={8}>
                      <div className="flex flex-row justify-between items-center text-start">
                        <h1 className="poppins-semibold text-[15px] text-black">
                          Stockholders Information
                        </h1>
                        <button
                          onClick={() => {
                            setFormData((prevState) => ({
                              ...prevState,
                              stock_holders_information: {
                                ...prevState.information,
                                information: [
                                  ...prevState.stock_holders_information
                                    .information,
                                  stockholdersInformation,
                                ],
                              },
                            }));
                          }}
                          className="btn btn-ghost btn-sm text-black"
                        >
                          + Add row Input
                        </button>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th className="w-[30%]  whitespace-normal" rowSpan={2}>
                      Name, Nationality, and Current Residual Address
                    </th>
                    <th
                      className="w-[5%]  whitespace-normal text-center"
                      colSpan={4}
                    >
                      Shares Subscribed
                    </th>
                    <th className="w-[5%]  whitespace-normal" rowSpan={2}>
                      Amount Paid in (Php)
                    </th>
                    <th className="w-[5%]  whitespace-normal" rowSpan={2}>
                      Tax Identification Number
                    </th>
                  </tr>
                  <tr>
                    <th>Type</th>
                    <th>Number</th>
                    <th>Amount (PhP)</th>
                    <th>% of Ownership</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.stock_holders_information.information.map(
                    (object, index) => (
                      <tr key={index}>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.name_etc}
                              onChange={(e) =>
                                updateStockHoldersInformation(
                                  index,
                                  "name_etc",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.type}
                              onChange={(e) =>
                                updateStockHoldersInformation(
                                  index,
                                  "type",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.number}
                              onChange={(e) =>
                                updateStockHoldersInformation(
                                  index,
                                  "number",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.amount}
                              onChange={(e) =>
                                updateStockHoldersInformation(
                                  index,
                                  "amount",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.percent_of_ownership}
                              onChange={(e) =>
                                updateStockHoldersInformation(
                                  index,
                                  "percent_of_ownership",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.amount_paid}
                              onChange={(e) =>
                                updateStockHoldersInformation(
                                  index,
                                  "amount_paid",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.tax_id_number}
                              onChange={(e) =>
                                updateStockHoldersInformation(
                                  index,
                                  "tax_id_number",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <button
                            onClick={(e) => {
                              setFormData((prevState) => {
                                const updatedStockHoldersInformation =
                                  prevState.stock_holders_information.information.filter(
                                    (prevItem, prevIndex) => prevIndex !== index
                                  );

                                return {
                                  ...prevState,
                                  stock_holders_information: {
                                    ...prevState.stock_holders_information
                                      .information,
                                    information: updatedStockHoldersInformation,
                                    // total_amount: 0,
                                    // total_percent_of_ownership: 0
                                  },
                                };
                              });
                            }}
                          >
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
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  };

  const step6 = () => {
    return (
      <>
        <div className="w-full">
          <div className="flex gap-5">
            {/* Beneficial Ownership Declaration */}
            <div className="w-full card bg-[#f7f7f7] p-5 overflow-x-auto">
              <div className="py-1 px-2">
                <label className="form-control w-full md:w-1/3">
                  <div className="label">
                    <span className="label-text">Corporate Secretary</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full input-sm"
                    value={formData.corporate_secretary}
                    name="corporate_secretary"
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setFormData({
                        ...formData,
                        [name]: value,
                      });
                    }}
                  />
                </label>
              </div>
              <table className="table mt-2">
                <thead>
                  <tr>
                    <th colSpan={9}>
                      <div className="flex flex-row justify-between items-center text-start">
                        <h1 className="poppins-semibold text-[15px] text-black">
                          Beneficial Ownership Declaration
                        </h1>
                        <button
                          onClick={() => {
                            setFormData((prevState) => ({
                              ...prevState,
                              beneficial_ownership_declaration: [
                                ...prevState.beneficial_ownership_declaration,
                                beneficialOwnershipDeclaration,
                              ],
                            }));
                          }}
                          className="btn btn-ghost btn-sm text-black"
                        >
                          + Add row Input
                        </button>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th className="w-[30%]  whitespace-normal">
                      Complete Name (Surname, Given Name, Middle Name, Name
                      Extension(i.e. Jr., Sr., III))
                    </th>
                    <th className="w-[5%]  whitespace-normal">
                      Specific Residual Address
                    </th>
                    <th className="w-[5%]  whitespace-normal">Nationality</th>
                    <th className="w-[5%]  whitespace-normal">Date of Birth</th>
                    <th className="w-[5%]  whitespace-normal">
                      Tax Identification Number
                    </th>
                    <th className="w-[5%]  whitespace-normal">
                      % of Ownership / % of Voting Rights
                    </th>
                    <th className="w-[5%]  whitespace-normal">
                      Type of Beneficial Owner <br /> Direct (D) or Indirect (I)
                    </th>
                    <th className="w-[5%]  whitespace-normal">
                      Category of Beneficial Ownership
                    </th>
                    <th className="w-[5%]  whitespace-normal"></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.beneficial_ownership_declaration.map(
                    (object, index) => (
                      <tr key={index}>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.complete_name}
                              onChange={(e) =>
                                updateBeneficialOwnershipDeclaration(
                                  index,
                                  "complete_name",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.specific_residual_address}
                              onChange={(e) =>
                                updateBeneficialOwnershipDeclaration(
                                  index,
                                  "specific_residual_address",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.nationality}
                              onChange={(e) =>
                                updateBeneficialOwnershipDeclaration(
                                  index,
                                  "nationality",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.date_of_birth}
                              onChange={(e) =>
                                updateBeneficialOwnershipDeclaration(
                                  index,
                                  "date_of_birth",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.tax_id_number}
                              onChange={(e) =>
                                updateBeneficialOwnershipDeclaration(
                                  index,
                                  "tax_id_number",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.percent_of_ownership}
                              onChange={(e) =>
                                updateBeneficialOwnershipDeclaration(
                                  index,
                                  "percent_of_ownership",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.type_of_beneficial_owner}
                              onChange={(e) =>
                                updateBeneficialOwnershipDeclaration(
                                  index,
                                  "type_of_beneficial_owner",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <label className="form-control w-full">
                            <input
                              type="text"
                              className="input input-bordered w-full input-sm"
                              value={object.category_of_beneficial_ownership}
                              onChange={(e) =>
                                updateBeneficialOwnershipDeclaration(
                                  index,
                                  "category_of_beneficial_ownership",
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </td>
                        <td>
                          <button
                            onClick={(e) => {
                              setFormData((prevState) => {
                                const updatedBeneficialOwnershipDeclaration =
                                  prevState.beneficial_ownership_declaration.filter(
                                    (prevItem, prevIndex) => prevIndex !== index
                                  );

                                return {
                                  ...prevState,
                                  beneficial_ownership_declaration:
                                    updatedBeneficialOwnershipDeclaration,
                                };
                              });
                            }}
                          >
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
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  };

  const styles = StyleSheet.create({
    year: {
      position: "absolute",
      margin: "5px",
      fontSize: "10px",
      fontWeight: 700,
      marginTop: 67,
      marginLeft: 290,
    },
    corporate_name: {
      position: "absolute",
      margin: "5px",
      fontSize: "10px",
      fontWeight: 700,
      marginTop: 200,
      marginLeft: 290,
    },
    image: {
      position: "absolute",
      zIndex: -1,
      top: 0,
      width: "592px",
    },
    page: { position: "relative" },
  });

  const GISFormDocument = (
    <Document title={`${formData.corporate_name} GIS ${formData.year}`}>
      <Page size={"A4"} style={styles.page}>
        <Text style={styles.year}>{formData.year}</Text>
        <Text style={styles.corporate_name}>{formData.corporate_name}</Text>
        <Text style={styles.business_or_trade_name}>
          {formData.business_or_trade_name}
        </Text>
        <Text style={styles.sec_registration_number}>
          {formData.sec_registration_number}
        </Text>

        <Image style={styles.image} src={imagePage1}></Image>
      </Page>
    </Document>
  );

  const step7 = () => {
    return (
      <>
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full p-5">
            <div className="my-5 w-full text-start h-screen">
              <PDFViewer
                style={{
                  position: "relative",
                  height: "100vh",
                  width: "100%",
                }}
              >
                {GISFormDocument}
              </PDFViewer>
            </div>
          </div>
        </div>
      </>
    );
  };
  //#endregion

  //#region use effects
  useEffect(() => {
    //setformrecord

    if (recordId !== undefined) {
      updateFormData();
      setFormRecord({
        ...formRecord,
        companyId: companyId,
        recordId: recordId,
        createdBy: "Michael",
      });
    } else {
      setFormRecord({
        ...formRecord,
        companyId: companyId,
        createdBy: "Michael",
      });

      if (formData.corporate_name === "") {
        dispatch(
          setFormData({
            ...formData,
            company_name: selectedCompany.companyName,
            sec_registration_number: selectedCompany.secNumber,
            corporate_tin: selectedCompany.corporateTin,
            date_registered: selectedCompany.dateRegistered,
          })
        );
      }
    }
  }, []);

  useEffect(() => {
    // setFormData({ ...formData, is_under_amla: isUnderAMLA });
  }, [isUnderAMLA]);

  useEffect(() => {
    // setFormData({
    //   ...formData,
    //   has_complied_with_the_requirements: hasCompiled,
    // });
  }, [hasCompiled]);
  //#endregion

  return (
    <div className="flex flex-col my-5">
      <div className="bg-white w-full rounded-xl shadow-lg">
        <div className="flex flex-col items-center justify-center py-5">
          <ul className="steps steps-horizontal w-full z-0">
            <li className={stepStyle(1)}></li>
            <li className={stepStyle(2)}></li>
            <li className={stepStyle(3)}></li>
            <li className={stepStyle(4)}></li>
            <li className={stepStyle(5)}></li>
            <li className={stepStyle(6)}></li>
            <li className={stepStyle(7)}></li>
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
            {step === 7 && step7()}
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
              <PDFDownloadLink
                className={
                  `btn bg-primary text-white ` + (step != 7 && "hidden")
                }
                fileName={`${formData.corporate_name} GIS ${formData.year}`}
                document={GISFormDocument}
              >
                Download PDF
              </PDFDownloadLink>
              <button
                className={
                  `btn bg-primary text-white ` + (step != 7 && "hidden")
                }
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
  );
};

export default create;
