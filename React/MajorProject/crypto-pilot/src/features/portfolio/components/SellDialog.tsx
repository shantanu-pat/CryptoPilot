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
import { sellCoin } from "@/store/slices/portfolioSlice";

interface Props {
  open: boolean;
  coinId: string;
  coinName: string;
  maxQuantity: number;
  onClose: () => void;
}

export function SellDialog({
  open,
  coinId,
  coinName,
  maxQuantity,
  onClose,
}: Props) {
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] =
    useState("");

  const qty = Number(quantity);

  const handleSell = () => {
    if (
      qty <= 0 ||
      qty > maxQuantity
    )
      return;

    dispatch(
      sellCoin({
        coinId,
        quantity: qty,
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
        Sell {coinName}
      </DialogTitle>

      <DialogContent>
        <Stack
          spacing={3}
          mt={1}
        >
          <Typography>
            Available

            <strong>
              {" "}
              {maxQuantity}
            </strong>
          </Typography>

          <TextField
            label="Quantity"
            type="number"
            fullWidth
            value={quantity}
            onChange={(e) =>
              setQuantity(
                e.target.value
              )
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={handleSell}
        >
          Sell
        </Button>
      </DialogActions>
    </Dialog>
  );
}