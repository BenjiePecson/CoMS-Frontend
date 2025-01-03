import React from "react";

const NavBar = ({ isActive, icon, text }) => {
  return (
    <div
      className={`flex flex-row hover:bg-[#667A8A] h-[45px] rounded-[3px] items-center my-2 ${
        isActive ? "bg-[#667A8A]" : ""
      }`}
    >
      <div className="flex flex-row px-4 items-center">
        <div className="pr-4">{icon}</div>
        <h1 className={`text-white ${isActive && "font-bold"}`}>{text}</h1>
      </div>
    </div>
  );
};

export default NavBar;
