import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChecklist = createAsyncThunk(
  "renewal-checklist/fetchChecklist", // action type
  async (companyId) => {
    const response = await axios.get(`/renewal-checklist/${companyId}`);
    console.log(response.data);
    return response.data;
  }
);

// Updated createBusinessRenewal to match your backend API
export const createBusinessRenewal = createAsyncThunk(
  "renewal-checklist/createBusinessRenewal",
  async ({ companyId, ...documentData }) => {
    const response = await axios.post(
      `/renewal-checklist/${companyId}`,
      documentData
    );
    return response.data;
  }
);

const businessRenewalSlice = createSlice({
  name: "businessRenewal",
  initialState: {
    checklist: [],
    loading: false,
    error: null,
    createLoading: false,
    createError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Existing fetch checklist cases
    builder
      .addCase(fetchChecklist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChecklist.fulfilled, (state, action) => {
        state.loading = false;
        state.checklist = action.payload;
      })
      .addCase(fetchChecklist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add cases for create business renewal
      .addCase(createBusinessRenewal.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createBusinessRenewal.fulfilled, (state, action) => {
        state.createLoading = false;
        state.checklist.push(action.payload);
      })
      .addCase(createBusinessRenewal.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload;
      });
  },
});

export default businessRenewalSlice.reducer;

// export const addNewYear = createAsyncThunk(
//   "businessRenewal/addNewYear",
//   async ({ companyId, yearData }) => {
//     const response = await axios.post(`/renewal-checklist/${companyId}`, {
//       ...yearData,
//       companyId,
//       year: Number(yearData.year),
//     });
//     return response.data;
//   }
// );
