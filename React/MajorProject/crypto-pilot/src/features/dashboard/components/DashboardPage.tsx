"use client";

import { DashboardHero } from "./DashboardHero";
import { MarketPage } from "@/features/market/components/MarketPage";

export function DashboardPage() {
  return (
    <>
      <DashboardHero />
      <MarketPage />
    </>
  );
}