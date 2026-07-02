import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StrategyState {
  coinId: string;
  amount: number;
  buyDate: string;
  simulated: boolean;
}

const initialState: StrategyState = {
  coinId: "bitcoin",
  amount: 1000,
  buyDate: "",
  simulated: false,
};

const strategySlice = createSlice({
  name: "strategy",
  initialState,
 reducers: {
  updateStrategy(
    state,
    action: PayloadAction<Partial<StrategyState>>
  ) {
    Object.assign(state, action.payload);

    state.simulated = false;
  },

  runSimulation(state) {
    state.simulated = true;
  },
},
});

export const {
  updateStrategy,
  runSimulation,
} = strategySlice.actions;

export default strategySlice.reducer;