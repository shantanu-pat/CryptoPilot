export type TransactionType = "BUY" | "SELL";

export interface Transaction {
  id: string;
  coinId: string;
  symbol: string;
  name: string;
  image: string;

  type: TransactionType;

  quantity: number;

  price: number;

  total: number;

  createdAt: string;
}