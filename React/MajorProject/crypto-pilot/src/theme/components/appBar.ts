import { Components, Theme } from "@mui/material/styles";

export const appBar: Components<Theme> = {
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: "none",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      },
    },
  },
};