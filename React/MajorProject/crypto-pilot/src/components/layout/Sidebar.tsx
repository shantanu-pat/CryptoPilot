"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { navigationItems } from "@/config/navigation";

const drawerWidth = 260;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        width: drawerWidth,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 3,
        }}
      >
        <Typography
          variant="h5"
          color="primary"
          fontWeight={800}
        >
          CryptoPilot
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Portfolio Simulator
        </Typography>
      </Box>

      <Divider />

      <List
        sx={{
          p: 2,
          flex: 1,
        }}
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <ListItemButton
              key={item.title}
              component={Link}
              href={item.href}
              selected={active}
              sx={{
                borderRadius: 3,
                mb: 1,
                minHeight: 48,

                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "#fff",

                  "& .MuiListItemIcon-root": {
                    color: "#fff",
                  },
                },

                "&:hover": {
                  bgcolor: active
                    ? "primary.main"
                    : "action.hover",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 42,
                }}
              >
                <Icon />
              </ListItemIcon>

              <ListItemText
                primary={item.title}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider />

      <Box p={3}>
        <Typography
          variant="caption"
          color="text.secondary"
        >
          Version 1.0
        </Typography>
      </Box>
    </Box>
  );
}