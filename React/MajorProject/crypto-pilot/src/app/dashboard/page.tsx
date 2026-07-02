import { MainLayout } from "@/components/layout/MainLayout";

import { DashboardPage } from "@/features/dashboard/components/DashboardPage";

export default function Page() {
  return (
    <MainLayout>
      <DashboardPage />
    </MainLayout>
  );
}