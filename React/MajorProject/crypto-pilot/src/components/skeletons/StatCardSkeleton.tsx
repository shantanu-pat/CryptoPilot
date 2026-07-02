"use client";

import {
  Grid,
  Paper,
  Skeleton,
  Stack,
} from "@mui/material";

export function StatCardSkeleton() {
  return (
    <Grid
      container
      spacing={3}
    >
      {Array.from({
        length: 4,
      }).map((_, index) => (
        <Grid
          key={index}
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
            }}
          >
            <Stack spacing={2}>
              <Skeleton
                width={120}
                height={25}
              />

              <Skeleton
                width={180}
                height={50}
              />
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}