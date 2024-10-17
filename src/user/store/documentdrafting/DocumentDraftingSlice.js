import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const DocumentDraftingDataState = {
  type: "Certificate of Gross Sales/Receipts",

  corporate_name: "",
  office_address: "",
  total_revenue: "",
  date_from: "",
  date_to: "",
  year: "",
  revenue_q1: "",
  revenue_q2: "",
  revenue_q3: "",
  revenue_q4: "",
  officer_name: "",
  officer_position: "",
};

const DocumentDraftingState = {
  form_id: "",
  company_id: "",
  form_name: "",
  status: "",
  form_data: DocumentDraftingDataState,
  folder_id: "",
  created_by: "",
  modified_by: "",
  created_at: "",
  updated_at: "",
};

export const fetchAllRecords = createAsyncThunk(
  "DocumentDrafting/fetchAllRecords",
  async (status) => {
    let response = await axios.get(`/mc28forms/`, {
      params: { status },
    });

    return [];
    return response.data;
  }
);

export const fetchRecords = createAsyncThunk(
  "DocumentDrafting/fetchRecords",
  async (companyId) => {
    let response = await axios.get(`/mc28forms/${companyId}`);
    return [];

    return response.data;
  }
);

export const fetchRecord = createAsyncThunk(
  "DocumentDrafting/fetchRecord",
  async ({ form_id, company_id }) => {
    let response = await axios.get(`/mc28forms/${company_id}/${form_id}`);
    return [];

    return response.data;
  }
);

const initialState = {
  get_all_records: [],
  get_all_company_records: [],
  get_record: DocumentDraftingState,
  selected_record: DocumentDraftingState,
  status: "idle",
  error: null,
};

const DocumentDraftingSlice = createSlice({
  name: "DocumentDrafting",
  initialState,
  reducers: {
    addNewRecord: (state, action) => {
      state.get_all_company_records.push(action.payload);
    },

    updateRecord: (state, action) => {
      state.get_all_company_records.map((obj) => {
        if (obj.companyId === action.payload.companyId) {
          // obj.logo = action.payload.logo;
          // obj.companyName = action.payload.companyName;
          // obj.secNumber = action.payload.secNumber;
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
    builder.addCase(fetchAllRecords.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchAllRecords.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.get_all_records = action.payload;
    });
    builder.addCase(fetchAllRecords.rejected, (state, action) => {
      state.status = "rejected";
      state.get_all_records = [];
    });

    //fetch all company records
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
      state.selected_record = DocumentDraftingState;
    });
  },
});

export const { addNewRecord, updateRecord, deleteRecord } =
  DocumentDraftingSlice.actions;
export default DocumentDraftingSlice.reducer;
