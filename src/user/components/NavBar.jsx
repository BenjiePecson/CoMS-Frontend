import React from "react";

const NavBar = ({isActive, icon, text}) => {
  return (
    <div
      className={`flex flex-row hover:bg-[#667A8A] h-[45px] rounded-[3px] items-center my-4 ${
        isActive ? "bg-[#667A8A]" : ""
      }`}
    >
      <div className="px-6">
        {icon}
      </div>
      <div
        className={`${
          isActive ? "poppins-semibold" : "poppins-regular"
        } text-white`}
      >
        {text}
      </div>
    </div>
  );
};

export default NavBar;
