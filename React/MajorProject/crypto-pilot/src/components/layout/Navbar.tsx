"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import { usePathname } from "next/navigation";

import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

const drawerWidth = 260;


export function Navbar() {
    const pathname = usePathname();


    const profile = useAppSelector(
  (state) => state.profile
);

const initials = profile.name
  .trim()
  .split(" ")
  .map((word) => word[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();
  

  const page = useMemo(() => {
    switch (pathname) {
      case "/dashboard":
        return {
          title: "Dashboard",
          subtitle:
            "Overview of the crypto market",
        };

      case "/market":
        return {
          title: "Market",
          subtitle:
            "Live cryptocurrency prices",
        };

      case "/portfolio":
        return {
          title: "Portfolio",
          subtitle:
            "Track your investments",
        };

      case "/watchlist":
        return {
          title: "Watchlist",
          subtitle:
            "Your favourite assets",
        };

      case "/analytics":
        return {
          title: "Analytics",
          subtitle:
            "Portfolio insights",
        };

      case "/strategy":
        return {
          title: "Strategy Lab",
          subtitle:
            "Backtest your investments",
        };

      case "/settings":
        return {
          title: "Settings",
          subtitle:
            "Manage application preferences",
        };

      default:
        return {
          title: "CryptoPilot",
          subtitle:
            "Crypto Portfolio Simulator",
        };
    }
  }, [pathname]);

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        bgcolor: "background.default",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: "72px !important",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
          >
            {page.title}
          </Typography>

          <Typography
  variant="body2"
  color="text.secondary"
>
  {profile.name !== "Guest"
    ? `Welcome back, ${profile.name}`
    : page.subtitle}
</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
            size="small"
            placeholder="Search coins..."
            sx={{
              width: 280,
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          <IconButton>
            <Badge
              badgeContent={2}
              color="error"
            >
              <NotificationsNoneRoundedIcon />
            </Badge>
          </IconButton>

          <Avatar
            sx={{
              bgcolor: "primary.main",
            }}
          >
            {initials || "G"}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}