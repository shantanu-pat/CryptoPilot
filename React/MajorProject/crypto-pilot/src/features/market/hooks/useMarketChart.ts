"use client";

import type { UTCTimestamp } from "lightweight-charts";
import { skipToken } from "@reduxjs/toolkit/query";

import { useGetCoinHistoryQuery } from "@/services/marketApi";

export function useMarketChart(
  coinId?: string,
  days = 30
) {
  const query = coinId
    ? { id: coinId, days }
    : skipToken;

  const {
    data,
    isLoading,
    error,
  } = useGetCoinHistoryQuery(query);

  const seen = new Set<number>();

  const chartData =
    data?.prices
      ?.map(([timestamp, price]) => ({
        time: Math.floor(timestamp / 1000) as UTCTimestamp,
        value: price,
      }))
      .filter((item) => {
        if (seen.has(item.time)) return false;
        seen.add(item.time);
        return true;
      }) ?? [];

  return {
    chartData,
    isLoading,
    error,
  };
}