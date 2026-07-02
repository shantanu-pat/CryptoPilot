"use client";

import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function NotFound() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        bgcolor: "background.default",
      }}
    >
      <Paper
        sx={{
          p: 6,
          borderRadius: 5,
          maxWidth: 550,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Stack spacing={3}>
          <Typography
            variant="h1"
            fontWeight={800}
            color="primary"
          >
            404
          </Typography>

          <Typography
            variant="h4"
            fontWeight={700}
          >
            Page Not Found
          </Typography>

          <Typography
            color="text.secondary"
          >
            The page you are looking for
            doesn't exist or may have
            been moved.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() =>
              router.push("/dashboard")
            }
          >
            Back to Dashboard
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}