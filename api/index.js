const express = require('express');
const app = express();
const port = 5500;
const { v4: uuidv4 } = require('uuid');

//Orders are added through the post route
let orders= [
  {
  orderID: 2,
  clientName :"Shona",
  deliveryMethod :"scooter",
  id :"d99b6355-78bc-43c0-8113-644f1ed6f859"
}];

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Homepage!');
});

app.get('/orders', (req, res) => {

  res.send(orders);

  });

  app.post('/orders', (req, res) => {
    const order = req.body;
    
    //Every added order has a unique Id
    orders.push({ ...order, id: uuidv4()});

    res.send(`Order with Order ID: ${order.orderID} has been added to the DATABASE`);
  });

  app.get('/orders/:id', (req, res) => {
    const { id } = req.params;

    //To modify a specific order details, the unique Id for each posted order is used
    const foundClient = orders.find((order) => order.id === id);

    res.send(foundClient);
  });

  app.delete('/orders/:id', (req, res) => {
    const { id } = req.params;
    
    orders = orders.filter((order) => order.id !== id);

    res.send(`Order with id: ${id} deleted from the DATABASE`);
  });

  app.patch('/orders/:id', (req, res) => {
    const { id } = req.params;
    const { orderID, clientName, deliveryMethod } = req.body;
    const order = orders.find((order) => order.id === id);
    
    if (orderID) {
      order.orderID = orderID;
    };

    if (clientName) {
      order.clientName = clientName;
    };

    if (deliveryMethod) {
      order.deliveryMethod = deliveryMethod;
    };

    res.send(`Order with the ID: ${id} has been successfully updated!`);
  });

app.listen(port, () => {
  console.log(`Server runs on ${port}`)
})

module.exports = app;