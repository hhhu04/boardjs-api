require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var usersRouter = require('./routes/users');
var gameRouter = require('./routes/game');

var app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Board Game API',
      version: '1.0.0',
      description: 'API for board game statistics including LoL, DNF, and Cyphers',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./docs/swagger/*.js'],
};

const specs = swaggerJsdoc(options);

app.use((req, res, next) => {
  req.setTimeout(120000);
  res.setTimeout(120000);
  next();
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/user', usersRouter);
app.use('/api/game', gameRouter);

module.exports = app;
