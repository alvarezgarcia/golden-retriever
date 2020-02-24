
const request = require('superagent');
const { bitcoinPriceApiUrl } = require('../../config');

const fetchPrice = async () => {
  const response = await request.get(bitcoinPriceApiUrl);
  return response.body.toString('utf8');
};

module.exports = fetchPrice;
