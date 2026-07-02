"use client";

import {
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";

import { useGetMarketsQuery } from "@/services/marketApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  updateStrategy,
  runSimulation,
} from "@/store/slices/strategySlice";

export function StrategyForm() {
  const dispatch =
    useAppDispatch();

  const strategy =
    useAppSelector(
      (state) =>
        state.strategy
    );

  const { data } =
    useGetMarketsQuery();

  if (!data) return null;

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
      }}
    >
      <Stack
        spacing={3}
      >
        <TextField
          select
          label="Coin"
          value={
            strategy.coinId
          }
          onChange={(e) =>
            dispatch(
              updateStrategy({
                coinId:
                  e.target.value,
              })
            )
          }
        >
          {data.map((coin) => (
            <MenuItem
              key={coin.id}
              value={coin.id}
            >
              {coin.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Investment Amount"
          type="number"
          value={
            strategy.amount
          }
          onChange={(e) =>
            dispatch(
              updateStrategy({
                amount:
                  Number(
                    e.target.value
                  ),
              })
            )
          }
        />

        <TextField
          type="date"
          value={
            strategy.buyDate
          }
          onChange={(e) =>
            dispatch(
              updateStrategy({
                buyDate:
                  e.target.value,
              })
            )
          }
          slotProps={{
            htmlInput:{
            max: new Date()
              .toISOString()
              .split("T")[0],
            },
          }}
        />

        <Button
          variant="contained"
          onClick={() =>
            dispatch(runSimulation())
          }
        >
          Run Simulation
        </Button>
      </Stack>
    </Paper>
  );
}