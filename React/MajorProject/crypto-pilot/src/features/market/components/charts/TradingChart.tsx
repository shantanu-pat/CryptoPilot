"use client";

import {
  AreaSeries,
  ColorType,
  createChart,
  type UTCTimestamp,
} from "lightweight-charts";

import { Box } from "@mui/material";

import {
  useEffect,
  useRef,
} from "react";

interface Props {
  data: {
    time: UTCTimestamp;
    value: number;
  }[];
}

export function TradingChart({
  data,
}: Props) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(
      containerRef.current,
      {
        width: containerRef.current.clientWidth,
        height: 500,

        layout: {
          background: {
            type: ColorType.Solid,
            color: "#0F172A",
          },
          textColor: "#94A3B8",
        },

        grid: {
          vertLines: {
            color: "#1E293B",
          },
          horzLines: {
            color: "#1E293B",
          },
        },
      }
    );

    const area = chart.addSeries(
      AreaSeries,
      {
        lineColor: "#14F195",
        topColor: "rgba(20,241,149,.25)",
        bottomColor: "rgba(20,241,149,.02)",
      }
    );

    area.setData(data);

    chart.timeScale().fitContent();

    const resize = () => {
      if (!containerRef.current) return;

      chart.applyOptions({
        width: containerRef.current.clientWidth,
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
        height: 500,
      }}
    />
  );
}