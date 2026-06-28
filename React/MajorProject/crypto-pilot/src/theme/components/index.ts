import { Components, Theme } from "@mui/material/styles";

import { appBar } from "./appBar";
import { button } from "./button";
import { card } from "./card";
import { cssBaseline } from "./cssBaseline";
import { paper } from "./paper";

export const components: Components<Theme> = {
  ...appBar,
  ...button,
  ...card,
  ...cssBaseline,
  ...paper,
};