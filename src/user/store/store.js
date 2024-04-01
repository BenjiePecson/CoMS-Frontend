import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './company/CompanySlice';

export const store = configureStore({
  reducer: {
    company: companyReducer
  },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;


