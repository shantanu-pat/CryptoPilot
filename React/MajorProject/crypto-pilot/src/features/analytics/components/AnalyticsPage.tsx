"use client";

import { Stack } from "@mui/material";

import { PerformanceCards } from "./PerformanceCards";
import { PerformanceChart } from "./PerformanceChart";
import { TopMovers } from "./TopMovers";


export function AnalyticsPage() {
  return (
    <Stack spacing={3}>
      <PerformanceCards />

      <PerformanceChart />

      <TopMovers />
    </Stack>
  );
}