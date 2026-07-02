"use client";

import { Box } from "@mui/material";
import { ReactNode } from "react";

import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

const drawerWidth = 260;

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({
  children,
}: MainLayoutProps) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Sidebar />

      <Navbar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          mt: "72px",
          p: 4,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}