import { MainLayout } from "@/components/layout/MainLayout";
import { MarketPage } from "@/features/market/components/MarketPage";

export default function Page() {
  return (
    <MainLayout>
      <MarketPage />
    </MainLayout>
  );
}