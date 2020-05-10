const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();

const userRouter = require('./routes/userRouter');
const homeworkRouter = require('./routes/homeworkRouter');

require('./database');

app.use(express.json());
app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Prevent CORS Error
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if(req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.use('/user', userRouter);
app.use('/homework', homeworkRouter);

app.listen('3000', () => {
  console.log('Listening to port 3000');
});
