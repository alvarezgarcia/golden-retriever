'use strict';

class BaseError extends Error {
  constructor(message = 'Internal Server Error') {
    super(message);
    this.name = this.constructor.name;
  }
}

module.exports = BaseError;
