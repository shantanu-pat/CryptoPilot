"use client";

import {
  Paper,
  Skeleton,
  Stack,
} from "@mui/material";

export function ChartSkeleton() {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
      }}
    >
      <Stack spacing={3}>
        <Skeleton
          variant="text"
          width={180}
          height={40}
        />

        <Skeleton
          variant="rounded"
          width="100%"
          height={450}
        />
      </Stack>
    </Paper>
  );
}