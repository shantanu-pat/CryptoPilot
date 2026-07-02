"use client";

import {
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export function DataSettings() {
  const clearData = () => {
    localStorage.clear();

    window.location.reload();
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
      }}
    >
      <Stack spacing={3}>
        <Typography
          variant="h6"
          fontWeight={700}
        >
          Data
        </Typography>

        <Typography color="text.secondary">
          Clear all portfolio,
          transactions,
          watchlist and settings.
        </Typography>

        <Button
          color="error"
          variant="contained"
          onClick={clearData}
        >
          Reset Application
        </Button>
      </Stack>
    </Paper>
  );
}