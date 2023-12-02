import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addReserve = createAsyncThunk(
  "addReserve",
  async ({ book_id, user_id }) => {
    console.log(book_id, user_id);
    const response = await fetch(`${process.env.VITE_BACKEND}/reserves`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book_id, user_id }),
    });
    const data = await response.json();
    return { data };
  }
);

const reservesSlice = createSlice({
  name: "reserves",
  initialState: { data: [], isLoading: false, isError: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addReserve.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload.data;
    });
  },
});
export default reservesSlice.reducer;
