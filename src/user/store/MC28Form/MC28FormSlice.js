import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import MC28Form from "../../pages/company/MC28Form";

export const MC28FormDataState = {
  type: "New",
  corporate_name: "",
  sec_registration_number: "",
  official_email_address: "",
  official_mobile_number: "",
  alternative_email_address: "",
  alternative_mobile_number: "",

  old_email1: "",
  new_email1: "",
  is_official_email1: false,
  is_alternate_email1: false,
  old_email2: "",
  new_email2: "",
  is_official_email2: false,
  is_alternate_email2: false,
  old_phone_number1: "",
  new_phone_number1: "",
  is_official_phone_number1: false,
  is_alternate_phone_number1: false,
  old_phone_number2: "",
  new_phone_number2: "",
  is_official_phone_number2: false,
  is_alternate_phone_number2: false,

  auth_name: "",
  office_address: "",
  date_of_resolution: "",
  is_representative: false,
};

const MC28FormState = {
  form_id: "",
  company_id: "",
  form_name: "",
  status: "",
  form_data: MC28FormDataState,
  folder_id: "",
  created_by: "",
  modified_by: "",
  created_at: "",
  updated_at: "",
};

export const fetchAllRecords = createAsyncThunk(
  "MC28Form/fetchAllRecords",
  async (status) => {
    let response = await axios.get(`/mc28forms/`, {
      params: { status },
    });
    return response.data;
  }
);

export const fetchRecords = createAsyncThunk(
  "MC28Form/fetchRecords",
  async (companyId) => {
    let response = await axios.get(`/mc28forms/${companyId}`);
    return response.data;
  }
);

export const fetchRecord = createAsyncThunk(
  "MC28Form/fetchRecord",
  async ({ form_id, company_id }) => {
    let response = await axios.get(`/mc28forms/${company_id}/${form_id}`);
    return response.data;
  }
);

const initialState = {
  get_all_company_records: [],
  get_record: MC28FormState,
  selected_record: MC28FormState,
  status: "idle",
  error: null,
};

const MC28FormSlice = createSlice({
  name: "MC28Form",
  initialState,
  reducers: {
    addNewRecord: (state, action) => {
      state.get_all_company_records.push(action.payload);
    },

    updateRecord: (state, action) => {
      state.get_all_company_records.map((obj) => {
        if (obj.companyId === action.payload.companyId) {
          obj.logo = action.payload.logo;
          obj.companyName = action.payload.companyName;
          obj.secNumber = action.payload.secNumber;
        }
      });
    },

    deleteRecord: (state, action) => {
      state.records = state.records.filter(
        (item) => item.recordId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    //fetch all records
    builder.addCase(fetchRecords.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchRecords.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.get_all_company_records = action.payload;
    });
    builder.addCase(fetchRecords.rejected, (state, action) => {
      state.status = "rejected";
      state.get_all_company_records = [];
    });

    //fetch record
    builder.addCase(fetchRecord.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchRecord.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.selected_record = action.payload;
    });
    builder.addCase(fetchRecord.rejected, (state, action) => {
      state.status = "rejected";
      state.selected_record = RecordState;
    });
  },
});

export const { addNewRecord, updateRecord, deleteRecord } =
  MC28FormSlice.actions;
export default MC28FormSlice.reducer;
