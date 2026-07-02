import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WatchlistState {
  coins: string[];
}

const initialState: WatchlistState = {
  coins: [],
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    toggleWatchlist: (
      state,
      action: PayloadAction<string>
    ) => {
      const exists =
        state.coins.includes(action.payload);

      if (exists) {
        state.coins =
          state.coins.filter(
            (id) => id !== action.payload
          );
      } else {
        state.coins.push(action.payload);
      }
    },
  },
});

export const {
  toggleWatchlist,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;