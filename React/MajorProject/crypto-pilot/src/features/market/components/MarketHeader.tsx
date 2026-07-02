"use client";

import { useState } from "react";

import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import { BuyDialog } from "@/features/portfolio/components/BuyDialog";

import type { Coin } from "../types/coin";

interface Props {
  coin: Coin;
}

export function MarketHeader({
  coin,
}: Props) {
  const [openBuy, setOpenBuy] =
    useState(false);

  const isPositive =
    coin.price_change_percentage_24h >= 0;

  return (
    <>
      <Stack
        spacing={3}
        mb={4}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Box
              component="img"
              src={coin.image}
              alt={coin.name}
              sx={{
                width: 56,
                height: 56,
              }}
            />

            <Box>
              <Typography
                variant="h4"
                fontWeight={700}
              >
                {coin.name}
              </Typography>

              <Typography
                color="text.secondary"
              >
                {coin.symbol.toUpperCase()}
              </Typography>
            </Box>

            <Chip
              label={`#${coin.market_cap_rank}`}
              color="primary"
            />
          </Stack>

          <Button
            variant="contained"
            size="large"
            onClick={() =>
              setOpenBuy(true)
            }
          >
            Buy
          </Button>
        </Stack>

        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
        >
          <Typography
            variant="h3"
            fontWeight={800}
          >
            $
            {coin.current_price.toLocaleString()}
          </Typography>

          <Chip
            color={
              isPositive
                ? "success"
                : "error"
            }
            label={`${isPositive ? "+" : ""}${coin.price_change_percentage_24h.toFixed(
              2
            )}%`}
          />
        </Stack>
      </Stack>

      <BuyDialog
        open={openBuy}
        coin={coin}
        onClose={() =>
          setOpenBuy(false)
        }
      />
    </>
  );
}