import express from "express";
import { reset } from "./controller/reset";
import { createUser } from "./controller/user";

export const app = express();

app.use(express.json());

app.post("/api/reset", reset);
app.post("/api/user", createUser);
// app.post("/api/orders", createOrder);
// app.get("/api/orderbook/:symbol", getOrderbook);
// app.get("/api/users/:userId/balance" getBalance);
// app.get("/api/users/:userId/positions" getPositions);
