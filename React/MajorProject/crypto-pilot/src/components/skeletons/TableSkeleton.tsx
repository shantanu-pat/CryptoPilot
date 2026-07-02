"use client";

import {
  Paper,
  Skeleton,
  Stack,
} from "@mui/material";

export function TableSkeleton() {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
      }}
    >
      <Stack spacing={2}>
        {Array.from({
          length: 8,
        }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            width="100%"
            height={55}
          />
        ))}
      </Stack>
    </Paper>
  );
}