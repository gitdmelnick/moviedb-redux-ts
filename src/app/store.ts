import {
  configureStore,
  ThunkAction,
  Action,
  createReducer,
} from "@reduxjs/toolkit";

import { combineReducers } from "redux";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userSlice } from "../common/slices/userSlice";
import { baseApi } from "../features/api/baseApi";

const reducers = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  user: userSlice.reducer,
})

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

setupListeners(store.dispatch);
