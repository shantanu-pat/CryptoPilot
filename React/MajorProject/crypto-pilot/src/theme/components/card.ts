import { Components, Theme } from "@mui/material/styles";

export const card: Components<Theme> = {
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        backgroundImage: "none",
      },
    },
  },
};