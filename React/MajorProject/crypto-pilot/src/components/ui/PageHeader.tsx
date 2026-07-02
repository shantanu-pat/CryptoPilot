import { Stack, Typography } from "@mui/material";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <Stack spacing={0.5} mb={4}>
      <Typography variant="h4" fontWeight={700}>
        {title}
      </Typography>

      {subtitle && (
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
}