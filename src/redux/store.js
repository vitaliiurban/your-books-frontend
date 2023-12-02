import authenticationSlice from "./slices/authenticationSlice";

import booksSlice from "./slices/booksSlice";
import bookSlice from "./slices/bookSlice";
import userSlice from "./slices/userSlice";

import { configureStore } from "@reduxjs/toolkit";
import genresSlice from "./slices/genresSlice";
import reservesSlice from "./slices/reservesSlice";

const store = configureStore({
  reducer: {
    authentication: authenticationSlice,
    books: booksSlice,
    book: bookSlice,
    genres: genresSlice,
    reserves: reservesSlice,
    user: userSlice,
  },
});
export default store;
