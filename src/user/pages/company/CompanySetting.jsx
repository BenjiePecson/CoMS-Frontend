import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useSelector } from "react-redux";

const CompanySetting = () => {
  const selectedCompany = useSelector((state) => state.company.selectedCompany);

  return (
    <div>
      <Breadcrumbs
        lists={[
          { goto: "/", text: "Home" },
          {
            goto: `/company/${selectedCompany.companyId}`,
            text: `${selectedCompany.companyName}`,
          },

          { goto: "/", text: "Settings" },
        ]}
      />

      <div className="flex flex-row w-full justify-between items-center mt-5">
        <div className="flex flex-row justify-between w-full">
          <div className="poppins-bold text-color-2 text-[24px] flex items-center">
            Settings
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySetting;
