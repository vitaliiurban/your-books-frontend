import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBook = createAsyncThunk("fetchBook", async (id) => {
  const response = await fetch(`${process.env.VITE_BACKEND}/book/${id}`);
  const data = await response.json();
  return { data };
});

const bookSlice = createSlice({
  name: "book",
  initialState: { data: [], isLoading: false, isError: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBook.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload.data;
      })
      .addCase(fetchBook.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export default bookSlice.reducer;
