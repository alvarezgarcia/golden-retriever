'use strict';

const request = require('superagent');
const { bitcoinPriceApiUrl } = require('../../config');

const fetchPrice = async () => { 
  try {
    const response = await request.get(bitcoinPriceApiUrl);
    return response.body.toString('utf8');
  } catch (error) {
    throw error;
  }
}

module.exports = fetchPrice;
