import { configureStore } from "@reduxjs/toolkit";
import { postsSlice } from "./posts/postsSlice";
import { postsApi } from "./posts/postsApi";

export const store = configureStore({
  reducer: {
    [postsSlice.name]: postsSlice.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(postsApi.middleware);
  },
});
