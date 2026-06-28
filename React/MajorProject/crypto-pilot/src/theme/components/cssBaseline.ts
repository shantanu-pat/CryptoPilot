import { Components, Theme } from "@mui/material/styles";

export const cssBaseline: Components<Theme> = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        margin: 0,
      },
    },
  },
};