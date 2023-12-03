import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updateUser = createAsyncThunk("updateUser", async (userData) => {
  const response = await fetch(
    `${process.env.VITE_BACKEND}/user/update/${userData.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );
  const data = await response.json();
  console.log(data);
  return { data };
});

export const updateUserPass = createAsyncThunk(
  "updateUser",
  async (userData) => {
    const response = await fetch(
      `${process.env.VITE_BACKEND}/user/update/pass/${userData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const data = await response.json();
    console.log(data);
    return { data };
  }
);

export const deleteUser = createAsyncThunk("deleteUser", async (userData) => {
  const response = await fetch(
    `${process.env.VITE_BACKEND}/user/delete/${userData.id}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  console.log(data);
  return { data };
});

const userSlice = createSlice({
  name: "user",
  initialState: { data: {}, isLoading: false, isError: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isError = true;
        console.error("Error updating user:", action.error);
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {};
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isError = true;
        console.error("Error deleting user:", action.error);
      });
  },
});
export default userSlice.reducer;
