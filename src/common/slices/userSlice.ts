import { createSlice } from "@reduxjs/toolkit";
import { errorConstants } from "../../app/constants";
import { RootState, AppThunk } from "../../app/store";
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
  validateLogin,
  validateRegister,
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
      state.currentUser = { ...payload };
      state.isError = false;
      state.errorMessages = [];
      return state;
    },
    reject(state, { payload }) {
      return { ...state, isError: true, errorMessages: payload };
    },
    clearState(state) {
      return { ...state, currentUser: null, isError: false, errorMessages: [] };
    },
    clearErrors(state) {
      return { ...state, isError: false, errorMessages: [] };
    },
    updateUser(state, { payload }) {
      return { ...state, currentUser: { ...state.currentUser, ...payload } };
    },
  },
});

export const {
  fulfill,
  reject,
  clearState,
  clearErrors,
  updateUser,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.user.currentUser ? true : false;
export const selectFavorites = (state: RootState) =>
  state.user.currentUser?.favorites;
export const selectIsInFavorites = (state: RootState, id: number) =>
  state.user.currentUser?.favorites.includes(id) ? true : false;
export const selectHistory = (state: RootState) =>
  state.user.currentUser?.history;

export const login =
  (user: User): AppThunk =>
  (dispatch) => {
    const { errorStrings, isValid } = validateLogin(
      user.username,
      user.password
    );
    let storedUser: User | null = getItemFromLocalStorage("user");

    if (!isValid) {
      return dispatch(reject(errorStrings));
    }

    if (storedUser) {
      if (user.username !== storedUser.username)
        return dispatch(reject([errorConstants.USER_DOES_NOT_EXIST]));
      if (user.password !== storedUser.password)
        return dispatch(reject([errorConstants.INVALID_PASSWORD]));
      
      console.log(storedUser);
      console.log("storedUser")
      return dispatch(fulfill(storedUser));  
    }
    return dispatch(fulfill(user));
  };

export const logout = (): AppThunk => (dispatch) => {
  return dispatch(clearState());
};

export const register =
  (user: User, confirmPassword: string): AppThunk =>
  (dispatch) => {
    let storedUser: User | null = getItemFromLocalStorage("user");

    const { errorStrings, isValid } = validateRegister(
      user.username,
      user.password,
      confirmPassword
    );

    if (!isValid) {
      return dispatch(reject(errorStrings));
    }

    if (storedUser) {
      if (storedUser.username === user.username)
        return reject([errorConstants.USER_ALREADY_EXISTS]);
    }

    setItemToLocalStorage("user", user);
    return dispatch(fulfill(user));
  };

export const removeFromFavorites =
  (id: number): AppThunk =>
  (dispatch, getState) => {
    const isFavorite = selectFavorites(getState())?.includes(id) ? true : false;

    if (isFavorite) {
      let storedUser: User = getItemFromLocalStorage("user");
      let filteredFavorites = storedUser.favorites.filter(favoriteId => favoriteId !== id);

      storedUser.favorites = filteredFavorites;

      setItemToLocalStorage("user", storedUser);
      return dispatch(updateUser({favorites:[...storedUser.favorites]}))
    };
      
      
}

export const addToFavorites =
  (id: number): AppThunk =>
  (dispatch, getState) => {
    const isFavorite = selectFavorites(getState())?.includes(id) ? true : false;

    if (!isFavorite) {
      let storedUser: User = getItemFromLocalStorage("user");
      if(storedUser.favorites) {
        storedUser.favorites = [...storedUser.favorites, id];
      } else {
        storedUser.favorites = [id]
      }

      setItemToLocalStorage("user", storedUser);
      return dispatch(updateUser({favorites:[...storedUser.favorites]}));
    }
  };

export const updateHistory =
  (item: string): AppThunk =>
  (dispatch, getState) => {
    const userHistory = selectHistory(getState());
    let storedUser: User = getItemFromLocalStorage("user");

    if (userHistory) {
      storedUser.history = [...storedUser.history, item];
    } else {
      storedUser.history = [item];
    }

    setItemToLocalStorage("user", storedUser);

    return dispatch(updateUser({history:[...storedUser.history]}));
  };
