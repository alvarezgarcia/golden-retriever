
const express = require('express');

const pubsub = require('../../../../lib/pubsub');

const router = express.Router();

router.post('/btc', async (req, res, next) => {
  try {
    const payload = JSON.stringify(req.body);
    pubsub.publish(payload);

    return res.end();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
