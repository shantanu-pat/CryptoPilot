import { MainLayout } from "@/components/layout/MainLayout";
import { WatchlistPage } from "@/features/watchlist/components";

export default function Page() {
  return (
    <MainLayout>
      <WatchlistPage />
    </MainLayout>
  );
}