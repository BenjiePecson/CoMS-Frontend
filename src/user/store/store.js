import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./company/CompanySlice";
import GISRecordSlice from "./GIS/GISRecordSlice";
import GISFormSlice from "./GIS/GISFormSlice";
import UserSlice from "./user/UserSlice";
import NoticeOfMeetingSlice from "./boardmeetings/NoticeOfMeetingSlice";
import SecretaryCertificateSlice from "./boardmeetings/SecretaryCertificateSlice";
import MC28FormSlice from "./MC28Form/MC28FormSlice";
import DocumentDraftingSlice from "./documentdrafting/DocumentDraftingSlice";

export const store = configureStore({
  reducer: {
    company: companyReducer,
    records: GISRecordSlice,
    formGIS: GISFormSlice,
    user: UserSlice,
    noticeOfMeeting: NoticeOfMeetingSlice,
    secretaryCertificate: SecretaryCertificateSlice,
    MC28Form: MC28FormSlice,
    DocumentDrafting: DocumentDraftingSlice,
  },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
