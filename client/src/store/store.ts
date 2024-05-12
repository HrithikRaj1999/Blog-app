import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../ReduxSlice/authSlice";
import blogReducer from "../ReduxSlice/blogSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
