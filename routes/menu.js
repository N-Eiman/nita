import { v4 as uuidv4 } from "uuid";
import { pool } from "../api/utils/postgres.js";

//Menus are added through the post route
let menus= [
  {
  menuID: 2,
  title :"Burger",
  shortDescr : "Chicken Burger",
  longDescr : "Cut to a close-up shot of the Chicken Burger on a sesame seed bun, topped with fresh lettuce, juicy tomato slices, and a tangy sauce dripping down the sides",
  price : 100,
  sellingPrice : 100,
  image : "chicken-burger.jpg",
  prepType : "grill",
  onPromo : "TRUE",
  category : "Main-course",
  id :"d99b6355-78bc-43c0-8113-644f1ed6f859"
}];


//Get menus currently in the Database
export const getMenus= (req, res) => {
  pool.query('SELECT * FROM "Menu"', (error, results) => {
    if(error) {
      throw error
    }
    res.send(menus);
  })
  };

  //Filter through the available orders
  export const getMenusById = (req, res) => {
    const { id } = req.params;

    pool.query('SELECT * FROM "Menus" WHERE id = $1',[id], (error, results) => {
    if(error) {
      throw error
    }
    //To modify a specific order details, the unique Id for each posted order is used
    const foundClient = menus.find((menu) => menu.id === id);

    res.send(foundClient);
  })
};

//Add a menu to the Database
   export const createMenu = (req, res) => {
    const menu = req.body;

    pool.query('SELECT * FROM "Menu"', (error, results) => {
    if(error) {
      throw error
    }
    //Every added menu has a unique Id
    menus.push({ ...menu, id: uuidv4()});

    res.send(`Menu with Order ID: ${menus.menuID} has been added to the DATABASE`);
  })
};

  //Remove menu from the Database using an id
  export const deleteMenu = (req, res) => {
    const { id } = req.params;

    pool.query('SELECT * FROM "Menu" WHERE id = $1',[id], (error, results) => {
    if(error) {
      throw error
    }
    menus = menus.filter((menu) => menu.id !== id);

    res.send(`Menu with id: ${id} deleted from the DATABASE`);
  })
};


  //Update current menus
  export const updateMenu = (req, res) => {
    const { id } = req.params;
    const { menuID, title, shortDescr, longDescr, price, sellingPrice, image, prepType, onPromo, category } = req.body;
    const menu = menus.find((menu) => menu.id === id);
    
    pool.query('SELECT * FROM "Menu"', (error, results) => {
    if(error) {
      throw error
    }

    if (menuID) {
      menus.menuID = menuID;
    };

    if (title) {
      menus.title = title;
    };

    if (shortDescr) {
      menus.shortDescr = shortDescr;
    };

    if (longDescr) {
      menus.longDescr = longDescr;
    };

    if (price) {
      menus.price = price;
    };

    if (sellingPrice) {
      menus.sellingPrice = sellingPrice;
    };

    if (image) {
      menus.image = image;
    };

    if (shortDescr) {
      menu.shortDescr = shortDescr;
    };

    if (prepType) {
      menus.prepType = prepType;
    };

    if (onPromo) {
      menu.onPromo = onPromo;
    };

    if (category) {
      menus.category = category;
    };

    pool.query('SELECT * FROM "Menu" WHERE id = $1',[id], (error, results) => {
    if(error) {
      throw error
    }
    menus = menus.filter((menu) => menu.id !== id);
    res.send(`Menu with the ID: ${id} has been successfully updated!`);
         })
    })
  };

