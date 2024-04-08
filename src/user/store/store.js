import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./company/CompanySlice";
import GISRecordSlice from "./GIS/GISRecordSlice";

export const store = configureStore({
  reducer: {
    company: companyReducer,
    records: GISRecordSlice,
  },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
