import React from "react";

const Company = ({ company, toggleDelete, toggleEdit }) => {
  const tableRowStyle =
    company.status === 1 ? "cursor-pointer hover:bg-gray-200" : "hover:bg-gray-200";
  const active = (
    <span className="badge badge-success badge-lg text-white">Active</span>
  );
  const inactive = (
    <span className="badge badge-error badge-lg text-white">Inactive</span>
  );

  return (
    <>
      <tr
        className={tableRowStyle}
        onClick={() => {
          //check if the status is active
          if (company.status === 1) {
            window.location.href = "/user/"+company.id;
          }
        }}
      >
        <th>{company.id}</th>
        <td>
          <img
            className="w-[100%] object-contain aspect-square"
            src={company.logo}
            alt="Logo..."
          />
        </td>
        <td>
          <div className="mx-10">{company.company_name}</div>
        </td>
        <td>{company.sec_cert}</td>
        <td>{company.status === 1 ? active : inactive}</td>
        <td
          onClick={(e) => {
            e.stopPropagation();
            return false;
          }}
        >
          <div className="flex flex-row justify-between gap-2">
            <button
              onClick={() => {toggleEdit(company)}}
            >
              <svg
                width="44"
                height="37"
                viewBox="0 0 44 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="44" height="37" rx="10" fill="#273069" />
                <path
                  d="M15 26H30M22.6849 13.357L25.042 11L29.1667 15.1248L26.8097 17.4818M22.6849 13.357L18.0127 18.0292C17.8564 18.1855 17.7686 18.3975 17.7686 18.6185V22.398H21.5483C21.7693 22.398 21.9812 22.3103 22.1375 22.154L26.8097 17.4818M22.6849 13.357L26.8097 17.4818"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                toggleDelete(company.id);
              }}
            >
              <svg
                width="44"
                height="37"
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
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default Company;
