import { createSlice, createSelector } from "@reduxjs/toolkit";
import { errorConstants } from "../../app/constants";
import { RootState, AppThunk, store } from "../../app/store";
import { register } from "../../serviceWorker";
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from "../utilities/utilities";

const initialState = {
  user: null,
  isError: false,
  errorMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, { payload }) {
      state.user = payload.user;
      state.isError = false;
      state.errorMessage = "";
    },
    logout(state) {
      state.user = null;
      state.isError = false;
      state.errorMessage = "";
    },
    rejectLogin(state, { payload }) {
      state.isError = true;
      state.errorMessage = payload.errorMessage;
    },
    rejectRegistration(state, { payload }) {
      state.isError = true;
      state.errorMessage = payload.errorMessage;
    },
  },
});

export const { login, logout, rejectLogin, rejectRegistration } =
  userSlice.actions;

export const loginIfExists =
  (user: User): AppThunk =>
  (dispatch) => {
    if (!user.username && !user.password) {
      dispatch(rejectLogin("Please enter your username and password"));
    }

    let storedUsers: User[] | null = getItemFromLocalStorage("users");

    if (storedUsers) {
      const isLoginValid = storedUsers.some(
        (storedUser) =>
          user.username === storedUser.username &&
          user.password === storedUser.password
      );

      isLoginValid
        ? dispatch(login(user))
        : dispatch(rejectLogin(errorConstants.INVALID_PASSWORD));
    } else {
      dispatch(rejectLogin(errorConstants.USER_DOES_NOT_EXIST));
    }
  };

export const registerUser =
  (user: User): AppThunk =>
  (dispatch) => {
    let storedUsers: User[] | null = getItemFromLocalStorage("users");

    if (storedUsers) {
      const userExists = storedUsers.some(
        (storedUser) => user.username === storedUser.username
      );

      if (userExists)
        dispatch(rejectRegistration(errorConstants.USER_ALREADY_EXISTS));
      else {
        storedUsers = [...storedUsers, user];
        dispatch(login(user));
        setItemToLocalStorage("users", storedUsers ?? []);
      }
    }
  };
