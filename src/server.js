'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const { port } = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', (req, res, next) => res.json({a: 1}));

const server = 
  app.listen(port).on('error', error => console.log('Express error', error));

console.log(`Golden Retriever running on ${port}`);

module.exports = server;
