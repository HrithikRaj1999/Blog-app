import axios from "axios";

import { AppDispatch } from "../store/store";
import {
  requestFailure,
  requestStart,
  requestSuccess,
} from "../ReduxSlice/authSlice";
import { fetchUsers } from "../ReduxSlice/userSlice";
import { Credentials } from "../Types";

export const authenticateUser =
  (credentials: Credentials, urlPath: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(requestStart());
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/${urlPath}`,
        credentials,
        { withCredentials: true }
      );
      if (response.status === 200) {
        if (urlPath === "login") {
          dispatch(requestSuccess(response.data.user));
          if (["admin", "super-admin"].includes(response.data.user.role)) {
            dispatch(fetchUsers() as any);
          }
        }
      } else {
        dispatch(requestFailure("Failed to authenticate"));
      }
    } catch (error: any) {
      dispatch(
        requestFailure(error.response?.data?.message || "Network error")
      );
      throw error;
    }
  };
export const signOutFromServer = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/auth/signout`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to sign out:", error);
    throw error;
  }
};
