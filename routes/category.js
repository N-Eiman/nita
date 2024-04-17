import { v4 as uuidv4 } from "uuid";
import { pool } from "../api/utils/postgres.js";


let categories= [
  {
  categoryID: 1,
  title :"Burgers",
  desc : "none",
  image: "burger.jpg",
  id :"d99b6355-78bc-43c0-8113-644f1ed6f859"
}];


//Get categories currently in the Database
export const getCategory= (req, res) => {
  pool.query('SELECT * FROM "Category"', (error, results) => {
    if(error) {
      throw error
    }
    res.send(categories);
  })
  };

  //Filter through the available categories
  export const getCategoryById = (req, res) => {
    const { id } = req.params;

    pool.query('SELECT * FROM "Category" WHERE id = ""',[id], (error, results) => {
    if(error) {
      throw error
    }
    //To modify a specific order details, the unique Id for each posted order is used
    const foundClient = categories.find((category) => category.id === id);

    res.send(foundClient);
  })
};

//Add a category to the Database
   export const createCategory = (req, res) => {
    const category = req.body;

    pool.query('SELECT * FROM "Category"', (error, results) => {
    if(error) {
      throw error
    }
    //Every added order has a unique Id
    categories.push({ ...category, id: uuidv4()});

    res.send(`Category with Category ID: ${category.categoryID} has been added to the DATABASE`);
  })
};

  //Remove categories from the Database using an id
  export const deleteCategory = (req, res) => {
    const { id } = req.params;

    pool.query('SELECT * FROM "Category" WHERE id = ""',[id], (error, results) => {
    if(error) {
      throw error
    }
    categories = categories.filter((category) => category.id !== id);

    res.send(`Category with id: ${id} deleted from the DATABASE`);
  })
};


  //Update current categories
  export const updateCategory = (req, res) => {
    const { id } = req.params;
    const { categoryID, title, desc, image } = req.body;
    const category = categories.find((category) => category.id === id);
    
    pool.query('SELECT * FROM "Category"', (error, results) => {
    if(error) {
      throw error
    }

    if (categoryID) {
      category.categoryID = categoryID;
    };

    if (title) {
      category.title = title;
    };

    if (desc) {
      category.desc = desc;
    };

    if (image) {
      category.image = image;
    };

    pool.query('SELECT * FROM "Category" WHERE id = ""',[id], (error, results) => {
    if(error) {
      throw error
    }
    categories = categories.filter((category) => category.id !== id);

    res.send(`Category with the ID: ${id} has been successfully updated!`);
      })
    })
  };

