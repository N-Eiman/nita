import { v4 as uuidv4 } from "uuid";


//Orders are added through the post route
let orders= [
  {
  orderID: 2,
  clientName :"Shona",
  deliveryMethod :"scooter",
  id :"d99b6355-78bc-43c0-8113-644f1ed6f859"
}];


//Get orders currently in the Database
export const getOrders= (req, res) => {

  res.send(orders);

  };

  //Filter through the available orders
  export const getOrdersById = (req, res) => {
    const { id } = req.params;

    //To modify a specific order details, the unique Id for each posted order is used
    const foundClient = orders.find((order) => order.id === id);

    res.send(foundClient);
  };

//Add an order to the Database
   export const createOrder = (req, res) => {
    const order = req.body;
    
    //Every added order has a unique Id
    orders.push({ ...order, id: uuidv4()});

    res.send(`Order with Order ID: ${order.orderID} has been added to the DATABASE`);
  };

  //Remove orders from the Database using an id
  export const deleteOrder = (req, res) => {
    const { id } = req.params;
    
    orders = orders.filter((order) => order.id !== id);

    res.send(`Order with id: ${id} deleted from the DATABASE`);
  };


  //Update current orders
  export const updateOrder = (req, res) => {
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
  };

