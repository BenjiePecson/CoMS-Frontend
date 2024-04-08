import React from "react";

const Input = ({
  title,
  type,
  name,
  value,
  required = false,
  placeholder = "",
  formData,
  setFormData,
}) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">
          {title} {required && <span className="text-red-500">*</span>}
        </span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full input-sm"
        name={name}
        value={value}
        onChange={(e) => {
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value,
          });
        }}
      />
    </label>
  );
};

export default Input;
