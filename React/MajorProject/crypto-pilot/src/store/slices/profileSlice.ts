import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  name: string;
}

const initialState: ProfileState = {
  name: "Guest",
};

const profileSlice = createSlice({
  name: "profile",

  initialState,

  reducers: {
    updateProfile(
      state,
      action: PayloadAction<{
        name: string;
      }>
    ) {
      state.name = action.payload.name;
    },
  },
});

export const {
  updateProfile,
} = profileSlice.actions;

export default profileSlice.reducer;