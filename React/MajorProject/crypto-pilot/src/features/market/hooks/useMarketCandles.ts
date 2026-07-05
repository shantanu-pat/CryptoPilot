"use client";

import { skipToken } from "@reduxjs/toolkit/query";
import type { UTCTimestamp } from "lightweight-charts";

import { useGetCoinOHLCQuery } from "@/services/marketApi";

export function useMarketCandles(
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
  } = useGetCoinOHLCQuery(query);

  const candleData =
    data?.map(
      ([
        timestamp,
        open,
        high,
        low,
        close,
      ]) => ({
        time: Math.floor(
          timestamp / 1000
        ) as UTCTimestamp,
        open,
        high,
        low,
        close,
      })
    ) ?? [];

  return {
    candleData,
    isLoading,
    error,
  };
}