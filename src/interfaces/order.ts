export interface Order {
  id: string;
  customer: string;
  date: string;
  status: "Pending" | "Completed" | "Cancelled";
  amount: number;
}
