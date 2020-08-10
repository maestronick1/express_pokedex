const express = require('express');
const router = express.Router();
const db = require('../models');//database
const axios = require('axios');

//.get/users | finds all users
//.post/users| creates a user
//.get/user/:id/ | find user details
//.delete/user/:id | deletes a user
//.patch/user/:id | updates a user
// GET /pokemon - return a page with favorited Pokemon
router.get('/', async(req, res)=> {
  const pokeFound = await db.pokemon.findAll()//returning favorite to favoritee view
  res.render('favorites', {pokemon: pokeFound})
 });


router.post('/', async (req, res) =>{
   await db.pokemon.findOrCreate({
      where: {
        name: req.body.name,
      }

    });
    res.redirect("/pokemon")
});
 module.exports = router
    
    
// POST /pokemon - receive the name of a pokemon and add it to the database

  // TODO: Get form data and add a new record to DB
router.get('/:name', async (req, res) => {
    try {
      if (req.params && req.params.name) {
        const showUrl = `https://pokeapi.co/api/v2/pokemon/${req.params.name}`
        const results = await axios.get(showUrl)
        let pData = results.data
        res.render('show', {pokeData: pData})
      }
    } catch (err){ 
      console.log('Error:', err) // render error
    }
  })
  
  router.delete('/', async(req, res)=>{
    try{
      await db.pokemon.destroy({ 
        where: {
          name: req.body.name,
        },
        
      });
      res.redirect("/pokemon")
    }catch(err){
      console.log('Error:', err) // render error
      
  }

  });


  
