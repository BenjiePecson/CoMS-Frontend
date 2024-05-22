import React from "react";

const InputComponent = ({
  type,
  value,
  name,
  rowIndex,
  state,
  setState,
  disabled = false,
}) => {
  const handleOnChangeAuthCapitalStock = (name, value, rowIndex) => {
    // Create a new array with the updated object
    const updatedTable = state.map((item, index) => {
      if (index === rowIndex) {
        if (name === "par_or_stated_value") {
          return {
            ...item,
            [name]: value, // Update the specific key with the new value
            amount: item.number_of_shares * value,
          };
        } else if (name === "number_of_shares") {
          return {
            ...item,
            [name]: value, // Update the specific key with the new value
            amount: item.par_or_stated_value * value,
          };
        } else {
          return {
            ...item,
            [name]: value, // Update the specific key with the new value
          };
        }
      }
      return item;
    });

    // Update the state with the new array
    setState(updatedTable);
  };

  return (
    <div className="w-full rounded-lg">
      <input
        className={`w-full text-[12px] h-full p-2 rounded-lg ${(disabled ? "" : "bg-gray-200")}`}
        type={type}
        value={value}
        name={name}
        disabled={disabled}
        onChange={(e) => {
          handleOnChangeAuthCapitalStock(
            e.target.name,
            e.target.value,
            rowIndex
          );
        }}
      />
    </div>
  );
};

export default InputComponent;
