import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CompanyState = {
  companyId: "",
  companyName: "",
  logo: "",
  secNumber: "",
  corporateTin: "",
  dateRegistered: "",
  status: true,
};

export const fetchCompanies = createAsyncThunk("company/fetchCompanies", async () => {
  let response = await axios.get("/company/");
  return response.data;
});

export const fetchCompany = createAsyncThunk("company/fetchCompany", async (companyId) => {
  let response = await axios.get(`/company/${companyId}`);
  return response.data;
});

const initialState = {
  companies: [],
  company: CompanyState,
  selectedCompany: CompanyState,
  status: "idle",
  error: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {

    addCompany: (state, action) => {
      state.companies.push(action.payload);
    },

    updateCompany: (state, action) => {
      state.companies.map((obj) => {
        if (obj.companyId === action.payload.companyId) {
          obj.logo = action.payload.logo;
          obj.companyName = action.payload.companyName;
          obj.secNumber = action.payload.secNumber;
          obj.corporateTin = action.payload.corporateTin;
          obj.dateRegistered = action.payload.dateRegistered;

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
  extraReducers: (builder) => {

    //Companies
    builder.addCase(fetchCompanies.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchCompanies.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.companies = action.payload;
    });
    builder.addCase(fetchCompanies.rejected, (state, action) => {
      state.status = "rejected";
      state.companies = [];
    });

    //Company
    builder.addCase(fetchCompany.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchCompany.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.selectedCompany = action.payload[0];
    });
    builder.addCase(fetchCompany.rejected, (state, action) => {
      state.status = "rejected";
      state.selectedCompany = CompanyState;
    });
  },
});

export const {
  addCompany,
  updateCompany,
  changeCompanyStatus,
  deleteCompanyTest,
} = companySlice.actions;
export default companySlice.reducer;
