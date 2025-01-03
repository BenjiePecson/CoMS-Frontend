import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ScopeOfWorkState,
  setToDefaultRecord,
} from "../../../store/quotes/QuotesSlice";
import { showToast } from "../../../../assets/global";
import axios from "axios";

export const AddNewQuote = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quote = useSelector((state) => state.quotes.get_record);

  const currentUser = useSelector((state) => state.user.user);

  const [formData, setFormData] = useState({ ...quote.form_data });
  const [scopeData, setScopeData] = useState(ScopeOfWorkState);
  const [selectedScope, setSelectedScope] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnChangeScope = (e) => {
    let { name, value } = e.target;

    if (name == "service_fee" && value != 0) {
      value = Number(value);
    }

    setScopeData({ ...scopeData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    let message = "Failed to insert the record.";
    let type = "error";

    try {
      const modified_by = `${currentUser.first_name} ${currentUser.last_name}`;

      let body = {
        form: {
          form_data: formData,
        },
        modified_by,
      };

      const response = await axios.post("/quotes", body);

      if (response.status == 201) {
        message = "Record inserted successfully.";
        type = "success";
        navigate("/quote");
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      showToast(type, message);
    }
  };

  // Function Definitions
  const formatIntegerWithComma = (integerPart) => {
    return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatDecimalPlaces = (decimalPart) => {
    if (decimalPart === undefined) {
      return "00"; // No decimal part, return "00"
    }

    // Truncate or round to a maximum of four decimal places
    let formattedDecimalPart = decimalPart.substring(0, 4);

    // Ensure exactly two decimal places
    if (formattedDecimalPart.length === 0) {
      return "00"; // No decimal part at all
    } else if (formattedDecimalPart.length === 1) {
      return `${formattedDecimalPart}0`; // One decimal place, append one zero
    } else if (formattedDecimalPart.length === 2) {
      return `${formattedDecimalPart}`; // Two decimal places
    } else if (formattedDecimalPart.length === 3) {
      return `${formattedDecimalPart}`; // Three decimal places
    } else {
      return formattedDecimalPart; // Four decimal places or more, no extra padding needed
    }
  };

  const formatNumberWithCommaAndDecimal = (number) => {
    if (number == null || number == "") return "0.00";
    const numStr = number.toString();
    const [integerPart, decimalPart] = numStr.split(".");
    const formattedIntegerPart = formatIntegerWithComma(integerPart);
    const formattedDecimalPart = formatDecimalPlaces(decimalPart);
    return `${formattedIntegerPart}.${formattedDecimalPart}`;
  };

  const renderForms = (
    <div className="mb-3">
      <div>
        <label htmlFor="service_type" className="form-control">
          <div className="label">
            <span className="label-text">Subject</span>
          </div>

          <input
            type="text"
            name="service_type"
            value={formData.service_type}
            onChange={handleOnChange}
            className="input input-bordered w-full"
            placeholder="Enter a subject"
            required
          />
        </label>
      </div>
      <div className="divider"></div>
      <div className="flex flex-row gap-2 items-end w-full">
        <label htmlFor="task" className="form-control w-full">
          <div className="label">
            <span className="label-text">Scope of Work</span>
          </div>
          <input
            type="text"
            name="task"
            value={scopeData.task}
            onChange={handleOnChangeScope}
            className="input input-bordered w-full"
            placeholder="Enter scope of work"
          />
        </label>

        <button
          className="btn btn-md bg-primary border-none text-white rounded-[15px]"
          onClick={() => {
            if (selectedScope != -1) {
              let updatedScope = formData.scope_of_work.map((scope, index) => {
                if (index == selectedScope) {
                  return scopeData;
                }
                return scope;
              });
              setFormData({ ...formData, scope_of_work: updatedScope });
            } else {
              let newScope = [...formData.scope_of_work, scopeData];
              setFormData({ ...formData, scope_of_work: newScope });
            }
            setScopeData(ScopeOfWorkState);
            setSelectedScope(-1);
          }}
          type="button"
        >
          {selectedScope == -1 ? (
            <>
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 2.7C10.5523 2.7 11 3.10294 11 3.6V8.1H16C16.5523 8.1 17 8.50294 17 9C17 9.49705 16.5523 9.9 16 9.9H11V14.4C11 14.8971 10.5523 15.3 10 15.3C9.44772 15.3 9 14.8971 9 14.4V9.9H4C3.44772 9.9 3 9.49705 3 9C3 8.50294 3.44772 8.1 4 8.1L9 8.1V3.6C9 3.10294 9.44772 2.7 10 2.7Z"
                  fill="#FCFCFC"
                />
              </svg>
              Add
            </>
          ) : (
            "Save"
          )}
        </button>
      </div>

      <label htmlFor="sub_task" className="form-control my-2">
        <div className="label">
          <span className="label-text">Description</span>
        </div>
        <textarea
          name="sub_task"
          className="textarea textarea-bordered w-full"
          placeholder="Enter description"
          value={scopeData.sub_task}
          onChange={handleOnChangeScope}
        ></textarea>
      </label>

      <div className="mt-2 flex items-center gap-2">
        <label htmlFor="service_fee" className="form-control grow">
          <div className="label">
            <span className="label-text">Service Fee</span>
          </div>
          <input
            type="number"
            name="service_fee"
            value={scopeData.service_fee}
            onChange={handleOnChangeScope}
            className="input input-bordered w-full"
            placeholder="Enter the service fee"
          />
        </label>

        <label htmlFor="oop_expenses" className="form-control grow">
          <div className="label">
            <span className="label-text">Out-of-pocket Expenses</span>
          </div>
          <input
            type="text"
            name="oop_expenses"
            value={scopeData.oop_expenses}
            onChange={handleOnChangeScope}
            className="input input-bordered w-full"
            placeholder="Enter the out of pocket expenses"
          />
        </label>
      </div>
    </div>
  );

  useEffect(() => {
    dispatch(setToDefaultRecord());
  }, []);

  useEffect(() => {
    setFormData({ ...quote.form_data });
  }, [quote]);

  useEffect(() => {
    if (currentUser.user_id != "") {
      setIsLoading(false);
    }
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="text-center">
        <span className="loading loading-spinner loading-sm"></span>
      </div>
    );
  }

  return (
    <section>
      <div className="bg-base-100 shadow-xl flex flex-col p-2 border rounded-xl">
        <div className="flex flex-col">
          <div className="flex w-full justify-end">
            <button
              className="text-red-500"
              onClick={() => {
                navigate(`/quote`);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <h2 className="card-title justify-center">Company Details</h2>
        </div>

        <form className="xl:flex xl:flex-col xl:gap-2" onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <label htmlFor="recipient_company" className="form-control w-full">
              <div className="label">
                <span className="label-text">Recipient Company</span>
              </div>

              <input
                type="text"
                name="recipient_company"
                value={formData.recipient_company}
                onChange={handleOnChange}
                className="input input-bordered w-full"
                placeholder="Enter a recipient company"
                required
              />
            </label>

            <label htmlFor="recipient_name" className="form-control w-full">
              <div className="label">
                <span className="label-text">Recipient Name</span>
              </div>

              <input
                type="text"
                name="recipient_name"
                value={formData.recipient_name}
                onChange={handleOnChange}
                className="input input-bordered w-full"
                placeholder="Enter a recipient's name"
                required
              />
            </label>

            {/* <label
              htmlFor="recipient_position"
              className="form-control w-full"
            >
              <div className="label">
                <span className="label-text">Recipient Position</span>
              </div>

              <input
                type="text"
                name="recipient_position"
                value={formData.recipient_position}
                onChange={handleOnChange}
                className="input input-bordered w-full"
                placeholder="Enter the recipient's position"
                required
              />
            </label> */}

            <label htmlFor="recipient_email" className="form-control w-full">
              <div className="label">
                <span className="label-text">Recipient Email</span>
              </div>

              <input
                type="email"
                name="recipient_email"
                value={formData.recipient_email}
                onChange={handleOnChange}
                className="input input-bordered w-full"
                placeholder="Enter the recipient's email"
                required
              />
            </label>
            <label htmlFor="recipient_address" className="form-control w-full">
              <div className="label">
                <span className="label-text">Recipient Address</span>
              </div>

              <input
                type="text"
                name="recipient_address"
                value={formData.recipient_address}
                onChange={handleOnChange}
                className="input input-bordered w-full"
                placeholder="Enter the recipients address"
                required
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <label htmlFor="currency" className="form-control w-full">
              <div className="label">
                <span className="label-text">Currency</span>
              </div>

              <select
                className="select select-bordered w-full"
                name="currency"
                value={formData.currency}
                onChange={handleOnChange}
                required
              >
                <option value="">Select a Currency</option>
                <option value="USD">USD</option>
                <option value="PHP">PHP</option>
              </select>
            </label>

            <label htmlFor="billing_account" className="form-control w-full">
              <div className="label">
                <span className="label-text">Billing Account</span>
              </div>

              <select
                className="select select-bordered w-full"
                name="billing_account"
                value={formData.billing_account}
                onChange={handleOnChange}
                required
              >
                <option>Select a Company</option>
                <option value="Viascari, Inc.">Viascari, Inc.</option>
                <option value="Offshore Concept BPO Services, Inc.">
                  Offshore Concept BPO Services, Inc.
                </option>
              </select>
            </label>

            <label htmlFor="due_date" className="form-control w-full">
              <div className="label">
                <span className="label-text">Due Date</span>
              </div>

              <input
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleOnChange}
                className="input input-bordered w-full"
                required
              />
            </label>
          </div>

          <div className="divider"></div>

          {renderForms}

          <div className="flex flex-col w-full py-5">
            {formData.scope_of_work.map((scope, index) => {
              let service_fee = formatNumberWithCommaAndDecimal(
                scope.service_fee
              );

              let display_service_fee =
                formData.currency == "USD"
                  ? `${service_fee} USD`
                  : `PHP ${service_fee} + 12% VAT`;

              let display_oop_expenses = scope.oop_expenses;

              return (
                <div
                  key={`scope_of_work_${index}`}
                  className="flex flex-row w-full mb-5 gap-2"
                >
                  <ul className="list-disc pl-10 w-full">
                    <li>
                      <span className="font-bold">{scope.task}</span>{" "}
                      <span>{scope.sub_task}</span>
                    </li>
                    <div className="font-bold">
                      Service Fee: {display_service_fee}
                    </div>
                    <div className="font-bold">
                      OOP Expenses: {display_oop_expenses}
                    </div>
                  </ul>
                  <div className="flex flex-row gap-2">
                    <button
                      className="btn btn-outline btn-sm"
                      type="button"
                      onClick={() => {
                        setScopeData(scope);
                        setSelectedScope(index);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                      </svg>
                    </button>
                    <button
                      className="btn btn-outline btn-sm btn-error"
                      type="button"
                      onClick={() => {
                        let newScopes = formData.scope_of_work.filter(
                          (_, idx) => index != idx
                        );

                        setFormData({ ...formData, scope_of_work: newScopes });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end w-full">
            <button
              className="btn btn-md bg-primary border-none text-white flex flex-row justify-center items-center rounded-[15px]"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewQuote;
