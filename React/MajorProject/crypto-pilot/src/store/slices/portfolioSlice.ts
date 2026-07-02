import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Holding {
  coinId: string;
  symbol: string;
  name: string;
  image: string;
  quantity: number;
  averagePrice: number;
}

import type { Transaction } from "@/types/transaction";

interface PortfolioState {
  holdings: Holding[];
  transactions: Transaction[];
}

const initialState: PortfolioState = {
  holdings: [],
  transactions: [],
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    buyCoin: (
      state,
      action: PayloadAction<Holding>
    ) => {
state.transactions.unshift({
  id: crypto.randomUUID(),

  coinId: action.payload.coinId,

  symbol: action.payload.symbol,

  name: action.payload.name,

  image: action.payload.image,

  type: "BUY",

  quantity: action.payload.quantity,

  price: action.payload.averagePrice,

  total:
    action.payload.quantity *
    action.payload.averagePrice,

  createdAt: new Date().toISOString(),
});

      const existing = state.holdings.find(
        h => h.coinId === action.payload.coinId
      );

      if (existing) {
        const totalCost =
          existing.averagePrice * existing.quantity +
          action.payload.averagePrice * action.payload.quantity;

        existing.quantity += action.payload.quantity;

        existing.averagePrice =
          totalCost / existing.quantity;
      } else {
        state.holdings.push(action.payload);
      }
    },

    sellCoin: (
      state,
      action: PayloadAction<{
        coinId: string;
        quantity: number;
      }>
    ) => {
      const coin = state.holdings.find(
        h => h.coinId === action.payload.coinId
      );

      if (!coin) return;

      coin.quantity -= action.payload.quantity;

      if (coin.quantity <= 0) {
        state.holdings =
          state.holdings.filter(
            h => h.coinId !== coin.coinId
          );
      }
    },
  },
});

export const {
  buyCoin,
  sellCoin,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;