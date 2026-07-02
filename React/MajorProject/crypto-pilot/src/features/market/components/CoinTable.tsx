"use client";

import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

import {
  Avatar,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type { Coin } from "@/types/coin";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleWatchlist } from "@/store/slices/watchlistSlice";

interface Props {
  coins: Coin[];
  selectedCoin: string;
  onSelect: (coin: Coin) => void;
}

export function CoinTable({
  coins,
  selectedCoin,
  onSelect,
}: Props) {
  const dispatch = useAppDispatch();

  const watchlist = useAppSelector(
    (state) => state.watchlist.coins
  );

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 4,
        mt: 3,
      }}
    >
      <Table>

        <TableHead>

          <TableRow>

            <TableCell width={40}></TableCell>

            <TableCell>#</TableCell>

            <TableCell>Coin</TableCell>

            <TableCell align="right">
              Price
            </TableCell>

            <TableCell align="right">
              24H
            </TableCell>

            <TableCell align="right">
              Market Cap
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {coins.map((coin) => {

            const watched =
              watchlist.includes(
                coin.id
              );

            return (
              <TableRow
                key={coin.id}
                hover
                selected={
                  coin.id ===
                  selectedCoin
                }
                onClick={() =>
                  onSelect(coin)
                }
                sx={{
                  cursor: "pointer",
                }}
              >
                <TableCell
                  onClick={(e) => {
                    e.stopPropagation();

                    dispatch(
                      toggleWatchlist(
                        coin.id
                      )
                    );
                  }}
                >
                  <IconButton
                    size="small"
                  >
                    {watched ? (
                      <StarRoundedIcon
                        color="warning"
                      />
                    ) : (
                      <StarBorderRoundedIcon />
                    )}
                  </IconButton>
                </TableCell>

                <TableCell>
                  {coin.market_cap_rank}
                </TableCell>

                <TableCell>

                  <Avatar
                    src={coin.image}
                    sx={{
                      width: 34,
                      height: 34,
                      display:
                        "inline-flex",
                      verticalAlign:
                        "middle",
                      mr: 2,
                    }}
                  />

                  <Typography
                    component="span"
                    fontWeight={600}
                  >
                    {coin.name}
                  </Typography>

                </TableCell>

                <TableCell align="right">
                  $
                  {coin.current_price.toLocaleString()}
                </TableCell>

                <TableCell align="right">

                  <Chip
                    size="small"
                    color={
                      coin.price_change_percentage_24h >=
                      0
                        ? "success"
                        : "error"
                    }
                    label={`${coin.price_change_percentage_24h.toFixed(
                      2
                    )}%`}
                  />

                </TableCell>

                <TableCell align="right">
                  $
                  {coin.market_cap.toLocaleString()}
                </TableCell>

              </TableRow>
            );
          })}

        </TableBody>

      </Table>

    </TableContainer>
  );
}