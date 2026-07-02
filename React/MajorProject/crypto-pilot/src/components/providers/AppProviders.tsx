"use client";

import {
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Provider } from "react-redux";

import { store } from "@/store";
import { theme } from "@/theme";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({
  children,
}: AppProvidersProps) {
  return (
    <AppRouterCacheProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {children}
        </ThemeProvider>
      </Provider>
    </AppRouterCacheProvider>
  );
}