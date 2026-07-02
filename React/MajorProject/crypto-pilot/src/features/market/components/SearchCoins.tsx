"use client";

import { useState } from "react";

import {
  Autocomplete,
  Avatar,
  CircularProgress,
  TextField,
} from "@mui/material";

import { useSearchCoinsQuery } from "@/services/marketApi";

interface Props {
  onSelect: (coinId: string) => void;
}

export function SearchCoins({
  onSelect,
}: Props) {
  const [search, setSearch] =
    useState("");

  const { data, isFetching } =
    useSearchCoinsQuery(search, {
      skip: search.length < 2,
    });

  return (
    <Autocomplete
      sx={{
        width: 340,
      }}
      loading={isFetching}
      options={data?.coins ?? []}
      getOptionLabel={(option) =>
        option.name
      }
      filterOptions={(x) => x}
      onChange={(_, value) => {
        if (value) {
          onSelect(value.id);
        }
      }}
      renderOption={(props, option) => (
        <li
          {...props}
          key={option.id}
        >
          <Avatar
            src={option.thumb}
            sx={{
              width: 26,
              height: 26,
              mr: 2,
            }}
          />

          {option.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search Crypto..."
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isFetching && (
                  <CircularProgress
                    size={18}
                  />
                )}
                {
                  params.InputProps
                    .endAdornment
                }
              </>
            ),
          }}
        />
      )}
    />
  );
}