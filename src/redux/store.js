import authenticationSlice from "./slices/authenticationSlice";

import booksSlice from "./slices/booksSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    books: booksSlice,
    authentication: authenticationSlice,
  },
});
export default store;
