"use client";

import {
  Box,
} from "@mui/material";

import {
  createChart,
  CandlestickSeries,
  ColorType,
} from "lightweight-charts";

import {
  useEffect,
  useRef,
} from "react";

interface Props {
  data: {
    time: any;
    open: number;
    high: number;
    low: number;
    close: number;
  }[];
}

export function CandlestickChart({
  data,
}: Props) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(
      containerRef.current,
      {
        width:
          containerRef.current
            .clientWidth,
        height: 520,

        layout: {
          background: {
            type:
              ColorType.Solid,
            color: "#0F172A",
          },

          textColor:
            "#CBD5E1",
        },

        grid: {
          vertLines: {
            color:
              "#1E293B",
          },

          horzLines: {
            color:
              "#1E293B",
          },
        },

        crosshair: {
          mode: 1,
        },

        rightPriceScale: {
          borderColor:
            "#334155",
        },

        timeScale: {
          borderColor:
            "#334155",
        },
      }
    );

    const series =
      chart.addSeries(
        CandlestickSeries,
        {
          upColor: "#14F195",
          downColor: "#EF4444",

          borderUpColor:
            "#14F195",

          borderDownColor:
            "#EF4444",

          wickUpColor:
            "#14F195",

          wickDownColor:
            "#EF4444",
        }
      );

    series.setData(data);

    chart
      .timeScale()
      .fitContent();

    const resize = () => {
      if (!containerRef.current)
        return;

      chart.applyOptions({
        width:
          containerRef.current
            .clientWidth,
      });
    };

    window.addEventListener(
      "resize",
      resize
    );

    return () => {
      window.removeEventListener(
        "resize",
        resize
      );

      chart.remove();
    };
  }, [data]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        height: 520,
      }}
    />
  );
}