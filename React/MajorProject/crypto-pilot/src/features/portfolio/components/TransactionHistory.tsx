"use client";

import {
  Avatar,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
} from "@mui/material";

import { useAppSelector } from "@/store/hooks";

export function TransactionHistory() {
  const transactions = useAppSelector(
    (state) => state.portfolio.transactions
  );

  if (transactions.length === 0) {
    return (
      <Paper
        sx={{
          p: 5,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
        >
          No Transactions Yet
        </Typography>

        <Typography
          color="text.secondary"
          mt={1}
        >
          Buy your first crypto asset to
          start building your history.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 4,
      }}
    >
      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              Asset
            </TableCell>

            <TableCell>
              Type
            </TableCell>

            <TableCell align="right">
              Quantity
            </TableCell>

            <TableCell align="right">
              Price
            </TableCell>

            <TableCell align="right">
              Total
            </TableCell>

            <TableCell align="right">
              Date
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {transactions.map((tx) => (

            <TableRow key={tx.id} hover>

              <TableCell>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >

                  <Avatar
                    src={tx.image}
                  />

                  <div>

                    <Typography
                      fontWeight={700}
                    >
                      {tx.name}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {tx.symbol.toUpperCase()}
                    </Typography>

                  </div>

                </Stack>

              </TableCell>

              <TableCell>

                <Chip
                  label={tx.type}
                  color={
                    tx.type === "BUY"
                      ? "success"
                      : "error"
                  }
                />

              </TableCell>

              <TableCell align="right">
                {tx.quantity}
              </TableCell>

              <TableCell align="right">
                $
                {tx.price.toLocaleString()}
              </TableCell>

              <TableCell align="right">
                $
                {tx.total.toLocaleString()}
              </TableCell>

              <TableCell align="right">
                {new Date(
                  tx.createdAt
                ).toLocaleString()}
              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>
    </TableContainer>
  );
}