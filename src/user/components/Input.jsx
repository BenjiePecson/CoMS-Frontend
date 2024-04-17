import React from "react";

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

const Input = ({
  // title,
  // type,
  // name,
  // value,
  // required = false,
  // placeholder = "",
  // formData,
  // setFormData,
  title,
  type,
  name,
  value,
  required = false,
  // placeholder = "",
  // formData,
  // setFormData,
  handleOnChange,
  handleIconButton,
  disabled
  
}) => {
  return (
    // <label className="form-control w-full">
    //   <div className="label">
    //     <span className="label-text">
    //       {title} {required && <span className="text-red-500">*</span>}
    //     </span>
    //   </div>
    //   <input
    //     type={type}
    //     placeholder={placeholder}
    //     className="input input-bordered w-full input-sm"
    //     name={name}
    //     value={value}
    //     onChange={(e) => {
    //       const { name, value } = e.target;
    //       setFormData({
    //         ...formData,
    //         [name]: value,
    //       });
    //     }}
    //   />
    // </label>
    <div>
      <div className="label">
        <span className="label-text">
          {title} {required && <span className="text-red-500">*</span>}
        </span>
      </div>
      <label className="input input-bordered flex items-center gap-2 input-sm">
        <input
          type={type}
          className="grow"
          disabled={disabled}
          name={name}
          value={value}
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <button
          onClick={() => {
            handleIconButton();
          }}
        >
          {disabled ? editSVG : saveSVG}
        </button>
      </label>
    </div>
  );
};

export default Input;
