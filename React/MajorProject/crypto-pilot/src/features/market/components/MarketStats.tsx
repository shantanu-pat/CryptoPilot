"use client";

import {
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import type { Coin } from "../types/coin";

interface Props {
  coin: Coin;
}

interface StatCardProps {
  title: string;
  value: string;
}

function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: "100%",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <Stack spacing={1}>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {title}
        </Typography>

        <Typography
          variant="h6"
          fontWeight={700}
        >
          {value}
        </Typography>
      </Stack>
    </Paper>
  );
}

export function MarketStats({
  coin,
}: Props) {
  return (
    <Grid
      container
      spacing={2}
      mt={1}
    >
      <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
        <StatCard
          title="24H High"
          value={`$${coin.high_24h.toLocaleString()}`}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
        <StatCard
          title="24H Low"
          value={`$${coin.low_24h.toLocaleString()}`}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
        <StatCard
          title="Market Cap"
          value={`$${coin.market_cap.toLocaleString()}`}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
        <StatCard
          title="24H Volume"
          value={`$${coin.total_volume.toLocaleString()}`}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
        <StatCard
          title="Circulating Supply"
          value={coin.circulating_supply.toLocaleString()}
        />
      </Grid>
    </Grid>
  );
}