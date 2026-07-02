import {
  Box,
  Typography,
} from "@mui/material";

export function DashboardHero() {
  return (
    <Box mb={5}>
      <Typography
        variant="h3"
        fontWeight={800}
      >
        Welcome back 👋
      </Typography>

      <Typography
        color="text.secondary"
        mt={1}
      >
        Track your crypto portfolio,
        monitor the market and test
        your investment strategies.
      </Typography>
    </Box>
  );
}