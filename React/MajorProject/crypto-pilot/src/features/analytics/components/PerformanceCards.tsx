"use client";

import {
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useAppSelector } from "@/store/hooks";
import { useGetMarketsQuery } from "@/services/marketApi";
import { StatCardSkeleton } from "@/components/skeletons";

export function PerformanceCards() {
  const holdings = useAppSelector(
    (state) => state.portfolio.holdings
  );

  const { data: markets } =
    useGetMarketsQuery();


if (!markets) {
  return <StatCardSkeleton />;
}

  let invested = 0;
  let current = 0;

  let bestCoin = "";
  let bestReturn = -Infinity;

  let worstCoin = "";
  let worstReturn = Infinity;

  holdings.forEach((holding) => {
    const market = markets.find(
      (coin) =>
        coin.id === holding.coinId
    );

    if (!market) return;

    const investedValue =
      holding.averagePrice *
      holding.quantity;

    const currentValue =
      market.current_price *
      holding.quantity;

    invested += investedValue;
    current += currentValue;

    const pnl =
      ((currentValue -
        investedValue) /
        investedValue) *
      100;

    if (pnl > bestReturn) {
      bestReturn = pnl;
      bestCoin = holding.name;
    }

    if (pnl < worstReturn) {
      worstReturn = pnl;
      worstCoin = holding.name;
    }
  });

  const profit = current - invested;

  const cards = [
    {
      title: "Portfolio Value",
      value: `$${current.toLocaleString()}`,
    },
    {
      title: "Total Profit",
      value: `$${profit.toLocaleString()}`,
    },
    {
      title: "Best Performer",
      value:
        bestCoin || "-",
    },
    {
      title: "Worst Performer",
      value:
        worstCoin || "-",
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid
          key={card.title}
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
              height: "100%",
            }}
          >
            <Stack spacing={1}>
              <Typography
                color="text.secondary"
              >
                {card.title}
              </Typography>

              <Typography
                variant="h5"
                fontWeight={700}
              >
                {card.value}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}