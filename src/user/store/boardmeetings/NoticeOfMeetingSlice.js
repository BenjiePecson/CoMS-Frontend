import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const other_details = {
  actual_meeting: "", //moment().format("yyyy-MM-DDThh:mm")
  confirmation_meeting: "",
  notice_meeting: "",
  place_of_meeting: "Video Conference",
  agendas: [],
  director: "",
  email: "",
};

const noticeOfMeetingState = {
  companyId: "",
  folder_id: "",
  nomId: "",
  notice_date: "",
  others: other_details,
  type_of_meeting: "Regular",
  place_of_meeting: "",
  proposed_meeting_date: "",
  quorum:"",
  status: "Drafted",
  type_of_meeting:"",
  files: [],
};

export const fetchNoticeOfMeetings = createAsyncThunk(
  "noticeOfMeeting/fetchNoticeOfMeetings",
  async (companyId) => {
    let response = await axios.get(`/notice-of-meeting/${companyId}`);
    return response.data;
  }
);

export const fetchNoticeOfMeeting = createAsyncThunk(
  "noticeOfMeeting/fetchNoticeOfMeeting",
  async (arg) => {
    const { companyId, nomId } = arg;
    let response = await axios.get(`/notice-of-meeting/${companyId}/${nomId}`);
    return response.data.result;
  }
);

const initialState = {
  noticeOfMeetings: [],
  noticeOfMeetingState: noticeOfMeetingState,
  selectednoticeOfMeeting: noticeOfMeetingState,
  status: "idle",
  error: null,
};

const noticeOfMeetingSlice = createSlice({
  name: "noticeOfMeeting",
  initialState,
  reducers: {
    addNoticeOfMeeting: (state, action) => {
      state.noticeOfMeetings.push(action.payload);
    },

    selectNoticeOfMeeting: (state, action) => {
      state.selectednoticeOfMeeting = action.payload;
    },

    updateNoticeOfMeeting: (state, action) => {
      state.noticeOfMeetings.map((obj) => {
        if (obj.companyId === action.payload.companyId) {
          obj.logo = action.payload.logo;
          obj.companyName = action.payload.companyName;
          obj.secNumber = action.payload.secNumber;
          obj.corporateTin = action.payload.corporateTin;
          obj.dateRegistered = action.payload.dateRegistered;
          obj.sss = action.payload.sss;
          obj.hdmf = action.payload.hdmf;
          obj.philHealth = action.payload.philHealth;
        }
      });
    },

    changeNoticeOfMeetingStatus: (state, action) => {
      state.noticeOfMeetings.map((obj) => {
        if (obj.companyId === action.payload.companyId) {
          obj.status = action.payload.status;
        }
      });
    },

    deleteNoticeOfMeeting: (state, action) => {
      state.noticeOfMeetings = state.noticeOfMeetings.filter(
        (item) => item.nomId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    //Fetch all Notice of Meetings
    builder.addCase(fetchNoticeOfMeetings.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchNoticeOfMeetings.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.noticeOfMeetings = action.payload;
    });
    builder.addCase(fetchNoticeOfMeetings.rejected, (state, action) => {
      state.status = "rejected";
      state.noticeOfMeetings = [];
    });

    //Select Notice of Meeting
    builder.addCase(fetchNoticeOfMeeting.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchNoticeOfMeeting.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.selectednoticeOfMeeting = action.payload[0];
    });
    builder.addCase(fetchNoticeOfMeeting.rejected, (state, action) => {
      state.status = "rejected";
      state.selectednoticeOfMeeting = noticeOfMeetingState;
    });
  },
});

export const {
  addNoticeOfMeeting,
  selectNoticeOfMeeting,
  updateNoticeOfMeeting,
  changeNoticeOfMeetingStatus,
  deleteNoticeOfMeeting,
} = noticeOfMeetingSlice.actions;
export default noticeOfMeetingSlice.reducer;
