import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const UserState = {
  user_id: "",
  email: "",
  first_name: "",
  last_name: "",
  roles: [],
  permissions: [],
  slackId: "",
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (token) => {
  try {
    const response = await axios.post("/auth/check", {
      access_token: token,
    });

    if (response.data.auth) {
      return {
        user_id: response.data.user.user_id,
        email: response.data.user.email,
        first_name: response.data.user.first_name,
        last_name: response.data.user.last_name,
        roles: response.data.user.roles,
        permissions: response.data.user.permissions,
        slackId: response.data.user.slackId,
      };
    }

    // let response = await axios.get(
    //   `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    // );

    // console.log(response.data);
  } catch (error) {
    console.log(error);
    localStorage.removeItem("access_token");
  }
  return UserState;
});

const initialState = {
  user: UserState,
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
