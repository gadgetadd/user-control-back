const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const asyncHandler = require('express-async-handler')
const ctrl = require('./controllers');

const { validateRequest } = require('./middlewares');

const { createUserJoiSchema } = require('./models/user');


require('dotenv').config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.post('/api/users', validateRequest(createUserJoiSchema), asyncHandler(ctrl.createUser));


app.use((_, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  const { message = "Server error" } = err;
  const { statusCode = 500 } = res;
  res.status(statusCode).json({ message })
});

module.exports = app;
