import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const ScopeOfWorkState = {
  task: "",
  sub_task: "",
  service_fee: "",
  oop_expenses: "",
};

export const QouteFormDataState = {
  recipient_company: "",
  recipient_address: "",
  recipient_email: "",
  recipient_name: "",
  service_type: "",
  billing_account: "",
  scope_of_work: [],
  due_date: "",
  currency: "",
};

const QuoteState = {
  quote_id: "",
  quote_number: "",
  quote_name: "",
  status: "",
  form_data: QouteFormDataState,
  folder_id: "",
  google_doc_id: "",
  timestamps: [],
  created_at: "",
  updated_at: "",
};

// export const fetchAllRecords = createAsyncThunk(
//   "MC28Form/fetchAllRecords",
//   async () => {
//     let response = await axios.get(`/quotes`);
//     return response.data;
//   }
// );

export const fetchRecords = createAsyncThunk(
  "QuoteSlice/fetchRecords",
  async (companyId) => {
    let response = await axios.get(`/quotes`);
    return response.data;
  }
);

export const fetchRecord = createAsyncThunk(
  "QuoteSlice/fetchRecord",
  async (quote_id) => {
    let response = await axios.get(`/quotes/${quote_id}`);
    return response.data;
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

    setToDefaultRecord: (state, action) => {
      state.get_record = QuoteState;
    },
  },
  extraReducers: (builder) => {
    // fetch all records
    builder.addCase(fetchRecords.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchRecords.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.get_all_quotes = action.payload;
    });
    builder.addCase(fetchRecords.rejected, (state, action) => {
      state.status = "rejected";
      state.get_all_quotes = [];
    });

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

export const { addNewRecord, updateRecord, deleteRecord, setToDefaultRecord } =
  QuoteSlice.actions;
export default QuoteSlice.reducer;
