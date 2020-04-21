'use strict';

const pubsub = require('../../../../../lib/pubsub');

const btc = (req, res, next) => {
  try {
    const payload = JSON.stringify(req.body);
    pubsub.publish(payload);

    return res.end();
  } catch (error) {
    return next(error);
  }
};

module.exports = btc;
