"use client";

import { useState } from "react";

import {
  Alert,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import { useAppSelector } from "@/store/hooks";
import { useGetMarketsQuery } from "@/services/marketApi";

import { SearchCoins } from "./SearchCoins";
import { MarketHeader } from "./MarketHeader";
import { MarketStats } from "./MarketStats";
import { CoinTable } from "./CoinTable";
import { TradingChart } from "./charts/TradingChart";
import { useMarketChart } from "../hooks/useMarketChart";

import { ChartSkeleton } from "@/components/skeletons";

export function MarketPage() {
  const [selectedCoinId, setSelectedCoinId] =
    useState("bitcoin");

  const [days, setDays] =
    useState(30);

  const holdings = useAppSelector(
    (state) => state.portfolio.holdings
  );

  const {
    data,
    isLoading,
    isError,
  } = useGetMarketsQuery();

  const coin =
    data?.find(
      (c) => c.id === selectedCoinId
    ) ?? data?.[0];

  const {
    chartData,
    isLoading: chartLoading,
  } = useMarketChart(
    coin?.id,
    days
  );

  if (isLoading) {
    return <ChartSkeleton />;
  }

  if (isError || !data || !coin) {
    return (
      <Alert severity="error">
        Unable to load market data.
      </Alert>
    );
  }

  return (
    <Stack spacing={3}>
      {holdings.length === 0 && (
        <Alert severity="info">
          👋 Welcome to CryptoPilot! Select a cryptocurrency
          below and make your first investment to start
          tracking your portfolio.
        </Alert>
      )}

      <SearchCoins
        onSelect={(id) =>
          setSelectedCoinId(id)
        }
      />

      <MarketHeader coin={coin} />

      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography
            variant="h6"
            fontWeight={700}
          >
            Price History
          </Typography>

          <ToggleButtonGroup
            size="small"
            exclusive
            value={days}
            onChange={(_, value) => {
              if (value !== null) {
                setDays(value);
              }
            }}
          >
            <ToggleButton value={1}>
              24H
            </ToggleButton>

            <ToggleButton value={7}>
              7D
            </ToggleButton>

            <ToggleButton value={30}>
              30D
            </ToggleButton>

            <ToggleButton value={90}>
              90D
            </ToggleButton>

            <ToggleButton value={365}>
              1Y
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        {!chartLoading && (
          <TradingChart
            data={chartData}
          />
        )}
      </Paper>

      <MarketStats coin={coin} />

      <CoinTable
        coins={data}
        selectedCoin={selectedCoinId}
        onSelect={(coin) =>
          setSelectedCoinId(coin.id)
        }
      />
    </Stack>
  );
}