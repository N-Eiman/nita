import { v4 as uuidv4 } from "uuid";
import { pool } from "../api/utils/postgres.js";

//favorites are added through the post route
let favorites = [
  {
  favoriteID: 2,
  username :"Pizza",
  id :"d99b6355-78bc-43c0-8113-644f1ed6f859"
}];


//Get favorites currently in the Database
export const getFavorites= (req, res) => {
  pool.query('SELECT * FROM "Favorite"', (error, results) => {
    if(error) {
      throw error
    }
    res.send(favorites);
  })
  };

  //Filter through the available favorites
  export const getFavoritesById = (req, res) => {
    const { id } = req.params;

    pool.query('SELECT * FROM "Favorite" WHERE id = $1',[id], (error, results) => {
    if(error) {
      throw error
    }
    //To modify a specific order details, the unique Id for each posted order is used
    const foundClient = favorites.find((favorite) => favorite.id === id);

    res.send(foundClient);
  })
};

//Add a favorite to the Database
   export const createFavorite = (req, res) => {
    const favorite = req.body;

    pool.query('SELECT * FROM "Favorite"', (error, results) => {
    if(error) {
      throw error
    }
    //Every added order has a unique Id
    favorites.push({ ...favorite, id: uuidv4()});

    res.send(`Favorites with Favorite ID: ${favorites.favoriteID} has been added to the DATABASE`);
  })
};

  //Remove favorites from the Database using an id
  export const deleteFavorites = (req, res) => {
    const { id } = req.params;

    pool.query('SELECT * FROM "Favorite" WHERE id = $1',[id], (error, results) => {
    if(error) {
      throw error
    }
    favorites = favorites.filter((favorite) => favorite.id !== id);

    res.send(`Favorite with id: ${id} deleted from the DATABASE`);
  })
};


  //Update current favorites
  export const updateFavorites = (req, res) => {
    const { id } = req.params;
    const { favoriteID, username } = req.body;
    const favorite = favorites.find((favorite) => favorite.id === id);
    
    pool.query('SELECT * FROM "Favorite"', (error, results) => {
    if(error) {
      throw error
    }

    if (favoriteID) {
      favorites.favoriteID = favoriteID;
    };

    if (username) {
      favorites.name = username;
    };

    pool.query('SELECT * FROM "Favorite" WHERE id = $1',[id], (error, results) => {
    if(error) {
      throw error
    }
    favorites = favorites.filter((favorite) => favorite.id !== id);


    res.send(`Favorite with the ID: ${id} has been successfully updated!`);
        })
    })
};

