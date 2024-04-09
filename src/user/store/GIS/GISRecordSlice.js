import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const RecordState = {
  recordId: "",
  companyId: "",
  recordName: "",
  status: "",
  draftingInput: {},
  pdfInput: {},
  pdfFileLink: "",
  secFileLink: "",
  createdBy: "",
  created_at: "",
  updated_at: "",
};

export const fetchRecords = createAsyncThunk(
  "records/fetchRecords",
  async (companyId) => {
    let response = await axios.get(`/record/company/${companyId}`);
    return response.data;
  }
);

// export const fetchCompany = createAsyncThunk("records/fetchCompany", async (companyId) => {
//   let response = await axios.get(`/company/${companyId}`);
//   return response.data;
// });

const initialState = {
  records: [],
  record: RecordState,
  selectedRecord: RecordState,
  status: "idle",
  error: null,
};

const GISRecordSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    setSelectedRecordCompanyId: (state, action) => {
      state.selectedRecord = action.payload.record;
    },

    addRecord: (state, action) => {
      state.companies.push(action.payload);
    },

    updateRecord: (state, action) => {
      state.companies.map((obj) => {
        if (obj.companyId === action.payload.companyId) {
          obj.logo = action.payload.logo;
          obj.companyName = action.payload.companyName;
          obj.secNumber = action.payload.secNumber;
        }
      });
    },

    changeRecordStatus: (state, action) => {
      state.companies.map((obj) => {
        if (obj.companyId === action.payload.companyId) {
          obj.status = action.payload.status;
        }
      });
    },

    deleteRecord: (state, action) => {
      state.companies = state.companies.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    //fetch records
    builder.addCase(fetchRecords.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchRecords.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.records = action.payload;
    });
    builder.addCase(fetchRecords.rejected, (state, action) => {
      state.status = "rejected";
      state.records = [];
    });

    // //fetch record
    // builder.addCase(fetchCompany.pending, (state) => {
    //   state.status = "pending";
    // });
    // builder.addCase(fetchCompany.fulfilled, (state, action) => {
    //   state.status = "fulfilled";
    //   state.selectedRecord = action.payload[0];
    // });
    // builder.addCase(fetchCompany.rejected, (state, action) => {
    //   state.status = "rejected";
    //   state.selectedRecord = RecordState;
    // });
  },
});

export const { addRecord, updateRecord, changeRecordStatus, deleteRecord } =
  GISRecordSlice.actions;
export default GISRecordSlice.reducer;
