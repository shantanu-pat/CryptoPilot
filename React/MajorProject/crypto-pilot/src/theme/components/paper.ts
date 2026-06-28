import { Components, Theme } from "@mui/material/styles";

export const paper: Components<Theme> = {
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        backgroundImage: "none",
      },
    },
  },
};