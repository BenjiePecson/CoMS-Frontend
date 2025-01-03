import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const stockHoldersInfo = {
  name: "Ma. Rona Bargo Po",
  nationality: "Filipino",
  no_of_subscribed_shares: "1,189,997",
  amount_of_subscribed_shares: "1,189,997.00",
  paidup_capital: "1,189,997.00",
  amount_of_paid_APIC: "-",
  total_amount_paid: "1,189,997.00",
};

const appointeeInfo = {
  name: "Juana Change",
  position: "IT Officer",
};

const reso =
  "RESOLVED, as it resolved that the Board of Directors hereby appoint << Name >>, << Position >> as the Point of Contact to transact, apply, submit, receive, sign for on behalf of the company in all Converge related transactions.";
const initialData = {
  name: "",
  address: "",
  nationality: "",
  company: "",
  meeting_date: "",
  place_of_meeting: "",
  increase_from: "", //"ONE MILLION PESOS (PHP 1,000,000)",
  divided_into: "", //"ONE MILLION SHARES (1,000,000)",
  par_value_of: "", //"ONE PESO (PHP1.00)",
  par_value_to: "", //"FIVE MILLION PESOS (PHP5,000,000.00)",
  par_value_divided_into: "", //"FIVE MILLION SHARES (5,000,000)",
  par_value_each_of: "", //"ONE PESO (PHP1.00)",
  principal_office: "",
  as_of: "",
  stockHoldersInfo: [],
  offices: "Converge",
  appointees: [],
  board_meeting_date: "",
  board_resolutions: [reso],
  tax_id_number: "", //"123-456-789-000",
};

export const secretaryCertificateState = {
  companyId: "",
  gdrivefolder_id: "",
  seccert_id: "",
  type: "",
  details: initialData,
  status: "Drafted",
  created_at: "",
  updated_at: "",
};

export const fetchSecretaryCertificates = createAsyncThunk(
  "secretaryCertificate/fetchSecretaryCertificates",
  async (companyId) => {
    let response = await axios.get(`/secretary-certificate/${companyId}`);
    return response.data;
  }
);

export const fetchSecretaryCertificate = createAsyncThunk(
  "secretaryCertificate/fetchSecretaryCertificate",
  async (arg) => {
    const { companyId, seccert_id } = arg;
    let response = await axios.get(
      `/secretary-certificate/${companyId}/${seccert_id}`
    );
    return response.data.result;
  }
);

const initialState = {
  secretaryCertificates: [],
  secretaryCertificateState: secretaryCertificateState,
  selectedSecretaryCertificate: secretaryCertificateState,
  status: "idle",
  error: null,
};

const secretaryCertificateSlice = createSlice({
  name: "secretaryCertificate",
  initialState,
  reducers: {
    addSecretaryCertificate: (state, action) => {
      state.secretaryCertificates.push(action.payload);
    },

    // selectNoticeOfMeeting: (state, action) => {
    //   state.selectednoticeOfMeeting = action.payload;
    // },

    // updateNoticeOfMeeting: (state, action) => {
    //   state.noticeOfMeetings.map((obj) => {
    //     if (obj.companyId === action.payload.companyId) {
    //       obj.logo = action.payload.logo;
    //       obj.companyName = action.payload.companyName;
    //       obj.secNumber = action.payload.secNumber;
    //       obj.corporateTin = action.payload.corporateTin;
    //       obj.dateRegistered = action.payload.dateRegistered;
    //       obj.sss = action.payload.sss;
    //       obj.hdmf = action.payload.hdmf;
    //       obj.philHealth = action.payload.philHealth;
    //     }
    //   });
    // },

    // changeNoticeOfMeetingStatus: (state, action) => {
    //   state.noticeOfMeetings.map((obj) => {
    //     if (obj.companyId === action.payload.companyId) {
    //       obj.status = action.payload.status;
    //     }
    //   });
    // },

    deleteSecretaryCertificates: (state, action) => {
      state.secretaryCertificates = state.secretaryCertificates.filter(
        (item) => item.seccert_id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    //Fetch all Notice of Meetings
    builder.addCase(fetchSecretaryCertificates.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchSecretaryCertificates.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.secretaryCertificates = action.payload;
    });
    builder.addCase(fetchSecretaryCertificates.rejected, (state, action) => {
      state.status = "rejected";
      state.secretaryCertificates = [];
    });

    //Select Notice of Meeting
    builder.addCase(fetchSecretaryCertificate.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchSecretaryCertificate.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.selectedSecretaryCertificate = action.payload[0];
    });
    builder.addCase(fetchSecretaryCertificate.rejected, (state, action) => {
      state.status = "rejected";
      state.selectedSecretaryCertificate = secretaryCertificateState;
    });
  },
});

export const { addSecretaryCertificate, deleteSecretaryCertificates } =
  secretaryCertificateSlice.actions;
export default secretaryCertificateSlice.reducer;
