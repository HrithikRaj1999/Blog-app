import axios from "axios";
import {
  requestFailure,
  requestStart,
  requestSuccess,
} from "../ReduxSlice/authSlice";
import { USER_API_ROUTES } from "../Router/BlogRoute";
import { EditProfileForm } from "../Types";
import { AppDispatch } from "../store/store";
import {
  requestUserFailure,
  requestUserStart,
  requestUserSuccess,
  updateUser,
} from "../ReduxSlice/userSlice";

export const updateUserProfile =
  (id: string, formData: EditProfileForm) => async (dispatch: AppDispatch) => {
    dispatch(requestStart());
    try {
      const response = await axios.patch(
        USER_API_ROUTES.UPDATE_USER(id),
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch(requestSuccess(response.data));
      } else {
        dispatch(requestFailure("Failed to authenticate"));
      }
    } catch (error: any) {
      console.error(`Error updating user with ID ${id}:`, error);
      dispatch(
        requestFailure(error.response?.data?.message || "Network error")
      );
      throw error;
    }
  };
export const changeUserRole =
  (id: string, role: string) => async (dispatch: AppDispatch) => {
    dispatch(requestUserStart());
    try {
      const response = await axios.patch(
        USER_API_ROUTES.CHANGE_ROLE(id, role),
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch(updateUser(response.data.updatedUser));
        dispatch(requestUserSuccess());
      } else {
        dispatch(requestUserFailure("Failed to updating Role of user "));
      }
    } catch (error: any) {
      console.error(`Error updating Role of user with ID ${id}:`, error);
      dispatch(
        requestUserFailure(error.response?.data?.message || "Network error")
      );
      throw error;
    }
  };
