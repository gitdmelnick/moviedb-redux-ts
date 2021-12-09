import { createSlice, createSelector } from "@reduxjs/toolkit";
import { errorConstants } from "../../app/constants";
import { RootState, AppThunk, store } from "../../app/store";
import { register } from "../../serviceWorker";
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
  validateInputs,
} from "../utilities/utilities";

type UserState = {
  currentUser: User | null;
  isError: boolean;
  errorMessages: string[];
};

const initialState: UserState = {
  currentUser: null,
  isError: false,
  errorMessages: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fulfill(state, { payload }) {
      state.currentUser = payload.currentUser;
      state.isError = false;
      state.errorMessages = [];
      return state;
    },
    reject(state, { payload }) {
      return { ...state, isError: true, errorMessages: payload };
    },
    clearState(state) {
      return { ...state, user: null, isError: false, errorMessages: [] };
    },
  },
});

export const { fulfill, reject, clearState } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const login =
  (user: User): AppThunk =>
  (dispatch) => {
    const { errorStrings, isValid } = validateInputs(
      user.username,
      user.password
    );

    if (!isValid) {
      console.log("entered");
      return dispatch(reject(errorStrings));
    }

    let storedUsers: User[] | null = getItemFromLocalStorage("users");

    if (storedUsers) {
      const isLoginValid = storedUsers.some(
        (storedUser) =>
          user.username === storedUser.username &&
          user.password === storedUser.password
      );

      return isLoginValid
        ? dispatch(fulfill(user))
        : dispatch(reject([errorConstants.INVALID_PASSWORD]));
    } else {
      return dispatch(reject([errorConstants.USER_DOES_NOT_EXIST]));
    }
  };

export const logout = (): AppThunk => (dispatch) => {
  return dispatch(clearState());
};

export const registerUser =
  (user: User): AppThunk =>
  (dispatch) => {
    let storedUsers: User[] | null = getItemFromLocalStorage("users");

    if (storedUsers) {
      const userExists = storedUsers.some(
        (storedUser) => user.username === storedUser.username
      );

      if (userExists) dispatch(reject([errorConstants.USER_ALREADY_EXISTS]));
      else {
        storedUsers = [...storedUsers, user];
        setItemToLocalStorage("users", storedUsers ?? []);
        return dispatch(login(user));
      }
    }
  };
