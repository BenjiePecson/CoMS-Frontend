import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./company/CompanySlice";
import GISRecordSlice from "./GIS/GISRecordSlice";
import GISFormSlice from "./GIS/GISFormSlice";

export const store = configureStore({
  reducer: {
    company: companyReducer,
    records: GISRecordSlice,
    formGIS: GISFormSlice,
  },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
