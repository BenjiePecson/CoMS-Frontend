import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const appointeeState = {
  name: "",
  id_no: "",
  date_place_issued: "",
};

export const stockholderState = {
  name: "",
  nationality: "",
  no_of_subscribed_shares: "",
  amount_of_subscribed_shares: "",
  paidup_capital: "",
  amount_of_paid_APIC: "",
  total_amount_paid: "",
};

export const DocumentDraftingDataState = {
  type: "Certificate of Gross Sales/Receipts",
  corporate_name: "",
  office_address: "",

  //CGR
  total_revenue: "",
  date_from: "",
  date_to: "",
  year: "",
  revenue_q1: "",
  revenue_q2: "",
  revenue_q3: "",
  revenue_q4: "",

  //Preemptive Rights
  meeting_date: "",
  meeting_place: "",
  from: "",
  from_divided_into: "",
  from_par_value: "",
  to: "",
  to_divided_into: "",
  to_par_value: "",

  //List of Stockholders
  as_of: "",
  stockholders_data: [],

  //For Authorization
  // meeting_date: "",
  resolutions: [
    "RESOLVED, as it resolved that the Board of Directors hereby appoint {{name}}, {{position}} as the Point of Contact to transact, apply, submit, receive, sign for on behalf of the company in all Converge related transactions.",
    "RESOLVED FURTHER, to authorize, negotiate, secure, claim and receive from the above stated agency any and all documents related to the above mentioned power. ",
    "RESOLVED FINALLY, to authorize the above-named person/s to perform such other acts and to execute and sign any and all documents necessary to the accomplishment of the above mentioned authority.",
  ],

  //Signatory
  officer_name: "",
  officer_position: "",
  officer_nationality: "",

  //Corporate Secretary
  corp_sec: "",
  corp_sec_address: "",

  //Affidavit of Loss
  list_items: [
    "I am the registered Corporate Secretary of {{corporate_name}}, a company duly registered with the Security and Exchange Commissions under SEC Registration No. {{sec_registration_number}} and with TIN {{corporate_tin}}, with principal office address at {{complete_principal_office_address}};",
    "That the said loss was discovered on or about {{last_dicovered_date}} and despite diligent efforts, we are unable to locate or recover the said {{missing_items}};",
    "I am executing this affidavit to attest to the truth of the foregoing in order to secure a certified true copy of the documents required for updating the Corporation’s head office address from {{old_head_office}} to {{new_head_office}}.",
  ],

  appointees: [appointeeState],
};

const DocumentDraftingState = {
  document_id: "",
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
    let response = await axios.get(`/document-drafting/`, {
      params: { status },
    });

    console.log(response.data);

    return response.data;
  }
);

export const fetchRecords = createAsyncThunk(
  "DocumentDrafting/fetchRecords",
  async (companyId) => {
    let response = await axios.get(`/document-drafting/${companyId}`);

    return response.data;
  }
);

export const fetchRecord = createAsyncThunk(
  "DocumentDrafting/fetchRecord",
  async ({ document_id, company_id }) => {
    let response = await axios.get(
      `/document-drafting/${company_id}/${document_id}`
    );
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
