'use strict';

const httpStatus = require('http-status');

const BaseError = require('./base')

class NoSlackCodeError extends BaseError {
  constructor() {
    super('No Slack code was found on request')
    this.code = httpStatus.INTERNAL_SERVER_ERROR;
  }
};

module.exports = NoSlackCodeError;
