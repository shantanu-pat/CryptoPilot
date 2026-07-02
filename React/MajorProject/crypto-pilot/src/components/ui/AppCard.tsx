import { Card, CardContent, CardProps } from "@mui/material";
import { ReactNode } from "react";

interface AppCardProps extends CardProps {
  children: ReactNode;
}

export function AppCard({
  children,
  sx,
  ...props
}: AppCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 4,
        transition: "all 0.25s ease",

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 4,
        },

        ...sx,
      }}
      {...props}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
}