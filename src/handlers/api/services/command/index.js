'use strict';

const express = require('express');

const router = express.Router();

const { btcCommand } = require('./handlers');

router.post('/btc', btcCommand);

module.exports = router;
