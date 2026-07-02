import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import {
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

interface KpiCardProps {
  title: string;
  value: string;
  change: number;
}

export function KpiCard({
  title,
  value,
  change,
}: KpiCardProps) {
  const positive = change >= 0;

  return (
    <Card
      sx={{
        height: "100%",
        border: "1px solid",
        borderColor: "divider",
        transition: ".25s",

        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {title}
          </Typography>

          <Typography
            variant="h4"
            fontWeight={700}
          >
            {value}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            {positive ? (
              <TrendingUpRoundedIcon
                color="success"
                fontSize="small"
              />
            ) : (
              <TrendingDownRoundedIcon
                color="error"
                fontSize="small"
              />
            )}

            <Typography
              color={
                positive
                  ? "success.main"
                  : "error.main"
              }
              fontWeight={600}
            >
              {change}%
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}