import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReserve = createAsyncThunk("fetchReserve", async (id) => {
  const response = await fetch(`${process.env.VITE_BACKEND}/reserves/${id}`);
  const data = await response.json();
  return { data };
});

export const addReserve = createAsyncThunk(
  "addReserve",
  async ({ book_id, user_id }) => {
    const response = await fetch(`${process.env.VITE_BACKEND}/reserves/add`, {
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

export const deleteReserve = createAsyncThunk(
  "deleteReserve",
  async ({ id, book_id, user_id }) => {
    const response = await fetch(
      `${process.env.VITE_BACKEND}/reserves/delete/${id}?book_id=${book_id}&user_id=${user_id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return { data };
  }
);

export const checkReserve = createAsyncThunk(
  "checkReserve",
  async ({ book_id, user_id }) => {
    const response = await fetch(
      `${process.env.VITE_BACKEND}/reserves/check-reserve?book_id=${book_id}&user_id=${user_id}`
    );
    const data = await response.json();
    return { data };
  }
);

const reservesSlice = createSlice({
  name: "reserves",
  initialState: { data: [], isLoading: false, isError: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteReserve.fulfilled, (state, action) => {
        state.isReserved = false;
        state.data = action.payload.data;
      })
      .addCase(addReserve.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        if (action.payload.data) {
          state.data = action.payload.data;
          state.isReserved = true;
        }
      })
      .addCase(checkReserve.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        if (action.payload.data) {
          state.data = action.payload.data;
          state.isReserved = true;
        } else {
          state.isReserved = false;
        }
      })
      .addCase(fetchReserve.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchReserve.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload.data;
      })
      .addCase(fetchReserve.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export default reservesSlice.reducer;
