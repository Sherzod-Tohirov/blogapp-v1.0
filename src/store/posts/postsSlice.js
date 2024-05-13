import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  data: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchedPost: (state, action) => {
      (state.data = action.payload),
        (state.isError = false),
        (state.isLoading = false);
    },
    fetchingPost: (state) => {
      (state.data = null), (state.isError = false), (state.isLoading = true);
    },
    fetchingErrorPost: (state, action) => {
      (state.data = null),
        (state.isError = action.payload),
        (state.isLoading = false);
    },
  },
});

export const { fetchedPost, fetchingErrorPost, fetchingPost } = postsSlice.actions;
