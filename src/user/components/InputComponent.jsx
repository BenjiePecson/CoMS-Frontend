import React from "react";

const InputComponent = ({ type, value, name, rowIndex, state, setState }) => {
  const handleOnChangeAuthCapitalStock = (name, value, rowIndex) => {
    // Create a new array with the updated object
    const updatedTable = state.map((item, index) => {
      if (index === rowIndex) {
        return {
          ...item,
          [name]: value, // Update the specific key with the new value
        };
      }
      return item;
    });

    // Update the state with the new array
    setState(updatedTable);
  };

  return (
    <div className="w-full rounded-lg">
      <input
        className="w-full text-[12px] h-full p-2 rounded-lg bg-gray-200"
        type={type}
        value={value}
        name={name}
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
