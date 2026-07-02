import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Coin } from "@/types/coin";

export interface MarketChartResponse {
  prices: [number, number][];
}

export interface TrendingResponse {
  coins: {
    item: {
      id: string;
      coin_id: number;
      name: string;
      symbol: string;
      thumb: string;
      small: string;
      large: string;
      market_cap_rank: number;
    };
  }[];
}

export const marketApi = createApi({
  reducerPath: "marketApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3",
  }),

  tagTypes: ["Market"],

  endpoints: (builder) => ({
    getMarkets: builder.query<Coin[], void>({
      query: () =>
        "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false",
    }),

   getCoinHistory: builder.query<
  MarketChartResponse,
  {
    id: string;
    days: number | "max";
  }
>({
  query: ({ id, days }) =>
    `/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
}),

    getTrending: builder.query<
      TrendingResponse,
      void
    >({
      query: () => "/search/trending",
    }),

    searchCoins: builder.query<
      {
        coins: {
          id: string;
          name: string;
          symbol: string;
          thumb: string;
        }[];
      },
      string
    >({
      query: (query) =>
        `/search?query=${query}`,
    }),
  }),
});

export const {
  useGetMarketsQuery,
  useGetCoinHistoryQuery,
  useGetTrendingQuery,
  useSearchCoinsQuery,
} = marketApi;