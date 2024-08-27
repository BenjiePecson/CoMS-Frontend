import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const gdrivefoldersState = {
  drafted: "",
  signed: "",
  notarized: "",
  filed: "",
};

const RecordState = {
  recordId: "",
  companyId: "",
  recordName: "",
  status: "",
  draftingInput: {},
  pdfFileLink: "",
  secFileLink: "",
  folder_id: "",
  createdBy: "",
  created_at: "",
  updated_at: "",
  // gdrivefolders: gdrivefoldersState,
};

export const fetchRecords = createAsyncThunk(
  "records/fetchRecords",
  async (companyId) => {
    let response = await axios.get(`/record/company/${companyId}`);
    // let records = response.data.map((record) => {
    //   if (record.gdrivefolders == null) {
    //     record.gdrivefolders = gdrivefoldersState;
    //   }
    //   return record;
    // });
    return response.data;
  }
);

export const fetchRecord = createAsyncThunk(
  "records/fetchRecord",
  async (recordId) => {
    let response = await axios.get(`/record/record/${recordId}`);
    return response.data;
  }
);

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
      state.records = state.records.filter(
        (item) => item.recordId !== action.payload
      );
    },

    renameRecordName: (state, action) => {
      state.records.map((obj) => {
        console.log(action.payload.recordName);
        if (obj.recordId === action.payload.recordId) {
          obj.recordName = action.payload.recordName;
        }
      });
    },

    updateRecordGdriveFolders: (state, action) => {
      state.records = state.records.map((record) => {
        if (record.recordId == action.payload.recordId) {
          record.folder_id = action.payload.folder_id;
        }
        return record;
      });
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

    //fetch record
    builder.addCase(fetchRecord.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchRecord.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.selectedRecord = action.payload;
    });
    builder.addCase(fetchRecord.rejected, (state, action) => {
      state.status = "rejected";
      state.selectedRecord = RecordState;
    });
  },
});

export const {
  addRecord,
  updateRecord,
  changeRecordStatus,
  deleteRecord,
  renameRecordName,
  updateRecordGdriveFolders,
} = GISRecordSlice.actions;
export default GISRecordSlice.reducer;
