import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

import { marketApi } from "@/services/marketApi";
import profileReducer from "./slices/profileSlice";
import portfolioReducer from "./slices/portfolioSlice";
import strategyReducer from "./slices/strategySlice";
import watchlistReducer from "./slices/watchlistSlice";

import {
  loadState,
  saveState,
} from "./localStorage";

const rootReducer = combineReducers({
  [marketApi.reducerPath]: marketApi.reducer,
    profile: profileReducer,
  portfolio: portfolioReducer,

  strategy: strategyReducer,

  watchlist: watchlistReducer,
});

const preloadedState = loadState();

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      marketApi.middleware
    ),

  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch =
  typeof store.dispatch;