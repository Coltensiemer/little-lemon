const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const port = 3100;

// const dotenv = require('dotenv')
// dotenv.config({ path: './.env' });
require('dotenv').config();

// To Get server to connect locally and running
//cd in Terminal to ./server
//nodemon indexdb  --- to watch for every change

//middleware
app.use(cors());
app.use(express.json());

//JsonWebToken
var jwt = require('jsonwebtoken');

//Listen
app.listen(port, () => {
  console.log(`port ${port} works!`);
});

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
app.get('/getAllReservations', async (req, res) => {
  try {
    const getReservations = await pool.query('SELECT * FROM reservations');

    res.json(getReservations.rows);
  } catch (error) {
    console.log(error.message);
  }
});

/// Get single reservation details
app.get('/getreservation', async (req, res) => {
  try {
    const { email } = req.query;
    const getReservation = await pool.query(
      'SELECT * FROM reservations WHERE email = $1',
      [email]
    );

    res.json(getReservation.rows);
  } catch (error) {
    console.log(error.message);
  }
});


//Gets all itdeas from menu
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
    let queryString =
      'SELECT m.title AS menu_title, menu_id,  mi.title AS item_title, mi.price, mi.id FROM menu m INNER JOIN menu_items mi ON m.id = mi.menu_id';

    const getMenu = await pool.query(queryString);
    res.json(getMenu.rows);
  } catch (error) {
    console.log(`You have an error: ${error.message}`);
  }
});


app.get('/menu_query', async (req, res) => {
  try {
    const getMenu = await pool.query(
      "SELECT * FROM menu_items WHERE title LIKE '%h%'"
    );
    res.json(getMenu.rows);
  } catch (error) {
    console.log('Error in Query:', { error });
  }
});

// Post to users table
app.post('/users', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const checkExistingEmail = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (checkExistingEmail.rows.length > 0)
      return console.log('Email Already exist');

    const setUsers = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, email, password]
    );

    //Setting up user_setting for each user

    const defaultSettings = [false, false, false, email];

    const userSettings = await pool.query(
      'INSERT INTO user_settings (dark_mode, special_offers, newsletters, email) VALUES ($1, $2, $3, $4) RETURNING *;',
      defaultSettings
    );

    return {
      user: setUsers.rows[0],
      userSetting: userSettings.rows[0],
    };
  } catch (error) {
    console.log('error setting up users', { error });
  }
});

// recieve user's table info

app.get('/users', async (req, res) => {
  try {
    const getUserInfo = await pool.query('SELECT Email, Password FROM users;');

    res.json(getUserInfo.rows);
  } catch (error) {
    console.log('Getting user info:', error);
  }
});

// change user indo

app.post('/updateUserfirstandlastname', async (req, res) => {
  const { first_name, last_name, email } = req.body;

  try {
    const update = await pool.query(
      'UPDATE users SET first_name = $1, last_name = $2 WHERE email = $3;',
      [first_name, last_name, email]
    );

    res.json(update);
  } catch (error) {
    console.log('Error updating first and last name', error);
  }
});

// Creates a row
// app.post('/post_new_user_settings', async (req, res) => {
//   try {
//     const {user_id, dark_mode, special_offer, newsletters, created_at, updated_at } = req.body;

//     const request = await pool.query('INSERT INTO user_settings (dark_mode, special_offers, newsletters, user_id) VALUES ($1, $2, $3, $4) RETURNING *;', [dark_mode, special_offer, newsletters, user_id])

//     res.json(request)
//     console.log('updated settings')

//   }
//   catch (error) {
//     console.log("Error with Posting user settings:", error)
//   }

//   })

//Push settings info into users_settings
app.post('/post_user_settings', async (req, res) => {
  try {
    const { dark_mode, special_offer, newsletters, email } = req.body;

    if (email === null) return res.status(400).json({message: "No email"}).console.log('No email');

    const emailComparison = await pool.query(
      'SELECT email FROM user_settings WHERE email = $1',
      [email]
    );

    if (emailComparison.rows.length === 0)
      return res.status(401).json({ message: 'Email not found' }); 

    const request = await pool.query(
      'UPDATE user_settings SET dark_mode = $1, special_offers = $2, newsletters = $3 WHERE email = $4;',
      [dark_mode, special_offer, newsletters, email]
    );

    res.json(request)
    console.log('updated settings');
  } catch (error) {
    console.log('Error with Posting user settings:', error);
  }
});

// Import user settings
app.get('/get_user_settings', async (req, res) => {
  const { email } = req.body;

  try {
    const request = await pool.query(
      'SELECT * FROM user_settings WHERE email = $1',
      [email]
    );

    res.json(request);
  } catch (error) {
    console.log('Error with getting settings', error);
  }
});
