const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const port = 3100;



// To Get server to connect locally and running 
//cd in Terminal to ./server
//nodemon indexdb  --- to watch for every change 


//middleware
app.use(cors());
app.use(express.json());

//Routes

// Added a reservation
app.post('/reservations', async (req, res) => {
  try {
    const { full_name, email, date, time, group_total } = req.body;
    const newReservation = await pool.query(
      'INSERT INTO  reservations (full_name, email, date, time, group_total) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [full_name, email, date, time, group_total]
    );

    console.log(res.body);
    res.json(newReservation);
  } catch (error) {
    console.log(`You have an error message: ${error.message}!`);
  }
});

// Get all Reservations

app.get('/reservations', async (req, res) => {
  try {
    const getReservations = await pool.query('SELECT * FROM reservations');

    res.json(getReservations.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`port ${port} works!`);
});

app.get('/menu', async (req, res) => {
  try {
    const getMenu = await pool.query('SELECT * From menu');
    res.json(getMenu.rows);
  } catch (error) {
    console.log(`You have an error: ${error.message}`);
  }
});

app.get('/menu_items', async (req, res) => {
  try {
    let queryString = 'SELECT m.title AS menu_title, menu_id,  mi.title AS item_title, mi.price, mi.id FROM menu m INNER JOIN menu_items mi ON m.id = mi.menu_id';
 
    const getMenu = await pool.query(queryString);
    res.json(getMenu.rows);
  } catch (error) {
    console.log(`You have an error: ${error.message}`);
  }
});





app.get('/menu_query', async (req, res) => { 
  try { 
    // let queryString = 'SELECT * FROM menu_items WHERE title LIKE '%B%' ';
    
    const getMenu = await pool.query("SELECT * FROM menu_items WHERE title LIKE '%h%'");
    res.json(getMenu.rows); 
  }
  catch (error) {
    console.log('Error in Query:', {error}) 

  }
})