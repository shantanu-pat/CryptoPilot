"use client";

import { Stack } from "@mui/material";

import { StrategyForm } from "./StrategyForm";
import { StrategyResult } from "./StrategyResult";

export function StrategyPage() {
  return (
    <Stack spacing={3}>
      <StrategyForm />
      <StrategyResult />
    </Stack>
  );
}