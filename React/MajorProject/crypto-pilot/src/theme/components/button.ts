import { Components, Theme } from "@mui/material/styles";

export const button: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        fontWeight: 600,
        padding: "10px 20px",
        textTransform: "none",
      },
    },
  },
};