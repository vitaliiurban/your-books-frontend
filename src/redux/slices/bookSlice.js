import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createBook = createAsyncThunk("createBook", async (formData) => {
  const response = await fetch(`${process.env.VITE_BACKEND}/book/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  return { data };
});

export const fetchBook = createAsyncThunk("fetchBook", async (id) => {
  const response = await fetch(`${process.env.VITE_BACKEND}/book/${id}`);
  const data = await response.json();
  return { data };
});

export const updateReserved = createAsyncThunk(
  "updateReserved",
  async ({ book_id, value }) => {
    const response = await fetch(
      `${process.env.VITE_BACKEND}/book/update-reserved`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ book_id, value }),
      }
    );
    const data = await response.json();
    return { data };
  }
);
export const deleteBook = createAsyncThunk("deleteBook", async ({ id }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(
      `${process.env.VITE_BACKEND}/book/delete/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return id;
  } catch (error) {
    throw error;
  }
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
      })
      .addCase(updateReserved.fulfilled, (state, action) => {
        console.log(action.payload.data);
        state.data = action.payload.data;
      });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.data = state.data.filter((book) => book.id !== action.payload);
    });
  },
});
export default bookSlice.reducer;
