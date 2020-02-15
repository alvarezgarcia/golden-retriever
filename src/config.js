'use strict';

const {
  PORT
} = process.env;

module.exports = {
  port: parseInt(PORT, 10) || 6060
};
