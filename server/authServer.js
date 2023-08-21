const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const port = 4100;

// const dotenv = require('dotenv')
// dotenv.config({ path: './.env' });
require('dotenv').config();

// To Get server to connect locally and running
//cd in Terminal to ./server
//nodemon indexdb  --- to watch for every change

//middleware
app.use(cors());
app.use(express.json());

//Listen
app.listen(port, () => {
  console.log(`port ${port} works!`);
});

//JsonWebToken
var jwt = require('jsonwebtoken');

function generateAccesToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECERT, { expiresIn: '5m' });
}

// Test Data
// const users = [
//   {
//     id: 1,
//     email: 'Colten50@hotmail.com',
//     password: 'ColtenTest1',
//   },
//   {
//     id: 3,
//     email: 'Colten20@hotmail.com',
//     password: 'ColtenTest3',
//   },
// ];

// Verify function

const verifyLogin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) {
    res.json({ Auth: false, Message: 'No Token' });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, user) => {
      if (err)
        return res.json({
          Auth: false,
          Message: 'Token is not verified',
          ERROR: err,
        });

      req.user = user;
      console.log(user);
      next();
    });
  }
};

//Verify Login info

app.get('/verify', verifyLogin, async (req, res) => {
  res.json(users.filter((user) => user.email === req.user.email));
});

// Login INTO
app.post('/login', async (req, res) => {
  try {
    //   const { id, email, password } = users[0];

    const { EmailSignin, PasswordSignin } = req.body;


    const accessToken = jwt.sign(
      { email: EmailSignin },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: '20s' }
    );

    const accessTokenRefresh = jwt.sign(
      { email: EmailSignin },
      process.env.REFRESH_TOKEN_SECERT
    );

    const results = await pool.query('SELECT u.first_name, u.last_name, u.email, u.password, us.dark_mode, us.special_offers, us.newsletters FROM users u INNER JOIN user_settings us ON u.email = us.email WHERE u.email = $1', [
      EmailSignin,
    ]);

	

    //From the first database
    const user = results.rows[0];

    console.log('users', user)

    const queryPassword = user.password;

    if (results.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (results.rows.length > 0) {
      if (PasswordSignin == queryPassword) {
        res.send({
          Message: 'Successful',
          Auth: true,
          AccessToken: accessToken,
          refreshToken: accessTokenRefresh,
          user: user,
        });
      } else {
        res.send({ message: 'Email and Password Combination did not work' });
      }
    } else {
      res.send({ message: 'Did not work' });
    }
  } catch (error) {
    console.log('error with login', error);
  }
});




app.post('/token', async (req, res) => {
  console.log(req.body);
  const refreshToken = req.body.token;
  if (refreshToken === null)
    return res.sendStatus(401).json({ Error: 'error' });
  if (!refreshToken.includes(refreshToken))
    return res.sendStatus(403).json({ Error: 'Token does not match' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECERT, (err, user) => {
    if (err) return res.sendStatus(403).json({ err: err });
    const tokenAccess = generateAccesToken({ email: user.email });
    res.json({ tokenAccess: tokenAccess });
  });
});
