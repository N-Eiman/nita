import express, { json } from "express";
import {  getOrders, createOrder, getOrdersById, deleteOrder, updateOrder } from "../routes/orders.js";
import {  getCategory, createCategory, getCategoryById, deleteCategory, updateCategory } from "../routes/category.js";
import {  getMenus, createMenu, getMenusById, deleteMenu, updateMenu} from "../routes/menu.js";
import {  getUsers, createUser, getUsersById, deleteUser, updateUsers} from "../routes/users.js";
import {  getFavorites, createFavorite, getFavoritesById, deleteFavorites, updateFavorites} from "../routes/favorite.js";

const app = express();
const port = 5500;


app.use(json());

app.get('/', (req, res) => {
  res.send('Hello from Homepage!');
});

  //referencing routes for orders
  app.get('/orders', getOrders);

  app.get('/orders/:id', getOrdersById);

  app.post('/orders', createOrder);

  app.delete('/orders/:id', deleteOrder);

  app.patch('/orders/:id', updateOrder);

  //referencing routes for categories
   app.get('/categories', getCategory);

  app.get('/categories/:id', getCategoryById);

  app.post('/categories', createCategory);

  app.delete('/categories/:id', deleteCategory);

  app.patch('/categories/:id', updateCategory);

  //referencing routes for favorites
   app.get('/categories', getFavorites);

  app.get('/categories/:id', getFavoritesById);

  app.post('/categories', createFavorite);

  app.delete('/categories/:id', deleteFavorites);

  app.patch('/categories/:id', updateFavorites);

  //referencing routes for menus
   app.get('/menus', getMenus);

  app.get('/menus/:id', getMenusById);

  app.post('/menus', createMenu);

  app.delete('/menus/:id', deleteMenu);

  app.patch('/menus/:id', updateMenu);

  //referencing users for menus
   app.get('/users', getUsers);

  app.get('/users/:id', getUsersById);

  app.post('/users', createUser);

  app.delete('/users/:id', deleteUser);

  app.patch('/users/:id', updateUsers);


  //referencing routes for favorites
  app.get('/favorites', getFavorites);

  app.get('/favorites/:id', getFavoritesById);

  app.post('/favorites', createFavorite);

  app.delete('/favorites/:id', deleteFavorites);

  app.patch('/favrites/:id', updateFavorites);

app.listen(port, () => {
  console.log(`Server runs on ${port}`)
})

export default app;