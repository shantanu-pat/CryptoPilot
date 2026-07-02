"use client";

import {
  Alert,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useGetCoinHistoryQuery } from "@/services/marketApi";
import { useGetMarketsQuery } from "@/services/marketApi";
import { useAppSelector } from "@/store/hooks";

export function StrategyResult() {
  const strategy = useAppSelector(
    (state) => state.strategy
  );

  const { data: markets } =
    useGetMarketsQuery();

  const daysAgo = Math.max(
  1,
  Math.ceil(
    (Date.now() -
      new Date(
        strategy.buyDate
      ).getTime()) /
      (1000 * 60 * 60 * 24)
  )
);

const {
  data: history,
  isLoading,
  isError,
} = useGetCoinHistoryQuery({
  id: strategy.coinId,
  days: Math.min(daysAgo, 365),
});

  if (!strategy.simulated) {
    return (
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          Strategy Result
        </Typography>

        <Typography
          mt={2}
          color="text.secondary"
        >
          Configure your investment
          and click Run Simulation.
        </Typography>
      </Paper>
    );
  }

  if (isLoading) {
  return (
    <Alert severity="info">
      Running simulation...
    </Alert>
  );
}

if (
  isError ||
  !markets ||
  !history
) {
  return (
    <Alert severity="error">
      Unable to load historical data.
    </Alert>
  );
}

  const market = markets.find(
    (c) => c.id === strategy.coinId
  );

  if (!market)
    return null;

  const targetDate =
    new Date(
      strategy.buyDate
    ).getTime();

  let closest =
    history.prices[0];

  history.prices.forEach(
    (price) => {
      if (
        Math.abs(
          price[0] -
            targetDate
        ) <
        Math.abs(
          closest[0] -
            targetDate
        )
      ) {
        closest = price;
      }
    }
  );

  const buyPrice =
    closest[1];

  const quantity =
    strategy.amount /
    buyPrice;

  const currentValue =
    quantity *
    market.current_price;

  const profit =
    currentValue -
    strategy.amount;

  const roi =
    (profit /
      strategy.amount) *
    100;

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
        mb={3}
      >
        Simulation Result
      </Typography>

      <Grid
        container
        spacing={3}
      >
        <Grid size={{ xs: 6 }}>
          <Stack spacing={1}>
            <Typography color="text.secondary">
              Buy Price
            </Typography>

            <Typography variant="h6">
              $
              {buyPrice.toFixed(
                2
              )}
            </Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Stack spacing={1}>
            <Typography color="text.secondary">
              Coins Purchased
            </Typography>

            <Typography variant="h6">
              {quantity.toFixed(6)}
            </Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Stack spacing={1}>
            <Typography color="text.secondary">
              Current Price
            </Typography>

            <Typography variant="h6">
              $
              {market.current_price.toLocaleString()}
            </Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Stack spacing={1}>
            <Typography color="text.secondary">
              Current Value
            </Typography>

            <Typography variant="h6">
              $
              {currentValue.toLocaleString()}
            </Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Stack spacing={1}>
            <Typography color="text.secondary">
              Profit / Loss
            </Typography>

            <Typography
              variant="h6"
              color={
                profit >= 0
                  ? "success.main"
                  : "error.main"
              }
            >
              $
              {profit.toLocaleString()}
            </Typography>
          </Stack>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Stack spacing={1}>
            <Typography color="text.secondary">
              ROI
            </Typography>

            <Typography
              variant="h6"
              color={
                roi >= 0
                  ? "success.main"
                  : "error.main"
              }
            >
              {roi.toFixed(2)}%
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}