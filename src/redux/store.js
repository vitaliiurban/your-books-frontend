import authenticationSlice from "./slices/authenticationSlice";

import booksSlice from "./slices/booksSlice";
import userSlice from "./slices/userSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    books: booksSlice,
    authentication: authenticationSlice,
    user: userSlice,
  },
});
export default store;
