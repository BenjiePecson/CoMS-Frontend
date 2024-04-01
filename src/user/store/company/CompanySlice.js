import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CompanyState = {
  companyId: "",
  companyName: "",
  logo: "",
  secNumber: "",
  status: true,
};

const fetchCompanies = async () => {

  let response = await axios.get("http://localhost:3000/company/");

  return response.data;

  let data = [
    {
      logo: "/company_logos/fs.png",
      company_name: "Viascari, Inc.",
      sec_cert: "CS20178898",
      status: true,
    },
    {
      logo: "/logo.png",
      company_name: "Offshore Concept BPO Services Inc.",
      sec_cert: "CS201419616",
      status: true,
    },
    {
      logo: "/logo.png",
      company_name: "WeStitch Philippines Inc.",
      sec_cert: "2023110125337-11",
      status: true,
    },
    {
      logo: "/logo.png",
      company_name: "Ananda Wellness Corporation",
      sec_cert: "2023110123775-11",
      status: true,
    },
    {
      logo: "/logo.png",
      company_name: "Cacha Corporation",
      sec_cert: "2023110123777-03",
      status: true,
    },
    {
      logo: "/logo.png",
      company_name: "CloudEats Ph, Inc.",
      sec_cert: "2022060054609-86",
      status: true,
    },
    {
      logo: "/logo.png",
      company_name: "Movet Petcare Inc.",
      sec_cert: "2021020006629-05",
      status: true,
    },
    {
      logo: "/logo.png",
      company_name: "Envie Food Concept Inc.",
      sec_cert: "CS201819204",
      status: true,
    },
    {
      logo: "/logo.png",
      company_name: "IZA Branding Concept Inc.",
      sec_cert: "2021090024931-02",
      status: true,
    },
    {
      logo: "/logo.png",
      company_name: "Teetalk.PH, Inc.",
      sec_cert: "CS201419619",
      status: true,
    },
    {
      logo: "/logo.png",
      company_name: "Kapon Pilipinas Inc.",
      sec_cert: "2023110123777-03",
      status: true,
    },
  ];

  return data;
};

const initialState = {
  companies: await fetchCompanies(),
  company: CompanyState,
  status: "idle",
  error: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    getCompanies: async (state, action) => {
      state.companies = await fetchCompanies();
    },

    addCompany: (state, action) => {
      state.companies.push(action.payload);
    },

    updateCompany: (state, action) => {
      state.companies.map((obj) => {
        if (obj.id === action.payload.id) {
          obj.logo = action.payload.logo;
          obj.company_name = action.payload.company_name;
          obj.sec_cert = action.payload.sec_cert;
          obj.status = action.payload.status;
        }
      });
    },

    changeCompanyStatus: (state, action) => {
      state.companies.map((obj) => {
        if (obj.companyId === action.payload.companyId) {
          obj.status = action.payload.status;
        }
      });
    },

    deleteCompanyTest: (state, action) => {
      state.companies = state.companies.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const {
  getCompanies,
  addCompany,
  updateCompany,
  changeCompanyStatus,
  deleteCompanyTest,
} = companySlice.actions;
export default companySlice.reducer;
