import express, { json } from "express";
import {  getOrders, createOrder, getOrdersById, deleteOrder, updateOrder } from "./orders.js";

const app = express();
const port = 5500;


app.use(json());

app.get('/', (req, res) => {
  res.send('Hello from Homepage!');
});

  app.get('/orders', getOrders);

  app.get('/orders/:id', getOrdersById);

  app.post('/orders', createOrder);

  app.delete('/orders/:id', deleteOrder);

  app.patch('/orders/:id', updateOrder);

app.listen(port, () => {
  console.log(`Server runs on ${port}`)
})

export default app;