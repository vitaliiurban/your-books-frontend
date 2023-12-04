import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFavorite = createAsyncThunk("fetchFavorite", async (id) => {
  const response = await fetch(`${process.env.VITE_BACKEND}/favorites/${id}`);
  const data = await response.json();
  return { data };
});

export const addFavorite = createAsyncThunk(
  "addFavorite",
  async ({ book_id, user_id }) => {
    const response = await fetch(`${process.env.VITE_BACKEND}/favorites/add`, {
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

export const deleteFavorite = createAsyncThunk(
  "deleteFavorite",
  async ({ id, book_id, user_id }) => {
    const response = await fetch(
      `${process.env.VITE_BACKEND}/favorites/delete/${id}?book_id=${book_id}&user_id=${user_id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return { data };
  }
);

export const checkFavorite = createAsyncThunk(
  "checkFavorite",
  async ({ book_id, user_id }) => {
    const response = await fetch(
      `${process.env.VITE_BACKEND}/favorites/check-favorite?book_id=${book_id}&user_id=${user_id}`
    );
    const data = await response.json();
    return { data };
  }
);

const favoritesSlice = createSlice({
  name: "favoritesSlice",
  initialState: { data: [], isLoading: false, isError: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.isFavorited = false;
        state.data = action.payload.data;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        if (action.payload.data) {
          state.data = action.payload.data;
          state.isFavorited = true;
        }
      })
      .addCase(checkFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        if (action.payload.data) {
          state.data = action.payload.data;
          state.isFavorited = true;
        } else {
          state.isFavorited = false;
        }
      })
      .addCase(fetchFavorite.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload.data;
      })
      .addCase(fetchFavorite.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export default favoritesSlice.reducer;
