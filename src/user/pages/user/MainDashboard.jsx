import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header.jsx";
import Company from "../../components/Company.jsx";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import {
  addCompany,
  updateCompany,
  changeCompanyStatus,
  deleteCompanyTest,
  fetchCompanies,
} from "../../store/company/CompanySlice.js";

import {
  checkCompanyLogo,
  checkCompanyName,
  checkSECCert,
  showAlert,
  checkDateRegistered,
} from "../../../assets/global.js";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../store/user/UserSlice.js";
import Breadcrumbs from "../../components/Breadcrumbs.jsx";
import DataTable, { createTheme } from "react-data-table-component";

const MainDashboard = () => {
  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row w-full gap-3 justify-between mt-5">
          <div className="flex flex-row w-full">
            <h1 className="poppins-bold text-color-2 text-[24px]">Dashboard</h1>
          </div>
        </div>

        <div className="flex flex-col w-full mt-5">Dashboard here</div>
      </div>
    </>
  );
};

export default MainDashboard;
