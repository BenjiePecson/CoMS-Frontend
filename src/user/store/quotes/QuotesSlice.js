import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const QouteFormDataState = {
  recipient_company: "",
  recipient_name: "",
  recipient_address: "",
  //for GIS
  recipient_email: "",
  recipient_position: "",
  
  service_fee: 0,
  out_of_pocket_expenses: 0,
  due_date: "",
  service_provider: "",
  service_provider_position: "",
  service_type: "",
  scope_of_work: "",
  company: "",
};

const QuoteState = {
  quote_id: "",
  quote_number: "",
  quote_name: "",
  status: "",
  form_data: QouteFormDataState,
  folder_id: "",
  google_doc_id: "",
  stamps: [],
  created_at: "",
  updated_at: "",
};

// export const fetchAllRecords = createAsyncThunk(
//   "MC28Form/fetchAllRecords",
//   async (status) => {
//     let response = await axios.get(`/mc28forms/`, {
//       params: { status },
//     });
//     return response.data;
//   }
// );

// export const fetchRecords = createAsyncThunk(
//   "MC28Form/fetchRecords",
//   async (companyId) => {
//     let response = await axios.get(`/mc28forms/${companyId}`);
//     return response.data;
//   }
// );

export const fetchRecord = createAsyncThunk(
  "QuoteSlice/fetchRecord",
  async (quote) => {
    // let response = await axios.get(`/mc28forms/${company_id}/${form_id}`);
    // return response.data;
    return quote;
  }
);

const initialState = {
  get_all_quotes: [],
  get_record: QuoteState,
  selected_record: QuoteState,
  status: "idle",
  error: null,
};

const QuoteSlice = createSlice({
  name: "QuoteSlice",
  initialState,
  reducers: {
    addNewRecord: (state, action) => {
      state.get_all_quotes.push(action.payload);
    },

    updateRecord: (state, action) => {
      state.get_all_quotes.map((obj) => {
        if (obj.quote_id === action.payload.quote_id) {
          return action.payload;
        } else {
          return obj;
        }
      });
    },

    deleteRecord: (state, action) => {
      state.records = state.records.filter(
        (item) => item.quote_id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    //fetch all records
    // builder.addCase(fetchRecords.pending, (state) => {
    //   state.status = "pending";
    // });
    // builder.addCase(fetchRecords.fulfilled, (state, action) => {
    //   state.status = "fulfilled";
    //   state.get_all_company_records = action.payload;
    // });
    // builder.addCase(fetchRecords.rejected, (state, action) => {
    //   state.status = "rejected";
    //   state.get_all_company_records = [];
    // });

    //fetch record
    builder.addCase(fetchRecord.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchRecord.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.get_record = action.payload;
    });
    builder.addCase(fetchRecord.rejected, (state, action) => {
      state.status = "rejected";
      state.get_record = QuoteState;
    });
  },
});

export const { addNewRecord, updateRecord, deleteRecord } =
QuoteSlice.actions;
export default QuoteSlice.reducer;
