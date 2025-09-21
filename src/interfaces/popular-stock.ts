export interface PopularStock {
  id: number;
  name: string;
  price: number;
  status: "Profit" | "Loss";
  percent: number;
}
