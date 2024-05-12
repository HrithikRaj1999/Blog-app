import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../ReduxSlice/authSlice";
import blogReducer from "../ReduxSlice/blogSlice";
import usersReducer from "../ReduxSlice/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    blogs: blogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
