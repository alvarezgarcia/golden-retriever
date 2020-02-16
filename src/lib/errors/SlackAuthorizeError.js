'use strict';

const httpStatus = require('http-status');

const BaseError = require('./base')

class SlackAuthorizationError extends BaseError {
  constructor() {
    super('Bad request to Slack auth endpoint')
    this.code = httpStatus.INTERNAL_SERVER_ERROR;
  }
};

module.exports = SlackAuthorizationError;
