"use client";

import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useAppDispatch } from "@/store/hooks";
import { buyCoin } from "@/store/slices/portfolioSlice";
import type { Coin } from "@/types/coin";

interface Props {
  open: boolean;
  coin: Coin;
  onClose: () => void;
}

export function BuyDialog({
  open,
  coin,
  onClose,
}: Props) {
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] =
    useState("");

  const qty =
    Number(quantity) || 0;

  const total =
    qty * coin.current_price;

  const handleBuy = () => {
    if (qty <= 0) return;

    dispatch(
      buyCoin({
        coinId: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        image: coin.image,
        quantity: qty,
        averagePrice:
          coin.current_price,
      })
    );

    setQuantity("");

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        Buy {coin.name}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} mt={1}>
          <Typography>
            Current Price
          </Typography>

          <Typography
            variant="h5"
            fontWeight={700}
          >
            $
            {coin.current_price.toLocaleString()}
          </Typography>

          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                e.target.value
              )
            }
          />

          <Typography
            variant="h6"
          >
            Total Investment
          </Typography>

          <Typography
            color="primary"
            variant="h5"
            fontWeight={700}
          >
            $
            {total.toLocaleString()}
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleBuy}
          disabled={qty <= 0}
        >
          Buy
        </Button>
      </DialogActions>
    </Dialog>
  );
}