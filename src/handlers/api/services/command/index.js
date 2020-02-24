'use strict';

const express = require('express');

const pubsub = require('../../../../lib/pubsub');

const router = express.Router();

router.post('/btc', async (req, res, next) => {
  const payload = JSON.stringify(req.body);
  pubsub.publish(payload);

  res.end();
});

module.exports = router;
