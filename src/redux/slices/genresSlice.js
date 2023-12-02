import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGenre = createAsyncThunk("fetchGenre", async (id) => {
  const response = await fetch(`${process.env.VITE_BACKEND}/genres/${id}`);
  const data = await response.json();
  return { data };
});

const genresSlice = createSlice({
  name: "genres",
  initialState: { data: [], isLoading: false, isError: false, quantity: 0 },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenre.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchGenre.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload.data;
      })
      .addCase(fetchGenre.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export default genresSlice.reducer;
