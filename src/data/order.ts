import type { Order } from "../interfaces/order";

export const dummyOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2025-09-01",
    status: "Completed",
    amount: 120.5,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2025-09-05",
    status: "Pending",
    amount: 250.0,
  },
  {
    id: "ORD-003",
    customer: "Michael Lee",
    date: "2025-09-08",
    status: "Cancelled",
    amount: 80.0,
  },
  {
    id: "ORD-004",
    customer: "Sarah Johnson",
    date: "2025-09-12",
    status: "Completed",
    amount: 500.75,
  },
];
