"use client";

import {
  Alert,
  Stack,
  Typography,
} from "@mui/material";

import { useGetMarketsQuery } from "@/services/marketApi";
import { useAppSelector } from "@/store/hooks";
import { CoinTable } from "@/features/market/components/CoinTable";

export function WatchlistPage() {
  const watchlist = useAppSelector(
    (state) => state.watchlist.coins
  );

  const {
    data,
    isLoading,
    isError,
  } = useGetMarketsQuery();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError || !data) {
    return (
      <Alert severity="error">
        Unable to load watchlist.
      </Alert>
    );
  }

  const coins = data.filter((coin) =>
    watchlist.includes(coin.id)
  );

  return (
    <Stack spacing={3}>
      <Typography
        variant="h4"
        fontWeight={700}
      >
        Watchlist
      </Typography>

      <Typography
        color="text.secondary"
      >
        Track your favourite assets.
      </Typography>

      <CoinTable
        coins={coins}
        selectedCoin=""
        onSelect={() => {}}
      />
    </Stack>
  );
}