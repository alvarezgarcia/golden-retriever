'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const router = require('./services');
const errorHandler = require('./errorHandler');

const { port } = require('../../config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.use('/', router);
app.use(errorHandler);

const server = 
  app.listen(port).on('error', error => console.log('Express error', error));

console.log(`Golden Retriever API running on ${port}`);

module.exports = server;
