import { createTheme } from "@mui/material/styles";

import { components } from "./components";
import { palette } from "./palette";
import { shape } from "./shape";
import { shadows } from "./shadows";
import { typography } from "./typography";

export const theme = createTheme({
  palette,
  typography,
  shape,
  shadows,
  components,
});