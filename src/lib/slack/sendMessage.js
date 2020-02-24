'use strict';

const request = require('superagent');

const sendMessage = (message, responseUrl) => request
  .post(responseUrl)
  .send(message);

module.exports = sendMessage;
