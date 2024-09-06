import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./company/CompanySlice";
import GISRecordSlice from "./GIS/GISRecordSlice";
import GISFormSlice from "./GIS/GISFormSlice";
import UserSlice from "./user/UserSlice";
import NoticeOfMeetingSlice from "./boardmeetings/NoticeOfMeetingSlice";
import SecretaryCertificateSlice from "./boardmeetings/SecretaryCertificateSlice";

export const store = configureStore({
  reducer: {
    company: companyReducer,
    records: GISRecordSlice,
    formGIS: GISFormSlice,
    user: UserSlice,
    noticeOfMeeting: NoticeOfMeetingSlice,
    secretaryCertificate: SecretaryCertificateSlice,
  },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
