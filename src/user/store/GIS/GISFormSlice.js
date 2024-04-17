import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authCapitalStockState = {
  type_of_shares: "",
  number_of_shares: "",
  par_or_stated_value: "",
  amount: "",
};

const filipinoSubscribeCapitalState = {
  number_of_stock_holders: "",
  types_of_shares: "",
  number_of_shares: "",
  number_of_shares_in_hands: "",
  par_or_stated_value: "",
  amount: "",
  percent_of_ownership: "",
};

const foreignSubscribeCapitalState = {
  nationality: "",
  number_of_stock_holders: "",
  types_of_shares: "",
  number_of_shares: "",
  number_of_shares_in_hands: "",
  par_or_stated_value: "",
  amount: "",
  percent_of_ownership: "",
};

const subscribeCapitalState = {
  filipino: [filipinoSubscribeCapitalState],
  foreign: [foreignSubscribeCapitalState],
  sub_total_number_of_shares_filipino: 0,
  sub_total_amount_filipino: 0,
  sub_total_ownership_filipino: 0,
  sub_total_number_of_shares_foreign: 0,
  sub_total_amount_foreign: 0,
  sub_total_ownership_foreign: 0,
  total_number_of_shares: 0,
  total_amount: 0,
  total_percent_of_ownership: 0,
  percentage_of_foreign_equity: 0,
};

const paidUpCapitalState = {
  filipino: [filipinoSubscribeCapitalState],
  foreign: [foreignSubscribeCapitalState],
  sub_total_number_of_shares_filipino: 0,
  sub_total_amount_filipino: 0,
  sub_total_ownership_filipino: 0,
  sub_total_number_of_shares_foreign: 0,
  sub_total_amount_foreign: 0,
  sub_total_ownership_foreign: 0,
  total_number_of_shares: 0,
  total_amount: 0,
  total_percent_of_ownership: 0,
};

const directorsOrOfficersState = {
  name_or_current_residual_address: "",
  nationality: "",
  incorporator: "",
  board: "",
  gender: "",
  stock_holder: "",
  officer: "",
  executive_committe: "",
  tax_id_number: "",
};

const beneficialOwnershipDeclarationState = {
  complete_name: "",
  specific_residual_address: "",
  nationality: "",
  date_of_birth: "",
  tax_id_number: "",
  percent_of_ownership: "",
  type_of_beneficial_owner: "",
  category_of_beneficial_ownership: "",
};

const stockholdersInformationState = {
  name_etc: "",
  type: "",
  number: "",
  amount: "",
  percent_of_ownership: "",
  amount_paid: "",
  tax_id_number: "",
  total_number: 0,
  total_amount: 0,
};

const formDataState = {
  year: "",
  date_registered: "",
  official_email_address: "",
  corporate_name: "",
  fiscal_year_end: "",
  alternate_email_address: "",
  business_or_trade_name: "",
  corporate_tin: "",
  official_mobile_number: "",
  sec_registration_number: "",
  website_url_address: "N/A",
  name_of_external_auditor: "",
  date_of_annual_meeting: "",
  fax_number: "N/A",
  sec_accreditation_number: "",
  actual_date_of_annual_meeting: "",
  alternate_phone_number: "",
  industry_classification: "",
  complete_principal_office_address: "",
  telephone_number: "",
  geographical_code: "N/A",
  is_under_amla: false,
  has_complied_with_the_requirements: false,
  auth_capital_stock: {
    capital_stocks: [authCapitalStockState],
    total_number_of_shares: 0,
    total_amount: 0,
  },
  subscribe_capital: subscribeCapitalState,
  paid_up_capital: paidUpCapitalState,
  directors_or_officers: [directorsOrOfficersState],
  total_number_of_stockholders: "",
  number_of_stockholders_with_more_shares_each: "",
  total_assets_based_on_latest_audited: "",
  stock_holders_information: {
    information: [stockholdersInformationState],
    total_amount: 0,
    total_percent_of_ownership: 0,
  },
  corporate_secretary: "",
  beneficial_ownership_declaration: [beneficialOwnershipDeclarationState],
};

const initialState = {
  // records: [],
  formData: formDataState,
  selectedRecord: RecordState,
  status: "idle",
  error: null,
};

const GISFormSlice = createSlice({
  name: "formGIS",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload.formData;
    },
  },
});

export const { setFormData } =
GISFormSlice.actions;
export default GISFormSlice.reducer;
