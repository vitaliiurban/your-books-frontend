import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signInUser = createAsyncThunk("signInUser", async (user) => {
  const response = await fetch(
    `${process.env.VITE_BACKEND}/authentication/sign-in`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );
  const data = await response.json();
  return { data };
});

export const signUpUser = createAsyncThunk("signUpUser", async (user) => {
  const response = await fetch(
    `${process.env.VITE_BACKEND}/authentication/sign-up`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );
  const data = await response.json();
  return { data };
});

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: { data: {}, isLoading: false, isError: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload.data;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload.data;
    });
  },
});
export default authenticationSlice.reducer;
