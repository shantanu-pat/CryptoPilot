import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

interface PageContainerProps extends BoxProps {
  children: ReactNode;
}

export function PageContainer({
  children,
  sx,
  ...props
}: PageContainerProps) {
  return (
    <Box
      sx={{
        px: 4,
        py: 3,
        width: "100%",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}