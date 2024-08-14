import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const individualState = {
  individuals_id: "",
  companyId: "",
  surname: "",
  given_name: "",
  middle_name: "",
  ext_name: "",
  address: "",
  nationality: "",
  date_of_birth: "",
  tax_identification_no: "",
  created_at: "",
  updated_at: "",
};

const CompanyState = {
  companyId: "",
  companyName: "",
  logo: "",
  secNumber: "",
  corporateTin: "",
  dateRegistered: "",
  sss: "",
  hdmf: "",
  philHealth: "",
  status: true,
  gdrivefolders: {
    root: "",
    finaldocs: "",
    sec_cert: "",
    art_of_inc: "",
    by_laws: "",
    bir_or_cor: "",
    lgu_business_permit: "",
  },
  latestGIS: {},
  letterHeader: null,
  listOfIndividuals: [],
};

export const fetchCompanies = createAsyncThunk(
  "company/fetchCompanies",
  async () => {
    let response = await axios.get("/company/");
    const companies = response.data.map((company) => {
      if (company.gdrivefolders == null) {
        company.gdrivefolders = CompanyState.gdrivefolders;
      } else {
        company.gdrivefolders = JSON.parse(company.gdrivefolders);
      }
      if (company.listOfIndividuals == null) {
        company.listOfIndividuals = CompanyState.listOfIndividuals;
      }
      return company;
    });
    return companies;
  }
);

export const fetchCompany = createAsyncThunk(
  "company/fetchCompany",
  async (companyId) => {
    let response = await axios.get(`/company/${companyId}`);
    const companies = response.data.map((company) => {
      if (company.gdrivefolders == null) {
        company.gdrivefolders = CompanyState.gdrivefolders;
      } else {
        company.gdrivefolders = JSON.parse(company.gdrivefolders);
      }
      if (company.listOfIndividuals == null) {
        company.listOfIndividuals = CompanyState.listOfIndividuals;
      }
      return company;
    });

    let responseCurrentGIS = await axios.get(`/record/currentGIS/${companyId}`);

    companies[0].latestGIS = responseCurrentGIS.data;

    return companies;
  }
);

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
          obj.sss = action.payload.sss;
          obj.hdmf = action.payload.hdmf;
          obj.philHealth = action.payload.philHealth;
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

    updateIndividual: (state, action) => {
      state.selectedCompany.listOfIndividuals =
        state.selectedCompany.listOfIndividuals.map((individual) => {
          if (individual.individuals_id == action.payload.individuals_id) {
            return action.payload;
          }
          return individual;
        });
    },

    addListOfIndividuals: (state, action) => {
      state.selectedCompany.listOfIndividuals.push(action.payload);
    },

    removeIndividual: (state, action) => {
      state.selectedCompany.listOfIndividuals =
        state.selectedCompany.listOfIndividuals.filter(
          (u) => u.individuals_id != action.payload
        );
    },

    deleteCompanyTest: (state, action) => {
      state.companies = state.companies.filter(
        (item) => item.id !== action.payload.id
      );
    },

    updateLetterHeader: (state, action) => {
      state.selectedCompany = {
        ...state.selectedCompany,
        letterHeader: action.payload.letterHeader,
      };
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
  addListOfIndividuals,
  updateIndividual,
  removeIndividual,
  deleteCompanyTest,
  updateLetterHeader,
} = companySlice.actions;
export default companySlice.reducer;
