const express = require('express');
//The require() method is used to load and cache JavaScript modules. 
//So, if you want to load a local, relative JavaScript module into a Node. 
//js application, you can simply use the require() method.
const router = express.Router();
const db = require('../models');//database require the iinfo created by sequelize 
const axios = require('axios');

//.get/users | finds all users
//.post/users| creates a user
//.get/user/:id/ | find user details
//.delete/user/:id | deletes a user
//.patch/user/:id | updates a user
// GET /pokemon - return a page with favorited Pokemon
router.get('/', async(req, res)=> {
  const pokeFound = await db.pokemon.findAll()//returning favorite to favoritee view
  res.render('favorites', {pokemon: pokeFound})//pokemon is the name of our database.
 });//rendering to 'favorites' our db query resuts
//async and await

router.post('/', async (req, res) =>{
   await db.pokemon.findOrCreate({//make sure i dont have duplicates and if I dont create it 
      where: {
        name: req.body.name,
      }

    });
    res.redirect("/pokemon")//send me to this page
});
 module.exports = router//
    
    
// POST /pokemon - receive the name of a pokemon and add it to the database

  // TODO: Get form data and add a new record to DB
router.get('/:name', async (req, res) => {
    try {//test block of code for errors
        const showUrl = `https://pokeapi.co/api/v2/pokemon/${req.params.name}`
        const results = await axios.get(showUrl)//go to pokemon url and get me data
        let pData = results.data //data = search reasults.data
        res.render('show', {pokeData: pData})
      
    } catch (err){ 
      console.log('Error:', err) // if it error,render error
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


  
