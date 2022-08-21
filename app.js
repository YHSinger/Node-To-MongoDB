require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connect = require('./utils/connect-db');
//import the router
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const cardsRouter = require('./routes/cards');

//connect to the db:
connect()
    .then(() => console.log('connected'))
    .catch(e => console.log(e));

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));//middleware that parses body that contain form data
app.use(express.json());//middleware that parses body that contain json

//use the router:
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/cards', cardsRouter);

const PORT = process.env.EXPRESS_PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));