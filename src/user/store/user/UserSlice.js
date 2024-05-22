import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const UserState = {
  user: "",
  username: "",
};



export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const token = localStorage.getItem("access_token");
  let access_token = token.split(" ")[1];

  try {
    const response = await axios.post("/auth/check", {
      token: access_token,
    });
    console.log(response.data);

    // let response = await axios.get(
    //   `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    // );

    // console.log(response.data);
  } catch (error) {
    console.log(error);
    localStorage.removeItem("access_token");
  }
  return {};
});

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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

export const {} = UserSlice.actions;
export default UserSlice.reducer;
