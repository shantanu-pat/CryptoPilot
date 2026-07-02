import { Stack, Typography } from "@mui/material";

import { AppCard } from "./AppCard";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
}

export function StatCard({
  title,
  value,
  change,
  positive = true,
}: StatCardProps) {
  return (
    <AppCard>
      <Stack spacing={1}>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {title}
        </Typography>

        <Typography variant="h4">
          {value}
        </Typography>

        {change && (
          <Typography
            variant="body2"
            color={
              positive ? "success.main" : "error.main"
            }
          >
            {change}
          </Typography>
        )}
      </Stack>
    </AppCard>
  );
}