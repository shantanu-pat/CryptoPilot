"use client";

import {
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export function Preferences() {
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
          Preferences
        </Typography>

        <TextField
          select
          label="Currency"
          defaultValue="USD"
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="INR">INR</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
        </TextField>

        <TextField
          select
          label="Default Chart"
          defaultValue={30}
        >
          <MenuItem value={7}>7 Days</MenuItem>
          <MenuItem value={30}>30 Days</MenuItem>
          <MenuItem value={90}>90 Days</MenuItem>
          <MenuItem value={365}>1 Year</MenuItem>
        </TextField>
      </Stack>
    </Paper>
  );
}