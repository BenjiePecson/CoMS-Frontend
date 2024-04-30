import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const UserState = {
  user: "",
  username: "",
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  let response = await axios.get(`/login/success`, { withCredentials: true });
  console.log(response.data.user);
  if (response.data.user != null){
    localStorage.setItem("accessToken", response.data.user.jwtAccessToken);
  } else {
    localStorage.removeItem("accessToken");
  }
  return response.data.user;
});

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.record;
    },
  },
  extraReducers: (builder) => {
    //fetch user
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = "rejected";
      state.user = null;
    });
  },
});

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;
