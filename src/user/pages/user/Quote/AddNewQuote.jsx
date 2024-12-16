import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddNewQuote = () => {
  const navigate = useNavigate();

  const formState = {
    scope: "Sekret",
    desc: "Hakdog",
    service_fee: 5000,
    out_of_pocket: 5000,
  };

  const [forms, setForms] = useState(
    [{
     id: 1,
     scope: "Sekret",
    desc: "Hakdog",
    service_fee: 5000,
    out_of_pocket: 5000,
    }
    ]);
  const addForm = () => {
    // setForms([...forms, { id: forms.length + 1 }]);
  };

  // const deleteForm = (id) => {
  //   if (forms.length > 1) {
  //     setForms(forms.filter((form) => form.id !== id));
  //   }
  // };

  const renderForms = (
    <div className="mb-3">
       <label
              htmlFor="service_type"
              className="form-control"
            >
              <div className="label">
                <span className="label-text">Service Type</span>
              </div>

              <input
                type="text"
                name="service_type"
                //value={data.recipient_position}
                // onChange={handleOnChange}
                className="input input-bordered w-full"
                placeholder="Enter a subject"
                required
              />
            </label>
      <div className="w-full lg:flex gap-2 justify-between items-center">
        <div className="mt-2 flex grow mb-2">
          <label htmlFor="task" className="form-control grow">
            <input
              type="text"
              name="task"
              //value={data.service_fee}
              //onChange={handleOnChange}
              className="input input-bordered w-full"
              placeholder="Enter scope of work"
              required
            />
          </label>
        </div>

        <div className="flex gap-2">
            <button
              className="btn btn-md bg-primary border-none text-white flex flex-row justify-center items-center rounded-[15px]"
              onClick={addForm}
            >
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
            </button>

          {/* <button
            className="h-[3rem] border-none  flex flex-row justify-center items-center rounded-[15px]"
            onClick={() => deleteForm(form.id)}
            disabled={forms.length === 1}
          >
            <svg
              className="w-full h-full"
              // width="20"
              // height="18"
              viewBox="0 0 44 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="44" height="37" rx="10" fill="#CF0404" />
              <path
                d="M28.3333 17.667V25.5003C28.3333 25.7765 28.1095 26.0003 27.8333 26.0003H17.1667C16.8905 26.0003 16.6667 25.7765 16.6667 25.5003V17.667M20.8333 22.667V17.667M24.1667 22.667V17.667M30 14.3333H25.8333M25.8333 14.3333V11.5C25.8333 11.2239 25.6095 11 25.3333 11H19.6667C19.3905 11 19.1667 11.2239 19.1667 11.5V14.3333M25.8333 14.3333H19.1667M15 14.3333H19.1667"
                stroke="white"
                strokeWidth="1.95694"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button> */}
        </div>
      </div>

      <label htmlFor="subtask" className="form-control my-2">
        <textarea
          name="subtask"
          className="textarea textarea-bordered w-full"
          placeholder="Enter task"
        ></textarea>
      </label>

      <div className="mt-2 flex items-center gap-2">
        <label htmlFor="service_fee" className="form-control grow">
          <input
            type="number"
            name="service_fee"
            //value={data.service_fee}
            //onChange={handleOnChange}
            className="input input-bordered w-full"
            placeholder="Enter the service fee"
            required
          />
        </label>

        <label htmlFor="oop_expenses" className="form-control grow">
          <input
            type="number"
            name="oop_expenses"
            //value={data.service_fee}
            //onChange={handleOnChange}
            className="input input-bordered w-full"
            placeholder="Enter the out of pocket expenses"
            required
          />
        </label>
      </div>
    </div>
  );

  return (
    <section>
      <div className="bg-base-100 shadow-xl flex flex-col p-2 border rounded-xl">
        <div className="flex flex-col">
          <button
            className="text-red-500 flex w-fit justify-end"
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

          <h2 className="card-title justify-center">Company Details</h2>
        </div>

        <form className="xl:flex xl:flex-col xl:gap-2">
          <div className="lg:flex lg:flex-row justify-center">
            <label
              htmlFor="recipient_company"
              className="form-control mx-2 lg:w-[30%]"
            >
              <div className="label">
                <span className="label-text">Recipient Company</span>
              </div>

              <input
                type="text"
                name="recipient_company"
                // value={data.recipient_company}
                // onChange={handleOnChange}
                className="input input-bordered w-full"
                placeholder="Enter a recipient company"
                required
              />
            </label>

            <label
              htmlFor="recipient_name"
              className="form-control mx-2 lg:w-[30%]"
            >
              <div className="label">
                <span className="label-text">Recipient Name</span>
              </div>

              <input
                type="text"
                name="recipient_name"
                //value={data.recipient_name}
                //onChange={handleOnChange}
                className="input input-bordered w-full"
                placeholder="Enter a recipient's name"
                required
              />
            </label>

            <label
              htmlFor="recipient_position"
              className="form-control mx-2 lg:w-[30%]"
            >
              <div className="label">
                <span className="label-text">Recipient Position</span>
              </div>

              <input
                type="text"
                name="recipient_position"
                //value={data.recipient_name}
                //onChange={handleOnChange}
                className="input input-bordered w-full"
                placeholder="Enter the recipient's position"
                required
              />
            </label>

            <label
              htmlFor="recipient_address"
              className="form-control mx-2 lg:w-[30%]"
            >
              <div className="label">
                <span className="label-text">Recipient Address</span>
              </div>

              <input
                type="text"
                name="recipient_address"
                //value={data.recipient_address}
                // onChange={handleOnChange}
                className="input input-bordered w-full"
                placeholder="Enter the recipients address"
                required
              />
            </label>
          </div>

          <div className="lg:flex lg:flex-row justify-center items-center">
            <label
              htmlFor="recipient_email"
              className="form-control mx-2 lg:w-[30%]"
            >
              <div className="label">
                <span className="label-text">Recipient Email</span>
              </div>

              <input
                type="email"
                name="recipient_email"
                //value={data.recipient_name}
                //onChange={handleOnChange}
                className="input input-bordered w-full"
                placeholder="Enter the recipient's email"
                required
              />
            </label>

            <label htmlFor="currency" className="form-control mx-2 lg:w-[30%]">
              <div className="label">
                <span className="label-text">Currency</span>
              </div>

              <select
                className="select select-bordered w-full"
                name="currency"
                // value={data.company}
                //onChange={handleOnChange}
                required
              >
                <option>Select a Currency</option>
                <option value="$">USD</option>
                <option value="₱">PHP</option>
              </select>
            </label>

            <label
              htmlFor="billing_account"
              className="form-control mx-2 lg:w-[30%]"
            >
              <div className="label">
                <span className="label-text">Billing Account</span>
              </div>

              <select
                className="select select-bordered w-full"
                name="billing_account"
                //value={data.company}
                // onChange={handleOnChange}
                required
              >
                <option>Select a Company</option>
                <option value="Viascari, Inc.">Viascari, Inc.</option>
                <option value="Offshore Concept BPO Services, Inc.">
                  Offshore Concept BPO Services, Inc.
                </option>
              </select>
            </label>

            <label htmlFor="due_date" className="form-control mx-2 lg:w-[30%]">
              <div className="label">
                <span className="label-text">Due Date</span>
              </div>

              <input
                type="date"
                name="due_date"
                //value={data.due_date}
                //onChange={handleOnChange}
                className="input input-bordered w-full"
                required
              />
            </label>
          </div>

          <div className="divider"></div>
          {renderForms}
        </form>
      </div>
    </section>
  );
};

export default AddNewQuote;
