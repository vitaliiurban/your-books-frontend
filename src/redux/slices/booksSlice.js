import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk(
  "fetchBooks",
  async ({ page, limit, searchQuery }) => {
    const quantityResponse = await fetch(
      `${process.env.VITE_BACKEND}/books/count`
    );
    const { quantity } = await quantityResponse.json();
    const response = await fetch(
      `${process.env.VITE_BACKEND}/books?page=${page}&limit=${limit}&searchQuery=${searchQuery}`
    );
    const data = await response.json();
    return { data, quantity };
  }
);

export const fetchReservesBooks = createAsyncThunk(
  "fetchReservesBooks",
  async ({ user_id }) => {
    const response = await fetch(
      `${process.env.VITE_BACKEND}/books/reserves/${user_id}`
    );
    const data = await response.json();
    return { data };
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: { data: [], isLoading: false, isError: false, quantity: 0 },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload.data;
        state.quantity = parseInt(action.payload.quantity);
      })
      .addCase(fetchReservesBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload.data.books;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export default booksSlice.reducer;
