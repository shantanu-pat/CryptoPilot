"use client";

import { Stack } from "@mui/material";

import { ProfileSettings } from "./ProfileSettings";
import { Preferences } from "./Preferences";
import { DataSettings } from "./DataSettings";

export function SettingsPage() {
  return (
    <Stack spacing={3}>
      <ProfileSettings />

      <Preferences />

      <DataSettings />
    </Stack>
  );
}