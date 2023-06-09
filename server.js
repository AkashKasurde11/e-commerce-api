const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');

const app = express();

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'root',
      database : 'ecommerce'
    }
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.json('working'));
app.post('/signin', (req, res) => signin.handleSignin(db, bcrypt, req, res));
app.post('/register', (req, res) => register.handleRegister(db, bcrypt, req, res));
app.get('/profile/:id', (req, res) => profile.getProfile(db, req, res));

app.listen(3000, () => {
    console.log('app is running at port 3000')
})
