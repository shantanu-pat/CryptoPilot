"use client";

import { TextField, Paper, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateProfile } from "@/store/slices/profileSlice";

export function ProfileSettings() {
  const dispatch = useAppDispatch();

  const profile = useAppSelector(
    (state) => state.profile
  );

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
      }}
    >
      <Stack spacing={3}>
        <Typography
          variant="h6"
          fontWeight={700}
        >
          Profile
        </Typography>

        <TextField
          fullWidth
          label="Display Name"
          value={profile.name}
          onChange={(e) =>
            dispatch(
              updateProfile({
                name: e.target.value,
              })
            )
          }
        />
      </Stack>
    </Paper>
  );
}