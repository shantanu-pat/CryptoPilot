"use client";

import {
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { TransactionHistory } from "./TransactionHistory";
import { BuyDialog } from "./BuyDialog";
import { SellDialog } from "./SellDialog";
import { TableSkeleton } from "@/components/skeletons";

import type { Coin } from "@/types/coin";

import { PortfolioAllocation } from "./PortfolioAllocation";
import { PortfolioSummary } from "./PortfolioSummary";

import { useGetMarketsQuery } from "@/services/marketApi";
import { useAppSelector } from "@/store/hooks";

export function PortfolioPage() {
  const holdings = useAppSelector(
    (state) => state.portfolio.holdings
  );

  const { data: markets } =
    useGetMarketsQuery();

    const [buyCoin, setBuyCoin] =
  useState<Coin | null>(null);

const [sellCoinData, setSellCoinData] =
  useState<{
    id: string;
    name: string;
    quantity: number;
  } | null>(null);


if (!markets) {
  return <TableSkeleton />;
}
  const portfolio = holdings
    .map((holding) => {
      const market = markets.find(
        (coin) =>
          coin.id === holding.coinId
      );

      if (!market) return null;

      const currentValue =
        market.current_price *
        holding.quantity;

      const invested =
        holding.averagePrice *
        holding.quantity;

      const profit =
        currentValue - invested;

      const profitPercent =
        invested === 0
          ? 0
          : (profit / invested) * 100;

      return {
        ...holding,
        currentPrice:
          market.current_price,
        currentValue,
        invested,
        profit,
        profitPercent,
      };
    })
    .filter(Boolean);

  const totalValue =
    portfolio.reduce(
      (sum, coin) =>
        sum + coin!.currentValue,
      0
    );

  if (portfolio.length === 0) {
    return (
      <Stack spacing={3}>
        <PortfolioSummary />

        <PortfolioAllocation />

        <Paper
          sx={{
            p: 8,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
          >
            Your portfolio is empty
          </Typography>

          <Typography
            mt={2}
            color="text.secondary"
          >
            Buy your first crypto asset
            from the Market page.
          </Typography>
        </Paper>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <PortfolioSummary />

      <PortfolioAllocation />

      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
        >
          Portfolio Value
        </Typography>

        <Stack
          spacing={1}
          mt={2}
        >
          <Typography
            variant="h3"
            fontWeight={800}
          >
            $
            {totalValue.toLocaleString(
              undefined,
              {
                maximumFractionDigits: 2,
              }
            )}
          </Typography>

          <Typography
            color="text.secondary"
          >
            {holdings.length} Assets
          </Typography>
        </Stack>
      </Paper>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 4,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Asset
              </TableCell>

              <TableCell align="right">
                Quantity
              </TableCell>

              <TableCell align="right">
                Avg Buy
              </TableCell>

              <TableCell align="right">
                Current
              </TableCell>

              <TableCell align="right">
                Invested
              </TableCell>

              <TableCell align="right">
                Current Value
              </TableCell>

              <TableCell align="right">
                P/L
              </TableCell>

              <TableCell align="right">
                Return
              </TableCell>

              <TableCell align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {portfolio.map((coin) => (
              <TableRow
                key={coin!.coinId}
                hover
              >
                <TableCell>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <Avatar
                      src={coin!.image}
                    />

                    <Box>
                      <Typography
                        fontWeight={700}
                      >
                        {coin!.name}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {coin!.symbol.toUpperCase()}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>

                <TableCell align="right">
                  {coin!.quantity}
                </TableCell>

                <TableCell align="right">
                  $
                  {coin!.averagePrice.toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 2,
                    }
                  )}
                </TableCell>

                <TableCell align="right">
                  $
                  {coin!.currentPrice.toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 2,
                    }
                  )}
                </TableCell>

                <TableCell align="right">
                  $
                  {coin!.invested.toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 2,
                    }
                  )}
                </TableCell>

                <TableCell align="right">
                  $
                  {coin!.currentValue.toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 2,
                    }
                  )}
                </TableCell>

                <TableCell align="right">
                  <Chip
                    color={
                      coin!.profit >= 0
                        ? "success"
                        : "error"
                    }
                    label={`$${coin!.profit.toLocaleString(
                      undefined,
                      {
                        maximumFractionDigits: 2,
                      }
                    )}`}
                  />
                </TableCell>

                <TableCell align="right">
                  <Chip
                    variant="outlined"
                    color={
                      coin!.profit >= 0
                        ? "success"
                        : "error"
                    }
                    label={`${coin!.profitPercent.toFixed(
                      2
                    )}%`}
                  />
                </TableCell>

                <TableCell align="right">
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="flex-end"
                  >
                  <Button
  size="small"
  variant="contained"
  onClick={() => {
    const market =
      markets.find(
        (c) =>
          c.id === coin!.coinId
      );

    if (market) {
      setBuyCoin(market);
    }
  }}
>
  Buy
</Button>

<Button
  size="small"
  color="error"
  variant="outlined"
  onClick={() =>
    setSellCoinData({
      id: coin!.coinId,
      name: coin!.name,
      quantity:
        coin!.quantity,
    })
  }
>
  Sell
</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TransactionHistory />
      {buyCoin && (
  <BuyDialog
    open={true}
    coin={buyCoin}
    onClose={() =>
      setBuyCoin(null)
    }
  />
)}

{sellCoinData && (
  <SellDialog
    open={true}
    coinId={sellCoinData.id}
    coinName={
      sellCoinData.name
    }
    maxQuantity={
      sellCoinData.quantity
    }
    onClose={() =>
      setSellCoinData(null)
    }
  />
)}
    </Stack>
    
  );
}