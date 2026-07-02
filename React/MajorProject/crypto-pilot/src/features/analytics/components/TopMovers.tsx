"use client";

import {
  Avatar,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useGetMarketsQuery } from "@/services/marketApi";
import { TableSkeleton } from "@/components/skeletons";

export function TopMovers() {
  const { data } =
    useGetMarketsQuery();

 

if (!data) {
  return <TableSkeleton />;
}

  const sorted = [...data].sort(
    (a, b) =>
      b.price_change_percentage_24h -
      a.price_change_percentage_24h
  );

  const gainer = sorted[0];
  const loser =
    sorted[sorted.length - 1];

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        mb={3}
      >
        Market Movers
      </Typography>

      <Stack spacing={3}>
        {[gainer, loser].map(
          (coin) => (
            <Stack
              key={coin.id}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Avatar
                  src={coin.image}
                />

                <div>
                  <Typography
                    fontWeight={700}
                  >
                    {coin.name}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {coin.symbol.toUpperCase()}
                  </Typography>
                </div>
              </Stack>

              <Chip
                color={
                  coin.price_change_percentage_24h >=
                  0
                    ? "success"
                    : "error"
                }
                label={`${coin.price_change_percentage_24h.toFixed(
                  2
                )}%`}
              />
            </Stack>
          )
        )}
      </Stack>
    </Paper>
  );
}