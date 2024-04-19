import { v4 as uuidv4 } from "uuid";
import { pool } from "../api/utils/postgres.js";


let users = [
  {
  userID: 1,
  name :"Thakane Eiman",
  email : "thakanenyabela@gmail.com",
  image: "profile_pic.jpg",
  phone: "0715543219",
  address: "2 Oorbetjie Road, Heuweloord, 1765" ,
  id :"d99b6355-78bc-43c0-8113-644f1ed6f859"
}];


//Get users currently in the Database
export const getUsers= (req, res) => {
  pool.query('SELECT * FROM "User"', (error, results) => {
    if(error) {
      throw error
    }
    res.send(users);
  })
  };

  //Filter through the available categories
  export const getUsersById = (req, res) => {
    const { id } = req.params;

    pool.query('SELECT * FROM "User" WHERE id = $1',[id], (error, results) => {
    if(error) {
      throw error
    }
    //To modify a specific order details, the unique Id for each posted order is used
    const foundClient = users.find((user) => user.id === id);

    res.send(foundClient);
  })
};

//Add a category to the Database
   export const createUser = (req, res) => {
    const user = req.body;

    pool.query('SELECT * FROM "User"', (error, results) => {
    if(error) {
      throw error
    }
    //Every added order has a unique Id
    users.push({ ...user, id: uuidv4()});

    res.send(`User with User ID: ${users.userID} has been added to the DATABASE`);
  })
};

  //Remove categories from the Database using an id
  export const deleteUser = (req, res) => {
    const { id } = req.params;

    pool.query('SELECT * FROM "User" WHERE id = $1',[id], (error, results) => {
    if(error) {
      throw error
    }
    users = users.filter((user) => user.id !== id);

    res.send(`Users with id: ${id} deleted from the DATABASE`);
  })
};


  //Update current categories
  export const updateUsers = (req, res) => {
    const { id } = req.params;
    const { userID, name, email, image, phone, address } = req.body;
    const user = users.find((user) => user.id === id);
    
    pool.query('SELECT * FROM "User"', (error, results) => {
    if(error) {
      throw error
    }

    if (userID) {
      users.userID = userID;
    };

    if (name) {
      users.name = name;
    };

    if (email) {
      users.email = email;
    };

    if (image) {
      users.image = image;
    };

    if (phone) {
        users.phone = phone;
    };

    if (address) {
        users.address = address;
    };

    pool.query('SELECT * FROM "User" WHERE id = $1',[id], (error, results) => {
    if(error) {
      throw error
    }
    users = users.filter((user) => user.id !== id);

    res.send(`User with the ID: ${id} has been successfully updated!`);
        })
    })
};
